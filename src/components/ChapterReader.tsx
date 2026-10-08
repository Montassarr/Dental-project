import React, { useState } from 'react';
import { CHAPTERS, Chapter } from '../data/courseData';
import { 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Bookmark,
  Check,
  Eye,
  Zap,
  Target
} from 'lucide-react';
import heroImg from '../assets/images/dental_extraction_hero_1791482231506.jpg';
import daviersImg from '../assets/images/dental_forceps_classification_1791482242538.jpg';
import spixImg from '../assets/images/mandibular_nerve_spix_1791482253917.jpg';
import alveoliteImg from '../assets/images/alveolitis_dry_socket_1791482266653.jpg';
import zekryaImg from '../assets/images/root_separation_zekrya_1791482277230.jpg';

interface ChapterReaderProps {
  onOpen3DMode?: (mode: 'syndesmotomie' | 'luxation' | 'avulsion' | 'separation' | 'spix') => void;
  fontSize?: 'normal' | 'large' | 'xlarge';
  isLightMode?: boolean;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({ 
  onOpen3DMode, 
  fontSize = 'large',
  isLightMode = false 
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});

  const currentChapter = CHAPTERS[activeChapterIndex];

  const imageMap: Record<string, { src: string; caption: string }> = {
    hero: { src: heroImg, caption: "Plateau d'instrumentation stérile : Daviers, élévateurs droits et seringue à carpule sur champ chirurgical." },
    daviers: { src: daviersImg, caption: "Règle d'or anatomique des daviers : mors et branches alignés pour le maxillaire (180°) vs angle droit (90°) pour la mandibule." },
    spix: { src: spixImg, caption: "Repérage anatomique de l'épine de Spix (Spina mandibularis) et trajet du nerf alvéolaire inférieur et du nerf lingual." },
    alveolite: { src: alveoliteImg, caption: "Pathologie comparée : cicatrisation normale par caillot stable vs Alvéolite sèche avec alvéole déshabitée et os blanc dénudé." },
    zekrya: { src: zekryaImg, caption: "Odontosection d'une molaire pluriradiculée à la fraise chirurgicale Zekrya au niveau de la furcation." },
  };

  const toggleSectionComplete = (key: string) => {
    setCompletedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Font sizing styles
  const textSizeClass = fontSize === 'xlarge' 
    ? 'text-lg md:text-xl leading-relaxed' 
    : fontSize === 'large' 
    ? 'text-base md:text-lg leading-relaxed' 
    : 'text-sm md:text-base leading-normal';

  const headingSizeClass = fontSize === 'xlarge'
    ? 'text-2xl md:text-3xl'
    : fontSize === 'large'
    ? 'text-xl md:text-2xl'
    : 'text-lg md:text-xl';

  return (
    <div className="space-y-8">
      {/* Chapter Selection Bar with Clear Cards */}
      <div className={`p-3 sm:p-4 rounded-2xl border transition-colors shadow-sm ${
        isLightMode 
          ? 'bg-white border-slate-200' 
          : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Sommaire des Chapitres du Cours (85 Diapositives)
          </span>
          <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
            Chapitre {activeChapterIndex + 1} sur {CHAPTERS.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md scale-102'
                    : isLightMode
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                } ${fontSize === 'xlarge' ? 'text-sm' : 'text-xs'}`}
              >
                <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-950/30 text-teal-400'
                }`}>
                  {chap.number}
                </span>
                <span>{chap.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Master Reader Card */}
      <article className={`p-6 sm:p-10 rounded-2xl border shadow-xl space-y-10 transition-colors ${
        isLightMode 
          ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' 
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        {/* Chapter Header */}
        <div className={`border-b pb-8 space-y-3 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-teal-500/15 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full font-mono font-bold">
                Chapitre {currentChapter.number}
              </span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="font-mono text-slate-500 dark:text-slate-400 font-medium">
                {currentChapter.slideRange}
              </span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Pr Ag Adel BOUGUEZZI · Monastir
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            {currentChapter.title}
          </h2>

          <div className={`p-4 rounded-xl border ${
            isLightMode 
              ? 'bg-teal-50/60 border-teal-200/70 text-teal-950' 
              : 'bg-teal-950/20 border-teal-800/40 text-teal-200'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Résumé Cerveau-Reposé (L'Essentiel en 30 secondes)</span>
            </div>
            <p className={`${textSizeClass} font-medium leading-relaxed`}>
              {currentChapter.summary}
            </p>
          </div>
        </div>

        {/* Structured Sections with High Eye Comfort */}
        <div className="space-y-12">
          {currentChapter.sections.map((section, sIdx) => {
            const sectionKey = `${currentChapter.id}-sec-${sIdx}`;
            const isDone = !!completedSections[sectionKey];
            const hasImage = section.imageKey && imageMap[section.imageKey];

            return (
              <section 
                key={sIdx} 
                className={`p-6 sm:p-8 rounded-2xl border transition-all space-y-6 ${
                  isLightMode
                    ? isDone ? 'bg-slate-50/60 border-slate-200' : 'bg-slate-50/30 border-slate-200/80 hover:border-teal-300'
                    : isDone ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Section Header with completion toggle */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-7 bg-teal-500 rounded-full shrink-0" />
                    <h3 className={`${headingSizeClass} font-bold tracking-tight text-slate-900 dark:text-slate-100`}>
                      {section.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleSectionComplete(sectionKey)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : isLightMode
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isDone ? 'Section comprise' : 'Marquer comme lu'}</span>
                  </button>
                </div>

                {/* Content Paragraphs with Air and Legibility */}
                <div className={`space-y-4 text-slate-700 dark:text-slate-200 ${textSizeClass}`}>
                  {section.content.map((p, pIdx) => {
                    const isBullet = p.startsWith('•') || p.startsWith('1.') || p.startsWith('2.') || p.startsWith('3.') || p.startsWith('4.') || p.startsWith('5.');
                    return (
                      <p 
                        key={pIdx} 
                        className={`${isBullet ? 'pl-4 border-l-2 border-teal-500/40 py-0.5' : ''} leading-relaxed`}
                      >
                        {p}
                      </p>
                    );
                  })}
                </div>

                {/* Key Points (Points Clés Pédagogiques) */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className={`p-5 rounded-xl border space-y-3 ${
                    isLightMode
                      ? 'bg-teal-50/70 border-teal-200'
                      : 'bg-teal-950/30 border-teal-800/50'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                      <Target className="w-4 h-4 text-teal-500" />
                      <span>Points Clés Incontournables</span>
                    </div>
                    <ul className={`space-y-2.5 text-slate-800 dark:text-slate-200 ${textSizeClass}`}>
                      {section.keyPoints.map((kp, kpIdx) => (
                        <li key={kpIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Clinical Pearl (Remarque Clinique) */}
                {section.clinicalPearl && (
                  <div className={`p-5 rounded-xl border flex items-start gap-3.5 ${
                    isLightMode
                      ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                      : 'bg-amber-950/25 border-amber-800/40 text-amber-200'
                  }`}>
                    <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                        Remarque du Pr BOUGUEZZI :
                      </strong>
                      <p className={`${textSizeClass} leading-relaxed font-medium`}>
                        {section.clinicalPearl}
                      </p>
                    </div>
                  </div>
                )}

                {/* Surgical Warning (Avertissement Chirurgical) */}
                {section.warning && (
                  <div className={`p-5 rounded-xl border flex items-start gap-3.5 ${
                    isLightMode
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                  }`}>
                    <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="text-sm font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
                        Avertissement Chirurgical :
                      </strong>
                      <p className={`${textSizeClass} leading-relaxed font-semibold`}>
                        {section.warning}
                      </p>
                    </div>
                  </div>
                )}

                {/* Large Clean Table */}
                {section.table && (
                  <div className={`overflow-x-auto rounded-xl border mt-4 ${
                    isLightMode ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-950'
                  }`}>
                    <table className="w-full text-left">
                      <thead className={`border-b text-xs font-bold uppercase tracking-wider ${
                        isLightMode ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}>
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3.5 px-4 font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isLightMode ? 'divide-slate-200 text-slate-800' : 'divide-slate-800 text-slate-200'} ${textSizeClass}`}>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-900/40'}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3.5 px-4 align-top leading-relaxed font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Medical Graphic with Large Readable Format */}
                {hasImage && (
                  <div className={`mt-5 rounded-2xl overflow-hidden border shadow-lg ${
                    isLightMode ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-950'
                  }`}>
                    <img
                      src={imageMap[section.imageKey!].src}
                      alt={imageMap[section.imageKey!].caption}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[460px] object-cover"
                    />
                    <div className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs md:text-sm ${
                      isLightMode ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950/90 border-slate-800 text-slate-300'
                    }`}>
                      <span className="font-medium leading-relaxed">{imageMap[section.imageKey!].caption}</span>
                      <span className="font-mono text-teal-600 dark:text-teal-400 font-bold shrink-0">
                        Iconographie du support
                      </span>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Chapter Navigation Footer */}
        <div className={`border-t pt-8 flex items-center justify-between gap-4 ${
          isLightMode ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <button
            onClick={() => {
              setActiveChapterIndex(Math.max(0, activeChapterIndex - 1));
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            disabled={activeChapterIndex === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
              activeChapterIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : isLightMode
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            } ${fontSize === 'xlarge' ? 'text-base' : 'text-sm'}`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Chapitre Précédent</span>
          </button>

          <span className="text-xs md:text-sm font-mono text-slate-500 font-semibold">
            {activeChapterIndex + 1} / {CHAPTERS.length}
          </span>

          <button
            onClick={() => {
              setActiveChapterIndex(Math.min(CHAPTERS.length - 1, activeChapterIndex + 1));
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            disabled={activeChapterIndex === CHAPTERS.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
              activeChapterIndex === CHAPTERS.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
            } ${fontSize === 'xlarge' ? 'text-base' : 'text-sm'}`}
          >
            <span>Chapitre Suivant</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </article>
    </div>
  );
};
