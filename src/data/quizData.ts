/**
 * QCM d'Évaluation Clinique & Pédagogique
 * Basé rigoureusement sur le cours de Médecine et Chirurgie Buccales
 * Pr Ag Adel BOUGUEZZI (Clinique Dentaire de Monastir)
 */

export interface QuizQuestion {
  id: number;
  question: string;
  category: 'bilan' | 'pharmacologie' | 'instrumentation' | 'technique' | 'complications';
  categoryLabel: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  slideRef: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la règle d'or d'orientation des mors et branches d'un davier pour le maxillaire supérieur ?",
    category: "instrumentation",
    categoryLabel: "Instrumentation & Daviers",
    options: [
      "Les mors et les branches forment un angle droit à 90°",
      "Les mors et les branches sont situés dans une même ligne (alignement rectiligne)",
      "Les branches sont toujours coudées en baïonnette à angle obtus",
      "Les mors sont systématiquement fermés et jointifs"
    ],
    correctIndex: 1,
    explanation: "Selon la Règle d'or (Diapositive 40) : pour le maxillaire, les mors et les branches sont situés dans une même ligne. Pour la mandibule, les deux parties forment entre elles un angle droit (90°).",
    slideRef: "Diapositive 40"
  },
  {
    id: 2,
    question: "Quelle est la dose maximale d'Articaïne AVEC vasoconstricteur chez un adulte sain de 70 kg ?",
    category: "pharmacologie",
    categoryLabel: "Pharmacologie & Anesthésie",
    options: [
      "4 mg/kg soit maximum 300 mg (4 carpules à 1,7 ml)",
      "7 mg/kg soit maximum 500 mg (7 ampoules à 1,7 ml)",
      "10 mg/kg soit maximum 700 mg (10 ampoules à 1,8 ml)",
      "3,5 mg/kg soit maximum 250 mg (2,5 ampoules)"
    ],
    correctIndex: 1,
    explanation: "Doses maximales pour un adulte de 70 kg (Diapositive 17) : Articaïne avec vaso = 7 mg/kg max 500 mg, soit 7 ampoules à 1,7 ml. (L'Articaïne sans vaso est limitée à 4 mg/kg max 300 mg = 4 ampoules).",
    slideRef: "Diapositive 17"
  },
  {
    id: 3,
    question: "Lors de l'anesthésie tronculaire à l'épine de Spix pour une molaire inférieure, quel nerf doit OBLIGATOIREMENT être infiltré en complément local ?",
    category: "technique",
    categoryLabel: "Technique d'Anesthésie",
    options: [
      "Le nerf lingual uniquement",
      "Le nerf buccal",
      "Le nerf grand palatin",
      "Le nerf sous-orbitaire"
    ],
    correctIndex: 1,
    explanation: "L'anesthésie tronculaire à l'épine de Spix est pratiquée uniquement pour les molaires inférieures et doit impérativement être associée à une infiltration locale du nerf buccal pour insensibiliser la gencive vestibulaire (Diapositive 23).",
    slideRef: "Diapositive 23"
  },
  {
    id: 4,
    question: "Comment doit être tenu le syndesmotome lors du premier temps opératoire de syndesmotomie ?",
    category: "technique",
    categoryLabel: "Technique Chirurgicale",
    options: [
      "Tenu à pleine main dans la paume avec force",
      "Tenu comme un stylo (prise en porte-plume) avec appui digital sur les dents voisines",
      "Tenu entre le pouce et le petit doigt sans contact osseux",
      "Tenu avec une pince gouge articulée"
    ],
    correctIndex: 1,
    explanation: "Le syndesmotome est tenu comme un stylo et on prend obligatoirement appui avec les autres doigts sur les dents voisines pour éviter tout dérapage accidentel (Diapositive 24).",
    slideRef: "Diapositive 24"
  },
  {
    id: 5,
    question: "Si plusieurs dents adjacentes doivent être extraites sur une même arcade, par laquelle faut-il commencer ?",
    category: "technique",
    categoryLabel: "Protocole Opératoire",
    options: [
      "Par la dent la plus mésiale (la plus en avant)",
      "Par la dent la plus mobile sans ordre précis",
      "Toujours par la dent la plus distale (la plus en arrière)",
      "Par la dent présentant la plus grosse lésion apicale"
    ],
    correctIndex: 2,
    explanation: "Si on a plusieurs dents adjacentes à extraire, il faut toujours commencer par la dent la plus distale afin de conserver en permanence un point d'appui osseux mésial pour la dent suivante (Diapositive 26).",
    slideRef: "Diapositive 26"
  },
  {
    id: 6,
    question: "Dans quelle circonstance le curetage alvéolaire est-il formellement indiqué ?",
    category: "technique",
    categoryLabel: "Curetage & Révision",
    options: [
      "Systématiquement après chaque extraction dentaire pour nettoyer l'os",
      "Uniquement lorsque la dent présente une affection apicale visualisée préalablement à la radio (kyste, granulome)",
      "Uniquement chez les patients immunodéprimés",
      "Seulement pour les dents de lait temporaires"
    ],
    correctIndex: 1,
    explanation: "Règles du curetage (Diapositive 46) : Le curetage alvéolaire N'EST INDIQUÉ QUE lorsque la dent présente une affection apicale visualisée à la radio. Une dent saine (ex. extraction orthodontique, sagesse saine) ne nécessite aucun curetage !",
    slideRef: "Diapositive 46"
  },
  {
    id: 7,
    question: "Quel instrument rotatif spécifique est recommandé pour réaliser la séparation radiculaire d'une molaire délabrée ?",
    category: "instrumentation",
    categoryLabel: "Instrumentation Spécifique",
    options: [
      "Une fraise boule diamantée à grain épais",
      "Une fraise Zekrya chirurgicale",
      "Une râpe à os rotative",
      "Une fraise flamme pour résine"
    ],
    correctIndex: 1,
    explanation: "La séparation des racines (odontosection) des molaires délabrées ou divergentes est réalisée à l'aide d'une fraise Zekrya chirurgicale (Diapositives 54 et 55).",
    slideRef: "Diapositives 54-55"
  },
  {
    id: 8,
    question: "Quelle est la manœuvre d'urgence immédiate pour réduire une luxation de l'articulation temporo-mandibulaire (ATM) survenue au fauteuil ?",
    category: "complications",
    categoryLabel: "Complications & Urgences",
    options: [
      "La manœuvre de Valsalva",
      "La manœuvre de Heimlich",
      "La manœuvre de Nélaton",
      "La manœuvre de Sellick"
    ],
    correctIndex: 2,
    explanation: "Si la mandibule n'est pas soutenue, une luxation du condyle en avant du processus temporal peut survenir. Sa réduction manuelle se fait par la MANŒUVRE DE NÉLATON (Diapositive 69).",
    slideRef: "Diapositive 69"
  },
  {
    id: 9,
    question: "Quel tableau clinique caractérise typiquement l'alvéolite sèche (fibrinolytique) ?",
    category: "complications",
    categoryLabel: "Complications Postopératoires",
    options: [
      "Apparition immédiate à 2h avec tuméfaction cutanée fluctuante et pus abondant",
      "Apparition à 48-72h (voire J4) avec douleurs vives pulsatiles irradiantes, alvéole déshabitée et parois osseuses blanc grisâtre exsangues sans caillot",
      "Gencive hypertrophiée indolore saignant au brossage",
      "Fièvre élevée à 40°C avec adénopathie compressive et trismus serré"
    ],
    correctIndex: 1,
    explanation: "L'alvéolite sèche se manifeste le plus souvent à 48-72h (voire 4e jour) par des douleurs insomniantes vives, continues, pulsatiles irradiant à l'hémiface, avec alvéole béante, disparition du caillot et parois osseuses blanc grisâtre dénudées et très sensibles (Diapositive 72).",
    slideRef: "Diapositive 72"
  },
  {
    id: 10,
    question: "Pourquoi est-il formellement interdit au patient de boire avec une paille ou de cracher pendant les 24 heures suivant l'extraction ?",
    category: "technique",
    categoryLabel: "Recommandations Postopératoires",
    options: [
      "Car la salive devient toxique au contact de l'émail",
      "Car cela crée une dépression intra-buccale qui déloge le caillot sanguin en formation et réactive l'hémorragie",
      "Car cela risque d'éroder les obturations des dents voisines",
      "Car les pailles en plastique contiennent des allergènes majeurs"
    ],
    correctIndex: 1,
    explanation: "Boire à la paille, rincer abondamment ou cracher crée une dépression en bouche qui peut déplacer le caillot sanguin, retarder la cicatrisation ou provoquer une reprise de saignement (Diapositive 49).",
    slideRef: "Diapositive 49"
  },
  {
    id: 11,
    question: "Quelle complication d'anesthésie peut survenir lors d'une injection trop postérieure gagnant la loge parotidienne ?",
    category: "complications",
    categoryLabel: "Complications d'Anesthésie",
    options: [
      "Une paralysie faciale transitoire sans gravité",
      "Un œdème de Quincke immédiat",
      "Une anesthésie définitive du nerf trijumeau",
      "Une cécité unilatérale irréversible"
    ],
    correctIndex: 0,
    explanation: "Une injection trop postérieure de l'anesthésique lors d'une Spix gagne la loge parotidienne et infiltre les branches du nerf facial, causant une paralysie faciale transitoire sans gravité qui régresse en quelques heures (Diapositive 59).",
    slideRef: "Diapositive 59"
  },
  {
    id: 12,
    question: "Pour les molaires maxillaires (supérieures), quelle particularité anatomique possède le mors du davier correspondant ?",
    category: "instrumentation",
    categoryLabel: "Daviers & Morphologie",
    options: [
      "Il possède deux éperons symétriques",
      "Le mors vestibulaire présente un éperon s'adaptant à la furcation entre les deux racines vestibulaires",
      "Les deux mors sont complètement effilés et jointifs",
      "Le mors palatin est tranchant pour inciser la gencive"
    ],
    correctIndex: 1,
    explanation: "Les daviers coudés pour molaires maxillaires droite et gauche comportent un mors vestibulaire doté d'un éperon qui s'engage dans la furcation entre les 2 racines vestibulaires, tandis que le mors palatin est lisse (Diapositive 41).",
    slideRef: "Diapositive 41"
  },
  {
    id: 13,
    question: "Quel mouvement est appliqué au davier pour l'avulsion d'une dent monoradiculée (une seule racine) ?",
    category: "technique",
    categoryLabel: "Biomécanique & Mouvements",
    options: [
      "Un mouvement de circumduction ample et excentré",
      "Un mouvement de rotation alternée droite et gauche",
      "Un mouvement de traction axiale pure sans rotation",
      "Un mouvement de cisaillement mésio-distal brusque"
    ],
    correctIndex: 1,
    explanation: "Pour les dents monoradiculées, on applique un mouvement de rotation alternée droite et gauche. La circumduction est quant à elle réservée aux dents pluriradiculées (Diapositive 44).",
    slideRef: "Diapositive 44"
  },
  {
    id: 14,
    question: "Quelle est l'indication spécifique du syndesmotome ou élévateur de Winter ?",
    category: "instrumentation",
    categoryLabel: "Instrumentation de Luxation",
    options: [
      "La syndesmotomie initiale des incisives temporaires",
      "La luxation des racines résiduelles de molaires (élévateur triangulaire)",
      "Le curetage du plancher sinusien",
      "L'anesthésie intraligamentaire haute pression"
    ],
    correctIndex: 1,
    explanation: "L'élévateur triangulaire de Winter est utilisé pour luxer les racines résiduelles de molaires, notamment après séparation radiculaire (Diapositives 27 et 55).",
    slideRef: "Diapositive 27"
  },
  {
    id: 15,
    question: "Dans quel cas l'antibioprophylaxie est-elle FORMELLEMENT indiquée avant une extraction dentaire ?",
    category: "bilan",
    categoryLabel: "Bilan & Antibioprophylaxie",
    options: [
      "Chez tout patient adulte subissant une extraction simple",
      "Chez le patient porteur d'une cardiopathie à risque d'endocardite infectieuse (ex. prothèse valvulaire)",
      "Uniquement chez les patients de plus de 65 ans sans antécédents",
      "En cas d'anxiété préopératoire modérée"
    ],
    correctIndex: 1,
    explanation: "L'antibioprophylaxie est indiquée chez le patient à haut risque infectieux : cardiopathie à risque d'endocardite infectieuse, immunodéprimé, irradié cervico-facial, ou traité par bisphosphonates (Diapositive 7).",
    slideRef: "Diapositive 7"
  },
  {
    id: 16,
    question: "Quelle précaution permet de prévenir une brûlure labiale lors de l'utilisation de la pièce à main chirurgicale ?",
    category: "complications",
    categoryLabel: "Accidents Muqueux",
    options: [
      "Appliquer de la vaseline sur la langue",
      "Protéger impérativement la lèvre anesthésiée à l'aide d'un écarteur",
      "Utiliser la pièce à main sans aucune irrigation d'eau",
      "Faire mordre le patient sur un rouleau de coton pendant le fraisage"
    ],
    correctIndex: 1,
    explanation: "La brûlure labiale résulte de la tête de la pièce à main en contact avec la lèvre anesthésiée ; elle est prévenue par la protection rigoureuse de la lèvre à l'aide d'un écarteur (Diapositive 62).",
    slideRef: "Diapositive 62"
  },
  {
    id: 17,
    question: "Que doit faire le praticien lors de la fracture d'un petit apex profond sans infection, situé au contact immédiat du canal mandibulaire ?",
    category: "complications",
    categoryLabel: "Accidents Dentaires",
    options: [
      "Percer le canal mandibulaire à la turbine pour aspirer l'apex",
      "S'abstenir de tout fraisage délabrant qui risquerait de léser le nerf alvéolaire inférieur",
      "Utiliser un élévateur droit avec force maximale",
      "Injecter de l'eau oxygénée sous forte pression dans l'alvéole"
    ],
    correctIndex: 1,
    explanation: "Règle pour fracture d'un apex (Diapositive 64) : Retirer l'apex s'il est mobile et accessible ; S'ABSTENIR s'il est profond, avec nécessité de fraisage important ou proximité d'un obstacle anatomique (sinus, canal mandibulaire).",
    slideRef: "Diapositive 64"
  },
  {
    id: 18,
    question: "Quel instrument est employé après des extractions multiples pour régulariser la crête et supprimer les épines osseuses ?",
    category: "instrumentation",
    categoryLabel: "Extractions Multiples",
    options: [
      "Une pince gouge et une râpe à os",
      "Un davier pour racine et un miroir",
      "Un tire-nerf et une sonde parodontale",
      "Une seringue à carpule vide"
    ],
    correctIndex: 0,
    explanation: "L'extraction de plusieurs dents adjacentes doit être suivie par une régularisation de la crête et l'élimination des septa et épines osseuses par une pince gouge et une râpe à os (Diapositive 52).",
    slideRef: "Diapositive 52"
  },
  {
    id: 19,
    question: "Quelle méthode originale permet parfois d'extirper un fragment d'apex fracturé mobile au fond de son alvéole ?",
    category: "technique",
    categoryLabel: "Techniques Spécifiques",
    options: [
      "Engager et visser un racleur (lime endodontique) dans le canal pulpaire résiduel pour le tracter",
      "Appliquer un aimant chirurgical puissant sur la gencive",
      "Souffler avec la seringue à air à 6 bars au fond de l'alvéole",
      "Comprimer avec le pouce pendant 30 minutes"
    ],
    correctIndex: 0,
    explanation: "Pour l'extraction d'un bout d'apex, on utilise des élévateurs coudés, le syndesmotome de Chompret, ou l'insertion d'un racleur dans le canal pulpaire (Diapositive 53).",
    slideRef: "Diapositive 53"
  },
  {
    id: 20,
    question: "En cas de dérapage instrumental du côté lingual lors d'une extraction molaire inférieure, quelle structure nerveuse majeure risque d'être lésée ?",
    category: "complications",
    categoryLabel: "Accidents Nerveux",
    options: [
      "Le nerf optique",
      "Le nerf lingual",
      "Le nerf auditif",
      "Le nerf sous-orbitaire"
    ],
    correctIndex: 1,
    explanation: "Un dérapage instrumental du côté lingual peut léser le nerf lingual en postérieur et le plancher buccal en antérieur, entraînant une perte de sensibilité de la moitié antérieure de la langue (Diapositive 62).",
    slideRef: "Diapositive 62"
  }
];
