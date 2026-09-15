Verification System v1.0 — LOCKED

PART I — VERIFICATION PACKAGE

Purpose

Verification Package adalah operational entry point bagi Verifier.

Core principle:

«PM defines WHAT must be verified.
Verifier determines HOW it will be verified.»

---

VP-01 — Verification Identity

Verification ID:
Verification Version:

Task ID:
Project:
Milestone:

Verification Type:
Risk Level:

Verifier Instance:

---

VP-02 — Task Reference

Task ID:
Task Version:
Task Title:
Task Status:

Assigned Role / Capability:

---

VP-03 — PM Verification Brief

Requirements

Requirement ID| Requirement| GDD Reference
| | 

Acceptance Criteria

AC ID| Expected Result| Evidence Needed
| | 

Mandatory Verification Scope

-
-
-

Relevant Locked Decisions

D-XXX:
Decision:
Impact:

Risk Level

LOW / MEDIUM / HIGH / CRITICAL

Known Concerns

-
-

---

VP-04 — Verifier Verification Plan

Bagian ini dibuat/dilengkapi Verifier.

Derived Scope

-
-

Evidence Map

Evidence ID| Source| Purpose
EVID-001| | 

Technical Checks

-
-

Contract Checks

-
-

Dependency Checks

-
-

Cross-System Checks

-
-

Verification Path

Requirement
→ Implementation
→ Evidence
→ Evaluation

---

VP-05 — Evidence Index

Evidence dapat berada di file/artifact terpisah.

Evidence ID| Source| Purpose| Status
EVID-001| | | 

Expected Outputs tidak membatasi Verifier.

Jika evidence menunjukkan file lain diperlukan, Verifier boleh memeriksanya sesuai PAVA.

---

PART II — VERIFICATION REPORT

DR-01 — Identity

Verification ID:
Task ID:
Verification Version:

Verifier:
Risk Level:

Previous Verification:
Timestamp:

---

DR-02 — Executive Verification Summary

STATUS:
PASS / FAIL / UNCERTAIN / BLOCKED / NOT VERIFIED

SEVERITY:

SUMMARY:

PRIMARY ISSUE:

AFFECTED SYSTEMS / FILES:

REWORK REQUIRED:
YES / NO

PM ACTION REQUIRED:
YES / NO

Bagian ini adalah bagian pertama yang dibaca PM.

---

DR-03 — Requirement Result Matrix

Requirement| Result| Severity| Evidence
REQ-XXX| PASS / FAIL / UNCERTAIN / BLOCKED / NOT VERIFIED| | 

---

DR-04 — Acceptance Criteria Results

AC| Expected| Observed| Result
AC-001| | | 

---

DR-05 — Findings

Setiap finding memiliki:

Finding ID:
Severity:
Type:

Requirement:
Finding:
Impact:

Evidence:

Severity:

- LOW
- MEDIUM
- HIGH
- CRITICAL

---

DR-06 — Rework Recommendation

Rework Required:
YES / NO

Recommended Action:

Affected Files:

Technical Scope:

Authority Basis:

Verifier boleh menginisiasi technical rework jika berada dalam approved scope.

---

DR-07 — Escalation

Escalation Required:
YES / NO

Reason:

Required PM Decision:

Escalation wajib dilakukan jika masalah memerlukan:

- requirement change;
- GDD change;
- architecture change;
- locked decision change;
- project scope change;
- PM authority.

---

DR-08 — Evidence Summary

EVID-001:
Source:
Finding Supported:
Summary:

EVID-002:
Source:
Finding Supported:
Summary:

PM tidak perlu membaca seluruh raw evidence kecuali diperlukan.

---

DR-09 — Verification Conclusion

FINAL VERIFICATION STATUS:

UNRESOLVED FINDINGS:

REVERIFICATION REQUIRED:

REGRESSION RESULT:

TASK READINESS:

---

DR-10 — PM Decision Required

Verifier dapat merekomendasikan:

ACCEPT VERIFICATION RESULT

AUTHORIZE / CONTINUE TECHNICAL REWORK

ESCALATE

REQUEST ADDITIONAL VERIFICATION

OVERRIDE WITH DOCUMENTED JUSTIFICATION

Namun keputusan project-level tetap milik Active PM.

---

PART III — VERIFICATION CHAIN

Verification record bersifat immutable.

Contoh:

TASK-001
    │
    ├── VER-001 FAIL
    │       │
    │       └── REV-001
    │
    └── VER-002 PASS ← CURRENT

VER-001 tidak diedit menjadi PASS.

VER-002 merupakan verification baru.

---

PART IV — CURRENT VERIFICATION SUMMARY

Setiap task memiliki current verification pointer.

Contoh:

CURRENT VERIFICATION:
VER-002

STATUS:
PASS

PREVIOUS:
VER-001 — FAIL

OPEN FINDINGS:
0

REWORK:
COMPLETED

REGRESSION:
NONE

PM ACTION:
FINAL JUDGMENT REQUIRED

Successor PM membaca bagian ini terlebih dahulu.

History hanya dibuka jika diperlukan.

---

PART V — VERIFICATION REGISTRY

Global Verification Index

Verification ID| Task ID| Version| Domain| Status| Severity| Previous| Current
| | | | | | | 

---

Detail Verification Record

Setiap verification harus memiliki:

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

PART VI — REQUIREMENT TRACEABILITY

GDD tetap Source of Truth.

Registry ini hanya operational index.

Traceability:

GDD Section
    ↓
Requirement ID
    ↓
Task ID
    ↓
Assigned Role / Capability
    ↓
Implementation Output
    ↓
Verification
    ↓
Evidence
    ↓
PM Judgment

---

Requirement Registry

Requirement ID| GDD Reference| Requirement| Task| Output| Verification| Status| PM Judgment
| | | | | | | 

---

PART VII — PROGRESSIVE DISCLOSURE

Information consumption order:

L1 — Executive Summary
        ↓
L2 — Requirement / Result Matrix
        ↓
L3 — Evidence
        ↓
L4 — Raw Files

Default behavior:

«PM berhenti pada level terendah yang sudah memberikan cukup informasi untuk membuat keputusan.»

PM tidak diwajibkan membaca raw output hanya karena output tersebut tersedia.

---

PART VIII — AUTHORITY BOUNDARY

PM
│
├── WHAT
├── WHY
├── REQUIREMENT
├── ACCEPTANCE
├── MANDATORY SCOPE
├── LOCKED DECISION
└── FINAL JUDGMENT
        │
        ▼
    VERIFIER
        │
        ├── HOW TO VERIFY
        ├── DERIVED SCOPE
        ├── EVIDENCE
        ├── FINDINGS
        ├── TECHNICAL REWORK
        └── REVERIFICATION

---

PART IX — CORE STATUS DISTINCTION

Verification status:

PASS
FAIL
UNCERTAIN
BLOCKED
NOT VERIFIED

Task status:

BACKLOG
READY
IN_PROGRESS
REVIEW
COMPLETE
BLOCKED
CANCELLED

Keduanya tidak boleh dianggap sama.

Contoh:

Verification = PASS
Task = REVIEW

PM masih harus melakukan final judgment.

---

PART X — END-TO-END REFERENCE FLOW

PM
 ↓
TASK PACKAGE
 ↓
SPECIALIST
 ↓
OUTPUT
 ↓
SELF-CHECK
 ↓
VERIFICATION PACKAGE
 ↓
VERIFIER
 ↓
VERIFICATION REPORT
 ↓
FAIL
 ↓
TECHNICAL REWORK
 ↓
REVERIFICATION
 ↓
PASS
 ↓
PM FINAL JUDGMENT
 ↓
TASK COMPLETE
 ↓
MASTER STATE UPDATE

---

PART XI — CONTINUITY FLOW

Jika PM-01 hilang:

PM-01
 ↓
Persisted Master State
 ↓
Task Registry
 ↓
Decision Registry
 ↓
Verification Registry
 ↓
Current Verification Summary
 ↓
PM-02 TAKEOVER
 ↓
STATE VERIFICATION
 ↓
CONTINUE

PM-02 tidak perlu mengulang investigation yang sudah memiliki sufficient evidence.

---

LOCK STATUS

Verification System v1.0 — LOCKED
