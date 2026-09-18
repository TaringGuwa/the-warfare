# EVOLUTION LOG — The Warfare (AI Agent System, System Maker v1.0)

Dokumen ini mencatat preseden eskalasi yang sudah diputuskan Human, agar PM AI di masa depan bisa menyelesaikan kasus serupa sendiri tanpa naik ke Human lagi.

---

## Daftar Preseden Eskalasi

### PRESEDEN-001

| Field | Isi |
|---|---|
| **Asal task** | PILOT-ECO-001 (domain Economy) |
| **Tanggal** | 17 September 2026 |
| **Jenis eskalasi** | (a) Specialist AI menciptakan konstanta numerik baru yang tidak ada di GDD/Numeric Balancing manapun, untuk mengisi gap yang eksplisit ditandai "masih terbuka" di dokumen ground truth. (b) Specialist AI men-flag dugaan (bukan kepastian) konflik lintas-domain di bagian self-check-nya sendiri. |
| **Konteks spesifik** | Konstanta "Regional Base Output = 20 Money/hari/region" dibuat sebagai basis konversi skala relatif → absolut (Numeric Balancing Section 5), ditandai eksplisit sebagai asumsi/UNSETTLED oleh Specialist — bukan disembunyikan. Dua dugaan konflik: interaksi dengan Economic AI threshold (Section 9.3), dan gap cost basis di Development Systems (Section 4.1/4.2). |
| **Keputusan Human** | **Q1 (konstanta baru):** Diadopsi resmi sebagai **DRAFT** ke Numeric Balancing Draft. **Q2 (dugaan konflik lintas-domain):** Dicatat sebagai **risk log**, tidak otomatis membuka task koordinasi baru — ditunda sampai domain terkait (AI Behavior / Development Systems) mulai dikerjakan. |
| **Aturan umum yang bisa dipakai PM ke depan (preseden)** | 1. Jika Specialist AI perlu membuat konstanta baru untuk mengisi gap yang eksplisit "masih terbuka" di dokumen ground truth, DAN konstanta itu ditandai jelas sebagai asumsi (bukan disembunyikan sebagai fakta GDD) → PM boleh langsung mengusulkan status **DRAFT** tanpa eskalasi ke Human, SELAMA rasio/nilai lain yang sudah disetujui (LOCKED/DRAFT) tidak diubah. <br> 2. Jika Specialist AI men-flag dugaan konflik lintas-domain di self-check (bukan konfirmasi pasti) → default-nya **catat sebagai risk log**, JANGAN otomatis membuka task koordinasi baru ke Specialist lain, kecuali risiko itu memblokir task yang sedang berjalan atau menyentuh item LOCKED. |
| **Kapan preseden ini TIDAK berlaku** | Jika konstanta baru yang diusulkan Specialist berpotensi mengubah rasio/nilai yang sudah LOCKED atau DRAFT-disetujui sebelumnya, atau jika dugaan konflik lintas-domain menyentuh Loss/Victory Condition (Section 17) atau item LOCKED lain — kasus itu tetap harus naik ke Human sebagai kasus baru, bukan otomatis pakai preseden ini. <br><br> Jika konstanta baru bersifat **fondasional** — dipakai sebagai basis rujukan lintas-banyak-section/domain (bukan angka lokal untuk satu item saja) — preseden ini **TIDAK otomatis berlaku**, walau tidak mengubah nilai LOCKED/DRAFT yang sudah ada. Kasus itu tetap naik ke Human. |
| **Status** | ✅ **APPROVED FINAL oleh Human, 17 Sep 2026.** Berlaku maju (bukan mundur ke kasus asal PILOT-ECO-001, yang sudah lewat jalur eskalasi langsung ke Human). Bisa dirujuk PM AI untuk eskalasi berikutnya dengan pola serupa. |

---

## Daftar Aturan Proses

Berbeda dari "Daftar Preseden Eskalasi" di atas (yang mencatat keputusan kasus spesifik), bagian ini mencatat **aturan proses tetap** yang berlaku untuk cara kerja PM AI / Specialist AI / Verificator AI secara umum, di semua task dan domain.

### PROSES-001 — Verifikasi Klaim Self-Report AI

| Field | Isi |
|---|---|
| **Sumber** | Ditemukan saat pilot PILOT-ECO-001 — Summary di `context-log.md` sempat menyatakan preseden "berlaku tanpa syarat" padahal klausa pengecualian baru saja ditambahkan; PM AI melaporkan "sudah diperbaiki" tapi baris yang diminta ternyata perlu dicek langsung ke teks aslinya untuk memastikan. |
| **Aturan tetap** | 1. **Jangan approve berdasarkan ringkasan/klaim PM AI semata** — terutama untuk item yang menyentuh Medium/High risk (adopsi konstanta baru, eskalasi, revisi preseden). Selalu minta teks lengkap/persis, baca sendiri sebelum approve. *(Disebutkan sebagai aturan resmi System Maker v1.1, section 14 — dicatat di sini sesuai sumber yang diberikan Human, belum diverifikasi PM AI terhadap dokumen framework aslinya.)* <br><br> 2. **Setiap kali preseden baru dibuat atau direvisi di `evolution-log.md`**, sebelum di-approve, jalankan pertanyaan stress-test: *"Apakah ada kasus yang secara teknis lolos syarat preseden ini, tapi secara substansi/dampak tetap harus dianggap kasus baru?"* Kalau ya, preseden belum siap final. <br><br> 3. **Brief tugas ke Specialist AI baru harus menyertakan dokumen sumber lengkap** (GDD, Numeric Balancing, dst) sebagai lampiran/upload — bukan cuma kutipan di dalam teks brief. Kutipan saja terbukti menyebabkan blocker di PILOT-ECO-001. <br><br> 4. **Setiap kali Summary di `context-log.md` direvisi karena ada perubahan aturan/preseden, cek baris lain di Summary yang mungkin ikut jadi usang** (kasus nyata: baris soal status `evolution-log.md` "masih kosong" ikut basi tanpa disadari sampai ditandai eksplisit). |
| **Cakupan** | Berlaku untuk **semua task berikutnya di proyek ini**, semua domain — bukan cuma Economy. Ini aturan proses, bukan preseden per-kasus, jadi tidak butuh "kondisi kapan tidak berlaku" seperti PRESEDEN-001. |
| **Status** | ✅ Aktif — berlaku sejak 17 September 2026. |

---

- 17 Sep 2026 — Entry pertama (PRESEDEN-001) dibuat dari keputusan Human atas eskalasi PILOT-ECO-001.
- 17 Sep 2026 — Ditambahkan klausa pengecualian "konstanta fondasional lintas-banyak-section/domain" ke "Kapan preseden ini TIDAK berlaku", atas permintaan Human, sebelum PRESEDEN-001 di-approve final.
- 17 Sep 2026 — **PRESEDEN-001 APPROVED FINAL oleh Human.** Klausa fondasional berlaku maju saja; kasus asal (A1) tetap dianggap sudah lewat jalur eskalasi langsung, tidak diterapkan mundur.
- 17 Sep 2026 — Ditambahkan **PROSES-001** (Verifikasi Klaim Self-Report AI) sebagai aturan proses tetap, berlaku untuk semua task berikutnya, semua domain. Sumber: `proses-001-verifikasi-klaim-ai.md`.
