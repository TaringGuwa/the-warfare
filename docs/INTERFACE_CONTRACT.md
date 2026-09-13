# THE WARFARE — Interface Contract v0.1
**Owner:** Integration Lead / Build Engineer (Agent #13)
**Status:** DRAFT — awaiting Technical Architect (#1) approval
**Source of truth referenced:** `GDD_The_Warfare_v0.0.2.md` (see NOTE below)
**Contains:** Data contracts ONLY. No gameplay logic. Every field maps to a GDD section reference so any agent can verify scope.

---

## ⚠️ NOTE TO PM — Version Discrepancy
Task-000 specifies `GDD_The_Warfare_v0.0.1.md` as source of truth. That file is not available to me.
Available: `GDD_The_Warfare_v0.0.2.md` (states it supersedes v0.0.1) and the companion Numeric Balancing Draft v0.1.
**ASSUMPTION (low-risk, reversible):** This contract is built against v0.0.2. Flagging as `NEEDS CONFIRMATION` — if v0.0.1 contains entities dropped or renamed in v0.0.2, this contract must be revised before any agent starts implementation.

---

## 1. Design Rules Baked Into This Contract

- Ownership is strictly binary (Player/Enemy) — no neutral (GDD §2, LOCKED).
- Map is a **region-adjacency graph**, not tile/coordinate (GDD §5.3, LOCKED). No `x/y` fields anywhere.
- Single global tick drives all systems (GDD §13, LOCKED) — every mutable value must be reachable from one `Tick` pass.
- Regional Support is stored as **decimal internally**, rounded only at render (GDD §13, LOCKED) → `supportValue: number` (float), never pre-rounded.
- Numeric constants referenced below (thresholds, rates) are **DRAFT values** from the Numeric Balancing Draft v0.1 — this contract defines *shape*, not final tuning numbers. Do not hardcode DRAFT numbers into shared schema; they belong in a separate `config/balancing.js` owned by whoever implements each system, loaded at runtime.

---

## 2. Root State Object

```js
GameState = {
  tick: number,                    // current in-game day, GDD §13
  startDate: "2000-01-01",         // GDD §5.1
  regions: Map<RegionId, Region>,
  units: Map<UnitId, Unit>,
  movementOrders: Map<OrderId, MovementOrder>,
  frontlines: Frontline[],         // DERIVED/COMPUTED each tick, not authored data — see §3
  players: {
    player: FactionState,
    enemy: FactionState
  },
  insurgencies: Map<RegionId, InsurgencyState>,
  policies: {
    player: PolicyState,
    enemy: PolicyState
  }
}
```

**OPEN QUESTION (MEDIUM ambiguity) → PM/Architect:** Should `frontlines` be persisted state or purely recomputed from `regions` adjacency each tick? GDD §2 implies it's fully derived ("emerge and dissolve automatically"). This contract assumes **derived, not stored** — flag if wrong, since it affects whether Combat module owns a data store or a pure function.

---

## 3. Entity Schemas

### 3.1 Region  (GDD §2, §11, §12)
```js
Region = {
  id: string,
  name: string,
  owner: "player" | "enemy",
  terrain: "mountain_forest" | "rural" | "urban",
  isCapital: boolean,
  adjacency: RegionId[],           // graph edges, GDD §5.3

  supportValue: number,            // decimal, GDD §13 — can go negative (insurgency trigger, §12.1)
  corruption: number,              // 0–100 capped, GDD §11.2 / Balancing §1.2
  taxRate: number,                 // 0–100, GDD §11.2

  buildings: Building[],
  roadType: "dirt" | "main" | "toll" | null,  // terrain-locked, GDD §4.1

  stabilization: {
    active: boolean,               // GDD §10
    // supportValue >= 50 exits Stabilization; no separate threshold field needed
  } | null,

  hasActiveInsurgency: boolean     // convenience flag; authoritative state lives in GameState.insurgencies
}
```

### 3.2 Building  (GDD §4)
```js
Building = {
  id: string,
  regionId: RegionId,
  category: "civil" | "government" | "military",
  type: string,   // e.g. "health_center", "outreach_center", "barracks", "oil_derrick", "intelligence_center"
  hp: number,                      // relevant for insurgency damage, GDD §12.5
  maxHp: number,
  constructionProgress: number,    // 0–1, drives support accrual start (GDD §4.1)
  autoRebuild: boolean,            // true = Civil/Government, false = Military (GDD §4)
  supportContribution: number      // current accrued %, caps at DRAFT value (Balancing §2)
}
```

### 3.3 Unit  (GDD §4.3, §6, §7, §8, §9)
```js
Unit = {
  id: string,
  owner: "player" | "enemy",
  type: "AD" | "tank" | "jet" | "missile" | "intel_personnel" | "intel_drone",
  power: number,                   // relative scale, see Balancing §5 for base costs
  locationRegionId: RegionId | null,   // null while in transit (see MovementOrder)
  state: "garrisoned" | "moving" | "attacking" | "retreating" |
         "patrolling" | "striking" | "cooldown" | "captured",
  cooldownUntilTick: number | null   // Jet cooldown, GDD §7
}
```

### 3.4 MovementOrder  (GDD §5.3)
```js
MovementOrder = {
  id: string,
  owner: "player" | "enemy",
  unitIds: UnitId[],
  originRegionId: RegionId,
  destinationRegionId: RegionId,
  route: RegionId[],               // pre-computed fastest safe route (Player-owned regions only)
  issuedTick: number,
  etaTick: number,
  oilCostPaid: number,
  status: "in_transit" | "cancelled" | "rerouted" | "arrived" | "blocked"
}
```
**OPEN QUESTION (LOW ambiguity, established convention used):** Dynamic reroute (GDD §5.3) recalculates `route`/`etaTick` in place rather than creating a new order — proceeding on this assumption since it's reversible.

### 3.5 Frontline (DERIVED — GDD §2, §6)
```js
Frontline = {
  regionPairId: string,             // stable derived id, e.g. "R04:R17"
  playerRegionId: RegionId,
  enemyRegionId: RegionId,
  powerRatio: [number, number],     // e.g. [60, 40]
  pressure: number,                 // drift value, GDD §6.2
  threatLevel: number                // used by Defensive AI, GDD §15.2
}
```

### 3.6 InsurgencyState  (GDD §12)
```js
InsurgencyState = {
  regionId: RegionId,
  status: "dormant" | "delayed" | "active" | "suppressed",
  triggeredAtTick: number | null,
  delayRemainingDays: number,
  tier: 0 | 1 | 2 | 3 | 4,
  unitCount: number,
  effectivePower: number,
  lastSpreadTick: number | null
}
```

### 3.7 FactionState  (GDD §16, §17)
```js
FactionState = {
  capitalRegionId: RegionId,
  globalSupport: number,           // 100 → 0, GDD §16
  money: number,
  oil: number,
  oilDerricksBuilt: number,        // max 4, GDD §3.2
  sanctionsApplied: string[]       // thresholds already crossed, GDD §16.3
}
```

### 3.8 PolicyState  (GDD §4.4)
```js
PolicyState = {
  antiCorruptionLevel: 0 | 1 | 2 | 3 | 4
}
```

### 3.9 TickEvent  (GDD §13 — audit/log record, not simulation input)
```js
TickEvent = {
  tickNumber: number,
  deltas: [
    { category: "tax" | "corruption" | "facility" | "policy" | "insurgency" | "combat" | "global_support",
      regionId: RegionId | null,
      value: number,
      note: string }
  ]
}
```

---

## 4. What Each Domain Agent Owns (do not cross-write)

| Domain | Owns writes to | Reads from |
|---|---|---|
| Core Simulation (#2) | `GameState.tick`, orchestrates all module `.step()` calls | everything |
| Economy | `FactionState.money/oil`, `Region.taxRate` | Region, Building |
| Combat | `Frontline[]`, `Unit.state` (combat-related) | Region, Unit |
| Movement/Logistics | `MovementOrder`, `Unit.locationRegionId` | Region.adjacency |
| Insurgency | `InsurgencyState`, `Region.supportValue` (insurgency component only) | Region, Building |
| Intelligence | reveal-only flags (not yet schematized — **OPEN, needs its own agent input**) | Region, Unit (enemy-side) |
| AI (Enemy) | issues MovementOrder/production orders as "enemy", never writes Player state | all enemy-visible state |
| UI | read-only on everything | everything |

**OPEN QUESTION → PM:** Intelligence "reveal" state (what the Player can currently see of Enemy regions) has no schema yet — GDD §8 is thin on data shape. Needs a short session with whoever owns Intelligence before their TASK starts, or they'll invent their own shape.

---

## 5. Non-Negotiables (LOCKED, do not reinterpret)

1. No region may ever have `owner` outside `"player"|"enemy"`.
2. `MovementOrder.route` must never include a region not owned by `MovementOrder.owner` at order time (GDD §5.3).
3. Military `Building.autoRebuild` is always `false`; Civil/Government always `true` (GDD §4).
4. `supportValue` is never pre-rounded in state — only at render layer.
