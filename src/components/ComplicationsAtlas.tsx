import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, HeartPulse, Activity, Zap, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import drySocketImg from '../assets/images/alveolitis_dry_socket_1791482266653.jpg';
import spixImg from '../assets/images/mandibular_nerve_spix_1791482253917.jpg';

interface ComplicationItem {
  id: string;
  name: string;
  timing: 'per-opératoire' | 'post-opératoire';
  system: 'anesthésie' | 'muqueux' | 'dentaire' | 'osseux' | 'nerveux' | 'infectieux' | 'hémorragique' | 'urgence';
  severity: 'bénin' | 'modéré' | 'grave' | 'urgence_vitale';
  clinicalSigns: string[];
  causes: string[];
  prevention: string[];
  treatment: string[];
  slideRef: string;
  image?: string;
}

const COMPLICATIONS_DATA: ComplicationItem[] = [
  {
    id: "alveolite-seche",
    name: "Alvéolite Sèche (Fibrinolytique)",
    timing: "post-opératoire",
    system: "infectieux",
    severity: "modéré",
    clinicalSigns: [
      "Apparition à 48-72 heures (voire 4ème jour post-opératoire).",
      "Douleurs vives, intolérables, continues et pulsatiles, insomniantes.",
      "Douleurs irradiant à toute l'hémiface.",
      "Alvéole béante, déshabitée, absence de caillot sanguin ou élimination d'un débris brun fétide.",
      "Parois osseuses d'un blanc grisâtre, exsangues, dénudées et hypersensibles au moindre contact."
    ],
    causes: [
      "Perturbation de cicatrisation par altération ou fibrinolyse précoce du caillot sanguin initial.",
      "Succion intempestive, bains de bouche trop précoces ou curetage intempestif d'une alvéole saine."
    ],
    prevention: [
      "Respect scrupuleux du caillot sanguin.",
      "Interdiction formelle de fumer, cracher, boire à la paille ou rincer pendant 24h.",
      "Aucun curetage en l'absence de pathologie apicale radio-visible."
    ],
    treatment: [
      "Nettoyer délicatement l'alvéole au sérum tiède sans curetage agressif des parois.",
      "Recréer les conditions de formation d'un nouveau caillot de bonne qualité.",
      "Pansement sédatif alvéolaire résorbable, antalgiques."
    ],
    slideRef: "Diapositive 72",
    image: drySocketImg
  },
  {
    id: "alveolite-suppuree",
    name: "Alvéolite Suppurée",
    timing: "post-opératoire",
    system: "infectieux",
    severity: "modéré",
    clinicalSigns: [
      "Halitose fétide marquée.",
      "Alvéole comblée de débris nauséabonds et de tissu de granulation inflammatoire bourgeonnant.",
      "Écoulement purulent à la pression, alvéole douloureuse au toucher.",
      "Gencive péri-alvéolaire inflammatoire, adénopathie satellite et trismus possible."
    ],
    causes: [
      "Infection bactérienne secondaire de l'alvéole par rétention de débris alimentaires ou surinfection."
    ],
    prevention: [
      "Asepsie rigoureuse, rinçage antiseptique préopératoire, élimination de tout foyer résiduel."
    ],
    treatment: [
      "Curetage minutieux du tissu infecté et révision soigneuse des parois alvéolaires sous anesthésie.",
      "Antibiothérapie de quelques jours pour abréger et consolider les suites opératoires."
    ],
    slideRef: "Diapositive 74"
  },
  {
    id: "cellulite-faciale",
    name: "Cellulites Cervico-Faciales Aiguës",
    timing: "post-opératoire",
    system: "infectieux",
    severity: "grave",
    clinicalSigns: [
      "Tuméfaction faciale asymétrique, chaude, douloureuse, érythémateuse.",
      "Stade séreux puis collection suppurée fluctuante.",
      "Trismus souvent serré, fébricule ou fièvre, altération de l'état général."
    ],
    causes: [
      "Ensemencement bactérien du tissu celluleux péri-maxillaire en per-opératoire ou diffusion d'un foyer apical."
    ],
    prevention: [
      "Conditions d'asepsie maximales, médication anti-infectieuse adaptée sur terrain prédisposé."
    ],
    treatment: [
      "Incision chirurgicale centrée sur la collection.",
      "Évacuation complète du pus et débridement des loges.",
      "Lavage chirurgical abondant (Bétadine, sérum physiologique, eau oxygénée) et drainage.",
      "Antibiothérapie par voie générale et surveillance stricte."
    ],
    slideRef: "Diapositives 75-76"
  },
  {
    id: "endocardite-osler",
    name: "Endocardite Infectieuse d'Osler",
    timing: "post-opératoire",
    system: "infectieux",
    severity: "grave",
    clinicalSigns: [
      "Complication infectieuse à distance touchant l'endocarde et les valves cardiaques.",
      "Fièvre inexpliquée, souffle cardiaque nouveau ou modifié, altération de l'état général.",
      "Diagnostic : hémocultures positives, échocardiographie."
    ],
    causes: [
      "Bactériémie streptococcique post-extractionnelle avec fixation sur le cœur (65% des cas chez des patients avec cardiopathie connue sans antibioprophylaxie)."
    ],
    prevention: [
      "ANTIBIOPROPHYLAXIE OBLIGATOIRE chez les porteurs de prothèses valvulaires, cardiopathies congénitales ou valvulopathies mitrales/aortiques."
    ],
    treatment: [
      "Hospitalisation en cardiologie / réanimation, antibiothérapie intraveineuse ciblée à fortes doses pendant plusieurs semaines."
    ],
    slideRef: "Diapositive 80"
  },
  {
    id: "projection-voies-aeriennes",
    name: "Projection Dentaire dans les Voies Aériennes",
    timing: "per-opératoire",
    system: "urgence",
    severity: "urgence_vitale",
    clinicalSigns: [
      "Quinte de toux brutale, suffocation, stridor, cyanose, détresse respiratoire aiguë immédiate."
    ],
    causes: [
      "Échappement d'une dent, d'une couronne ou d'un fragment radiculaire de la pince sans protection du carrefour pharyngé."
    ],
    prevention: [
      "Pose de compresses pharyngées de protection lors de l'avulsion, aspiration continue au contact."
    ],
    treatment: [
      "URGENCE VITALE : Encourager la toux réflexe.",
      "En cas d'asphyxie et détresse respiratoire : MANŒUVRE DE HEIMLICH IMMÉDIATE !",
      "Appel du SAMU / transfert en urgence pour bronchoscopie d'extraction."
    ],
    slideRef: "Diapositive 66"
  },
  {
    id: "luxation-atm-nelaton",
    name: "Luxation Temporo-Mandibulaire (ATM)",
    timing: "per-opératoire",
    system: "urgence",
    severity: "modéré",
    clinicalSigns: [
      "Bouche grande ouverte bloquée, impossibilité de fermer la bouche ou de déglutir.",
      "Condyle mandibulaire passé en avant du tubercule temporal (processus temporal).",
      "Douleur vive pré-tragienne bilatérale."
    ],
    causes: [
      "Ouverture buccale forcée ou prolongée sans soutien de la mandibule par la main libre du praticien."
    ],
    prevention: [
      "Maintenir et soutenir fermement la mandibule pendant tous les mouvements d'élévateur ou de davier."
    ],
    treatment: [
      "MANŒUVRE DE NÉLATON : praticien face au patient, pouces posés sur la face occlusale des molaires inférieures (protégés par des compresses), pression vigoureuse dirigée vers le bas pour abaisser les condyles, puis vers l'arrière.",
      "Repos de l'ATM quelques jours, alimentation semi-liquide."
    ],
    slideRef: "Diapositive 69"
  },
  {
    id: "lesion-nerf-alveolaire",
    name: "Lésion du Nerf Alvéolaire Inférieur",
    timing: "per-opératoire",
    system: "nerveux",
    severity: "grave",
    clinicalSigns: [
      "Hypoesthésie ou anesthésie labio-mentonnière homolatérale (lèvre inférieure et menton engourdis).",
      "Paresthésies, dysesthésies douloureuses."
    ],
    causes: [
      "Tentative agressive d'extraction d'un apex fracturé au fond du canal mandibulaire ou proximité intime avec les racines de la dent de sagesse sans scanner préopératoire."
    ],
    prevention: [
      "Bilan radiologique et CBCT préopératoire évaluant la distance au canal.",
      "Abstention chirurgicale sur apex profond asymptomatique."
    ],
    treatment: [
      "Rassurer le patient : évolution sur plusieurs semaines à plusieurs mois.",
      "Complexe vitaminique neurotrope B1, B6, B12.",
      "L'apparition de sensations de picotements annonce la régénération axonale et la guérison."
    ],
    slideRef: "Diapositives 65, 83",
    image: spixImg
  },
  {
    id: "paralysie-faciale-transitoire",
    name: "Paralysie Faciale Transitoire (Anesthésie Spix)",
    timing: "per-opératoire",
    system: "anesthésie",
    severity: "bénin",
    clinicalSigns: [
      "Affaissement de la commissure labiale, effacement des rides frontales, impossibilité de fermer l'œil (signe de Charles Bell) du côté injecté."
    ],
    causes: [
      "Injection trop postérieure lors de l'anesthésie à l'épine de Spix : l'aiguille pénètre dans la loge parotidienne et infiltre le tronc du nerf facial (VII)."
    ],
    prevention: [
      "Prendre un contact osseux franc sur la branche montante avant d'injecter la solution."
    ],
    treatment: [
      "Rassurer absolument le patient : incident sans gravité qui disparaît spontanément en 2 à 4 heures dès la fin de l'effet anesthésique. Protéger l'œil non occlus par un collyre ou compresse."
    ],
    slideRef: "Diapositive 59"
  },
  {
    id: "emphyseme-sous-cutane",
    name: "Emphysème Sous-Cutané Cervico-Facial",
    timing: "per-opératoire",
    system: "muqueux",
    severity: "grave",
    clinicalSigns: [
      "Tuméfaction faciale soudaine sans érythème.",
      "Sensation de crépitation caractéristique « comme de la neige » se déplaçant sous les doigts lors de la palpation.",
      "Gonflement indolore immédiat pouvant diffuser vers le cou et le médiastin."
    ],
    causes: [
      "Infiltration d'air comprimé dans les tissus mous cellulo-adipeux par l'usage imprudent d'une seringue à air ou d'une turbine projetant l'air d'échappement dans l'alvéole ou le lambeau."
    ],
    prevention: [
      "Ne jamais sécher une alvéole ou un lambeau à la seringue à air ; utiliser des pièces à main chirurgicales sans refoulement d'air vers l'avant."
    ],
    treatment: [
      "Régression spontanée en quelques jours, antibioprophylaxie de couverture.",
      "Surveillance hospitalière indispensable si extension vers les espaces cervicaux et le médiastin (risque de médiastinite)."
    ],
    slideRef: "Diapositive 68"
  },
  {
    id: "communication-bucco-sinusienne",
    name: "Communication Bucco-Sinusienne (CBS)",
    timing: "per-opératoire",
    system: "osseux",
    severity: "modéré",
    clinicalSigns: [
      "Passage d'air et de sang mousseux par l'alvéole lors de la déglutition ou du mouchage (épreuve de Valsalva positive).",
      "Perte d'étanchéité buccale en buvant des liquides."
    ],
    causes: [
      "Apex des molaires supérieures émergeant dans le sinus maxillaire, lésion apicale ayant détruit le plancher, ou curetage intempestif du fond de l'alvéole."
    ],
    prevention: [
      "Examen radio minutieux des rapports sinus/apex, proscription de curetage intempestif du fond d'alvéole d'une dent antrale."
    ],
    treatment: [
      "Nettoyage doux de la plaie alvéolaire.",
      "Fermeture hermétique immédiate par traction d'un lambeau vestibulaire de glissement et sutures étanches.",
      "Conseils : ne pas se moucher fort, décongestionnant nasal, antibiothérapie."
    ],
    slideRef: "Diapositive 68"
  },
  {
    id: "fracture-tuberosite",
    name: "Fracture de la Tubérosité Maxillaire",
    timing: "per-opératoire",
    system: "osseux",
    severity: "modéré",
    clinicalSigns: [
      "Mobilité d'un bloc osseux important en arrière de la dent de sagesse supérieure lors de la traction.",
      "Saignement abondant rétro-molaire."
    ],
    causes: [
      "Luxation forcée à l'élévateur d'une dent de sagesse supérieure ankylosée ou volumineuse."
    ],
    prevention: [
      "Alvéolectomie distale préventive, luxation douce, proscrire les forces de levier excessives vers l'arrière."
    ],
    treatment: [
      "Si le fragment osseux est mobile et de petite taille : l'éliminer proprement.",
      "S'il est volumineux et encore adhérent à la muqueuse palatine/vestibulaire : le repositionner et le stabiliser par des sutures fermes du lambeau pour permettre sa consolidation."
    ],
    slideRef: "Diapositive 67"
  },
  {
    id: "complication-hemorragique",
    name: "Hémorragie Post-Extractionnelle",
    timing: "post-opératoire",
    system: "hémorragique",
    severity: "modéré",
    clinicalSigns: [
      "Saignement continu persistant après 30 minutes de morsure sur compresse ou reprise secondaire du saignement.",
      "Caillot volumineux 'en foie de veau' débordant de l'alvéole."
    ],
    causes: [
      "Plaie muqueuse non suturée, absence de révision alvéolaire, geste iatrogène avec lésion artériolaire, bains de bouche précoces, tics de succion.",
      "Patient sous traitement antiagrégant (Aspégic, Plavix) ou AVK (Préviscan, Sintrom)."
    ],
    prevention: [
      "Interrogatoire médicamenteux, hémostase locale soignée per-opératoire, sutures préventives."
    ],
    treatment: [
      "Compression prolongée ferme par compresse de gaze stérile pliée (20-30 min).",
      "Mèche de gaze simple pli par pli de la profondeur à la surface.",
      "Tamponnement par matériau hémostatique résorbable : cellulose oxydée (Surgicel) ou éponge de gélatine (Ceraspon).",
      "Confection d'une gouttière hémostatique extemporanée en élastomère de silicone."
    ],
    slideRef: "Diapositives 81-82"
  }
];

export const ComplicationsAtlas: React.FC = () => {
  const [filterTiming, setFilterTiming] = useState<'all' | 'per-opératoire' | 'post-opératoire'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedComplication, setSelectedComplication] = useState<ComplicationItem>(COMPLICATIONS_DATA[0]);

  const filtered = COMPLICATIONS_DATA.filter((item) => {
    const matchesTiming = filterTiming === 'all' || item.timing === filterTiming;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clinicalSigns.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.system.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTiming && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-rose-400 font-medium uppercase tracking-wider mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Atlas Clinique d'Urgence & Pathologie</span>
              <span aria-hidden="true">·</span>
              <span>Diapositives 56 à 85</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">Complications des Extractions Dentaires</h2>
            <p className="text-sm text-slate-400">
              « Il faut les connaître pour les éviter, et les gérer si jamais elles arrivent. » (Pr Adel BOUGUEZZI)
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilterTiming('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterTiming === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Toutes ({COMPLICATIONS_DATA.length})
            </button>
            <button
              onClick={() => setFilterTiming('per-opératoire')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterTiming === 'per-opératoire' ? 'bg-amber-950 text-amber-200 border border-amber-800/40 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Per-opératoires
            </button>
            <button
              onClick={() => setFilterTiming('post-opératoire')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterTiming === 'post-opératoire' ? 'bg-rose-950 text-rose-200 border border-rose-800/40 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Post-opératoires
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une complication, signe clinique ou traitement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List Column */}
        <div className="lg:col-span-5 space-y-2">
          {filtered.map((comp) => {
            const isSelected = selectedComplication.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedComplication(comp)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-teal-500 shadow-md ring-1 ring-teal-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-200">{comp.name}</span>
                    {comp.severity === 'urgence_vitale' && (
                      <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800/60 font-bold">
                        URGENCE VITALE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="capitalize">{comp.timing}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize text-teal-400">{comp.system}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-500">{comp.slideRef}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-teal-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Detail Dossier Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
          {/* Header of selected */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-teal-400">
                  {selectedComplication.timing}
                </span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                  Système : {selectedComplication.system}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">{selectedComplication.slideRef}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-2">{selectedComplication.name}</h3>
          </div>

          {/* Optional Pathology Image */}
          {selectedComplication.image && (
            <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={selectedComplication.image}
                alt={selectedComplication.name}
                referrerPolicy="no-referrer"
                className="w-full max-h-56 object-cover"
              />
              <div className="p-2 text-[11px] text-slate-400 bg-slate-950/80 border-t border-slate-800">
                Figure clinique associée : {selectedComplication.name}
              </div>
            </div>
          )}

          {/* Clinical Signs */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Signes Cliniques & Diagnostic</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {selectedComplication.clinicalSigns.map((sign, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Etiology & Causes */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Causes & Mécanismes Iatrogènes</h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {selectedComplication.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention & Treatment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-400">Prévention Recommandée</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedComplication.prevention.map((p, i) => (
                  <li key={i} className="leading-relaxed text-[11px]">
                    ✓ {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-bold text-teal-400">Conduite à Tenir (CAT) / Traitement</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedComplication.treatment.map((t, i) => (
                  <li key={i} className="leading-relaxed text-[11px]">
                    → {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
