import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Tag } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  slideRef: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Exodontie / Avulsion / Extraction",
    category: "Définition Fondamentale",
    definition: "Termes strictement synonymes désignant l'acte chirurgical d'ablation d'une dent hors de son alvéole. Geste fréquent mais qui ne constitue jamais une « petite opération ».",
    slideRef: "Diapositive 3"
  },
  {
    term: "Syndesmotomie",
    category: "Geste Chirurgical",
    definition: "Premier temps fondamental consistant à sectionner l'attache épithéliale et le ligament alvéolo-dentaire jusqu'au contact osseux. Réalisé avec le syndesmotome tenu en porte-plume (stylo) avec appui digital ferme.",
    slideRef: "Diapositive 24"
  },
  {
    term: "Règle d'or des Daviers",
    category: "Instrumentation",
    definition: "Principe géométrique universel : pour le Maxillaire (haut), mors et branches sont situés dans une même ligne (180°). Pour la Mandibule (bas), mors et branches forment un angle droit (90°).",
    slideRef: "Diapositive 40"
  },
  {
    term: "Épine de Spix (Spina mandibularis)",
    category: "Anatomie & Anesthésie",
    definition: "Repère osseux situé sur la face interne de la branche montante mandibulaire marquant l'orifice supérieur du canal dentaire. Cible de l'anesthésie tronculaire des molaires inférieures, obligatoirement complétée par l'infiltration du nerf buccal.",
    slideRef: "Diapositive 23, 57"
  },
  {
    term: "Alvéolite Sèche (Fibrinolytique)",
    category: "Pathologie Post-op",
    definition: "Complication survenant à 48-72h caractérisée par une fibrinolyse du caillot sanguin, provoquant des douleurs atroces, continues, insomniantes et irradiant à l'hémiface. L'alvéole est béante et les parois osseuses blanc grisâtre sont dénudées.",
    slideRef: "Diapositive 72"
  },
  {
    term: "Manœuvre de Nélaton",
    category: "Geste d'Urgence",
    definition: "Manœuvre manuelle de réduction d'une luxation de l'ATM survenue au fauteuil. Le praticien pose ses pouces sur les molaires inférieures du patient et exerce une pression vigoureuse vers le bas pour abaisser les condyles mandibulaires, puis vers l'arrière.",
    slideRef: "Diapositive 69"
  },
  {
    term: "Fraise Zekrya",
    category: "Instrumentation",
    definition: "Fraise chirurgicale fine et conique en carbure de tungstène utilisée pour l'odontosection (séparation des racines de molaires délabrées ou divergentes au niveau de la furcation) sous irrigation stérile continue.",
    slideRef: "Diapositive 54-55"
  },
  {
    term: "Élévateur de Winter",
    category: "Instrumentation",
    definition: "Élévateur triangulaire muni d'un manche transversal en T développant un effet d'axe de roue (gain mécanique x4.6), réservé à la luxation puissante des racines résiduelles après séparation radiculaire.",
    slideRef: "Diapositive 27, 37"
  },
  {
    term: "Communication Bucco-Sinusienne (CBS)",
    category: "Complications",
    definition: "Brèche créée entre la cavité buccale et le sinus maxillaire, fréquente lors de l'extraction de molaires maxillaires antro-adjacentes ou après curetage intempestif. Nécessite une fermeture étanche par lambeau vestibulaire tracté.",
    slideRef: "Diapositive 68"
  },
  {
    term: "Emphysème Sous-Cutané",
    category: "Complications",
    definition: "Pénétration accidentelle d'air comprimé dans les tissus celluleux sous-cutanés par une seringue à air ou une turbine. Se manifeste par un gonflement immédiat crépitant sous les doigts. Nécessite une surveillance hospitalière si diffusion vers le médiastin.",
    slideRef: "Diapositive 68"
  },
  {
    term: "Pince Gouge & Râpe à Os",
    category: "Instrumentation",
    definition: "Instruments de remodelage osseux employés lors d'extractions multiples pour régulariser la crête alvéolaire et éliminer les épines osseuses pointues avant de suturer.",
    slideRef: "Diapositive 52"
  },
  {
    term: "Surgicel / Éponge de Gélatine",
    category: "Hémostase",
    definition: "Matériaux hémostatiques résorbables insérés au fond de l'alvéole en cas de saignement persistant chez un sujet sous traitement antiagrégant ou anticoagulant.",
    slideRef: "Diapositive 81-82"
  }
];

export const GlossaryModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = GLOSSARY_TERMS.filter((t) =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-7 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-400 font-medium uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lexique Chirurgical Officiel</span>
            <span aria-hidden="true">·</span>
            <span>Terminologie du Cours</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Glossaire & Formules Clés
          </h2>
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un terme (ex: Spix, Zekrya...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{item.slideRef}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">{item.term}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
