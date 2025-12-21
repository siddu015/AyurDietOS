# AyurDiet OS

Intelligent diet planning system that combines ancient Ayurvedic wisdom with modern nutritional science.

## Overview

AyurDiet OS is a comprehensive diet management application that:

- Assesses patient constitution (Prakriti) through an interactive quiz
- Calculates personalized food scores using the ANH-Score algorithm
- Generates balanced meals using constraint satisfaction
- Detects incompatible food combinations (Viruddha Aahara)
- Visualizes food-dosha-condition relationships in a knowledge graph
- Provides 7-day meal planning with variety enforcement
- Supports condition-specific diet templates (diabetes, PCOD, weight loss)
- Generates printable diet charts for patients

## Key Features (Phase 2)

### Expanded Food Database (105+ Items)

- **Millets**: Ragi, Jowar, Bajra, Foxtail, Barnyard
- **Regional Grains**: Poha, Sabudana, Daliya, Kuttu
- **Pulses**: Full range including Kulthi, Lobia, Moth
- **Vegetables**: 25+ items including Ayurvedic superfoods
- **Fruits, Dairy, Spices, Oils, Sweets, Meat, Beverages**

### Recipe System (35+ Recipes)

- Complete Indian recipes with ingredient breakdowns
- Recipes scored using aggregated ingredient properties
- Cooking method modifiers (frying adds heat, steaming is cooling)
- Regional categorization (North/South/East/West India)

### Food Substitution Engine

- Find alternatives for allergies (dairy-free, gluten-free, nut-free)
- Diabetes-friendly substitutes
- Dosha-specific alternatives
- Similarity scoring based on nutrition + Ayurvedic properties

### Weekly Meal Planner

- 7-day interactive planning
- Variety enforcement (no food repeated 3+ days)
- Daily calorie/protein tracking
- Template-based plan generation

### Condition-Specific Diet Templates

- Diabetes Management Plan
- Weight Loss (Kapha-reducing)
- PCOD Management
- Vata/Pitta/Kapha Balancing
- Digestive Health Recovery

### Enhanced Food Browser

- Category tabs with counts
- Hindi/English search
- Filter by Virya, Rasa, Dosha effect
- Sort by ANH score, calories, protein
- Grid and list views

### Printable Diet Charts

- Professional layout with letterhead
- Patient info and Prakriti summary
- Weekly meal schedule
- Do's and Don'ts section
- Doctor signature area

## Core Algorithms

### 1. ANH-Score (Ayur-Nutri Hybrid Scoring)

```
ANH_Score = (w1 * AyurvedicScore) + (w2 * NutritionalScore)

Where:
- AyurvedicScore = f(doshaBalance, viryaMatch, rasaDiversity)
- NutritionalScore = f(caloriesFit, proteinFit, micronutrientDensity)
```

### 2. Recipe Scoring Algorithm

```typescript
RecipeScore = aggregate(ingredientScores, cookingMethodModifier, rasaDiversity);
```

### 3. Viruddha Aahara Checker

Graph-based lookup for incompatible food combinations with O(1) pair checks.

### 4. Substitution Engine

```typescript
SubstitutionScore = 0.3 * SimilarityScore + 0.7 * ANHScore;
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── foods/                # Food browser page
│   ├── patient/
│   │   ├── onboarding/       # Prakriti questionnaire
│   │   ├── dashboard/        # Patient dashboard
│   │   └── weekly-plan/      # Weekly meal planner
│   ├── doctor/
│   │   ├── dashboard/        # Doctor main view
│   │   └── create-plan/      # Diet plan creator
│   ├── knowledge-graph/      # Graph visualization
│   └── api/                  # API routes
├── lib/
│   ├── algorithms/
│   │   ├── anhScore.ts       # ANH-Score calculator
│   │   ├── mealComposer.ts   # CSP meal solver
│   │   ├── viruddhaCheck.ts  # Incompatibility checker
│   │   ├── recipeScore.ts    # Recipe scoring
│   │   └── substitution.ts   # Food substitution engine
│   ├── data/
│   │   ├── foods-expanded.ts # 105+ foods database
│   │   ├── recipes.ts        # 35+ Indian recipes
│   │   ├── mealTemplates.ts  # Diet plan templates
│   │   └── ...
│   └── types/
└── components/
    ├── FoodBrowser.tsx       # Advanced food search/filter
    ├── WeeklyPlanner.tsx     # 7-day meal planner
    ├── PrintableChart.tsx    # Exportable diet chart
    ├── PortionSlider.tsx     # Portion adjustment
    └── ...
```

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route                  | Description              |
| ---------------------- | ------------------------ |
| `/`                    | Landing page             |
| `/patient/onboarding`  | Prakriti quiz            |
| `/patient/dashboard`   | Personal recommendations |
| `/patient/weekly-plan` | 7-day meal planner       |
| `/doctor/dashboard`    | Patient management       |
| `/doctor/create-plan`  | Build diet plans         |
| `/foods`               | Browse food database     |
| `/knowledge-graph`     | Visualize relationships  |

## API Endpoints

### POST /api/score

Calculate ANH score for a food item.

### POST /api/meal

Generate a balanced meal.

### POST /api/validate

Check food compatibility (Viruddha Aahara).

## Diet Templates Available

1. **Diabetes Management** - Low GI, Kapha-reducing, bitter foods emphasis
2. **Weight Loss (Kapha)** - Light, dry, stimulating foods
3. **PCOD Management** - Hormone-balancing, dairy-free options
4. **Vata Balancing** - Warm, grounding, nourishing foods
5. **Pitta Cooling** - Cooling, calming foods
6. **Digestive Health** - Easy to digest, Agni-strengthening

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: react-force-graph
- **State**: React hooks

## Data Sources

The food database includes complete Ayurvedic properties:

- **Rasa** (6 tastes): Madhura, Amla, Lavana, Katu, Tikta, Kashaya
- **Virya** (Potency): Ushna (heating), Sheeta (cooling)
- **Vipaka** (Post-digestive effect)
- **Guna** (Qualities): Laghu, Guru, Ruksha, Snigdha, etc.
- **Dosha Effects**: Impact on Vata, Pitta, Kapha (-2 to +2)
- **Season**: Optimal consumption seasons

## Future ML Integration

API routes are designed as **swap points** - replace rule-based logic with ML model calls:

```typescript
// Current (rule-based)
const score = calculateANHScore(food, patient, config);

// Future (ML model)
const score = await mlApi.predictScore(food, patient);
```

## License

MIT
