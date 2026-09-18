# THE WARFARE
## Numeric Balancing Draft — v0.2

**Companion document to:** `GDD_The_Warfare_v0.0.2.md`
**Status:** DRAFT / PROPOSED — approved for internal playtest, NOT permanent-final.
**Purpose:** Single source of truth for every numeric constant referenced as `UNSETTLED` in the GDD. All values here were derived through a structured PM-led balancing session, each with an explicit rationale. They must be revised based on real playtest data before being considered LOCKED.

**How to read this document:** Every value is tagged `DRAFT`. None should be treated as final. If a value is changed during playtest, update this document and note the change in the Changelog (Section 12).

---

## 1. Regional Support Pressures

### 1.1 Tax Pressure (Threshold-based, 4 tiers)

| Tier | Tax Rate Range | Support Decline (per day) |
|---|---|---|
| Low | 0% – 25% | 0%/day |
| Medium | 25% – 50% | -0.1%/day |
| High | 50% – 75% | -0.3%/day |
| Radical | 75% – 100% | -0.7%/day |

### 1.2 Corruption Pressure (Proportional/linear)

- **Structural definition (LOCKED):** Corruption is scaled 0–100 (capped).
- **Formula:** `Support decline/day = Corruption × 0.005`
  - At Corruption = 100 → -0.5%/day.
- **Natural decay rate (base, Anti-corruption Policy level 0):** -0.2 Corruption points/day.
- **With Anti-corruption Policy level 4 (3.0x multiplier):** -0.6 Corruption points/day.

### 1.3 Regional Base Economic Output

| Parameter | Value | Status |
|---|---|---|
| Regional Base Output | 20 Money/hari/region | **DRAFT** (diadopsi 17 Sep 2026, belum playtest) |

**Rasional:** Diturunkan Economy Specialist AI sebagai basis konversi skala relatif Section 5 (AD=1.0 dst.) menjadi nilai Money absolut, karena GDD/Numeric Balancing sebelumnya tidak punya angka income-rate dasar per region. Nilai ini dipakai bersama tax tier Section 1.1 untuk menghitung berapa hari pendapatan dibutuhkan untuk tiap unit produksi.

**Catatan status:** DRAFT — bukan LOCKED. Bisa direvisi berdasarkan data playtest, sama seperti item-item lain di dokumen ini.

**Risiko terbuka terkait (dicatat di context-log.md sebagai RISK-001 & RISK-002, tidak menghalangi adopsi DRAFT ini):**
1. Interaksi dengan Economic AI threshold Section 9.3 — perlu review AI-Behavior Specialist saat domain itu dikerjakan.
2. Development Systems (Section 4.1/4.2) belum punya cost basis sendiri — akan memakai skala Money yang sama, perlu diselesaikan saat task Development Systems Economy dibuka.

---

## 2. Facility Support Accrual

| Parameter | Value |
|---|---|
| Accrual duration (0% → +10%, linear) | 60 days |
| Rate per day (derived) | +0.1667%/day |

**Design implication (documented, not a bug):** Recovering a captured region (Support 1% → 50% threshold to exit Stabilization) requires roughly 5 facilities at full accrual, or fewer combined with Anti-corruption Policy. This is intentional per the "Conquest Must Create Risk" design pillar.

---

## 3. Insurgency

### 3.1 Initial Delay Baseline

- **Baseline retained at 30 days** (as already used in GDD Section 12.1's example table). Formula: `Delay = 30 days ÷ 2ⁿ`.

### 3.2 Insurgent Power & Unit Count per Tier

**Reference anchor (LOCKED as design assumption):** Typical Player AD strength per frontline at mid-game = 5–10 units. Insurgent per-unit power = 0.5x AD baseline (untrained militia), increasing at higher tiers (radicalization).

| Tier | Support Range | Unit Count (cap) | Power per Unit (rel. AD=1.0) | Total Effective Power |
|---|---|---|---|---|
| 0 | 0% to -24% | 2 | 0.5 | 1.0 |
| 1 | -25% to -49% | 3 | 0.5 | 1.5 |
| 2 | -50% to -74% | 5 | 0.5 | 2.5 |
| 3 | -75% to -99% | 8 | 0.6 | 4.8 |
| 4 (max) | -100% | 12 | 0.7 | 8.4 |

**Behavior reminder (LOCKED from GDD):** This is a cumulative cap, not a forced value — worsening Support raises the ceiling but does not top-up existing units; improving Support lowers the ceiling but does not force-remove units above it.

### 3.3 Spread Weighting Formula

```
Weight(region) = max(0, -Support(region))
```
Regions with more negative Support are proportionally more likely to be the spread target. Regions with Support ≥ 0% have weight 0 (only selected via fallback tie-break if no better candidate exists).

### 3.4 Facility Damage Rate (Unresolved Insurgency)

| Parameter | Value |
|---|---|
| Damage rate | 5% of facility HP per day |
| Time to total destruction | 20 days of continuous unresolved insurgency |
| **Target scope (REVISED this session)** | **Both Civil facilities AND Military buildings.** Military buildings do not auto-rebuild — insurgent-caused destruction of Military buildings requires full manual repurchase, unlike Civil facilities. |

---

## 4. Combat

### 4.1 Attack Success Chance

```
Base Success% = f(Power Ratio):
  50:50 → 5%
  60:40 → 15%
  70:30 → 30%
  80:20 → 50%
  90:10 → 70%
  99:01 → 90% (never reaches 100%)

Modifiers (additive):
  + Frontline Pressure bonus: +2pp per pressure "step" beyond base ratio
  + per additional Tank: +4pp
  + per supporting Jet strike: +2pp
  − Defensive Adjacency (+5%/friendly neighbor, GDD 6.4) reduces attacker's Success% proportionally
```

**Note:** The "2% for 2 AD vs 1 AD" example in GDD Section 6.4 is explicitly NOT used as the balance target — confirmed as illustrative only, not a literal design goal.

### 4.2 Frontline Pressure Drift Rate

| Power Ratio Band | Drift Rate |
|---|---|
| 51-55 : 45-49 | +0.2pp/day |
| 56-65 : 35-44 | +0.5pp/day |
| 66-80 : 20-34 | +1.0pp/day |
| 81-95 : 5-19 | +2.0pp/day |
| 96-99 : 1-4 | +3.0pp/day |

Drift = 0 exactly at 50:50 (indefinite stalemate, per LOCKED behavior).

### 4.3 Air Combat & Jet Cooldown

| Parameter | Value |
|---|---|
| Jet Strike (no enemy patrol) | 1 Jet destroys 1 AD |
| Jet Strike vs active enemy Patrol | 70% chance the Strike is intercepted (fails entirely; attacking Jet still enters cooldown) |
| Jet Cooldown (after Strike or Patrol) | 5 days |

---

## 5. Production Costs & Durations (relative scale)

**Scale basis:** AD (Barracks) cost = 1.0 base unit. All other units are proportional — actual absolute Money value (e.g. "1.0 unit = X currency") is still open, pending Economy income-rate balancing. See Section 1.3 for the Regional Base Output value used to anchor this conversion.

| Unit | Money Cost (relative) | Oil Cost | Production Duration |
|---|---|---|---|
| AD (Barracks) | 1.0 | 0 | 3 days |
| Tank | 4.0 | 2 | 8 days |
| Jet/Aircraft | 6.0 | 3 | 10 days |
| Missile | 2.5 | 1.5 | 5 days |
| Intelligence Personnel | 1.5 | 0.5 | 4 days |
| Intelligence Drone | 2.0 | 1.0 | 5 days |

---

## 6. Oil-for-Transport

```
Oil Cost = 0.1 × (units moved) × (estimated travel time in days)
```
Example: 5 AD, 3-day travel → 1.5 Oil. 10 AD, 10-day travel → 10 Oil.

---

## 7. Global Support Decay

| Parameter | Value |
|---|---|
| Decay per triggering event | -25% flat (unchanged from GDD working value, confirmed this session) |
| Total events to reach 0% (nuclear defeat) | Exactly 4 deliberate facility-strike events |

---

## 8. Movement Times & Capital Bonus

### 8.1 Base Travel Time (per region hop)

| Terrain | Base Time (no Road) | With Road (1 tier faster) |
|---|---|---|
| Mountain/Forest | 6 days | 4 days |
| Rural | 4 days | 2.5 days |
| Urban | 3 days | 2 days |

### 8.2 Capital Transport Bonus

Capital region receives a speed bonus equivalent to +2 tiers faster than its base terrain time (e.g. Mountain/Forest Capital, base 6 days → effectively 2 days, matching the GDD's literal "very slow → fast" example).

### 8.3 Tank Terrain Penalty (applied on top of above)

Tank in Mountain/Forest: +2 additional days on top of base Mountain/Forest time (e.g. 6 → 8 days without Road).

---

## 9. AI Thresholds & Weights (Normal AI)

### 9.1 Offensive AI

| Parameter | Value |
|---|---|
| Gate: minimum Attack Success Chance (X%) | 35% |
| Minimum Global Score to commit (Y) | Score > 50 (0–100 normalized scale) |

### 9.2 Defensive AI

| Parameter | Value |
|---|---|
| Threat Level threshold (Z) | Triggered when Frontline Pressure ≥ 66:34 OR enemy Power Ratio superiority ≥ 1.5x |

### 9.3 Economic AI

| Parameter | Value |
|---|---|
| "Low" Money reserve (raise tax) | < 20% of rolling 30-day average expenditure |
| "High" Money reserve (lower tax) | > 150% of rolling 30-day average expenditure |
| Support emergency brake (hard override) | Triggered when AI-wide average Regional Support < 10% |

**Open dependency:** Interaction between this threshold and the new Regional Base Output (Section 1.3) is not yet reviewed — flagged as RISK-001, pending AI-Behavior Specialist review when this domain is worked on.

---

## 10. Player Oil Arbitration (new rule this session)

When Player orders within a single tick exceed available Oil stock, claims are resolved in the same priority order as AI (GDD Section 15.3):

```
Air Strike > Transport > Production
```
Under-prioritized orders that cannot be fully funded are **blocked/rejected**, not partially fulfilled — consistent with the existing "insufficient Oil → blocked" pattern.

---

## 11. Capital Relocation Mechanic (new rule this session)

| Parameter | Value |
|---|---|
| Relocation speed | **Instantaneous** — no travel time, no Money/Oil cost |
| Old region Capital status | Lost immediately, same tick |
| New region Capital status | Gained immediately, same tick |

No window exists where two regions are simultaneously Capital, or where no region is Capital.

---

## 12. Changelog

| Version | Date/Session | Changes |
|---|---|---|
| v0.1 | This session | Initial compilation of all 14 numeric balancing register items from GDD Section 22 Appendix. All values DRAFT, pending playtest. |
| v0.2 | 17 September 2026 | Merged Addendum PILOT-ECO-001 (Economy domain): added new Section 1.3 "Regional Base Economic Output" (20 Money/hari/region, DRAFT, human-approved 17 Sep 2026). Cross-referenced from Section 5 (Production Costs) and Section 9.3 (Economic AI). Open risks RISK-001 (interaction with Economic AI threshold, Section 9.3) and RISK-002 (Development Systems Section 4.1/4.2 lacking own cost basis) carried over from context-log.md; do not block DRAFT adoption. |

---

## 13. Open Risk Flags for Playtest (carried over from balancing session)

1. **Insurgency spread (Section 3.3)** — "no artificial cap" design combined with this weighting formula must be stress-tested for worst-case unwinnable scenarios before values are locked.
2. **Oil scarcity** — 3 concurrent consumers (Strike/Transport/Production) against a hard 4-Derrick cap; monitor whether Production is perpetually starved.
3. **Military building destructibility by Insurgency (Section 3.4)** — new rule this session; monitor late-game punishment severity, since Military buildings do not auto-rebuild.
4. **Combat ↔ AI Behavior dependency** — tightly coupled; a bug in one surfaces immediately in the other during integration testing.
5. **Regional Base Output interaction with Economic AI (Section 1.3 ↔ 9.3)** — RISK-001, pending AI-Behavior Specialist review.
6. **Development Systems cost basis undefined (Section 1.3 note)** — RISK-002, to be resolved when Development Systems Economy task is opened.

---

*End of Numeric Balancing Draft v0.2. Status: DRAFT — for internal playtest use, subject to revision.*
