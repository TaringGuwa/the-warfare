# SYSTEM DESIGN — AI Agent System untuk "The Warfare"

Level: **struktur konkret**.

## Architecture

```
Kamu → PM AI → Specialist AI (kerja + self-check/QA-domain)
     → Verificator AI (pre-filter, escalate exception → PM)
     → Integrator AI (gabungkan yang lolos Verificator)
     → QA-Final AI (cek konsistensi lintas-domain vs GDD)
     → PM AI → Kamu (approval akhir)
```

## Component Responsibilities

| Component | Tugas | Risk default |
|---|---|---|
| PM AI (+backup) | Distribusi tugas, terima eskalasi, paket akhir ke Kamu | Medium |
| Specialist AI (N) | Kerja + self-check (=QA-per-domain) terhadap GDD sebelum kirim | Low |
| Verificator AI | Pre-filter pusat; escalate ke PM HANYA jika kontradiksi LOCKED, ambiguitas GDD, atau dugaan konflik lintas-domain | Medium (untuk keputusan escalate) |
| Integrator AI | Gabungkan output yang sudah lolos Verificator | Low |
| QA-Final AI | Cek konsistensi lintas-domain, punya hak veto kirim balik | Medium–High |

## Interface (format hand-off)

Tiap hand-off di context-log berisi:
- **Task ID**
- **Section GDD yang diacu**
- **Status tag**: `LOCKED-compliant` / `UNSETTLED-flagged (placeholder pending playtest)` / cek `FUTURE`-violation
- **Isi output**
- **Checklist self-check** yang sudah dicentang

## Rules

- Tidak ada agent yang boleh memperlakukan nilai `UNSETTLED` sebagai final — wajib ditandai placeholder.
- Tidak ada yang boleh mengerjakan apa pun bertanda `FUTURE`.
- Arah revisi QA-Final: kontradiksi spec → balik ke Specialist; salah pahami maksud GDD/goal → balik ke PM (mungkin perlu re-Decision).
- **Eskalasi Verificator→PM**: dibedakan rutin (ada preseden, PM selesaikan sendiri) vs baru (tanpa preseden, naik ke Kamu). *(hasil perbaikan V&V Val3)*

## Failure Handling & Recovery

- PM: sudah ada backup instance.
- Verificator/Integrator/QA-Final: kalau instance kehabisan token, PM buka instance baru untuk role sama, muat ulang dari `context-log` terakhir — state tidak hilang.

## Governance

Tidak dibutuhkan — bukan struktur organisasi formal, cukup Kamu + AI agents.

## Scalability (Complexity Tier: Complex)

Pakai `context-log-[nama-specialist].md` per domain (mis. `context-log-combat.md`, `context-log-economy.md`), roll-up berkala ke `context-log.md` utama.
