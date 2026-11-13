// Utility to get ISO date string offset from today
export const getOffsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const getOffsetFormatted = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Initial Pantry Items (Modern Global Theme)
export const initialModernPantry = [
  {
    id: 'item-1',
    name: 'Whole Organic Milk',
    category: 'Dairy',
    quantity: '1',
    unit: 'Gallon',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-5),
    expiryDate: getOffsetDate(1), // Tomorrow
    estimatedValue: 4.80,
    icon: 'water_bottle',
  },
  {
    id: 'item-2',
    name: 'Baby Spinach',
    category: 'Produce',
    quantity: '1',
    unit: 'Clamshell (5oz)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-3),
    expiryDate: getOffsetDate(2), // 2 days left
    estimatedValue: 3.50,
    icon: 'eco',
  },
  {
    id: 'item-3',
    name: 'Greek Yogurt',
    category: 'Dairy',
    quantity: '1',
    unit: 'Tub (32oz)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-6),
    expiryDate: getOffsetDate(3), // 3 days left
    estimatedValue: 5.20,
    icon: 'egg_alt',
  },
  {
    id: 'item-4',
    name: 'Sharp Cheddar Cheese Block',
    category: 'Dairy',
    quantity: '1',
    unit: 'Block (8oz)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-10),
    expiryDate: getOffsetDate(5), // 5 days left
    estimatedValue: 4.10,
    icon: 'cookie',
  },
  {
    id: 'item-5',
    name: 'Fusilli Pasta',
    category: 'Pantry & Grains',
    quantity: '2',
    unit: 'Boxes (16oz)',
    storage: 'Pantry',
    purchaseDate: getOffsetDate(-20),
    expiryDate: getOffsetDate(60), // Fresh
    estimatedValue: 2.50,
    icon: 'ramen_dining',
  },
  {
    id: 'item-6',
    name: 'Fresh Garlic Bulbs',
    category: 'Produce',
    quantity: '3',
    unit: 'Heads',
    storage: 'Pantry',
    purchaseDate: getOffsetDate(-7),
    expiryDate: getOffsetDate(12), // Fresh
    estimatedValue: 1.80,
    icon: 'nutrition',
  },
  {
    id: 'item-7',
    name: 'Extra Virgin Olive Oil',
    category: 'Pantry & Grains',
    quantity: '1',
    unit: 'Bottle (500ml)',
    storage: 'Pantry',
    purchaseDate: getOffsetDate(-30),
    expiryDate: getOffsetDate(120), // Fresh
    estimatedValue: 9.50,
    icon: 'liquor',
  },
  {
    id: 'item-8',
    name: 'Ripe Avocados',
    category: 'Produce',
    quantity: '2',
    unit: 'Pieces',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-10),
    expiryDate: getOffsetDate(-2), // EXPIRED 2 days ago (demonstrates US-004 safety guard)
    estimatedValue: 3.00,
    icon: 'spa',
  },
];

// Initial Pantry Items (Indian Culinary Theme)
export const initialIndianPantry = [
  {
    id: 'item-in-1',
    name: 'Amul Taaza Toned Milk',
    category: 'Dairy',
    quantity: '1',
    unit: 'Litre Pouch',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-3),
    expiryDate: getOffsetDate(1), // Tomorrow
    estimatedValue: 68,
    icon: 'water_bottle',
  },
  {
    id: 'item-in-2',
    name: 'Fresh Palak / Spinach',
    category: 'Produce',
    quantity: '1',
    unit: 'Bunch (250g)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-2),
    expiryDate: getOffsetDate(2), // 2 days left
    estimatedValue: 40,
    icon: 'eco',
  },
  {
    id: 'item-in-3',
    name: 'Dahi / Fresh Curd',
    category: 'Dairy',
    quantity: '1',
    unit: 'Tub (400g)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-4),
    expiryDate: getOffsetDate(3), // 3 days left
    estimatedValue: 55,
    icon: 'egg_alt',
  },
  {
    id: 'item-in-4',
    name: 'Fresh Malai Paneer',
    category: 'Dairy',
    quantity: '1',
    unit: 'Pack (200g)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-3),
    expiryDate: getOffsetDate(5), // 5 days left
    estimatedValue: 110,
    icon: 'cookie',
  },
  {
    id: 'item-in-5',
    name: 'Aashirvaad Whole Wheat Atta',
    category: 'Pantry & Grains',
    quantity: '5',
    unit: 'kg Bag',
    storage: 'Pantry',
    purchaseDate: getOffsetDate(-15),
    expiryDate: getOffsetDate(90),
    estimatedValue: 260,
    icon: 'grain',
  },
  {
    id: 'item-in-6',
    name: 'Ginger & Garlic Paste',
    category: 'Produce',
    quantity: '1',
    unit: 'Jar (200g)',
    storage: 'Fridge',
    purchaseDate: getOffsetDate(-10),
    expiryDate: getOffsetDate(14),
    estimatedValue: 65,
    icon: 'nutrition',
  },
  {
    id: 'item-in-7',
    name: 'Fortune Mustard Oil',
    category: 'Pantry & Grains',
    quantity: '1',
    unit: 'Litre Bottle',
    storage: 'Pantry',
    purchaseDate: getOffsetDate(-25),
    expiryDate: getOffsetDate(180),
    estimatedValue: 175,
    icon: 'liquor',
  },
  {
    id: 'item-in-8',
    name: 'Overripe Bananas',
    category: 'Produce',
    quantity: '4',
    unit: 'Pieces',
    storage: 'Pantry',
    purchaseDate: getOffsetDate(-8),
    expiryDate: getOffsetDate(-2), // EXPIRED
    estimatedValue: 40,
    icon: 'spa',
  },
];

// Initial Consumption & Waste History Log (for Analytics)
export const initialConsumptionLogs = [
  {
    id: 'log-1',
    itemName: 'Brown Eggs (Dozen)',
    category: 'Dairy',
    quantity: '6 pcs',
    action: 'consumed',
    recipeUsed: 'Creamy Garlic & Spinach Frittata',
    date: getOffsetFormatted(-1),
    savedValue: 3.20,
    weightKg: 0.35,
  },
  {
    id: 'log-2',
    itemName: 'Whole Wheat Sandwich Bread',
    category: 'Bakery',
    quantity: '1 loaf',
    action: 'consumed',
    recipeUsed: 'Golden Garlic Herb Croutons',
    date: getOffsetFormatted(-2),
    savedValue: 4.50,
    weightKg: 0.50,
  },
  {
    id: 'log-3',
    itemName: 'Strawberries',
    category: 'Produce',
    quantity: '1 box',
    action: 'wasted',
    recipeUsed: null,
    date: getOffsetFormatted(-4),
    savedValue: 0,
    weightKg: 0.25,
  },
  {
    id: 'log-4',
    itemName: 'Cottage Cheese / Paneer',
    category: 'Dairy',
    quantity: '200g',
    action: 'consumed',
    recipeUsed: 'Palak Paneer Bhurji with Roti',
    date: getOffsetFormatted(-6),
    savedValue: 3.80,
    weightKg: 0.20,
  },
  {
    id: 'log-5',
    itemName: 'Ripe Bananas',
    category: 'Produce',
    quantity: '3 pcs',
    action: 'consumed',
    recipeUsed: 'Zero-Waste Banana Oat Mug Cake',
    date: getOffsetFormatted(-8),
    savedValue: 1.50,
    weightKg: 0.40,
  },
];
