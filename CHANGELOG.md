Changelog

All notable changes to this project will be documented in this file.

---
The Warfare [0.0.3] — Terrain & Gameplay Update

Added

Terrain System
Introduced a simplified three-type terrain system:
City / Urban
Farm / Rural / Village
Mountain / Forest
Terrain-Based Road System
Road construction is now restricted based on terrain type:
Main Road → available only on Farm / Rural / Village terrain.
Toll Road / Highway → available only on City / Urban terrain.
Dirt Road → available only on Mountain / Forest terrain.

Fixed

Fixed an issue where insurgents could appear too early in the game, causing insurgency events to occur prematurely during the early-game phase.
Version Status
The Warfare v0.0.3 — Development
This update introduces the initial terrain classification and terrain-specific road construction system, while improving early-game balance by adjusting insurgent spawning behavior.

The Warfare [0.0.2] — Development Update

Fixed & Improved

- Added an in-game day, month, and year system.
- Every new game now starts in January 2000.
- Increased the number of territories from 10 to 15 territories per country.
- Changed the game orientation to horizontal.
- Added a construction animation using stacked bricks to represent ongoing construction.
  - Each brick represents one active construction.
  - A territory can visually display up to three active constructions.
- Construction duration and cost have been rebalanced.

Infrastructure

Basic Infrastructure

- Health Center:
  - Cost: 20
  - Base construction time: 30 days
- Education:
  - Cost: 20
  - Base construction time: 30 days
- Water & Sanitation:
  - Cost: 20
  - Base construction time: 30 days
- Economic Infrastructure:
  - Cost: 20
  - Base construction time: 30 days

Construction time increases by 15% for each territory farther away from the capital.

Signal Infrastructure

- Construction time: 40 days
- Cost: 30
- Distance-based construction time modifier applied.

Electrical Substation

- Construction time: 30 days
- Cost: 25

Oil Derrick

- Construction time: 60 days
- Cost: 50

Roads

Road types are now separated into three different categories:

- Main Road
  - Cost: 40
  - Construction time: 60 days
- Highway
  - Cost: 80
  - Construction time: 70 days
- Path
  - Cost: 20
  - Construction time: 40 days

Military Infrastructure

Military facilities now require:

- Construction time: 60 days
- Construction cost: 30

Affected facilities:

- Barracks
- Tank Factory
- Aircraft Factory
- Reconnaissance Center
- Missile Factory

Military unit training time:

- 30 days

Military Logistics

Added oil consumption for military production:

Unit| Oil Required
Aircraft| 100
Tank| 50
Drone| 200
Missile| 500

Added oil consumption for military movement:

Unit| Oil Cost
Infantry| 10 per battalion
Aircraft| 20 per unit
Tank| 15 per unit
Missile| 40 per unit

Movement costs are calculated based on the number of territories crossed.

Economy

Added the ability to exchange money for oil.

- Exchange rate: 100 money = 100 oil

Territory & Frontline System

Added a frontline pressure mechanic.

When a player's or CPU's territory directly borders enemy-controlled territories, the controlling power is reduced by 10% for each directly bordering enemy territory.

Corruption System

Added a corruption mechanic.

- Corruption increases by 5% whenever a facility is constructed.
- Every 5% corruption reduces overall territorial support by 2%.

Inflation System

Added an inflation mechanic.

Inflation increases by 5% when:

- Constructing facilities
- Producing military units
- Training military units

Inflation increases the cost of purchases by 1% for every 1% inflation.

Inflation naturally decreases by 5% every 7 days.

Country Development

Added a new Country menu alongside the existing Construction and Military menus.

Anti-Corruption Program

- Cost: 20
- Effect: Reduces corruption by 1% per week
- Activation: Instant

Outreach

- Reduces construction duration by 5%

AI

- Began development of an Advanced CPU AI system.
- AI behavior will continue to be expanded and refined in future versions.

Combat & Visual Effects

Added several new visual systems:

- Basic frontline battle animation.
- Jet attack animation.
- Territory annexation animation.
- Military unit movement animation.

Military Deployment

Newly produced and trained military units are automatically deployed at the capital.

Rebellion System

Added a rebellion system.

Rebels can:

- Spread from one territory to neighboring territories.
- Influence territories under rebel control.
- Destroy previously constructed facilities.
- Require military intervention to suppress.

Rebellions can be suppressed by deploying infantry units.

After a rebellion is successfully suppressed:

- Destroyed facilities automatically resume construction.
- Reconstruction takes 1.5× the normal construction duration.

---

Development Status

Version 0.0.2 — Early Development

The game is currently under active development. Gameplay systems, AI behavior, economy, military mechanics, balancing, animations, and user interface are subject to further changes.
