# ExpiryAlert – Smart AI-Powered Digital Pantry Manager 🥑✨

> **Stop throwing away food. Let AI tell you what to cook with what's expiring today.**

ExpiryAlert is a responsive web application and digital pantry assistant designed to tackle household food waste. It combines shelf-life date tracking, color-coded urgency indicators, and a **Google Gemini-powered AI Recipe Studio** that automatically turns expiring ingredients into delicious zero-waste meals.

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24)
- **npm**: v9+ (tested on v11)

### 2. Install & Start Development Server

```bash
# Clone the repository
git clone https://github.com/Shaurya214/eat-before.git
cd eat-before

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:5173`**

### 3. Production Build

```bash
npm run build
npm run preview
```

---

## 🌟 Key Features for Showcase & Demo

### 1. 📊 Smart Dashboard
- **Urgency Alert Banner**: Instant visual warnings for perishables expiring within 0–3 days.
- **KPI Metrics**: Real-time counter of *Items at Risk*, *Perishable Value at Stake* ($/₹), and *Zero-Waste Score*.
- **Perishables Need Attention**: Color-coded urgency cards with quick actions:
  - `Add to Pot` (selects ingredient for AI chef)
  - `Consumed` (logs saved item and updates stats)
- **Generative Daily Chef Pick**: Highlighted zero-waste dinner suggestion with prep time, difficulty, and quick step-by-step preview.
- **Inventory Ledger**: Complete tabular view of all pantry items.

### 2. 🥫 Digital Pantry & Inventory Management
- **Category Filters**: Filter across *Dairy*, *Produce*, *Pantry & Grains*, *Meat & Seafood*, *Bakery*, *Frozen*, and more.
- **Location Filtering**: Filter by *Fridge*, *Pantry*, or *Freezer*.
- **Shelf-Life Visual Gauge**: Real-time progress bar reflecting days remaining.
- **Date Math & Color Logic (PRD US-002)**:
  - 🔴 **Red (Expired)**: Passed expiry date (`< 0 days`).
  - 🟠 **Orange (Expiring Soon)**: `0–3 days` remaining.
  - 🟡 **Yellow (Upcoming)**: `4–7 days` remaining.
  - 🟢 **Green (Fresh)**: `> 7 days` remaining.

### 3. ➕ Add Food Item Modal
- Quick date preset shortcuts: `+2 Days`, `+5 Days`, `+1 Week`, `+2 Weeks`.
- **Live Urgency Preview Badge**: Dynamically recalculates status color and label as you select dates.
- Defaults purchase date to *Today* for rapid &lt;10 second entry.

### 4. 🍳 Gemini AI Recipe Studio
- **Food Safety Guard (PRD US-004)**: Expired items are strictly excluded from AI prompts to protect user health.
- **Dynamic Context Selection**: Select which perishables from your pantry to include in the chef's pot.
- **Curated & Live Gemini Support**:
  - Out of the box: Intelligent offline culinary engine ensuring **0 demo failures**.
  - Optional Live API: Enter your Google Gemini API key in Settings for real-time generative responses.
- **Prompt Transparency Box**: Shows how the prompt prioritizes shelf-life and applies food safety constraints.
- **1-Click "Mark as Consumed"**: Deducts used ingredients from your pantry inventory and awards zero-waste points with celebration confetti!

### 5. 📈 Zero-Waste Analytics & Scorecard
- **KPI Bento Cards**: Total Food Saved (%), Rescued Grocery Value ($/₹), Spoilage Rate (%), and Waste Prevented (kg).
- **Waste vs. Consumed Ratio**: Visual comparative progress bar and financial breakdown.
- **Category Consumption Rates**: Efficiency by food group.
- **Chronological Consumption Log**: Complete history of eaten, cooked, and discarded items with JSON report export.

### 6. 🌍 Dual Culinary & Currency Presets
- One-click toggle in header:
  - **Global Theme**: `$ USD`, Continental recipes (e.g. *Creamy Spinach Garlic Fusilli*).
  - **Desi Theme**: `₹ INR`, Indian tadka recipes (e.g. *Velvety Palak Paneer Bhurji & Roti*).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system tokens from Stitch UI
- **Typography & Icons**: Plus Jakarta Sans, Google Material Symbols Outlined
- **AI Integration**: Google Gemini API (`gemini-1.5-flash`) with resilient local fallback
- **State & Storage**: Reactive state with `localStorage` persistence
- **Animation & Effects**: Canvas Confetti, Tailwind transitions

---

## 📁 Project Structure

```text
eat-before/
├── dist/                              # Production build output
├── public/                            # Static assets
├── src/
│   ├── components/
│   │   ├── AddItemModal.jsx           # Quick item log modal with live urgency preview
│   │   ├── AIRecipeChefView.jsx       # Gemini AI Recipe Studio screen
│   │   ├── AnalyticsView.jsx          # Zero-waste scorecard and consumption logs
│   │   ├── DashboardView.jsx          # Main smart dashboard screen
│   │   ├── Header.jsx                 # Top bar with search, cuisine toggle & actions
│   │   ├── PantryView.jsx             # Grid pantry inventory screen with filters
│   │   ├── RecipeModal.jsx            # Quick cooking steps modal
│   │   ├── SettingsModal.jsx          # Gemini API key and demo reset controls
│   │   ├── Sidebar.jsx                # Left navigation sidebar
│   │   └── Toast.jsx                  # Floating action toast alerts
│   ├── data/
│   │   └── initialData.js             # Seed grocery & consumption records
│   ├── services/
│   │   └── geminiService.js           # Gemini API integration & culinary engine
│   ├── utils/
│   │   └── dateUtils.js               # Expiry math & color coding logic (PRD US-002)
│   ├── App.jsx                        # Root React application & state manager
│   └── main.jsx                       # Entry point
├── index.html                         # HTML template with Tailwind design tokens
├── package.json
├── vite.config.js
└── README.md
```

---

## 📝 Demo Pitch Flow (2-Minute Hackathon Demo)

1. **The Problem**: Open Dashboard. Notice the urgent alert banner — Milk and Spinach expire in 1-2 days ($8+ at risk).
2. **Add Food Item**: Click "+ Add Food". Type "Greek Yogurt", click "+2 Days". Show the Live Urgency Preview dynamically turning orange. Click Save.
3. **AI Recipe Magic**: Click "Generate Dinner Recipe" or open **AI Recipe Chef**. Notice Safety Guard Active (US-004) excluding expired avocados.
4. **Cook & Rescue**: Click "Regenerate Recipe". See the generated zero-waste recipe prioritizing your expiring milk and spinach.
5. **Close the Loop**: Click "Mark Ingredients as Consumed". Confetti flies! Ingredients are deducted from the pantry.
6. **Show Impact**: Navigate to **Analytics / History**. Show the rescued food percentage and grocery money saved increase in real time.

---

## 📄 License

This project is licensed under the MIT License.
