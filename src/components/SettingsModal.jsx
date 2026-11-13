import React, { useState } from 'react';

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  onResetData,
  cuisine,
  onSwitchCuisine,
}) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-surface rounded-2xl w-full max-w-md shadow-2xl border border-border-subtle overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-card">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary-container text-[22px]">settings</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">
              Pantry & AI Settings
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

        <form onSubmit={handleSave} className="p-6 space-y-5 text-sm">
          {/* Gemini API Key */}
          <div>
            <label className="block font-label-md text-label-md font-semibold text-text-primary mb-1">
              Google Gemini API Key (Optional)
            </label>
            <p className="text-xs text-text-secondary mb-2">
              Add your Gemini API key to enable live LLM recipe generation. If empty, the app uses the built-in intelligent chef engine with 0 failures!
            </p>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3 pr-10 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-xs font-mono outline-none focus:border-primary-container"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2.5 text-outline hover:text-text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showKey ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Cuisine & Currency Mode */}
          <div>
            <label className="block font-label-md text-label-md font-semibold text-text-primary mb-1.5">
              Cuisine & Currency Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSwitchCuisine('modern')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  cuisine === 'modern'
                    ? 'border-primary-container bg-secondary-container/30 text-text-primary font-bold'
                    : 'border-border-subtle bg-surface-card text-text-secondary'
                }`}
              >
                <span className="block text-sm">🌍 Global Theme</span>
                <span className="text-[11px] text-text-secondary font-normal">$ USD • Continental</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchCuisine('indian')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  cuisine === 'indian'
                    ? 'border-primary-container bg-secondary-container/30 text-text-primary font-bold'
                    : 'border-border-subtle bg-surface-card text-text-secondary'
                }`}
              >
                <span className="block text-sm">🇮🇳 Desi Theme</span>
                <span className="text-[11px] text-text-secondary font-normal">₹ INR • Indian Tadka</span>
              </button>
            </div>
          </div>

          {/* Reset Demo Data */}
          <div className="pt-3 border-t border-border-subtle">
            <label className="block font-label-md text-label-md font-semibold text-text-primary mb-1">
              Demo Showcase Controls
            </label>
            <p className="text-xs text-text-secondary mb-2">
              Restore the default demo grocery pantry items and consumption records.
            </p>
            <button
              type="button"
              onClick={() => {
                onResetData();
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-text-primary border border-border-subtle text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Reset Pantry to Showcase State</span>
            </button>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold hover:bg-primary shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
