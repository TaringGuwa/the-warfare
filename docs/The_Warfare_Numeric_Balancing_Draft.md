# THE WARFARE
## Numeric Balancing Draft — v0.7

**Companion document to:** `GDD_The_Warfare.md`
**Dependency check:** terakhir dicek terhadap `GDD_The_Warfare.md` v0.0.4 (19 September 2026). Kalau versi di header GDD berbeda dari ini, anggap rujukan silang di sini perlu dicek ulang. Nama file tidak memuat nomor versi; versi hanya dicatat di dalam file.
**Status:** DRAFT / PROPOSED — approved for internal playtest, NOT permanent-final. (Beberapa item mekanisme berstatus LOCKED per audit v0.3–v0.6 — lihat Section 1.4, 4.0, 4.4, dan 5.1.)
**Purpose:** Single source of truth for every numeric constant referenced as `UNSETTLED` in the GDD. All values here were derived through a structured PM-led balancing session, each with an explicit rationale. They must be revised based on real playtest data before being considered LOCKED.

**How to read this document:** Every value is tagged `DRAFT` unless explicitly marked `LOCKED`. If a value is changed during playtest, update this document and note the change in the Changelog (Section 12).

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
| Income formula (v0.5) | `Income/region/hari = 20 × (tax rate ÷ 50%)` — 20 Money adalah income di tax 50% (lihat Section 1.4) | LOCKED (mekanisme), DRAFT (angka) |

**Rasional:** Diturunkan Economy Specialist AI sebagai basis konversi skala relatif Section 5 (AD=1.0 dst.) menjadi nilai Money absolut, karena GDD/Numeric Balancing sebelumnya tidak punya angka income-rate dasar per region. Nilai ini dipakai bersama tax tier Section 1.1 untuk menghitung berapa hari pendapatan dibutuhkan untuk tiap unit produksi.

**Catatan status:** DRAFT — bukan LOCKED. Bisa direvisi berdasarkan data playtest, sama seperti item-item lain di dokumen ini.

**Risiko terbuka terkait (dicatat di context-log.md sebagai RISK-001 & RISK-002, tidak menghalangi adopsi DRAFT ini):**
1. Interaksi dengan Economic AI threshold Section 9.3 — perlu review AI-Behavior Specialist saat domain itu dikerjakan.
2. Development Systems (Section 4.1/4.2) belum punya cost basis sendiri — akan memakai skala Money yang sama, perlu diselesaikan saat task Development Systems Economy dibuka. (v0.5: skala Money di Section 1.4; v0.6: biaya bangunan di Section 5.1 — RISK-002 RESOLVED.)

### 1.4 Income Formula & Money Scale — v0.5 (human-approved 19 Sep 2026)

Dua fondasi yang hilang di bawah RISK-002 (sebelumnya: hubungan tax dengan income tidak tertulis, dan konversi "1.0 unit biaya = berapa Money" masih open di Section 5).

**Income formula** (mekanisme LOCKED; angka 20 dan titik acuan 50% berstatus DRAFT):

```
Income/region/hari = 20 × (tax rate ÷ 50%)
```

Titik acuan 50% = batas atas tier Medium (Section 1.1).

| Tax rate (batas atas tier) | Tier | Income/region/hari | Support decline/hari (Section 1.1) |
|---|---|---|---|
| 25% | Low | 10 | 0%/day |
| 50% | Medium | 20 | -0.1%/day |
| 75% | High | 30 | -0.3%/day |
| 100% | Radical | 40 | -0.7%/day |

*Catatan:* batas tier di Section 1.1 tumpang tindih di titik batas (mis. 25% masuk Low atau Medium?). Ambiguitas ini sudah ada sebelumnya dan belum diputuskan; diusulkan diselesaikan pada patch berikutnya.

**Money scale** (DRAFT): **1.0 unit biaya relatif (Section 5) = 20 Money.**

| Unit | Biaya relatif | Biaya Money absolut | Oil (tidak dikonversi) |
|---|---|---|---|
| AD | 1.0 | 20 | 0 |
| Tank | 4.0 | 80 | 2 |
| Jet/Aircraft | 6.0 | 120 | 3 |
| Missile | 2.5 | 50 | 1.5 |
| Intelligence Personnel | 1.5 | 30 | 0.5 |
| Intelligence Drone | 2.0 | 40 | 1.0 |

**Sanity check (referensi, bukan aturan):** 15 region × 20 = 300 Money/hari di tax 50% (150 di tax 25%). Produksi militer maksimum jika semua pabrik jalan penuh ≈ 4.6 unit ≈ 93 Money/hari, yaitu ≈ 31% income (tax 50%) sampai ≈ 62% (tax 25%). Belum memasukkan gaji militer, inflasi, dan biaya bangunan (lihat RISK-002 sisa dan RISK-004).

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

### 4.0 Power Ratio Definition — LOCKED (mekanisme) v0.4

Sebelum v0.4, rumus Power Ratio tidak tertulis di dokumen manapun (Section 4.1 hanya menyebut `Base Success% = f(Power Ratio)`). Didefinisikan di sini, disetujui human 19 Sep 2026.

```
Total Power(sisi) = Σ (jumlah unit × effective power per unit), untuk unit darat (AD, Tank) di frontline tersebut
Power Ratio       = Total Power(kita) / (Total Power(kita) + Total Power(lawan))   → ditulis X:Y
```

| Unit | Power per unit (AD = 1.0) | Status |
|---|---|---|
| AD | 1.0 | LOCKED (jangkar skala, sama dengan Section 3.2) |
| Tank (terrain normal) | 3.0 | DRAFT (value), human-approved 19 Sep 2026 |
| Tank (Mountain/Forest) | 0.6 (= 3.0 × 0.20, lihat Section 4.4) | DRAFT (turunan) |

**Contoh:** 3 AD + 1 Tank (terrain normal) vs 4 AD → 6 vs 4 → 60:40. Tank yang sama di Mountain/Forest → 3.6 vs 4 → sekitar 47:53.

**Catatan:**
- Skala ini sama dengan skala Insurgent (Section 3.2, Total Effective Power = jumlah × power per unit), jadi Insurgent dan unit reguler bisa dibandingkan langsung.
- Diasumsikan simetris untuk Player dan Enemy (GDD tidak membedakan Tank kedua sisi; Tank tertangkap bisa dipakai ulang oleh Enemy).
- Jet tidak masuk Total Power. Kontribusinya tetap lewat modifier Success% (Section 4.1) dan aturan Section 4.3.
- **Konflik dengan GDD 6.2 — RESOLVED (v0.7):** contoh lama "2 vs 1 → 52:48" sudah diganti di GDD (v0.0.4) menjadi rujukan ke rumus ini dengan contoh ilustratif 2 AD vs 1 AD → 67:33.

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

**Note (diperbarui v0.7):** Contoh-contoh lama di GDD ("2 vs 1 → 52:48" dan "2%" untuk 2 AD vs 1 AD) tidak dipakai sebagai target balance dan sudah tidak ada di GDD v0.0.4. GDD 6.2 kini merujuk ke rumus Power Ratio di Section 4.0.

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

### 4.4 Tank Terrain Power Penalty (Mountain/Forest) — LOCKED v0.3

| Parameter | Value | Status |
|---|---|---|
| Tank effective power modifier, Mountain/Forest terrain | ×0.20 of Tank baseline power (i.e. -80%) | DRAFT (value) |
| Application point in formula chain | Applied to Tank's power contribution BEFORE Power Ratio is computed — upstream of both Section 4.1 (Base Success%) and Section 4.2 (Frontline Pressure Drift Band) | LOCKED (mechanism, human-confirmed) |
| Interaction with "+4pp per additional Tank" (Section 4.1) | Treated as independent/unaffected — the flat +4pp tactical bonus still applies per engaged Tank regardless of terrain | LOCKED (human decision, 19 Sep 2026) |
| Tank baseline power per unit (AD = 1.0) | 3.0 (di Mountain/Forest: 3.0 × 0.20 = 0.6, lebih rendah dari 1 AD) | DRAFT (value), human-approved 19 Sep 2026 |

**Source:** Migrated from GDD Section 4.3. Registered per audit Temuan #3 (19 Sep 2026) — this value existed in GDD but was missing from this register despite GDD Section 22's prior (now-corrected) completeness claim.

**Rationale:** No structured balancing rationale exists yet for the -80% figure itself (unlike the other 14 register items) — it is retained as-is per audit scope (migration, not re-balancing). The *mechanism* (where it applies in the formula chain) and its independence from the Tank tactical bonus are human-confirmed decisions and therefore LOCKED; the *magnitude* (-80%) remains DRAFT pending a future playtest/balancing pass.

**Relation to Section 8.3:** Section 8.3 registers the Tank *movement-time* penalty in Mountain/Forest (+2 days) from the same GDD source line. This section registers the *combat-power* half of that same GDD sentence. The two are independent effects (time vs. power) sharing one trigger condition — cross-referenced, not merged.

**RISK-003 — RESOLVED (v0.4, 19 Sep 2026):** Baseline power Tank ditetapkan 3.0 (AD = 1.0), rumus Power Ratio didefinisikan di Section 4.0. Nilai -80% kini punya dasar yang jelas dan bisa disimulasikan. Rasional pemilihan 3.0: menepati GDD 4.3 (Tank lebih kuat dari AD), power per Money 0.75x AD (lebih mahal per power) tetapi power per hari produksi 0.375 vs AD 0.333 (menumpuk lebih cepat), plus bonus +4pp per Tank yang independen. Seluruh angka tetap DRAFT sampai playtest.

---

## 5. Production Costs & Durations (relative scale)

**Scale basis:** AD (Barracks) cost = 1.0 base unit. All other units are proportional. **Skala absolut (v0.5, human-approved 19 Sep 2026): 1.0 unit = 20 Money** — lihat Section 1.4 untuk padanan Money absolut per unit. Tabel di bawah tetap dalam skala relatif.

| Unit | Money Cost (relative) | Oil Cost | Production Duration |
|---|---|---|---|
| AD (Barracks) | 1.0 | 0 | 3 days |
| Tank | 4.0 | 2 | 8 days |
| Jet/Aircraft | 6.0 | 3 | 10 days |
| Missile | 2.5 | 1.5 | 5 days |
| Intelligence Personnel | 1.5 | 0.5 | 4 days |
| Intelligence Drone | 2.0 | 1.0 | 5 days |

### 5.1 Development Building Costs — v0.6 (human-approved 19 Sep 2026)

Paket biaya "Sedang" (×1.0), skala 1.0 unit = 20 Money (Section 1.4). Semua angka **DRAFT**. Model pembelian (sekali beli vs berulang, auto-rebuild vs beli ulang) sudah LOCKED di GDD Section 4 dan tidak diubah di sini.

| Bangunan | Kategori | Batas (GDD Section 4) | Biaya (unit) | Biaya (Money) |
|---|---|---|---|---|
| Health Center | Civil | 1 per tipe per region | 45 | 900 |
| Education Center | Civil | 1 per tipe per region | 45 | 900 |
| Water & Sanitation Center | Civil | 1 per tipe per region | 45 | 900 |
| Economic Center | Civil | 1 per tipe per region | 45 | 900 |
| Roads | Civil | 1 per region, tipe mengikuti terrain | 30 | 600 |
| Outreach Center | Government | 1 per kategori terrain, maks 3 | 60 | 1.200 |
| Barracks | Military | maks 2 | 25 | 500 |
| Tank Factory | Military | maks 2 | 60 | 1.200 |
| Missile Factory | Military | maks 2 | 60 | 1.200 |
| Aircraft Factory | Military | maks 2 | 80 | 1.600 |
| Intelligence Center | Military | maks 1 | 50 | 1.000 |
| Oil Derrick | Military | maks 4 | 40 | 800 |

**Asumsi (belum dikonfirmasi eksplisit, ikut disetujui bersama paket ini):**
- Civil dan Government dibayar **sekali** (menyebar otomatis dari Capital); auto-rebuild gratis (GDD Section 4). Roads dihitung satu pembelian, tipe jalan (Dirt/Main/Toll) mengikuti terrain tiap region.
- Bangunan Military yang hancur dibeli ulang dengan harga yang sama seperti harga beli awal.
- Bangunan tidak memakai Oil (Oil hanya untuk Air Strike, Transport, Production; GDD Section 3.2).
- Angka di atas adalah harga dasar sebelum efek Inflation (GDD Section 4.4). Besaran Inflation belum ada (RISK-004).

**Sanity check (referensi, bukan aturan):** membangun semua bangunan = 1.050 unit = 21.000 Money, setara ≈ 70 hari income di tax 50% (300/hari) atau ≈ 140 hari di tax 25% (150/hari). Kehilangan satu Tank Factory (1.200 Money) ≈ 4 hari income di tax 50%.

**Logika harga:** Barracks paling murah (hanya Money); Factory ≈ 15 kali harga satu Tank (60 ÷ 4); Aircraft Factory paling mahal, sejalan dengan Jet sebagai unit termahal; Civil dibayar sekali tetapi memberi +10% Support permanen di seluruh peta (Section 2).

**Belum termasuk:** waktu konstruksi dasar dan kenaikan Corruption/Inflation akibat konstruksi (RISK-004).

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

Tank in Mountain/Forest: +2 additional days on top of base Mountain/Forest time (e.g. 6 → 8 days without Road). *(See also Section 4.4 for the combat-power half of this same terrain penalty — time and power are independent effects sharing one trigger condition.)*

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
| v0.3 | 19 September 2026 | Audit Gap Temuan #3: Added Section 4.4 "Tank Terrain Power Penalty (Mountain/Forest)" — registers the -80% power modifier from GDD Section 4.3 (previously missing from register despite GDD Section 22's completeness claim, since corrected). Value kept unchanged (migration only, not re-balanced); tagged DRAFT. Formula-chain placement (upstream of Power Ratio) and independence from "+4pp per Tank" bonus are human-confirmed and LOCKED. Cross-referenced with Section 8.3. Flagged new RISK-003 (Tank baseline power undefined) in Section 13. Work performed via AI-Agent relay (Numerical Balance Specialist), verified by PM before human approval. |
| v0.4 | 19 September 2026 | Resolusi RISK-003: (1) Section 4.0 baru — rumus Power Ratio (jumlah total power, kita / (kita + lawan)) didefinisikan, LOCKED sebagai mekanisme; (2) baseline power Tank = 3.0 (AD = 1.0), DRAFT, ditambahkan ke Section 4.4; (3) RISK-003 ditutup di Section 13. Keputusan human 19 Sep 2026 via opsi A/B/C dengan rekomendasi Advisor (B). Ditemukan konflik contoh GDD 6.2 ("2 vs 1 → 52:48") dengan rumus baru — patch teks GDD diusulkan terpisah, belum diterapkan. |
| v0.5 | 19 September 2026 | Resolusi sebagian RISK-002: Section 1.4 baru — (1) rumus income `20 × (tax rate ÷ 50%)` (mekanisme LOCKED, angka DRAFT); (2) skala Money 1.0 unit = 20 Money (DRAFT), dengan tabel biaya unit absolut. Keputusan human 19 Sep 2026 memakai opsi B (income) dan opsi 2 (skala) dengan rekomendasi Advisor. Section 5 diperbarui merujuk skala absolut. RISK-002 tetap PARTIAL: biaya bangunan menunggu. RISK-004 baru dicatat di Section 13. Ditemukan ambiguitas tumpang tindih batas tier Section 1.1 (belum diputuskan). |
| v0.6 | 19 September 2026 | Resolusi RISK-002: Section 5.1 baru — biaya 12 bangunan (Civil, Government, Military) paket "Sedang" ×1.0, dalam unit dan Money absolut; total ≈ 1.050 unit ≈ 21.000 Money. Keputusan human 19 Sep 2026 (rekomendasi Advisor). Asumsi biaya beli ulang bangunan Military, Roads sebagai satu pembelian, dan bangunan tanpa Oil dicatat eksplisit. Semua angka DRAFT. RISK-002 ditutup di Section 13; waktu konstruksi dasar tetap di RISK-004. |
| v0.7 | 19 September 2026 | Sinkronisasi dengan GDD v0.0.4: konflik contoh GDD 6.2 ditutup (Section 4.0), catatan basi di Section 4.1 diperbarui. Nama file tidak lagi memuat nomor versi; ditambah baris "Dependency check" di header. Tidak ada perubahan angka. |

---

## 13. Open Risk Flags for Playtest (carried over from balancing session)

1. **Insurgency spread (Section 3.3)** — "no artificial cap" design combined with this weighting formula must be stress-tested for worst-case unwinnable scenarios before values are locked.
2. **Oil scarcity** — 3 concurrent consumers (Strike/Transport/Production) against a hard 4-Derrick cap; monitor whether Production is perpetually starved.
3. **Military building destructibility by Insurgency (Section 3.4)** — new rule this session; monitor late-game punishment severity, since Military buildings do not auto-rebuild.
4. **Combat ↔ AI Behavior dependency** — tightly coupled; a bug in one surfaces immediately in the other during integration testing.
5. **Regional Base Output interaction with Economic AI (Section 1.3 ↔ 9.3)** — RISK-001, pending AI-Behavior Specialist review. (v0.5: rumus income dan skala Money kini terdefinisi, jadi review bisa memakai angka konkret.)
6. ~~Development Systems cost basis~~ — **RISK-002 RESOLVED v0.6:** fondasi (skala Money, rumus income) di Section 1.4 (v0.5), biaya bangunan di Section 5.1 (v0.6). Semua angka DRAFT; waktu konstruksi dasar dipindahkan ke RISK-004.
7. ~~Tank baseline power undefined (Section 4.4 note)~~ — **RISK-003 RESOLVED v0.4** (Tank = 3.0, Section 4.0/4.4). Nilai tetap DRAFT, perlu diuji playtest terutama bersama bonus +4pp per Tank.
8. **RISK-004 (baru v0.5):** parameter numerik di sekitar Development Systems yang belum punya angka: kenaikan Corruption dan Inflation dari konstruksi/produksi/training (GDD 11.2, 4.4), laju penurunan Inflation, gaji militer (GDD 3.1), dan waktu konstruksi dasar per fasilitas. Mempengaruhi sanity check ekonomi di Section 1.4.

---

*End of Numeric Balancing Draft v0.7. Status: DRAFT (individual magnitudes) / LOCKED (mechanisms as noted) — for internal playtest use, subject to revision on DRAFT items.*
