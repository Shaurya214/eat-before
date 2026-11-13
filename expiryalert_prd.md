# ExpiryAlert – Product Requirements Document (PRD)

## 1. Product Overview
* **Product Name:** ExpiryAlert
* **Tagline:** Your Smart AI-Powered Food & Pantry Manager.
* **Product Type:** Responsive Web Application.
* **Objective:** Help users manage groceries, track food expiry dates, receive timely reminders, reduce food waste, and generate AI-powered recipes using ingredients available in their pantry.

## 2. Problem Statement
People frequently forget expiry dates of groceries stored in refrigerators and kitchens. This results in:
* Food wastage.
* Unnecessary grocery purchases.
* Financial loss.
* Poor pantry management.
* Difficulty deciding which ingredients to consume first.

## 3. Proposed Solution
ExpiryAlert is a smart digital pantry management platform that allows users to add grocery items, monitor expiry dates, receive automatic alerts, and discover recipes based on available ingredients. 
The system prioritizes food items that are nearing expiry and helps users consume them before they go to waste.

## 4. Target Audience
* Students and hostel residents.
* Working professionals.
* Families and households.
* Shared apartment residents.
* Health-conscious individuals.

## 5. Core Features

### A. Dashboard
Display:
* Total food items.
* Fresh items.
* Expiring soon.
* Expired items.
* Urgent expiry alerts.
* Recently added groceries.

### B. Pantry Management
Users can:
* Add food items.
* Edit and delete items.
* View all stored groceries.
* Search and filter by category.
* Sort items by expiry date.

**Food item details:**
* Product name.
* Category.
* Quantity and unit.
* Purchase date.
* Expiry date.
* Storage location.
* Price (optional).

### C. Smart Expiry Tracking
Automatically calculate remaining days based on expiry dates.

**Status categories:**
* **Expired:** Expiry date has passed.
* **Expiring Soon:** 0–3 days remaining.
* **Upcoming:** 4–7 days remaining.
* **Fresh:** More than 7 days remaining.

**Display clear color-coded indicators:**
* 🔴 **Red:** Expired.
* 🟠 **Orange:** Expiring soon.
* 🟡 **Yellow:** Upcoming.
* 🟢 **Green:** Fresh.

*Prioritize urgent items on the dashboard.*

### D. Notifications and Reminders
Display alerts such as:
* "Milk expires tomorrow."
* "Three items are expiring within three days."
* "Your tomatoes should be used soon."

*Note: For the MVP, implement in-app notifications. Push notifications can be added later.*

### E. AI Recipe Generator
*This is the primary differentiating feature.*
* Read available ingredients from the pantry.
* Prioritize ingredients nearing expiry.
* Exclude expired or potentially unsafe ingredients.
* Generate recipes using eligible available ingredients.
* Display recipe name, description, preparation time, ingredients, and cooking instructions.
* Highlight missing ingredients separately.

*Note: Use Gemini API for recipe generation through a secure backend.*

### F. Food Waste Analytics
Display:
* Total groceries added.
* Items consumed.
* Items marked as wasted.
* Estimated money saved.
* Food waste reduction statistics.

*Note: Only calculate savings and waste reduction using recorded user actions and clearly stated estimates.*

## 6. Website Pages
1. **Landing Page** – Product introduction, features, and call-to-action.
2. **Login / Signup** – User authentication.
3. **Dashboard** – Pantry overview and expiry alerts.
4. **My Pantry** – Grocery inventory management.
5. **Add Food** – Form to add grocery items.
6. **AI Recipes** – Recipe recommendations.
7. **Analytics** – Food waste and savings insights.
8. **Settings** – User profile and preferences.

## 7. Technology Stack
* **Frontend:** React + Vite
* **Styling:** Tailwind CSS
* **Backend:** Firebase
* **Database:** Cloud Firestore
* **Authentication:** Firebase Auth
* **AI Integration:** Gemini API
* **Charts:** Recharts
* **Icons:** Lucide React
* **Hosting:** Vercel

## 8. Database Structure

**`users`**
* `uid`
* `name`
* `email`
* `createdAt`

**`foodItems`**
* `id`
* `userId`
* `name`
* `category`
* `quantity`
* `unit`
* `purchaseDate`
* `expiryDate`
* `storageLocation`
* `price`
* `createdAt`

**`consumptionLogs`**
* `id`
* `userId`
* `foodItemId`
* `action` (consumed/wasted)
* `quantity`
* `recordedAt`

## 9. UI/UX Requirements
**Design should be:**
* Modern and minimal.
* Clean, premium SaaS-style interface.
* Responsive across desktop and mobile.
* Easy to navigate.
* Visually appealing with food-related illustrations and icons.

**Color Palette:**
* **Primary:** Forest Green (`#174B35`)
* **Secondary:** Sage Green (`#70A982`)
* **Background:** Light Green / White
* **Warning:** Orange (`#F5A623`)
* **Danger:** Red

**Layout Guidelines:**
* Use rounded cards, subtle shadows, clear typography, and intuitive navigation.
* Desktop layout should use a sidebar. 
* Mobile layout should use compact navigation.

## 10. MVP Scope – 2-Hour Hackathon

### Must Have
1. Dashboard.
2. Add grocery items.
3. View pantry.
4. Automatic expiry calculation.
5. Color-coded expiry status.
6. Expiry alerts.
7. AI recipe recommendations.

### Optional
* Edit and delete items.
* Basic analytics.
* Authentication.

### Future Enhancements
* Barcode scanning.
* Grocery receipt OCR.
* Voice-based grocery entry.
* Push notifications.
* Shared family pantry.
* Smart shopping list.
* NGO food donation marketplace.

## 11. Acceptance Criteria
The MVP should allow users to:
* Add grocery items with expiry dates.
* View stored items in a pantry.
* Automatically calculate expiry status.
* Identify items expiring soon.
* View expiry alerts.
* Generate AI recipes from eligible pantry ingredients.
* Use the application on desktop and mobile.

## 12. Two-Hour Development Plan

| Time | Task |
| :--- | :--- |
| **0–15 min** | Project setup and UI |
| **15–50 min** | Dashboard and pantry |
| **50–75 min** | Expiry calculation and alerts |
| **75–100 min** | AI recipe integration |
| **100–110 min** | Testing and polishing |
| **110–120 min** | Demo preparation |

## 13. Product Vision
> *"Make every kitchen smarter by helping people consume food on time, save money, and minimize food waste."*

**Final Positioning:**
ExpiryAlert is not just a grocery tracker. It is an AI-powered food management assistant that tells users what they have, what they should consume first, and what they can cook with the ingredients available in their kitchen.