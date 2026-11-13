import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import PantryView from './components/PantryView';
import AIRecipeChefView from './components/AIRecipeChefView';
import AnalyticsView from './components/AnalyticsView';
import AddItemModal from './components/AddItemModal';
import RecipeModal from './components/RecipeModal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';

import {
  initialModernPantry,
  initialIndianPantry,
  initialConsumptionLogs,
} from './data/initialData';
import { getExpiryStatus } from './utils/dateUtils';

export default function App() {
  // Cuisine mode: 'modern' | 'indian'
  const [cuisine, setCuisine] = useState(() => {
    return localStorage.getItem('expiryalert_cuisine') || 'modern';
  });

  // Pantry items state with localStorage persistence
  const [pantryItems, setPantryItems] = useState(() => {
    const saved = localStorage.getItem('expiryalert_pantry_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialModernPantry;
  });

  // Consumption logs state with localStorage persistence
  const [consumptionLogs, setConsumptionLogs] = useState(() => {
    const saved = localStorage.getItem('expiryalert_consumption_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialConsumptionLogs;
  });

  // Chef Pot ingredients (selected IDs)
  const [potItems, setPotItems] = useState(() => {
    const saved = localStorage.getItem('expiryalert_pot_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['item-1', 'item-2'];
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQuickRecipeModalOpen, setIsQuickRecipeModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Gemini API Key
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('expiryalert_gemini_key') || '';
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('expiryalert_pantry_items', JSON.stringify(pantryItems));
  }, [pantryItems]);

  useEffect(() => {
    localStorage.setItem('expiryalert_consumption_logs', JSON.stringify(consumptionLogs));
  }, [consumptionLogs]);

  useEffect(() => {
    localStorage.setItem('expiryalert_pot_items', JSON.stringify(potItems));
  }, [potItems]);

  useEffect(() => {
    localStorage.setItem('expiryalert_cuisine', cuisine);
  }, [cuisine]);

  useEffect(() => {
    localStorage.setItem('expiryalert_gemini_key', geminiApiKey);
  }, [geminiApiKey]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.message === message ? null : prev));
    }, 3200);
  };

  // Switch cuisine theme
  const handleSwitchCuisine = (newCuisine) => {
    setCuisine(newCuisine);
    if (newCuisine === 'indian') {
      setPantryItems(initialIndianPantry);
      setPotItems(['item-in-1', 'item-in-2']);
      showToast('Switched to Indian Culinary theme (₹ INR)', 'info');
    } else {
      setPantryItems(initialModernPantry);
      setPotItems(['item-1', 'item-2']);
      showToast('Switched to Global theme ($ USD)', 'info');
    }
  };

  // Add Item handler
  const handleAddItem = (newItem) => {
    setPantryItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to pantry!`, 'success');
  };

  // Delete Item handler
  const handleDeleteItem = (id) => {
    const item = pantryItems.find((i) => i.id === id);
    setPantryItems((prev) => prev.filter((i) => i.id !== id));
    setPotItems((prev) => prev.filter((i) => i !== id));
    showToast(`Removed "${item?.name || 'item'}" from pantry.`, 'info');
  };

  // Mark Consumed handler (US-002 / FR-003)
  const handleMarkConsumed = (id) => {
    const item = pantryItems.find((i) => i.id === id);
    if (!item) return;

    // Small celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });

    const newLog = {
      id: `log-${Date.now()}`,
      itemName: item.name,
      category: item.category,
      quantity: `${item.quantity} ${item.unit}`,
      action: 'consumed',
      recipeUsed: null,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      savedValue: Number(item.estimatedValue) || 3.0,
      weightKg: 0.3,
    };

    setConsumptionLogs((prev) => [newLog, ...prev]);
    setPantryItems((prev) => prev.filter((i) => i.id !== id));
    setPotItems((prev) => prev.filter((i) => i !== id));

    const symbol = cuisine === 'indian' ? '₹' : '$';
    const val = cuisine === 'indian' ? Math.round((item.estimatedValue || 3) * 75) : item.estimatedValue || 3;
    showToast(`Delicious! Rescued ${item.name} (+${symbol}${val} saved)! 🎉`, 'success');
  };

  // Toggle ingredient in Chef Pot
  const handleTogglePotItem = (id) => {
    setPotItems((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Chef Pot', 'info');
        return prev.filter((i) => i !== id);
      } else {
        showToast('Added to Chef Pot for tonight\'s recipe! 🍲', 'success');
        return [...prev, id];
      }
    });
  };

  // Mark Recipe Ingredients as Consumed (Batch action from AI Studio)
  const handleMarkRecipeConsumed = (recipe) => {
    // Find matching items in pantry
    const names = (recipe.rescuedItems || []).map((n) => n.toLowerCase());
    const matchedItems = pantryItems.filter((item) =>
      names.some((n) => item.name.toLowerCase().includes(n) || n.includes(item.name.toLowerCase()))
    );

    const itemsToConsume = matchedItems.length > 0 ? matchedItems : pantryItems.slice(0, 2);

    const newLogs = itemsToConsume.map((item, idx) => ({
      id: `log-${Date.now()}-${idx}`,
      itemName: item.name,
      category: item.category,
      quantity: `${item.quantity} ${item.unit}`,
      action: 'consumed',
      recipeUsed: recipe.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      savedValue: Number(item.estimatedValue) || 3.5,
      weightKg: 0.35,
    }));

    setConsumptionLogs((prev) => [...newLogs, ...prev]);
    setPantryItems((prev) => prev.filter((i) => !itemsToConsume.some((c) => c.id === i.id)));
    setPotItems([]);
  };

  // Reset to default sample showcase data
  const handleResetData = () => {
    if (cuisine === 'indian') {
      setPantryItems(initialIndianPantry);
      setPotItems(['item-in-1', 'item-in-2']);
    } else {
      setPantryItems(initialModernPantry);
      setPotItems(['item-1', 'item-2']);
    }
    setConsumptionLogs(initialConsumptionLogs);
    showToast('Reset pantry to initial showcase data!', 'success');
  };

  // Urgent items count (< 3 days left or expired)
  const urgentCount = pantryItems.filter((i) => getExpiryStatus(i.expiryDate).days <= 3).length;

  // Filtered pantry items if search is active
  const displayedPantryItems = searchQuery.trim()
    ? pantryItems.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.storage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pantryItems;

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased flex">
      {/* Fixed Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalItemsCount={pantryItems.length}
        urgentItemsCount={urgentCount}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Container offset by sidebar width (w-64) */}
      <div className="pl-64 w-full flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          urgentCount={urgentCount}
          cuisine={cuisine}
          setCuisine={handleSwitchCuisine}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          hasGeminiKey={Boolean(geminiApiKey && geminiApiKey.length > 20)}
        />

        {/* View Content (padded top for fixed header h-16) */}
        <main className="w-full pt-16 px-gutter bg-surface min-h-screen flex-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              pantryItems={displayedPantryItems}
              potItems={potItems}
              onTogglePotItem={handleTogglePotItem}
              onMarkConsumed={handleMarkConsumed}
              onDeleteItem={handleDeleteItem}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onOpenQuickRecipe={() => setIsQuickRecipeModalOpen(true)}
              onNavigateToChef={() => setActiveTab('recipe-chef')}
              cuisine={cuisine}
            />
          )}

          {activeTab === 'pantry' && (
            <PantryView
              pantryItems={displayedPantryItems}
              potItems={potItems}
              onTogglePotItem={handleTogglePotItem}
              onMarkConsumed={handleMarkConsumed}
              onDeleteItem={handleDeleteItem}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onNavigateToChef={() => setActiveTab('recipe-chef')}
            />
          )}

          {activeTab === 'recipe-chef' && (
            <AIRecipeChefView
              pantryItems={pantryItems}
              potItems={potItems}
              onMarkRecipeConsumed={handleMarkRecipeConsumed}
              cuisine={cuisine}
              geminiApiKey={geminiApiKey}
              showToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              consumptionLogs={consumptionLogs}
              pantryItems={pantryItems}
              cuisine={cuisine}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveItem={handleAddItem}
      />

      <RecipeModal
        isOpen={isQuickRecipeModalOpen}
        onClose={() => setIsQuickRecipeModalOpen(false)}
        onNavigateToChef={() => setActiveTab('recipe-chef')}
        cuisine={cuisine}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        apiKey={geminiApiKey}
        onSaveApiKey={(key) => {
          setGeminiApiKey(key);
          showToast('Settings saved successfully!', 'success');
        }}
        onResetData={handleResetData}
        cuisine={cuisine}
        onSwitchCuisine={handleSwitchCuisine}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
