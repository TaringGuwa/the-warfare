# THE WARFARE
## Game Design Document — v0.0.1

**Status:** Behavior-complete. Numeric constants marked `UNSETTLED` are intentional placeholders reserved for the balancing/playtest phase and do not block implementation of system behavior.

**How to read this document:** Every rule is either `LOCKED` (finalized behavior, implement as specified) or `UNSETTLED` (behavior/model is finalized, but the exact number is a placeholder — use a reasonable default and expose it as an easily-tunable value). Nothing marked `FUTURE` should be implemented in this version.

---

## Table of Contents

1. Overview
2. Core Game Rules
3. Economy
4. Development Systems (Civil / Government / Military / Policy)
5. Time, Terrain & Movement
6. Ground Combat
7. Air Warfare
8. Intelligence
9. Missiles
10. Capture & Stabilization
11. Regional Support
12. Insurgency
13. Time Tick & Simulation Loop
14. Production & Logistics
15. AI Behavior
16. Global Support & Sanctions
17. Victory, Defeat & Endgame
18. Difficulty
19. Map Layout (v0.0.1 Default Map)
20. Design Principles
21. Glossary
22. Appendix: Full Unsettled/Deferred Register

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
- A **frontline** automatically exists wherever a Player-owned region is directly adjacent to an Enemy-owned region. Frontlines are not fixed map objects — they emerge and dissolve automatically as ownership changes.
- The number of active frontlines is dynamic and map-dependent. The v0.0.1 default map (Section 19) has exactly 3 frontlines at game start.
- **Capital:** Player may place their Capital in any region (Section 19 gives the default map's suggested placement). The Capital can be relocated if it becomes a frontline. If the Capital is captured before relocation, the Player loses immediately (Section 17).
- See Section 17 for full loss/win conditions.

---

## 3. Economy

### 3.1 Money
- Generated through regional taxation; tax rate is adjustable per region by the Player (Enemy AI's tax model is global — see Section 15.3).
- Higher tax rate → faster wealth generation, but faster Regional Support decline (Section 11.5).
- Used for: military salaries, construction, training, military production, policy development.

### 3.2 Oil
- Produced by **Oil Derrick** (max 4 per map; cannot be built in Urban regions; passive/automatic/continuous output once built — no toggle).
- Oil is consumed by three competing uses: **Air Strikes, Transport (troop movement), and Production** (Tank/Aircraft/Missile/Intelligence Center — NOT AD/Barracks, which is Money-only).
- Given the 4-derrick cap and three concurrent consumers, Oil is intentionally a heavily-constrained strategic resource.
- **Oil-for-transport:** cost = f(units moved × estimated travel time), paid upfront when the order is issued. Insufficient Oil blocks the movement order outright (no partial/debt movement). Refunded proportionally on cancellation (5.2); recalculated (charge/refund the difference) on destination change (5.3) or dynamic reroute (5.9). `UNSETTLED`: exact rate coefficient.
- **Oil-for-production:** flat Oil cost per order, paid upfront alongside Money, same timing/refund rules as the Money component (Section 14.2/14.3). `UNSETTLED`: exact cost per unit type.

---

## 4. Development Systems

Three distinct categories with different purchase/rebuild models:

| | Civil | Government | Military |
|---|---|---|---|
| Buildings | Health Center, Education Center, Water & Sanitation Center, Economic Center, Roads | Outreach Center | Barracks, Aircraft/Tank/Missile Factory, Oil Derrick, Intelligence Center |
| Purchase model | Bought once, auto-spreads from Capital outward | Bought once, auto-spreads from Capital outward | Bought repeatedly, manually, per location |
| Instance limit | Max 1 per building type per region | Max 1 per terrain category per map (max 3 total) | Max 2 per building type per map (Intelligence Center: max 1; Oil Derrick: max 4) |
| If destroyed | **Auto-rebuilt** — no repurchase needed | **Auto-rebuilt** — no repurchase needed | Must be **manually repurchased and rebuilt**; can relocate to a different region |

### 4.1 Civil Development
- Construction spreads automatically outward from the Capital once purchased; frontline regions have reduced construction speed; construction continues uninterrupted after a region changes hands.
- Each civil facility (including Roads) contributes up to **+10% Regional Support**, accruing **linearly** from zero once construction completes, plateauing at the cap (Section 11.2).
- **Roads** are terrain-locked: Dirt Road (Mountain/Forest), Main Road (Rural), Toll Road (Urban). Only one road type can exist per region, matching its terrain. Roads significantly improve military transport speed and slightly improve construction speed, in addition to their Support contribution.
- `FUTURE`: Facility branching (e.g. Health Center → Clinic → Hospital). Not part of the current system.

### 4.2 Government Development
- **Outreach Center:** Effect = 2x construction speed for one targeted terrain category. Max 1 per terrain category per map (max 3 total). Auto-rebuilds if destroyed.

### 4.3 Military Development
- **AD (land infantry):** produced at Barracks. Production is a **player-controlled toggle (ON/OFF)** — not automatic/unattended. Sequential (1 at a time per Barracks); full Money cost paid upfront when toggled on; if stopped mid-progress, the in-progress unit is lost but 50% of its Money cost is refunded. No Oil consumption (Section 3.2).
- **Tank:** produced at Tank Factory. More expensive and higher power than AD, but in Mountain/Forest: speed drops one additional tier (extremely slow) and power is reduced by 80%.
- **Jet/Aircraft:** produced at Aircraft Factory. Can attack frontlines, strike deep enemy regions, or patrol against enemy aircraft — mutually exclusive missions (Section 7).
- **Missile:** produced at Missile Factory. Offensive strike and anti-missile interception. Ineffective against frontline AD; if it penetrates enemy anti-missile defense, randomly damages an enemy facility (may take multiple missiles to destroy one).
- **Intelligence (Personnel & Drones):** produced at Intelligence Center (max 1/map) via two independent tracks. Personnel reveal enemy frontline info; Drones reveal deeper enemy regions.
- **Factory/Intelligence Center production model** (Tank, Aircraft, Missile, Intelligence): FIFO queue, unlimited length, 1 order processed at a time per Factory/track. Full cost (Money **and** Oil) paid upfront at order placement (not at processing start). Any order (queued or processing) can be canceled for a flat 50% refund of both Money and Oil.
- `UNSETTLED` throughout: exact costs, durations, per-map building output rates.

### 4.4 Policy Development
- **Anti-corruption Policy** (not a building — a global policy applied once, effects accrue gradually and apply map-wide):
  - Max **4 levels**.
  - **Effect 1 (Support bonus):** +10% Regional Support per level, gradual, own Support-source category (separate from facilities/roads). Max level = +40% total.
  - **Effect 2 (corruption reduction):** multiplies Corruption's natural decay rate. Base rate = 1.0x; each level adds +0.5x. Max level = 3.0x.
  - No activation/upkeep cost currently exists. `FUTURE`: a cost mechanic may be added later (see Section 15.5 for the AI trigger implication if this happens).
- **"Anti-inflation" does not exist.** Inflation (rises from construction/production/training; increases prices of construction/training/production/upgrades; decreases naturally over time) has **no** active player-facing counter-mechanic. This was corrected from an earlier documentation error.

---

## 5. Time, Terrain & Movement

### 5.1 Time Scale
- Game starts 1 January 2000. **1 in-game day = 1 real-world second** (LOCKED).

### 5.2 Terrain Movement
- Base speed ordering: Mountain/Forest = very slow; Rural = slow; Urban = fairly slow.
- Roads improve movement by one speed tier.
- Tank suffers an additional movement/power penalty in Mountain/Forest (Section 4.3).
- Capital placement grants a special transport-speed bonus for its region (e.g. Mountain/Forest Capital: very slow → fast). `UNSETTLED`: exact movement time values.

### 5.3 Movement Model
- Region-to-region graph model — **no continuous coordinate simulation** (no 10%/50%/etc. position tracking).
- Player selects how many units to move from a region; selected units travel together as one group.
- Player can **cancel** movement mid-transit, or **change destination** mid-transit.
- Long-distance orders (A→C, non-adjacent) are supported; the game auto-calculates the route.
- **Fastest-route pathfinding:** chooses the route with minimum total travel time **among routes that entirely avoid Enemy-owned territory** — not necessarily fewest regions/steps/shortest geometric distance.
- **Dynamic rerouting:** if conditions change mid-transit (e.g. a region on the route changes ownership), the route recalculates automatically.
- **Movement through Enemy territory is NOT allowed.** If no route exists that avoids Enemy territory entirely (e.g. destination is fully cut off), the movement order is **blocked/rejected outright** — same blocking pattern as insufficient Oil. A region isolated by Enemy territory is genuinely cut off from all Player logistics until a safe route reopens.
- Transit Combat (interception during movement) is explicitly **not part of the design** (`FUTURE`) — this remains consistent since movement through enemy territory is disallowed entirely.
- AD and Tank share the same base terrain movement speed; only their terrain modifiers differ.

---

## 6. Ground Combat

### 6.1 Frontline Power
- Combat is never "higher power = automatic win." Equal forces (e.g. 1 AD vs 1 AD) start at a 50:50 ratio and can remain in stalemate indefinitely if neither side reinforces.

### 6.2 Frontline Pressure
- Adding forces shifts the ratio (e.g. 2 vs 1 → 52:48 initial). Sustained superiority causes gradual pressure drift toward one side (e.g. 52:48 → 54:46 → ... → 99:01). Frontline Power Ratio, Frontline Pressure, and Attack Success Chance are three distinct, separate systems. `UNSETTLED`: exact drift rate/formula.

### 6.3 Ground Offensive & Retreat
- Attacks are not instant — an attack-in-progress notification appears, and the attacker may **Retreat** (pull back mid-attack) before it concludes. Failing to retreat from a failed attack risks losing/having forces captured (captured Tanks can be reused by the Enemy).
- **Terminology:** "Retreat" refers exclusively to an **attacker** pulling back mid-attack. This is distinct from "Withdraw," used exclusively for **defending** forces pulling back (Section 15.2).
- `UNSETTLED`: exact attack success formula and example percentages.

### 6.4 Defensive Adjacency
- Each friendly adjacent region provides **+5% defensive effectiveness** (not raw power) — e.g. base 100 + 2 friendly adjacent regions = 110 effective defense. Terrain affects adjacency's strategic value: City = low, Rural = medium, Mountain/Forest = high.

---

## 7. Air Warfare

- A Jet cannot perform multiple missions simultaneously; **Patrol** and **Strike** are mutually exclusive. After a mission, the Jet enters cooldown.
- **Patrol:** temporary, intercepts enemy aircraft.
- **Strike:** attacks frontline forces or strikes deeper enemy regions; destroying facilities via Strike requires appropriate Intelligence.
- Example dynamic (`UNSETTLED` exact values): committing an entire air fleet to one strike leaves it fully on cooldown, creating a counterplay window for the opponent to strike multiple frontlines with their own uncommitted air force.

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
- Military presence has **no** direct Support effect (`FUTURE`: military-civil integration/training could change this — not implemented).

### 11.2 Negative Factors

**Tax Pressure** — Threshold-based (tiered) model, 4 tiers: Low / Medium / High / Radical, based on **absolute** tax rate (not relative to any average). Each tier has its own fixed Support-decline rate (step function). `UNSETTLED`: tier boundaries and per-tier decline rates.

**Corruption** — Proportional/linear model: Support decline scales linearly with current Corruption value, no tiers (unlike Tax). Corruption increases from civil/military construction and military production/training; it now has a **natural decay** over time (very slow rate), which can be accelerated via Anti-corruption Policy's multiplier (Section 4.4). `UNSETTLED`: proportionality coefficient and base decay rate.

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

- `n` recalculates dynamically as Support crosses new bands. Total delay is recomputed from the original trigger point using current `n`, minus elapsed time; if elapsed time already exceeds the recomputed total, insurgency triggers **immediately**. If Support drops past multiple thresholds in a single tick, `n` reflects the total thresholds crossed at once (not staged).
- `UNSETTLED`: the 30-day baseline value (the ÷2ⁿ formula shape itself is final).

### 12.2 Insurgent Power & Unit Count Escalation
- Tiered/step model reusing the same 5 Support bands as the initial-delay formula above. Power and Unit Count escalate together via a **cumulative baseline-per-tier lookup** (each tier's value already includes all lower tiers).
- The baseline acts as a **symmetric cap**, not a forced value: worsening Support raises the cap but doesn't force-kill/top-up existing units; improving Support lowers the cap but doesn't force-remove units currently above it.
- `UNSETTLED`: exact Power and Unit Count values per tier.

### 12.3 Suppression & Recurrence
- AD can suppress/eliminate insurgents. After all active insurgents are defeated, the region enters **SUPPRESSED** state — not permanently safe; if Support continues deteriorating, insurgency can return, potentially at a higher power tier.

### 12.4 Spread
- Conditions: insurgency remains undefeated for **30 in-game days (FINAL, fixed — no calendar variation)** AND the region's Support remains below 0%.
- **Model:** deterministic (not probabilistic) once both conditions are met.
- Exactly **1** target region per spread event, selected only from same-owner neighboring regions that do not already have active insurgency, weighted by neighbor condition (`UNSETTLED`: exact weighting formula).
- **Chain reaction enabled:** a newly-infected region can itself trigger further spread after another 30 days if unresolved. The source region can also repeat spread every 30-day interval while still unresolved.
- No artificial growth cap — bounded only by map connectivity. This is an **intentional existential threat** to the Player's entire territory, directly tied to the "all regions insurgent-controlled" loss condition (Section 17).

### 12.5 Facility Damage
- Unresolved insurgency can damage and eventually destroy facilities (removing their Support contribution immediately), creating a negative feedback loop: Support ↓ → Insurgency → Facility Damage → Support ↓ further → Insurgent Power ↑. `UNSETTLED`: exact damage rate.

---

## 13. Time Tick & Simulation Loop

- **Single global tick** drives all simulation systems (Regional Support, Corruption, Tax, construction progress, insurgency timers, etc.) — once per in-game day (once per real-world second). No per-system tick rates in this version.
- **Effect aggregation:** within one tick, Support effects are grouped by source category (facilities, roads, tax, corruption, Anti-corruption Policy, etc.), each respecting its own cap where applicable, then summed into a single net delta applied once at tick end.
- **Fractional precision:** Regional Support is stored internally as a decimal value; the player-facing UI always rounds to a whole number. Decimal precision is invisible to the player and exists purely for smooth small-effect accumulation.
- **Simulation vs. render loop:** simulation logic advances exactly once per in-game day, independent of render/animation frame rate. Specific engine implementation (fixed timestep, accumulator pattern, etc.) is an Implementation Architecture decision, out of scope for this GDD.
- **Construction completion timing:** a facility's Support contribution begins accruing on the same tick construction completes — no 1-tick delay.
- **Simultaneous threshold evaluation:** all Support/Insurgency thresholds (negative-state entry, -25/-50/-75/-100 escalation) are evaluated together at tick end, based on that tick's final Support value — regardless of how large the change was within the tick. No staged/sequential threshold checking across multiple ticks.
- **Linear growth is the default model** for every "gradual toward cap" system in the game (facility Support accrual, Anti-corruption Policy's two effects, Corruption's natural decay, and any future gradual system) unless explicitly stated otherwise. Chosen because it requires only one parameter (duration) and avoids inventing unproven curve-shape assumptions.

---

## 14. Production & Logistics

*(Consolidated from Sections 3.2/4.3 for quick reference — see there for full detail.)*

| System | Model |
|---|---|
| Barracks (AD) | Player toggle ON/OFF, sequential, Money-only, 50% refund if stopped mid-progress |
| Tank/Aircraft/Missile Factory | FIFO queue, Money+Oil upfront, 50% refund (both) on cancellation |
| Intelligence Center | Two independent FIFO tracks (Personnel, Drone), each inheriting the Factory model, can run simultaneously |
| Oil Derrick | Passive, automatic, continuous, no toggle/order |
| Oil-for-transport | Cost = units × travel time, upfront, refunded/recalculated on cancel/reroute |

`FUTURE`: Supply Line concept (routes that can be cut off by insurgent/enemy territory) — explicitly deferred, not designed at any level.

---

## 15. AI Behavior

All three sub-models below target **Normal AI** difficulty (Section 18). All are LOCKED at the behavior level; every numeric threshold/weight is `UNSETTLED`, reserved for balancing.

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

- Evaluated **globally** across all active frontlines simultaneously, not per-frontline in isolation.
- Gate metric = Attack Success Chance specifically, chosen because it already incorporates force composition.

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
```

- Evaluated **continuously, every tick** — not purely reactive to an attack already in progress, enabling preventive reinforcement.
- **Reinforce** = send forces, hold position. **Withdraw** = pull existing forces back before defeat (troops survive; region may fall) — distinct from "Retreat" (Section 6.3), which is attacker-only terminology.
- **Abandon** = deliberate upfront decision not to contest a region.
- Stabilization-Mode forces may be pulled for reinforcement elsewhere (Section 10).
- **Capital Relocation is a separate, absolute-priority override** — not part of the regular Action Score, since losing the Capital is an immediate loss condition (categorically higher stakes than any weighted comparison).

### 15.3 Economic Decision Model

**Tax Rate:** Global/uniform for Normal AI (per-region adaptive tax is reserved as a Hard AI differentiator, not yet designed). Dynamic — the single global rate shifts based on four combined trigger factors:
1. AI Money reserve (low → raise; high → lower).
2. War/conflict intensity (many high Threat/Attack Score frontlines → raise temporarily).
3. Planned large construction/production spending (raise ahead of purchase, lower after).
4. **AI-wide average Regional Support (emergency brake)** — if approaching the insurgency danger zone, tax is automatically lowered regardless of factors 1-3. This factor is a **hard override**, winning absolutely — consistent with the game's recurring pattern that existential threats always carry veto power over tactical considerations.

**Oil Allocation:** Explicit priority hierarchy — **Air Strike > Transport > Production.** Air Strike wins because tactical windows are now-or-never; Transport is second because failed reinforcement can be immediately fatal; Production is last because new units tolerate FIFO-queue delay without permanent loss.

**Production Priority (unit composition):** Adaptive, 3-layer model:
1. **Baseline** — set from the map's dominant terrain at game start (Mountain/Forest-dominant maps skew toward AD, away from Tank).
2. **Real-time modifier** — continuously adjusted from Offensive/Defensive AI conditions (many high Threat Levels shift toward AD/Tank; many high-scoring offensive opportunities with low idle air/missile support shift toward Jet/Missile).
3. **Intelligence as a separate trickle** — does NOT compete in the Baseline/Modifier ratio; receives a small continuous allocation regardless of tactical situation, because its value (improving Gate/Threat Level accuracy) is always relevant.

**Construction Priority:** 2-layer model:
1. **Hard prerequisite** — at game start, AI must build minimal core military infrastructure (≥1 Barracks + Factory access) before Production Priority has anything to execute against. Absolute requirement, not scored.
2. **Soft competition** — once met, remaining construction (additional Civil, Outreach Center, additional Military) competes via a weighted score from: AI-wide average Support, production capacity vs. demand, territory construction speed (newly captured/Stabilizing regions), relative Oil availability across its three consumers.

**Anti-corruption Policy trigger:** Proactive/default-on — AI raises it to maximum as soon as Money allows, since no cost mechanic currently exists (Section 4.4). **Mandatory revisit** if a cost mechanic is added later — would likely shift to a reactive or weighted-score model.

---

## 16. Global Support & Sanctions

- Separate from Regional Support — represents international/global perception, not internal political condition.
- **Symmetric tracking structure**: both Player and Enemy each have an independent Global Support value. **However, the sanction effects table below is currently designed for the Player side only** — a mirrored Enemy-side version is `FUTURE`/not yet designed.

### 16.1 Trigger (Player)
- Starts at 100%.
- **Single trigger:** a deliberate/active attack that damages a civil facility (Missile strike or Air Strike targeting a facility). Facility destruction that occurs automatically from Capture (Section 10) does **NOT** trigger this — that is a normal core mechanic and must not be double-penalized.
- `FUTURE` (not in v0.0.1): triggers based on uncontrolled Insurgency spread or rapid/large-scale conquest speed.

### 16.2 Decay & Recovery
- Each triggering event: flat **-25%** (working value, `UNSETTLED` — may be tuned, unlike the formula shape).
- **No recovery mechanism** — one-way/permanent for the rest of the game.

### 16.3 Sanction Thresholds (one-time trigger on crossing, then persists/cumulative)

| Threshold crossed | Effect |
|---|---|
| 100% → 75% | Enemy receives coalition reinforcement: **2 Battalion (AD) + 1 Tank** |
| 75% → 50% | Enemy receives coalition reinforcement: **1 Jet + 1 Drone + 100 Missiles** |
| 50% → 25% | **2 of Player's Oil Derricks become permanently non-functional** (Player chooses which 2) |
| 25% → 0% | **Player's nation is struck with a nuclear weapon by the coalition — Player automatically loses** (4th defeat condition, Section 17) |

---

## 17. Victory, Defeat & Endgame

### 17.1 Defeat Conditions (Player)
Player loses if **any** of:
1. All Player regions are conquered.
2. Capital is captured while a frontline, before relocation.
3. All Player regions are controlled by insurgents.
4. Player's Global Support reaches 0% (nuclear strike, Section 16.3).

### 17.2 Victory Conditions (Player)
- **Symmetric to defeat conditions 1-3 only** (not condition 4 — no mirrored Enemy Global Support win condition exists yet): Player wins if all Enemy regions are conquered, OR Enemy's Capital is captured before relocation, OR all Enemy regions are controlled by insurgents.
- **Single victory path** — no Time Limit, Score-based, or other alternative victory condition exists in v0.0.1. (`FUTURE`: possible for a separate game mode, e.g. Skirmish.)

### 17.3 Endgame Presentation
- Identical statistical structure for both Victory and Defeat — only framing/messaging differs.
- **5 statistic categories displayed:**
  1. **Result Summary** — outcome + the specific triggering condition (there are 4 defeat / 3 victory conditions, so this must be explicit).
  2. **Duration & Scale** — total in-game days elapsed; final region count (Player vs Enemy).
  3. **Military** — units produced; battles won/lost; total regions captured over the game (including regained-then-lost).
  4. **Social/Political** — average Regional Support over the game; insurgency occurrences and suppression rate.
  5. **Global** — final Global Support value; which sanction thresholds were triggered.
- **No replay/milestone-timeline feature** (`FUTURE`, deferred).
- **Post-game flow:** single action — return directly to Main Menu. No additional options in v0.0.1.

---

## 18. Difficulty

**AI Difficulty:** Easy / Normal / Hard (conceptual). **Normal AI is the v0.0.1 development target** (Section 15). Hard AI is reserved to eventually introduce per-region/adaptive Tax Rate as a differentiator (not yet designed).

**Map Difficulty:**
- **Easy** — Rural + Urban only, Rural-dominant.
- **Medium** — all three terrains present, Rural-dominant. **This is the v0.0.1 default map tier (Section 19).**
- **Hard** — Mountain/Forest-dominant.

Easy and Hard concrete map layouts are `FUTURE`/not yet designed.

---

## 19. Map Layout (v0.0.1 Default Map)

**Total: 30 regions** — 15 owned by Player, 15 owned by Enemy at game start (symmetric in count and terrain distribution). Difficulty tier: **Medium**.

**Structure:** Each side is a **3 rows (top-to-bottom) × 5 columns (left-to-right)** grid. Player's column 5 and Enemy's column 1 sit adjacent (the shared border); the opposite column of each side (Player col 1, Enemy col 5) sits at the rear. This structure naturally produces exactly **3 frontlines** at game start (one per row) — matching the design's "3 active frontlines" target with no artificial buffer regions needed.

**Terrain distribution per side (symmetric):** 8 Rural, 4 Mountain/Forest, 3 Urban.

### 19.1 Player Regions (P1–P15)

| ID | Row | Col (1=border, 5=rear) | Terrain | Note |
|---|---|---|---|---|
| P1 | 1 | 1 | Rural | |
| P2 | 1 | 2 | Rural | |
| P3 | 1 | 3 | Mountain/Forest | |
| P4 | 1 | 4 | Rural | |
| P5 | 1 | 5 | Rural | Frontline 1 (↔ E1) |
| P6 | 2 | 1 | Urban | **Capital** |
| P7 | 2 | 2 | Rural | |
| P8 | 2 | 3 | Mountain/Forest | |
| P9 | 2 | 4 | Rural | |
| P10 | 2 | 5 | Rural | Frontline 2 (↔ E6) |
| P11 | 3 | 1 | Urban | |
| P12 | 3 | 2 | Rural | |
| P13 | 3 | 3 | Urban | |
| P14 | 3 | 4 | Mountain/Forest | |
| P15 | 3 | 5 | Mountain/Forest | Frontline 3 (↔ E11) |

### 19.2 Enemy Regions (E1–E15)

| ID | Row | Col (1=border, 5=rear) | Terrain | Note |
|---|---|---|---|---|
| E1 | 1 | 1 | Rural | Frontline 1 (↔ P5) |
| E2 | 1 | 2 | Rural | |
| E3 | 1 | 3 | Mountain/Forest | |
| E4 | 1 | 4 | Rural | |
| E5 | 1 | 5 | Rural | |
| E6 | 2 | 1 | Rural | Frontline 2 (↔ P10) |
| E7 | 2 | 2 | Rural | |
| E8 | 2 | 3 | Mountain/Forest | |
| E9 | 2 | 4 | Rural | |
| E10 | 2 | 5 | Urban | **Capital** |
| E11 | 3 | 1 | Mountain/Forest | Frontline 3 (↔ P15) |
| E12 | 3 | 2 | Mountain/Forest | |
| E13 | 3 | 3 | Urban | |
| E14 | 3 | 4 | Rural | |
| E15 | 3 | 5 | Urban | |

### 19.3 Adjacency Rules
- **Internal adjacency (within each side):** standard grid adjacency — each region borders its immediate up/down/left/right neighbor within its own 3×5 grid.
- **Cross-territory (border) adjacency:** exists **only** at: P5↔E1 (Frontline 1), P10↔E6 (Frontline 2), P15↔E11 (Frontline 3). No other cross-territory adjacency exists at game start.
- New frontlines can emerge dynamically during play as ownership changes propagate through the existing internal adjacency graph (e.g. capturing E1 may newly expose adjacency to E2/E6 depending on current ownership) — consistent with frontlines being emergent from ownership, not fixed map objects (Section 2).

### 19.4 Capital Placement (default)
Player Capital: **P6** (row 2, col 1 — deepest rear). Enemy Capital: **E10** (row 2, col 5 — deepest rear). Player may relocate their Capital to any region per standard rules (Section 2).

---

## 20. Design Principles

These principles should be preserved throughout development:

1. **No Simple Power-Wins-Combat** — the system deliberately separates raw military power, frontline power ratio, frontline pressure, defensive effectiveness, attack success chance, terrain, air support, and stabilization into distinct mechanics.
2. **Conquest Must Create Risk** — winning a battle never automatically makes a region safe; capture creates infrastructure destruction, low Support, stabilization vulnerability, and reconstruction requirements.
3. **Military and Civil Systems Interact** — military conquest creates civil problems; civil development improves long-term control; Regional Support connects tax, corruption, facilities, roads, insurgency, and stabilization into one feedback system.
4. **Behavior Before Numbers** — system behavior, rules, interactions, and edge cases are finalized before numeric balancing (damage values, percentages, costs, timers, probabilities). This is why so much of this document marks numbers `UNSETTLED` while behavior is fully `LOCKED`.

---

## 21. Glossary

- **Retreat** — an **attacker** pulling back forces mid-attack (Section 6.3).
- **Withdraw** — **defending** forces pulling back before/during being attacked, to save troops (Section 15.2). Distinct from Retreat.
- **Abandon** — a deliberate upfront decision not to contest a region at all.
- **Stabilization Mode** — restricted-to-defense state for forces in a newly captured region until its Support reaches 50%.
- **SUPPRESSED** — state after all active insurgents in a region are defeated; not permanently safe.
- **Frontline** — automatic condition arising from direct adjacency between a Player-owned and an Enemy-owned region.
- **Global Support** — international/global perception metric, separate from Regional Support.
- **Regional Support** — internal social/political condition of a specific region.

---

## 22. Appendix: Full Unsettled/Deferred Register

The following are explicitly `UNSETTLED` (model/behavior locked, exact number pending balancing) or `FUTURE` (not designed/not in scope for v0.0.1):

**Unsettled numeric constants:**
- Exact movement times and Capital transport-speed bonus values.
- Exact frontline pressure formula and attack success formula.
- Exact air-combat probabilities and jet cooldown duration.
- Exact production costs/durations and Oil costs per unit type.
- Exact facility Support accrual duration/rate.
- Exact tax-pressure tier boundaries and per-tier decline rates.
- Exact corruption-pressure proportionality coefficient and natural decay rate.
- Exact insurgent Power/Unit Count values per tier.
- Exact insurgency initial delay baseline (30-day value in the ÷2ⁿ formula).
- Exact insurgency spread target-selection weighting formula.
- Exact facility-damage rate from unresolved insurgency.
- Exact Oil-for-transport rate coefficient.
- All AI thresholds, weights, and ratios (Offensive Gate/Score, Defensive Threat Level/Action Score, Economic trigger thresholds) across Section 15.
- Global Support -25%-per-event decay value.

**Future/deferred concepts (do not implement):**
- Facility branching (Health Center → Clinic → Hospital).
- Military-civil integration/training affecting Support.
- Supply Line concept (cuttable logistics routes).
- Transit Combat (interception during movement) — moot given movement through enemy territory is disallowed.
- Global Support sanctions mirrored for the Enemy side.
- Insurgency-based and conquest-speed-based Global Support triggers.
- Alternative victory conditions (Time Limit, Score-based) — possibly for a separate game mode.
- Endgame replay/milestone-timeline feature.
- Easy-tier and Hard-tier concrete map layouts.
- Per-region/adaptive Tax Rate for Enemy AI (reserved as a Hard AI differentiator).
- A cost mechanic (activation/upkeep) for Anti-corruption Policy.

---

*End of v0.0.1 GDD. This document reflects behavior-complete design as of the source discussion (see `the_warfare_concept_v0.0.7.md` for the full discussion history, rationale, and version notes behind each decision).*
