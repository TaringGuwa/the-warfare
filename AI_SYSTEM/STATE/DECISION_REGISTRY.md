DECISION REGISTRY

1. PURPOSE

Decision Registry adalah catatan otoritatif seluruh keputusan penting yang telah dibuat dalam proyek.

Registry ini memastikan bahwa:

- keputusan penting tidak hilang;
- PM baru dapat mengetahui keputusan yang sudah berlaku;
- specialist tidak mengubah keputusan yang telah dikunci secara tidak sah;
- keputusan dapat ditelusuri ke alasan, konteks, dan dampaknya;
- keputusan lama tetap memiliki historical traceability.

Decision Registry menyimpan keputusan, bukan seluruh diskusi yang menghasilkan keputusan.

---

2. DECISION LIFECYCLE

Setiap keputusan mengikuti lifecycle:

PROPOSED
    ↓
UNDER REVIEW
    ↓
ACCEPTED
    ↓
LOCKED
    ↓
SUPERSEDED / REVOKED

Tidak semua keputusan harus LOCKED.

Status

- "PROPOSED" — masih berupa usulan.
- "UNDER REVIEW" — sedang dianalisis.
- "ACCEPTED" — telah disetujui untuk digunakan.
- "LOCKED" — tidak boleh diubah tanpa otorisasi yang sesuai.
- "SUPERSEDED" — digantikan oleh keputusan baru.
- "REVOKED" — keputusan dicabut.

---

3. GLOBAL DECISION INDEX

Decision ID| Version| Category| Decision| Status| Authority| Impact| Supersedes| Superseded By
DEC-001| v1.0| Architecture| —| —| —| —| —| —

---

4. DECISION RECORD

Setiap keputusan penting harus memiliki record yang dapat ditelusuri.

Decision Identity

- Decision ID:
- Version:
- Date:
- Category:
- Status:
- Decision Owner:
- Authority:

Decision

Problem / Question

—

Decision Made

—

Rationale

—

Alternatives Considered

—

Rejected Alternatives

—

Consequences

—

Scope of Impact

—

Dependencies

—

Related Requirements

—

Related Tasks

—

Related Verification

—

Related Files

—

---

5. LOCKED DECISIONS

Keputusan yang berstatus "LOCKED" harus dicatat secara eksplisit.

Decision ID| Locked Decision| Lock Date| Authority| Change Condition
—| —| —| —| —

LOCK RULE

Keputusan LOCKED tidak boleh diubah oleh:

- Specialist
- Verifier
- QA
- individual task execution
- temporary implementation preference

Perubahan terhadap keputusan LOCKED harus melalui proses keputusan baru.

---

6. DECISION CHANGE CONTROL

Jika keputusan perlu diubah:

EXISTING DECISION
        ↓
CHANGE REQUEST
        ↓
IMPACT ANALYSIS
        ↓
NEW DECISION
        ↓
ACCEPTANCE
        ↓
LOCK
        ↓
OLD DECISION → SUPERSEDED

Keputusan lama tidak boleh dihapus.

History harus tetap dapat ditelusuri.

---

7. DECISION CHAIN

Jika sebuah keputusan menggantikan keputusan sebelumnya:

DEC-001
   ↓
DEC-007
   ↓
DEC-014

Setiap hubungan harus dicatat melalui:

- "Supersedes"
- "Superseded By"

Contoh:

DEC-007
Status: SUPERSEDED
Superseded By: DEC-014

---

8. DECISION IMPACT

Setiap keputusan yang memiliki dampak terhadap sistem harus mencatat area terdampak.

Possible impact areas:

- Architecture
- Gameplay
- Game Mechanics
- UI/UX
- Art
- Animation
- Audio
- Code
- Data
- Performance
- Security
- AI
- Integration
- Verification
- QA
- Project Management

Impact harus digunakan untuk membantu PM menentukan apakah perubahan keputusan membutuhkan:

- task baru;
- perubahan task;
- rework;
- reverification;
- regression verification;
- perubahan milestone;
- escalation.

---

9. DECISION AUTHORITY

Decision Registry tidak memberikan authority baru kepada agent.

Authority tetap mengikuti:

USER / PROJECT AUTHORITY
        ↓
ACTIVE PM
        ↓
APPROVED PROJECT DECISIONS
        ↓
SPECIALIST / VERIFIER / QA

Specialist dan Verifier tidak boleh mengubah keputusan proyek secara unilateral.

Jika menemukan konflik antara implementation reality dan locked decision:

DISCOVER CONFLICT
        ↓
REPORT
        ↓
ESCALATE
        ↓
PM DECISION
        ↓
DECISION REGISTRY UPDATE

---

10. DECISION VS REQUIREMENT

Decision dan Requirement harus dibedakan.

Requirement

Menjelaskan:

«Apa yang harus dicapai oleh sistem.»

Decision

Menjelaskan:

«Bagaimana proyek memutuskan untuk mencapai atau menangani sesuatu dalam batas yang telah disetujui.»

Contoh:

Requirement:
Enemy must retreat when morale reaches the defined threshold.

Decision:
Retreat behavior will be implemented as a state transition
managed by the Combat AI state machine.

Requirement tetap berada dalam Requirement/GDD system.

Decision Registry hanya menyimpan keputusan.

---

11. DECISION VS TASK

Task bukan keputusan.

Task:

TASK-021
Implement retreat state transition.

Decision:

DEC-018
Retreat behavior is handled by the Combat AI state machine.

Task dapat berubah status.

Decision dapat tetap berlaku selama implementasi berubah.

Keduanya harus tetap dapat ditelusuri.

---

12. DECISION VS VERIFICATION

Verification menentukan apakah implementation memenuhi requirement dan acceptance criteria.

Verification tidak menentukan project-level decision.

Contoh:

DEC-018
Retreat handled by Combat AI state machine.

VER-032
Verified retreat transition implementation.

PM Decision:
Accepted / Rework / Escalate.

Ketiga hal tersebut harus tetap terpisah.

---

13. DECISION REFERENCE INDEX

Decision ID| GDD Reference| Requirement Reference| Task Reference| Verification Reference| File Reference
—| —| —| —| —| —

Tujuan index ini adalah menjaga traceability.

---

14. DECISION CONFLICT INDEX

Jika terdapat konflik antara keputusan, catat di sini.

Conflict ID| Decision A| Decision B| Conflict| Resolution| Status
—| —| —| —| —| —

Conflict tidak boleh diselesaikan dengan menghapus salah satu keputusan.

Harus ada resolution yang dapat ditelusuri.

---

15. DECISION REVIEW

Keputusan dapat ditinjau kembali jika:

- requirement berubah;
- GDD berubah;
- architecture berubah;
- constraint berubah;
- keputusan terbukti tidak feasible;
- terdapat conflict;
- terdapat risiko besar;
- user/project authority meminta perubahan.

Review tidak otomatis berarti keputusan berubah.

---

16. CONTINUITY RULE

PM baru harus dapat menentukan:

1. keputusan apa yang masih berlaku;
2. keputusan apa yang sudah superseded;
3. keputusan apa yang locked;
4. keputusan apa yang mempengaruhi task aktif;
5. keputusan apa yang mempengaruhi verification;
6. keputusan apa yang sedang dipertanyakan.

PM baru tidak boleh mengandalkan ingatan PM sebelumnya untuk mengetahui keputusan proyek.

Decision Registry adalah salah satu sumber utama untuk continuity.

---

17. INTEGRITY RULES

1. Decision ID harus unik.
2. Decision yang sudah tercatat tidak boleh dihapus untuk menghilangkan history.
3. Locked decision tidak boleh diubah secara langsung.
4. Perubahan besar harus menghasilkan decision baru.
5. Supersession harus dapat ditelusuri.
6. Decision tidak boleh menggantikan Requirement Registry.
7. Decision tidak boleh menggantikan GDD.
8. Decision tidak boleh menggantikan Task Registry.
9. Decision tidak boleh menggantikan Verification Registry.
10. PM tetap bertanggung jawab atas keputusan project-level.
11. Specialist tidak memiliki authority untuk mengubah project decision.
12. Verifier tidak memiliki authority untuk mengubah project decision.
13. Historical decisions harus tetap dapat direkonstruksi.

---

18. UPDATE TRIGGERS

Decision Registry harus diperbarui ketika:

- keputusan baru ACCEPTED;
- keputusan baru LOCKED;
- keputusan lama SUPERSEDED;
- keputusan dicabut;
- terjadi decision conflict;
- keputusan berdampak terhadap task;
- keputusan berdampak terhadap verification;
- terjadi architecture change;
- terjadi GDD change yang mempengaruhi keputusan.

---

19. INTEGRATION WITH STATE SYSTEM

Decision Registry terhubung dengan:

MASTER_STATE
    ↓
DECISION_REGISTRY
    ↓
TASK_REGISTRY
    ↓
VERIFICATION_REGISTRY

Master State menunjukkan keputusan penting yang sedang aktif.

Decision Registry menyimpan detail keputusan.

Task Registry menunjukkan task yang terdampak.

Verification Registry menunjukkan verification yang terkait.

---

20. CURRENT DECISION SUMMARY

Active Locked Decisions

NONE — registry initialization.

Active Accepted Decisions

NONE — registry initialization.

Decisions Under Review

NONE.

Superseded Decisions

NONE.

Revoked Decisions

NONE.

Decision Conflicts

NONE.

---

21. CURRENT NEXT ACTION

Decision Registry structure created.

No project-specific decision data should be populated until the corresponding project state and decision history are initialized.

---

22. SOURCE OF TRUTH

Decision Registry adalah source of truth untuk:

- status keputusan;
- versi keputusan;
- hubungan antar-keputusan;
- locked decisions;
- decision history;
- decision traceability.

Decision Registry bukan source of truth untuk:

- game requirements;
- GDD;
- task status;
- verification status;
- project progress.

---

23. LOCK STATUS

Decision Registry v1.0 — ACTIVE
