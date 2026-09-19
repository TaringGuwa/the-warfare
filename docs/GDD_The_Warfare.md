# THE WARFARE
## Game Design Document — v0.0.4

**Status:** Behavior-complete + Numeric Balancing Draft complete (see companion document). Ready for full development execution.

**Supersedes:** v0.0.3 (nama file tidak lagi memuat nomor versi; versi dan riwayatnya hanya dicatat di dalam file ini)

**Companion document:** `The_Warfare_Numeric_Balancing_Draft.md` — contains all numeric values for constants marked `DRAFT` in this document. Values there are playtest-ready but not permanent-final.

**Dependency check:** terakhir dicek terhadap `The_Warfare_Numeric_Balancing_Draft.md` v0.7 (19 September 2026). Kalau versi di header dokumen itu berbeda dari ini, anggap rujukan silang di sini perlu dicek ulang.

**How to read this document:** Every rule is either `LOCKED` (finalized behavior), `DRAFT` (behavior locked, numeric value proposed and approved for playtest — see companion doc for the value), or `FUTURE` (not implemented in this version).

---

## CHANGELOG — v0.0.3 → v0.0.4 (19 September 2026)

1. **Section 6.2 (Frontline Pressure) — DIREKONSILIASI (LOCKED):** Contoh lama "2 vs 1 → 52:48" bertentangan dengan rumus Power Ratio yang kini didefinisikan di companion document Section 4.0 (total power satu sisi dibagi total power kedua sisi). Diganti dengan rujukan ke rumus tersebut plus contoh ilustratif "2 AD vs 1 AD → 67:33". Disetujui human 19 Sep 2026.
2. **Penamaan file — DIUBAH:** Nama file tidak lagi memuat nomor versi (`GDD_The_Warfare.md`, bukan `..._v0.0.3.md`). Versi hanya dicatat di dalam file (header + changelog), supaya file yang saling bergantung tidak membingungkan saat salah satunya belum diperbarui judulnya. Rujukan antar-dokumen di file ini ditulis tanpa versi; satu baris "Dependency check" di header mencatat versi pasangan yang terakhir dicek.

---

## CHANGELOG — v0.0.2 → v0.0.3 (Audit Gap, 19 September 2026)

Hasil audit System Maker Advisor + tim AI-Agent (PM, World/Content Designer, Numerical Balance Specialist, Consistency & QA Critic) terhadap 6 temuan gap. Semua LOCKED, disetujui human eksplisit.

1. **Section 19 (Map Layout) — DIBANGUN ULANG (LOCKED):** Referensi ke dokumen v0.0.1 yang ternyata tidak eksis diganti dengan tabel region, terrain, dan adjacency lengkap hasil rekonstruksi, divalidasi konsisten dengan Capital P6/E10 yang sudah ada.
2. **Section 21 (Glossary) — DITAMBAH (RESOLVED):** Entry "AD (Angkatan Darat)" ditambahkan; sebelumnya dipakai tanpa definisi.
3. **Section 4 (Development Systems) — CATATAN DITAMBAH (RESOLVED):** Batas "max 2 per tipe Military per map" dikonfirmasi disengaja (bottleneck strategis), bukan kesalahan penulisan.
4. **Section 6.4 (Defensive Adjacency) — DIREKONSILIASI (LOCKED):** Deskripsi yang sebelumnya kontradiktif dengan companion document Section 4.1 disatukan — Defensive Adjacency kini eksplisit berupa modifier Attack Success% langsung, independen dari Power Ratio/Frontline Pressure.
5. **Section 3.1 (Money) — DIBERSIHKAN (RESOLVED):** Frasa "policy development" (leftover teks lama, tidak match dengan Section 4.4 yang menyatakan Anti-corruption Policy tanpa biaya) dihapus.
6. **Companion document Section 4.4 (baru) — Tank Terrain Power Penalty:** Angka "-80% power" dari Section 4.3 diregister resmi ke Numeric Balancing Draft (sebelumnya hilang dari register meski Section 22 mengklaim lengkap). Lihat companion document v0.3.

---

## CHANGELOG — v0.0.1 → v0.0.2

The following are **new or revised** decisions made during the PM-led Task Decomposition and Numeric Balancing sessions. Everything else in this document is unchanged from v0.0.1.

1. **Neutral Region status — CLARIFIED (LOCKED):** No neutral region status exists in v0.0.1. All regions are strictly Player-owned or Enemy-owned (binary ownership). The phrase "or neutral, if such a status exists" in the original Section 5.10 is retired as leftover hypothetical wording.
2. **Capital Relocation Mechanic — NEWLY SPECIFIED (LOCKED):** Relocation is instantaneous — no travel time, no Money/Oil cost. The old region loses Capital status and the new region gains it within the same tick. See Section 2.4 (new) below.
3. **Player Oil Arbitration — NEWLY SPECIFIED (LOCKED):** When Player orders within a single tick exceed available Oil, claims resolve in the same priority as AI: Air Strike > Transport > Production. Under-prioritized orders are blocked, not partially fulfilled. See Section 3.2 (updated) below.
4. **Insurgency Facility Damage Scope — REVISED (LOCKED):** Unresolved insurgency can now damage and destroy **both Civil facilities AND Military buildings** in the infected region (previously scoped to Civil only in early discussion; now explicitly widened). Since Military buildings do not auto-rebuild, this raises the stakes of ignoring insurgency. See Section 12.5 (updated) below.
5. **Platform decision — NEW (Technical, informational):** Project targets a web-based platform (HTML/CSS/JS), with `index.html` as the application entry point. This does not change any gameplay behavior; noted here for cross-team awareness.
6. **All previously `UNSETTLED` numeric constants** (GDD v0.0.1 Section 22 Appendix) have been assigned DRAFT values through a structured balancing pass. See companion document `The_Warfare_Numeric_Balancing_Draft.md` for the full register. This GDD no longer carries a "fully open" Appendix — Section 22 below is retained only to track which items are now DRAFT vs which (none, as of v0.0.2) remain fully open.

---

## Table of Contents

1. Overview
2. Core Game Rules (updated: Capital Relocation, Player Oil Arbitration)
3. Economy
4. Development Systems (Civil / Government / Military / Policy)
5. Time, Terrain & Movement
6. Ground Combat
7. Air Warfare
8. Intelligence
9. Missiles
10. Capture & Stabilization
11. Regional Support
12. Insurgency (updated: Facility Damage scope)
13. Time Tick & Simulation Loop
14. Production & Logistics
15. AI Behavior
16. Global Support & Sanctions
17. Victory, Defeat & Endgame
18. Difficulty
19. Map Layout (RECONSTRUCTED v0.0.3)
20. Design Principles
21. Glossary
22. Numeric Constants Register (status only — see companion doc for values)
23. Changelog (see top of document)

---

## 1. Overview

**Genre:** Real-Time Strategy (RTS).

**Setting:** Game begins 1 January 2000. Time scale: **1 in-game day = 1 real-world second**.

**Core Loop:** Player manages economy, development, and military across a map divided into regions, fighting along dynamically-emergent frontlines against an AI-controlled Enemy, while managing internal political stability (Regional Support) and international standing (Global Support).

**Core Design Pillars** (see Section 20 for full detail):
- Combat is never simple "higher power = automatic win."
- Conquest always creates risk — capturing territory is not a safe, final action.
- Military and civil/political systems are deeply interdependent.
- Behavior/rules are finalized before numeric balancing.

---

## 2. Core Game Rules

- Map is composed of discrete **regions** connected via an adjacency graph (not a coordinate/tile simulation — see Section 5).
- Three terrain types exist: **Mountain/Forest**, **Village/Rural**, **City/Urban**.
- **Ownership is strictly binary.** Every region is either Player-owned or Enemy-owned at all times — no neutral status exists (clarified v0.0.2).
- A **frontline** automatically exists wherever a Player-owned region is directly adjacent to an Enemy-owned region. Frontlines are not fixed map objects — they emerge and dissolve automatically as ownership changes.
- The number of active frontlines is dynamic and map-dependent. The v0.0.1 default map (Section 19) has exactly 3 frontlines at game start.
- **Capital:** Player may place their Capital in any region (Section 19 gives the default map's suggested placement). The Capital can be relocated if it becomes a frontline. If the Capital is captured before relocation, the Player loses immediately (Section 17).

### 2.4 Capital Relocation Mechanic (NEW, v0.0.2 — LOCKED)

- Relocation is **instantaneous**: no travel time, no Money cost, no Oil cost.
- The old Capital region loses its Capital status and the new target region gains it **within the same tick** — there is no window in which two regions are simultaneously Capital, nor a window in which no region holds Capital status.
- This applies identically whether triggered by the Player manually or by the AI's Capital Relocation override (Section 15.2).
- **Interaction with Loss Condition #2 (Section 17.1):** because relocation is instant, the Player's only real constraint is *timing* — relocation must be completed before the Capital region is actually captured, not merely while it is under attack. There is no partial-relocation state to exploit or defend against.

---

## 3. Economy

### 3.1 Money
- Generated through regional taxation; tax rate is adjustable per region by the Player (Enemy AI's tax model is global — see Section 15.3).
- Higher tax rate → faster wealth generation, but faster Regional Support decline (Section 11.2). Exact tier boundaries/rates: DRAFT, see companion document Section 1.1.
- Used for: military salaries, construction, training, military production.

### 3.2 Oil
- Produced by **Oil Derrick** (max 4 per map; cannot be built in Urban regions; passive/automatic/continuous output once built — no toggle).
- Oil is consumed by three competing uses: **Air Strikes, Transport (troop movement), and Production** (Tank/Aircraft/Missile/Intelligence Center — NOT AD/Barracks, which is Money-only).
- Given the 4-derrick cap and three concurrent consumers, Oil is intentionally a heavily-constrained strategic resource.
- **Oil-for-transport:** cost = f(units moved × estimated travel time), paid upfront when the order is issued. Insufficient Oil blocks the movement order outright (no partial/debt movement). Refunded proportionally on cancellation (5.2); recalculated (charge/refund the difference) on destination change (5.3) or dynamic reroute (5.9). Rate coefficient: DRAFT, see companion document Section 6.
- **Oil-for-production:** flat Oil cost per order, paid upfront alongside Money, same timing/refund rules as the Money component (Section 14.2/14.3). Exact costs: DRAFT, see companion document Section 5.

#### 3.2.1 Player Oil Arbitration (NEW, v0.0.2 — LOCKED)

- When Player-issued orders within a **single tick** collectively exceed available Oil stock, claims are resolved by priority — **identical to the AI's priority order** (Section 15.3): **Air Strike > Transport > Production**.
- Orders that cannot be funded under this priority are **blocked/rejected outright** — consistent with the existing "insufficient Oil → blocked" pattern (Section 3.2, 5.2). No partial fulfillment.

---

## 4. Development Systems

Three distinct categories with different purchase/rebuild models:

| | Civil | Government | Military |
|---|---|---|---|
| Buildings | Health Center, Education Center, Water & Sanitation Center, Economic Center, Roads | Outreach Center | Barracks, Aircraft/Tank/Missile Factory, Oil Derrick, Intelligence Center |
| Purchase model | Bought once, auto-spreads from Capital outward | Bought once, auto-spreads from Capital outward | Bought repeatedly, manually, per location |
| Instance limit | Max 1 per building type per region | Max 1 per terrain category per map (max 3 total) | Max 2 per building type per map (Intelligence Center: max 1; Oil Derrick: max 4) |
| If destroyed | **Auto-rebuilt** — no repurchase needed | **Auto-rebuilt** — no repurchase needed | Must be **manually repurchased and rebuilt**; can relocate to a different region |

**Catatan desain (v0.0.3, dikonfirmasi human 19 September 2026):** Batas "max 2 per tipe bangunan per map" untuk kategori Military (termasuk Barracks) **disengaja** sebagai bottleneck strategis — bukan kesalahan penulisan. Dengan hanya 2 Barracks untuk seluruh 15 region Player, kapasitas produksi AD sengaja dibuat terbatas agar keputusan lokasi & timing produksi jadi keputusan strategis, bukan sekadar scaling linear terhadap jumlah wilayah dikuasai.

### 4.1 Civil Development
- Construction spreads automatically outward from the Capital once purchased; frontline regions have reduced construction speed; construction continues uninterrupted after a region changes hands.
- Each civil facility (including Roads) contributes up to **+10% Regional Support**, accruing **linearly** from zero once construction completes, plateauing at the cap (Section 11.2). Accrual duration: DRAFT (60 days), see companion document Section 2.
- **Roads** are terrain-locked: Dirt Road (Mountain/Forest), Main Road (Rural), Toll Road (Urban). Only one road type can exist per region, matching its terrain. Roads significantly improve military transport speed and slightly improve construction speed, in addition to their Support contribution.
- `FUTURE`: Facility branching (e.g. Health Center → Clinic → Hospital). Not part of the current system.

### 4.2 Government Development
- **Outreach Center:** Effect = 2x construction speed for one targeted terrain category. Max 1 per terrain category per map (max 3 total). Auto-rebuilds if destroyed.

### 4.3 Military Development
- **AD (land infantry):** produced at Barracks. Production is a **player-controlled toggle (ON/OFF)** — not automatic/unattended. Sequential (1 at a time per Barracks); full Money cost paid upfront when toggled on; if stopped mid-progress, the in-progress unit is lost but 50% of its Money cost is refunded. No Oil consumption (Section 3.2). Cost/duration: DRAFT, see companion document Section 5.
- **Tank:** produced at Tank Factory. More expensive and higher power than AD, but in Mountain/Forest: speed drops one additional tier (extremely slow) and power is reduced by 80%.
- **Jet/Aircraft:** produced at Aircraft Factory. Can attack frontlines, strike deep enemy regions, or patrol against enemy aircraft — mutually exclusive missions (Section 7).
- **Missile:** produced at Missile Factory. Offensive strike and anti-missile interception. Ineffective against frontline AD; if it penetrates enemy anti-missile defense, randomly damages an enemy facility (may take multiple missiles to destroy one).
- **Intelligence (Personnel & Drones):** produced at Intelligence Center (max 1/map) via two independent tracks. Personnel reveal enemy frontline info; Drones reveal deeper enemy regions.
- **Factory/Intelligence Center production model** (Tank, Aircraft, Missile, Intelligence): FIFO queue, unlimited length, 1 order processed at a time per Factory/track. Full cost (Money **and** Oil) paid upfront at order placement (not at processing start). Any order (queued or processing) can be canceled for a flat 50% refund of both Money and Oil.

### 4.4 Policy Development
- **Anti-corruption Policy** (not a building — a global policy applied once, effects accrue gradually and apply map-wide):
  - Max **4 levels**.
  - **Effect 1 (Support bonus):** +10% Regional Support per level, gradual, own Support-source category (separate from facilities/roads). Max level = +40% total.
  - **Effect 2 (corruption reduction):** multiplies Corruption's natural decay rate. Base rate = 1.0x; each level adds +0.5x. Max level = 3.0x.
  - No activation/upkeep cost currently exists. `FUTURE`: a cost mechanic may be added later (see Section 15.5 for the AI trigger implication if this happens).
- **"Anti-inflation" does not exist.** Inflation (rises from construction/production/training; increases prices of construction/training/production/upgrades; decreases naturally over time) has **no** active player-facing counter-mechanic.

---

## 5. Time, Terrain & Movement

### 5.1 Time Scale
- Game starts 1 January 2000. **1 in-game day = 1 real-world second** (LOCKED).

### 5.2 Terrain Movement
- Base speed ordering: Mountain/Forest = very slow; Rural = slow; Urban = fairly slow. Exact travel times: DRAFT, see companion document Section 8.1.
- Roads improve movement by one speed tier.
- Tank suffers an additional movement/power penalty in Mountain/Forest (Section 4.3). Exact penalty duration: DRAFT, see companion document Section 8.3.
- Capital placement grants a special transport-speed bonus for its region. DRAFT value: +2 tiers faster than base terrain — see companion document Section 8.2.

### 5.3 Movement Model
- Region-to-region graph model — **no continuous coordinate simulation** (no 10%/50%/etc. position tracking).
- Player selects how many units to move from a region; selected units travel together as one group.
- Player can **cancel** movement mid-transit, or **change destination** mid-transit.
- Long-distance orders (A→C, non-adjacent) are supported; the game auto-calculates the route.
- **Fastest-route pathfinding:** chooses the route with minimum total travel time **among routes that entirely avoid Enemy-owned territory** — not necessarily fewest regions/steps/shortest geometric distance.
- **Dynamic rerouting:** if conditions change mid-transit (e.g. a region on the route changes ownership), the route recalculates automatically.
- **Movement through Enemy territory is NOT allowed.** Since ownership is strictly binary (Section 2, clarified v0.0.2), a route may only pass through Player-owned regions. If no such route exists (e.g. destination is fully cut off), the movement order is **blocked/rejected outright** — same blocking pattern as insufficient Oil. A region isolated by Enemy territory is genuinely cut off from all Player logistics until a safe route reopens.
- Transit Combat (interception during movement) is explicitly **not part of the design** (`FUTURE`).
- AD and Tank share the same base terrain movement speed; only their terrain modifiers differ.

---

## 6. Ground Combat

### 6.1 Frontline Power
- Combat is never "higher power = automatic win." Equal forces (e.g. 1 AD vs 1 AD) start at a 50:50 ratio and can remain in stalemate indefinitely if neither side reinforces.

### 6.2 Frontline Pressure
- Adding forces shifts the ratio according to the Power Ratio formula: total power of one side ÷ combined total power of both sides (see companion document Section 4.0). Example (illustrative): 2 AD vs 1 AD → 67:33 initial. Sustained superiority causes gradual pressure drift toward one side. Frontline Power Ratio, Frontline Pressure, and Attack Success Chance are three distinct, separate systems. Exact drift rate: DRAFT, see companion document Section 4.2.

### 6.3 Ground Offensive & Retreat
- Attacks are not instant — an attack-in-progress notification appears, and the attacker may **Retreat** (pull back mid-attack) before it concludes. Failing to retreat from a failed attack risks losing/having forces captured (captured Tanks can be reused by the Enemy).
- **Terminology:** "Retreat" refers exclusively to an **attacker** pulling back mid-attack. This is distinct from "Withdraw," used exclusively for **defending** forces pulling back (Section 15.2).
- Exact Attack Success formula: DRAFT, see companion document Section 4.1.

### 6.4 Defensive Adjacency
- Each friendly adjacent region reduces the attacker's Attack Success Chance by 5 percentage points, applied as a direct modifier to Attack Success% (see companion document Section 4.1) — independent of Power Ratio and Frontline Pressure, consistent with the three-separate-systems principle (Section 6.2). Terrain affects adjacency's strategic value: City = low, Rural = medium, Mountain/Forest = high.
- **[v0.0.3, dikonfirmasi human]** Sebelumnya deskripsi ini kontradiktif dengan companion document Section 4.1 (yang sudah memformulasikannya sebagai modifier Success% langsung, bukan penambah "effective defense"). Direkonsiliasi ke satu mekanisme: modifier Success% langsung.

---

## 7. Air Warfare

- A Jet cannot perform multiple missions simultaneously; **Patrol** and **Strike** are mutually exclusive. After a mission, the Jet enters cooldown. Cooldown duration: DRAFT (5 days), see companion document Section 4.3.
- **Patrol:** temporary, intercepts enemy aircraft.
- **Strike:** attacks frontline forces or strikes deeper enemy regions; destroying facilities via Strike requires appropriate Intelligence. Effectiveness values: DRAFT, see companion document Section 4.3.

---

## 8. Intelligence

- **Personnel:** reveal enemy frontline info (AD count, facilities, Jet patrol status, Tanks).
- **Drones:** reveal deeper enemy regions.

---

## 9. Missiles

- Can strike deep enemy regions **without** requiring Intelligence.
- Not effective against frontline AD.
- If a missile penetrates enemy anti-missile defense, it randomly damages one enemy facility; multiple missiles may be needed to destroy a facility.

---

## 10. Capture & Stabilization

Upon successfully capturing an Enemy region:

1. Ownership transfers to Player immediately.
2. **100% of the Enemy's civil facilities in that region are destroyed.**
3. Regional Support is set to **1%**.
4. Player forces remaining in the region enter **Stabilization Mode**: restricted to defense only (cannot attack) until Regional Support reaches **50%**.
5. Civil reconstruction (Section 4.1) begins immediately, running in parallel with stabilization.
6. Enemy may immediately counterattack — Enemy forces are not automatically destroyed by the capture and may Retreat, Defend, or use another strategy.
7. Stabilization-Mode forces **may be withdrawn** to reinforce other frontlines (Section 15.2), at the risk of losing the newly captured region to counterattack with little resistance — this is a deliberate design choice (conquest must create risk, Section 20).
8. **Note:** the automatic facility destruction from capture does **NOT** trigger Global Support loss (Section 16) — only deliberate/active strikes on facilities do.

---

## 11. Regional Support

Represents the internal social/political condition of an individual region. Dynamic; can rise or fall; does **not** recover naturally without positive factors.

### 11.1 Positive Factors
- Civil facilities, Economic Center, Roads, Anti-corruption Policy (Section 4.4).
- Each civil facility (including Roads): up to **+10%**, gradual **linear** accrual from zero at construction completion, plateauing at cap. This is a per-facility individual cap, not pooled per category.
- Military presence has **no** direct Support effect.

### 11.2 Negative Factors

**Tax Pressure** — Threshold-based (tiered) model, 4 tiers: Low / Medium / High / Radical, based on **absolute** tax rate. Each tier has its own fixed Support-decline rate (step function). Values: DRAFT, see companion document Section 1.1.

**Corruption** — Proportional/linear model: Support decline scales linearly with current Corruption value, no tiers. Corruption increases from civil/military construction and military production/training; it has a **natural decay** over time (very slow rate), which can be accelerated via Anti-corruption Policy's multiplier (Section 4.4). Coefficient/decay rate: DRAFT, see companion document Section 1.2.

---

## 12. Insurgency

### 12.1 Trigger & Initial Delay
- Condition: Regional Support < 0%. Insurgency does not appear instantly — there is a delay.
- **Formula (LOCKED shape): Delay = 30 days ÷ 2ⁿ**, where n = number of -25% thresholds crossed since Support first went below 0%.

| Support range | n | Delay |
|---|---|---|
| 0% to -24% | 0 | 30 days |
| -25% to -49% | 1 | 15 days |
| -50% to -74% | 2 | 7.5 days |
| -75% to -99% | 3 | 3.75 days |
| -100% | 4 | 1.875 days |

- `n` recalculates dynamically as Support crosses new bands. Total delay is recomputed from the original trigger point using current `n`, minus elapsed time; if elapsed time already exceeds the recomputed total, insurgency triggers **immediately**.

### 12.2 Insurgent Power & Unit Count Escalation
- Tiered/step model reusing the same 5 Support bands as the initial-delay formula above. Power and Unit Count escalate together via a **cumulative baseline-per-tier lookup** (each tier's value already includes all lower tiers).
- The baseline acts as a **symmetric cap**, not a forced value: worsening Support raises the cap but doesn't force-kill/top-up existing units; improving Support lowers the cap but doesn't force-remove units currently above it.
- Values: DRAFT, see companion document Section 3.2.

### 12.3 Suppression & Recurrence
- AD can suppress/eliminate insurgents. After all active insurgents are defeated, the region enters **SUPPRESSED** state — not permanently safe; if Support continues deteriorating, insurgency can return, potentially at a higher power tier.

### 12.4 Spread
- Conditions: insurgency remains undefeated for **30 in-game days (FINAL, fixed)** AND the region's Support remains below 0%.
- **Model:** deterministic (not probabilistic) once both conditions are met.
- Exactly **1** target region per spread event, selected only from same-owner neighboring regions that do not already have active insurgency, weighted by neighbor condition. Formula: DRAFT, see companion document Section 3.3.
- **Chain reaction enabled:** a newly-infected region can itself trigger further spread after another 30 days if unresolved. The source region can also repeat spread every 30-day interval while still unresolved.
- No artificial growth cap — bounded only by map connectivity. This is an **intentional existential threat** to the Player's entire territory, directly tied to the "all regions insurgent-controlled" loss condition (Section 17).

### 12.5 Facility Damage (REVISED, v0.0.2 — LOCKED)

- Unresolved insurgency can damage and eventually destroy facilities, removing their Support contribution immediately, creating a negative feedback loop: Support ↓ → Insurgency → Facility Damage → Support ↓ further → Insurgent Power ↑.
- **Scope (revised this session):** Damage now applies to **both Civil facilities AND Military buildings** in the infected region — not Civil-only as earlier drafts implied.
- **Consequence of this revision:** Since Military buildings do not auto-rebuild (Section 4, unlike Civil facilities), an unresolved insurgency can inflict **permanent** military infrastructure loss requiring full manual repurchase — a materially higher stake than losing Civil Support contribution alone.
- Damage rate: DRAFT (5%/day, 20 days to total destruction), see companion document Section 3.4.

---

## 13. Time Tick & Simulation Loop

- **Single global tick** drives all simulation systems (Regional Support, Corruption, Tax, construction progress, insurgency timers, etc.) — once per in-game day (once per real-world second). No per-system tick rates in this version.
- **Effect aggregation:** within one tick, Support effects are grouped by source category (facilities, roads, tax, corruption, Anti-corruption Policy, etc.), each respecting its own cap where applicable, then summed into a single net delta applied once at tick end.
- **Fractional precision:** Regional Support is stored internally as a decimal value; the player-facing UI always rounds to a whole number.
- **Simulation vs. render loop:** simulation logic advances exactly once per in-game day, independent of render/animation frame rate. Specific engine implementation is an Implementation Architecture decision, out of scope for this GDD.
- **Construction completion timing:** a facility's Support contribution begins accruing on the same tick construction completes — no 1-tick delay.
- **Simultaneous threshold evaluation:** all Support/Insurgency thresholds are evaluated together at tick end, based on that tick's final Support value.
- **Linear growth is the default model** for every "gradual toward cap" system in the game (facility Support accrual, Anti-corruption Policy's two effects, Corruption's natural decay, and any future gradual system) unless explicitly stated otherwise.

---

## 14. Production & Logistics

*(Consolidated from Sections 3.2/4.3 for quick reference.)*

| System | Model |
|---|---|
| Barracks (AD) | Player toggle ON/OFF, sequential, Money-only, 50% refund if stopped mid-progress |
| Tank/Aircraft/Missile Factory | FIFO queue, Money+Oil upfront, 50% refund (both) on cancellation |
| Intelligence Center | Two independent FIFO tracks (Personnel, Drone), each inheriting the Factory model, can run simultaneously |
| Oil Derrick | Passive, automatic, continuous, no toggle/order |
| Oil-for-transport | Cost = units × travel time, upfront, refunded/recalculated on cancel/reroute |
| **Player Oil arbitration (NEW)** | **Air Strike > Transport > Production; under-prioritized orders blocked outright** |

`FUTURE`: Supply Line concept (routes that can be cut off by insurgent/enemy territory) — explicitly deferred.

---

## 15. AI Behavior

All three sub-models below target **Normal AI** difficulty (Section 18). All are LOCKED at the behavior level; numeric thresholds/weights are DRAFT — see companion document Section 9.

### 15.1 Offensive Decision Model

```text
For each active frontline:
    Compute estimated Attack Success Chance (6.3)
    IF below Gate threshold X% → exclude from consideration

For each frontline that passed the Gate:
    Compute weighted Score from:
        Power Ratio + Frontline Pressure
        + Target strategic value (Support + facilities)
        + Idle air/missile support
        − Post-capture Stabilization risk

Compare scores globally across all surviving frontlines.
IF highest score > threshold Y: AI commits forces to that frontline.
ELSE: AI takes no offensive action this cycle (may choose to wait).
```

### 15.2 Defensive Decision Model

```text
Every tick, for each frontline:
    Compute Threat Level (Frontline Pressure + Power Ratio + Terrain adjacency value)
    IF Threat Level < threshold Z → Defend (no special action)
    ELSE:
        Compute Action Score for Reinforce / Withdraw / Abandon:
            + Strategic value of holding
            + Reinforcement feasibility (travel time, reserve availability)
            − Opportunity cost to other frontlines
            + Estimated outcome if held without reinforcement
        Select the highest-scoring action

Separately, at all times:
    IF Capital is a frontline OR Capital Threat Level > critical threshold:
        Trigger Capital Relocation evaluation (absolute override, outside Action Score)
        → Relocation executes INSTANTLY per Section 2.4 (v0.0.2)
```

- **Reinforce** = send forces, hold position. **Withdraw** = pull existing forces back before defeat (troops survive; region may fall) — distinct from "Retreat" (Section 6.3), which is attacker-only terminology.
- **Abandon** = deliberate upfront decision not to contest a region.
- **Capital Relocation is a separate, absolute-priority override** — not part of the regular Action Score, since losing the Capital is an immediate loss condition. Per Section 2.4, execution is instantaneous once triggered.

### 15.3 Economic Decision Model

**Tax Rate:** Global/uniform for Normal AI. Dynamic — shifts based on four combined trigger factors:
1. AI Money reserve (low → raise; high → lower).
2. War/conflict intensity (many high Threat/Attack Score frontlines → raise temporarily).
3. Planned large construction/production spending.
4. **AI-wide average Regional Support (emergency brake)** — hard override, winning absolutely over factors 1-3.

**Oil Allocation:** Explicit priority hierarchy — **Air Strike > Transport > Production** (now also applied to Player per Section 3.2.1).

**Production Priority:** Adaptive, 3-layer model — Baseline (map terrain) → Real-time modifier (tactical conditions) → Intelligence as a separate non-competing trickle.

**Construction Priority:** 2-layer model — Hard prerequisite (≥1 Barracks + Factory access) → Soft competition (weighted score).

**Anti-corruption Policy trigger:** Proactive/default-on — AI raises it to maximum as soon as Money allows.

---

## 16. Global Support & Sanctions

- Separate from Regional Support — represents international/global perception, not internal political condition.
- **Symmetric tracking structure**: both Player and Enemy each have an independent Global Support value. Sanction effects table is currently Player-side only.

### 16.1 Trigger (Player)
- Starts at 100%.
- **Single trigger:** a deliberate/active attack that damages a civil facility (Missile strike or Air Strike targeting a facility). Facility destruction that occurs automatically from Capture (Section 10) does **NOT** trigger this.

### 16.2 Decay & Recovery
- Each triggering event: flat **-25%** (confirmed this session as working value). No recovery mechanism.

### 16.3 Sanction Thresholds

| Threshold crossed | Effect |
|---|---|
| 100% → 75% | Enemy receives coalition reinforcement: **2 Battalion (AD) + 1 Tank** |
| 75% → 50% | Enemy receives coalition reinforcement: **1 Jet + 1 Drone + 100 Missiles** |
| 50% → 25% | **2 of Player's Oil Derricks become permanently non-functional** (Player chooses which 2) |
| 25% → 0% | **Player's nation is struck with a nuclear weapon by the coalition — Player automatically loses** |

---

## 17. Victory, Defeat & Endgame

### 17.1 Defeat Conditions (Player)
Player loses if **any** of:
1. All Player regions are conquered.
2. Capital is captured while a frontline, before relocation (relocation is instantaneous per Section 2.4 — Player's constraint is timing, not process interruption).
3. All Player regions are controlled by insurgents.
4. Player's Global Support reaches 0%.

### 17.2 Victory Conditions (Player)
- Symmetric to defeat conditions 1-3 only. Single victory path — no Time Limit, Score-based, or other alternative victory condition.

### 17.3 Endgame Presentation
- Identical statistical structure for both Victory and Defeat.
- **5 statistic categories:** Result Summary, Duration & Scale, Military, Social/Political, Global.
- No replay/milestone-timeline feature. Post-game flow: single action, return to Main Menu.

---

## 18. Difficulty

**AI Difficulty:** Easy / Normal / Hard (conceptual). **Normal AI is the v0.0.1/v0.0.2 development target.**

**Map Difficulty:** Easy (Rural+Urban only), Medium (all terrains, Rural-dominant — **default map tier**), Hard (Mountain/Forest-dominant). Easy/Hard concrete layouts remain `FUTURE`.

---

## 19. Map Layout — RECONSTRUCTED v0.0.3 (LOCKED, disetujui human 19 September 2026)

**Total: 30 regions** — 15 Player, 15 Enemy. Structure: 3×5 grid per side, 3 frontlines at start (one per row).

**Catatan versi:** Dokumen v0.0.1 yang sebelumnya dirujuk sebagai sumber tabel region lengkap ternyata tidak eksis/tidak tersimpan (dikonfirmasi human, audit 19 Sep 2026). Layout di bawah ini **dibangun ulang**, bukan disalin — divalidasi konsisten dengan Capital placement (P6/E10) yang sudah ada di versi sebelumnya.

### 19.1 Struktur Grid

- Kolom Player: 1 (belakang, dekat home) → 5 (depan, berbatasan Enemy).
- Kolom Enemy: 1 (depan, berbatasan Player) → 5 (belakang, dekat home) — cermin dari Player.
- Frontline hanya terbentuk di titik temu kolom terdepan tiap lane (lihat 19.3).

### 19.2 Tabel Region & Terrain

| Region | Lane | Kolom (jarak dari frontline) | Terrain | Catatan |
|---|---|---|---|---|
| P1 | 1 | 1 (belakang) | Rural | |
| P2 | 1 | 2 | Rural | |
| P3 | 1 | 3 | Mountain/Forest | |
| P4 | 1 | 4 | Rural | |
| P5 | 1 | 5 (depan) | Urban | Frontline vs E1 |
| P6 | 2 | 1 (belakang) | Urban | **Capital** |
| P7 | 2 | 2 | Rural | |
| P8 | 2 | 3 | Rural | |
| P9 | 2 | 4 | Mountain/Forest | |
| P10 | 2 | 5 (depan) | Rural | Frontline vs E6 |
| P11 | 3 | 1 (belakang) | Rural | |
| P12 | 3 | 2 | Mountain/Forest | |
| P13 | 3 | 3 | Rural | |
| P14 | 3 | 4 | Rural | |
| P15 | 3 | 5 (depan) | Urban | Frontline vs E11 |
| E1 | 1 | 1 (depan) | Urban | Frontline vs P5 |
| E2 | 1 | 2 | Rural | |
| E3 | 1 | 3 | Mountain/Forest | |
| E4 | 1 | 4 | Rural | |
| E5 | 1 | 5 (belakang) | Rural | |
| E6 | 2 | 1 (depan) | Rural | Frontline vs P10 |
| E7 | 2 | 2 | Mountain/Forest | |
| E8 | 2 | 3 | Rural | |
| E9 | 2 | 4 | Rural | |
| E10 | 2 | 5 (belakang) | Urban | **Capital** |
| E11 | 3 | 1 (depan) | Urban | Frontline vs P15 |
| E12 | 3 | 2 | Rural | |
| E13 | 3 | 3 | Rural | |
| E14 | 3 | 4 | Mountain/Forest | |
| E15 | 3 | 5 (belakang) | Rural | |

**Distribusi terrain per sisi:** 9 Rural (60%) / 3 Mountain-Forest / 3 Urban — Rural-dominant, semua terrain terwakili (sesuai Section 18, Difficulty Medium).

### 19.3 Adjacency Rules

1. **Dalam satu lane** (kolom berurutan): P1–P2–P3–P4–P5; P6–P7–P8–P9–P10; P11–P12–P13–P14–P15. Sama untuk E1–E5, E6–E10, E11–E15.
2. **Antar-lane, kolom sama** (jalur lateral): P1–P6–P11; P2–P7–P12; P3–P8–P13; P4–P9–P14; P5–P10–P15. Pola sama untuk sisi Enemy.
3. **Lintas sisi (frontline)** — HANYA 3 titik ini menghubungkan Player↔Enemy di awal game: P5↔E1, P10↔E6, P15↔E11.
4. Tidak ada koneksi lintas-sisi lain — konsisten dengan "movement through Enemy territory not allowed" (Section 5.3).

### 19.4 Verifikasi terhadap Constraint Asli

| Requirement asli | Status |
|---|---|
| 30 region, 15 Player / 15 Enemy | PASS |
| 3×5 grid per sisi | PASS |
| 3 frontline saat start, satu per row | PASS |
| Capital di P6 dan E10 | PASS |
| Difficulty Medium: semua terrain ada, Rural-dominant | PASS |

---

## 20. Design Principles

1. **No Simple Power-Wins-Combat.**
2. **Conquest Must Create Risk.**
3. **Military and Civil Systems Interact.**
4. **Behavior Before Numbers** — now complemented by a completed Numeric Balancing Draft (companion document); all constants have playtest-ready DRAFT values, none are permanent-final until playtested.

---

## 21. Glossary

- **AD (Angkatan Darat)** — unit infanteri darat dasar, diproduksi di Barracks (Section 4.3). Istilah dipinjam dari nomenklatur militer Indonesia (harfiah: "Angkatan Darat"/Army), dipakai sebagai nama unit gameplay — bukan merujuk institusi militer sungguhan mana pun. *(ditambahkan v0.0.3, dikonfirmasi human)*
- **Retreat** — an **attacker** pulling back forces mid-attack.
- **Withdraw** — **defending** forces pulling back before/during being attacked, to save troops.
- **Abandon** — a deliberate upfront decision not to contest a region at all.
- **Stabilization Mode** — restricted-to-defense state for forces in a newly captured region until its Support reaches 50%.
- **SUPPRESSED** — state after all active insurgents in a region are defeated; not permanently safe.
- **Frontline** — automatic condition arising from direct adjacency between a Player-owned and an Enemy-owned region.
- **Global Support** — international/global perception metric, separate from Regional Support.
- **Regional Support** — internal social/political condition of a specific region.
- **Neutral Region** — does not exist in this version (clarified v0.0.2); ownership is strictly binary.

---

## 22. Numeric Constants Register (status tracking only)

All constants formerly marked `UNSETTLED` in v0.0.1 Appendix now have DRAFT values assigned. See `The_Warfare_Numeric_Balancing_Draft.md` for the complete register with values and rationale.

**Koreksi v0.0.3 (audit 19 Sep 2026):** Klaim sebelumnya ("14 items, no numeric constant remains fully unassigned") tidak akurat — Tank Mountain/Forest power penalty (-80%, Section 4.3) sempat lolos dari register. Sudah diregister sebagai item ke-15 (companion document Section 4.4).

**Future/deferred concepts (unchanged, do not implement):**
- Facility branching, Military-civil integration/training, Supply Line concept, Transit Combat, Global Support sanctions mirrored for Enemy, Insurgency/conquest-speed-based Global Support triggers, alternative victory conditions, endgame replay feature, Easy/Hard-tier map layouts, per-region adaptive Tax Rate for Enemy AI, Anti-corruption Policy cost mechanic.

---

*End of GDD v0.0.4. See `The_Warfare_Numeric_Balancing_Draft.md` for full numeric values. See `the_warfare_concept.md` (versi terakhir v0.0.8) for discussion history behind v0.0.1 decisions (catatan: konten concept doc sudah terserap penuh ke GDD ini, dikonfirmasi human).*
