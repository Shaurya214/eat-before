import React, { useState } from 'react';
import { getExpiryStatus } from '../utils/dateUtils';

const CATEGORIES = [
  'All',
  'Dairy',
  'Produce',
  'Pantry & Grains',
  'Meat & Seafood',
  'Bakery',
  'Frozen',
  'Beverages',
  'Snacks',
];

const STORAGE_LOCATIONS = ['All', 'Fridge', 'Pantry', 'Freezer'];
const STATUS_FILTERS = ['All', 'Expiring Soon', 'Fresh', 'Upcoming', 'Expired'];

export default function PantryView({
  pantryItems,
  potItems,
  onTogglePotItem,
  onMarkConsumed,
  onDeleteItem,
  onOpenAddModal,
  onNavigateToChef,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('expiry'); // 'expiry' | 'name' | 'category'

  // Filter items
  const filteredItems = pantryItems.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedStorage !== 'All' && item.storage !== selectedStorage) {
      return false;
    }
    const status = getExpiryStatus(item.expiryDate);
    if (selectedStatus === 'Expiring Soon' && status.status !== 'warning') {
      return false;
    }
    if (selectedStatus === 'Fresh' && status.status !== 'fresh') {
      return false;
    }
    if (selectedStatus === 'Upcoming' && status.status !== 'upcoming') {
      return false;
    }
    if (selectedStatus === 'Expired' && status.status !== 'expired') {
      return false;
    }
    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'expiry') {
      return a.expiryDate.localeCompare(b.expiryDate);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Count items per category
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    if (cat === 'All') {
      acc[cat] = pantryItems.length;
    } else {
      acc[cat] = pantryItems.filter((i) => i.category === cat).length;
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-full pb-16">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pt-2">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
            My Pantry ({pantryItems.length})
          </h1>
          <p className="font-body-md text-body-md text-text-secondary mt-1">
            Complete digital inventory with intelligent shelf-life tracking and recipes.
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToChef}
            className="flex items-center gap-2 bg-surface-card hover:bg-surface-container text-text-primary px-3.5 py-2.5 rounded-lg font-label-md text-label-md border border-border-subtle shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary-container">auto_awesome</span>
            <span>Generate AI Recipe</span>
          </button>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Food Item</span>
          </button>
        </div>
      </div>

      {/* Category Pills Slider / Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] || 0;
          if (cat !== 'All' && count === 0) return null; // Only show active categories or All
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                  : 'bg-surface-card text-text-secondary hover:bg-surface-container border border-border-subtle/60'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-surface-container text-text-secondary'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Storage, Urgency, Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-card rounded-xl border border-border-subtle/50 mb-6 shadow-xs">
        {/* Storage Location Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mr-1">
            Location:
          </span>
          {STORAGE_LOCATIONS.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedStorage(loc)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedStorage === loc
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'text-text-secondary hover:bg-surface-container-low'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Urgency Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mr-1">
            Status:
          </span>
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedStatus === st
                  ? 'bg-primary-container text-on-primary font-semibold'
                  : 'text-text-secondary hover:bg-surface-container-low'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-surface-container-low text-text-primary px-2.5 py-1 rounded-md outline-none border border-border-subtle cursor-pointer font-medium"
          >
            <option value="expiry">Expiry (Soonest)</option>
            <option value="name">Name (A-Z)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Item Cards Grid */}
      {sortedItems.length === 0 ? (
        <div className="bg-surface-card rounded-2xl p-12 text-center border border-dashed border-border-subtle mt-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-low text-primary-container flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[32px]">kitchen</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-text-primary font-bold">
            No items match this filter
          </h3>
          <p className="font-body-md text-body-md text-text-secondary max-w-md mx-auto mt-1 mb-5">
            Try choosing a different category or click below to add new groceries to your pantry.
          </p>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary px-5 py-2.5 rounded-xl font-label-md text-label-md hover:bg-primary shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Food Item</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedItems.map((item) => {
            const status = getExpiryStatus(item.expiryDate);
            const isInPot = potItems.includes(item.id);

            // Freshness gauge percentage
            const days = status.days;
            const progressPct = days <= 0 ? 0 : Math.min(100, Math.max(10, Math.round((days / 14) * 100)));
            const progressColor =
              days < 0
                ? 'bg-status-danger'
                : days <= 3
                ? 'bg-status-warning'
                : days <= 7
                ? 'bg-status-upcoming'
                : 'bg-status-fresh';

            return (
              <div
                key={item.id}
                className="bg-surface-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-border-subtle/50 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Status & Category Badges */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container-low text-text-secondary text-xs font-semibold">
                      {item.category}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${status.badgeColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}></span>
                      {status.badgeLabel}
                    </span>
                  </div>

                  {/* Main Item Info */}
                  <div className="flex items-start gap-3.5 mt-2">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[26px]">
                        {item.icon || 'kitchen'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                        <span>Quantity: {item.quantity} {item.unit}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">kitchen</span>
                          {item.storage}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shelf-Life Visual Gauge */}
                  <div className="mt-4 pt-3 border-t border-border-subtle/40">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-secondary">Expiry Timeline:</span>
                      <span className={`font-semibold ${status.indicatorColor}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                      <div
                        className={`h-full ${progressColor} rounded-full transition-all duration-500`}
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-outline mt-1">
                      <span>Expires: {item.expiryDate}</span>
                      <span>Bought: {item.purchaseDate}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-border-subtle/50 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onTogglePotItem(item.id)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${
                      isInPot
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'bg-surface-container-low hover:bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">soup_kitchen</span>
                    <span>{isInPot ? 'In Pot ✓' : 'Add to Pot'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onMarkConsumed(item.id)}
                    className="py-1.5 px-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors flex items-center justify-center gap-1 shadow-xs"
                    title="Mark Consumed"
                  >
                    <span className="material-symbols-outlined text-[16px]">done_all</span>
                    <span>Consumed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors"
                    title="Delete Item"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
