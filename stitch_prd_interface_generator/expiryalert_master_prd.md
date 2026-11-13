# ExpiryAlert – Product Requirements Document

## 1. PRD Overview

*   **Product Name:** ExpiryAlert
*   **PRD Version:** 1.0 (Hackathon Edition)
*   **Date:** November 13, 2026
*   **Product Stage:** MVP (2-Hour Hackathon Scope)
*   **Document Owner:** Senior Product Manager
*   **Primary Stakeholders:** Engineering, UX Design, Hackathon Judges
*   **Current Status:** Ready for Implementation
*   **One-line Product Definition:** A smart, AI-powered digital pantry manager that reduces food waste by tracking grocery expiry dates and generating recipes from available ingredients.

---

## 2. Executive Summary

Household food waste is a massive economic and environmental problem, driven largely by poor visibility into what is sitting at the back of the fridge. ExpiryAlert is a responsive web application that solves this by providing a smart digital pantry. Users can log their groceries, visually track what is expiring soon, and—crucially—use a Gemini-powered AI recipe generator to figure out how to cook the ingredients before they spoil. The MVP will be built in a 2-hour hackathon utilizing React, Firebase, and Gemini, delivering immediate value through color-coded expiry tracking and actionable AI culinary advice. Success for this MVP is defined by a flawless hackathon demo showcasing the end-to-end loop: Add Food → See Expiry Warning → Generate Recipe.

---

## 3. Problem Definition

### 3.1 Core problem
Consumers consistently forget the expiry dates of their perishable groceries, leading to food spoilage, wasted money, and the daily frustration of not knowing what to cook with random leftover ingredients.

### 3.2 Problem context
This occurs dynamically in home kitchens, shared apartments, and student dorms. Users buy groceries weekly but lack a system to prioritize consumption based on shelf life, leading to the "what's for dinner" dilemma being solved by takeout while fresh food rots.

### 3.3 Existing alternatives
*   Mental tracking (highly prone to failure).
*   Pen and paper or whiteboard lists (requires high maintenance; no proactive alerts).
*   Complex inventory apps (heavy friction, no recipe integration).

### 3.4 Problems with existing alternatives
Existing digital solutions act as static databases. They tell a user *what* is expiring, but they do not solve the ultimate problem: *how* to use it. They lack actionable, dynamic utility.

### 3.5 Problem evidence
*   *Provided Information:* Users frequently forget expiry dates, resulting in financial loss and food waste.
*   *Assumptions:* The friction of manual entry is the highest barrier to entry for apps in this space.
*   *Research required:* Quantify the average time users are willing to spend inputting grocery data after a shopping trip.

### 3.6 Why now
With the mainstream availability of fast, low-cost LLM APIs (like Gemini), we can now bridge the gap between "inventory management" and "culinary action" instantly, turning a boring tracker into a highly useful smart kitchen assistant.

---

## 4. Product Thesis

> We believe that helping **households and students** to **track their grocery expiry dates and generate contextual recipes** through **a low-friction web app integrated with AI** will result in **a measurable reduction in food waste and monthly grocery savings**.

*   **Core value proposition:** Stop throwing away food; let AI tell you what to cook with what's expiring today.
*   **Primary product differentiator:** The AI Recipe Generator that strictly prioritizes expiring ingredients and filters out expired ones.
*   **Product principles:** Minimal data entry, visual urgency (color-coding), actionable outputs.
*   **Reasons users may not adopt it:** Manually typing in grocery names and dates is tedious. (Future mitigation: Barcode/Receipt OCR).

---

## 5. Target Users

1.  **Students & Hostel Residents (Primary MVP Target)**
    *   *Context:* Low budget, shared fridges, basic cooking skills.
    *   *Needs:* Save money, prevent roommates from throwing away their food, easy recipes.
    *   *Frustrations:* Complex cooking instructions, wasting their limited allowance on spoiled milk.
2.  **Working Professionals**
    *   *Context:* Time-poor, order takeout frequently.
    *   *Needs:* Quick visibility into what they actually have before they order UberEats.
    *   *Frustrations:* Finding wilted vegetables they bought with good intentions on Sunday.
3.  **Families & Households**
    *   *Context:* High volume of groceries.
    *   *Needs:* Batch tracking, meal planning integration.

---

## 6. Jobs to Be Done

*   **Functional:**
    > When my fridge is full of random ingredients, I want to know exactly what is expiring in the next 3 days, so I can prioritize eating those items.
*   **Emotional:**
    > When I cook dinner, I want to feel resourceful and environmentally conscious, so I can feel good about reducing my carbon footprint.
*   **Social:**
    > When living in a shared apartment, I want to manage my own groceries efficiently, so I am perceived as a responsible and clean roommate.

---

## 7. Research Plan

*   **Assumptions to validate:**
    1. Users know the exact expiry date of fresh produce (often they don't; it's an estimate).
    2. Users will manually log items.
*   **Target research participants:** 5-10 college students or young professionals who cook at least 3 times a week.
*   **Validation method:** Prototype testing and user interviews post-hackathon.

**Assumption Matrix**
| Assumption | Risk Level | Validation Method | Priority |
| :--- | :--- | :--- | :--- |
| Users will tolerate manual data entry for the MVP. | High | Usability testing | 1 |
| AI recipes are reliable and edible. | Medium | Manual QA of Gemini outputs | 2 |
| Users want basic analytics on waste. | Low | Feature engagement tracking | 3 |

---

## 8. Competitor and Alternative Analysis

*(Note: Competitor data is hypothesized based on market patterns and requires live validation).*

| Competitor | Core Offering | Strengths | Weaknesses |
| :--- | :--- | :--- | :--- |
| **SuperCook** | Recipe generator by ingredients | Great recipe matching | No expiry tracking; manual inventory resets required. |
| **NoWaste** | Expiry tracking app | Deep inventory features | High friction UI; no integrated AI recipe generation. |
| **Mental Math** | Remembering dates | Zero friction at input | Fails completely after 3 days. |

*   **Opportunity Gap:** Combining the inventory tracking of NoWaste with the dynamic recipe generation of SuperCook, powered by an LLM for conversational flexibility.

---

## 9. Press Release and FAQ

### 9.1 Future Press Release
**Headline:** ExpiryAlert Launches AI Pantry Manager to End Household Food Waste
**Subheadline:** Your kitchen just got smarter. Track expiry dates and let AI turn your leftover ingredients into tonight's dinner.
**Key Benefits:** Stop throwing away spoiled food, save hundreds of dollars a year, and never wonder what to cook again.
**Company Perspective:** "We realized tracking food isn't enough. You have to give people an immediate, delicious solution for what to do with it."

### 9.2 External Customer FAQ
*   **What happens if I don't know the exact expiry date?** For fresh produce, you can enter an estimated date or select "1 week."
*   **Are the recipes actually good?** Yes, we use advanced AI (Gemini) to cross-reference your ingredients with proven culinary combinations.

### 9.3 Internal Stakeholder FAQ
*   **What is the biggest risk?** The manual entry friction. We must ensure the "Add Item" form takes less than 10 seconds to complete.
*   **Why use Gemini?** It provides fast, cost-effective, and highly contextual multimodal reasoning needed for the recipe generation feature.

---

## 10. Goals and Non-Goals

*   **Product goals:** Deliver a bug-free, visually impressive web app within the 2-hour hackathon limit.
*   **User goals:** Successfully log 5 items and generate 1 recipe during the demo.
*   **Business goals:** Win the hackathon / validate the technical architecture.
*   **Non-goals:** OCR receipt scanning, barcode scanning, push notifications, and multi-user family accounts are strictly out of scope for the MVP.
*   **Guardrail metrics:** Recipe generation latency must remain under 5 seconds to maintain the "magic" feel.

---

## 11. Success Metrics

*   **North-star metric:** % of items moved from "Expiring Soon" to "Consumed" (vs. Wasted).
*   **Activation metrics:** User adds their first 3 items.
*   **Engagement metrics:** Number of AI recipes generated per active user per week.
*   **Quality metrics:** AI Recipe Generation timeout rate (<2%).

---

## 12. Product Scope and Prioritisation

### MVP Scope (2-Hour Hackathon)
*   **Must Have:** Dashboard UI, Add food item (manual form), View pantry list, Automatic expiry calculation (Days remaining), Color-coded urgency (Red, Orange, Yellow, Green), AI Recipe Generation (Gemini API).

### Version 1.1 (Post-Hackathon)
*   **Should Have:** Firebase Authentication (login/signup), Edit/Delete items, Mark as Consumed/Wasted, Basic Analytics chart.

### Future Possibilities
*   **Could Have:** Barcode scanning, receipt OCR, push notifications, shared pantries, smart shopping lists.

---

## 13. Information Architecture

**Hierarchical Sitemap:**
1. Login/Signup (V1.1)
2. Dashboard (Home)
    *   Urgent Alerts Panel
    *   Quick Add Button
3. My Pantry
    *   List View / Grid View
    *   Filters (Category, Status)
4. AI Recipes
    *   Generate Button
    *   Recipe Display Card
5. Analytics (V1.1)

---

## 14. End-to-End User Journeys

**Core Successful Journey (The Demo Path):**
1.  **Trigger:** User opens app.
2.  **Entry:** Lands on Dashboard (empty state).
3.  **Action:** Clicks "Add Food". Enters "Milk", Date: Tomorrow. Enters "Pasta", Date: Next Month.
4.  **System:** Dashboard updates. Milk is highlighted in **Orange** (Expiring Soon). Pasta is **Green**.
5.  **Decision:** User doesn't want milk to go bad. Clicks "Generate Recipe".
6.  **System:** Gemini API triggers. Returns a recipe for "Creamy White Sauce Pasta".
7.  **Exit:** User views recipe and cooks.

---

## 15. User Stories

*   **US-001 [Inventory]:** As a user, I want to add a food item with its name, category, and expiry date, so that it is tracked in my pantry.
*   **US-002 [Tracking]:** As a user, I want the system to calculate days remaining and color-code items, so I can instantly see what needs to be eaten first.
*   **US-003 [AI Recipes]:** As a user, I want to click a button to generate a recipe based on my available ingredients, so I don't have to think about what to cook.
*   **US-004 [Safety]:** As a user, I want expired items explicitly excluded from the AI recipe suggestions, so I don't get sick.

---

## 16. Acceptance Criteria

*   **US-002 [Tracking]:**
    *   *Given* an item has an expiry date that has passed, *When* it is displayed on the dashboard, *Then* it must have a Red indicator and be labeled "Expired".
    *   *Given* an item expires in 0-3 days, *Then* it must have an Orange indicator and label "Expiring Soon".
    *   *Given* an item expires in 4-7 days, *Then* it must have a Yellow indicator.
    *   *Given* an item expires in >7 days, *Then* it must have a Green indicator.
*   **US-003 [AI Recipes]:**
    *   *Given* a user requests a recipe, *When* the AI generates it, *Then* it must output a structured response containing: Title, Prep Time, Ingredients List, and Step-by-Step instructions.

---

## 17. Functional Requirements

*   **FR-001 (Expiry Calculation):** The system must calculate the difference between the current system date (at midnight local time) and the user-inputted expiry date.
*   **FR-002 (AI Prompt Construction):** The backend must dynamically construct a prompt containing all items with status "Fresh", "Upcoming", and "Expiring Soon", explicitly commanding the LLM to prioritize the "Expiring Soon" items.
*   **FR-003 (Local Storage / DB):** For the MVP, if Firebase Auth is skipped for time, data must persist in `localStorage` or an anonymous Firebase session so the demo does not break on refresh.

---

## 18. AI-Specific Requirements

*   **Purpose:** Generate recipes from pantry data.
*   **Input Data:** Array of ingredient strings, excluding items marked "Expired".
*   **Prompting Strategy:** System prompt must enforce JSON or markdown structure. Example: *"You are an expert chef. Create a recipe using ONLY these ingredients if possible, or assume basic pantry staples (salt, oil). Prioritize using: [Expiring Items]. Do not suggest unsafe combinations."*
*   **Hallucination Prevention:** The prompt must instruct the model to explicitly list any "missing ingredients" it assumed the user had, so the user isn't surprised mid-cooking.
*   **Fallback:** If the API times out or fails, display: "The kitchen is too busy right now! Please try generating a recipe again in a moment."

---

## 19. UX and Interaction Requirements

*   **Design System:** Clean, premium SaaS-style.
*   **Color Palette:**
    *   Primary: Forest Green (`#174B35`)
    *   Secondary: Sage Green (`#70A982`)
    *   Warning: Orange (`#F5A623`)
    *   Danger: Red (`#E53935`)
*   **Forms:** The "Add Item" form must default the purchase date to `Today` to save a click.
*   **Empty States:** If the pantry is empty, display a friendly illustration of an empty fridge with a primary "Add your first item" CTA. Do not show broken charts or empty tables.

---

## 20. Screen Inventory

| Screen | Purpose | Main Information | Primary Action |
| :--- | :--- | :--- | :--- |
| **Dashboard** | Overview | Alert cards, counts | Add Food |
| **Pantry List** | Detailed view | Table/Grid of items | Edit/Delete (V1.1) |
| **Add Item (Modal)** | Data Entry | Form fields | Save Item |
| **AI Recipe (Modal/Page)**| Display output | Recipe text | Generate Another |

---

## 21. State and Edge-Case Matrix

| Feature | Scenario | Expected System Behaviour | User Message |
| :--- | :--- | :--- | :--- |
| AI Recipe | No items in pantry | Disable generation button | "Add items to your pantry first!" |
| AI Recipe | Only expired items | Prevent API call | "All items are expired. Time for groceries!" |
| Add Item | Date set in the past | Mark immediately as expired | N/A |
| Loading | Gemini API processing | Show skeleton loader / spinner | "Chef AI is thinking..." |

---

## 22. Data Model

**Entity Relationship (Firebase Firestore structure):**

```text
Collection: users
  Document: {uid}
    - name (string)
    - email (string)

Collection: foodItems
  Document: {id}
    - userId (string) -> refs users
    - name (string)
    - category (string)
    - quantity (number)
    - unit (string)
    - purchaseDate (timestamp)
    - expiryDate (timestamp)

Collection: consumptionLogs (V1.1)
  Document: {id}
    - action ("consumed" | "wasted")
```

---

## 23. Roles and Permissions

*   **MVP:** Single-user experience. All data belongs to the currently logged-in user (or local session).
*   **Future:** Role-based access for "Shared Family Pantry" (Admin vs. Viewer).

---

## 24. Integrations

1.  **Firebase Firestore:** NoSQL database for real-time syncing of pantry items.
2.  **Firebase Auth:** For user login (Email/Google).
3.  **Google Gemini API:** REST API for generative AI recipes.
    *   *Security Concern:* API keys must be stored in `.env` variables and fetched via a secure backend/serverless function, NEVER exposed in the React frontend bundle.

---

## 25. Non-Functional Requirements

*   **Responsiveness:** The app must be fully functional and UI-optimized on mobile devices (compact navigation) and desktop (sidebar navigation).
*   **Performance:** The dashboard must load in under 500ms. AI generation may take up to 3-5 seconds but requires UI loading states.

---

## 26. Accessibility Requirements

*   **Color Contrast:** The Red, Orange, Yellow, and Green status indicators must also include text labels (e.g., "Expired", "Fresh") because color alone is insufficient for visually impaired users.
*   **Forms:** All inputs in the "Add Food" form must have explicit `<label>` tags for screen readers.

---

## 27. Privacy, Security, and Trust

*   **Data Purpose:** Grocery data is collected solely for expiry tracking and recipe generation.
*   **Security:** Firestore security rules must strictly enforce that users can only read/write documents where `userId == request.auth.uid`.
*   **AI Data:** Assure users that their grocery lists are not used to train public LLM models (standard API privacy).

---

## 28. Analytics and Event Tracking (V1.1)

*   `user_signup`: Triggered on account creation.
*   `item_added`: Triggered when form is submitted. (Properties: Category).
*   `recipe_generated`: Triggered on successful Gemini API return.
*   `item_wasted` / `item_consumed`: For future waste reduction metrics.

---

## 29. Experimentation Plan

*   **Hypothesis:** If we reduce the required fields on the "Add Food" form to just *Name* and *Expiry Date* (making Category, Quantity, Storage Location optional), then the number of items added per user will increase by 50%.
*   **Validation:** Post-launch A/B testing of the form complexity.

---

## 30. Technical Approach

*   **Front-end:** React + Vite. Fast build times, great developer experience for a hackathon.
*   **Styling:** Tailwind CSS + Lucide React icons. Enables rapid, utility-first UI development.
*   **Back-end/DB:** Firebase (Firestore + Auth). Eliminates the need to write custom CRUD APIs, saving massive hackathon time.
*   **AI Integration:** Serverless function (Vercel) to call the Gemini API securely, preventing CORS issues and API key leaks.
*   **Hosting:** Vercel for instant, continuous deployment.

---

## 31. Dependencies

*   **External:** Access to Google AI Studio for Gemini API keys.
*   **Hackathon Blocker:** Network connectivity for Vercel deployment and Firebase reads.

---

## 32. Risks and Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **API Key Leakage** | High (Cost) | Ensure Gemini API is called via Vercel serverless function, not directly in React. |
| **Time Constraint (2 hrs)** | High | Drop Authentication entirely for the MVP if trailing behind at the 50-min mark. Use `localStorage`. |
| **LLM Hallucinations** | Medium | Use strict system prompts demanding standard recipes only. |

---

## 33. QA and Test Plan

*   **Timezone Test:** Add an item expiring "tomorrow". Change the local computer clock to tomorrow. Ensure the UI shifts from Orange to Red automatically.
*   **AI Boundary Test:** Attempt to generate a recipe with an empty pantry. Ensure the error state catches it. Attempt with only "Expired" items. Ensure the block works.

---

## 34. Delivery Plan (2-Hour Hackathon Script)

1.  **0–15 min (Foundation):** Vite init, Tailwind setup, Firebase config, Vercel deployment link established.
2.  **15–50 min (Core CRUD):** Build layout (Sidebar/Mobile Nav). Create "Add Food" modal. Render list on Dashboard.
3.  **50–75 min (Logic):** Implement Date-math utility functions. Apply Red/Orange/Yellow/Green logic to UI cards.
4.  **75–100 min (AI Magic):** Write Vercel serverless function. Integrate Gemini API. Build Recipe UI Card.
5.  **100–110 min (Polish):** Empty states, loading spinners, verify Tailwind colors match PRD (`#174B35`).
6.  **110–120 min (Demo Prep):** Pre-populate realistic data (Milk expiring tomorrow, Pasta next year). Rehearse the pitch.

---

## 35. Launch and Rollout Plan

*   **Hackathon Phase:** Localhost demo to judges, live Vercel link shared via QR code.
*   **Beta Phase:** Open to 10 beta testers to track groceries for one week to see if they actually return to the app.

---

## 36. Assumptions

1.  We assume the Gemini API free tier limits will suffice for the demo.
2.  We assume we can build the core CRUD operations in 35 minutes using React and Firebase. (Risk: High; Mitigation: Use a UI library like shadcn/ui if needed to speed up forms).

---

## 37. Open Questions

*   **Technical:** Does the Gemini API consistently return formatted Markdown, or do we need to enforce a JSON schema response for the UI? *(Important: Test this during the 75-100 min block).*
*   **Business:** How much will the API cost if 1,000 users generate 3 recipes a week? *(Non-blocking for MVP).*

---

## 38. Final Build Handoff (For AI Coding Agent)

**System Prompt for AI Developer:**
> "You are building the ExpiryAlert MVP in React + Vite + Tailwind + Firebase.
> **Goal:** Create a pantry tracker that warns users of expiring food and generates recipes via Gemini.
> **Data:** `foodItems` have `name`, `expiryDate` (date object), and `status` (calculated).
> **Logic Rules:** If expiry is in past = RED (Expired). If 0-3 days = ORANGE (Expiring Soon). 4-7 days = YELLOW (Upcoming). >7 days = GREEN (Fresh).
> **AI Feature:** Create a button that takes all non-expired items and sends them to a Gemini API endpoint to generate a recipe formatted in Markdown.
> **Design:** Use Forest Green primary, minimal modern SaaS UI, with rounded cards.
> **Next Step:** Initialize the Vite project, set up the layout structure with a sidebar, and build the `AddFoodItem` form component."