import {BATTLE_IMAGES} from '../assets/battleImages';
import {
  type BattleCardTheme,
  battleCardThemes,
} from '../theme/battleTheme';

export type Battle = {
  id: string;
  title: string;
  year: string;
  location: string;
  coordinates: {lat: number; lng: number};
  description: string;
  commanders: {sideI: string; sideII: string};
  forces: {sideI: string; sideII: string};
  outcome: string;
  keyFacts: string[];
  theme: 'blue' | 'green' | 'brown' | 'red';
  image?: number;
};

/** Cycles `battleCardThemes`: blue → green → brown → red by index */
function battleThemeAt(index: number): BattleCardTheme {
  const len = battleCardThemes.length;
  return battleCardThemes[((index % len) + len) % len]!;
}

/** Battle entries before `theme` is applied from list order */
const BATTLES_WITHOUT_THEME: Array<Omit<Battle, 'theme'>> = [
  {
    id: 'marathon',
    title: 'Battle of Marathon',
    year: '490 BC',
    location: 'Marathon, Greece',
    coordinates: {lat: 38.1167, lng: 23.9667},
    description:
      'The first Persian invasion of Greece culminated when Darius I sent an expedition across the Aegean. After the fall of Eretria, Persian forces landed on the Marathon plain northeast of Athens. Athenian hoplites, reinforced by Plataean allies under Miltiades, launched an unexpectedly rapid charge against the Persian line, broke their formation, then wheeled against the Persian wings. Heavy Persian losses and the failure of a secondary thrust toward Athens persuaded the invaders to withdraw by sea.',
    commanders: {
      sideI: 'Miltiades, Callimachus, Aristides (Athens & Plataea)',
      sideII: 'Datis, Artaphernes (Persian Empire)',
    },
    forces: {
      sideI: 'Roughly 9,000–10,000 Athenian hoplites plus about 1,000 Plataeans',
      sideII: 'Ancient sources exaggerate; modern estimates often place Persian strength in the low tens of thousands including fleet crews and cavalry',
    },
    outcome: 'Decisive Greek victory; Persian expedition withdrew from Attica.',
    keyFacts: [
      'Pheidippides—or a runner on a comparable mission—is linked in tradition to alerting Athens before the battle.',
      'The Athenian center thinned deliberately to anchor the Persian center while wings crushed the enemy flanks.',
      'Herodotus recounts extraordinarily lopsided Greek casualties versus Persian losses, though ratios are debated.',
      'Victory safeguarded mainland Greece from occupation and became a cornerstone of democratic Athens’ martial myth.',
    ],
  },
  {
    id: 'gaugamela',
    title: 'Battle of Gaugamela',
    year: '331 BC',
    location: 'Near modern Mosul, Iraq',
    coordinates: {lat: 36.3667, lng: 43.25},
    description:
      'Alexander III of Macedon faced Darius III on a plain chosen by the Persians to maximize chariots and cavalry depth. Macedonian infantry held the center while Companion cavalry slammed the Persian left; Alexander angled his attack toward Darius’ position, disrupting royal command cohesion. Persian scythed-chariots were largely absorbed or broken. Darius fled the field again, Persian resistance collapsed toward Babylon and beyond, and the heart of the Achaemenid Empire fell open.',
    commanders: {
      sideI: 'Alexander III, Parmenion, Hephaestion (Macedonian coalition)',
      sideII: 'Darius III with Mazaeus and other satrap commanders',
    },
    forces: {
      sideI:
        'Tens of thousands of Macedonian phalangites, allied Greek infantry, Thessalian horse, Companion cavalry, and Asian auxiliaries',
      sideII:
        'Huge polyglot army spanning imperial levies; ancient figures are inflated, but Persian numbers still likely exceeded the Macedonians',
    },
    outcome: 'Overwhelming Macedonian victory; effective end of Achaemenid field resistance west of the Iranian plateau.',
    keyFacts: [
      'The flat terrain was meant to favor Persian numbers and chariot charges.',
      'Parmenion’s wing was ordered to hold under pressure while Alexander sought a breakthrough on the flank.',
      'Darius’ flight cost him prestige and eventually his life at the hands of Bessus.',
      'The battle is often paired with Issus as the twin pillars of Alexander’s destruction of imperial Persia.',
    ],
  },
  {
    id: 'cannae',
    title: 'Battle of Cannae',
    year: '216 BC',
    location: 'Cannae, Southern Italy',
    coordinates: {lat: 41.3, lng: 16.15},
    description:
      'During the Second Punic War, Hannibal Barca positioned his outnumbered army along the Aufidus (Ofanto) River. Roman consuls Varro and Paullus massed an enormous legionary host in a deep center. Hannibal’s Spanish and African infantry formed a bowed line that gradually yielded, drawing Romans inward; Libyan veterans on the flanks wheeled inward while Numidian and Celtic horse cleared the Roman cavalry and closed a ring. The legions were encircled and annihilated in one of antiquity’s most studied double envelopments.',
    commanders: {
      sideI: 'Hannibal Barca, Hasdrubal (cavalry), Mago (Carthage & allies)',
      sideII: 'Lucius Aemilius Paullus, Gaius Terentius Varro (Roman Republic)',
    },
    forces: {
      sideI:
        'Roughly 40,000 infantry and 10,000 cavalry—veterans of Trebia and Trasimene bolstered by Italic allies',
      sideII:
        'Perhaps 86,000 men or more—the largest army Rome had assembled to that date, though figures vary',
    },
    outcome: 'Catastrophic Roman defeat with enormous casualties and capture; Carthage’s zenith in Italy.',
    keyFacts: [
      'Polybius and Livy provide the backbone of modern reconstructions.',
      'The famed “Cannae maneuver” appears in textbooks on envelopment tactics.',
      'Rome refused to surrender and rebuilt armies through severe levies.',
      'The battle’s morale shock contributed to defections among southern Italian communities.',
    ],
  },
  {
    id: 'zama',
    title: 'Battle of Zama',
    year: '202 BC',
    location: 'Near Zama, North Africa',
    coordinates: {lat: 36.1, lng: 9.3},
    description:
      'Scipio Africanus invaded Africa and maneuvered Hannibal—recalled from Italy—into open battle inland from Carthage. Both sides relied on infantry lines and allied Numidian horse: Massinissa aided Rome while Carthage fielded disparate mercenaries. Scipio’s drilled maniples disrupted elephant charges and Hannibal’s third line of veterans fought stubbornly until Roman-Numidian cavalry returned from pursuit and collapsed the Carthaginian rear. Carthage sued for peace on harsh terms ending the Second Punic War.',
    commanders: {
      sideI: 'Publius Cornelius Scipio Africanus, Massinissa',
      sideII: 'Hannibal Barca (Carthage)',
    },
    forces: {
      sideI:
        'Roman manipular legions plus substantial Numidian cavalry under Massinissa',
      sideII:
        'Mixed Carthaginian levy, elephants, veterans of Italy campaign, allied foot and horse',
    },
    outcome: 'Roman victory; Carthage stripped of empire and humbled as a tributary ally.',
    keyFacts: [
      'Elephants disrupted Carthage’s own lines before fully engaging Romans.',
      'The battle reversed the tactical genius narrative: Hannibal met a Roman who matched him in combined arms.',
      'Peace terms forbade independent war-making and capped Carthage’s navy.',
      'Zama crowned Scipio’s political rivalry with Fabian caution in Roman memory.',
    ],
  },
  {
    id: 'salamis',
    title: 'Battle of Salamis',
    year: '480 BC',
    location: 'Straits near Salamis, Greece',
    coordinates: {lat: 37.95, lng: 23.5333},
    description:
      'After Thermopylae and the evacuation of Athens, the Greek allied fleet—commanded strategically by Themistocles—lured Xerxes’ armada into the narrow waters between Salamis and the Attic coast. Triremes rammed and boarded in confused melees where Persian numbers could not deploy. Salamis shattered Persian naval supremacy in the theater, protected the Peloponnese, and forced Xerxes to retire much of his force while leaving Mardonius with a land army in Greece.',
    commanders: {
      sideI:
        'Themistocles, Eurybiades (Spartan nominal command), Corinthian and Aeginetan squadrons',
      sideII: 'Xerxes I with admirals including Ariabignes and others',
    },
    forces: {
      sideI:
        'Hundreds of Greek triremes drawn chiefly from Athens, Corinth, Aegina, and other league cities',
      sideII:
        'Large imperial fleet of Phoenician, Ionian, and subject squadrons—Herodotus’ totals are controversial',
    },
    outcome: 'Decisive Greek naval victory; Persian invasion strategy broken at sea.',
    keyFacts: [
      'Themistocles reportedly used a ruse to precipitate battle before the allies retreated.',
      'Aeschylus fought at Salamis and dramatized it in *The Persians*.',
      'The battle determined that Athens would rise as a thalassocracy.',
      'Xerxes watched from shore according to tradition, magnifying the psychological blow.',
    ],
  },
  {
    id: 'plataea',
    title: 'Battle of Plataea',
    year: '479 BC',
    location: 'Plataea, Boeotia, Greece',
    coordinates: {lat: 38.2167, lng: 23.2667},
    description:
      'Following naval operations, a massive allied Greek infantry force under Spartan Pausanias confronted Persian general Mardonius in Boeotia. Skirmishing, supply strain, and nocturnal confusion strained both camps before a general engagement on the foothills near Plataea. Spartan and Tegean troops bore the main weight against Persian elite infantry while Athenians and others engaged allied contingents; Mardonius fell and Persian field power in Greece shattered. The victory completed the liberation of mainland Greece begun at Salamis.',
    commanders: {
      sideI:
        'Pausanias regent for Sparta, Aristides commanding Athenians, contingents across the Hellenic league',
      sideII: 'Mardonius commanding imperial army with Theban collaborators',
    },
    forces: {
      sideI: 'Heavy hoplite phalanx from Peloponnese, Athens, and allies—tens of thousands',
      sideII:
        'Persian Immortals and Asian infantry, Thessalian cavalry auxiliaries, Greek medizers',
    },
    outcome:
      'Persian land army routed; Greek independence secured until later imperial conflicts.',
    keyFacts: [
      'Rough terrain and logistical friction shaped days of tentative maneuver.',
      'Mardonius’ death demoralized Asiatic units loyal to Persian gold.',
      'Dedicated Greek resolve contrasted with medizing poleis ostracized after the war.',
      'Combined with Mycale, Plataea ended the major Persian attempt to conquer Greece.',
    ],
  },
  {
    id: 'issus',
    title: 'Battle of Issus',
    year: '333 BC',
    location: 'Near Issus, modern southern Turkey',
    coordinates: {lat: 36.85, lng: 36.1667},
    description:
      'Alexander marched south along the coast while Darius shifted east of the mountains; mistaken intelligence brought the armies face to face unexpectedly on the narrow coastal plain south of Issus. The confined front offset Persian numeric advantage. Alexander led a decisive charge on the Persian left while his phalanx held the center; Darius fled as his line crumbled, abandoning family and treasury to the Macedonians. Issus opened Syria, Phoenicia, and Egypt to conquest.',
    commanders: {
      sideI: 'Alexander III, Parmenion',
      sideII: 'Darius III Codomannus',
    },
    forces: {
      sideI:
        'Veteran Macedonian phalanx, Companion cavalry, allied horse and light troops',
      sideII:
        'Immense imperial host including Greek mercenaries under Memnon’s successors and satrapal levies',
    },
    outcome:
      'Macedonian victory; capture of the Persian royal household and immense prestige for Alexander.',
    keyFacts: [
      'The Alexander Mosaic from Pompeii dramatizes the chaotic climax.',
      'Geography compressed Persian numbers into a kill zone favoring Alexander’s shock tactics.',
      'Darius’ escape preserved a rump empire for Gaugamela later.',
      'Alexander’s clemency toward royal women became propaganda gold.',
    ],
  },
  {
    id: 'chaeronea',
    title: 'Battle of Chaeronea',
    year: '338 BC',
    location: 'Chaeronea, Greece',
    coordinates: {lat: 38.5, lng: 22.85},
    description:
      'Philip II of Macedon confronted a coalition of southern Greek states—chiefly Athens and Thebes—near the town of Chaeronea. The Macedonian phalanx with long sarissas pinned Greek heavy infantry while disciplined cavalry, including Alexander commanding the Companion wing at a remarkably young age, exploited gaps on the flank. The Sacred Band of Thebes was shattered; Athens’ line broke. Macedonian supremacy over the Greek peninsula was consolidated, paving the road to chairmanship via the League of Corinth.',
    commanders: {
      sideI: 'Philip II, Alexander (Macedonia & allies)',
      sideII: 'Athenians under Stratocles/Chares traditions; Thebans with Sacred Band officers',
    },
    forces: {
      sideI: 'Professionally drilled phalanx, heavy cavalry, light troops and allied contingents',
      sideII:
        'Alliance hoplite phalanxes from Athens and Thebes plus allied poleis—the last major united Greek infantry stand against Philip',
    },
    outcome: 'Decisive Macedonian victory leading to allied settlements and Macedonian leadership of Greeks.',
    keyFacts: [
      'The Lion of Chaeronea commemorates fallen Theban lovers-in-arms traditionally.',
      'Philip’s diplomacy after battle mixed threats with participation in Amphictionic politics.',
      'Alexander’s conspicuous role foreshadowed his future generalship.',
      'Demosthenic Athens faced humiliation alongside Theban eclipse.',
    ],
  },
  {
    id: 'hydaspes',
    title: 'Battle of Hydaspes',
    year: '326 BC',
    location: 'Hydaspes River, modern Jhelum, Pakistan',
    coordinates: {lat: 32.9333, lng: 73.7333},
    description:
      'Alexander crossed the monsoon-swollen Hydaspes (Jhelum) under cover of feints and night marches to surprise King Porus, whose war elephants dominated the Indian plain. Macedonian light troops harassed beasts while phalangites opened lanes; cavalry drove Porus’ horse from the field. Porus fought until wounded and captured, then won Alexander’s respect. The battle showcased combined-arms solutions to elephant warfare and marked the eastern limit of sustained Macedonian advance before mutiny at the Hyphasis (Beas).',
    commanders: {
      sideI: 'Alexander III, Craterus, Coenus, Hephaestion (elements)',
      sideII: 'Porus (Paurava kingdom)',
    },
    forces: {
      sideI:
        'Macedonian phalanx, Agrianian javelineers, horse archers, Companion cavalry',
      sideII:
        'Indian infantry and cavalry with a substantial corps of war elephants',
    },
    outcome:
      'Macedonian victory; Porus confirmed as client ruler; further eastward advance halted by army refusal.',
    keyFacts: [
      'Night operations and misleading campfires masked the main crossing.',
      'Elephants gored friend and foe once panicked.',
      'Alexander founded cities including Bucephala for his fallen horse.',
      'Monsoon mud and river volume nearly decided the campaign before contact.',
    ],
  },
  {
    id: 'aegospotami',
    title: 'Battle of Aegospotami',
    year: '405 BC',
    location: 'Hellespont near modern Turkey',
    coordinates: {lat: 40.4667, lng: 26.8333},
    description:
      'Near the end of the Peloponnesian War, Lysander’s Spartan fleet executed a patient blockade against Athenian squadrons beached at Aegospotami on the European shore. While Athenian crews scattered foraging, Spartan ships struck stranded triremes, capturing many hulls and men with minimal fighting. The loss of Athens’ last major fleet eliminated food imports and forced capitulation, dismantling the Delian League’s maritime empire and installing Spartan occupation with oligarchic interludes.',
    commanders: {
      sideI: 'Lysander (Sparta and Peloponnesian allies)',
      sideII: 'Conon and other Athenian generals with democratic fleet contingents',
    },
    forces: {
      sideI:
        'Experienced Peloponnesian and allied squadrons operating with Syracusan support traditions',
      sideII: 'Remaining Athenian trireme force committed to preventing Hellespont closure',
    },
    outcome:
      'Athenian naval force destroyed or captured; impending siege and surrender of Athens.',
    keyFacts: [
      'Alcibiades offered advice from exile but was ignored before the disaster.',
      'Geography trapped Athenians without secure logistics across the strait.',
      'Lysander’s fiscal and political acumen matched his seamanship.',
      'The Long Walls were eventually torn down per peace terms, then rebuilt later.',
    ],
  },
  {
    id: 'leuctra',
    title: 'Battle of Leuctra',
    year: '371 BC',
    location: 'Leuctra, Boeotia, Greece',
    coordinates: {lat: 38.25, lng: 23},
    description:
      'Epaminondas of Thebes broke centuries of orthodox hoplite deployment by massing depth on the left wing—refusing his weaker right—while the Sacred Band spearheaded the assault against the Spartan king’s position. Spartan moral supremacy cracked as Cleombrotus fell and the peer cavalry failed to stabilize the flank. Theban tactical innovation destroyed the myth of invincible Spartan phalanx discipline in open battle and elevated Thebes to brief hegemony over Greece.',
    commanders: {
      sideI: 'Epaminondas, Pelopidas (Theban confederation)',
      sideII: 'King Cleombrotus I (Sparta and allies)',
    },
    forces: {
      sideI:
        'Theban phalanx deepened on the left, Sacred Band, allied Boeotian contingents',
      sideII:
        'Spartan homoioi with perioikoi and allied Peloponnesian hoplites',
    },
    outcome:
      'Theban victory; heavy Spartan losses among full citizens; crisis of Spartan population base.',
    keyFacts: [
      'Oblique echelon deployment became a classic case study in combined-arms reform.',
      'Spartan kings rarely died in pitched battle; Cleombrotus’ death was symbolic.',
      'Xenophon and Diodorus preserve differing emphases on the action.',
      'Mantinea later tested whether Theban methods remained supreme.',
    ],
  },
  {
    id: 'actium',
    title: 'Battle of Actium',
    year: '31 BC',
    location: 'Near Actium, western Greece',
    coordinates: {lat: 38.9333, lng: 20.7333},
    description:
      'Octavian’s admiral Agrippa challenged Antony and Cleopatra’s combined Roman-Egyptian fleet in the Ambracian Gulf approaches. Skirmishing escalated into a general action where lighter Augustan ships outmaneuvered heavier Antonian vessels. Whether Cleopatra’s squadron broke away by plan or panic, their withdrawal drew Antony into a fighting retreat that became rout. Victory gave Octavian uncontested mastery of Roman seas and presaged the fall of Alexandria and the Ptolemaic dynasty.',
    commanders: {
      sideI: 'Gaius Octavian, Marcus Agrippa',
      sideII: 'Mark Antony, Cleopatra VII',
    },
    forces: {
      sideI:
        'Professional liburnian and trireme squadrons with veteran crews loyal to the Caesarian cause',
      sideII:
        'Large mixed fleet of Roman and Ptolemaic units, many heavy and undermanned by disease and desertion',
    },
    outcome:
      'Naval victory for Octavian; strategic collapse of the Antony-Cleopatra coalition.',
    keyFacts: [
      'Propaganda framed Actium as West versus decadent East.',
      'Agrippa’s blockade and base at Leucas shaped operational tempo.',
      'The battle’s anniversary became part of Augustan civic religion.',
      'Antony’s land army capitulated days later without decisive field combat.',
    ],
  },
  {
    id: 'carrhae',
    title: 'Battle of Carrhae',
    year: '53 BC',
    location: 'Near Carrhae, modern Harran, Turkey',
    coordinates: {lat: 36.8667, lng: 39.0333},
    description:
      'Marcus Licinius Crassus invaded Parthia seeking military glory to match Pompey and Caesar. Near Carrhae, Surena’s cataphracts and horse archers refused close combat with legionaries, circling and showering arrows. Roman troops exhausted missiles and cohesion; subcommander Publius Crassus’ forlorn cavalry charge was isolated and destroyed. Crassus died during parley or combat traditions—Parthian horse archery and mobility annihilated Roman prestige in the East and froze expansion for a generation.',
    commanders: {
      sideI: 'Marcus Licinius Crassus, Publius Licinius Crassus',
      sideII: 'Surena (Parthian spāhbad)',
    },
    forces: {
      sideI:
        'Seven legions and auxiliaries—heavy infantry light on integrated missile cavalry',
      sideII:
        'Cataphracts and mounted archers with camel-borne resupply of arrows',
    },
    outcome:
      'Catastrophic Roman defeat; capture of legionary standards—later a political obsession for Augustus.',
    keyFacts: [
      'The *crassus* pun on Crassus’ name wrote itself in Roman moralizing history.',
      'Surena’s pageantry allegedly included silvered banners and theatrical feints.',
      'Survivors were settled in marginal outposts according to some accounts.',
      'The loss dramatized limits of Mediterranean heavy infantry against steppe-parthian systems.',
    ],
  },
  {
    id: 'trasimene',
    title: 'Battle of Lake Trasimene',
    year: '217 BC',
    location: 'Lake Trasimene, Italy',
    coordinates: {lat: 43.1333, lng: 12.1},
    description:
      'Hannibal maneuvered Consul Gaius Flaminius along the north shore of Lake Trasimene into a fog-shrouded defile where Punic troops lay hidden on heights. At signal, infantry and Punic cavalry sealed both ends of the road and slaughtered Romans unable to deploy. Flaminius died; thousands were killed or captured in hours. Rome reeled from its second catastrophic ambush after Trebia; dictatorial emergency measures followed as Hannibal marched toward central Italy.',
    commanders: {
      sideI: 'Hannibal Barca',
      sideII: 'Gaius Flaminius (Roman Republic)',
    },
    forces: {
      sideI:
        'Mixed African, Spanish, and Celtic troops with seasoned cavalry commanders',
      sideII:
        'Consular army of two reinforced legions and allies marching in risky column',
    },
    outcome:
      'Nearly complete destruction of Flaminius’ army; Roman Italy thrown into panic.',
    keyFacts: [
      'Geography and weather gave Hannibal perfect cover.',
      'Livy’s narrative stresses senatorial mistrust of Flaminius before the disaster.',
      'The battle preceded Cannae as proof of Hannibal’s operational subtlety.',
      'Roman religious reaction included human sacrifice rarities in Livian account.',
    ],
  },
  {
    id: 'cynoscephalae',
    title: 'Battle of Cynoscephalae',
    year: '197 BC',
    location: 'Thessaly, Greece',
    coordinates: {lat: 39.4, lng: 22.7},
    description:
      'Roman proconsul Titus Quinctius Flamininus met Philip V of Macedon on broken hills named the Dog’s Heads. Uneven deployment meant partial engagements began before kings intended general battle. Philip’s left phalanx on high ground smashed Italian allies initially, but the right stalled on ridges; Roman maniples infiltrated gaps once sarissa line broke stride. Elephants on the flank and flexible legion organization decided the duel between Hellenistic phalanx and Republican sword-and-shield infantry.',
    commanders: {
      sideI: 'Titus Quinctius Flamininus',
      sideII: 'Philip V of Macedon',
    },
    forces: {
      sideI:
        'Roman legions with Italian socii, allied Aetolians, and elephants',
      sideII:
        'Macedonian phalanx veterans, light troops, and cavalry constrained by terrain',
    },
    outcome:
      'Macedonian defeat; Macedon humbled in the Peace of Tempe and future Roman arbitration in Greece.',
    keyFacts: [
      'Demonstrated phalanx vulnerability on rough ground versus manipular infantry.',
      'Philip’s partial success could not outweigh disaster on his other wing.',
      'Roman declaration of Greek “freedom” at Corinth followed diplomatically.',
      'Polybius underscores accidental battle starts on mismatched ridges.',
    ],
  },
  {
    id: 'arbela',
    title: 'Battle of Arbela / Gaugamela Plain',
    year: '331 BC',
    location: 'Northern Mesopotamia near modern Iraq',
    coordinates: {lat: 36.35, lng: 43.3},
    description:
      'Often treated as synonymous with Gaugamela in modern scholarship, classical sources distinguish the plains near **Arbela** (modern Erbil region) where Darius fled after Alexander shattered his grand army. The sprawling alluvial floor between the Tigris folds allowed maximum deployment of Persian cavalry wedges, scythed chariots, and ethnic infantry blocks. Macedonian synergy of phalanx, hypaspists, and Companion cavalry ruptured Persian command so thoroughly that Arbela became the administrative reference point for Darius’ final rout toward Ecbatana while Alexander secured Babylon.',
    commanders: {
      sideI: 'Alexander III with Parmenion coordinating the second line',
      sideII: 'Darius III with satraps including Mazaeus operating on the Persian right',
    },
    forces: {
      sideI:
        'Integrated Macedonian army with siege engineers and allied Asian horsemen increasing over the campaign',
      sideII:
        'Imperial grand army pooling cavalry masses from eastern satrapies',
    },
    outcome:
      'Strategic collapse of organized Persian resistance in Mesopotamia; Darius’ flight toward the Iranian plateau.',
    keyFacts: [
      '“Arbela” labels the regional anchor while “Gaugamela” marks the battlefield village tradition.',
      'Persian chariots aimed to slice gaps for cavalry exploitation but were largely neutralized.',
      'Babylon opened its gates soon afterward, easing Alexander’s logistics.',
      'The double naming still confuses popular histories mapping the same campaign climax.',
    ],
  },
  {
    id: 'granicus',
    title: 'Battle of Granicus',
    year: '334 BC',
    location: 'Granicus River, northwestern Anatolia',
    coordinates: {lat: 40.3167, lng: 27.2667},
    description:
      'Alexander’s first major Asian battle forced a river crossing under Persian satrapal infantry and cavalry positioned on the far bank. Despite Parmenion’s caution, Alexander led a diagonal assault into the stream and up the muddy berm. Companions crashed Persian horse; phalangites secured the ford. Satraps including Memnon’s adversaries fell in confused fighting. Victory cleared western Anatolia, opened the coast to the march toward Issus, and announced Macedonian shock tactics to the Persian west.',
    commanders: {
      sideI: 'Alexander III, Parmenion',
      sideII:
        'Satrapal coalition including Arsites, Spithridates, Rhoesaces, and Greek mercenary commanders',
    },
    forces: {
      sideI:
        'Macedonian phalanx, Companion cavalry, prodromoi, and allied horse',
      sideII:
        'Anatolian satrapal levies, Persian cavalry strike forces, Greek mercenary infantry',
    },
    outcome:
      'Persian defensive line broken; Satrapal resistance in Asia Minor fractured.',
    keyFacts: [
      'Arrian and Plutarch emphasize Alexander’s personal risk crossing under missile fire.',
      'Spithridates allegedly struck at Alexander before Cleitus severed his arm in legend.',
      'Memnon’s Fabian naval strategy might have prolonged defense had satraps listened.',
      'The battle logo’d Alexander’s invasion as more than a reconnaissance in force.',
    ],
  },
  {
    id: 'mycale',
    title: 'Battle of Mycale',
    year: '479 BC',
    location: 'Mount Mycale near coast of Ionia',
    coordinates: {lat: 37.6833, lng: 27},
    description:
      'On the same day or near-simultaneous traditions with Plataea, the Greek allied fleet assaulted Persian beached ships and palisaded camp beneath Mount Mycale in Ionia. Athenians, Corinthians, and others stormed fortifications while Samian and other Ionians defected mid-battle. Destruction of the maritime detachment paired with land victory ended major Persian offensive power in the Aegean and encouraged Ionian revolt against satrapal rule, reshaping Delian League foundations.',
    commanders: {
      sideI:
        'Leotychidas (Spartan king) with Xanthippus leading Athenian contingents prominently',
      sideII: 'Persian admirals Tigranes and others with Ionian subjects of mixed loyalty',
    },
    forces: {
      sideI:
        'Greek trireme crews fighting as heavy infantry plus marines and armored hoplites',
      sideII:
        'Beached fleet crews, camp guards, and Asian infantry behind earthworks',
    },
    outcome:
      'Greek victory; burning of Persian ships; loosening of imperial grip on Ionian coast.',
    keyFacts: [
      'Herodotus links timing to Plataea for dramatic symmetry.',
      'Samians reportedly initiated decisive betrayal of barbarian contingents.',
      'Victory complemented Greek freedom narratives with punitive expeditions inland.',
      'Archaeological hills near Priene zone anchor the battlefield tradition.',
    ],
  },
  {
    id: 'himera',
    title: 'Battle of Himera',
    year: '480 BC',
    location: 'Himera, Sicily',
    coordinates: {lat: 37.9667, lng: 13.8167},
    description:
      'Carthage launched a massive expedition to Sicily ostensibly timed with Xerxes’ Greek invasion according to hostile tradition. Greeks under Gelon of Syracuse and Theron of Acragas coordinated defense near Himera. Elite Syracusan hoplites and cavalry smashed Carthaginian formations; alleged triple synchrony with Salamis propaganda aside, Himera shattered Punic manpower and naval cadres for a generation, killed commander Hamilcar reputedly during sacrifice, and entrenched Syracuse as the dominant western Greek power.',
    commanders: {
      sideI:
        'Gelon tyrant of Syracuse, Theron of Acragas, allied Siceliot Greeks',
      sideII: 'Hamilcar with Punic aristocrats and Ibero-Libyan hosts',
    },
    forces: {
      sideI:
        'Heavy Syracusan and allied Sicilian hoplite armies with strong cavalry arms',
      sideII:
        'Large amphibious expedition mixing Punic elites, levy infantry, mercenaries, and fleets',
    },
    outcome:
      'Decisive Greek victory; punitive peace and Carthage’s Sicilian setback for decades.',
    keyFacts: [
      'Diodorus preserves grand numbers and dramatic synchronism with mainland battles.',
      'Altars and casualty monuments dotted Himera afterward.',
      'Carthage’s defeat invited domestic political reckonings among suffetes.',
      'Syracuse leveraged victory into cultural golden age culminating in rivalry with Athens.',
    ],
  },
  {
    id: 'delium',
    title: 'Battle of Delium',
    year: '424 BC',
    location: 'Delium, Boeotia, Greece',
    coordinates: {lat: 38.3333, lng: 23.65},
    description:
      'During the Peloponnesian War, Athenians under Hippocrates fortified the sanctuary of Apollo at Delium; Boeotian confederates under Pagondas counterattacked across rugged ground. Boeotians innovated—or refined—deployment of staggered infantry depth and localized cavalry strikes. Hippocrates fell as Athenian right succeeded briefly while the left routed under Theban pressure. Athenian hoplite superiority myth suffered a rare mainland setback, emboldening Sparta’s Theban allies strategically.',
    commanders: {
      sideI: 'Hippocrates (Athens and allies)',
      sideII: 'Pagondas (Boeotian confederation, Theban prominence)',
    },
    forces: {
      sideI:
        'Athenian levy hoplites, rural demes troops, allied light contingents occupying sanctuary fortification',
      sideII:
        'Deep Theban formation with other Boeotian cities and cavalry',
    },
    outcome:
      'Boeotian victory; Athenians retreated with casualties and religious controversy over fortified shrine.',
    keyFacts: [
      'Socrates reportedly saved Alcibiades’ life during the chaotic retreat.',
      'Occupation of a sanctuary angered Boeotians and complicated propaganda.',
      'Pagondas’ use of reinforcements over rolling terrain impressed tacticians.',
      'The battle preceded larger Theban experiments culminating at Leuctra.',
    ],
  },
  {
    id: 'mantinea',
    title: 'Battle of Mantinea',
    year: '362 BC',
    location: 'Mantinea, Arcadia, Greece',
    coordinates: {lat: 37.6167, lng: 22.3833},
    description:
      'Epaminondas marched south again, seeking to break Spartan and allied coalitions near Mantinea in Arcadia. He repeated deep massing on his left refusal wing, smashed the enemy right where Spartans stationed themselves, yet received a mortal wound from a stray weapon as his army prevailed strategically incomplete—Theban hegemony peaked as Epaminondas died in camp. Tactical brilliance could not compensate politically for losing the visionary architect of Boeotian power.',
    commanders: {
      sideI:
        'Epaminondas, Theban confederation with Thessalians and allied horse',
      sideII:
        'Agesilaus-associated Spartan traditions with Mantineans, Athenians, and others fearful of Thebes',
    },
    forces: {
      sideI:
        'Theban phalanx with supporting allies and strong cavalry on the decisive wing',
      sideII:
        'Mixed coalition phalanxes defending Arcadian autonomy against Theban dominance',
    },
    outcome:
      'Tactical Theban battlefield success overshadowed by death of Epaminondas and mutual exhaustion.',
    keyFacts: [
      'Xenophon ends his Hellenica reflecting on dizzying Spartan-Theban-Athenian role reversals.',
      'Sacred Band again anchored elite assault formations.',
      'Theban inability to consolidate after Epaminondas’ death opened Macedonian ascent.',
      'Mantinea proved deadly oblique echelons could still risk command fragility.',
    ],
  },
  {
    id: 'pydna',
    title: 'Battle of Pydna',
    year: '168 BC',
    location: 'Near Pydna, Macedonia, Greece',
    coordinates: {lat: 40.3667, lng: 22.5833},
    description:
      'Third Macedonian War climax: Consul Aemilius Paullus engaged Perseus near Pydna. Initial skirmishing along broken ground paused until misunderstanding or impatient advance triggered general combat at lunar eclipse—Romans exploited intervals in the sarissa forest once phalanx lost cohesion on ridges. Flexible legionaries closed with swords inside spear length; Macedonian resistance crumbled—Perseus fled disgracefully. Macedonia was annexed organizationally soon after Paullus’ triumphal display of captive wealth including royal library symbolism.',
    commanders: {
      sideI: 'Lucius Aemilius Paullus Macedonicus',
      sideII: 'Perseus of Macedon',
    },
    forces: {
      sideI:
        'Roman legions in triplex acies with allied skirmishers adept at exploiting gaps',
      sideII:
        'Macedonian phalanx with guard cavalry weakened by preceding attrition campaigns',
    },
    outcome:
      'Annihilation of Macedonian royal army; end of independent Antigonid Macedonia.',
    keyFacts: [
      'Eclipse omens frightened ancient observers on both camps per Livy.',
      'Elevation changes mattered more than raw sarissa reach.',
      'Elephant skirmishes featured on flank according to surviving narratives.',
      'Roman settlement split Macedonia into four republics tributary to Rome.',
    ],
  },
  {
    id: 'magnesia',
    title: 'Battle of Magnesia',
    year: '190 BC',
    location: 'Near Magnesia ad Sipylum, western Anatolia',
    coordinates: {lat: 38.6167, lng: 27.4167},
    description:
      'Roman proconsul Scipio Asiaticus and brother Africanus overshadowing diplomatically smashed Antiochus III near the Hermus plain below Sipylus-Magnesia foothills. Seleucid cataphracts and chariots thundered initially; Roman maniples anchored while Eumenes of Pergamon’s horse collapsed the Syrian left flank. Camp storming panicked elephants and Antiochus’ infantry phalanx; Asia Minor tributary burdens shifted abruptly from Seleucid to Roman arbitration under the Treaty of Apamea.',
    commanders: {
      sideI:
        'Lucius Cornelius Scipio Asiaticus, Gnaeus Domitius Ahenobarbus, Eumenes II of Pergamon',
      sideII: 'Antiochus III the Great',
    },
    forces: {
      sideI:
        'Roman legions, Pergamene cavalry, allied Asian skirmishers integrated into combined arms',
      sideII:
        'Seleucid phalanx, armored cavalry, scythed chariots, elephant corps',
    },
    outcome:
      'Seleucid strategic defeat; loss of European territories and most of Asia Minor buffer states.',
    keyFacts: [
      'Appian’s account dramatizes camp assault turning tide.',
      'Elephants caused friendly fire among Seleucid ranks once routed.',
      'Roman allies Pergamum and Rhodes gained territory at Apamea.',
      'The battle showcased late Hellenistic arms races colliding with Italian flexibility.',
    ],
  },
  {
    id: 'bethoron',
    title: 'Battle of Beth Horon',
    year: '166 BC',
    location: 'Beth Horon Pass, Judea',
    coordinates: {lat: 31.8667, lng: 35.1167},
    description:
      'During the Maccabean Revolt against Seleucid religious persecution, Judah Maccabee ambushed Seleucid forces under governors Seron and formations described in First Maccabees as struggling through narrow ascents from coastal plains toward Judean highlands. Using broken terrain masking sudden Jewish charges, Judah repelled imperial columns, seizing weapons and momentum for guerrilla-cum-field campaigns culminating in renewed Temple worship traditions. Terrain asymmetry amplified motivated light infantry striking ponderous punitive expeditions.',
    commanders: {
      sideI: 'Judah Maccabee (Jewish rebels)',
      sideII: 'Seron and imperial Seleucid detachments operating from Acre-region bases',
    },
    forces: {
      sideI:
        'Highly motivated Judean infantry and irregulars exploiting passes and ridges',
      sideII:
        'Seleucid expeditionary infantry and cavalry constrained by chokepoints',
    },
    outcome:
      'Jewish tactical victory easing supply of Jerusalem insurgents psychologically if not materially alone.',
    keyFacts: [
      'First Book of Maccabees narrates Judah’s ascendancy stratagem through successive battles.',
      'Beth Horon’s biblical memory as an ambush gorge colored later Jewish remembrance.',
      'Victory narratives legitimized Hasmonaean leadership against Hellenizing factions.',
      'Seleucid responses escalated toward larger punitive armies and diplomatic intrigue.',
    ],
  },
];

export const BATTLES: Battle[] = BATTLES_WITHOUT_THEME.map((b, i) => ({
  ...b,
  theme: battleThemeAt(i),
  image: BATTLE_IMAGES[b.id],
}));

/** Lookup by battle slug */
export const BATTLE_BY_ID: Record<string, Battle> = Object.fromEntries(
  BATTLES.map(b => [b.id, b]),
);

export function getBattleTheme(index: number): BattleCardTheme {
  return battleThemeAt(index);
}
