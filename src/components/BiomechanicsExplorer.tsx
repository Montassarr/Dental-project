import React, { useState } from 'react';
import { Compass, Gauge, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';

export const BiomechanicsExplorer: React.FC = () => {
  const [leverLength, setLeverLength] = useState<number>(10);
  const [leverHeight, setLeverHeight] = useState<number>(4);
  const [handleDiameter, setHandleDiameter] = useState<number>(42);
  const [bladeTipRadius, setBladeTipRadius] = useState<number>(9);
  const [appliedForceNewtons, setAppliedForceNewtons] = useState<number>(30);

  // Mechanical Advantages from Slides 36 & 37
  const leverAdvantage = Number((leverLength / leverHeight).toFixed(2));
  const wheelAdvantage = Number((handleDiameter / bladeTipRadius).toFixed(2));
  const outputForceLever = Math.round(appliedForceNewtons * leverAdvantage);
  const outputForceWheel = Math.round(appliedForceNewtons * wheelAdvantage);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-400 font-medium uppercase tracking-wider mb-1">
            <Gauge className="w-3.5 h-3.5" />
            <span>Biomécanique Chirurgicale</span>
            <span aria-hidden="true">·</span>
            <span>Diapositives 36 à 38</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Physique des Forces d'Avulsion</h2>
          <p className="text-sm text-slate-400">
            Démonstration des deux principes physiques fondamentaux exploités lors de la luxation à l'élévateur droit et de Winter.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Principle 1: Effet de Levier */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-300">1. Effet de Levier (Slide 36)</h3>
            <span className="text-xs font-mono text-slate-400">Levier de 1er genre</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-300">Mechanical Advantage (Gain) = Length / Height</span>
              <span className="text-teal-400 font-bold text-sm">x{leverAdvantage}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Formule du cours : pour <span className="text-slate-200">Length = 10 mm</span> et <span className="text-slate-200">Height = 4 mm</span>, le gain mécanique est exactement de <span className="text-teal-300 font-bold">2.5</span>.
            </p>
          </div>

          {/* Interactive Parameters */}
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Longueur du bras de levier (L)</span>
                <span className="font-mono text-teal-300">{leverLength} mm</span>
              </div>
              <input
                type="range"
                min={6}
                max={16}
                value={leverLength}
                onChange={(e) => setLeverLength(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Hauteur du point d'appui osseux (H)</span>
                <span className="font-mono text-teal-300">{leverHeight} mm</span>
              </div>
              <input
                type="range"
                min={2}
                max={8}
                value={leverHeight}
                onChange={(e) => setLeverHeight(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Force Output */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-400">Force appliquée {appliedForceNewtons} N → Force d'expulsion :</span>
            <span className="font-mono text-base font-bold text-teal-400">{outputForceLever} N</span>
          </div>
        </div>

        {/* Principle 2: Effet d'Axe de Roue */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-300">2. Effet d'Axe de Roue (Slide 37)</h3>
            <span className="text-xs font-mono text-slate-400">Couple de rotation</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-300">Mechanical Advantage = Rayon Manche / Rayon Lame</span>
              <span className="text-emerald-400 font-bold text-sm">x{wheelAdvantage}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Formule du cours : pour <span className="text-slate-200">Manche = 42 mm</span> et <span className="text-slate-200">Pointe active = 9 mm</span>, le gain mécanique atteint <span className="text-emerald-300 font-bold">4.6</span>.
            </p>
          </div>

          {/* Interactive Parameters */}
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Diamètre / Tour du manche de l'élévateur</span>
                <span className="font-mono text-emerald-300">{handleDiameter} mm</span>
              </div>
              <input
                type="range"
                min={25}
                max={55}
                value={handleDiameter}
                onChange={(e) => setHandleDiameter(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Diamètre de la partie active (lame)</span>
                <span className="font-mono text-emerald-300">{bladeTipRadius} mm</span>
              </div>
              <input
                type="range"
                min={5}
                max={15}
                value={bladeTipRadius}
                onChange={(e) => setBladeTipRadius(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Force Output */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-400">Force appliquée {appliedForceNewtons} N → Couple développé :</span>
            <span className="font-mono text-base font-bold text-emerald-400">{outputForceWheel} N</span>
          </div>
        </div>
      </div>

      {/* Slide 38 Clinical Rule: Good vs Bad Direction */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
          Règle Directionnelle de Luxation (Diapositive 38)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-rose-950/30 border border-rose-800/40 rounded-lg space-y-1.5">
            <div className="flex items-center gap-2 text-rose-300 font-bold">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Geste Interdit : Appui sur la Dent Voisine</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Prendre appui directement sur la couronne ou la racine de la dent adjacente entraîne sa subluxation, l'expulsion d'une obturation préexistante ou une fracture radiculaire iatrogène.
            </p>
          </div>
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/40 rounded-lg space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Geste Conforme : Appui Osseux Mésial</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Insérer l'élévateur fermement contre la corticale osseuse vestibulaire ou le septum interdentaire mésial. La rotation repousse la dent vers l'arrière et le haut sans solliciter la voisine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
