# How to Add Your Module — The Warfare Build Skeleton

**Read this before writing any code.** Also read `INTERFACE_CONTRACT.md` first — it defines the data shapes you must use.

## 1. Folder ownership
```
index.html                 <- Integration Lead owns. Do not edit unless told to.
src/
  core/
    GameState.js            <- Core Simulation Programmer (#2) owns.
    TickEngine.js            <- Integration Lead owns the registration contract;
                                Core Sim owns the actual loop timing (TASK-001).
  data/
    schemas.js               <- Integration Lead owns. Propose new fields via
                                comment + task report, do not edit directly
                                without approval (this is the shared contract).
  modules/
    <your-domain>/index.js   <- YOU own this file and only this file.
  main.js                     <- Integration Lead owns. Add your import line
                                 (one line, alphabetical) when your module
                                 is ready; do not restructure the file.
```

## 2. Rule: one folder per agent, no cross-writes
Each domain (`economy`, `combat`, `ai`, `insurgency`, `intelligence`, `movement`, `ui`)
has its own folder under `src/modules/`. **Do not import or mutate another
domain's internal files.** If you need something from another domain,
read it off the shared `GameState` object (via `getState()` from
`core/GameState.js`), never reach into another module's file directly.

## 3. Rule: register your tick logic, don't build your own loop
```js
import { registerSystem } from "../../core/TickEngine.js";

function myDomainStep(state, tick) {
  // your logic here — mutate only the fields your domain owns
  // per the ownership table in INTERFACE_CONTRACT.md §4
}

registerSystem(myDomainStep);
```
Do not call `setInterval`/`requestAnimationFrame` yourself for simulation logic —
GDD §13 requires a single global tick. UI rendering is the one exception
(render loop is separate from simulation tick, see `modules/ui/index.js`).

## 4. Rule: use the shared schemas, don't invent your own shapes
```js
import { createUnit, createRegion } from "../../data/schemas.js";
```
If a field you need doesn't exist in `schemas.js`, **stop** — do not add it
yourself. Flag it in your task report as:
```
PROPOSED SCHEMA CHANGE
Field: <name>
Entity: <Region|Unit|...>
Reason: <why existing shape is insufficient>
```
Integration Lead will review and either add it centrally or escalate to
the Technical Architect if it's structural.

## 5. Before you report "task complete"
- [ ] `index.html` still opens with zero console errors after your change.
- [ ] Your module only writes to fields it owns (INTERFACE_CONTRACT.md §4 table).
- [ ] No numeric balancing constants are hardcoded in your logic file — pull
      them from a config source so Balancing Draft updates don't require
      code changes (values are DRAFT and will change after playtest).
- [ ] You have not modified `schemas.js`, `TickEngine.js`, `GameState.js`,
      or `index.html` directly.
