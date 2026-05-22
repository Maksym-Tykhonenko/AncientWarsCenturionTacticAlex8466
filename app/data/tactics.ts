export type Tactic = {
  id: string;
  emoji: string;
  title: string;
  period: string;
  description: string;
  examples: string[];
};

export const TACTICS: Tactic[] = [
  {
    id: 'phalanx',
    emoji: '🛡️',
    title: 'Phalanx Formation',
    period: '700–300 BC',
    description:
      'A dense rectangular formation of infantry bearing shields and spears, standing shield-to-shield in tight ranks. The overlapping shields created a strong defensive wall, while long spears projected forward to stop enemy advances. The phalanx became one of the most recognizable formations of Greek and Macedonian warfare, relying on discipline, unity, and steady pressure.',
    examples: [
      'Battle of Marathon (490 BC)',
      'Battle of Plataea (479 BC)',
      'Battle of Leuctra (371 BC)',
    ],
  },
  {
    id: 'doubleenvelopment',
    emoji: '⚔️',
    title: 'Double Envelopment',
    period: '216 BC',
    description:
      'A powerful encirclement tactic where an enemy force is drawn into the center while both flanks close around it. The goal is to trap the opponent from multiple sides, cutting off escape and causing panic inside the formation. This tactic requires careful timing, controlled retreat, strong flank units, and excellent command discipline.',
    examples: [
      'Battle of Cannae (216 BC)',
      'Battle of Ilipa (206 BC)',
      'Later studied as one of the finest examples of battlefield encirclement',
    ],
  },
  {
    id: 'cavalryflankingstrike',
    emoji: '🏇',
    title: 'Cavalry Flanking Strike',
    period: '400–100 BC',
    description:
      'A fast attack using mounted troops to strike the enemy from the side or rear instead of directly from the front. Cavalry could disrupt formations, chase weakened enemies, protect infantry wings, or deliver a decisive blow once the enemy line became unstable. This tactic was especially effective when combined with strong infantry pressure.',
    examples: [
      'Battle of Gaugamela (331 BC)',
      'Battle of Issus (333 BC)',
      'Battle of Zama (202 BC)',
    ],
  },
  {
    id: 'feignedretreat',
    emoji: '🏹',
    title: 'Feigned Retreat',
    period: '600–100 BC',
    description:
      'A deceptive tactic where soldiers or cavalry pretend to flee in order to lure the enemy out of position. Once the enemy breaks formation and gives chase, the retreating force suddenly turns back or leads the pursuers into an ambush. This tactic worked best against impatient opponents who abandoned discipline too quickly.',
    examples: [
      'Scythian and steppe warfare',
      'Parthian cavalry tactics',
      'Used in different forms by Carthaginian and eastern armies',
    ],
  },
  {
    id: 'parthianshot',
    emoji: '🐎',
    title: 'Parthian Shot',
    period: '200–50 BC',
    description:
      'A mounted archery tactic where horsemen retreat while turning backward to shoot at pursuing enemies. This allowed cavalry to remain dangerous even while withdrawing, forcing opponents to chase under constant missile fire. It was a highly mobile tactic that demanded excellent riding skill, timing, and archery control.',
    examples: [
      'Parthian cavalry warfare',
      'Battle of Carrhae (53 BC)',
      'Eastern steppe-style mounted combat',
    ],
  },
  {
    id: 'warelephantshockattack',
    emoji: '🐘',
    title: 'War Elephant Shock Attack',
    period: '300–100 BC',
    description:
      'A battlefield tactic using elephants to break enemy formations, frighten horses, and create chaos in infantry lines. Elephants were often placed at the front of an army or used to disrupt enemy wings. Their size and force made them terrifying, but if panicked or poorly controlled, they could also damage their own side.',
    examples: [
      'Battle of Hydaspes (326 BC)',
      'Battle of Zama (202 BC)',
      'Hellenistic and Carthaginian warfare',
    ],
  },
  {
    id: 'manipularflexibility',
    emoji: '🏛️',
    title: 'Manipular Flexibility',
    period: '300–100 BC',
    description:
      'A Roman tactical system that divided infantry into smaller units called maniples instead of relying on one continuous line. This allowed Roman soldiers to move, rotate, reinforce weak points, and fight effectively on uneven ground. The system gave Roman armies more flexibility than rigid formations such as the traditional phalanx.',
    examples: [
      'Battle of Cynoscephalae (197 BC)',
      'Battle of Pydna (168 BC)',
      'Roman wars against Hellenistic kingdoms',
    ],
  },
  {
    id: 'shieldwall',
    emoji: '🧱',
    title: 'Shield Wall',
    period: '700–100 BC',
    description:
      'A defensive infantry formation where soldiers stood close together with shields locked or overlapping. The shield wall protected the front line from arrows, spears, and direct charges. It was useful for holding narrow ground, resisting pressure, and maintaining morale during prolonged combat.',
    examples: [
      'Greek hoplite warfare',
      'Roman defensive formations',
      'Narrow pass battles such as Thermopylae (480 BC)',
    ],
  },
  {
    id: 'ambushfromterrain',
    emoji: '🔥',
    title: 'Ambush from Terrain',
    period: '500–100 BC',
    description:
      'A tactic based on hiding troops in forests, hills, narrow roads, or passes before attacking an enemy unexpectedly. Ambushes worked especially well when the target was marching in a long column and could not quickly form a battle line. Terrain knowledge, patience, and timing were more important than army size.',
    examples: [
      'Battle of Lake Trasimene (217 BC)',
      'Battle of Beth Horon (166 BC)',
      'Mountain and pass warfare in ancient campaigns',
    ],
  },
  {
    id: 'missileharassment',
    emoji: '🏹',
    title: 'Missile Harassment',
    period: '600–50 BC',
    description:
      'A tactic where archers, slingers, javelin throwers, or horse archers attacked from a distance to weaken the enemy before close combat. Instead of seeking an immediate decisive clash, light troops wore down formations, disrupted movement, and forced enemies to react under constant pressure.',
    examples: [
      'Persian archers during the Greco-Persian Wars',
      'Balearic slingers in Carthaginian armies',
      'Parthian horse archers at Carrhae (53 BC)',
    ],
  },
  {
    id: 'obliqueorder',
    emoji: '🗡️',
    title: 'Oblique Order',
    period: '400–300 BC',
    description:
      'A tactic where one wing of the army was strengthened and advanced more aggressively than the rest of the line. Instead of fighting evenly across the battlefield, the commander concentrated power at one point to break through the enemy formation. This approach required coordination and confidence because part of the army might deliberately hold back.',
    examples: [
      'Battle of Leuctra (371 BC)',
      'Battle of Mantinea (362 BC)',
      'Theban tactical innovations under Epaminondas',
    ],
  },
  {
    id: 'siegeencirclement',
    emoji: '🏰',
    title: 'Siege Encirclement',
    period: '600–100 BC',
    description:
      'A tactic used to surround a city, fortress, or fortified camp and cut off supplies, reinforcements, and escape routes. Ancient sieges often included walls, trenches, towers, battering rams, and psychological pressure. Victory could come through assault, starvation, betrayal, or negotiated surrender.',
    examples: [
      'Siege of Tyre (332 BC)',
      'Siege of Syracuse (214–212 BC)',
      'Roman siege warfare during the Punic and Hellenistic wars',
    ],
  },
  {
    id: 'testudoformation',
    emoji: '🐢',
    title: 'Testudo Formation',
    period: '100–30 BC',
    description:
      'A Roman defensive formation where soldiers locked their shields in front, above, and along the sides to form a protective shell. It was especially useful against arrows, stones, and missiles during sieges or advances toward fortified positions. The formation required strong discipline because each soldier depended on the others for protection.',
    examples: [
      'Roman siege operations',
      'Late Republican Roman campaigns',
      'Used during assaults on walls and fortified positions',
    ],
  },
  {
    id: 'scythedchariotcharge',
    emoji: '🏴',
    title: 'Scythed Chariot Charge',
    period: '500–300 BC',
    description:
      'A shock tactic using chariots equipped with blades attached to their wheels or axles. These vehicles were intended to tear through infantry formations and create fear before the main army attacked. However, they required flat ground and could fail badly against disciplined troops who opened lanes or attacked the horses.',
    examples: [
      'Persian armies at Gaugamela (331 BC)',
      'Hellenistic battlefield experiments',
      'Battles involving eastern imperial armies',
    ],
  },
  {
    id: 'controlledretreat',
    emoji: '🧭',
    title: 'Controlled Retreat',
    period: '500–200 BC',
    description:
      'A disciplined withdrawal used not as panic, but as a planned maneuver. Soldiers slowly gave ground while keeping formation, drawing the enemy into a worse position or buying time for another part of the army to act. This tactic was dangerous because a controlled retreat could easily turn into a real collapse if morale failed.',
    examples: [
      'Battle of Cannae (216 BC)',
      'Hannibal’s central line against Rome',
      'Various Greek and Hellenistic battlefield maneuvers',
    ],
  },
  {
    id: 'skirmisherscreen',
    emoji: '🏹',
    title: 'Skirmisher Screen',
    period: '700–100 BC',
    description:
      'A line of light troops placed ahead of the main army to harass enemies, scout movement, and disrupt formations before the main clash. Skirmishers usually carried javelins, bows, or slings and avoided direct combat with heavy infantry. Their role was to weaken, confuse, and delay the enemy.',
    examples: [
      'Greek peltasts in classical warfare',
      'Roman velites during the Republic',
      'Light infantry support in Hellenistic armies',
    ],
  },
  {
    id: 'decisivecenterbreakthrough',
    emoji: '🦅',
    title: 'Decisive Center Breakthrough',
    period: '400–100 BC',
    description:
      'A tactic focused on breaking the enemy’s central command position or main line. If the center collapsed, the rest of the army could lose coordination and morale. Commanders often used elite cavalry, heavy infantry, or a sudden concentrated attack to strike directly at the enemy’s leadership.',
    examples: [
      'Battle of Gaugamela (331 BC)',
      'Battle of Issus (333 BC)',
      'Macedonian cavalry charges led by Alexander',
    ],
  },
  {
    id: 'narrowpassdefense',
    emoji: '⛰️',
    title: 'Narrow Pass Defense',
    period: '700–100 BC',
    description:
      'A defensive tactic where a smaller army used a narrow pass, valley, bridge, or coastal road to reduce the advantage of a larger enemy. The limited space prevented the larger force from surrounding the defenders or using all its troops at once. This tactic relied on endurance, terrain control, and strong morale.',
    examples: [
      'Battle of Thermopylae (480 BC)',
      'Mountain warfare in Greece and Judea',
      'Defensive actions in narrow roads and coastal passes',
    ],
  },
  {
    id: 'refusedflank',
    emoji: '🛡️',
    title: 'Refused Flank',
    period: '500–100 BC',
    description:
      'A defensive tactic where one side of the army deliberately held back instead of advancing evenly with the rest of the line. This protected a vulnerable flank from being surrounded while allowing the stronger side to push forward. Commanders used the refused flank when they feared enemy cavalry, wanted to delay part of the battle, or planned to concentrate force on only one section of the field.',
    examples: [
      'Greek hoplite battlefield adjustments',
      'Macedonian tactical formations',
      'Roman defensive maneuvers against cavalry-heavy armies',
    ],
  },
  {
    id: 'companioncavalrywedge',
    emoji: '🏇',
    title: 'Companion Cavalry Wedge',
    period: '350–300 BC',
    description:
      'A cavalry attack formation often associated with Macedonian warfare, especially Alexander’s elite Companion Cavalry. Riders formed a wedge or triangular shape, allowing the point of the formation to strike first and break into gaps in the enemy line. This tactic worked best when infantry pinned the enemy in place while cavalry searched for the decisive opening.',
    examples: [
      'Battle of Issus (333 BC)',
      'Battle of Gaugamela (331 BC)',
      'Macedonian campaigns under Alexander the Great',
    ],
  },
  {
    id: 'peltastharassment',
    emoji: '🏹',
    title: 'Peltast Harassment',
    period: '500–300 BC',
    description:
      'A light infantry tactic using mobile javelin throwers to weaken heavier troops before close combat. Peltasts could move faster than hoplites, attack from a distance, and withdraw before being caught. They were especially useful against slow formations, rough terrain, and enemies that depended too much on heavy infantry discipline.',
    examples: [
      'Greek warfare during the Classical period',
      'Iphicrates’ reforms in Athenian military practice',
      'Battles involving Thracian and Greek light infantry',
    ],
  },
  {
    id: 'siegetoweradvance',
    emoji: '🏰',
    title: 'Siege Tower Advance',
    period: '600–100 BC',
    description:
      'A siege tactic where large wooden towers were moved toward city walls to give attackers height equal to or greater than the defenders. Soldiers inside the tower could shoot from protected levels or cross onto the wall from an upper platform. This tactic required engineering skill, protection from fire, and enough time to move heavy equipment close to the target.',
    examples: [
      'Siege of Tyre (332 BC)',
      'Hellenistic siege warfare',
      'Roman and Near Eastern siege operations',
    ],
  },
  {
    id: 'fireshipattack',
    emoji: '🔥',
    title: 'Fire Ship Attack',
    period: '500–30 BC',
    description:
      'A naval tactic where ships or small vessels were set on fire and directed toward enemy fleets, harbors, or anchored ships. The goal was to spread panic, force movement, damage vessels, and break defensive formations. Fire ship attacks were especially dangerous in crowded waters where enemy ships had little space to escape.',
    examples: [
      'Ancient naval warfare in the Mediterranean',
      'Harbor attacks during sieges',
      'Hellenistic and Roman naval operations',
    ],
  },
  {
    id: 'navalrammingline',
    emoji: '⚓',
    title: 'Naval Ramming Line',
    period: '600–100 BC',
    description:
      'A naval tactic based on using the bronze ram at the front of a warship to strike enemy vessels. Triremes and other ancient ships attempted to hit the side or stern of enemy ships, damaging the hull and disabling them. Success depended on speed, crew training, rowing discipline, and the ability to maneuver in tight formations.',
    examples: [
      'Battle of Salamis (480 BC)',
      'Battle of Artemisium (480 BC)',
      'Classical Greek naval warfare',
    ],
  },
  {
    id: 'diekplousmaneuver',
    emoji: '🌊',
    title: 'Diekplous Maneuver',
    period: '600–300 BC',
    description:
      'A Greek naval tactic where ships tried to sail through gaps in the enemy line, then turn quickly to attack from the side or rear. It required excellent rowing, timing, and open water. The maneuver was difficult to perform against a disciplined opponent, but when successful, it could break a fleet’s formation and create chaos.',
    examples: [
      'Classical Greek trireme warfare',
      'Athenian naval tactics',
      'Naval battles during the Peloponnesian War',
    ],
  },
  {
    id: 'periplousmaneuver',
    emoji: '🌀',
    title: 'Periplous Maneuver',
    period: '600–300 BC',
    description:
      'A naval tactic where ships attempted to sail around the enemy flank instead of breaking directly through the line. Once around the side, the attacking fleet could strike vulnerable ships from behind or force the enemy formation to turn awkwardly. This maneuver favored fast, well-trained crews and commanders who could read movement across the water.',
    examples: [
      'Athenian naval operations',
      'Peloponnesian War sea battles',
      'Greek fleet tactics in open waters',
    ],
  },
  {
    id: 'cavalryscreen',
    emoji: '🐎',
    title: 'Cavalry Screen',
    period: '400–100 BC',
    description:
      'A protective cavalry tactic where mounted units operated in front of or beside the main army to watch enemy movement, delay attacks, and prevent surprise. Cavalry screens could hide the army’s real formation, block enemy scouts, and give commanders more time to prepare. They were not always meant to win the battle directly, but they helped control information and battlefield space.',
    examples: [
      'Macedonian campaign movements',
      'Hellenistic armies with mixed cavalry forces',
      'Roman and Numidian cavalry operations',
    ],
  },
  {
    id: 'bannersignalcoordination',
    emoji: '🏴',
    title: 'Banner Signal Coordination',
    period: '700–100 BC',
    description:
      'A command tactic using banners, standards, horns, or visible symbols to coordinate movement across the battlefield. Ancient armies could be noisy, crowded, and chaotic, so signals helped units know when to advance, hold, retreat, or change formation. This tactic was especially important for large armies where voice commands could not reach distant troops.',
    examples: [
      'Roman standards in legionary formations',
      'Persian imperial armies',
      'Hellenistic battlefield command systems',
    ],
  },
  {
    id: 'campfortification',
    emoji: '🧱',
    title: 'Camp Fortification',
    period: '400–30 BC',
    description:
      'A defensive tactic where an army built a fortified camp with ditches, walls, stakes, or guarded entrances. A strong camp protected supplies, gave soldiers a secure place to regroup, and made surprise attacks more difficult. Roman armies became especially famous for building structured camps during campaigns, turning temporary positions into organized defensive bases.',
    examples: [
      'Roman Republican campaigns',
      'Siege and field operations in Gaul and Greece',
      'Marching camp systems used by Roman legions',
    ],
  },
  {
    id: 'crossfiretrap',
    emoji: '🏹',
    title: 'Crossfire Trap',
    period: '500–100 BC',
    description:
      'A tactic where missile troops attacked from two or more directions, forcing the enemy into a dangerous zone with limited protection. Archers, slingers, or javelin throwers could create overlapping fire from hills, walls, flanks, or hidden positions. This tactic worked best when the enemy was trapped in narrow ground or distracted by a frontal force.',
    examples: [
      'Mountain pass warfare',
      'Ambushes in Judea and Anatolia',
      'Defensive actions near fortified positions',
    ],
  },
  {
    id: 'reservelinecommitment',
    emoji: '🗡️',
    title: 'Reserve Line Commitment',
    period: '500–100 BC',
    description:
      'A tactic where commanders kept part of the army behind the main line and sent it forward only at a critical moment. Reserves could stop a breakthrough, reinforce a weak point, or deliver the final push against a tired enemy. This required patience because using reserves too early could leave the army with no answer to later danger.',
    examples: [
      'Roman manipular battle system',
      'Hellenistic armies with layered formations',
      'Battles where fresh troops decided the final phase',
    ],
  },
  {
    id: 'elephantcounterlanes',
    emoji: '🐘',
    title: 'Elephant Counter-Lanes',
    period: '300–100 BC',
    description:
      'A defensive tactic designed to reduce the impact of war elephants. Infantry opened lanes in their formation, allowing elephants to pass through without crushing the main line. Soldiers then attacked the animals from the sides or rear, while noise, missiles, and controlled spacing helped break the elephant charge.',
    examples: [
      'Battle of Zama (202 BC)',
      'Roman tactics against Carthaginian elephants',
      'Hellenistic battles involving elephant corps',
    ],
  },
  {
    id: 'slingerssuppression',
    emoji: '🏹',
    title: "Slingers' Suppression",
    period: '600–100 BC',
    description:
      'A missile tactic using slingers to attack enemy troops from a distance with stones or lead bullets. Slingers could fire farther than many javelin troops and were useful for disrupting formations before the main battle. Skilled slingers were dangerous against lightly armored enemies and could pressure even disciplined infantry if protected properly.',
    examples: [
      'Balearic slingers in Carthaginian armies',
      'Greek and Near Eastern light troop warfare',
      'Roman auxiliary missile support',
    ],
  },
  {
    id: 'supplylinestrangling',
    emoji: '⛓️',
    title: 'Supply Line Strangling',
    period: '600–30 BC',
    description:
      'A strategic tactic focused on cutting food, water, reinforcements, or communication instead of seeking immediate battle. Armies that lost supply access could weaken quickly, even without a major defeat. This tactic was especially important during sieges, long campaigns, and wars between empires spread across large territories.',
    examples: [
      'Peloponnesian War campaigns',
      'Roman siege operations',
      'Hellenistic wars across Asia Minor and the Levant',
    ],
  },
  {
    id: 'decoycamp',
    emoji: '🏛️',
    title: 'Decoy Camp',
    period: '500–100 BC',
    description:
      'A deception tactic where an army created signs of weakness, false movement, or an apparently vulnerable camp to draw the enemy into a trap. The enemy might attack too quickly, abandon formation, or move into unfavorable terrain. Decoy camps required careful planning because the illusion had to look believable enough to provoke action.',
    examples: [
      'Ancient ambush warfare',
      'Carthaginian and Hellenistic deception tactics',
      'Campaigns involving false retreats and hidden reserves',
    ],
  },
  {
    id: 'shockinfantrycharge',
    emoji: '⚔️',
    title: 'Shock Infantry Charge',
    period: '700–100 BC',
    description:
      'A direct assault tactic where heavily armed infantry advanced quickly to break enemy morale and formation before prolonged fighting began. The goal was not just physical impact, but psychological pressure. A disciplined charge could frighten weaker troops, reduce the time under missile fire, and force a rapid decision in close combat.',
    examples: [
      'Greek hoplite charges',
      'Battle of Marathon (490 BC)',
      'Macedonian and Roman infantry assaults',
    ],
  },
];

export const TACTIC_BY_ID: Record<string, Tactic> = Object.fromEntries(
  TACTICS.map(t => [t.id, t]),
) as Record<string, Tactic>;
