# PROJECT-FOUNDATION — AI Agent System untuk "The Warfare"

Dibangun menggunakan System Maker v1.0 (LOCKED, 16 September 2026).

---

## Scope

Sistem yang dibangun **bukan game-nya** ("The Warfare"), melainkan **tim AI agent** yang membantu proses pengembangan game tersebut — mengorkestrasi kerja desain/development/QA berdasarkan GDD sebagai ground truth, dijalankan manual lewat relay antar chatbot (ChatGPT/Claude/Gemini di Android).

## Terminology Spesifik Proyek Ini

- **Component** = tiap AI Agent individual (PM, Verificator, Integrator, QA-Final, Specialist-N).
- **Task** = satu unit kerja yang didistribusikan PM ke agent lain.
- **Ground Truth** = `GDD_The_Warfare` — semua agent (terutama Specialist & QA) wajib merujuk ke sini, bukan berasumsi sendiri.
- **LOCKED / UNSETTLED / FUTURE** (istilah dari GDD) = constraint wajib dipatuhi semua agent:
  - `LOCKED` — tidak boleh diubah perilakunya.
  - `UNSETTLED` — boleh diisi nilai default/placeholder yang gampang di-tune, wajib ditandai jelas.
  - `FUTURE` — dilarang dikerjakan di scope ini.
- **Interface** antar agent = format handoff/relay, dipetakan ke mekanisme `context-log.md` (System Maker section 15).

## Asumsi Dasar

- Human (kamu) tetap pemegang otoritas tertinggi (Human Control, System Maker section 14).
- Relay manual: kamu menyalin-nempel antar chatbot; satu instance chatbot = satu role tetap (tidak dicampur), tapi tidak terpatok ke vendor tertentu (mis. Claude bisa jadi PM di satu waktu, QA di waktu lain, tergantung penugasanmu).
- PM AI punya backup instance (mis. "PM 1.1") untuk kontinuitas kalau instance utama kehabisan token (Recovery & Continuity, section 18).
- Jumlah & jenis Specialist AI **dinamis** — direkomendasikan PM, **dikonfirmasi human** sebelum dieksekusi.

## System Complexity Tier: **Complex**

Alasan: 5+ agent, jumlah Specialist tidak tetap, GDD mencakup banyak sub-sistem besar (Economy, Combat, AI Behavior, Insurgency, Diplomasi, dst) yang saling terkait erat.

**Konsekuensi**: pipeline penuh dijalankan (tidak disederhanakan), dan `context-log.md` dipecah per-komponen/domain sejak awal.

---

*Lihat juga: `01-system-thinking.md`, `02-analysis.md`, `03-decision-record.md`, `04-design.md`.*
