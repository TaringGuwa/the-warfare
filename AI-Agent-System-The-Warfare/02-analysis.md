# SYSTEM ANALYSIS — AI Agent System untuk "The Warfare"

Level: **evaluatif**.

## Problem Definition

Mengembangkan The Warfare (RTS dengan banyak sistem saling terkait) sendirian menimbulkan beban kognitif besar untuk cross-check konsistensi manual. Dibutuhkan cara memanfaatkan beberapa AI agent untuk membantu spesifikasi/verifikasi/refinement desain secara konsisten terhadap GDD, tanpa proses kolaps saat kompleksitas bertambah.

## Requirements

1. Semua output traceable ke section GDD spesifik — hormati tag `LOCKED`/`UNSETTLED`/`FUTURE`.
2. PM tidak boleh jadi bottleneck (Verificator sebagai pre-filter).
3. Item Medium/High risk tetap butuh approval human (Human Control).
4. Tahan terhadap AI failure/token habis (Recovery & Continuity).
5. Jumlah Specialist bisa bertambah tanpa merusak struktur koordinasi.
6. Overhead relay manual tetap terkelola seiring proyek membesar.

## Constraints

- Tidak ada otomasi/API antar agent — murni relay manual via Android.
- Batas token/context per sesi chatbot.
- Kamu satu-satunya relay operator.
- Banyak nilai GDD masih `UNSETTLED` — agent boleh usul angka, wajib ditandai placeholder.

## Risiko Teridentifikasi

| # | Risiko | Status |
|---|---|---|
| 1 | Verificator jadi rubber-stamp | Ditangani di Decision (self-check) |
| 2 | Context drift antar Specialist | Ditangani di Decision (QA lintas-domain) |
| 3 | Specialist sprawl (jumlah tak terkendali) | Perlu dipantau di Operation |
| 4 | Verificator vs QA tumpang tindih | Ditangani di Design (scope dipisah jelas) |
| 5 | Nilai UNSETTLED disalahartikan final | Ditangani lewat aturan tagging wajib |
| 6 | Kelelahan approval human | Ditangani di V&V (aturan rutin vs baru) |

## Solution Candidates (belum dipilih di tahap ini)

- **Kandidat A** — Struktur sesuai rencana awal (satu Verificator, satu Integrator, satu QA).
- **Kandidat B** — Verifikasi berlapis: self-check per Specialist + QA dipecah per-domain & lintas-domain final. **(dipilih — lihat `03-decision-record.md`)**
- **Kandidat C** — Gabung Verificator+QA jadi satu role dua-mode.
