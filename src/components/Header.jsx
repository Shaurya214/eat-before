import React from 'react';

export default function Header({
  searchQuery,
  setSearchQuery,
  urgentCount = 0,
  cuisine,
  setCuisine,
  onOpenAddModal,
  onOpenSettings,
  hasGeminiKey = false,
}) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter border-b border-border-subtle/50">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center bg-surface-card rounded-lg px-3 py-1.5 border border-border-subtle focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/10 transition-all shadow-xs">
          <span className="material-symbols-outlined text-[18px] text-outline mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pantry, ingredients, recipes..."
            className="w-full bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-text-primary text-xs ml-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Cuisine & Currency Toggle */}
        <div className="hidden sm:flex items-center p-1 bg-surface-container-low rounded-lg border border-border-subtle/60 text-xs">
          <button
            onClick={() => setCuisine('modern')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              cuisine === 'modern'
                ? 'bg-surface-card text-text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            title="Global Cuisine ($ USD)"
          >
            🌍 Global ($)
          </button>
          <button
            onClick={() => setCuisine('indian')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              cuisine === 'indian'
                ? 'bg-surface-card text-text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            title="Indian Culinary (₹ INR)"
          >
            🇮🇳 Desi (₹)
          </button>
        </div>

        {/* Urgent Expiry Pill */}
        {urgentCount > 0 ? (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-error-container/60 border border-error/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-status-danger animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-error font-bold">
              {urgentCount} Expiring Soon
            </span>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-secondary-container/40 rounded-full">
            <span className="w-2 h-2 rounded-full bg-status-fresh"></span>
            <span className="font-label-sm text-label-sm text-status-fresh font-bold">
              All Fresh
            </span>
          </div>
        )}

        {/* Add Food CTA */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex items-center gap-2 bg-primary-container text-on-primary px-3.5 py-2 rounded-lg font-label-lg text-label-lg hover:bg-primary transition-all shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add Food</span>
        </button>

        {/* AI Key Status Button */}
        <button
          type="button"
          onClick={onOpenSettings}
          title={hasGeminiKey ? "Gemini Live API Connected" : "Local Smart Chef Active (Click to set Gemini API key)"}
          className="p-2 rounded-lg bg-surface-card text-text-secondary hover:text-text-primary border border-border-subtle hover:bg-surface-container-low transition-colors flex items-center gap-1 text-xs"
        >
          <span className="material-symbols-outlined text-[18px] text-tertiary-container">auto_awesome</span>
          <span className="hidden xl:inline font-medium">
            {hasGeminiKey ? 'Gemini Live' : 'Smart Chef'}
          </span>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs ring-2 ring-primary-container/20">
          A
        </div>
      </div>
    </header>
  );
}
