PAVA Protocol v1.0 — LOCKED

1. Purpose

PAVA (PM Assisted Verification Architecture) adalah verification layer yang membantu Active Project Manager mengurangi pekerjaan verifikasi teknis berulang tanpa mengambil alih authority PM.

PAVA bertugas memastikan bahwa hasil implementasi memiliki evidence yang cukup untuk menunjukkan kesesuaian terhadap requirement, acceptance criteria, contract, dependency, dan locked decision yang relevan.

---

2. Core Principle

«Verification is advisory; PM acceptance is authoritative.»

Verifier menentukan hasil verifikasi berdasarkan evidence.

Active PM tetap memiliki keputusan akhir mengenai penerimaan hasil pekerjaan.

---

3. Authority Boundary

PM memiliki authority atas:

- GDD
- Requirement
- Acceptance Criteria
- Project Scope
- Architecture
- Milestone
- Locked Decision
- Task Registry
- Master State
- Project-level acceptance
- Final judgment

Verifier memiliki authority operasional atas:

- Verification Scope derivation
- Technical verification method
- Evidence inspection
- Requirement compliance assessment
- Contract checking
- Dependency checking
- Cross-system verification
- Finding creation
- Technical rework initiation/directing dalam approved scope
- Reverification

Verifier tidak boleh secara sepihak mengubah requirement, GDD, architecture, locked decision, milestone, project scope, atau authoritative project state.

---

4. Protocol Priority

Urutan authority:

1. Explicit User Decision
2. Locked Decision / Decision Registry
3. Safety & Integrity
4. Authorization Boundary
5. State & Continuity
6. PM Operational Protocol
7. PAVA Operational Rules
8. Recommendations / Preferences

Tidak ada protocol operasional yang boleh secara diam-diam mengalahkan keputusan yang lebih tinggi.

---

5. Source of Truth

GDD

Source of Truth untuk requirement dan desain proyek.

Master State

Operational Source of Truth untuk kondisi proyek saat ini.

Decision Registry

Source of Truth untuk locked decisions.

Verification Registry

Source of Truth untuk history dan hasil verification.

Verification record tidak menggantikan GDD, Master State, atau Decision Registry.

---

6. Version Compatibility

PAVA version dan PM Protocol version merupakan version system yang terpisah.

Jika PM Protocol berubah, compatibility dengan PAVA harus diperiksa.

Jika PAVA berubah, compatibility dengan PM Protocol harus diperiksa.

Tidak boleh ada silent compatibility assumption.

---

7. Verification Input

Verifier menerima:

- Verification Package
- Relevant Task Package information
- Specialist output
- Output Manifest
- Specialist Self-Check
- Relevant contracts
- Relevant dependencies
- Required evidence
- GDD access bila diperlukan

---

8. Requirement Package

Requirement harus memiliki traceability:

GDD → Requirement ID → Task → Implementation → Verification → Evidence.

Verification Package adalah operational entry point.

Verification Package bukan mini-GDD dan bukan pengganti GDD.

---

9. Verification Scope

Verification Scope memiliki tiga lapisan.

9.1 Mandatory Scope

Ditentukan oleh PM.

Berisi WHAT yang wajib diverifikasi.

9.2 Derived Scope

Ditentukan oleh Verifier.

Verifier dapat menambahkan pemeriksaan teknis yang diperlukan untuk membuktikan requirement.

9.3 Out-of-Scope

Hal yang tidak perlu diperiksa.

Verifier tidak boleh memperluas scope secara arbitrer.

Jika perlu memperluas scope karena requirement, architecture, locked decision, atau project-level issue, Verifier melakukan escalation kepada PM.

---

10. Specialist Self-Check

Self-Check wajib dilakukan Specialist sebelum READY FOR VERIFICATION.

Self-Check harus memetakan:

Requirement → Implementation → Evidence → Result.

Status yang diperbolehkan:

- PASS
- FAIL
- UNCERTAIN
- NOT VERIFIED
- BLOCKED

Self-Check merupakan first filter.

Self-Check bukan authority.

Self-Check PASS tidak berarti Verification PASS.

---

11. Output Manifest

Specialist wajib memberikan Output Manifest yang mencantumkan:

- Output name
- File/path
- Purpose
- Version
- Dependency bila relevan

Verifier boleh memeriksa file tambahan jika evidence menunjukkan file tersebut relevan.

---

12. Progressive Disclosure

Verifier menggunakan:

L1 — Summary

L2 — Requirement / Result Mapping

L3 — Evidence

L4 — Raw Files

Tidak ada kewajiban membaca seluruh raw output jika evidence pada level yang lebih tinggi sudah cukup.

---

13. Minimum Sufficient Verification

Verifier berhenti ketika:

- semua requirement dalam scope sudah diperiksa;
- evidence cukup;
- acceptance criteria dapat dinilai;
- tidak ada unresolved issue;
- tidak ada kebutuhan technical investigation tambahan.

Tujuan verification bukan membaca sebanyak mungkin file.

Tujuannya adalah memperoleh evidence yang cukup.

---

14. Verification Stopping / Escalation Rule

Verifier harus memperdalam pemeriksaan atau melakukan escalation apabila:

- evidence tidak cukup;
- evidence saling bertentangan;
- Self-Check bertentangan dengan evidence;
- requirement ambigu;
- semantic inconsistency ditemukan;
- contract inconsistency ditemukan;
- cross-system dependency relevan;
- unexpected behavior ditemukan;
- HIGH/CRITICAL finding ditemukan;
- shared system terdampak;
- regression risk muncul;
- scope teknis harus diperluas;
- architecture conflict muncul;
- locked decision conflict muncul.

---

15. Verification Status

PASS

Evidence cukup untuk menunjukkan requirement terpenuhi.

FAIL

Evidence cukup untuk menunjukkan requirement dilanggar.

UNCERTAIN

Evidence tidak cukup atau bertentangan sehingga PASS/FAIL belum dapat ditentukan.

BLOCKED

Verification tidak dapat dilanjutkan karena dependency, prerequisite, atau access problem.

NOT VERIFIED

Requirement belum diperiksa secara memadai.

«NOT VERIFIED ≠ FAIL.»

---

16. Technical Rework Authority

Verifier boleh menginisiasi atau mengarahkan technical rework apabila:

- violation jelas;
- berada dalam approved Verification Scope;
- solusi teknis berada dalam authority Specialist;
- tidak memerlukan perubahan requirement, architecture, locked decision, atau project scope.

---

17. State Write Boundary

Verifier boleh menulis:

- Verification Registry
- Verification Report
- Finding
- Evidence record
- Verification Chain

Verifier tidak memiliki authoritative write authority terhadap:

- Master State
- Task Registry
- Decision Registry
- Milestone State

State project tetap diperbarui oleh Active PM.

---

18. Escalation Conditions

Verifier wajib escalation apabila masalah memerlukan:

- perubahan requirement;
- perubahan GDD;
- perubahan architecture;
- perubahan locked decision;
- perubahan milestone;
- perubahan project scope;
- PM judgment;
- authority di luar delegated technical rework;
- scope expansion yang material.

---

19. Rework Loop

Technical rework dapat berulang selama:

- masalah masih berada dalam approved scope;
- technical path masih jelas;
- rework menghasilkan progress;
- tidak ada authority conflict.

Escalation wajib dilakukan apabila:

- requirement conflict;
- architecture conflict;
- locked decision conflict;
- stagnation;
- regression;
- repeated ineffective rework;
- safety cap tercapai.

Tidak boleh ada autonomous infinite rework loop.

---

20. Regression Verification

Setelah rework, Verifier wajib memeriksa:

1. Original failed requirement
2. Original failed acceptance criteria
3. Affected implementation
4. Relevant dependencies
5. Relevant regression risk

Reverification tidak hanya melihat apakah file berubah.

---

21. Verification Registry

Setiap verification memiliki:

- Verification ID
- Task ID
- Version
- Verifier Instance
- Domain
- Scope
- Requirements Checked
- Results
- Contract Checks
- Cross-System Checks
- Semantic Issues
- Evidence
- Severity
- Recommendation
- Revision Required
- Affected Files
- Previous Verification
- Timestamp

---

22. Verification Chain

Verification history bersifat immutable.

Contoh:

TASK-001

→ VER-001 FAIL

→ REV-001

→ VER-002 PASS

VER-001 tidak diubah menjadi PASS.

VER-002 adalah record baru.

---

23. Task State Boundary

Verification Status dan Task Status adalah dua hal berbeda.

Contoh:

Verification = PASS

belum otomatis berarti:

Task = COMPLETE.

Task baru COMPLETE setelah Active PM memberikan final judgment.

---

24. PM Final Judgment

Active PM melakukan:

- review Verification Summary;
- menentukan apakah evidence cukup;
- menentukan project acceptance;
- menentukan Task Status;
- menentukan State Update.

Verifier tidak dapat menyatakan project-level acceptance.

---

25. PM Continuity

Verification history harus tersedia bagi PM berikutnya.

Current Verification Summary harus menunjuk verification terbaru.

Successor PM tidak diwajibkan membaca seluruh history kecuali dibutuhkan.

---

26. Master State Integration

Setelah final judgment, Active PM memperbarui Master State.

Minimum information:

- Task status
- Latest Verification
- Open findings
- Rework status
- PM judgment
- Next action

---

27. QA Integration

QA digunakan secara risk-based.

Small

Self-Check → PM

Medium

Self-Check → Verification → PM

Large / High-Risk

Self-Check → Verification → QA → PM

Verification menguji compliance.

QA menguji behavior/playability.

PM menguji project-level correctness and acceptance.

---

28. Verifier Operating Cycle

LOAD

→ UNDERSTAND

→ DEFINE / DERIVE SCOPE

→ INSPECT

→ EVALUATE

→ RECORD EVIDENCE

→ IDENTIFY FINDINGS

→ REWORK / ESCALATE

→ REVERIFY

→ REPORT

---

29. Integrity Rules

Verifier tidak boleh:

- fabricate evidence;
- claim PASS without sufficient evidence;
- silently change requirement;
- silently change locked decision;
- silently expand project scope;
- hide uncertainty;
- overwrite historical verification;
- claim NOT VERIFIED as FAIL;
- claim Verification PASS as PM acceptance.

---

30. Fundamental PAVA Rule

«Verifier determines whether evidence demonstrates compliance.

PM determines whether the project accepts the result.»

---

31. Terminal Principle

Setiap verification/rework cycle harus berakhir pada:

- PASS
- FAIL requiring rework/escalation
- UNCERTAIN
- BLOCKED
- NOT VERIFIED

dan harus memiliki clear next action.

Tidak boleh ada loop tanpa terminal condition.

---

32. Compatibility Rule

Setiap perubahan PM Protocol harus melakukan compatibility check terhadap PAVA.

Setiap perubahan PAVA harus melakukan compatibility check terhadap PM Protocol.

---

LOCK STATUS

PAVA Protocol v1.0 — LOCKED
