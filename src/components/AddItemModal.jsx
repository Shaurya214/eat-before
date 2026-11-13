import React, { useState, useEffect } from 'react';
import { getExpiryStatus, getOffsetDate } from '../utils/dateUtils';

const CATEGORIES = [
  'Produce',
  'Dairy',
  'Pantry & Grains',
  'Meat & Seafood',
  'Bakery',
  'Frozen',
  'Beverages',
  'Snacks',
  'Condiments',
  'Other',
];

const STORAGE_OPTIONS = ['Fridge', 'Pantry', 'Freezer'];

export default function AddItemModal({ isOpen, onClose, onSaveItem }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Produce');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('Item');
  const [storage, setStorage] = useState('Fridge');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(getOffsetDate(3));
  const [estimatedValue, setEstimatedValue] = useState('3.50');

  useEffect(() => {
    if (isOpen) {
      // Reset form with sensible defaults
      setPurchaseDate(new Date().toISOString().split('T')[0]);
      setExpiryDate(getOffsetDate(3));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate live urgency status
  const previewStatus = getExpiryStatus(expiryDate);

  const applyPresetDate = (days) => {
    setExpiryDate(getOffsetDate(days));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    let icon = 'kitchen';
    if (category === 'Dairy') icon = 'water_bottle';
    else if (category === 'Produce') icon = 'eco';
    else if (category === 'Pantry & Grains') icon = 'ramen_dining';
    else if (category === 'Meat & Seafood') icon = 'set_meal';
    else if (category === 'Bakery') icon = 'bakery_dining';

    onSaveItem({
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      quantity: quantity || '1',
      unit: unit || 'Item',
      storage,
      purchaseDate,
      expiryDate,
      estimatedValue: parseFloat(estimatedValue) || 3.0,
      icon,
    });

    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-inverse-surface/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-surface rounded-2xl w-full max-w-lg shadow-2xl border border-border-subtle overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_box</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-text-primary leading-tight">
                Add New Food Item
              </h2>
              <span className="font-body-sm text-body-sm text-text-secondary">
                Track expiry date and prevent food waste
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-text-primary hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Food Name */}
          <div>
            <label className="block font-label-md text-label-md text-text-primary mb-1.5 font-semibold">
              Item Name <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-outline">
                shopping_cart
              </span>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. Greek Yogurt, Fresh Coriander, Bell Peppers"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-surface-card border border-border-subtle rounded-xl font-body-md text-body-md text-text-primary shadow-xs focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
              />
            </div>
          </div>

          {/* Category & Storage Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md text-text-primary mb-1.5 font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-card border border-border-subtle rounded-xl font-body-md text-body-md text-text-primary outline-none focus:border-primary-container"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-text-primary mb-1.5 font-semibold">
                Storage Place
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-low rounded-xl border border-border-subtle">
                {STORAGE_OPTIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setStorage(loc)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      storage === loc
                        ? 'bg-surface-card text-text-primary shadow-xs'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md text-text-primary mb-1.5 font-semibold">
                Quantity
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="1"
                className="w-full px-3 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-text-primary outline-none focus:border-primary-container"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-text-primary mb-1.5 font-semibold">
                Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Pcs, Litre, Tub"
                className="w-full px-3 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-text-primary outline-none focus:border-primary-container"
              />
            </div>
          </div>

          {/* Expiry Date Section with Presets & Live Urgency Preview */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-label-md text-label-md text-text-primary font-semibold">
                Expiry Date <span className="text-error">*</span>
              </label>
              {/* LIVE PREVIEW BADGE */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${previewStatus.badgeColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${previewStatus.dotColor}`}></span>
                <span>{previewStatus.label}</span>
              </span>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[11px] text-text-secondary font-medium">Quick Presets:</span>
              {[
                { label: '+2 Days', days: 2 },
                { label: '+5 Days', days: 5 },
                { label: '+1 Week', days: 7 },
                { label: '+2 Weeks', days: 14 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPresetDate(p.days)}
                  className="px-2.5 py-1 rounded-md bg-surface-container-low hover:bg-surface-container text-text-primary text-xs font-medium border border-border-subtle transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <input
              type="date"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-text-primary outline-none focus:border-primary-container shadow-xs font-medium"
            />
          </div>

          {/* Purchase Date & Estimated Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-secondary mb-1">
                Purchased On (Defaults to Today)
              </label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle rounded-xl text-xs text-text-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">
                Estimated Value
              </label>
              <input
                type="number"
                step="0.5"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="3.50"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle rounded-xl text-xs text-text-primary outline-none"
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-container-low font-label-md text-label-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Save Food Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
