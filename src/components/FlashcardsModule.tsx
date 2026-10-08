import React, { useState } from 'react';
import { FLASHCARDS, Flashcard } from '../data/flashcardsData';
import { Layers, RotateCcw, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';

export const FlashcardsModule: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const currentCard = FLASHCARDS[currentIdx];
  const isMastered = masteredIds.includes(currentCard.id);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const toggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMastered) {
      setMasteredIds(masteredIds.filter((id) => id !== currentCard.id));
    } else {
      setMasteredIds([...masteredIds, currentCard.id]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-7 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-400 font-medium uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Mémorisation Active & Flashcards</span>
            <span aria-hidden="true">·</span>
            <span>Révision Haute Fréquence</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Cartes de Révision Chirurgicale
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span>Carte {currentIdx + 1} / {FLASHCARDS.length}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">{masteredIds.length} maîtrisée(s)</span>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={toggleFlip}
        className="relative w-full min-h-[280px] md:min-h-[320px] bg-slate-950/80 border border-slate-800 rounded-2xl p-6 md:p-8 cursor-pointer select-none transition-all hover:border-slate-700 flex flex-col justify-between shadow-2xl group"
      >
        {/* Top bar of card */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-teal-300">
            {currentCard.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">{currentCard.slideRef}</span>
        </div>

        {/* Center content */}
        <div className="py-6 text-center space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
            {isFlipped ? "Réponse & Règle Clinique" : "Question Clinique"}
          </span>
          <p className="text-base md:text-xl font-semibold text-slate-100 leading-relaxed whitespace-pre-line">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        {/* Bottom card bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-900 text-xs text-slate-500">
          <span className="group-hover:text-teal-400 transition-colors">
            {isFlipped ? "Cliquez pour voir la question" : "Cliquez pour révéler la réponse"}
          </span>
          <button
            onClick={toggleMastered}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-colors ${
              isMastered
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isMastered ? 'Maîtrisée' : 'Marquer comme acquise'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Précédente</span>
        </button>

        <div className="flex items-center gap-1">
          {FLASHCARDS.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIdx ? 'w-4 bg-teal-400' : masteredIds.includes(FLASHCARDS[i].id) ? 'bg-emerald-600' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold transition-colors"
        >
          <span>Suivante</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
