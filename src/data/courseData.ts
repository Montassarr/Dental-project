/**
 * Données complètes du cours : "Les extractions dentaires : techniques et complications"
 * Auteur : Pr Ag Adel BOUGUEZZI
 * Spécialité : Médecine et chirurgie buccales, Clinique Dentaire de Monastir
 * Basé rigoureusement et exclusivement sur le support de cours (85 diapositives).
 */

export interface Chapter {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  slideRange: string;
  summary: string;
  sections: {
    title: string;
    content: string[];
    keyPoints?: string[];
    warning?: string;
    clinicalPearl?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    imageKey?: 'hero' | 'daviers' | 'spix' | 'alveolite' | 'zekrya';
  }[];
}

export const COURSE_INFO = {
  title: "Les extractions dentaires : techniques et complications",
  author: "Pr Ag Adel BOUGUEZZI",
  department: "Médecine et chirurgie buccales",
  institution: "Clinique Dentaire de Monastir",
  totalSlides: 85,
  coreAxiom: "Il n'y a pas de « petite opération » : une extraction jugée simple au début peut devenir compliquée.",
  synonyms: ["Extraction", "Exodontie", "Avulsion"]
};

export const CHAPTERS: Chapter[] = [
  {
    id: "chapitre-1-objectifs-bilan",
    number: "01",
    title: "Objectifs Pédagogiques & Bilan Préopératoire",
    shortTitle: "Bilan Préopératoire",
    slideRange: "Diapositives 1 à 10",
    summary: "Identification des indications, analyse des antécédents médicaux, prémédication sédative, antibioprophylaxie ciblée et évaluation radiologique du score de difficulté.",
    sections: [
      {
        title: "Objectifs Pédagogiques du Cours",
        content: [
          "1. Poser l'indication précise d'extraction dentaire.",
          "2. Préparer le patient à l'intervention en fonction de son état de santé général.",
          "3. Anticiper les difficultés potentielles d'une extraction dentaire et adapter les techniques opératoires.",
          "4. Choisir et savoir manipuler les instruments appropriés selon le type d'extraction.",
          "5. Diagnostiquer et prendre en charge sans délai les complications per- et postopératoires."
        ],
        clinicalPearl: "L'exodontie est un geste chirurgical très fréquent, souvent redouté et mal vécu par les patients. Les préalables incontournables sont l'interrogatoire minutieux, l'examen clinique (± biologique) et l'examen radiologique rigoureux."
      },
      {
        title: "Interrogatoire Médical & Antécédents à Risque",
        content: [
          "Toute extraction, aussi banale soit-elle en apparence, exige une évaluation des contre-indications locales et générales (transitoires ou formelles) et la mise en place de précautions pré- et postopératoires.",
          "Pathologies cardiovasculaires : HTA, antécédent d'infarctus du myocarde (IDM), troubles du rythme cardiaque, valvulopathies.",
          "Troubles métaboliques : Diabète (risque infectieux et cicatrisation retardée), dysthyroïdies (hyper/hypothyroïdie), insuffisance surrénalienne.",
          "Affections rénales : Néphrite chronique, greffe rénale, patient sous dialyse périodique.",
          "Troubles neurologiques : Épilepsie, myasthénie.",
          "Pathologies rhumatismales : Rhumatisme articulaire aigu (RAA) avec ou sans anomalies valvulaires sous-jacentes, polyarthrite rhumatoïde (PAR).",
          "Troubles allergiques : Asthme, allergies médicamenteuses (antibiotiques, latex, anesthésiques).",
          "Radiothérapie cervico-faciale : Risque majeur d'ostéoradionécrose osseuse avasculaire."
        ],
        keyPoints: [
          "Médicaments majeurs à rechercher : Anti-vitamine K (AVK), antiagrégants plaquettaires (Aspégic, Kardégic, Plavix), corticothérapie à long cours, bisphosphonates oraux ou IV (risque d'ostéonécrose des maxillaires), immunomodulateurs."
        ],
        warning: "Attention aux patients sous bisphosphonates ou ayant des antécédents de radiothérapie cervico-faciale : le métabolisme osseux est profondément altéré, exposant à une nécrose osseuse réfractaire."
      },
      {
        title: "Prémédication Sédative Préopératoire",
        content: [
          "Elle n'est pas systématique et reste strictement dépendante du geste prévu et du profil psychologique ou neurovégétatif du patient :",
          "• Acte opératoire prévu particulièrement long et difficile.",
          "• Patient très anxieux et pusillanime.",
          "• Hypersensibilité neurovégétative (patient vagotonique avec antécédents de malaises vagaux à l'anesthésie).",
          "• Certains enfants pour désamorcer l'angoisse du soin.",
          "Bénéfices cliniques : Améliore nettement les conditions de travail, rend le patient calme et docile, supprime ou atténue le réflexe nauséeux et réduit la salivation excessive.",
          "Classes pharmacologiques utilisables : Hypnotique (ex. phénobarbital), vagolytique (atropine), antalgique (paracétamol, AINS).",
          "Délai d'administration : Administrée la veille au coucher et/ou 1 heure avant l'intervention."
        ]
      },
      {
        title: "Antibioprophylaxie : Indications Précises",
        content: [
          "L'antibioprophylaxie est impérative chez les patients présentant un haut risque infectieux per- ou postopératoire :",
          "1. Patient porteur d'une cardiopathie à risque d'endocardite infectieuse d'Osler (prothèse valvulaire, cardiopathie congénitale, valvulopathie mitrale/aortique).",
          "2. Patient immunodéprimé : diabète mal équilibré, corticothérapie au long cours, traitement immunosuppresseur, chimiothérapie en cours, hémodialysé.",
          "3. Patient ayant reçu une radiothérapie pour cancer de la sphère orofaciale.",
          "4. Patient traité ou ayant été traité par bisphosphonates (oraux ou IV)."
        ],
        keyPoints: [
          "Chacune de ces indications fait l'objet d'un protocole d'antibioprophylaxie spécifique : soit protocole 'flash' (dose massive unique 1 heure avant l'acte), soit protocole standard encadrant le geste."
        ]
      },
      {
        title: "Examen Radiologique & Facteurs de Présomption de Difficulté",
        content: [
          "L'examen radiologique (rétro-alvéolaire, panoramique dentaire) est l'examen CLÉ pour établir le score de difficulté opératoire prévisionnel.",
          "Il permet d'évaluer avec précision :",
          "• La morphologie des racines (racines droites, grêles, coudées, divergentes, hypercémentose).",
          "• La présence de lésions péri-apicales chroniques : granulome apical, kyste péri-radiculaire.",
          "• Le degré d'inclusion et d'orientation des dents de sagesse.",
          "• Le rapport intime des apex avec les obstacles anatomiques majeurs : plancher du sinus maxillaire, canal mandibulaire (contenant le nerf alvéolaire inférieur) et racines des dents adjacentes."
        ],
        table: {
          headers: ["Facteur de Présomption", "Mécanisme & Risque", "Conduite Préventive"],
          rows: [
            ["Dent ankylosée (souvent dévitalisée)", "Disparition et ossification du ligament alvéolo-dentaire : la racine fait corps avec l'os alvéolaire.", "Alvéolectomie mesurée, séparation radiculaire, éviter les luxations en force."],
            ["Dent très délabrée / Racines enfouies", "Perte de prise pour le davier ; tendance naturelle des racines résiduelles à s'ankyloser.", "Utilisation d'élévateurs fins, fraise Zekrya, syndesmotome de Chompret."],
            ["Extractions multiples contiguës", "Remaniement important de l'arcade, crête alvéolaire irrégulière et épines blessantes.", "Régularisation osseuse à la pince gouge et à la râpe à os, sutures soignées."],
            ["Kyste volumineux appendu à la dent", "Fragilisation de la corticale osseuse et risque d'infection étendue.", "Énucléation kystique complète et curetage minutieux de la loge."],
            ["Patient sous antiagrégant ou anticoagulant", "Aspégic, Kardégic, Plavix, Préviscan, Sintrom : risque hémorragique per- et postopératoire.", "Hémostase locale renforcée : compression prolongée, Surgicel, éponges de gélatine, sutures."]
          ]
        },
        imageKey: 'hero'
      }
    ]
  },
  {
    id: "chapitre-2-asepsie-ergonomie",
    number: "02",
    title: "Normes d'Asepsie, Ergonomie & Environnement",
    shortTitle: "Asepsie & Ergonomie",
    slideRange: "Diapositives 11 à 13, 19 à 21",
    summary: "Règles strictes de stérilisation, hygiène des mains, barrières de protection, installation ergonomique du praticien (9h-12h) et positionnement du fauteuil dentaire.",
    sections: [
      {
        title: "Normes d'Asepsie Chirurgicale",
        content: [
          "Une asepsie rigoureuse est la condition sine qua non de la prévention des complications infectieuses locales et à distance :",
          "• Lavage antiseptique ou chirurgical des mains.",
          "• Port obligatoire de gants stériles et de masque chirurgical de protection.",
          "• Préparation du patient : bain de bouche préopératoire à base d'une solution antiseptique (ex. chlorhexidine / Eludril) pour diminuer drastiquement la charge bactérienne buccale avant effraction muqueuse.",
          "• Stérilisation contrôlée de tous les instruments réutilisables sous sachets thermosoudés à l'autoclave."
        ]
      },
      {
        title: "Ergonomie & Positions de Travail",
        content: [
          "Deux objectifs indissociables : assurer la relaxation totale du patient et garantir le confort musculo-squelettique du praticien pour un geste précis et sans fatigue.",
          "Règle de positionnement du fauteuil :",
          "• Pour les dents MANDIBULAIRES (du bas) : patient installé en position SEMI-ASSISE, arcade inférieure horizontale ou inclinée vers le bas.",
          "• Pour les dents MAXILLAIRES (du haut) : patient installé en position ALLONGÉE, plan occlusal supérieur vertical ou légèrement incliné vers l'arrière.",
          "• Position du praticien : se place généralement entre 9h et 12h par rapport à la tête du patient selon le secteur à traiter (vision directe et transmission optimale des forces)."
        ]
      },
      {
        title: "Champ Opératoire & Plateau Chirurgical",
        content: [
          "Champ opératoire stérile : Il doit impérativement couvrir le cou, les épaules et la totalité du torse du patient afin de prévenir tout contact accidentel des instruments chirurgicaux ou des mains gantées avec les vêtements du patient (crucial lors des sutures).",
          "Plateau de travail : Utilisation d'un chariot dédié pour les interventions complexes (extractions chirurgicales), ou d'un champ stérile étalé sur la tablette du fauteuil / plateau métallique stérile.",
          "Système d'aspiration chirurgicale : Canules fines stériles indispensables pour aspirer le sang et la salive, assurant une parfaite hémostase peropératoire et une visibilité constante du site."
        ]
      }
    ]
  },
  {
    id: "chapitre-3-anesthesie",
    number: "03",
    title: "Anesthésie Locale & Loco-Régionale",
    shortTitle: "Anesthésie",
    slideRange: "Diapositives 16 à 18, 23",
    summary: "Seringue à carpule, calcul des doses maximales toxiques (Articaïne, Mépivacaïne pour 70 kg), longueurs d'aiguilles et choix entre anesthésie tronculaire à l'épine de Spix et infiltration para-apicale.",
    sections: [
      {
        title: "Matériel d'Anesthésie : Seringue à Carpule & Aiguilles",
        content: [
          "Seringue à carpule : Comporte un corps cylindrique ajouré accueillant la cartouche anesthésique de verre (carpule), un piston à griffe qui se rabat sur le bouchon élastomère pour permettre l'aspiration préalable, et une aiguille stérile vissée à double biseau (une branche perçant le diaphragme de la carpule, l'autre pénétrant les tissus du patient).",
          "Aiguilles d'anesthésie stériles à usage unique :",
          "• Aiguilles LONGUES (27G, 35-37 mm) : réservées à l'anesthésie loco-régionale tronculaire à l'épine de Spix.",
          "• Aiguilles MOYENNES À COURTES (30G, 13-23 mm) : utilisées pour les infiltrations locales para-apicales et intraseptales."
        ]
      },
      {
        title: "Pharmacologie : Doses Maximales Toxiques pour Adulte (70 kg)",
        content: [
          "Le respect strict des doses maximales est indispensable pour prévenir tout surdosage toxique cardiovasculaire et central :",
          "1. Articaïne AVEC vasoconstricteur (adrénaline) : 7 mg/kg, soit un maximum de 500 mg chez un adulte de 70 kg = 7 carpules à 1,7 ml.",
          "2. Articaïne SANS vasoconstricteur : 4 mg/kg, soit un maximum de 300 mg chez un adulte de 70 kg = 4 carpules à 1,7 ml.",
          "3. Mépivacaïne (avec ou sans vasoconstricteur) : dose maximale équivalente à 3,5 ampoules à 1,8 ml pour un adulte de 70 kg."
        ],
        keyPoints: [
          "Toujours aspirer avant d'injecter afin de s'assurer de l'absence d'effraction intravasculaire directe.",
          "Injecter lentement (environ 1 ml par minute) pour limiter la douleur et réduire le pic plasmatique brutal."
        ],
        table: {
          headers: ["Molécule Anesthésique", "Dose Max (mg/kg)", "Dose Max Totale (70 kg)", "Nb Max Carpules"],
          rows: [
            ["Articaïne + Vasoconstricteur", "7 mg/kg", "500 mg", "7 carpules de 1,7 ml"],
            ["Articaïne SANS Vasoconstricteur", "4 mg/kg", "300 mg", "4 carpules de 1,7 ml"],
            ["Mépivacaïne (± vaso)", "Variable selon forme", "Dose standard", "3,5 ampoules de 1,8 ml"]
          ]
        }
      },
      {
        title: "Techniques d'Anesthésie Selon le Secteur",
        content: [
          "1. Anesthésie Tronculaire à l'Épine de Spix (Loco-régionale) :",
          "Pratiquée UNIQUEMENT pour les molaires inférieures. Elle anesthésie le nerf alvéolaire inférieur dans l'espace ptérygo-mandibulaire avant son entrée dans le canal mandibulaire.",
          "Elle DOIT obligatoirement être associée à une infiltration locale complémentaire du NERF BUCCAL (dans le vestibule en regard de la dent à extraire) qui innerve la gencive vestibulaire des molaires inférieures.",
          "2. Infiltration Locale Para-apicale & Intraseptale :",
          "Pour toutes les autres dents (incisives, canines, prémolaires supérieures et inférieures, molaires supérieures) :",
          "Une infiltration vestibulaire combinée à une infiltration linguale/palatine para-apicale (± intraseptale dans le ligament/septum) s'avère amplement suffisante."
        ],
        imageKey: 'spix',
        warning: "La Spix n'anesthésie pas le nerf buccal ! Si l'infiltration du nerf buccal est omise, le patient ressentira une vive douleur lors du décollement ou de la prise des mors en vestibulaire."
      }
    ]
  },
  {
    id: "chapitre-4-protocole-operatoire",
    number: "04",
    title: "Protocole Opératoire Fondamental en 4 Temps",
    shortTitle: "Protocole en 4 Temps",
    slideRange: "Diapositives 22 à 50",
    summary: "Les quatre étapes clés d'une extraction dentaire : Syndesmotomie, Luxation (biomécanique levier & roue), Avulsion au Davier (Règle d'or maxillaire vs mandibule), Curetage alvéolaire et Hémostase.",
    sections: [
      {
        title: "Temps 1 : La Syndesmotomie",
        content: [
          "Définition : Geste chirurgical consistant à sectionner l'attache épithéliale et le ligament alvéolo-dentaire coronaire en insérant la pointe tranchante du syndesmotome entre la dent et la gencive marginale jusqu'au contact osseux.",
          "Tenue de l'instrument : Le syndesmotome est impérativement tenu COMME UN STYLO (prise en porte-plume).",
          "Point d'appui : L'opérateur prend obligatoirement un appui ferme avec les autres doigts de la main sur les dents voisines pour éviter tout dérapage accidentel.",
          "Instruments :",
          "• Le syndesmotome FAUCILLE est le principal instrument utilisé ; outre son rôle propre de section ligamentaire, il joue un rôle non négligeable dans la luxation primaire.",
          "• Les syndesmotomes droits (maxillaire) et coudés (mandibule) sont aujourd'hui délaissés.",
          "• Les syndesmotomes de Bernard (orientations variées) sont délaissés pour la syndesmotomie et réservés à la luxation des bouts d'apex résiduels."
        ]
      },
      {
        title: "Temps 2 : La Luxation & Principes Biomécaniques",
        content: [
          "Objectif : Élargir l'alvéole osseuse et rompre l'ensemble des fibres desmodontales avant l'application du davier.",
          "Technique pour une dent isolée :",
          "• Attention primordiale pour ne JAMAIS luxer la dent voisine saine !",
          "• Prendre un point d'appui ferme sur l'os vestibulaire du côté MÉSIAL.",
          "• Réaliser un demi-tour de rotation de l'instrument dans le sens inverse des aiguilles d'une montre en poussant l'élévateur vers l'arrière, puis répéter le mouvement.",
          "• La dent se mobilise progressivement dans le sens mésio-distal (MD).",
          "Règle des extractions multiples contiguës : Toujours commencer l'extraction par la dent la PLUS DISTALE afin de préserver en permanence un point d'appui osseux mésial pour la dent suivante.",
          "Principes physiques démontrés dans le cours :",
          "1. Effet de LEVIER (Mechanical Advantage = Longueur / Hauteur, ex. 10 mm / 4 mm = 2,5).",
          "2. Effet d'AXE DE ROUE (Wheel and axle, ex. 42 mm / 9 mm = 4,6 de gain mécanique).",
          "Types d'élévateurs : Élévateur droit (de loin le plus utilisé, différents calibres), élévateur de Coupland, Apexo droit, élévateur de Winter (triangulaire, pour racines résiduelles), élévateurs coudés et Crane Pick pour bouts d'apex."
        ],
        warning: "Ne jamais prendre appui sur une dent voisine saine avec l'élévateur ! Le point d'appui doit être l'os alvéolaire vestibulaire ou le septum osseux mésial."
      },
      {
        title: "Temps 3 : L'Avulsion au Davier & La Règle d'Or",
        content: [
          "Le davier est une pince robuste composée de deux parties réunies par une charnière :",
          "• Les MORS (partie active) : striés à l'intérieur pour maximiser l'adhérence sur le collet dentaire, concaves en dedans et convexes en dehors.",
          "• Les BRANCHES (partie passive) : tenues dans la paume de la main de l'opérateur.",
          "LA RÈGLE D'OR FONDAMENTALE :",
          "• Pour le MAXILLAIRE (haut) : Les mors et les branches sont situés DANS UNE MÊME LIGNE (alignement rectiligne).",
          "• Pour la MANDIBULE (bas) : Les deux parties forment entre elles UN ANGLE DROIT (90°)."
        ],
        table: {
          headers: ["Arcade", "Groupe Dentaire", "Caractéristiques du Davier Spécifique"],
          rows: [
            ["Maxillaire", "Incisives & Canines", "Davier DROIT (mors rectilignes ne se touchant pas)."],
            ["Maxillaire", "Prémolaires", "Davier coudé en S (permet de contourner la commissure labiale)."],
            ["Maxillaire", "Molaires Droite & Gauche", "Davier coudé spécifique avec ÉPERON vestibulaire sur un mors (s'insérant dans la furcation entre les 2 racines vestibulaires) et mors palatin lisse."],
            ["Maxillaire", "Dents de sagesse", "Davier en BAÏONNETTE à mors symétriques et non jointifs."],
            ["Maxillaire", "Bout de racine", "Davier en BAÏONNETTE à mors effilés et JOINTIFS."],
            ["Mandibule", "Incisives & Racines", "Davier à angle droit, mors EFFILÉS et JOINTIFS."],
            ["Mandibule", "Canines & Prémolaires", "Davier à angle droit, mors LARGES et NON JOINTIFS."],
            ["Mandibule", "Molaires", "Davier à mors symétriques possédant DEUX ÉPERONS (vestibulaire et lingual) s'adaptant dans l'espace inter-radiculaire."],
            ["Mandibule", "Dents de sagesse", "Davier avec mors en continuité directe avec les branches et coudés à leurs extrémités."],
            ["Dents de lait", "Dentition temporaire", "Daviers miniatures pédiatriques : droits en haut, coudés à angle droit en bas."]
          ]
        },
        keyPoints: [
          "Mouvements appliqués au davier :",
          "• Dents monoradiculées : Mouvement de ROTATION alternée droite et gauche.",
          "• Dents bi- et tri-radiculées : Mouvement de CIRCUMDUCTION (rotation plus ample pour dilater l'alvéole et rompre les fibres desmodontales réparties). Les mouvements de latéralité vestibulo-linguale pure sont très peu recommandés car ils fracturent les corticales."
        ],
        imageKey: 'daviers'
      },
      {
        title: "Temps 4 : Curetage Alvéolaire, Hémostase & Conseils Postopératoires",
        content: [
          "RÈGLES CAPITALES DU CURETAGE :",
          "• Le curetage alvéolaire N'EST INDIQUÉ QUE lorsque la dent présentait une affection apicale visualisée préalablement à la radiographie (granulome, kyste) !",
          "• Une dent sans atteinte parodontale apicale ou marginale (ex. dent saine extraite pour motif orthodontique, dent de sagesse saine) NE NÉCESSITE PAS de curetage alvéolaire.",
          "• Le curetage doit rester extrêmement prudent à proximité immédiate du plancher sinusien et du canal mandibulaire.",
          "• La curette alvéolaire (droite ou coudée) doit être parfaitement affûtée pour éliminer le tissu de granulation sans léser l'os sain.",
          "HÉMOSTASE :",
          "• Application d'une compresse de gaze stérile pliée sur l'alvéole, sur laquelle le patient DOIT MORDRE pendant 20 à 30 minutes consécutives, tout en avalant sa salive normalement.",
          "CONSEILS ET RECOMMANDATIONS POSTOPÉRATOIRES :",
          "• Ne pas fumer.",
          "• Ne pas rincer la bouche abondamment dans les premières 24 heures.",
          "• Ne PAS boire avec une paille pendant 24 heures (la dépression intra-buccale déloge le caillot sanguin naissant et réactive le saignement).",
          "• Éviter l'alcool et les bains de bouche alcoolisés pendant 24 heures.",
          "• Pas d'activité physique intense pendant 24 heures.",
          "• Ne pas cracher (favorise le saignement).",
          "• Privilégier une alimentation froide ou tiède et mixée (ne rien manger ou boire de trop chaud).",
          "• Dormir avec la tête surélevée.",
          "PRESCRIPTIONS POSTOPÉRATOIRES :",
          "• Antalgiques de palier 1 (paracétamol).",
          "• Bain de bouche antiseptique doux (débuté après 24h).",
          "• Les antibiotiques pour une extraction simple ne sont prescrits QUE pour les terrains spécifiquement prédisposés à l'infection."
        ],
        warning: "Le curetage intempestif d'une alvéole saine détruit le caillot physiologique et déclenche une alvéolite sèche !"
      }
    ]
  },
  {
    id: "chapitre-5-techniques-specifiques",
    number: "05",
    title: "Techniques Opératoires Spécifiques",
    shortTitle: "Techniques Spécifiques",
    slideRange: "Diapositives 51 à 55",
    summary: "Extractions multiples avec alvéolectomie et régularisation de la crête, techniques de récupération d'un bout d'apex fracturé, et séparation radiculaire à la fraise Zekrya.",
    sections: [
      {
        title: "Extractions Multiples & Régularisation de Crête",
        content: [
          "Lors de l'extraction de plusieurs dents adjacentes sur un même secteur d'arcade :",
          "L'intervention doit être systématiquement suivie d'une RÉGULARISATION DE LA CRÊTE OSSEUSE.",
          "Élimination méticuleuse des septa osseux interdentaires et des épines osseuses vestibulaires pointues à l'aide d'une PINCE GOUGE et d'une RÂPE À OS.",
          "Ce surfaçage osseux prévient les nécroses muqueuses sur crête vive et prépare l'arcade à la cicatrisation et à la future prothèse, complété par des points de suture stables."
        ]
      },
      {
        title: "Extraction d'un Bout d'Apex Fracturé",
        content: [
          "Lors de la fracture accidentelle de l'extrémité apicale d'une racine :",
          "Instrumentation préférentielle : Élévateurs coudés très fins, syndesmotome de Chompret.",
          "Technique endodontique au RACLEUR : Visser un racleur / tire-nerf endodontique à l'intérieur du canal pulpaire résiduel de l'apex fracturé pour le harponner et le tracter axialement hors de son logement alvéolaire.",
          "Règle d'abstention : S'abstenir de poursuivre l'extraction si l'apex est très profond, sans lésion infectieuse, et qu'un fraisage délabrant risquerait de léser un obstacle anatomique majeur (sinus maxillaire ou nerf dentaire)."
        ]
      },
      {
        title: "Séparation Radiculaire (Odontosection)",
        content: [
          "Indications absolues : Dents pluriradiculées délabrées sans prise coronaire, et/ou dents présentant des racines très divergentes ou recourbées s'opposant à l'axe de désinsertion.",
          "Technique pour Molaire Mandibulaire (inférieure) :",
          "Section bucco-linguale au niveau de la furcation à l'aide d'une FRAISE ZEKRYA montée sur turbine ou pièce à main chirurgicale sous irrigation abondante.",
          "Une fois les racines mésiale et distale individualisées, elles sont luxées séparément et extraites facilement comme deux dents monoradiculées à l'aide d'un élévateur droit ou de Winter.",
          "Technique pour Molaire Maxillaire (supérieure) :",
          "Séparation en 'T' ou 'Y' séparant la volumineuse racine palatine des deux racines vestibulaires (mésio-vestibulaire et disto-vestibulaire)."
        ],
        imageKey: 'zekrya'
      }
    ]
  },
  {
    id: "chapitre-6-complications",
    number: "06",
    title: "Atlas des Complications Per- et Post-opératoires",
    shortTitle: "Atlas Complications",
    slideRange: "Diapositives 56 à 85",
    summary: "Panorama exhaustif des incidents et accidents : complications de l'anesthésie, accidents muqueux, dentaires, osseux et nerveux, bris d'aiguille, CBS, emphysème, luxation ATM, alvéolites sèche/suppurée, cellulites et endocardite.",
    sections: [
      {
        title: "Complications Liées à l'Anesthésie",
        content: [
          "1. Bris d'aiguille : Rare, survient surtout si l'aiguille est trop fine ou lors d'un mouvement brusque du patient ; extirper immédiatement le fragment cassé sous un bon éclairage avec une pince hémostatique.",
          "2. Douleur passagère : Blessure directe d'un filet nerveux lors de la pénétration de l'aiguille ou injection trop rapide sous forte pression.",
          "3. Paralysie faciale transitoire sans gravité : Provoquée par une injection trop postérieure lors d'une Spix ; la solution anesthésique gagne la loge parotidienne et paralyse le nerf facial (VII). Résolution spontanée complète en quelques heures.",
          "4. Toxicité par surdosage : Concentration excessive, injection intravasculaire accidentelle, injection dans un tissu inflammatoire hyper-vascularisé (très rare).",
          "5. Lipothymie ou malaise vagal : Favorisé par le stress, la faim, la position assise et une injection trop rapide ; peut évoluer vers une syncope chez les sujets vagotoniques ou coronariens.",
          "6. Échec de l'anesthésie locale : Fréquent en tissu infecté acide (le pH acide inactive la fraction non-ionisée de l'anesthésique)."
        ]
      },
      {
        title: "Accidents Muqueux & Préventions",
        content: [
          "• Lésion de la commissure labiale : Causée par une traction excessive et prolongée de l'écarteur. Prévention : enduction de vaseline sur les lèvres du patient avant l'intervention.",
          "• Brûlure labiale : Frottement direct de la tête de la pièce à main rotative non protégée sur la lèvre insensibilisée par l'anesthésie. Prévention : protection rigoureuse de la lèvre par un écarteur.",
          "• Dérapage instrumental : Plaie de la muqueuse vestibulaire ou linguale. Le dérapage lingual est particulièrement grave car il peut sectionner le NERF LINGUAL en postérieur ou dilacérer le plancher buccal en antérieur. Prévention : prise d'un point d'appui digital strict, interdiction formelle de force démesurée sans appui."
        ]
      },
      {
        title: "Accidents Dentaires",
        content: [
          "• Fracture de la couronne : Mauvais point d'appui de l'élévateur, dent fragilisée par la carie ou ankylosée. Prévention : insérer l'instrument sur un appui osseux solide et le plus profondément possible.",
          "• Fracture ou mobilisation de la dent voisine / expulsion d'un plombage voisin : Causée par l'appui fautif de l'élévateur sur la dent voisine avec mouvements de luxation non contrôlés. Prévention : appui sur le septum osseux mésial. Si luxation : contention immédiate et immobilisation de la dent luxée.",
          "• Fracture d'un apex : Fréquente sur racines grêles, coudées ou après traitement canalaire ancien. Prévention : séparation radiculaire préalable. CAT : retirer l'apex s'il est mobile et accessible ; s'abstenir s'il est profond, sain et à proximité d'un obstacle vital (sinus, nerf)."
        ]
      },
      {
        title: "Accidents Osseux & Nerveux",
        content: [
          "• Fracture de la tubérosité maxillaire : Lors de la luxation forcée d'une dent de sagesse supérieure. CAT : éliminer le fragment s'il est mobile et de petite taille ; réappliquer et stabiliser par suture s'il est volumineux et encore solidaire de la muqueuse.",
          "• Fracture de l'angle mandibulaire : Rare mais gravissime. Survient sur mandibule atrophique ou dent incluse profonde après luxation forcée à l'élévateur. Prévention : section de la dent, alvéolectomie mesurée, coronectomie.",
          "• Fracture de l'os alvéolaire vestibulaire : Paroi fine emportée lors d'un mouvement mal contrôlé.",
          "• Lésion du nerf alvéolaire inférieur : Provoque une hypoesthésie labio-mentonnière homolatérale (signe de Vincent). Prévention : imagerie préopératoire précise. Traitement : informer le patient de l'évolution sur plusieurs semaines, complexe vitaminique B1, B6, B12."
        ]
      },
      {
        title: "Projections Dentaires, CBS, Emphysème & Luxation ATM",
        content: [
          "• Projection dans les voies aériennes : ACCIDENT GRAVE, URGENCE VITALE ! Manœuvre de Heimlich immédiate si détresse respiratoire et échec de la toux expulsive.",
          "• Projection dans les voies digestives : Surveillance clinique des selles.",
          "• Projection dans le sinus maxillaire : Dent antrale ou racine expulsée dans le sinus. Localisation radiologique, tentative d'abord alvéolaire ou abord de Caldwell-Luc.",
          "• Communication bucco-sinusienne (CBS) : Effraction du plancher sinusien. CAT : nettoyage doux et fermeture hermétique par traction d'un lambeau vestibulaire de glissement.",
          "• Emphysème sous-cutané : Infiltration d'air sous pression le long de l'aiguille ou par la turbine/seringue à air dans les tissus mous. Tuméfaction dure, crépitante sous les doigts, se déplaçant à la palpation. Régresse en quelques jours mais surveillance hospitalière obligatoire si extension médiastinale.",
          "• Luxation de l'ATM (Temporo-Mandibulaire) : Si la mandibule n'est pas soutenue par la main libre du praticien. Le condyle passe en avant du tubercule temporal ; bouche grande ouverte bloquée. Réduction manuelle immédiate par la MANŒUVRE DE NÉLATON (pouces sur les molaires, pression vers le bas puis vers l'arrière)."
        ]
      },
      {
        title: "Complications Postopératoires : Alvéolites & Infections",
        content: [
          "1. Alvéolite SÈCHE (fibrinolytique) :",
          "Apparition typique à 48-72 heures (voire 4e jour) après l'extraction. Douleurs vives, continues, pulsatiles, insomniantes et irradiant à toute l'hémiface. Examen : alvéole déshabitée, absence de caillot ou résidu brun fétide éliminé, parois osseuses blanc grisâtre dénudées et exsangues, hypersensibles au moindre souffle d'air. Traitement : nettoyer délicatement, recréer un saignement pour générer un nouveau caillot de bonne qualité, pansement sédatif alvéolaire.",
          "2. Alvéolite SUPPURÉE :",
          "Alvéole comblée de tissu de granulation inflammatoire bourgeonnant, halitose fétide, écoulement de pus, adénopathie satellite et trismus possible. Traitement : curetage sous anesthésie locale, révision soignée des parois alvéolaires, antibiothérapie de consolidation.",
          "3. Cellulites Cervico-Faciales :",
          "Infection aiguë des espaces cellulaires de la face (séreuse puis suppurée). Tuméfaction cutanée douloureuse, asymétrie faciale majeure, trismus, risque de diffusion aux espaces profonds du cou. Traitement : antibiothérapie, incision chirurgicale cutanée ou muqueuse centrée sur la collection, évacuation du pus, débridement, lavage abondant (Bétadine, sérum physiologique, eau oxygénée) et drainage.",
          "4. Ostéites des maxillaires :",
          "Affection inflammatoire du tissu osseux (formes minimes médicales, formes étendues médico-chirurgicales).",
          "5. Complications à distance : ENDOCARDITE INFECTIEUSE D'OSLER :",
          "Bactériémie streptococcique post-extractionnelle avec greffe sur endocarde ou valves cardiaques lésées (65% des cas chez des porteurs de cardiopathies connues sans antibioprophylaxie)."
        ],
        imageKey: 'alveolite'
      },
      {
        title: "Complications Hémorragiques & Mesures Locales",
        content: [
          "Causes locales : plaie muqueuse non suturée, absence de révision alvéolaire, geste iatrogène avec lésion vasculaire, bains de bouche précoces ou succion alvéolaire désorganisant le caillot.",
          "Traitement chez le sujet sain sans anomalie de l'hémostase :",
          "• Mèche de gaze simple non résorbable imprégnée ou non d'antihémostatique, tassée pli par pli de la profondeur à la surface.",
          "• Tamponnement avec biomatériau résorbable : mèches de cellulose oxydée régénérée (Surgicel) ou éponges de gélatine (Ceraspon).",
          "• Gouttière hémostatique extemporanée thermoformée ou en silicone élastomère comprimant le site."
        ]
      }
    ]
  }
];
