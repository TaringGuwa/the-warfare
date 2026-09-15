SPECIALIST SELF-CHECK

Task ID: TASK-XXX
Task Version:
Specialist Role:
Agent Instance:
Implementation Version:
Date:

---

1. OUTPUT MANIFEST

List every output produced for this task.

File| Purpose| Status
| | CREATED / MODIFIED / UNCHANGED

---

2. REQUIREMENT SELF-CHECK

Each requirement from the Task Package must be checked.

Requirement ID| Requirement| Implementation Reference| Evidence| Status
REQ-XXX| | | | PASS / FAIL / UNCERTAIN / NOT VERIFIED / BLOCKED

Status Rules

PASS
The Specialist believes the requirement has been implemented correctly and has supporting evidence.

FAIL
The Specialist knows the requirement has not been satisfied.

UNCERTAIN
The Specialist cannot confidently determine whether the requirement is satisfied.

NOT VERIFIED
The implementation may exist, but sufficient verification was not performed.

BLOCKED
Verification could not be performed because of a dependency or prerequisite.

---

3. ACCEPTANCE CRITERIA SELF-CHECK

Acceptance Criterion| Evidence| Status
AC-001| | PASS / FAIL / UNCERTAIN / NOT VERIFIED / BLOCKED
AC-002| | PASS / FAIL / UNCERTAIN / NOT VERIFIED / BLOCKED

---

4. LOCKED DECISION CHECK

Confirm that implementation respects all relevant locked decisions.

Decision ID| Decision| Compliance| Evidence
D-XXX| | PASS / FAIL / UNCERTAIN| 

If a locked decision was impossible to follow, explain why.

---

5. SCOPE CHECK

IN-SCOPE WORK COMPLETED

- 

OUT-OF-SCOPE CHANGES

- None / list changes

The Specialist must explicitly report any work outside the approved scope.

---

6. DEPENDENCY CHECK

Dependency| Expected| Actual| Status
| | | PASS / FAIL / BLOCKED

---

7. INTERFACE / CONTRACT CHECK

Check all relevant interfaces and contracts.

Contract / Interface| Check| Status| Evidence
| | PASS / FAIL / UNCERTAIN / NOT VERIFIED| 

Do not silently modify an existing contract.

If a contract change is required:

ESCALATE TO PM.

---

8. REGRESSION SELF-CHECK

Check whether the implementation may affect existing systems.

Potentially affected systems

- 

Regression checks performed

- 

Result

PASS / FAIL / UNCERTAIN / NOT VERIFIED / BLOCKED

---

9. KNOWN ISSUES

List every known problem.

Issue ID| Description| Severity| Status
ISSUE-001| | LOW / MEDIUM / HIGH / CRITICAL| OPEN / RESOLVED

Do not hide known problems.

---

10. UNCERTAINTIES

List anything the Specialist is not confident about.

- 

If none:

"NONE"

---

11. ESCALATIONS

List issues requiring PM decision.

Escalation ID| Issue| Reason| PM Decision Required
ESC-001| | | 

If none:

"NONE"

---

12. FINAL SELF-CHECK STATUS

Choose exactly one:

PASS

All required implementation work appears complete and the Specialist found no known blocking issue.

FAIL

The Specialist knows one or more requirements or acceptance criteria are not satisfied.

UNCERTAIN

The Specialist cannot confidently establish correctness.

BLOCKED

The Specialist cannot complete the work because a required dependency, decision, access, or prerequisite is unavailable.

---

13. SPECIALIST DECLARATION

The Specialist confirms that:

- all required outputs have been listed;
- requirements have been checked;
- acceptance criteria have been checked;
- locked decisions have been checked;
- scope compliance has been checked;
- relevant dependencies have been checked;
- known issues have been disclosed;
- uncertainties have been disclosed;
- required escalations have been disclosed.

This declaration does not constitute PM acceptance or Verification PASS.

---

14. FINAL DELIVERY

The Specialist must return:

TASK STATUS:
READY FOR VERIFICATION

SELF-CHECK STATUS:
PASS / FAIL / UNCERTAIN / BLOCKED

OUTPUT MANIFEST:
[link/list of files]

SELF-CHECK:
[link to this document]

KNOWN ISSUES:
[none / list]

ESCALATIONS:
[none / list]

---

AUTHORITY RULE

Specialist Self-Check is:

EVIDENCE INPUT

It is NOT:

- PM acceptance;
- Verification PASS;
- QA PASS;
- Task completion.

The Verifier must independently verify relevant claims.

---

REFERENCE

This template operates under:

"AI_SYSTEM/PROTOCOLS/TASK_PACKAGE.md"

"AI_SYSTEM/PROTOCOLS/PAVA_PROTOCOL.md"

"AI_SYSTEM/PROTOCOLS/VERIFICATION_SYSTEM.md"

---

Specialist Self-Check Template Version: 1.0

Status: ACTIVE
