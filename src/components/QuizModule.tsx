import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModuleProps {
  fontSize?: 'normal' | 'large' | 'xlarge';
  isLightMode?: boolean;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ 
  fontSize = 'large', 
  isLightMode = false 
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const questions = filterCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.category === filterCategory);

  const currentQ = questions[currentIdx] || questions[0];
  const userChoice = selectedAnswers[currentQ.id];
  const hasAnsweredCurrent = userChoice !== undefined;

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
      const finalScore = calculateScore();
      if (finalScore.percentage >= 80) {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
    };
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const score = calculateScore();

  const questionTitleClass = fontSize === 'xlarge'
    ? 'text-xl md:text-2xl font-bold leading-snug'
    : fontSize === 'large'
    ? 'text-lg md:text-xl font-bold leading-snug'
    : 'text-base md:text-lg font-semibold leading-snug';

  const optionTextClass = fontSize === 'xlarge'
    ? 'text-base md:text-lg'
    : fontSize === 'large'
    ? 'text-sm md:text-base'
    : 'text-xs md:text-sm';

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-7 transition-colors ${
      isLightMode 
        ? 'bg-white border-slate-200 text-slate-900' 
        : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
        isLightMode ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Test Clinique Cerveau-Actif</span>
            <span aria-hidden="true">·</span>
            <span>20 Questions Officielles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            QCM d'Exodontie & Chirurgie Buccale
          </h2>
        </div>

        {/* Filter categories */}
        {!isCompleted && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Toutes (20)' },
              { id: 'instrumentation', label: 'Daviers & Outils' },
              { id: 'pharmacologie', label: 'Pharmacologie' },
              { id: 'technique', label: 'Gestes' },
              { id: 'complications', label: 'Complications' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterCategory(cat.id);
                  setCurrentIdx(0);
                  setShowExplanation(false);
                }}
                className={`px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                  filterCategory === cat.id
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                    : isLightMode
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm text-slate-500 dark:text-slate-400 font-mono font-medium">
              <span>Question {currentIdx + 1} sur {questions.length}</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">{currentQ.categoryLabel}</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isLightMode ? 'bg-slate-100' : 'bg-slate-800'}`}>
              <div
                className="h-full bg-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className={`p-6 sm:p-7 rounded-2xl border space-y-5 ${
            isLightMode 
              ? 'bg-slate-50/70 border-slate-200' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <h3 className={questionTitleClass}>
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userChoice === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;

                let btnStyle = isLightMode
                  ? 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
                  : 'border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-100';

                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    btnStyle = isLightMode
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/50'
                      : 'border-emerald-500 bg-emerald-950/60 text-emerald-100 font-bold ring-2 ring-emerald-500/40';
                  } else if (isSelected) {
                    btnStyle = isLightMode
                      ? 'border-rose-400 bg-rose-50 text-rose-950 font-medium'
                      : 'border-rose-500 bg-rose-950/60 text-rose-100 font-medium';
                  } else {
                    btnStyle = isLightMode
                      ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-60'
                      : 'border-slate-800/40 bg-slate-950/40 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex items-center justify-between gap-3 ${optionTextClass} ${btnStyle}`}
                  >
                    <span className="leading-relaxed font-medium">{opt}</span>
                    {hasAnsweredCurrent && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 ml-2" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clinical Rationale & Slide Reference */}
          {hasAnsweredCurrent && (
            <div className={`p-5 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
              isLightMode 
                ? 'bg-teal-50/80 border-teal-200 text-teal-950' 
                : 'bg-slate-950 border-teal-500/40 text-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Justification Clinique du Cours</span>
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">{currentQ.slideRef}</span>
              </div>
              <p className={`${optionTextClass} leading-relaxed`}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-md ${
                hasAnsweredCurrent
                  ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              } ${fontSize === 'xlarge' ? 'text-base' : 'text-sm'}`}
            >
              <span>{currentIdx < questions.length - 1 ? 'Question Suivante' : 'Voir mon Bilan de Révision'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-10 space-y-6">
          <div className="inline-flex p-5 rounded-full bg-teal-500/10 text-teal-500 border border-teal-500/30">
            <Award className="w-14 h-14" />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Bilan de Révision Cérébrale
            </h3>
            <p className={`text-slate-600 dark:text-slate-400 max-w-lg mx-auto ${optionTextClass}`}>
              {score.percentage >= 80
                ? "Excellent travail ! Vous maîtrisez les 85 diapositives et les réflexes opératoires vitaux."
                : score.percentage >= 60
                ? "Très bon niveau ! Quelques révisions ciblées sur l'anesthésie ou les complications suffiront."
                : "Revue conseillée des chapitres 3 (Anesthésie) et 6 (Complications) pour ancrer les réflexes."}
            </p>
          </div>

          <div className="flex justify-center items-baseline gap-3 font-mono">
            <span className="text-6xl font-black text-teal-500">{score.percentage}%</span>
            <span className="text-sm md:text-base text-slate-500">({score.correct} / {score.total} exactes)</span>
          </div>

          <div className="pt-6 flex justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-base transition-colors shadow-xl"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Recommencer l'Évaluation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
