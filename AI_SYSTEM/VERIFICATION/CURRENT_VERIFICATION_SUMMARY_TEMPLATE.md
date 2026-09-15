CURRENT VERIFICATION SUMMARY

Task ID: TASK-XXX
Current Verification ID: VER-XXX
Verification Version:
Previous Verification: VER-XXX / NONE
Verifier Instance:
Domain:
Risk Level:
Last Updated:

---

1. CURRENT STATUS

Verification Status:

PASS / FAIL / UNCERTAIN / BLOCKED / NOT VERIFIED

Rework Status:

NOT REQUIRED / REQUESTED / IN PROGRESS / COMPLETE / BLOCKED

PM Decision:

PENDING / ACCEPT / REQUEST REWORK / REQUEST MORE VERIFICATION / ESCALATE / REJECT

---

2. EXECUTIVE SUMMARY

Provide the shortest accurate description of the current verification state.

Include:

- what has been verified;
- what remains unresolved;
- whether rework is required;
- whether PM action is required.

---

3. REQUIREMENT STATUS

Requirement ID| Current Result| Finding| Evidence
REQ-XXX| PASS / FAIL / UNCERTAIN / NOT VERIFIED / BLOCKED| | 

---

4. ACCEPTANCE CRITERIA STATUS

AC ID| Current Result| Finding
AC-001| PASS / FAIL / UNCERTAIN / NOT VERIFIED / BLOCKED| 

---

5. OPEN FINDINGS

Only unresolved findings should appear here.

Finding ID| Description| Severity| Status| Action
F-001| | LOW / MEDIUM / HIGH / CRITICAL| OPEN| 

If none:

"NONE"

---

6. RESOLVED FINDINGS

Finding ID| Description| Resolution| Verification
F-001| | | VER-XXX

If none:

"NONE"

---

7. CURRENT REWORK

Revision ID:

REV-XXX / NONE

Reason:

- 

Affected Files:

- 

Status:

NOT REQUIRED / IN PROGRESS / COMPLETE / BLOCKED

---

8. ESCALATION

Escalation Required:

YES / NO

If YES:

Escalation ID: ESC-XXX

Reason:

- 

PM Decision Required:

- 

---

9. EVIDENCE STATUS

Evidence Sufficiency:

SUFFICIENT / INSUFFICIENT / CONFLICTING

Evidence Reference:

- VER-XXX
- E-XXX
- E-XXX

The PM should open deeper evidence only when necessary.

---

10. VERIFICATION CHAIN

Maintain the complete chain reference.

Example:

TASK-001
    ↓
VER-001 FAIL
    ↓
REV-001
    ↓
VER-002 PASS

Historical records must not be overwritten.

---

11. PM ACTION REQUIRED

Choose one:

NO ACTION

Verification is complete and no PM decision is currently required.

REVIEW

PM must review the verification result.

DECIDE

PM must make a project-level decision.

REWORK

PM must authorize or direct additional project-level work.

ESCALATE

PM must resolve an issue beyond Verifier authority.

---

12. PM QUICK READ

The PM should be able to understand the current state from this section alone.

Current Result

- 

Main Issue

- 

Evidence Confidence

HIGH / MEDIUM / LOW

Recommended PM Action

- 

Next Action

- 

---

13. RAW FILE ACCESS

Raw implementation files should only be opened when:

- evidence is insufficient;
- evidence conflicts;
- semantic context requires direct inspection;
- HIGH/CRITICAL finding requires PM confirmation;
- PM needs to evaluate a project-level decision;
- PM disputes the verification result;
- additional context cannot be established from verification records.

Raw files are not the default PM entry point.

---

14. AUTHORITY

This summary is a consumption layer.

It does not replace:

- Verification Reports;
- Verification Registry;
- Task Registry;
- Master State;
- Decision Registry.

The summary must reflect the latest authoritative verification state.

---

15. INTEGRITY RULE

The Current Verification Summary must always point to the latest valid verification record.

If:

"VER-001 FAIL → REV-001 → VER-002 PASS"

the summary must point to:

"VER-002"

It must not erase or rewrite the history of "VER-001".

---

REFERENCE DOCUMENTS

"AI_SYSTEM/PROTOCOLS/VERIFICATION_SYSTEM.md"

"AI_SYSTEM/PROTOCOLS/PAVA_PROTOCOL.md"

"AI_SYSTEM/VERIFICATION/VERIFICATION_REPORT_TEMPLATE.md"

---

Current Verification Summary Template Version: 1.0

Status: ACTIVE
