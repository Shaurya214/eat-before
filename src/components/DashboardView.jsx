import React from 'react';
import { getExpiryStatus } from '../utils/dateUtils';

export default function DashboardView({
  pantryItems,
  potItems,
  onTogglePotItem,
  onMarkConsumed,
  onDeleteItem,
  onOpenAddModal,
  onOpenQuickRecipe,
  onNavigateToChef,
  cuisine,
}) {
  // Sort items by expiry urgency
  const sortedItems = [...pantryItems].sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));

  // Items needing attention: expiring soon (0 to 3 days) or expired
  const urgentItems = sortedItems.filter((i) => {
    const s = getExpiryStatus(i.expiryDate);
    return s.days <= 3;
  });

  // Calculate high-level stats
  const totalValueAtRisk = urgentItems
    .reduce((sum, item) => sum + (Number(item.estimatedValue) || 3.0), 0)
    .toFixed(2);

  const currencySymbol = cuisine === 'indian' ? '₹' : '$';
  const displayValueAtRisk = cuisine === 'indian' ? Math.round(Number(totalValueAtRisk) * 75) : totalValueAtRisk;

  // Recipe pick based on cuisine
  const chefPick = cuisine === 'indian' ? {
    title: 'Creamy Palak Paneer Bhurji with Roti',
    desc: 'Uses your expiring Palak & Milk before tomorrow!',
    time: '15 mins',
    difficulty: 'Easy',
    rescued: ['Amul Milk', 'Fresh Palak'],
  } : {
    title: 'Creamy Spinach Garlic Pasta',
    desc: 'Uses your expiring Baby Spinach & Whole Milk before tomorrow!',
    time: '15 mins',
    difficulty: 'Easy',
    rescued: ['Whole Milk', 'Baby Spinach'],
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Greeting & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pt-2">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
            {cuisine === 'indian' ? 'Namaste, Alex! 🙏' : 'Good afternoon, Alex! 👋'}
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary mt-1">
            Here's what needs cooking first. {urgentItems.length} items require attention to avoid spoilage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 bg-surface-card hover:bg-surface-container text-text-primary px-3.5 py-2 rounded-lg font-label-md text-label-md border border-border-subtle shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Quick Log Item</span>
          </button>
          <button
            onClick={onNavigateToChef}
            className="flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Generate Dinner Recipe</span>
          </button>
        </div>
      </div>

      {/* 3 KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-card rounded-xl p-4 shadow-sm border border-border-subtle/50 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-text-secondary tracking-wider">
              Items At Risk
            </span>
            <div className="w-8 h-8 rounded-lg bg-error-container/60 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg font-bold text-text-primary">
                {urgentItems.length}
              </span>
              <span className="font-label-sm text-label-sm text-error font-medium">Expiring &lt; 3 days</span>
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">Prioritize these in recipes</p>
          </div>
        </div>

        <div className="bg-surface-card rounded-xl p-4 shadow-sm border border-border-subtle/50 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-text-secondary tracking-wider">
              Perishable Value At Stake
            </span>
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg font-bold text-text-primary">
                {currencySymbol}{displayValueAtRisk}
              </span>
              <span className="font-label-sm text-label-sm text-status-fresh font-bold flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> Can be rescued
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">Cook to prevent financial loss</p>
          </div>
        </div>

        <div className="bg-surface-card rounded-xl p-4 shadow-sm border border-border-subtle/50 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-text-secondary tracking-wider">
              Zero-Waste Health
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]">eco</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg font-bold text-text-primary">
                88.4%
              </span>
              <span className="font-label-sm text-label-sm text-status-fresh font-bold">+4.2% this month</span>
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">Top 10% eco-friendly households</p>
          </div>
        </div>
      </section>

      {/* Perishables Need Attention Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-text-primary">
              Perishables Need Attention
            </h2>
            <p className="font-body-sm text-body-sm text-text-secondary">
              Items expiring in 0–3 days. Add them into tonight's cook pot or mark as consumed.
            </p>
          </div>
          <span className="px-2.5 py-1 bg-surface-container-low rounded-full text-xs font-semibold text-text-secondary">
            {urgentItems.length} Urgent Items
          </span>
        </div>

        {urgentItems.length === 0 ? (
          <div className="bg-surface-card rounded-xl p-6 text-center border border-dashed border-border-subtle">
            <span className="material-symbols-outlined text-[36px] text-status-fresh mb-2">task_alt</span>
            <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">All Clear!</h3>
            <p className="font-body-sm text-body-sm text-text-secondary mt-1">
              No perishables are expiring in the next 3 days. Your pantry is in great shape!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgentItems.map((item) => {
              const status = getExpiryStatus(item.expiryDate);
              const isInPot = potItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-border-subtle/50 flex flex-col justify-between"
                >
                  {/* Urgency indicator strip on left */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${status.dotColor}`}></div>

                  <div className="pl-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-text-primary flex-shrink-0">
                          <span className="material-symbols-outlined text-[22px]">{item.icon || 'kitchen'}</span>
                        </div>
                        <div>
                          <h3 className="font-label-lg text-label-lg font-bold text-text-primary">
                            {item.name}
                          </h3>
                          <span className="font-body-sm text-body-sm text-text-secondary">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${status.badgeColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}></span>
                        {status.label}
                      </span>
                      <span className="text-[11px] text-text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">kitchen</span>
                        {item.storage} • {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-border-subtle/60 flex items-center justify-between gap-2 pl-2">
                    <button
                      type="button"
                      onClick={() => onTogglePotItem(item.id)}
                      className={`px-2.5 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 ${
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
                      className="px-2.5 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">done_all</span>
                      <span>Consumed</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Generative Chef Pick Hero Banner */}
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary p-6 shadow-md">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl transform skew-x-12 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card/15 backdrop-blur-md text-primary-fixed text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Generative Chef Pick of the Day</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                {chefPick.title}
              </h2>
              <p className="text-primary-fixed/90 text-sm mb-4 leading-relaxed">
                {chefPick.desc}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>{chefPick.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  <span>{chefPick.difficulty}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[16px]">eco</span>
                  <span>Rescues: {chefPick.rescued.join(' + ')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenQuickRecipe}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-label-md text-label-md backdrop-blur-md transition-all flex items-center gap-1.5"
              >
                <span>Review Steps</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={onNavigateToChef}
                className="px-5 py-2.5 rounded-xl bg-white text-primary font-bold font-label-md text-label-md hover:bg-primary-fixed shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">soup_kitchen</span>
                <span>Cook with AI</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pantry Inventory & Expiry Ledger Section */}
      <section className="bg-surface-card rounded-xl p-5 shadow-sm border border-border-subtle/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-text-primary">
              Pantry Inventory & Expiry Ledger
            </h2>
            <p className="font-body-sm text-body-sm text-text-secondary">
              Real-time shelf-life tracking for all tracked items.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 text-primary-container hover:text-primary font-semibold text-sm self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Item</span>
          </button>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                <th className="py-2.5 px-3">Item</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Storage</th>
                <th className="py-2.5 px-3">Expiry Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60 text-sm">
              {sortedItems.map((item) => {
                const status = getExpiryStatus(item.expiryDate);
                const isInPot = potItems.includes(item.id);

                return (
                  <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {item.icon || 'kitchen'}
                        </span>
                        <div>
                          <span className="font-semibold text-text-primary block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-text-secondary font-medium">
                      {item.category}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-surface-container-low text-text-secondary text-xs">
                        {item.storage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">
                      {item.expiryDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.badgeColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}></span>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onTogglePotItem(item.id)}
                          title="Add / Remove from Chef Pot"
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            isInPot
                              ? 'bg-primary text-on-primary font-bold'
                              : 'text-text-secondary hover:text-text-primary hover:bg-surface-container'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">soup_kitchen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onMarkConsumed(item.id)}
                          title="Mark as Consumed"
                          className="p-1.5 rounded-lg text-primary-container hover:bg-primary-container/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">done_all</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem(item.id)}
                          title="Delete item"
                          className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
