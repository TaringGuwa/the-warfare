HANDOVER / CONTINUITY SYSTEM

1. PURPOSE

Handover adalah mekanisme transfer operational context dari Active PM kepada PM pengganti.

Tujuannya:

- menjaga continuity;
- mencegah context loss;
- memungkinkan PM baru melanjutkan pekerjaan tanpa mengulang seluruh diskusi;
- menjaga keputusan dan task state tetap konsisten;
- memastikan PM baru mengetahui apa yang sedang terjadi;
- memastikan authority transfer dapat ditelusuri.

Handover bukan pengganti Master State.

Handover adalah snapshot operational continuity yang membantu PM baru melakukan STATE LOAD dan STATE VERIFICATION.

---

2. CORE PRINCIPLE

PM baru tidak boleh mengambil alih hanya berdasarkan:

- percakapan PM sebelumnya;
- ingatan;
- asumsi;
- pesan informal;
- raw history tanpa validasi.

PM baru harus melakukan:

HANDOVER LOAD
      ↓
MASTER STATE LOAD
      ↓
REGISTRY LOAD
      ↓
STATE VERIFICATION
      ↓
TAKEOVER ACCEPTANCE
      ↓
ACTIVE

---

3. HANDOVER IDENTITY

- Handover ID:
- From PM:
- To PM:
- Date:
- Trigger:
- Project:
- Milestone:
- Handover Status:

Possible status:

PREPARING
READY
IN REVIEW
ACCEPTED
REJECTED
SUPERSEDED

---

4. HANDOVER TRIGGER

Handover dapat terjadi karena:

- manual PM replacement;
- PM failure;
- PM unavailable;
- workload transfer;
- scheduled rotation;
- emergency takeover;
- context integrity concern;
- user/project authority instruction.

Handover tidak otomatis berarti project state berubah.

---

5. ACTIVE AUTHORITY AT HANDOVER

Current Active PM

- PM ID:
- Status:
- Authority State:

Incoming PM

- PM ID:
- Status:
- Authority State:

Authority Transfer

CURRENT ACTIVE PM
        ↓
HANDOVER PREPARATION
        ↓
STATE SNAPSHOT
        ↓
STATE VERIFICATION
        ↓
INCOMING PM ACCEPTANCE
        ↓
AUTHORITY TRANSFER
        ↓
NEW ACTIVE PM

Tidak boleh ada dua PM berstatus ACTIVE secara bersamaan.

---

6. CURRENT PROJECT STATE

Handover harus menunjuk kepada Master State terbaru.

Master State Reference

- File:
- Version:
- Last Updated:
- Checkpoint:

Current Milestone

—

Overall Project Progress

—

Current Milestone Progress

—

Current Next Action

—

---

7. ACTIVE TASK STATE

Incoming PM harus mengetahui:

- task aktif;
- task blocked;
- task awaiting verification;
- task in rework;
- task recently completed;
- task priority;
- task dependencies.

Task Registry Reference

AI_SYSTEM/STATE/TASK_REGISTRY.md

Active Tasks

—

Blocked Tasks

—

Awaiting Verification

—

Rework Tasks

—

---

8. ACTIVE VERIFICATION STATE

Incoming PM harus mengetahui verification yang sedang berjalan.

Verification Registry Reference

AI_SYSTEM/STATE/VERIFICATION_REGISTRY.md

Current Verification

—

Current Verification Status

—

Open Findings

—

Current Rework

—

Escalation

—

Latest Verification Summary

—

---

9. CURRENT DECISION STATE

Incoming PM harus mengetahui keputusan penting yang mempengaruhi pekerjaan aktif.

Decision Registry Reference

AI_SYSTEM/STATE/DECISION_REGISTRY.md

Active Locked Decisions

—

Recent Decisions

—

Decisions Under Review

—

Decision Conflicts

—

---

10. LOCKED CONTEXT

Handover harus secara eksplisit menunjukkan context yang tidak boleh berubah selama takeover.

Locked Architecture

—

Locked Requirements

—

Locked Decisions

—

Locked Interfaces / Contracts

—

Locked Milestone

—

Other Constraints

—

Incoming PM harus memperlakukan locked context sebagai constraint sampai ada authorized change.

---

11. OPEN ISSUES

Catat semua masalah yang belum selesai.

Issue ID| Description| Impact| Owner| Status| Next Action
—| —| —| —| —| —

---

12. RISKS

Risk ID| Risk| Probability| Impact| Mitigation| Owner| Status
—| —| —| —| —| —| —

---

13. DEPENDENCIES

Internal Dependencies

—

External Dependencies

—

Blocked Dependencies

—

Dependency Owner

—

---

14. RECENT EVENTS

Handover hanya perlu mencatat event yang relevan terhadap continuity.

Event ID| Date| Event| Impact| Reference
—| —| —| —| —

Untuk historical detail gunakan:

HISTORY / LOG

Handover bukan tempat menyimpan seluruh project history.

---

15. LAST KNOWN GOOD STATE

Incoming PM harus mengetahui kondisi terakhir yang telah dianggap valid.

Last Known Good State

—

Reference

—

Verification Reference

—

PM Acceptance Reference

—

---

16. CURRENT VERIFICATION SUMMARY

Incoming PM harus menggunakan:

CURRENT_VERIFICATION_SUMMARY

sebagai first-level verification information.

Summary Reference

—

Status

—

Key Findings

—

PM Action Required

—

Raw verification evidence hanya dibuka jika diperlukan.

---

17. PENDING PM DECISIONS

Semua keputusan yang harus dibuat oleh incoming PM harus dicatat.

Decision Needed| Context| Options| Risk| Deadline / Trigger
—| —| —| —| —

Incoming PM tidak boleh menganggap keputusan yang belum dibuat sebagai keputusan yang sudah disetujui.

---

18. TAKEOVER CHECKLIST

Incoming PM harus memverifikasi:

State

- [ ] Master State loaded
- [ ] Project progress verified
- [ ] Current milestone verified
- [ ] Next action identified

Tasks

- [ ] Task Registry loaded
- [ ] Active tasks identified
- [ ] Blocked tasks identified
- [ ] Awaiting verification identified
- [ ] Rework identified

Verification

- [ ] Verification Registry loaded
- [ ] Current verification identified
- [ ] Open findings identified
- [ ] Current verification summary checked
- [ ] Escalations identified

Decisions

- [ ] Decision Registry loaded
- [ ] Locked decisions identified
- [ ] Recent decisions identified
- [ ] Conflicts checked

Continuity

- [ ] Open issues understood
- [ ] Risks understood
- [ ] Dependencies understood
- [ ] Current next action understood

---

19. STATE VERIFICATION

Incoming PM harus memastikan:

HANDOVER
    ↕
MASTER STATE
    ↕
TASK REGISTRY
    ↕
VERIFICATION REGISTRY
    ↕
DECISION REGISTRY

Tidak boleh terdapat contradiction yang belum diselesaikan.

Jika ditemukan contradiction:

STATE VERIFICATION
        ↓
CONFLICT DETECTED
        ↓
DO NOT ACCEPT TAKEOVER
        ↓
ESCALATE / RESOLVE

---

20. TAKEOVER ACCEPTANCE

Incoming PM hanya dapat menjadi ACTIVE setelah menyatakan:

TAKEOVER STATUS: ACCEPTED

Acceptance berarti incoming PM menyatakan bahwa:

- state telah dibaca;
- state telah diverifikasi;
- active tasks diketahui;
- verification state diketahui;
- locked decisions diketahui;
- blockers diketahui;
- risks diketahui;
- dependencies diketahui;
- next action diketahui;
- tidak terdapat unresolved contradiction yang mencegah takeover.

---

21. TAKEOVER REJECTION

Incoming PM harus menolak takeover jika:

- Master State tidak tersedia;
- state terlalu stale untuk dipercaya;
- critical registry hilang;
- terdapat contradiction critical;
- active task tidak dapat direkonstruksi;
- authority tidak jelas;
- verification state tidak dapat diketahui;
- locked decisions tidak dapat diverifikasi.

Status:

TAKEOVER STATUS: REJECTED

Alasan harus dicatat.

---

22. HANDOVER INTEGRITY

Handover tidak boleh:

- menghapus history;
- mengubah keputusan secara diam-diam;
- mengubah requirement;
- mengubah GDD;
- mengubah architecture;
- mengubah task acceptance criteria;
- mengubah verification result;
- memberikan authority baru kepada incoming PM sebelum acceptance.

---

23. HANDOVER VERSIONING

Setiap handover harus memiliki identifier unik.

Contoh:

HANDOVER-001
HANDOVER-002
HANDOVER-003

Jika handover berikutnya dibuat:

HANDOVER-001
       ↓
HANDOVER-002

Handover lama tetap disimpan sebagai historical record.

---

24. CONTINUITY RULE

PM baru harus dapat menjawab minimal:

1. Apa yang sedang dikerjakan?
2. Mengapa pekerjaan itu dilakukan?
3. Apa requirement-nya?
4. Apa acceptance criteria-nya?
5. Apa yang sudah selesai?
6. Apa yang belum selesai?
7. Apa yang sedang diverifikasi?
8. Apa blocker-nya?
9. Apa keputusan yang sudah locked?
10. Apa risiko utama?
11. Apa dependency utama?
12. Apa tindakan berikutnya?

Jika salah satu informasi critical tidak dapat diketahui, takeover harus masuk "IN REVIEW" atau "REJECTED", tergantung tingkat dampaknya.

---

25. SOURCE OF TRUTH

Handover adalah continuity snapshot.

Source of truth tetap:

GDD
Requirement Registry
MASTER_STATE
TASK_REGISTRY
VERIFICATION_REGISTRY
DECISION_REGISTRY
HISTORY / LOG

Handover tidak boleh menggantikan source tersebut.

---

26. CURRENT HANDOVER STATUS

Current Active PM

NONE — system initialization.

Pending Takeover

NONE.

Last Handover

NONE.

Current Handover

NONE.

---

27. CURRENT NEXT ACTION

Handover / Continuity System structure created.

No actual PM takeover should be performed until the project state has been initialized.

---

28. LOCK STATUS

Handover / Continuity System v1.0 — ACTIVE
