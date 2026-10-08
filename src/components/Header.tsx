import React from 'react';

export type NavTab = '3d-viewer' | 'cours' | 'daviers' | 'dosage' | 'biomecanique' | 'complications' | 'quiz' | 'flashcards';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onQuickQuiz: () => void;
  isLightMode?: boolean;
  isSepiaMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  onQuickQuiz,
  isLightMode = false,
  isSepiaMode = false
}) => {
  const headerBgClass = isSepiaMode
    ? 'bg-[#fbf0d9]/95 border-[#e2d0ab] text-[#2b1f13]'
    : isLightMode
    ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    : 'bg-slate-950/90 border-slate-800 text-white';

  const brandClass = isSepiaMode
    ? 'text-[#451a03] hover:text-amber-700'
    : isLightMode
    ? 'text-slate-900 hover:text-teal-600'
    : 'text-white hover:text-teal-400';

  const navLinkActive = isSepiaMode
    ? 'text-amber-800 font-bold underline underline-offset-8 decoration-2'
    : isLightMode
    ? 'text-teal-700 font-bold underline underline-offset-8 decoration-2'
    : 'text-teal-400 font-semibold underline underline-offset-8 decoration-2';

  const navLinkInactive = isSepiaMode
    ? 'text-[#785b40] hover:text-[#2b1f13]'
    : isLightMode
    ? 'text-slate-600 hover:text-slate-900'
    : 'text-slate-300 hover:text-white';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onTabChange('3d-viewer')}
          className={`text-base sm:text-lg font-bold tracking-tight transition-colors whitespace-nowrap ${brandClass}`}
        >
          Exodontie 3D
        </button>

        {/* Zone 2: 4-6 Nav Links (Single line text with hover states) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onTabChange('3d-viewer')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === '3d-viewer' ? navLinkActive : navLinkInactive
            }`}
          >
            Modèle 3D
          </button>
          <button
            onClick={() => onTabChange('cours')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'cours' ? navLinkActive : navLinkInactive
            }`}
          >
            Cours & Chapitres
          </button>
          <button
            onClick={() => onTabChange('daviers')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'daviers' ? navLinkActive : navLinkInactive
            }`}
          >
            Simulateur Daviers
          </button>
          <button
            onClick={() => onTabChange('dosage')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'dosage' ? navLinkActive : navLinkInactive
            }`}
          >
            Dosage Anesthésie
          </button>
          <button
            onClick={() => onTabChange('complications')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'complications' ? navLinkActive : navLinkInactive
            }`}
          >
            Atlas Complications
          </button>
          <button
            onClick={() => onTabChange('quiz')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'quiz' ? navLinkActive : navLinkInactive
            }`}
          >
            QCM & Quiz
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onQuickQuiz}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm ${
              isSepiaMode
                ? 'bg-amber-700 hover:bg-amber-600 text-amber-50'
                : isLightMode
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold'
            }`}
          >
            Tester mes Connaissances
          </button>
        </div>
      </div>

      {/* Mobile Secondary Scrollable Sub-bar */}
      <div className={`lg:hidden flex items-center gap-2 px-4 py-2 overflow-x-auto border-t text-xs scrollbar-none ${
        isSepiaMode ? 'bg-[#f4e5c5] border-[#e2d0ab]' : isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        {[
          { id: '3d-viewer', label: 'Modèle 3D' },
          { id: 'cours', label: 'Chapitres' },
          { id: 'daviers', label: 'Daviers' },
          { id: 'dosage', label: 'Dosage' },
          { id: 'biomecanique', label: 'Biomécanique' },
          { id: 'complications', label: 'Complications' },
          { id: 'quiz', label: 'QCM' },
          { id: 'flashcards', label: 'Flashcards' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as NavTab)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
              activeTab === item.id
                ? 'bg-teal-500 text-slate-950 font-bold'
                : isLightMode || isSepiaMode
                ? 'text-slate-600 hover:text-slate-950 hover:bg-black/5'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
