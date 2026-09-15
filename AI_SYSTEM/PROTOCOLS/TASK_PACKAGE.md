Task Package v1.0 — LOCKED

Purpose

Task Package adalah kontrak operasional antara Active PM dan Specialist.

Task Package menjelaskan:

- WHAT harus dikerjakan;
- WHY pekerjaan diperlukan;
- batas pekerjaan;
- requirement;
- acceptance criteria;
- constraints;
- dependency;
- expected output;
- verification boundary.

Task Package tidak boleh berubah menjadi mini-GDD.

---

TP-01 — Identity

Task ID:
Task Title:
Task Version:

Milestone:
Priority:

Assigned Role / Capability:
Agent Instance:

Agent Independence Rule

Agent Instance bukan bagian permanen dari architecture.

Agent dapat:

- ditambah;
- dikurangi;
- diganti;
- digabung;
- dipecah.

Task Package tetap valid selama Role / Capability yang dibutuhkan tetap terpenuhi.

---

TP-02 — Objective

Objective:

Harus berupa satu pernyataan jelas mengenai hasil yang harus dicapai.

---

TP-03 — Requirements

Requirement ID| Requirement| GDD Reference| Priority
REQ-XXX| | | 

Semua requirement harus dapat ditelusuri kembali ke GDD.

---

TP-04 — Acceptance Criteria

AC ID| Acceptance Criteria| Evidence Expected
AC-001| | 

Acceptance Criteria harus observable dan dapat diverifikasi.

Requirement menjelaskan apa yang diwajibkan.

Acceptance Criteria menjelaskan kondisi yang membuktikan requirement terpenuhi.

---

TP-05 — Scope

In Scope

- 
- 
- 

Out of Scope

- 
- 
- 

Specialist tidak boleh memperluas scope secara sepihak.

---

TP-06 — Constraints

Constraints dapat meliputi:

- interface contract;
- API;
- schema;
- architecture;
- performance;
- compatibility;
- locked technical constraint.

PM menentukan constraint.

Specialist menentukan HOW selama tidak melanggar constraint.

---

TP-07 — Locked Decisions

Decision ID| Decision| Status| Impact
D-XXX| | LOCKED| 

Specialist tidak boleh mengubah Locked Decision.

Jika implementation bertentangan dengan Locked Decision:

«ESCALATE.»

---

TP-08 — Dependencies

Dependency| Type| Status| Required Condition
| | READY / BLOCKED / PARTIAL| 

Jika dependency BLOCKED dan menghalangi pekerjaan, Specialist harus melaporkannya.

---

TP-09 — Expected Outputs

Expected implementation output:

- 
- 
- OUTPUT_MANIFEST.md
- SELF_CHECK.md

Output Manifest harus menjelaskan:

- file;
- purpose;
- version;
- dependency bila relevan.

Expected Outputs tidak membatasi Verifier untuk membaca file lain yang secara teknis relevan.

---

TP-10 — Verification Scope

Mandatory Scope

PM menentukan WHAT yang wajib diverifikasi.

- 
- 
- 

Known Verification Concerns

- 
- 

Verifier menentukan HOW pemeriksaan dilakukan dan dapat menurunkan technical scope tambahan sesuai PAVA.

---

TP-11 — Completion Conditions

Specialist dapat menyatakan:

«READY FOR VERIFICATION»

hanya apabila:

- seluruh required output tersedia;
- Self-Check selesai;
- evidence tersedia;
- blocker telah dilaporkan;
- Output Manifest lengkap;
- tidak ada unresolved implementation issue yang disembunyikan.

IMPORTANT

«READY FOR VERIFICATION ≠ TASK COMPLETE»

Task hanya COMPLETE setelah:

1. required verification;
2. required QA bila applicable;
3. Active PM final judgment.

---

TP-12 — Escalation Triggers

Specialist wajib melakukan escalation apabila:

- requirement contradiction;
- requirement ambiguity;
- missing interface;
- contradictory interface;
- Locked Decision conflict;
- dependency unavailable;
- architecture conflict;
- scope conflict;
- requirement tidak dapat dipenuhi;
- perubahan requirement diperlukan;
- perubahan architecture diperlukan.

---

Specialist Authority

Specialist memiliki authority atas:

«HOW»

Specialist tidak memiliki authority atas:

«WHAT / WHY / project scope / locked decision / project acceptance.»

---

Integrity Rules

Specialist tidak boleh:

- mengubah requirement secara diam-diam;
- mengubah locked decision;
- menyatakan COMPLETE tanpa evidence;
- menyembunyikan blocker;
- memperluas project scope;
- mengklaim PASS tanpa self-check yang relevan.

---

LOCK STATUS

Task Package v1.0 — LOCKED
