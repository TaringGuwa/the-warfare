PM STATE INTEGRATION

1. PURPOSE

Dokumen ini mendefinisikan bagaimana Active PM menggunakan State System untuk menjalankan project secara continuous, traceable, dan recoverable.

State System terdiri dari:

MASTER_STATE
TASK_REGISTRY
VERIFICATION_REGISTRY
DECISION_REGISTRY
HANDOVER
HISTORY / EVENT LOG

State System tidak menggantikan:

- GDD;
- Requirement Registry;
- PM Protocol;
- PAVA Protocol;
- Task Package;
- Verification System.

State System menyediakan operational continuity.

---

2. PM STATE ACCESS PRINCIPLE

Active PM harus dapat mengetahui kondisi project tanpa membaca seluruh historical data.

Urutan utama:

MASTER_STATE
      ↓
TASK_REGISTRY
      ↓
CURRENT VERIFICATION SUMMARY
      ↓
DECISION_REGISTRY
      ↓
HANDOVER
      ↓
HISTORY / RAW DATA

PM menggunakan Progressive Disclosure.

Informasi yang lebih dalam hanya dibuka ketika diperlukan.

---

3. MASTER STATE

"MASTER_STATE.md" adalah operational snapshot utama.

PM harus menggunakan Master State untuk mengetahui:

- Active PM;
- project progress;
- current milestone;
- active tasks;
- active verification;
- blockers;
- risks;
- dependencies;
- current next action;
- last checkpoint.

Master State harus selalu merefleksikan kondisi operational terbaru.

---

4. TASK REGISTRY

PM menggunakan Task Registry untuk mengetahui:

- task aktif;
- task status;
- task priority;
- task owner;
- task progress;
- verification state;
- blocker;
- next action.

Task Package tetap menjadi detailed task definition.

Task Registry menjadi current task-status reference.

---

5. VERIFICATION REGISTRY

PM menggunakan Verification Registry untuk mengetahui:

- verification aktif;
- verification history;
- current verification result;
- open findings;
- rework;
- escalation;
- verification chain.

PM tidak perlu membaca seluruh verification history secara default.

Gunakan:

CURRENT_VERIFICATION_SUMMARY

sebagai first-level consumption layer.

---

6. DECISION REGISTRY

PM menggunakan Decision Registry untuk mengetahui:

- locked decisions;
- active accepted decisions;
- superseded decisions;
- decision conflicts;
- decision history.

PM harus memastikan task dan implementation tidak melanggar locked decisions.

---

7. HANDOVER

Handover digunakan ketika:

- Active PM diganti;
- takeover dilakukan;
- continuity snapshot diperlukan;
- recovery diperlukan.

Handover tidak menggantikan Master State.

Incoming PM harus tetap melakukan State Verification.

---

8. HISTORY / EVENT LOG

History digunakan untuk:

- memahami perubahan;
- melakukan audit;
- memahami sebab perubahan;
- merekonstruksi event chain;
- membantu diagnosis.

History bukan current-state source.

---

9. PM STATE LOAD

Saat PM menjadi Active atau memulai operational session:

STATE LOAD
    ↓
MASTER STATE
    ↓
TASK REGISTRY
    ↓
CURRENT VERIFICATION SUMMARY
    ↓
DECISION REGISTRY
    ↓
HANDOVER IF APPLICABLE
    ↓
HISTORY WHEN NEEDED

PM harus mendapatkan minimum operational context sebelum mengambil project-level action.

---

10. STATE VERIFICATION

Setelah State Load:

STATE LOAD
    ↓
CONSISTENCY CHECK
    ↓
STATE VERIFICATION

PM harus memeriksa:

- Active PM consistency;
- milestone consistency;
- active task consistency;
- verification consistency;
- decision consistency;
- blocker consistency;
- dependency consistency;
- next-action consistency.

Jika terdapat contradiction critical:

DO NOT ASSUME
DO NOT SILENTLY FIX
ESCALATE / RESOLVE

---

11. PM ACTION GATE

PM tidak boleh melakukan major project action sebelum minimum state context tersedia.

Minimum context:

- current milestone;
- active tasks;
- current verification;
- locked decisions;
- blockers;
- risks;
- dependencies;
- current next action.

---

12. TASK CREATION INTEGRATION

Saat PM membuat task:

GDD / REQUIREMENT
       ↓
PM ANALYSIS
       ↓
TASK PACKAGE
       ↓
TASK REGISTRY
       ↓
SPECIALIST

PM harus:

1. membuat Task Package;
2. menentukan requirements;
3. menentukan acceptance criteria;
4. menentukan scope;
5. menentukan constraints;
6. menentukan verification scope;
7. menentukan completion conditions;
8. mendaftarkan task ke Task Registry.

---

13. TASK EXECUTION INTEGRATION

Specialist:

TASK PACKAGE
      ↓
IMPLEMENTATION
      ↓
SELF-CHECK
      ↓
READY FOR VERIFICATION

Task Registry harus mencerminkan transition:

READY
  ↓
IN_PROGRESS
  ↓
REVIEW

---

14. VERIFICATION INTEGRATION

Setelah specialist menyatakan:

TASK STATUS: READY FOR VERIFICATION

PM / system:

TASK
 ↓
VERIFICATION PACKAGE
 ↓
VERIFICATION
 ↓
VERIFICATION REPORT
 ↓
CURRENT VERIFICATION SUMMARY
 ↓
PM FINAL JUDGMENT

Verification result kemudian diregistrasikan.

---

15. PM FINAL JUDGMENT

Verification bukan final authority.

PM menerima:

- verification result;
- evidence;
- findings;
- specialist self-check;
- rework recommendation.

PM kemudian menentukan:

ACCEPT
REWORK
ESCALATE

PM decision menjadi operational truth.

---

16. REWORK INTEGRATION

Jika PM menentukan REWORK:

VERIFICATION FINDING
        ↓
REWORK
        ↓
SPECIALIST SELF-CHECK
        ↓
REVERIFICATION
        ↓
PM FINAL JUDGMENT

Task Registry dan Verification Registry harus diperbarui.

History harus mencatat event penting.

---

17. TASK COMPLETION

Task hanya dapat menjadi:

COMPLETE

jika:

- implementation selesai;
- completion conditions terpenuhi;
- required verification selesai;
- tidak terdapat blocking issue;
- PM memberikan final acceptance.

"READY FOR VERIFICATION" bukan "COMPLETE".

---

18. DECISION CHANGE INTEGRATION

Jika implementation menemukan kebutuhan perubahan decision:

CONFLICT / NEW INFORMATION
        ↓
PM REVIEW
        ↓
DECISION PROCESS
        ↓
DECISION REGISTRY UPDATE
        ↓
AFFECTED TASK REVIEW
        ↓
VERIFICATION IMPACT REVIEW

Specialist tidak boleh langsung mengubah locked decision.

---

19. BLOCKER INTEGRATION

Jika blocker ditemukan:

BLOCKER DETECTED
        ↓
MASTER_STATE UPDATE
        ↓
TASK_REGISTRY UPDATE
        ↓
HISTORY EVENT
        ↓
MITIGATION / ESCALATION

Blocker harus memiliki owner dan next action jika memungkinkan.

---

20. PROGRESS INTEGRATION

Progress harus berasal dari objective project state.

PM harus membedakan:

Overall Project Progress

Kemajuan keseluruhan project.

Current Milestone Progress

Kemajuan milestone aktif.

Task completion dapat berkontribusi terhadap progress, tetapi tidak boleh digunakan untuk menghasilkan progress palsu.

Progress update harus dapat dijelaskan.

---

21. STATE UPDATE CYCLE

Setelah significant project action:

ACTION
 ↓
TASK / VERIFICATION / DECISION UPDATE
 ↓
MASTER_STATE UPDATE
 ↓
HISTORY EVENT
 ↓
CHECKPOINT

Tidak semua minor event membutuhkan full state rewrite.

Namun significant state change harus direfleksikan.

---

22. CHECKPOINT

Checkpoint dibuat setelah:

- milestone transition;
- major task completion;
- major verification;
- decision lock;
- major rework;
- blocker resolution;
- escalation resolution;
- handover;
- major architecture change.

Checkpoint harus menunjuk ke state yang valid.

---

23. PM SESSION START

Pada awal operational session:

SESSION START
    ↓
LOAD MASTER_STATE
    ↓
CHECK TASKS
    ↓
CHECK VERIFICATION
    ↓
CHECK DECISIONS
    ↓
CHECK BLOCKERS
    ↓
IDENTIFY NEXT ACTION

PM kemudian dapat melanjutkan workflow.

---

24. PM SESSION END

Sebelum session berakhir, PM harus memastikan:

- significant task changes tercatat;
- verification changes tercatat;
- decision changes tercatat;
- blockers diperbarui;
- progress diperbarui jika relevan;
- Master State mencerminkan current state;
- next action jelas;
- checkpoint dibuat jika diperlukan.

---

25. TAKEOVER INTEGRATION

Takeover mengikuti:

TAKEOVER REQUEST
      ↓
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
ACTIVE PM

Incoming PM tidak boleh menjadi ACTIVE sebelum acceptance.

---

26. FAILURE RECOVERY

Jika state tidak konsisten:

DETECT
 ↓
IDENTIFY SOURCE
 ↓
COMPARE REGISTRIES
 ↓
CHECK HISTORY
 ↓
RESOLVE
 ↓
CORRECTION EVENT
 ↓
MASTER_STATE UPDATE

Tidak boleh memperbaiki state dengan menghapus historical evidence.

---

27. SOURCE PRIORITY

Jika terdapat conflict:

PROJECT AUTHORITY
        ↓
LOCKED REQUIREMENTS / GDD
        ↓
ACTIVE DECISIONS
        ↓
MASTER_STATE
        ↓
REGISTRIES
        ↓
HISTORY
        ↓
RAW / INFORMAL CONTEXT

Catatan:

Source priority harus selalu mengikuti authority yang telah ditetapkan oleh project architecture.

Informasi yang lebih rendah tidak boleh diam-diam override authority yang lebih tinggi.

---

28. CONTINUITY REQUIREMENT

Sistem dianggap operationally continuous jika PM pengganti dapat menentukan:

- current project state;
- current milestone;
- active tasks;
- verification state;
- locked decisions;
- blockers;
- risks;
- dependencies;
- next action;

tanpa membutuhkan memory pribadi PM sebelumnya.

---

29. INTEGRATION WITH PAVA

State System tidak menggantikan PAVA.

Hubungan:

PAVA
 ↓
TASK
 ↓
VERIFICATION
 ↓
PM JUDGMENT
 ↓
STATE UPDATE

PAVA menentukan verification workflow.

State System memastikan hasil workflow tersebut dapat dipertahankan secara operational dan historical.

---

30. INTEGRATION WITH PM PROTOCOL

PM Protocol tetap menjadi authority utama untuk perilaku PM.

Dokumen ini hanya mendefinisikan bagaimana PM berinteraksi dengan State System.

Jika terjadi conflict:

PM PROTOCOL
    >
STATE INTEGRATION

---

31. INTEGRATION WITH PROJECT DOCUMENTATION

State System tidak menggantikan:

- GDD;
- architecture documentation;
- source code;
- asset documentation;
- technical documentation.

State System menyimpan operational state dan references.

---

32. INTEGRITY RULES

1. Current state harus dapat ditelusuri.
2. Historical data tidak boleh dihapus untuk menyembunyikan perubahan.
3. Registry tidak boleh digunakan untuk diam-diam mengubah authority.
4. PM tetap final authority pada project acceptance.
5. Locked decisions tidak boleh diubah tanpa authorized decision process.
6. Verification result tidak boleh diubah oleh task execution.
7. History tidak boleh digunakan sebagai pengganti current state.
8. Handover tidak boleh digunakan untuk melewati State Verification.
9. Master State harus menunjuk ke current valid records.
10. Significant state changes harus menghasilkan traceable update.

---

33. CURRENT INTEGRATION STATUS

State System components:

- MASTER_STATE: ACTIVE
- TASK_REGISTRY: ACTIVE
- VERIFICATION_REGISTRY: ACTIVE
- DECISION_REGISTRY: ACTIVE
- HANDOVER: ACTIVE
- HISTORY / EVENT LOG: ACTIVE

Integration:

ACTIVE — STRUCTURAL ONLY

No real project state has been initialized yet.

---

34. CURRENT NEXT ACTION

Initialize actual project state only after all State System structures have been validated.

---

35. LOCK STATUS

PM State Integration v1.0 — ACTIVE
