import React, { useState } from 'react';
import { FORCEPS_LIST, GOLDEN_RULES, ForcepsInstrument } from '../data/daviersData';
import { CheckCircle2, AlertCircle, Sparkles, BookOpen, Stethoscope } from 'lucide-react';
import forcepsImg from '../assets/images/dental_forceps_classification_1791482242538.jpg';

interface DentalTooth {
  fdi: number;
  name: string;
  arcade: 'maxillaire' | 'mandibulaire';
  rootType: 'monoradiculée' | 'biradiculée' | 'triradiculée' | 'variable';
  expectedForcepsId: string;
  tip: string;
}

const TEETH_CATALOG: DentalTooth[] = [
  // Maxillaire Droit
  { fdi: 18, name: "3ème molaire maxillaire droite (Sagesse)", arcade: "maxillaire", rootType: "triradiculée", expectedForcepsId: "davier-max-sagesse", tip: "Mors en baïonnette symétriques non jointifs" },
  { fdi: 17, name: "2ème molaire maxillaire droite", arcade: "maxillaire", rootType: "triradiculée", expectedForcepsId: "davier-max-molaire-droite", tip: "Davier coudé avec éperon vestibulaire droit pour furcation" },
  { fdi: 16, name: "1ère molaire maxillaire droite", arcade: "maxillaire", rootType: "triradiculée", expectedForcepsId: "davier-max-molaire-droite", tip: "Davier coudé avec éperon vestibulaire droit pour furcation" },
  { fdi: 15, name: "2ème prémolaire maxillaire droite", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-premolaires", tip: "Davier coudé en S pour contourner la commissure" },
  { fdi: 14, name: "1ère prémolaire maxillaire droite", arcade: "maxillaire", rootType: "biradiculée", expectedForcepsId: "davier-max-premolaires", tip: "Davier coudé en S pour contourner la commissure" },
  { fdi: 13, name: "Canine maxillaire droite", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-incisives-canines", tip: "Davier droit à mors rectilignes ne se touchant pas" },
  { fdi: 12, name: "Incisive latérale maxillaire droite", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-incisives-canines", tip: "Davier droit à mors rectilignes ne se touchant pas" },
  { fdi: 11, name: "Incisive centrale maxillaire droite", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-incisives-canines", tip: "Davier droit à mors rectilignes ne se touchant pas" },
  // Maxillaire Gauche
  { fdi: 21, name: "Incisive centrale maxillaire gauche", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-incisives-canines", tip: "Davier droit à mors rectilignes" },
  { fdi: 22, name: "Incisive latérale maxillaire gauche", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-incisives-canines", tip: "Davier droit à mors rectilignes" },
  { fdi: 23, name: "Canine maxillaire gauche", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-incisives-canines", tip: "Davier droit à mors rectilignes" },
  { fdi: 24, name: "1ère prémolaire maxillaire gauche", arcade: "maxillaire", rootType: "biradiculée", expectedForcepsId: "davier-max-premolaires", tip: "Davier coudé en S" },
  { fdi: 25, name: "2ème prémolaire maxillaire gauche", arcade: "maxillaire", rootType: "monoradiculée", expectedForcepsId: "davier-max-premolaires", tip: "Davier coudé en S" },
  { fdi: 26, name: "1ère molaire maxillaire gauche", arcade: "maxillaire", rootType: "triradiculée", expectedForcepsId: "davier-max-molaire-gauche", tip: "Davier coudé avec éperon vestibulaire gauche" },
  { fdi: 27, name: "2ème molaire maxillaire gauche", arcade: "maxillaire", rootType: "triradiculée", expectedForcepsId: "davier-max-molaire-gauche", tip: "Davier coudé avec éperon vestibulaire gauche" },
  { fdi: 28, name: "3ème molaire maxillaire gauche (Sagesse)", arcade: "maxillaire", rootType: "triradiculée", expectedForcepsId: "davier-max-sagesse", tip: "Davier en baïonnette à mors symétriques non jointifs" },
  // Mandibule Gauche
  { fdi: 38, name: "3ème molaire mandibulaire gauche (Sagesse)", arcade: "mandibulaire", rootType: "variable", expectedForcepsId: "davier-mand-sagesse", tip: "Davier avec mors en continuité coudés à l'extrémité" },
  { fdi: 37, name: "2ème molaire mandibulaire gauche", arcade: "mandibulaire", rootType: "biradiculée", expectedForcepsId: "davier-mand-molaires", tip: "Davier à angle droit, 2 éperons symétriques vest. et lingual" },
  { fdi: 36, name: "1ère molaire mandibulaire gauche", arcade: "mandibulaire", rootType: "biradiculée", expectedForcepsId: "davier-mand-molaires", tip: "Davier à angle droit, 2 éperons symétriques vest. et lingual" },
  { fdi: 35, name: "2ème prémolaire mandibulaire gauche", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-canine-premolaire", tip: "Davier à angle droit, mors larges non jointifs" },
  { fdi: 34, name: "1ère prémolaire mandibulaire gauche", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-canine-premolaire", tip: "Davier à angle droit, mors larges non jointifs" },
  { fdi: 33, name: "Canine mandibulaire gauche", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-canine-premolaire", tip: "Davier à angle droit, mors larges non jointifs" },
  { fdi: 32, name: "Incisive latérale mandibulaire gauche", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-incisives-racines", tip: "Davier à angle droit, mors effilés jointifs" },
  { fdi: 31, name: "Incisive centrale mandibulaire gauche", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-incisives-racines", tip: "Davier à angle droit, mors effilés jointifs" },
  // Mandibule Droit
  { fdi: 41, name: "Incisive centrale mandibulaire droite", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-incisives-racines", tip: "Davier à angle droit, mors effilés jointifs" },
  { fdi: 42, name: "Incisive latérale mandibulaire droite", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-incisives-racines", tip: "Davier à angle droit, mors effilés jointifs" },
  { fdi: 43, name: "Canine mandibulaire droite", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-canine-premolaire", tip: "Davier à angle droit, mors larges non jointifs" },
  { fdi: 44, name: "1ère prémolaire mandibulaire droite", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-canine-premolaire", tip: "Davier à angle droit, mors larges non jointifs" },
  { fdi: 45, name: "2ème prémolaire mandibulaire droite", arcade: "mandibulaire", rootType: "monoradiculée", expectedForcepsId: "davier-mand-canine-premolaire", tip: "Davier à angle droit, mors larges non jointifs" },
  { fdi: 46, name: "1ère molaire mandibulaire droite", arcade: "mandibulaire", rootType: "biradiculée", expectedForcepsId: "davier-mand-molaires", tip: "Davier à angle droit, 2 éperons symétriques vest. et lingual" },
  { fdi: 47, name: "2ème molaire mandibulaire droite", arcade: "mandibulaire", rootType: "biradiculée", expectedForcepsId: "davier-mand-molaires", tip: "Davier à angle droit, 2 éperons symétriques vest. et lingual" },
  { fdi: 48, name: "3ème molaire mandibulaire droite (Sagesse)", arcade: "mandibulaire", rootType: "variable", expectedForcepsId: "davier-mand-sagesse", tip: "Davier avec mors en continuité coudés à l'extrémité" },
];

interface DavierSimulatorProps {
  fontSize?: 'normal' | 'large' | 'xlarge';
  isLightMode?: boolean;
}

export const DavierSimulator: React.FC<DavierSimulatorProps> = ({
  fontSize = 'large',
  isLightMode = false,
}) => {
  const [selectedTooth, setSelectedTooth] = useState<DentalTooth>(TEETH_CATALOG[2]); // Default 16
  const [selectedForcepsId, setSelectedForcepsId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const expectedForceps = FORCEPS_LIST.find((f) => f.id === selectedTooth.expectedForcepsId);
  const isCorrect = selectedForcepsId === selectedTooth.expectedForcepsId;

  const handleToothSelect = (tooth: DentalTooth) => {
    setSelectedTooth(tooth);
    setSelectedForcepsId(null);
    setHasSubmitted(false);
  };

  const handleForcepsSelect = (id: string) => {
    setSelectedForcepsId(id);
    setHasSubmitted(true);
  };

  const bodyTextClass = fontSize === 'xlarge'
    ? 'text-base md:text-lg leading-relaxed'
    : fontSize === 'large'
    ? 'text-sm md:text-base leading-relaxed'
    : 'text-xs md:text-sm leading-normal';

  return (
    <div className="space-y-8">
      {/* Banner Title & Golden Rule */}
      <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl transition-colors ${
        isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>Simulateur Clinique Visuel</span>
              <span aria-hidden="true">·</span>
              <span>Diapositives 39 à 45</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quel Davier pour quelle dent ?
            </h2>
            <p className={`text-slate-600 dark:text-slate-300 max-w-2xl ${bodyTextClass}`}>
              Sélectionnez une dent sur l'arcade ci-dessous pour identifier instantanément le davier adéquat selon sa morphologie radiculaire et la règle d'or.
            </p>
          </div>

          <div className={`p-5 rounded-xl border max-w-sm shrink-0 ${
            isLightMode 
              ? 'bg-teal-50 border-teal-200 text-teal-950' 
              : 'bg-slate-950/90 border-teal-500/30 text-teal-200'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block mb-1">
              Règle d'or de l'Avulsion :
            </span>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              <strong className="text-slate-900 dark:text-white">Maxillaire (haut) :</strong> mors et branches en ligne droite (180°).<br />
              <strong className="text-slate-900 dark:text-white">Mandibule (bas) :</strong> angle droit à 90°.
            </p>
          </div>
        </div>
      </div>

      {/* Anatomical Comparison Reference Diagram */}
      <div className={`p-6 rounded-2xl border shadow-md ${
        isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900/90 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Design Comparatif : Maxillaire vs Mandibulaire (Planche du Cours)
          </span>
          <span className="text-xs text-teal-600 dark:text-teal-400 font-mono font-semibold">
            Diapositives 40-42
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-slate-950">
            <img
              src={forcepsImg}
              alt="Comparaison morphologique daviers maxillaires rectilignes vs mandibulaires à angle droit"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className={`p-4 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <strong className="text-teal-600 dark:text-teal-300 font-bold text-sm block mb-1">
                Daviers Maxillaires (Haut) :
              </strong>
              <p className={`text-slate-600 dark:text-slate-300 ${bodyTextClass}`}>
                Les mors et les branches se situent dans un même axe rectiligne pour permettre à l'opérateur d'appliquer une force axiale directe sans levier parasite. Les mors présentent un éperon unilatéral pour les molaires afin d'épouser la furcation vestibulaire.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <strong className="text-emerald-600 dark:text-emerald-300 font-bold text-sm block mb-1">
                Daviers Mandibulaires (Bas) :
              </strong>
              <p className={`text-slate-600 dark:text-slate-300 ${bodyTextClass}`}>
                Les mors forment un angle rigoureux à 90° avec les branches pour contourner la lèvre inférieure. Pour les molaires, les deux mors portent chacun un éperon s'engageant de part et d'autre dans l'espace inter-radiculaire.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dental Arcade (Maxillaire & Mandibule) */}
      <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-6 ${
        isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-200">
            1. Choisissez la dent à extraire (Arcade FDI)
          </h3>
          <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
            Dent active sélectionnée : FDI {selectedTooth.fdi}
          </span>
        </div>

        {/* Maxillaire Row */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
            <span>Arcade Maxillaire Supérieure (18 → 11 | 21 → 28)</span>
            <span className="font-mono text-teal-600 dark:text-teal-400">Alignement 180°</span>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-16 gap-2">
            {TEETH_CATALOG.slice(0, 16).map((tooth) => {
              const isSelected = selectedTooth.fdi === tooth.fdi;
              return (
                <button
                  key={tooth.fdi}
                  onClick={() => handleToothSelect(tooth)}
                  className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 ring-2 ring-teal-400 shadow-lg scale-105'
                      : isLightMode
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span className="font-mono text-sm">{tooth.fdi}</span>
                  <span className="text-[10px] font-normal opacity-75">
                    {tooth.fdi % 10 >= 6 ? 'M' : tooth.fdi % 10 >= 4 ? 'PM' : tooth.fdi % 10 === 3 ? 'C' : 'I'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mandibule Row */}
        <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
            <span>Arcade Mandibulaire Inférieure (48 → 41 | 31 → 38)</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">Angle droit 90°</span>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-16 gap-2">
            {TEETH_CATALOG.slice(16, 32).map((tooth) => {
              const isSelected = selectedTooth.fdi === tooth.fdi;
              return (
                <button
                  key={tooth.fdi}
                  onClick={() => handleToothSelect(tooth)}
                  className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 shadow-lg scale-105'
                      : isLightMode
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span className="font-mono text-sm">{tooth.fdi}</span>
                  <span className="text-[10px] font-normal opacity-75">
                    {tooth.fdi % 10 >= 6 ? 'M' : tooth.fdi % 10 >= 4 ? 'PM' : tooth.fdi % 10 === 3 ? 'C' : 'I'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tooth Detail Box */}
        <div className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-black text-teal-600 dark:text-teal-400">FDI {selectedTooth.fdi}</span>
              <span className="text-base font-bold text-slate-900 dark:text-slate-100">{selectedTooth.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              <span className="capitalize">Arcade : {selectedTooth.arcade}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">Morphologie : {selectedTooth.rootType}</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg border text-xs md:text-sm ${
            isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <span className="text-teal-600 dark:text-teal-400 font-bold block mb-0.5">Indice chirurgical :</span>
            {selectedTooth.tip}
          </div>
        </div>
      </div>

      {/* Forceps Choice Deck */}
      <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-5 ${
        isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-200">
            2. Choisissez le davier correspondant parmi les modèles
          </h3>
          <span className="text-xs text-slate-500">8 choix chirurgicaux</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {FORCEPS_LIST.filter((f) => f.arcade !== 'pediatrique').map((forceps) => {
            const isChosen = selectedForcepsId === forceps.id;
            let borderStyle = isLightMode
              ? 'border-slate-200 bg-slate-50 hover:bg-white text-slate-900'
              : 'border-slate-800 bg-slate-950/70 hover:bg-slate-800/60 text-slate-100';

            if (hasSubmitted) {
              if (forceps.id === selectedTooth.expectedForcepsId) {
                borderStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400';
              } else if (isChosen) {
                borderStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
              }
            } else if (isChosen) {
              borderStyle = 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 ring-2 ring-teal-400';
            }

            return (
              <button
                key={forceps.id}
                onClick={() => handleForcepsSelect(forceps.id)}
                className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${borderStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
                      {forceps.name}
                    </span>
                    <span className="text-[11px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                      {forceps.arcade}
                    </span>
                  </div>
                  <p className={`text-slate-600 dark:text-slate-300 font-medium ${bodyTextClass}`}>
                    {forceps.beakCharacteristics}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Mouvement : <strong className="text-slate-800 dark:text-slate-200">{forceps.actionMovement}</strong></span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">{forceps.slideRef}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Validation Result Box */}
        {hasSubmitted && (
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-2">
                <div className="font-extrabold text-base md:text-lg">
                  {isCorrect ? "Choix exact ! Instrument conforme aux directives du Pr Bouguezzi." : "Instrument inapproprié pour cette dent."}
                </div>
                <p className={bodyTextClass}>
                  <strong>Davier préconisé : </strong>
                  {expectedForceps?.name} ({expectedForceps?.beakCharacteristics}).
                </p>
                <p className={`${bodyTextClass} text-slate-700 dark:text-slate-300`}>
                  {expectedForceps?.description}
                </p>
                <div className="pt-1 text-xs md:text-sm font-mono text-teal-700 dark:text-teal-300 flex items-center gap-3">
                  <span>{expectedForceps?.slideRef}</span>
                  <span aria-hidden="true">·</span>
                  <span>Mouvement : {expectedForceps?.actionMovement === 'rotation' ? 'Rotation alternée' : 'Circumduction'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
