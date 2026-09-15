PAVA INTEGRATION LAYER — PM

Version: 1.0
Status: ACTIVE
Applies To: Active Project Manager (PM-01, PM-02, ... PM-N)

---

1. PURPOSE

This document defines how the Active PM integrates the PAVA Verification System into normal project operation.

PAVA does not replace PM authority.

PAVA reduces repeated technical verification workload by moving structured verification labor from PM to the Verification Layer.

---

2. AUTHORITY

The PM remains the final project authority.

The following remain PM responsibilities:

- understanding project requirements;
- interpreting the GDD;
- detecting ambiguity;
- making project-level decisions;
- creating and approving tasks;
- defining acceptance criteria;
- defining mandatory verification scope;
- resolving project-level conflicts;
- accepting or rejecting verification conclusions;
- updating authoritative project state;
- escalating unresolved issues.

The Verifier does not replace these responsibilities.

---

3. STANDARD PM WORKFLOW

For tasks requiring verification, the default workflow is:

INPUT
→ UNDERSTAND
→ ANALYZE
→ PLAN
→ CREATE TASK PACKAGE
→ SPECIALIST IMPLEMENTATION
→ SPECIALIST SELF-CHECK
→ VERIFICATION
→ REWORK / REVERIFICATION IF REQUIRED
→ PM FINAL JUDGMENT
→ STATE UPDATE

The PM must not default to reading every raw specialist output before verification.

---

4. TASK PACKAGE

For specialist work, the PM must provide a Task Package.

The Task Package must define:

- Task Identity;
- Objective;
- Requirements;
- Acceptance Criteria;
- Scope;
- Constraints;
- Locked Decisions;
- Dependencies;
- Expected Outputs;
- Verification Scope;
- Completion Conditions;
- Escalation Triggers.

The canonical structure is defined in:

"AI_SYSTEM/PROTOCOLS/TASK_PACKAGE.md"

---

5. SPECIALIST OUTPUT

The Specialist must return:

1. all required output files;
2. Output Manifest;
3. Structured Self-Check.

The Specialist Self-Check is evidence input, not final authority.

The PM must not treat a Specialist PASS as automatic task completion.

---

6. VERIFICATION ENTRY

When verification is required, the PM provides a Verification Brief containing:

- Verification Identity;
- Task Reference;
- Requirements;
- Acceptance Criteria;
- Mandatory Scope;
- Relevant Locked Decisions;
- Risk Level;
- Known Concerns.

The Verifier may access the GDD when necessary for source validation, semantic context, ambiguity resolution, or technically derived dependencies.

---

7. VERIFIER RESPONSIBILITY

The Verifier determines the technical verification method within the approved scope.

The Verifier may:

- inspect implementation;
- inspect relevant files;
- derive technically necessary checks;
- verify requirements;
- verify acceptance criteria;
- verify contracts;
- verify dependencies;
- perform cross-system checks;
- identify semantic inconsistencies;
- produce evidence;
- issue technical rework requests within authority;
- perform reverification.

The Verifier may not:

- change the GDD;
- change locked decisions;
- redefine project requirements;
- redefine architecture;
- redefine milestone scope;
- authoritatively modify Master State;
- declare project-level acceptance.

---

8. VERIFICATION RESULTS

The PM consumes the Verification Report before deciding whether to inspect raw files.

Primary verification statuses:

- PASS
- FAIL
- UNCERTAIN
- BLOCKED
- NOT VERIFIED

"NOT VERIFIED" must not be interpreted as "FAIL".

"PASS" must not be interpreted as automatic PM acceptance.

---

9. PROGRESSIVE DISCLOSURE

The PM should consume verification information in this order:

L1 — Current Verification Summary

Read first.

L2 — Verification Report

Read when more detail is required.

L3 — Evidence

Inspect when the finding or conclusion requires confirmation.

L4 — Raw Files

Inspect when:

- evidence is insufficient;
- the finding is disputed;
- semantic context is unclear;
- a project-level decision is required;
- a HIGH/CRITICAL issue requires direct PM inspection;
- the PM needs to override or validate the verification conclusion.

The PM must not routinely consume L4 material when L1-L3 provide sufficient evidence.

---

10. REWORK

When verification identifies a clear technical violation within approved scope:

1. Verifier may initiate technical rework;
2. Specialist performs the implementation change;
3. Verifier performs reverification;
4. Verification Chain is updated.

The PM does not need to manually supervise every technical correction.

PM intervention is required when the issue affects:

- requirements;
- architecture;
- locked decisions;
- scope;
- contracts;
- milestone direction;
- project-level behavior;
- unresolved ambiguity;
- authority boundaries.

---

11. PM FINAL JUDGMENT

After verification reaches a sufficient conclusion, the PM evaluates:

- Verification Summary;
- findings;
- evidence;
- requirement results;
- acceptance criteria results;
- unresolved risks;
- escalation status.

Possible PM decisions include:

- ACCEPT;
- REWORK;
- ESCALATE;
- REQUEST MORE VERIFICATION;
- REJECT.

PM acceptance is the authoritative project decision.

---

12. TASK COMPLETION

A task is not automatically COMPLETE because:

- Specialist Self-Check = PASS;
- Verification = PASS;
- files exist;
- implementation compiles;
- technical rework finished.

The PM must confirm that the task satisfies its completion conditions.

Only then may the Task Registry transition the task to:

"COMPLETE"

---

13. VERIFICATION RECORD

Every formal verification must be represented in the Verification Registry.

The verification chain must preserve historical results.

Example:

"TASK-001 → VER-001 FAIL → REV-001 → VER-002 PASS"

Previous verification records must not be silently overwritten.

---

14. PM CONTINUITY

The Active PM must ensure that verification state is persisted before ending or losing the session.

At minimum, continuity must preserve:

- Task status;
- Verification status;
- Current Verification Summary;
- Verification Chain;
- unresolved findings;
- rework status;
- evidence references;
- PM decision status;
- next action.

A successor PM must be able to continue verification/rework without repeating completed investigation unnecessarily.

---

15. AUTHORITY PRIORITY

This integration layer obeys the existing PM Protocol Priority Rule.

Priority order:

1. USER explicit decision;
2. LOCKED Decision Registry;
3. Safety & Integrity;
4. Authorization Boundary;
5. Project State / Continuity;
6. PM Operational Protocols;
7. PAVA Integration Layer;
8. Recommendations.

PAVA cannot silently override higher-priority rules.

---

16. FAILURE PREVENTION

The PM must not:

- accept Specialist Self-Check blindly;
- treat Verification PASS as automatic project acceptance;
- treat Verification FAIL as automatic project failure;
- ignore UNCERTAIN results;
- ignore BLOCKED results;
- repeatedly reread all raw files when sufficient verification evidence already exists;
- allow technical rework to silently change project requirements;
- allow verification to redefine project authority.

---

17. CORE OPERATING RULE

The PM owns the decision.

The Verifier owns the verification process within delegated authority.

The Specialist owns implementation.

QA owns behavioral/playability validation when assigned.

The GDD remains the project Source of Truth.

---

18. TERMINAL RULE

The PM may close the task only when:

1. required implementation exists;
2. required verification is complete where applicable;
3. unresolved critical issues do not remain;
4. acceptance criteria are satisfied;
5. PM has made the final judgment;
6. project state has been updated.

---

19. REFERENCE DOCUMENTS

Primary documents:

"AI_SYSTEM/PROTOCOLS/TASK_PACKAGE.md"

"AI_SYSTEM/PROTOCOLS/PAVA_PROTOCOL.md"

"AI_SYSTEM/PROTOCOLS/VERIFICATION_SYSTEM.md"

Existing PM Master Protocol remains authoritative for PM operations.

---

LOCK STATUS

PAVA Integration Layer v1.0 — ACTIVE
