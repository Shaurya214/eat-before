import React from 'react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  totalItemsCount = 8,
  urgentItemsCount = 2,
  onOpenSettings,
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'home',
      badge: null,
    },
    {
      id: 'pantry',
      label: 'My Pantry',
      icon: 'inventory_2',
      badge: `${totalItemsCount} items`,
      badgeStyle: 'bg-secondary-container text-on-secondary-container',
    },
    {
      id: 'recipe-chef',
      label: 'AI Recipe Chef',
      icon: 'auto_awesome',
      badge: 'Gemini',
      badgeStyle: 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold',
    },
    {
      id: 'analytics',
      label: 'Analytics / History',
      icon: 'bar_chart',
      badge: null,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between py-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-border-subtle/50">
      <div className="flex flex-col gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-6 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-text-primary leading-tight font-bold tracking-tight">
              ExpiryAlert
            </span>
            <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider font-semibold">
              Smart Pantry AI
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg transition-all text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-on-primary' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${item.badgeStyle}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Card */}
      <div className="px-4">
        <div className="p-3 bg-surface-card rounded-xl flex items-center justify-between shadow-[0_1px_3px_0_rgba(23,75,53,0.04)] border border-border-subtle/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-text-primary font-semibold leading-tight">
                Rohan
              </span>
              <span className="text-[11px] text-status-fresh font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-fresh"></span>
                88% Zero-Waste
              </span>
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            title="Pantry Settings & API Key"
            className="p-1.5 rounded-lg text-outline hover:text-text-primary hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
