# THE WARFARE — Interface Contract v0.3
**Owner:** Integration Lead / Build Engineer (Agent #13)
**Status:** DRAFT — revised per PM review of v0.1 (see Changelog)
**Source of truth:** `GDD_The_Warfare_v0.0.2.md` — **CONFIRMED by PM** as correct source (v0.0.1 superseded, no revision needed).
**Contains:** Data contracts ONLY. No gameplay logic. Every field maps to a GDD section reference so any agent can verify scope.

---

## Changelog
- **v0.3 (this revision):** §2 "Frontline derived vs stored" OPEN QUESTION resolved by PM: DERIVED, recomputed each tick, cached read-only in `GameState.frontlines` (not authoritative).
- **v0.2:**
  1. `Unit.state` now includes `"withdrawing"` as distinct from `"retreating"` (GDD §6.3, §15.2, §21 — LOCKED). Note: PM's review cited "§32.5"; the GDD only goes to §22, so the actual locked reference is §6.3/§15.2/§21 — substance unchanged, citation corrected.
  2. Added clarifying paragraph to §3.6: insurgents are an abstract aggregate (`unitCount`/`effectivePower`), not individual `Unit` entities.
  3. Added provisional `VisibilityEntry` schema (§3.7.1) for Intelligence reveal-state, status NEEDS CONFIRMATION.
  4. Source-of-truth version (v0.0.2) confirmed by PM — no change needed, noted for record.
- **v0.1:** Initial draft.

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
  frontlines: Frontline[],         // DERIVED, read-only cache recomputed each tick — see §2 RESOLVED and §3.5
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

**RESOLVED (PM decision):** `frontlines` is **DERIVED** — recomputed from `regions` adjacency every tick, per GDD §2 ("emerge and dissolve automatically"). `GameState.frontlines` holds a **read-only cache** of that computation, refreshed each tick; it is **not** an authoritative source and must never be written to directly by any module other than the process that recomputes it. Combat module owns a pure recompute function, not a persistent frontline data store. Any module reading `GameState.frontlines` must treat it as a snapshot valid only for the current tick.

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
  state: "garrisoned" | "moving" | "attacking" | "retreating" | "withdrawing" |
         "patrolling" | "striking" | "cooldown" | "captured",
  cooldownUntilTick: number | null   // Jet cooldown, GDD §7
}
```

**LOCKED (GDD §6.3, §15.2, §21) — `retreating` vs `withdrawing` must never share a representation:**
- `retreating` = **attacker** pulling back mid-attack ("Retreat", §6.3 — attacker terminology only).
- `withdrawing` = **defender** pulling back before/during being attacked to save troops ("Withdraw", §15.2/§21 Glossary — distinct mechanism, distinct terminology).
Combat module sets `retreating`; Defensive AI / defender-withdraw logic sets `withdrawing`. Do not merge these two states or infer one from the other.

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

**IMPORTANT — insurgents are an abstract aggregate, not Unit entities.** `unitCount` and `effectivePower` are scalar numbers describing the insurgency as a whole (per GDD §12.2's cumulative baseline-per-tier lookup). Insurgent forces are **NOT** individual `Unit` records like AD/Tank/Jet — they do not get entries in `GameState.units`, do not have their own `id`/`state`/`locationRegionId`, and are not movable or targetable the way Player/Enemy units are. Any module (Combat, UI, AI) that needs to reason about insurgents must read `InsurgencyState.unitCount`/`effectivePower` directly — do not synthesize fake `Unit` objects to represent them.

### 3.7 FactionState  (GDD §16, §17)
```js
FactionState = {
  capitalRegionId: RegionId,
  globalSupport: number,           // 100 → 0, GDD §16
  money: number,
  oil: number,
  oilDerricksBuilt: number,        // max 4, GDD §3.2
  sanctionsApplied: string[],      // thresholds already crossed, GDD §16.3
  visibility: Map<RegionId, VisibilityEntry>   // see §3.7.1 below — NEEDS CONFIRMATION
}
```

#### 3.7.1 VisibilityEntry (GDD §8 — Intelligence reveal state)
**STATUS: NEEDS CONFIRMATION.** Provisional schema supplied by PM to unblock work; not yet signed off by the Intelligence agent. Does not block other domains from proceeding.
```js
VisibilityEntry = {
  personnelRevealed: boolean,   // GDD §8: frontline info -- AD count, facilities, Jet patrol status, Tanks
  droneRevealed: boolean        // GDD §8: deeper enemy region info
}
```
Keyed per `RegionId` inside `FactionState.visibility` — i.e. "what this faction currently knows about that region." `personnelRevealed` is expected to come from Intelligence Personnel, `droneRevealed` from Intelligence Drones (GDD §4.3, §8), but the exact trigger/decay logic is owned by the Intelligence agent, not this contract.

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

**RESOLVED (see §3.7.1):** Intelligence reveal-state now has a provisional `VisibilityEntry` schema, status NEEDS CONFIRMATION pending Intelligence agent sign-off. Not blocking.

---

## 5. Non-Negotiables (LOCKED, do not reinterpret)

1. No region may ever have `owner` outside `"player"|"enemy"`.
2. `MovementOrder.route` must never include a region not owned by `MovementOrder.owner` at order time (GDD §5.3).
3. Military `Building.autoRebuild` is always `false`; Civil/Government always `true` (GDD §4).
4. `supportValue` is never pre-rounded in state — only at render layer.
