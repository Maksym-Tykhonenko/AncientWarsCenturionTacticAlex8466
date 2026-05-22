export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question:
      'Which formation was the cornerstone of Greek infantry warfare for centuries?',
    options: [
      {id: 'a', label: 'Testudo Formation'},
      {id: 'b', label: 'Phalanx Formation'},
      {id: 'c', label: 'Oblique Order'},
      {id: 'd', label: 'Manipular Formation'},
    ],
    correctOptionId: 'b',
    explanation:
      'The Phalanx — a dense wall of overlapping shields and extending spears — defined Greek warfare from 700 to 300 BC.',
  },
  {
    id: 'q2',
    question: 'Which battle is the classic example of double envelopment?',
    options: [
      {id: 'a', label: 'Battle of Marathon'},
      {id: 'b', label: 'Battle of Cannae'},
      {id: 'c', label: 'Battle of Salamis'},
      {id: 'd', label: 'Battle of Actium'},
    ],
    correctOptionId: 'b',
    explanation:
      'At Cannae (216 BC), Hannibal drew the Roman center forward while his wings closed around the army in one of history’s most studied encirclements.',
  },
  {
    id: 'q3',
    question:
      'What Roman formation used overlapping shields to protect against missiles during sieges?',
    options: [
      {id: 'a', label: 'Phalanx'},
      {id: 'b', label: 'Testudo'},
      {id: 'c', label: 'Wedge Cavalry'},
      {id: 'd', label: 'Oblique Order'},
    ],
    correctOptionId: 'b',
    explanation:
      'The Testudo locked shields on all sides into a protective shell, especially useful against arrows and stones.',
  },
  {
    id: 'q4',
    question:
      'The Parthian Shot is best described as which type of tactic?',
    options: [
      {id: 'a', label: 'Infantry shield wall advance'},
      {id: 'b', label: 'Retreating while shooting backward on horseback'},
      {id: 'c', label: 'Naval ramming in tight formation'},
      {id: 'd', label: 'Elephant frontal charge'},
    ],
    correctOptionId: 'b',
    explanation:
      'Parthian horsemen retreated while turning to fire at pursuers, staying dangerous even while withdrawing.',
  },
  {
    id: 'q5',
    question:
      'Which tactic did Epaminondas use at Leuctra to break Spartan dominance?',
    options: [
      {id: 'a', label: 'Feigned Retreat'},
      {id: 'b', label: 'Oblique Order'},
      {id: 'c', label: 'Circumvallation'},
      {id: 'd', label: 'Fire Ship Attack'},
    ],
    correctOptionId: 'b',
    explanation:
      'The Oblique Order strengthened one wing to deliver a concentrated breakthrough instead of fighting evenly across the line.',
  },
  {
    id: 'q6',
    question:
      'Opening lanes in the line to let elephants pass through is known as:',
    options: [
      {id: 'a', label: 'Skirmisher Screen'},
      {id: 'b', label: 'Elephant Counter-Lanes'},
      {id: 'c', label: 'Refused Flank'},
      {id: 'd', label: 'Diekplous Maneuver'},
    ],
    correctOptionId: 'b',
    explanation:
      'At Zama and elsewhere, infantry opened passages so elephants could pass without crushing the main line.',
  },
  {
    id: 'q7',
    question:
      'A smaller force holding Thermopylae used which defensive concept?',
    options: [
      {id: 'a', label: 'Narrow Pass Defense'},
      {id: 'b', label: 'Supply Line Strangling'},
      {id: 'c', label: 'Banner Signal Coordination'},
      {id: 'd', label: 'Decoy Camp'},
    ],
    correctOptionId: 'a',
    explanation:
      'Narrow pass defense limits how many enemies can fight at once, reducing numerical advantage.',
  },
  {
    id: 'q8',
    question:
      'Roman maniples replaced the rigid phalanx chiefly to gain what advantage?',
    options: [
      {id: 'a', label: 'More war elephants'},
      {id: 'b', label: 'Greater flexibility on broken ground'},
      {id: 'c', label: 'Longer spears only'},
      {id: 'd', label: 'Larger chariot charges'},
    ],
    correctOptionId: 'b',
    explanation:
      'Manipular organization let Roman units maneuver, reinforce weak points, and fight on uneven terrain more effectively.',
  },
  {
    id: 'q9',
    question:
      'The Greek naval tactic of sailing through gaps in the enemy line is called:',
    options: [
      {id: 'a', label: 'Periplous'},
      {id: 'b', label: 'Diekplous'},
      {id: 'c', label: 'Circumvallation'},
      {id: 'd', label: 'Crossfire Trap'},
    ],
    correctOptionId: 'b',
    explanation:
      'Diekplous involved passing through gaps in the enemy line, then turning to attack vulnerable sides or sterns.',
  },
  {
    id: 'q10',
    question:
      'Pretending to flee to lure enemies out of formation is known as:',
    options: [
      {id: 'a', label: 'Controlled Retreat'},
      {id: 'b', label: 'Feigned Retreat'},
      {id: 'c', label: 'Reserve Line Commitment'},
      {id: 'd', label: 'Refused Flank'},
    ],
    correctOptionId: 'b',
    explanation:
      'Feigned retreat tricks opponents into breaking discipline; the “fleeing” force then turns or leads pursuers into ambush.',
  },
];

export const QUIZ_TOTAL = QUIZ_QUESTIONS.length;
export const POINTS_PER_QUESTION = 10;
