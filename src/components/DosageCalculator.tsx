import React, { useState } from 'react';
import { Syringe, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export const DosageCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [hasVasoconstrictor, setHasVasoconstrictor] = useState<boolean>(true);
  const [anestheticType, setAnestheticType] = useState<'articaine' | 'mepivacaine'>('articaine');
  const [carpulesUsed, setCarpulesUsed] = useState<number>(2);

  // Calculations strictly from Slide 17:
  // For 70 kg baseline:
  // Articaine with vaso: 7 mg/kg max 500 mg => 7 ampoules à 1.7 ml (each carpule 1.7 ml at 4% = 68 mg articaine)
  // Articaine without vaso: 4 mg/kg max 300 mg => 4 ampoules à 1.7 ml
  // Mépivacaïne: 3.5 ampoules à 1.8 ml (for 70 kg) = approx 4.4 mg/kg (each carpule 1.8 ml at 3% = 54 mg)

  let maxMgPerKg = 7;
  let absoluteMaxMg = 500;
  let mgPerCarpule = 68; // 40 mg/ml * 1.7 ml
  let carpuleVolume = 1.7;

  if (anestheticType === 'articaine') {
    if (hasVasoconstrictor) {
      maxMgPerKg = 7;
      absoluteMaxMg = 500;
      mgPerCarpule = 68;
      carpuleVolume = 1.7;
    } else {
      maxMgPerKg = 4;
      absoluteMaxMg = 300;
      mgPerCarpule = 68;
      carpuleVolume = 1.7;
    }
  } else {
    // Mépivacaïne (Scandonest 3% sans vaso = 54mg / 1.8ml ; ou 2% avec vaso)
    maxMgPerKg = 4.4;
    absoluteMaxMg = 300;
    mgPerCarpule = 54;
    carpuleVolume = 1.8;
  }

  const calculatedMaxMg = Math.min(absoluteMaxMg, Math.round(weight * maxMgPerKg));
  const maxCarpules = Number((calculatedMaxMg / mgPerCarpule).toFixed(1));
  const actualMgInjected = Math.round(carpulesUsed * mgPerCarpule);
  const isOverdose = carpulesUsed > maxCarpules;
  const percentageUsed = Math.min(150, Math.round((carpulesUsed / maxCarpules) * 100));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-400 font-medium uppercase tracking-wider mb-1">
            <Syringe className="w-3.5 h-3.5" />
            <span>Calculateur de Dosimétrie Clinique</span>
            <span aria-hidden="true">·</span>
            <span>Diapositive 17</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Doses Maximales d'Anesthésie Locale</h2>
          <p className="text-sm text-slate-400">
            Évaluez les seuils de toxicité systémique selon la masse corporelle du patient et la molécule choisie.
          </p>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300">
          <span className="font-semibold text-teal-300 block">Référence Adulte 70 kg :</span>
          <span>Articaïne + vaso = 7 carpules (1,7 ml)</span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weight Slider */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
            <span>Poids du Patient</span>
            <span className="font-mono text-base text-teal-400">{weight} kg</span>
          </div>
          <input
            type="range"
            min={20}
            max={120}
            step={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-teal-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>20 kg (Enfant)</span>
            <span>70 kg (Standard)</span>
            <span>120 kg</span>
          </div>
        </div>

        {/* Molecule & Vasoconstrictor */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-3">
          <span className="text-xs font-semibold text-slate-200 block">Molécule Anesthésique</span>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setAnestheticType('articaine')}
              className={`py-1.5 px-2 rounded-md font-medium transition-colors ${
                anestheticType === 'articaine' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Articaïne (4%)
            </button>
            <button
              onClick={() => setAnestheticType('mepivacaine')}
              className={`py-1.5 px-2 rounded-md font-medium transition-colors ${
                anestheticType === 'mepivacaine' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mépivacaïne (3%)
            </button>
          </div>
          {anestheticType === 'articaine' && (
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={hasVasoconstrictor}
                onChange={(e) => setHasVasoconstrictor(e.target.checked)}
                className="accent-teal-400 rounded"
              />
              <span>Avec vasoconstricteur (Adrénaline)</span>
            </label>
          )}
        </div>

        {/* Carpules Injected */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
            <span>Carpules Administrées</span>
            <span className="font-mono text-base text-slate-100">{carpulesUsed} carpule(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCarpulesUsed(Math.max(0.5, carpulesUsed - 0.5))}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono text-sm"
            >
              -
            </button>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.5}
              value={carpulesUsed}
              onChange={(e) => setCarpulesUsed(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
            <button
              onClick={() => setCarpulesUsed(Math.min(10, carpulesUsed + 0.5))}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono text-sm"
            >
              +
            </button>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Volume total injecté : <strong className="text-slate-200 font-mono">{(carpulesUsed * carpuleVolume).toFixed(1)} ml</strong>
          </span>
        </div>
      </div>

      {/* Safety Gauge & Clinical Verdict */}
      <div className={`p-4 rounded-xl border transition-all ${
        isOverdose
          ? 'bg-rose-950/50 border-rose-500/60'
          : 'bg-slate-950/80 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {isOverdose ? (
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${isOverdose ? 'text-rose-300' : 'text-emerald-300'}`}>
                  {isOverdose ? "ALERTE : SEUIL TOXIQUE DÉPASSÉ" : "ZONE THÉRAPEUTIQUE SÉCURISÉE"}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {actualMgInjected} mg injectés / {calculatedMaxMg} mg max
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {isOverdose
                  ? `Dépassement du seuil maximal prescrit pour ${weight} kg ! Risque de toxicité systémique par surdosage neurologique et cardiovasculaire (Slide 59).`
                  : `La dose injectée représente ${percentageUsed}% de la dose maximale tolérée (${maxCarpules} carpules max autorisées pour ${weight} kg).`}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Plafond Strict</span>
            <span className="text-2xl font-mono font-bold text-teal-400">{maxCarpules}</span>
            <span className="text-xs text-slate-400 ml-1">carpules max</span>
          </div>
        </div>

        {/* Visual Bar */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full transition-all duration-300 ${
              isOverdose ? 'bg-rose-500' : percentageUsed > 75 ? 'bg-amber-400' : 'bg-teal-500'
            }`}
            style={{ width: `${Math.min(100, percentageUsed)}%` }}
          />
        </div>
      </div>

      {/* Protocol Reminders from PDF */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
        <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex items-start gap-2">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-100">Aspiration préalable obligatoire :</strong> pour exclure formellement toute injection intra-vasculaire directe responsable de toxicité aiguë.
          </p>
        </div>
        <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex items-start gap-2">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-100">Vitesse d'injection lente :</strong> 1 ml par minute pour limiter la distension tissulaire douloureuse et prévenir le malaise vagal.
          </p>
        </div>
      </div>
    </div>
  );
};
