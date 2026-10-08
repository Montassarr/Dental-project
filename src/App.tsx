/**
 * Application Pédagogique Universitaire : Chirurgie Buccale & Exodontie 3D
 * Basée exclusivement sur le cours officiel du Pr Ag Adel BOUGUEZZI
 * (Clinique Dentaire de Monastir, 85 diapositives).
 * Conçue pour un confort de lecture maximal, sans fatigue cérébrale ni oculaire.
 */

import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { Footer } from './components/Footer';
import { Dental3DViewer, SimulationMode } from './components/Dental3DViewer';
import { ChapterReader } from './components/ChapterReader';
import { DavierSimulator } from './components/DavierSimulator';
import { DosageCalculator } from './components/DosageCalculator';
import { BiomechanicsExplorer } from './components/BiomechanicsExplorer';
import { ComplicationsAtlas } from './components/ComplicationsAtlas';
import { QuizModule } from './components/QuizModule';
import { FlashcardsModule } from './components/FlashcardsModule';
import { GlossaryModule } from './components/GlossaryModule';
import { COURSE_INFO } from './data/courseData';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Syringe, 
  Gauge, 
  ShieldAlert, 
  Award, 
  CheckCircle2,
  Stethoscope,
  Sun,
  Moon,
  Coffee,
  Type,
  Eye,
  Zap,
  BookmarkCheck
} from 'lucide-react';

export type ReadingTheme = 'soft-dark' | 'warm-paper' | 'sepia-cozy';
export type FontSizeScale = 'normal' | 'large' | 'xlarge';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('3d-viewer');
  const [threeMode, setThreeMode] = useState<SimulationMode>('luxation');
  const [theme, setTheme] = useState<ReadingTheme>('soft-dark');
  const [fontSize, setFontSize] = useState<FontSizeScale>('large');

  const isLightMode = theme === 'warm-paper';
  const isSepiaMode = theme === 'sepia-cozy';

  const handleLaunch3D = (mode: SimulationMode) => {
    setThreeMode(mode);
    setActiveTab('3d-viewer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Background and text theme mappings
  const themeContainerClass = isSepiaMode
    ? 'bg-[#fbf0d9] text-[#2b1f13]'
    : isLightMode
    ? 'bg-[#f8fafc] text-[#0f172a]'
    : 'bg-[#0a0f1d] text-[#f1f5f9]';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${themeContainerClass}`}>
      {/* Top Bar Header (Single wordmark, 4-6 text links, 1 action) */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickQuiz={() => {
          setActiveTab('quiz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isLightMode={isLightMode}
        isSepiaMode={isSepiaMode}
      />

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 pb-16 space-y-7">
        
        {/* Eye-Comfort & Brain-Friendly Control Strip */}
        <div className={`p-3.5 sm:p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
          isSepiaMode
            ? 'bg-[#f4e5c5] border-[#dfcd9f] text-[#2b1f13]'
            : isLightMode
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-slate-900/90 border-slate-800 text-slate-200'
        }`}>
          {/* Eye comfort description */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <Eye className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="font-semibold">Confort Visuel & Cérébral :</span>
            <span className="opacity-75 hidden md:inline">Ajustez la taille du texte et l'ambiance pour étudier sans fatigue</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Font size adjuster */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs ${
              isSepiaMode
                ? 'bg-[#ebdcb9] border-[#d8be8d]'
                : isLightMode
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <Type className="w-3.5 h-3.5 ml-1 text-slate-500" />
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  fontSize === 'normal'
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                A (Standard)
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  fontSize === 'large'
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                A+ (Confort)
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 rounded-lg font-extrabold text-sm transition-colors ${
                  fontSize === 'xlarge'
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                A++ (Grand)
              </button>
            </div>

            {/* Reading theme toggles */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs ${
              isSepiaMode
                ? 'bg-[#ebdcb9] border-[#d8be8d]'
                : isLightMode
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <button
                onClick={() => setTheme('soft-dark')}
                title="Mode Nuit Douce (fond sombre reposant)"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-colors ${
                  theme === 'soft-dark'
                    ? 'bg-slate-800 text-teal-300 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Nuit</span>
              </button>
              <button
                onClick={() => setTheme('warm-paper')}
                title="Mode Papier Médical (fond clair doux non-éblouissant)"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-colors ${
                  theme === 'warm-paper'
                    ? 'bg-white text-teal-700 font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Papier Clair</span>
              </button>
              <button
                onClick={() => setTheme('sepia-cozy')}
                title="Mode Sépia Anti-Lumière Bleue"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-colors ${
                  theme === 'sepia-cozy'
                    ? 'bg-[#e5d4aa] text-[#451a03] font-bold shadow-sm'
                    : 'text-[#7e6044] hover:text-[#2b1f13]'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Sépia Zen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Academic Presentation */}
        <section className={`p-6 sm:p-10 rounded-2xl border shadow-xl relative overflow-hidden transition-colors ${
          isSepiaMode
            ? 'bg-[#f4e5c5] border-[#dfcd9f] text-[#2b1f13]'
            : isLightMode
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-teal-600 dark:text-teal-400 uppercase tracking-wider">{COURSE_INFO.department}</span>
                <span aria-hidden="true" className="opacity-50">·</span>
                <span>{COURSE_INFO.institution}</span>
                <span aria-hidden="true" className="opacity-50">·</span>
                <span className="font-mono opacity-75">{COURSE_INFO.totalSlides} diapositives officielles</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">
                {COURSE_INFO.title}
              </h1>
              
              <p className={`leading-relaxed max-w-2xl opacity-90 ${
                fontSize === 'xlarge' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
              }`}>
                Cours magistral et pratique du <strong className="font-bold underline decoration-teal-500/50">{COURSE_INFO.author}</strong>. Une formation conçue pour l'étudiant : explications aérées, biomécanique en 3D, simulateur de daviers par arcade et fiches d'urgences sans fatigue intellectuelle.
              </p>

              {/* High-yield brain anchors */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs md:text-sm font-medium">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Modélisation 3D temps réel</span>
                </div>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Simulateur de daviers complet</span>
                </div>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Dosimétrie toxique (70 kg)</span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setActiveTab('cours')}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm transition-all shadow-md hover:scale-102"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorer les 6 Chapitres</span>
              </button>
              <button
                onClick={() => setActiveTab('daviers')}
                className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-colors border ${
                  isLightMode
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span>Sélection des Daviers</span>
              </button>
            </div>
          </div>
        </section>

        {/* Brain-Friendly 60-Second Refresher Cards */}
        <section className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
          isSepiaMode
            ? 'bg-[#f4e5c5]/80 border-[#dfcd9f]'
            : isLightMode
            ? 'bg-white border-slate-200'
            : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex items-center gap-2 mb-3 px-1 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Réflexes Vitaux en 60 Secondes (À mémoriser sans effort)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs md:text-sm">
            <div className={`p-3.5 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <strong className="text-teal-600 dark:text-teal-400 font-bold block mb-1">Règle d'or Daviers :</strong>
              <p className="opacity-90 leading-relaxed">
                Maxillaire = 180° (ligne droite). Mandibule = 90° (angle droit).
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <strong className="text-amber-600 dark:text-amber-400 font-bold block mb-1">Dose Articaïne (70kg) :</strong>
              <p className="opacity-90 leading-relaxed">
                Avec vaso = max 7 carpules (1,7ml). Sans vaso = max 4 carpules.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">Spix & Molaire Bas :</strong>
              <p className="opacity-90 leading-relaxed">
                La Spix exige impérativement une infiltration locale du nerf buccal !
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <strong className="text-rose-600 dark:text-rose-400 font-bold block mb-1">Urgences au Fauteuil :</strong>
              <p className="opacity-90 leading-relaxed">
                Voies aériennes = Heimlich ! Luxation ATM = Manœuvre de Nélaton.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs (Single line with icons and generous touch targets) */}
        <section className={`flex items-center gap-1.5 p-2 rounded-2xl border overflow-x-auto scrollbar-none text-xs sm:text-sm font-semibold transition-colors ${
          isSepiaMode
            ? 'bg-[#f4e5c5] border-[#dfcd9f]'
            : isLightMode
            ? 'bg-white border-slate-200'
            : 'bg-slate-900 border-slate-800'
        }`}>
          {[
            { id: '3d-viewer', label: 'Modèle 3D Chirurgical', icon: Sparkles },
            { id: 'cours', label: 'Cours & 6 Chapitres', icon: BookOpen },
            { id: 'daviers', label: 'Simulateur Daviers', icon: Stethoscope },
            { id: 'dosage', label: 'Dosage Anesthésie', icon: Syringe },
            { id: 'biomecanique', label: 'Biomécanique (Levier/Roue)', icon: Gauge },
            { id: 'complications', label: 'Atlas Complications', icon: ShieldAlert },
            { id: 'quiz', label: 'QCM d\'Évaluation (20)', icon: Award },
            { id: 'flashcards', label: 'Flashcards Mémorisation', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as NavTab)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm scale-102'
                    : isLightMode
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-teal-600 dark:text-teal-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </section>

        {/* Active Tab Screen */}
        {activeTab === '3d-viewer' && (
          <div className="space-y-6">
            <Dental3DViewer initialMode={threeMode} />
            
            {/* Quick launch modes for 3D */}
            <div className={`p-5 rounded-2xl border transition-colors ${
              isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                Accès Immédiat aux 5 Étapes 3D :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs md:text-sm">
                <button
                  onClick={() => handleLaunch3D('syndesmotomie')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isLightMode ? 'bg-slate-50 border-slate-200 hover:border-teal-400' : 'bg-slate-950 border-slate-800 hover:border-teal-500'
                  }`}
                >
                  <strong className="block mb-0.5 font-bold">1. Syndesmotomie</strong>
                  <span className="opacity-75 text-xs">Section 360° en stylo</span>
                </button>
                <button
                  onClick={() => handleLaunch3D('luxation')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isLightMode ? 'bg-slate-50 border-slate-200 hover:border-teal-400' : 'bg-slate-950 border-slate-800 hover:border-teal-500'
                  }`}
                >
                  <strong className="block mb-0.5 font-bold">2. Luxation</strong>
                  <span className="opacity-75 text-xs">Levier & axe de roue</span>
                </button>
                <button
                  onClick={() => handleLaunch3D('avulsion')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isLightMode ? 'bg-slate-50 border-slate-200 hover:border-teal-400' : 'bg-slate-950 border-slate-800 hover:border-teal-500'
                  }`}
                >
                  <strong className="block mb-0.5 font-bold">3. Avulsion</strong>
                  <span className="opacity-75 text-xs">Davier à 90° & circumduction</span>
                </button>
                <button
                  onClick={() => handleLaunch3D('separation')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isLightMode ? 'bg-slate-50 border-slate-200 hover:border-teal-400' : 'bg-slate-950 border-slate-800 hover:border-teal-500'
                  }`}
                >
                  <strong className="block mb-0.5 font-bold">4. Odontosection</strong>
                  <span className="opacity-75 text-xs">Fraise Zekrya sous eau</span>
                </button>
                <button
                  onClick={() => handleLaunch3D('spix')}
                  className={`p-3.5 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
                    isLightMode ? 'bg-slate-50 border-slate-200 hover:border-teal-400' : 'bg-slate-950 border-slate-800 hover:border-teal-500'
                  }`}
                >
                  <strong className="block mb-0.5 font-bold">5. Repère Spix</strong>
                  <span className="opacity-75 text-xs">Canal mandibulaire</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cours' && (
          <ChapterReader 
            onOpen3DMode={handleLaunch3D} 
            fontSize={fontSize}
            isLightMode={isLightMode || isSepiaMode}
          />
        )}

        {activeTab === 'daviers' && (
          <DavierSimulator 
            fontSize={fontSize}
            isLightMode={isLightMode || isSepiaMode}
          />
        )}

        {activeTab === 'dosage' && (
          <DosageCalculator />
        )}

        {activeTab === 'biomecanique' && (
          <BiomechanicsExplorer />
        )}

        {activeTab === 'complications' && (
          <ComplicationsAtlas />
        )}

        {activeTab === 'quiz' && (
          <QuizModule 
            fontSize={fontSize}
            isLightMode={isLightMode || isSepiaMode}
          />
        )}

        {activeTab === 'flashcards' && (
          <div className="space-y-8">
            <FlashcardsModule />
            <GlossaryModule />
          </div>
        )}
      </main>

      {/* Academic Footer */}
      <Footer />
    </div>
  );
}
