# DECISION RECORD — AI Agent System untuk "The Warfare"

**Status**: ✅ Disetujui human (Medium risk, sesuai Human Control section 14)

## Selected Solution: Kandidat B — Verifikasi Berlapis

1. **Self-check** — tiap Specialist mengecek kerjanya sendiri terhadap GDD *sebelum* kirim ke Verificator. (Ini sekaligus berfungsi sebagai "QA-per-domain" — lihat `04-design.md`.)
2. **Verificator** tetap pre-filter pusat untuk PM (peran tidak berubah dari rencana awal).
3. **QA-Final** — cek konsistensi lintas-domain atas hasil gabungan Integrator, sebelum naik ke PM/human.

## Rationale

- Menjawab Risiko #1 (Verificator rubber-stamp): output yang sampai ke Verificator sudah lebih matang karena sudah lolos self-check.
- Menjawab Risiko #2 (context drift antar-domain): QA-Final jadi jaring pengaman terakhir untuk kontradiksi antar-domain.
- Self-check **tidak memerlukan chatbot instance baru** — cukup instruksi tambahan di prompt template Specialist yang sudah ada.

## Trade-off Diterima

Sedikit lebih banyak "titik kerja" dibanding Kandidat A, tapi overhead-nya proporsional dengan risiko yang dicegah.

## Rejected Alternatives

- **Kandidat A** — ditolak karena tidak menjawab langsung Risiko #1.
- **Kandidat C** — ditolak karena menggabung Verificator+QA menciptakan bottleneck baru, berlawanan dengan tujuan awal Verificator diciptakan.

## Catatan Boundary

Keputusan ini masih level **strategi**. Struktur konkret (jumlah instance, format hand-off persis) dijawab di `04-design.md`.
