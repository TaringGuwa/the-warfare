TASK REGISTRY

Registry Version: 1.0
Last Updated: YYYY-MM-DD HH:MM
Last Updated By: PM-XX
Status: ACTIVE

---

1. PURPOSE

Task Registry records the authoritative operational status of project tasks.

It allows the Active PM and successor PMs to determine:

- what tasks exist;
- what tasks are active;
- what tasks are blocked;
- what tasks are complete;
- what verification state each task is in;
- what the next action is.

---

2. TASK LIFECYCLE

Default lifecycle:

BACKLOG
   ↓
READY
   ↓
IN_PROGRESS
   ↓
REVIEW
   ↓
COMPLETE

Alternative states:

IN_PROGRESS → BLOCKED
BLOCKED → IN_PROGRESS

BACKLOG / READY / IN_PROGRESS / REVIEW
        ↓
     CANCELLED

---

3. TASK STATUS DEFINITIONS

BACKLOG

Task exists but is not yet ready for execution.

READY

Task has sufficient requirements, dependencies, scope, and acceptance criteria to begin.

IN_PROGRESS

Specialist or responsible role is actively implementing the task.

REVIEW

Implementation is available for verification or PM review.

COMPLETE

Completion conditions are satisfied and PM has accepted the task.

BLOCKED

Task cannot proceed because of a blocking dependency, decision, access, or prerequisite.

CANCELLED

Task has been intentionally stopped and will not continue under its current definition.

---

4. TASK REGISTRY

Task ID| Version| Title| Milestone| Priority| Owner| Status| Progress| Verification| Blocker| Next Action
| | | | | | | 0%| | | 

---

5. TASK RECORD REQUIREMENTS

Every task entry must maintain at least:

- Task ID;
- Task Version;
- Title;
- Milestone;
- Priority;
- Owner;
- Status;
- Progress;
- Verification status;
- Blocker status;
- Next Action.

Detailed task definition remains in the corresponding Task Package.

---

6. TASK PACKAGE REFERENCE

Every active task must reference its Task Package.

Example:

TASK-001
    ↓
AI_SYSTEM/TASKS/TASK-001.md

The Registry does not replace the Task Package.

The Registry tracks the task.

The Task Package defines the task.

---

7. VERIFICATION REFERENCE

Where verification is required, record the current verification.

Example:

TASK-001
Current Verification: VER-002
Status: PASS

The Registry must not delete previous verification history.

Historical verification remains in the Verification Registry.

---

8. REWORK REFERENCE

If technical rework occurs:

TASK-001
    ↓
VER-001 FAIL
    ↓
REV-001
    ↓
VER-002 PASS

The Task Registry should reference the current state while historical records remain preserved elsewhere.

---

9. PROGRESS RULE

Task progress must reflect objective completion.

Progress must not be increased merely because:

- files were created;
- implementation started;
- a Specialist claims completion;
- Self-Check passed.

Progress must be based on actual task completion evidence.

---

10. COMPLETION RULE

A task may transition to:

"COMPLETE"

only when:

1. required implementation exists;
2. completion conditions are satisfied;
3. required verification is complete where applicable;
4. unresolved blocking issues do not remain;
5. PM has made the final acceptance decision.

Verification PASS alone does not automatically set the task to COMPLETE.

---

11. STATUS TRANSITION LOG

Record significant status changes.

Transition ID| Task ID| From| To| Reason| Evidence| Date
TR-XXX| | | | | | 

Do not silently change a task state without preserving significant transition history.

---

12. BLOCKED TASKS

When a task becomes BLOCKED, record:

- blocker;
- reason;
- affected dependency;
- owner;
- expected resolution;
- next action.

Example:

Task ID| Blocker| Reason| Owner| Next Action
TASK-001| BLK-001| Missing contract| PM| Resolve contract

---

13. CANCELLED TASKS

Cancelled tasks must remain recorded.

Do not delete historical task records.

Record:

- cancellation reason;
- decision reference;
- date;
- replacement task if applicable.

---

14. TASK VERSIONING

Task definitions may change through authorized revision.

Example:

TASK-001 v1.0
      ↓
TASK-001 v1.1

Changes affecting requirements, scope, acceptance criteria, architecture, or locked decisions must follow the appropriate PM decision/revision protocols.

---

15. CONTINUITY RULE

A successor PM must be able to determine from Task Registry:

- all active tasks;
- their current status;
- current verification;
- blockers;
- progress;
- next action.

The successor PM should not need to reconstruct task history from raw specialist files.

---

16. AUTHORITY

The Active PM owns authoritative task-state decisions.

Specialists may report implementation status.

Verifiers may report verification status.

Neither may silently change authoritative PM task state.

---

17. INTEGRATION

Task Registry integrates with:

"AI_SYSTEM/STATE/MASTER_STATE.md"

"AI_SYSTEM/PROTOCOLS/TASK_PACKAGE.md"

"AI_SYSTEM/PROTOCOLS/PAVA_PROTOCOL.md"

"AI_SYSTEM/PROTOCOLS/VERIFICATION_SYSTEM.md"

"AI_SYSTEM/TASKS/TASK_PACKAGE_TEMPLATE.md"

---

18. INTEGRITY RULES

The Registry must:

- preserve historical task records;
- avoid duplicate Task IDs;
- preserve version history;
- reflect current authoritative status;
- reference evidence where necessary;
- avoid contradicting Master State;
- escalate unresolved state conflicts.

---

19. CURRENT TASK SUMMARY

Active Tasks

- NONE

Blocked Tasks

- NONE

Tasks Awaiting Verification

- NONE

Recently Completed

- NONE

---

LOCK STATUS

Task Registry v1.0 — ACTIVE
