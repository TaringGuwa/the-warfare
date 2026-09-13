/**
 * THE WARFARE — Shared Data Schemas
 * Owner: Integration Lead (#13)
 * Status: DRAFT skeleton — mirrors /docs/INTERFACE_CONTRACT.md
 *
 * RULES FOR ALL AGENTS:
 * - Do NOT add gameplay logic to this file. Factory functions below only
 *   construct empty/default shaped objects — no rules, no calculations.
 * - If your system needs a field that doesn't exist here, do NOT invent it
 *   silently. Add a `// PROPOSED by <agent>: <field> - <reason>` comment
 *   and flag it in your task report for Integration Lead review.
 * - JSDoc typedefs exist purely for editor autocomplete / type-checking.
 *   No build step (TypeScript compiler) is assumed per GDD platform choice.
 */

/**
 * @typedef {"player"|"enemy"} Owner
 * @typedef {"mountain_forest"|"rural"|"urban"} Terrain
 * @typedef {string} RegionId
 * @typedef {string} UnitId
 * @typedef {string} OrderId
 */

/** @typedef {Object} Region
 * @property {string} id
 * @property {string} name
 * @property {Owner} owner
 * @property {Terrain} terrain
 * @property {boolean} isCapital
 * @property {RegionId[]} adjacency
 * @property {number} supportValue
 * @property {number} corruption
 * @property {number} taxRate
 * @property {Building[]} buildings
 * @property {"dirt"|"main"|"toll"|null} roadType
 * @property {{active: boolean}|null} stabilization
 * @property {boolean} hasActiveInsurgency
 */
export function createRegion(id, overrides = {}) {
  return {
    id,
    name: overrides.name ?? id,
    owner: overrides.owner ?? "player",
    terrain: overrides.terrain ?? "rural",
    isCapital: overrides.isCapital ?? false,
    adjacency: overrides.adjacency ?? [],
    supportValue: overrides.supportValue ?? 0,
    corruption: overrides.corruption ?? 0,
    taxRate: overrides.taxRate ?? 0,
    buildings: overrides.buildings ?? [],
    roadType: overrides.roadType ?? null,
    stabilization: overrides.stabilization ?? null,
    hasActiveInsurgency: overrides.hasActiveInsurgency ?? false,
  };
}

/** @typedef {Object} Building
 * @property {string} id
 * @property {RegionId} regionId
 * @property {"civil"|"government"|"military"} category
 * @property {string} type
 * @property {number} hp
 * @property {number} maxHp
 * @property {number} constructionProgress
 * @property {boolean} autoRebuild
 * @property {number} supportContribution
 */
export function createBuilding(id, regionId, category, type, overrides = {}) {
  return {
    id,
    regionId,
    category,
    type,
    hp: overrides.hp ?? 100,
    maxHp: overrides.maxHp ?? 100,
    constructionProgress: overrides.constructionProgress ?? 0,
    autoRebuild: category !== "military",
    supportContribution: overrides.supportContribution ?? 0,
  };
}

/**
 * @typedef {"garrisoned"|"moving"|"attacking"|"retreating"|"withdrawing"|
 *           "patrolling"|"striking"|"cooldown"|"captured"} UnitState
 *
 * IMPORTANT (GDD §6.3, §15.2, §21 -- LOCKED): "retreating" and "withdrawing"
 * are DISTINCT states and must never be merged or used interchangeably:
 *   - "retreating" = ATTACKER pulling back mid-attack (Retreat, §6.3)
 *   - "withdrawing" = DEFENDER pulling back before/during being attacked,
 *                     to save troops before defeat (Withdraw, §15.2)
 * Combat module and Defensive AI module must each set the correct one;
 * do not reuse "retreating" for defender pullback.
 */

/** @typedef {Object} Unit
 * @property {string} id
 * @property {Owner} owner
 * @property {"AD"|"tank"|"jet"|"missile"|"intel_personnel"|"intel_drone"} type
 * @property {number} power
 * @property {RegionId|null} locationRegionId
 * @property {UnitState} state
 * @property {number|null} cooldownUntilTick
 */
export function createUnit(id, owner, type, overrides = {}) {
  return {
    id,
    owner,
    type,
    power: overrides.power ?? 1,
    locationRegionId: overrides.locationRegionId ?? null,
    state: overrides.state ?? "garrisoned",
    cooldownUntilTick: overrides.cooldownUntilTick ?? null,
  };
}

/** @typedef {Object} MovementOrder */
export function createMovementOrder(id, owner, unitIds, originRegionId, destinationRegionId, overrides = {}) {
  return {
    id,
    owner,
    unitIds,
    originRegionId,
    destinationRegionId,
    route: overrides.route ?? [],
    issuedTick: overrides.issuedTick ?? 0,
    etaTick: overrides.etaTick ?? 0,
    oilCostPaid: overrides.oilCostPaid ?? 0,
    status: overrides.status ?? "in_transit",
  };
}

/** @typedef {Object} Frontline (DERIVED — do not persist as source of truth) */
export function createFrontline(playerRegionId, enemyRegionId, overrides = {}) {
  return {
    regionPairId: `${playerRegionId}:${enemyRegionId}`,
    playerRegionId,
    enemyRegionId,
    powerRatio: overrides.powerRatio ?? [50, 50],
    pressure: overrides.pressure ?? 0,
    threatLevel: overrides.threatLevel ?? 0,
  };
}

/** @typedef {Object} InsurgencyState */
export function createInsurgencyState(regionId, overrides = {}) {
  return {
    regionId,
    status: overrides.status ?? "dormant",
    triggeredAtTick: overrides.triggeredAtTick ?? null,
    delayRemainingDays: overrides.delayRemainingDays ?? 0,
    tier: overrides.tier ?? 0,
    unitCount: overrides.unitCount ?? 0,
    effectivePower: overrides.effectivePower ?? 0,
    lastSpreadTick: overrides.lastSpreadTick ?? null,
  };
}

/**
 * @typedef {Object} VisibilityEntry
 * @property {boolean} personnelRevealed  // GDD §8: frontline info (AD count, facilities, Jet patrol status, Tanks)
 * @property {boolean} droneRevealed      // GDD §8: deeper enemy region info
 *
 * STATUS: NEEDS CONFIRMATION (provisional schema from PM, pending Intelligence
 * agent sign-off). Keyed per RegionId inside FactionState.visibility below --
 * i.e. "what this faction currently sees of that region."
 */
export function createVisibilityEntry(overrides = {}) {
  return {
    personnelRevealed: overrides.personnelRevealed ?? false,
    droneRevealed: overrides.droneRevealed ?? false,
  };
}

/** @typedef {Object} FactionState */
export function createFactionState(capitalRegionId, overrides = {}) {
  return {
    capitalRegionId,
    globalSupport: overrides.globalSupport ?? 100,
    money: overrides.money ?? 0,
    oil: overrides.oil ?? 0,
    oilDerricksBuilt: overrides.oilDerricksBuilt ?? 0,
    sanctionsApplied: overrides.sanctionsApplied ?? [],
    visibility: overrides.visibility ?? new Map(), // RegionId -> VisibilityEntry, NEEDS CONFIRMATION
  };
}

/** @typedef {Object} PolicyState */
export function createPolicyState(overrides = {}) {
  return {
    antiCorruptionLevel: overrides.antiCorruptionLevel ?? 0,
  };
}

/** @typedef {Object} TickEvent */
export function createTickEvent(tickNumber) {
  return {
    tickNumber,
    deltas: [], // { category, regionId, value, note }
  };
}

/**
 * Root state factory. No systems are populated here — Core Simulation (#2)
 * is responsible for bootstrapping actual map data (GDD §19) at game start.
 */
export function createEmptyGameState() {
  return {
    tick: 0,
    startDate: "2000-01-01",
    regions: new Map(),
    units: new Map(),
    movementOrders: new Map(),
    frontlines: [], // recomputed each tick — see INTERFACE_CONTRACT.md §2 open question
    players: {
      player: createFactionState(null),
      enemy: createFactionState(null),
    },
    insurgencies: new Map(),
    policies: {
      player: createPolicyState(),
      enemy: createPolicyState(),
    },
  };
}
