import React, { useState } from 'react';

export default function AnalyticsView({
  consumptionLogs = [],
  pantryItems = [],
  cuisine,
  showToast,
}) {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currencySymbol = cuisine === 'indian' ? '₹' : '$';
  const multiplier = cuisine === 'indian' ? 75 : 1;

  // Aggregate logs
  const consumedLogs = consumptionLogs.filter(l => l.action === 'consumed');
  const wastedLogs = consumptionLogs.filter(l => l.action === 'wasted');

  const totalConsumedCount = consumedLogs.length;
  const totalWastedCount = wastedLogs.length;
  const totalActioned = totalConsumedCount + totalWastedCount || 1;

  const foodSavedPct = Math.round((totalConsumedCount / totalActioned) * 100) || 88;
  const spoilageRatePct = 100 - foodSavedPct;

  const totalSavedValue = (
    consumedLogs.reduce((sum, l) => sum + (l.savedValue || 2.5), 0) * multiplier
  ).toFixed(cuisine === 'indian' ? 0 : 2);

  const totalKgPrevented = (
    consumedLogs.reduce((sum, l) => sum + (l.weightKg || 0.3), 0)
  ).toFixed(1);

  const rangeOptions = ['This Week', 'This Month', 'Last 30 Days', 'All Time'];

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(consumptionLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "expiryalert_waste_report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Zero-waste analytics report downloaded!', 'info');
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pt-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container mb-2 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">eco</span>
            <span>Zero-Waste Scorecard</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
            Pantry Analytics & Impact
          </h1>
          <p className="font-body-md text-body-md text-text-secondary mt-1">
            Track your food waste reduction, grocery money saved, and eco-friendly consumption habits.
          </p>
        </div>

        {/* Date Range Filter & Export */}
        <div className="flex items-center gap-3">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-between gap-2.5 px-4 py-2.5 bg-surface-card border border-border-subtle rounded-xl shadow-xs font-label-md text-label-md text-text-primary hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-text-secondary">calendar_today</span>
              <span>{timeRange}</span>
              <span className="material-symbols-outlined text-[18px] text-outline">expand_more</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-surface-card border border-border-subtle shadow-xl z-20 py-1 flex flex-col">
                {rangeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setTimeRange(opt);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                      timeRange === opt ? 'font-bold text-primary-container bg-surface-container-low' : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span>{opt}</span>
                    {timeRange === opt && (
                      <span className="material-symbols-outlined text-[16px] text-primary-container">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="p-2.5 bg-surface-card border border-border-subtle text-text-secondary hover:text-text-primary rounded-xl shadow-xs transition-colors"
            title="Download JSON Report"
          >
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
          </button>
        </div>
      </section>

      {/* 4 Bento Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Metric 1 */}
        <div className="bg-surface-card rounded-2xl p-5 shadow-sm border border-border-subtle/50 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[22px]">energy_savings_leaf</span>
            </div>
            <div className="inline-flex items-center gap-1 text-status-fresh text-xs font-bold bg-surface-container-low px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+14%</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-headline-lg text-headline-lg text-text-primary font-bold">
              {foodSavedPct}%
            </span>
            <div className="font-label-md text-label-md text-text-primary font-semibold mt-0.5">
              Total Food Saved
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-1">
              Consumed safely before expiration
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-card rounded-2xl p-5 shadow-sm border border-border-subtle/50 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[22px]">savings</span>
            </div>
            <div className="inline-flex items-center gap-1 text-on-tertiary-fixed-variant text-xs font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded-full">
              <span>Rescued</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-headline-lg text-headline-lg text-text-primary font-bold">
              {currencySymbol}{totalSavedValue}
            </span>
            <div className="font-label-md text-label-md text-text-primary font-semibold mt-0.5">
              Grocery Money Saved
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-1">
              Prevented from spoilage loss
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-card rounded-2xl p-5 shadow-sm border border-border-subtle/50 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-error-container text-on-error-container">
              <span className="material-symbols-outlined text-[22px]">delete_sweep</span>
            </div>
            <div className="inline-flex items-center gap-1 text-status-fresh text-xs font-bold bg-surface-container-low px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              <span>-6% lower</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-headline-lg text-headline-lg text-text-primary font-bold">
              {spoilageRatePct}%
            </span>
            <div className="font-label-md text-label-md text-text-primary font-semibold mt-0.5">
              Household Spoilage Rate
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-1">
              National average is 31.2%
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-card rounded-2xl p-5 shadow-sm border border-border-subtle/50 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-primary-container text-on-primary">
              <span className="material-symbols-outlined text-[22px]">compost</span>
            </div>
            <div className="inline-flex items-center gap-1 text-primary-container text-xs font-bold bg-primary-fixed px-2 py-0.5 rounded-full">
              <span>Eco Win</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-headline-lg text-headline-lg text-text-primary font-bold">
              {totalKgPrevented} kg
            </span>
            <div className="font-label-md text-label-md text-text-primary font-semibold mt-0.5">
              Total Waste Prevented
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-1">
              ~26.4 kg CO2 greenhouse emissions averted
            </p>
          </div>
        </div>
      </section>

      {/* Middle Grid: Waste vs Consumed + Category Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Waste vs Consumed Ratio Card (7 cols) */}
        <div className="lg:col-span-7 bg-surface-card rounded-2xl p-6 shadow-sm border border-border-subtle/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">
                  Waste vs. Consumed Ratio
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Proportion of logged food successfully eaten before spoilage
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                {foodSavedPct}% Rescued
              </span>
            </div>

            {/* Split Visual Progress Bar */}
            <div className="w-full h-5 bg-surface-container-low rounded-full overflow-hidden flex p-1 border border-border-subtle/40 mb-3">
              <div
                className="h-full bg-status-fresh rounded-full transition-all duration-700"
                style={{ width: `${foodSavedPct}%` }}
                title={`${foodSavedPct}% Consumed`}
              ></div>
              <div
                className="h-full bg-status-danger rounded-full transition-all duration-700 ml-1"
                style={{ width: `${spoilageRatePct}%` }}
                title={`${spoilageRatePct}% Wasted`}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-text-secondary pt-1">
              <span className="flex items-center gap-1.5 text-status-fresh">
                <span className="w-2.5 h-2.5 rounded-full bg-status-fresh"></span>
                Consumed ({totalConsumedCount} items)
              </span>
              <span className="flex items-center gap-1.5 text-error">
                <span className="w-2.5 h-2.5 rounded-full bg-status-danger"></span>
                Spoiled / Discarded ({totalWastedCount} items)
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle/50 grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-surface-container-low">
              <span className="text-text-secondary block">Rescued Culinary Value</span>
              <span className="text-base font-bold text-status-fresh">{currencySymbol}{totalSavedValue}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <span className="text-text-secondary block">Avg Spoilage Cost / Wk</span>
              <span className="text-base font-bold text-text-primary">{currencySymbol}{cuisine === 'indian' ? '120' : '3.80'}</span>
            </div>
          </div>
        </div>

        {/* Category Efficiency (5 cols) */}
        <div className="lg:col-span-5 bg-surface-card rounded-2xl p-6 shadow-sm border border-border-subtle/50">
          <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary mb-1">
            Category Consumption Rates
          </h3>
          <p className="text-xs text-text-secondary mb-4">
            Efficiency by perishable food groups
          </p>

          <div className="space-y-3.5">
            {[
              { name: 'Dairy & Eggs', pct: 92, count: '12/13 saved' },
              { name: 'Fresh Produce & Greens', pct: 81, count: '17/21 saved' },
              { name: 'Pantry Grains & Staples', pct: 98, count: '24/25 saved' },
              { name: 'Bakery & Bread', pct: 85, count: '6/7 saved' },
            ].map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="text-text-primary font-semibold">{cat.name}</span>
                  <span className="text-text-secondary">{cat.pct}% ({cat.count})</span>
                </div>
                <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full"
                    style={{ width: `${cat.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consumption & Action History Ledger */}
      <section className="bg-surface-card rounded-2xl p-6 shadow-sm border border-border-subtle/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">
              Expiry Timeline & Consumption Log
            </h3>
            <p className="text-xs text-text-secondary">
              Chronological log of eaten, rescued, and expired grocery items
            </p>
          </div>
          <span className="text-xs font-bold text-text-secondary bg-surface-container-low px-2.5 py-1 rounded-full">
            {consumptionLogs.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                <th className="py-2.5 px-3">Item Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Action Status</th>
                <th className="py-2.5 px-3">Recipe Used</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Value Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50 text-text-primary font-medium">
              {consumptionLogs.map((log) => {
                const isConsumed = log.action === 'consumed';
                return (
                  <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-3 font-semibold">
                      {log.itemName}
                      {log.quantity && <span className="text-text-secondary font-normal ml-1">({log.quantity})</span>}
                    </td>
                    <td className="py-3 px-3 text-text-secondary">
                      {log.category}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${
                        isConsumed
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-error-container text-on-error-container'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isConsumed ? 'bg-status-fresh' : 'bg-status-danger'}`}></span>
                        {isConsumed ? 'Consumed' : 'Spoiled / Discarded'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">
                      {log.recipeUsed ? (
                        <span className="flex items-center gap-1 text-primary-container font-semibold">
                          <span className="material-symbols-outlined text-[14px]">soup_kitchen</span>
                          {log.recipeUsed}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3 px-3 text-text-secondary">
                      {log.date}
                    </td>
                    <td className="py-3 px-3 text-right font-bold">
                      {isConsumed ? (
                        <span className="text-status-fresh">+{currencySymbol}{(log.savedValue * multiplier).toFixed(cuisine === 'indian' ? 0 : 2)}</span>
                      ) : (
                        <span className="text-outline">Wasted</span>
                      )}
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
