import React from 'react';

export default function RecipeModal({ isOpen, onClose, onNavigateToChef, cuisine }) {
  if (!isOpen) return null;

  const isIndian = cuisine === 'indian';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-surface rounded-2xl w-full max-w-lg shadow-2xl border border-border-subtle overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-card">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary-container text-[24px]">soup_kitchen</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">
              {isIndian ? 'Creamy Palak Paneer Bhurji' : 'Creamy Spinach Garlic Pasta'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-text-primary hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-text-primary">
          <div className="p-3 rounded-xl bg-status-warning/10 border border-status-warning/30 flex items-center gap-2.5 text-xs text-tertiary-container font-semibold">
            <span className="material-symbols-outlined text-[18px] text-status-warning">eco</span>
            <span>Rescues {isIndian ? 'Amul Milk (1d left) & Fresh Palak (2d left)' : 'Whole Milk (1d left) & Baby Spinach (2d left)'}</span>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-text-secondary mb-2">Quick Overview</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container-low font-semibold">
                <span className="text-text-secondary block font-normal">Prep + Cook</span>
                15 Mins
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low font-semibold">
                <span className="text-text-secondary block font-normal">Difficulty</span>
                Easy
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low font-semibold">
                <span className="text-text-secondary block font-normal">Servings</span>
                2 Persons
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-text-secondary mb-2">Step-by-Step Cooking Steps</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-text-secondary leading-relaxed">
              <li><strong className="text-text-primary">Sauté Aromatics:</strong> Warm olive oil or butter, sizzle garlic until fragrant.</li>
              <li><strong className="text-text-primary">Wilt Greens:</strong> Toss in washed spinach leaves for 2 minutes until glossy green.</li>
              <li><strong className="text-text-primary">Simmer Milk Sauce:</strong> Pour in milk, stir continuously with cheese/crumbled paneer until smooth.</li>
              <li><strong className="text-text-primary">Serve:</strong> Season with crushed black pepper & serve hot!</li>
            </ol>
          </div>
        </div>

        <div className="px-6 py-4 bg-surface-card border-t border-border-subtle flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-text-secondary hover:text-text-primary text-xs font-semibold"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateToChef();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            <span>Open in AI Recipe Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
