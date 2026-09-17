# SYSTEM THINKING — AI Agent System untuk "The Warfare"

Level: **deskriptif** — memetakan komponen & hubungan, belum menilai baik/buruk.

## Komponen

| Komponen | Deskripsi |
|---|---|
| Kamu (Human) | Otoritas akhir, relay manual antar chatbot |
| PM AI (+ backup) | Orkestrasi tugas ke semua agent |
| Specialist AI (N, dinamis) | Kerja domain spesifik (Combat, Economy, AI Behavior, dst) |
| Verificator AI | Pre-filter pusat, eskalasi hanya bila exception |
| Integrator AI | Gabungkan hasil semua Specialist yang lolos Verificator |
| QA-Final AI | Cek akhir konsistensi lintas-domain vs GDD |

## Alur Utama

```
Kamu → PM AI → Specialist AI → Verificator AI → Integrator AI → QA-Final AI → PM AI → Kamu
```

Jalur eskalasi (tidak selalu terjadi): Verificator AI → PM AI, HANYA jika ditemukan kontradiksi dengan `LOCKED`, ambiguitas GDD, atau dugaan konflik lintas-domain.

## System Boundary

Sistem ini **berhenti di menghasilkan artifact** (spec, formula balancing, code stub, test plan). **Tidak termasuk** repo/build engine game itu sendiri — itu di luar lingkup AI Agent System ini.

## Environment / Dependency

- Bergantung pada GDD sebagai acuan tunggal yang tidak berubah selama satu siklus kerja.
- Bergantung pada ketersediaan waktu kamu sebagai relay operator manual.
- Dibatasi oleh context window/token tiap chatbot individual.

---

*Diagram versi visual sudah dibahas & disetujui di sesi diskusi. Lihat `02-analysis.md` untuk evaluasi risiko atas struktur ini.*
