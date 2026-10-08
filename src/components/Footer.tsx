import React from 'react';
import { COURSE_INFO } from '../data/courseData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-200">
            {COURSE_INFO.title}
          </div>
          <p className="text-slate-400">
            Support académique universitaire : <strong className="text-slate-300">{COURSE_INFO.author}</strong>
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>{COURSE_INFO.department}</span>
            <span aria-hidden="true">·</span>
            <span>{COURSE_INFO.institution}</span>
          </div>
        </div>

        <div className="text-slate-500 md:text-right space-y-1 max-w-sm">
          <p className="text-slate-400 italic">
            « Il n'y a pas de « petite opération » : une extraction jugée au début simple peut devenir compliquée. »
          </p>
          <p className="text-[11px] text-slate-600">
            Plateforme pédagogique interactive conçue exclusivement à partir du document PDF original (85 diapositives).
          </p>
        </div>
      </div>
    </footer>
  );
};
