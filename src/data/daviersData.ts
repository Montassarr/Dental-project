/**
 * Données complètes des instruments d'avulsion (Daviers & Élévateurs)
 * Basé sur les diapositives 39 à 45 du cours de Pr Ag Adel BOUGUEZZI
 */

export interface ForcepsInstrument {
  id: string;
  name: string;
  arcade: 'maxillaire' | 'mandibulaire' | 'pediatrique';
  targetTeeth: string;
  teethCodes: number[];
  beakCharacteristics: string;
  jointType: 'jointifs' | 'non_jointifs';
  actionMovement: 'rotation' | 'circumduction';
  description: string;
  slideRef: string;
}

export const GOLDEN_RULES = {
  maxillaire: "Pour le maxillaire : les mors et les branches sont situés dans une même ligne (alignement rectiligne 180°).",
  mandibule: "Pour la mandibule : les deux parties forment entre elles un angle droit (90°)."
};

export const FORCEPS_LIST: ForcepsInstrument[] = [
  {
    id: "davier-max-incisives-canines",
    name: "Davier droit maxillaire",
    arcade: "maxillaire",
    targetTeeth: "Incisives centrales, latérales et canines supérieures (11, 12, 13, 21, 22, 23)",
    teethCodes: [11, 12, 13, 21, 22, 23],
    beakCharacteristics: "Mors rectilignes dans le prolongement des branches, ne se touchant pas (non jointifs)",
    jointType: "non_jointifs",
    actionMovement: "rotation",
    description: "Aligné avec les branches. Permet une préhension axiale ferme. Le mouvement appliqué est une rotation alternée droite-gauche car les racines sont coniques et monoradiculées.",
    slideRef: "Diapositive 41"
  },
  {
    id: "davier-max-premolaires",
    name: "Davier coudé en S maxillaire",
    arcade: "maxillaire",
    targetTeeth: "Prémolaires supérieures (14, 15, 24, 25)",
    teethCodes: [14, 15, 24, 25],
    beakCharacteristics: "Double courbure en S pour contourner la commissure labiale, mors symétriques non jointifs",
    jointType: "non_jointifs",
    actionMovement: "circumduction",
    description: "La courbure en S évite la blessure de la commissure des lèvres. Utilisé avec un mouvement combiné ou de circumduction (la 1ère prémolaire supérieure possède souvent deux racines fines).",
    slideRef: "Diapositive 41"
  },
  {
    id: "davier-max-molaire-droite",
    name: "Davier molaire maxillaire droite (N°17)",
    arcade: "maxillaire",
    targetTeeth: "1ère et 2ème molaires maxillaires droites (16, 17)",
    teethCodes: [16, 17],
    beakCharacteristics: "Mors vestibulaire doté d'un ÉPERON pointu (furcation entre les 2 racines vestibulaires) et mors palatin concave lisse",
    jointType: "non_jointifs",
    actionMovement: "circumduction",
    description: "Asymétrique. L'éperon s'engage obligatoirement dans la bifurcation vestibulaire (racines mésio- et disto-vestibulaires). Mouvement de circumduction ample pour dilater les 3 corticales.",
    slideRef: "Diapositive 41"
  },
  {
    id: "davier-max-molaire-gauche",
    name: "Davier molaire maxillaire gauche (N°18)",
    arcade: "maxillaire",
    targetTeeth: "1ère et 2ème molaires maxillaires gauches (26, 27)",
    teethCodes: [26, 27],
    beakCharacteristics: "Mors vestibulaire avec éperon pour furcation vestibulaire gauche, mors palatin concave arrondi",
    jointType: "non_jointifs",
    actionMovement: "circumduction",
    description: "Symétrique inverse du davier droit. Nécessite une insertion sous-gingivale profonde pour rapprocher le levier du centre de résistance radiculaire.",
    slideRef: "Diapositive 41"
  },
  {
    id: "davier-max-sagesse",
    name: "Davier en baïonnette pour sagesse maxillaire",
    arcade: "maxillaire",
    targetTeeth: "3èmes molaires maxillaires / Dents de sagesse supérieures (18, 28)",
    teethCodes: [18, 28],
    beakCharacteristics: "Forme en baïonnette avec double décrochement, mors symétriques et non jointifs",
    jointType: "non_jointifs",
    actionMovement: "circumduction",
    description: "Le décrochement en baïonnette permet d'atteindre le fond du vestibule tubérositaire sans être gêné par les dents antérieures. Attention au risque de fracture de la tubérosité.",
    slideRef: "Diapositive 41"
  },
  {
    id: "davier-max-racines",
    name: "Davier en baïonnette pour racines maxillaires",
    arcade: "maxillaire",
    targetTeeth: "Bouts de racines maxillaires (toutes dents du haut)",
    teethCodes: [100], // code générique
    beakCharacteristics: "Forme en baïonnette à mors effilés, fins et parfaitement JOINTIFS",
    jointType: "jointifs",
    actionMovement: "rotation",
    description: "Mors fins et pointus capables de glisser entre la corticale osseuse et la racine résiduelle pour pincer solidement l'apex sans broyer la corticale.",
    slideRef: "Diapositive 41"
  },
  {
    id: "davier-mand-incisives-racines",
    name: "Davier mandibulaire à mors effilés jointifs",
    arcade: "mandibulaire",
    targetTeeth: "Incisives mandibulaires et racines inférieures (31, 32, 41, 42)",
    teethCodes: [31, 32, 41, 42],
    beakCharacteristics: "Angle droit à 90°, mors très fins, étroits, effilés et JOINTIFS",
    jointType: "jointifs",
    actionMovement: "rotation",
    description: "Les mors étroits s'adaptent à la faible largeur mésio-distale des incisives inférieures très serrées. Mouvement de rotation alternée douce avec maintien digital des corticales.",
    slideRef: "Diapositive 42"
  },
  {
    id: "davier-mand-canine-premolaire",
    name: "Davier mandibulaire à mors larges (N°13)",
    arcade: "mandibulaire",
    targetTeeth: "Canines et prémolaires inférieures (33, 34, 35, 43, 44, 45)",
    teethCodes: [33, 34, 35, 43, 44, 45],
    beakCharacteristics: "Angle droit à 90°, mors larges, concaves et NON JOINTIFS",
    jointType: "non_jointifs",
    actionMovement: "rotation",
    description: "Embrasse le collet cylindro-conique des canines et prémolaires. Mouvement de rotation alternée droite-gauche pour rompre l'attache conjonctive.",
    slideRef: "Diapositive 42"
  },
  {
    id: "davier-mand-molaires",
    name: "Davier molaire mandibulaire à 2 éperons (N°22)",
    arcade: "mandibulaire",
    targetTeeth: "1ère et 2ème molaires inférieures (36, 37, 46, 47)",
    teethCodes: [36, 37, 46, 47],
    beakCharacteristics: "Angle droit à 90°, mors symétriques possédant CHACUN un éperon médian (vestibulaire et lingual)",
    jointType: "non_jointifs",
    actionMovement: "circumduction",
    description: "Les deux éperons s'engagent simultanément dans la furcation inter-radiculaire mésio-distale. Mouvement de circumduction ample tout en maintenant fermement la mandibule d'une main.",
    slideRef: "Diapositive 42"
  },
  {
    id: "davier-mand-sagesse",
    name: "Davier pour dent de sagesse mandibulaire (N°79)",
    arcade: "mandibulaire",
    targetTeeth: "3èmes molaires mandibulaires / Sagesse inférieures (38, 48)",
    teethCodes: [38, 48],
    beakCharacteristics: "Mors dans le prolongement de la courbure des branches, coudés spécifiquement à leurs extrémités",
    jointType: "non_jointifs",
    actionMovement: "circumduction",
    description: "Conçu pour aborder la région rétro-molaire sans butter contre le bord antérieur de la branche montante mandibulaire. Soutien impératif de la mandibule pour éviter la luxation de l'ATM.",
    slideRef: "Diapositive 42"
  },
  {
    id: "davier-pediatrique",
    name: "Daviers pédiatriques pour dents de lait",
    arcade: "pediatrique",
    targetTeeth: "Dents temporaires (dents de lait avec persistance anormale)",
    teethCodes: [51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85],
    beakCharacteristics: "Miniatures : droits pour le haut, coudés à angle droit pour le bas",
    jointType: "non_jointifs",
    actionMovement: "rotation",
    description: "Utilisation réservée aux dents temporaires dont la mobilité est limitée malgré la résorption radiculaire. Ne jamais léser le germe sous-jacent de la dent permanente !",
    slideRef: "Diapositive 45"
  }
];

export const ELEVATORS_LIST = [
  {
    id: "elevateur-droit",
    name: "Élévateur droit (Straight elevator)",
    type: "Droit",
    frequency: "De loin le plus utilisé en pratique quotidienne",
    indication: "Luxation initiale de presque toutes les dents, prise d'appui mésiale sur la corticale osseuse.",
    grip: "Le manche est tenu dans la paume de la main ; la concavité de la partie active est orientée vers la face mésiale de la dent.",
    slideRef: "Diapositives 27-30"
  },
  {
    id: "elevateur-winter",
    name: "Élévateur de Winter (Triangulaire)",
    type: "Triangulaire à poignée en T",
    frequency: "Indication ciblée",
    indication: "Luxation des racines résiduelles de molaires après séparation radiculaire à la fraise Zekrya.",
    grip: "Poignée transversale en T développant un couple de rotation très puissant (axe de roue).",
    slideRef: "Diapositives 27, 33, 55"
  },
  {
    id: "elevateur-coude-chompret",
    name: "Élévateurs coudés / Syndesmotome de Chompret",
    type: "Coudé",
    frequency: "Chirurgical spécifique",
    indication: "Luxation et extraction des bouts d'apex inaccessibles au fond de l'alvéole.",
    grip: "Doigté fin, délicatesse extrême pour ne pas propulser l'apex dans le canal mandibulaire ou le sinus maxillaire.",
    slideRef: "Diapositives 27, 53"
  },
  {
    id: "elevateur-coupland",
    name: "Élévateur de Coupland",
    type: "Droit à biseau gouge",
    frequency: "Usage fréquent",
    indication: "Effet de coin puissant pour ouvrir l'espace parodontal et repousser la racine.",
    grip: "Appui axial contrôlé.",
    slideRef: "Diapositive 31"
  },
  {
    id: "elevateur-crane-pick",
    name: "Élévateur Crane Pick",
    type: "Pick type (bec perforant)",
    frequency: "Usage spécifique",
    indication: "Engagé dans un point d'appui préparé dans la dent pour exercer une force d'expulsion axiale vers le haut.",
    grip: "Levier de premier genre avec point d'appui sur la crête osseuse.",
    slideRef: "Diapositive 35"
  }
];
