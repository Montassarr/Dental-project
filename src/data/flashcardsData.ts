/**
 * Cartes de Révision Rapide (Flashcards)
 * Cours : Pr Ag Adel BOUGUEZZI (Clinique Dentaire de Monastir)
 */

export interface Flashcard {
  id: number;
  category: string;
  front: string;
  back: string;
  slideRef: string;
}

export const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    category: "Règle d'or Daviers",
    front: "Quelle est la règle d'or d'angulation entre mors et branches d'un davier ?",
    back: "• Maxillaire : Les mors et les branches sont alignés sur une même ligne (180°).\n• Mandibule : Les mors et les branches forment un angle droit (90°).",
    slideRef: "Diapositive 40"
  },
  {
    id: 2,
    category: "Pharmacologie 70 kg",
    front: "Doses maximales d'Articaïne (avec et sans vasoconstricteur) chez l'adulte de 70 kg ?",
    back: "• Articaïne AVEC vaso : 7 mg/kg max 500 mg = 7 ampoules à 1,7 ml.\n• Articaïne SANS vaso : 4 mg/kg max 300 mg = 4 ampoules à 1,7 ml.",
    slideRef: "Diapositive 17"
  },
  {
    id: 3,
    category: "Anesthésie Spix",
    front: "Quel nerf accessoire doit impérativement être anesthésié lors d'une Spix ?",
    back: "Le NERF BUCCAL, par infiltration locale dans le vestibule en regard de la molaire inférieure (la Spix seule ne l'anesthésie pas).",
    slideRef: "Diapositive 23"
  },
  {
    id: 4,
    category: "Protocole Opératoire",
    front: "Quelle est la règle d'ordre lors d'extractions multiples adjacentes ?",
    back: "Toujours commencer par la dent la PLUS DISTALE afin de préserver en permanence un point d'appui osseux mésial pour la dent suivante.",
    slideRef: "Diapositive 26"
  },
  {
    id: 5,
    category: "Biomécanique",
    front: "Quels sont les deux effets physiques exploités lors de la luxation à l'élévateur ?",
    back: "1. Effet de LEVIER (Mechanical advantage = L/H = ex. 10/4 = 2,5).\n2. Effet d'AXE DE ROUE (Wheel and axle = R/r = ex. 42/9 = 4,6).",
    slideRef: "Diapositives 36-37"
  },
  {
    id: 6,
    category: "Curetage",
    front: "Quand doit-on réaliser un curetage alvéolaire ?",
    back: "UNIQUEMENT en présence d'une affection apicale visualisée à la radio (granulome, kyste). Interdit et proscrit sur alvéole saine (risque d'alvéolite sèche).",
    slideRef: "Diapositive 46"
  },
  {
    id: 7,
    category: "Urgences & Gestes",
    front: "Quelle est la manœuvre de réduction d'une luxation de l'ATM au fauteuil ?",
    back: "La MANŒUVRE DE NÉLATON : pouces protégés sur les molaires inférieures, pression vers le bas pour abaisser le condyle, puis vers l'arrière.",
    slideRef: "Diapositive 69"
  },
  {
    id: 8,
    category: "Pathologie Post-op",
    front: "Quels sont les signes cardinaux de l'alvéolite sèche (fibrinolytique) ?",
    back: "Apparition à J2-J4, douleurs violentes insomniantes pulsatiles irradiant à l'hémiface, alvéole déshabitée sans caillot, parois osseuses grisâtres exsangues hypersensibles.",
    slideRef: "Diapositive 72"
  },
  {
    id: 9,
    category: "Chirurgie Radiculaire",
    front: "Quel instrument rotatif utilise-t-on pour la séparation des racines des molaires ?",
    back: "La FRAISE ZEKRYA chirurgicale sous irrigation abondante (permet d'individualiser les racines avant luxation au Winter).",
    slideRef: "Diapositives 54-55"
  },
  {
    id: 10,
    category: "Antibioprophylaxie",
    front: "Citez 4 indications majeures d'antibioprophylaxie en chirurgie buccale.",
    back: "1. Cardiopathie à risque d'endocardite infectieuse d'Osler.\n2. Immunodépression (diabète sévère, chimio, corticoïdes long cours).\n3. Antécédent d'irradiation cervico-faciale.\n4. Traitement par bisphosphonates.",
    slideRef: "Diapositive 7"
  }
];
