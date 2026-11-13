import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto flex items-center gap-3 bg-primary text-on-primary px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 max-w-md">
      <span className="material-symbols-outlined text-[22px] text-primary-fixed">
        {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'task_alt'}
      </span>
      <span className="font-label-lg text-label-lg font-medium leading-tight">
        {toast.message}
      </span>
      <button
        onClick={onClose}
        className="ml-2 text-primary-fixed hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
