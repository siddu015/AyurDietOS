# AyurDiet OS

A diet planning application that combines Ayurvedic principles with modern nutrition science.

## What It Does

AyurDiet OS helps users get personalized diet recommendations based on their unique body constitution (Prakriti) and health goals.

**Key Features:**

- **Prakriti Assessment** — A quiz to determine your Ayurvedic body type (Vata, Pitta, or Kapha)
- **Food Scoring** — Every food is scored 0-100 based on how suitable it is for you
- **Meal Planning** — Generate balanced meals that match your constitution
- **Incompatibility Detection** — Warns about food combinations that Ayurveda considers harmful
- **AI Diet Consultant** — Chat with an AI assistant for personalized diet advice
- **Knowledge Graph** — Visual explorer showing relationships between foods, doshas, and health conditions

## How It Works

The app uses the **ANH-Score (Ayur-Nutri Hybrid Score)** algorithm that combines:

- Ayurvedic compatibility (dosha balance, thermal quality, taste diversity)
- Nutritional value (calories, protein, micronutrients)

This gives each food a personalized score based on your specific profile

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: AI Chat

To enable the AI diet consultant, create a `.env.local` file:

```
GEMINI_API_KEY=your_api_key_here
```

The app works without this — the chat will use a simpler keyword-based system instead.

## Project Structure

```
src/
├── app/           # Pages and API routes
├── components/    # UI components
└── lib/
    ├── algorithms/  # Scoring and meal generation logic
    ├── data/        # Food database, recipes, conditions
    └── types/       # TypeScript definitions
```
