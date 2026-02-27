# AyurDietOS — Project Documentation

## 1. Overview

AyurDietOS is a diet planning application that combines Ayurvedic dietary principles with modern nutritional science. Users discover their Ayurvedic constitution (Prakriti) through a questionnaire, receive personalized food recommendations scored by a hybrid algorithm, plan meals with incompatibility detection, and can consult an AI-powered diet assistant.

The core idea is that Ayurvedic dietary wisdom and modern nutrition work well together. The application computationally combines both to provide dietary guidance that neither system could offer alone.

---

## 2. Problem Statement

Most diet planning applications have three limitations:

**Reliance on modern metrics only.** Calorie counting and macronutrient tracking are useful, but they do not account for individual metabolic tendencies, digestive capacity, or seasonal factors that Ayurveda considers.

**Limited personalization.** Most tools personalize based on age, weight, and activity level. They do not consider constitutional factors like digestive strength (Agni), thermal preferences, or stress response patterns.

**Ayurvedic knowledge is hard to access.** Applications that include Ayurvedic concepts typically present them as text-based advice without quantitative scoring or algorithmic integration.

AyurDietOS addresses these by creating a unified scoring system — the ANH-Score (Ayur-Nutri Hybrid Score) — that evaluates every food item against both Ayurvedic compatibility and modern nutritional value, personalized to each user.

---

## 3. Features

### 3.1 User Onboarding

New users go through a four-step onboarding flow:

**Step 1 — Basic Information.** Name, email, age, and gender.

**Step 2 — Prakriti Assessment.** A 15-question quiz across physical, digestive, behavioral, and mental traits. Each question has three options aligned to Vata, Pitta, and Kapha. The system calculates percentage scores for each dosha and determines the dominant constitution.

**Step 3 — Health Profile.** Users select any relevant health conditions from a list of 10 mapped to their Ayurvedic equivalents. They also specify allergies and dietary preferences (vegetarian, vegan, non-vegetarian, Jain, or Sattvic).

**Step 4 — Goals.** Weight goal (lose, maintain, or gain), daily calorie target (1200–3000 kcal), and daily protein target (30–150g).

All data is stored in a local SQLite database and restored automatically on return visits.

### 3.2 Patient Dashboard

After onboarding, users see a personalized dashboard showing:
- Their dosha distribution with visual bars
- Daily calorie and protein targets
- The current Ayurvedic season (Ritu) with dietary guidelines
- Quick links to the AI chat, weekly planner, and food browser
- Health profile summary

### 3.3 AI Diet Consultant

A conversational interface powered by Google Gemini 2.0 Flash. The AI has access to the following functions that call the core algorithms:

| Function | What It Does |
|----------|-------------|
| `get_food_score` | Returns the ANH-Score for a specific food |
| `score_top_foods` | Lists the top 8 foods for the user's prakriti |
| `compose_meal` | Generates a balanced meal for a meal type |
| `check_compatibility` | Checks if two foods are safe together |
| `find_substitutes` | Suggests alternatives for a food |
| `get_condition_info` | Returns dietary guidelines for a condition |
| `search_foods` | Searches the food database |

When Gemini is unavailable (no API key or quota exceeded), the system uses keyword-based intent matching to call the same algorithms directly.

### 3.4 Food Browser

An interactive page for exploring the food database with:
- Category tabs with item counts
- Search by English or Hindi name
- Filters for Virya (thermal quality), Rasa (taste), and dosha effect
- Sorting by ANH score, calories, or protein
- Grid and list view options

### 3.5 Weekly Meal Planner

A 7-day meal planner that generates meals tailored to the user's profile. Features include:
- Interactive meal slots for each day
- Variety enforcement (foods are not repeated more than twice per week)
- Daily calorie and protein tracking
- Template-based plan generation for specific conditions

### 3.6 Knowledge Graph

An interactive visualization showing relationships between:
- Foods and their effects on the three doshas (pacifying or aggravating)
- Health conditions and their associated dosha imbalances
- Incompatible food combinations (Viruddha Aahara)

The page has four views:
- **Food-Dosha Map**: Shows 18 foods with significant dosha effects. Click a dosha to filter, click a food for details.
- **Dosha Effects**: Same as above, focused on filtering by dosha.
- **Health Conditions**: Displays conditions and their linked doshas.
- **Viruddha Aahara**: Shows incompatible food combinations with severity levels.

### 3.7 Doctor Interface

A separate interface for healthcare practitioners to:
- View a list of patients with their dosha distributions
- Examine individual patient profiles and top-scoring foods
- Check food compatibility for specific patients
- Build custom meal plans with ANH-Score badges, quantity controls, and incompatibility warnings

---

## 4. Core Algorithms

### 4.1 ANH-Score (Ayur-Nutri Hybrid Scoring)

The ANH-Score rates food compatibility on a 0–100 scale:

**ANH-Score = (0.5 × Ayurvedic Score) + (0.5 × Nutritional Score)**

**Ayurvedic Score components:**
- Dosha Balance (50%): How well the food pacifies the user's dominant dosha
- Virya Match (30%): Whether the food's thermal quality matches what the user needs
- Rasa Diversity (20%): Bonus for foods with multiple tastes

**Nutritional Score components:**
- Calorie Fit (40%): Whether the food fits within per-meal calorie targets
- Protein Fit (40%): Protein density relative to calories
- Micronutrient Density (20%): Bonus for fiber, vitamins, and minerals

### 4.2 Viruddha Aahara Checker

Detects incompatible food combinations based on 17 rules from classical Ayurvedic texts. The system uses a graph-based data structure for fast lookup.

**Types of incompatibility:**
- Samyoga (combination): Foods that should not be combined
- Virya (thermal): Foods with opposing thermal qualities
- Kala (time): Foods unsuitable at certain times
- Krama (sequence): Foods that should not follow others
- Matra (proportion): Certain ratios that are harmful
- Samskara (preparation): Processing methods that are harmful

**Severity levels:** Severe, Moderate, Mild

### 4.3 Meal Composition Engine

Generates balanced meals using a greedy constraint satisfaction approach:
1. Filters foods by allergies, dietary preferences, and virya preferences
2. Scores all remaining foods using ANH-Score
3. Sorts by score (highest first)
4. Selects foods one at a time, tracking calories, protein, rasa coverage, and dosha effect

**Constraints by meal type:**

| Meal | Max Calories | Min Protein | Min Rasas |
|------|-------------|-------------|-----------|
| Breakfast | 400 kcal | 15g | 4 |
| Lunch | 600 kcal | 25g | 5 |
| Dinner | 500 kcal | 20g | 4 |
| Snack | 200 kcal | 5g | 2 |

### 4.4 Food Substitution Engine

Finds alternatives when a user cannot consume a particular food. Each alternative is ranked by:
- Similarity score: How nutritionally and categorically similar it is
- ANH-Score: How compatible it is with the user's constitution

Supports: dairy-free, gluten-free, low-carb, vegan, allergy-based, and dosha-based substitutions.

---

## 5. Data

### 5.1 Food Database

105+ Indian foods, each with:

**Ayurvedic properties:**
- Rasa (taste): Madhura, Amla, Lavana, Katu, Tikta, Kashaya
- Virya (thermal quality): Ushna (heating) or Sheeta (cooling)
- Vipaka (post-digestive effect)
- Dosha Effect: Impact on Vata, Pitta, Kapha (-2 to +2)
- Gunas (qualities): Laghu, Guru, Ruksha, Snigdha, etc.
- Seasonal suitability

**Nutritional properties:**
- Calories, protein, carbohydrates, fat, fiber per serving
- Vitamins and minerals (where available)

**Categories:** Grains, pulses, vegetables, fruits, dairy, spices, nuts & seeds, oils, meat, seafood, beverages, sweets.

### 5.2 Recipe Database

35+ Indian recipes with:
- Complete ingredient lists with quantities
- Cooking method and region
- Aggregated nutritional and Ayurvedic properties
- Cooking method modifiers (e.g., frying adds heat)

### 5.3 Health Conditions

10 conditions mapped to Ayurvedic equivalents:

| Condition | Ayurvedic Name | Affected Doshas |
|-----------|---------------|-----------------|
| Diabetes (Type 2) | Prameha | Kapha, Pitta |
| Hypertension | Rakta Gata Vata | Vata, Pitta |
| Obesity | Sthaulya | Kapha |
| Gastritis | Amlapitta | Pitta |
| Constipation | Vibandha | Vata |
| Arthritis | Sandhivata | Vata |
| Anemia | Pandu Roga | Pitta |
| PCOD/PCOS | Aartava Kshaya | Kapha, Vata |
| Hypothyroidism | Galaganda | Kapha, Vata |
| Insomnia | Anidra | Vata, Pitta |

### 5.4 Diet Templates

6 condition-specific meal plan templates:
- Diabetes Management
- Weight Loss (Kapha-reducing)
- PCOD Management
- Vata Balancing
- Pitta Cooling
- Digestive Health Recovery

### 5.5 Seasonal System (Ritu)

Six Ayurvedic seasons with dietary guidelines:

| Ritu | English | Months | Dominant Dosha |
|------|---------|--------|---------------|
| Shishira | Late Winter | Jan–Feb | Kapha |
| Vasanta | Spring | Mar–Apr | Kapha |
| Grishma | Summer | May–Jun | Pitta |
| Varsha | Monsoon | Jul–Aug | Vata |
| Sharad | Autumn | Sep–Oct | Pitta |
| Hemanta | Early Winter | Nov–Dec | Vata |

The system automatically determines the current season and adjusts recommendations accordingly.

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | SQLite (better-sqlite3) |
| AI | Google Gemini 2.0 Flash |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |

### 6.2 Database Schema

| Table | Purpose |
|-------|---------|
| users | User identity and demographics |
| prakriti | Dosha distribution and dominant type |
| user_health | Conditions, allergies, preferences, goals |
| chat_messages | Conversation history |
| meal_logs | Daily food intake tracking |
| diet_plans | Saved meal plans |

### 6.3 API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| /api/users | POST | Create user, login |
| /api/score | POST | Calculate ANH-Score |
| /api/meal | POST | Generate a meal |
| /api/validate | POST | Check food compatibility |
| /api/chat | POST | AI conversation |
| /api/meals | POST/GET | Log and retrieve meals |

### 6.4 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Login page
│   ├── onboarding/           # Onboarding wizard
│   ├── patient/
│   │   ├── dashboard/        # Patient dashboard
│   │   ├── chat/             # AI consultant
│   │   ├── weekly-plan/      # Meal planner
│   │   ├── meal-log/         # Food logging
│   │   └── profile/          # Profile settings
│   ├── doctor/
│   │   ├── dashboard/        # Patient list
│   │   └── create-plan/      # Plan builder
│   ├── foods/                # Food browser
│   ├── knowledge-graph/      # Graph visualization
│   └── api/                  # API routes
├── lib/
│   ├── algorithms/
│   │   ├── anhScore.ts       # ANH-Score calculator
│   │   ├── mealComposer.ts   # Meal generation
│   │   ├── viruddhaCheck.ts  # Incompatibility detection
│   │   ├── recipeScore.ts    # Recipe scoring
│   │   └── substitution.ts   # Substitution engine
│   ├── data/
│   │   ├── allFoods.ts       # 105+ foods
│   │   ├── recipes.ts        # 35+ recipes
│   │   ├── mealTemplates.ts  # Diet templates
│   │   ├── doshas.json       # Dosha information
│   │   ├── conditions.json   # Health conditions
│   │   ├── viruddha.json     # Incompatibility rules
│   │   └── prakritiQuiz.json # Quiz questions
│   ├── types/                # TypeScript interfaces
│   └── db.ts                 # Database operations
└── components/
    ├── KnowledgeGraph.tsx    # Graph visualization
    ├── FoodBrowser.tsx       # Food search/filter
    ├── WeeklyPlanner.tsx     # 7-day planner
    ├── PrintableChart.tsx    # Exportable diet chart
    ├── DoshaQuiz.tsx         # Prakriti questionnaire
    └── onboarding/           # Onboarding step components
```

---

## 7. Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Environment Variables

Create a `.env.local` file:

```
GEMINI_API_KEY=your_api_key_here
```

The AI chat works without the API key using the fallback system, but responses will be simpler.

---

## 8. Routes

| Route | Description |
|-------|-------------|
| / | Landing page |
| /login | User login |
| /onboarding | New user onboarding |
| /patient/dashboard | Personal dashboard |
| /patient/chat | AI diet consultant |
| /patient/weekly-plan | 7-day meal planner |
| /patient/meal-log | Food intake logging |
| /patient/profile | Profile settings |
| /doctor/dashboard | Patient management |
| /doctor/create-plan | Custom plan builder |
| /foods | Food database browser |
| /knowledge-graph | Interactive visualization |

---

## 9. Future Development

- **Meal Logging Analytics**: Track how dietary choices affect dosha balance over time
- **Clinical Validation**: Partner with practitioners to validate the ANH-Score algorithm
- **Expanded Food Database**: Include international foods with Ayurvedic annotations
- **Mobile Application**: Native iOS/Android apps
