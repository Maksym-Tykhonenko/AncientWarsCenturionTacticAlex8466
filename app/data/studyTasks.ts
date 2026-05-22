export type StudyTask = {
  id: string;
  title: string;
  sphere: string;
  minutes: number;
  description: string;
};

export const STUDY_TASKS: StudyTask[] = [
  {
    id: 'trace-battle-route',
    title: 'Trace the Battle Route',
    sphere: 'Geography & Campaign Movement',
    minutes: 12,
    description:
      'Choose one ancient battle and study how the armies reached the battlefield. Focus on roads, rivers, mountains, ports, supply routes, and why the location became strategically important.',
  },
  {
    id: 'compare-two-commanders',
    title: 'Compare Two Commanders',
    sphere: 'Leadership & Strategy',
    minutes: 15,
    description:
      'Select two ancient commanders from different battles and compare their decisions. Pay attention to how they used terrain, timing, army formation, risk, and morale before or during battle.',
  },
  {
    id: 'rebuild-battle-timeline',
    title: 'Rebuild a Battle Timeline',
    sphere: 'Chronology',
    minutes: 10,
    description:
      'Pick one battle and create a short timeline of its key stages: preparation, first movement, main clash, turning point, retreat, and final outcome.',
  },
  {
    id: 'study-tactical-mistake',
    title: 'Study a Tactical Mistake',
    sphere: 'Tactical Analysis',
    minutes: 14,
    description:
      'Find a battle where one side made a serious tactical mistake. Explain what the mistake was, why it happened, and how the enemy used it to gain an advantage.',
  },
  {
    id: 'map-ancient-empires',
    title: 'Map the Ancient Empires',
    sphere: 'Historical Geography',
    minutes: 18,
    description:
      'Choose a conflict involving two ancient powers and identify their territories on a map. Study how distance, borders, sea routes, and neighboring allies influenced the campaign.',
  },
  {
    id: 'analyze-terrain-role',
    title: 'Analyze the Role of Terrain',
    sphere: 'Battlefield Environment',
    minutes: 13,
    description:
      'Study how terrain affected one ancient battle. Look at hills, rivers, narrow passes, plains, forests, coastlines, or city walls, and explain how the landscape helped or weakened each army.',
  },
  {
    id: 'investigate-army-composition',
    title: 'Investigate Army Composition',
    sphere: 'Military Structure',
    minutes: 16,
    description:
      'Choose one army and break down its main forces: infantry, cavalry, archers, slingers, elephants, chariots, navy, or siege units. Explain how these parts worked together in battle.',
  },
  {
    id: 'find-turning-point',
    title: 'Find the Turning Point',
    sphere: 'Battle Outcome',
    minutes: 11,
    description:
      'Select a famous battle and identify the exact moment when the result began to change. Describe what happened, who made the key decision, and why that moment mattered.',
  },
  {
    id: 'examine-ancient-weapons',
    title: 'Examine Ancient Weapons',
    sphere: 'Weapons & Equipment',
    minutes: 12,
    description:
      'Research one weapon or piece of equipment used in ancient warfare, such as the sarissa, gladius, hoplite shield, trireme ram, composite bow, sling, or war elephant armor.',
  },
  {
    id: 'explore-naval-battle',
    title: 'Explore a Naval Battle',
    sphere: 'Naval Warfare',
    minutes: 15,
    description:
      'Choose an ancient sea battle and study how ships, wind, coastline, formation, and maneuvering influenced the result. Explain why naval control mattered in that conflict.',
  },
  {
    id: 'decode-battle-formation',
    title: 'Decode a Battle Formation',
    sphere: 'Formations & Tactics',
    minutes: 14,
    description:
      'Select one formation, such as the phalanx, testudo, shield wall, cavalry wedge, or skirmisher screen. Explain how it worked, what its strengths were, and what could defeat it.',
  },
  {
    id: 'research-lesser-known-battle',
    title: 'Research a Lesser-Known Battle',
    sphere: 'Hidden History',
    minutes: 20,
    description:
      'Find an ancient battle that is not as famous as Thermopylae, Cannae, or Gaugamela. Study its background, commanders, forces, outcome, and why it deserves more attention.',
  },
  {
    id: 'study-role-of-morale',
    title: 'Study the Role of Morale',
    sphere: 'Psychology of War',
    minutes: 13,
    description:
      'Choose a battle where morale, fear, discipline, betrayal, exhaustion, or confidence strongly affected the result. Explain how emotions and mental pressure shaped the outcome.',
  },
  {
    id: 'investigate-siege',
    title: 'Investigate a Siege',
    sphere: 'Siege Warfare',
    minutes: 17,
    description:
      'Research an ancient siege and describe how the attackers tried to capture the city or fortress. Include siege towers, walls, tunnels, starvation, naval blockade, betrayal, or engineering.',
  },
  {
    id: 'follow-supply-problem',
    title: 'Follow the Supply Problem',
    sphere: 'Logistics',
    minutes: 16,
    description:
      'Study how food, water, weapons, reinforcements, or distance affected one ancient campaign. Explain why logistics could be just as important as battlefield bravery.',
  },
  {
    id: 'compare-victory-defeat',
    title: 'Compare Victory and Defeat',
    sphere: 'Historical Evaluation',
    minutes: 18,
    description:
      'Choose one victorious army and one defeated army from the same battle. Compare their preparation, leadership, tactics, morale, and mistakes to understand why one side succeeded.',
  },
  {
    id: 'investigate-battlefield-communication',
    title: 'Investigate Battlefield Communication',
    sphere: 'Command & Signals',
    minutes: 10,
    description:
      'Research how ancient armies communicated during battle using banners, horns, messengers, standards, formations, or visual signals. Explain why communication was difficult in combat.',
  },
  {
    id: 'create-commander-profile',
    title: 'Create a Commander Profile',
    sphere: 'Historical Figures',
    minutes: 15,
    description:
      'Choose one ancient commander and create a short profile. Include their origin, famous battle, leadership style, strongest tactic, biggest risk, and historical legacy.',
  },
  {
    id: 'study-alliance-before-battle',
    title: 'Study an Alliance Before Battle',
    sphere: 'Diplomacy & War',
    minutes: 14,
    description:
      'Choose a battle involving allied forces and explain why different groups fought together. Study whether the alliance was strong, fragile, forced, temporary, or based on shared danger.',
  },
  {
    id: 'explain-aftermath',
    title: 'Explain the Aftermath',
    sphere: 'Consequences',
    minutes: 13,
    description:
      'Pick one ancient battle and research what happened after it. Focus on political changes, empire expansion, surrender terms, revenge campaigns, leadership changes, or cultural impact.',
  },
  {
    id: 'analyze-famous-last-stand',
    title: 'Analyze a Famous Last Stand',
    sphere: 'Heroic Defense',
    minutes: 12,
    description:
      'Research a battle where a smaller force held out against a larger enemy. Explain why the defenders stayed, how long they resisted, and how the story influenced later history.',
  },
  {
    id: 'track-commander-risk',
    title: 'Track a Commander’s Risk',
    sphere: 'Decision-Making',
    minutes: 11,
    description:
      'Choose a battle where a commander made a dangerous decision. Explain what could have gone wrong, why the commander took the risk, and whether the decision succeeded.',
  },
  {
    id: 'research-ancient-cavalry',
    title: 'Research Ancient Cavalry Use',
    sphere: 'Cavalry Warfare',
    minutes: 15,
    description:
      'Study how cavalry was used in one ancient battle. Focus on flanking, scouting, pursuit, shock attack, horse archery, or protecting the wings of the army.',
  },
  {
    id: 'investigate-betrayal-intelligence',
    title: 'Investigate Betrayal or Intelligence',
    sphere: 'Espionage & Information',
    minutes: 13,
    description:
      'Find a battle where information, betrayal, scouts, spies, or local guides changed the result. Explain how knowledge of the enemy or terrain became a weapon.',
  },
  {
    id: 'build-battle-summary-card',
    title: 'Build a Battle Summary Card',
    sphere: 'Historical Synthesis',
    minutes: 18,
    description:
      'Choose any ancient battle and create a complete summary card with year, location, commanders, forces, outcome, key tactic, turning point, and three important facts.',
  },
];

export const STUDY_TASK_BY_ID = Object.fromEntries(
  STUDY_TASKS.map(task => [task.id, task]),
) as Record<string, StudyTask>;
