====================
REPORT.md
====================

# AyurDiet OS: An Intelligent Diet Planning System Integrating Ayurvedic Principles with Modern Nutritional Science

## Title Page Content

**Project Title:** AyurDiet OS: An Intelligent Diet Planning System Integrating Ayurvedic Principles with Modern Nutritional Science

**Domain:** Health Informatics, Computational Nutrition, Traditional Medicine Informatics

**Submitted By:** [Student Name]

**Registration Number:** [Registration Number]

**Under the Guidance of:** [Guide Name], [Designation]

**Department:** [Department Name]

**Institution:** [Institution Name]

**Academic Year:** 2024-2025

---

## Abstract

The growing prevalence of lifestyle-related diseases such as diabetes, obesity, and polycystic ovary disorder has created an urgent need for personalized dietary interventions. Traditional Ayurvedic medicine offers a sophisticated framework for understanding individual constitution and food compatibility, yet remains largely disconnected from contemporary nutritional science in clinical practice. This project presents AyurDiet OS, an intelligent diet planning system that bridges this gap by mathematically fusing Ayurvedic dietary principles with modern nutritional parameters.

The system introduces the Ayur-Nutri Hybrid Score, a novel scoring algorithm that quantifies food suitability for individual patients by combining dosha compatibility, thermal potency matching, and taste diversity with caloric balance, macronutrient adequacy, and micronutrient density. The platform incorporates a comprehensive food database containing over one hundred Indian food items annotated with complete Ayurvedic properties including Rasa, Virya, Vipaka, Guna, and tridoshic effects alongside standard nutritional composition.

AyurDiet OS implements a constraint satisfaction-based meal composition engine capable of generating balanced meals that satisfy both nutritional targets and Ayurvedic compatibility requirements. The system includes a knowledge graph-based Viruddha Aahara checker for detecting incompatible food combinations, a food substitution engine for managing dietary restrictions, and condition-specific diet templates for common metabolic disorders.

The platform is designed with future machine learning integration in mind, with rule-based algorithms serving as swappable components that can be replaced by trained models. Preliminary evaluation demonstrates the system's capability to generate personalized diet recommendations that honor both traditional wisdom and evidence-based nutrition science, offering a promising tool for integrative healthcare practitioners.

---

## Keywords

Ayurvedic Nutrition, Personalized Diet Planning, Prakriti Assessment, Dosha Balancing, Food Compatibility, Viruddha Aahara, Constraint Satisfaction, Health Informatics

---

## 1. Introduction

Dietary habits play a fundamental role in the prevention and management of chronic diseases. The World Health Organization estimates that unhealthy diets and physical inactivity are among the leading causes of major noncommunicable diseases, contributing to approximately sixty percent of deaths globally. In India specifically, the burden of diet-related diseases has escalated dramatically, with diabetes affecting over seventy-seven million adults and cardiovascular diseases accounting for a quarter of all deaths.

Modern nutrition science has made significant advances in understanding the biochemical relationships between food composition and health outcomes. Caloric balance, macronutrient distribution, glycemic index, and micronutrient adequacy form the foundation of contemporary dietary recommendations. However, these guidelines often fail to account for individual variation in metabolism, digestive capacity, and constitutional predisposition.

Ayurveda, the ancient Indian system of medicine, offers a complementary perspective that addresses precisely these individual variations. Central to Ayurvedic dietary theory is the concept of Prakriti, an individual's unique psychosomatic constitution determined by the relative predominance of three fundamental energies called doshas: Vata, Pitta, and Kapha. Foods are classified not merely by their chemical composition but by their taste properties, thermal effects, post-digestive transformation, and specific actions on the doshas.

Despite the theoretical sophistication of Ayurvedic dietetics, its practical application in contemporary healthcare settings remains limited. The knowledge exists primarily in textual form, requiring specialized training to interpret and apply. Furthermore, the absence of quantitative frameworks makes it difficult to integrate Ayurvedic principles with evidence-based nutritional recommendations.

This project addresses these challenges by developing AyurDiet OS, a computational platform that operationalizes Ayurvedic dietary knowledge through algorithmic frameworks while maintaining compatibility with modern nutritional science. The system enables healthcare practitioners to generate personalized diet recommendations that satisfy both traditional compatibility rules and contemporary nutritional standards.

---

## 2. Problem Statement

Current dietary recommendation systems exhibit several critical limitations that compromise their effectiveness for personalized nutrition. First, most platforms rely exclusively on nutritional composition data, ignoring the individual variation in digestive capacity, metabolic tendencies, and constitutional predisposition that Ayurveda addresses through its dosha framework. A food item that is nutritionally appropriate may nonetheless be contraindicated for certain individuals based on their constitutional type.

Second, the rich knowledge embedded in Ayurvedic texts regarding food combinations, seasonal appropriateness, and therapeutic properties remains inaccessible to computational systems. The Viruddha Aahara concept, which describes incompatible food combinations that can produce toxic effects, has no equivalent in conventional nutrition software despite its clinical relevance.

Third, existing tools lack the capability to balance multiple competing objectives simultaneously. A patient with diabetes and Vata imbalance requires foods that are both low-glycemic and Vata-pacifying, constraints that may conflict and require sophisticated resolution mechanisms.

Fourth, there exists no standardized computational framework for quantifying Ayurvedic food properties or comparing foods across both traditional and modern parameters. This absence impedes systematic research and clinical decision support.

The problem this project addresses can be stated formally as: How can Ayurvedic dietary principles be mathematically formalized and computationally integrated with modern nutritional science to enable personalized, condition-specific diet planning that respects both traditional wisdom and evidence-based standards?

---

## 3. Objectives

The primary objectives of this project are enumerated below.

To develop a novel hybrid scoring algorithm that mathematically fuses Ayurvedic food compatibility parameters with modern nutritional adequacy metrics, enabling quantitative comparison of foods for individual patients.

To create a comprehensive food database annotated with complete Ayurvedic properties including the six tastes, thermal potency, post-digestive effect, twenty qualities, and tridoshic actions alongside standard nutritional composition.

To implement a knowledge graph-based system for detecting Viruddha Aahara, incompatible food combinations that may produce adverse effects according to Ayurvedic principles.

To design a constraint satisfaction-based meal composition engine capable of generating balanced meals that satisfy caloric targets, macronutrient requirements, taste diversity goals, and dosha compatibility constraints.

To develop a food substitution engine that identifies alternatives for restricted foods based on similarity in both nutritional profile and Ayurvedic properties.

To create condition-specific diet templates for common metabolic disorders incorporating both Ayurvedic treatment protocols and evidence-based nutritional guidelines.

To build an interactive platform enabling healthcare practitioners to assess patient constitution, generate personalized recommendations, and produce printable diet charts.

To design the system architecture with modularity that permits future replacement of rule-based algorithms with machine learning models.

---

## 4. Scope of the Project

The scope of this project encompasses the design and implementation of a web-based diet planning platform with the following boundaries.

The food database covers Indian cuisine with emphasis on foods commonly described in Ayurvedic texts. The database includes grains, millets, pulses, vegetables, fruits, dairy products, oils, spices, nuts, seeds, sweeteners, meat, seafood, and beverages. Each food item contains complete Ayurvedic property annotation and standard nutritional composition per serving.

The recipe database includes traditional Indian preparations classified by meal type, dietary category, regional origin, and health properties. Recipes are represented as ingredient combinations with cooking method specifications that modify the final Ayurvedic properties.

The system supports three user roles: patients who complete constitution assessment and view recommendations, doctors who manage patient profiles and create customized diet plans, and administrators who maintain the food and recipe databases.

The platform generates recommendations for common health conditions including diabetes mellitus, obesity, polycystic ovary disorder, digestive disorders, and dosha imbalances. Condition-specific templates provide structured weekly meal plans with appropriate food choices and avoidances.

The current implementation uses rule-based algorithms derived from classical Ayurvedic texts. The architecture supports future integration of machine learning models trained on clinical outcome data without requiring modification of the user interface or data structures.

The system does not provide medical diagnosis, replace physician consultation, or generate therapeutic interventions beyond dietary recommendations. Users are advised to consult qualified healthcare practitioners before implementing dietary changes.

---

## 5. Proposed System Overview

AyurDiet OS is a three-tier web application comprising a presentation layer for user interaction, an application layer containing business logic and algorithms, and a data layer storing food information, patient profiles, and system configurations.

The patient-facing module begins with a Prakriti assessment questionnaire based on classical texts. The questionnaire evaluates physical characteristics, physiological tendencies, and psychological attributes to determine the relative predominance of Vata, Pitta, and Kapha doshas. Upon completion, the system calculates a quantitative dosha distribution and identifies the dominant and secondary constitution types.

The recommendation engine takes the patient profile including constitution, current imbalances, health conditions, allergies, and dietary preferences as input. For each food item in the database, the system calculates an Ayur-Nutri Hybrid Score reflecting suitability for that specific patient. Foods are ranked by score, and the top recommendations are presented with explanations of their beneficial properties.

The meal composition module generates complete meals satisfying multiple constraints. Users specify the meal type, target calorie range, minimum protein requirement, and optional restrictions. The algorithm selects food combinations that meet these requirements while maximizing taste diversity and maintaining dosha compatibility.

The Viruddha Aahara module monitors food combinations in real-time. When a user adds foods to a meal, the system checks against a knowledge graph of incompatible pairs and displays warnings for problematic combinations with explanations of the incompatibility type.

The weekly planner module enables seven-day meal planning with variety enforcement. The system tracks food repetition and alerts users when items appear on consecutive days beyond acceptable thresholds. Pre-built templates for specific conditions can populate the planner automatically, with manual adjustment capabilities.

The doctor-facing module provides patient management capabilities, food compatibility checking for specific patients, and diet plan creation tools. Doctors can generate printable diet charts containing patient information, weekly schedules, recommended foods, foods to avoid, and general guidelines.

---

## 6. System Architecture

The system follows a modular architecture organized into five primary layers.

The presentation layer implements the user interface using React components within the Next.js framework. The layer handles user input validation, state management, and rendering of interactive elements. Client-side components include the Prakriti quiz, food browser with filtering capabilities, meal plate builder, weekly calendar, and printable chart generator. The presentation layer communicates with the application layer through RESTful API endpoints.

The API layer exposes three primary endpoints for external integration and future extensibility. The score endpoint accepts a food identifier and patient profile, returning the calculated Ayur-Nutri Hybrid Score with component breakdowns and explanatory recommendations. The meal endpoint accepts constraints and patient information, returning a generated meal composition with nutritional totals and compatibility assessment. The validate endpoint accepts food combinations and returns compatibility status with warnings for Viruddha Aahara violations.

The algorithm layer contains the core computational logic implemented as pure functions with no side effects. The ANH-Score calculator computes weighted combinations of Ayurvedic and nutritional subscores. The meal composer implements constraint satisfaction through a greedy optimization strategy. The Viruddha checker performs graph traversal for incompatibility detection. The recipe scorer aggregates ingredient properties with cooking method modifiers. The substitution engine calculates similarity metrics for alternative recommendations.

The data layer manages persistent storage of food items, recipes, diet templates, patient profiles, and system configuration. The current implementation uses static JSON files for food and recipe data, enabling rapid development and easy modification. The architecture supports migration to relational or document databases for production deployment with multi-user concurrency requirements.

The integration layer provides interfaces for future machine learning model integration. Each algorithm exposes a standardized input-output contract that permits replacement of rule-based implementations with model inference calls. This design ensures that trained models can be deployed without modifying upstream components.

---

## 7. Module Description

### 7.1 Constitution Assessment Module

This module implements the Prakriti questionnaire based on parameters described in classical Ayurvedic texts. The questionnaire contains twenty questions covering physical attributes such as body frame, skin characteristics, and hair quality; physiological tendencies including digestion, sleep patterns, and temperature sensitivity; and psychological attributes such as mental activity, emotional patterns, and memory characteristics.

Each response option carries weighted effects on the three doshas. Upon completion, the system sums the weighted effects to produce a percentage distribution across Vata, Pitta, and Kapha. The dominant dosha is identified as the highest percentage, with the secondary dosha being the second highest when it exceeds a significance threshold.

The module stores the calculated constitution in the patient profile and provides interpretive descriptions explaining the characteristics and dietary recommendations for the identified type.

### 7.2 Food Database Module

This module manages the comprehensive food database containing over one hundred items organized into thirteen categories: grains, millets, pulses, vegetables, leafy greens, fruits, dairy products, oils and fats, spices and herbs, nuts and seeds, sweeteners, meat and seafood, and beverages.

Each food entry contains identification information including a unique identifier, English name, Hindi name, and category classification. Ayurvedic properties include Rasa as an array of applicable tastes from the six options, Virya as heating or cooling potency, Vipaka as the post-digestive effect, Guna as applicable qualities from the twenty attributes, and Dosha Effect as signed integers indicating aggravation or pacification of each dosha.

Nutritional information includes calories, protein, carbohydrates, fat, and fiber per standard serving, with optional vitamin and mineral details. Additional metadata captures serving size, serving weight in grams, recommended seasons, and contraindications.

The module provides query functions for retrieving foods by identifier, filtering by category, and searching by name in both English and Hindi.

### 7.3 Recipe Management Module

This module handles recipes as structured combinations of ingredients with preparation metadata. Each recipe contains a unique identifier, names, type classification as breakfast, main course, side dish, snack, dessert, beverage, or accompaniment, and dietary category as vegetarian, vegan, non-vegetarian, or eggetarian.

The ingredient list specifies food identifiers with quantities in standardized units. Preparation method captures the cooking technique from options including boiling, steaming, frying, roasting, raw, fermented, tempered, pressure cooking, sauteing, baking, and grilling. Additional metadata includes cooking time, serving count, regional origin, applicable meal types, seasonal recommendations, and health benefits.

The module calculates aggregate nutritional and Ayurvedic properties for recipes based on ingredient contributions weighted by quantity, modified by cooking method effects on thermal potency and qualities.

### 7.4 ANH-Score Calculator Module

This module implements the Ayur-Nutri Hybrid Score algorithm, the primary novel contribution of this project. The calculator accepts a food item and patient profile as inputs and produces a composite score from zero to one hundred with component breakdowns and explanatory text.

The Ayurvedic subscore evaluates three factors. Dosha compatibility measures the alignment between the food's dosha effects and the patient's constitution, favoring foods that pacify the dominant dosha. Virya appropriateness considers the thermal potency relative to the patient's constitution and current season. Rasa contribution evaluates the taste profile for therapeutic relevance to the patient's conditions.

The nutritional subscore evaluates caloric appropriateness relative to the patient's targets, protein adequacy compared to goals, and general micronutrient density based on vitamin and mineral content.

The final score combines the subscores using configurable weights, defaulting to equal contribution. The module generates natural language explanations for both positive recommendations and warnings about potential concerns.

### 7.5 Meal Composition Module

This module generates complete meals satisfying specified constraints using a greedy constraint satisfaction approach. Input constraints include maximum calorie allowance, minimum protein requirement, target rasa count for taste diversity, and dosha compatibility threshold.

The algorithm maintains a candidate pool of foods appropriate for the specified meal type. Iteration proceeds by selecting the food with the highest ANH score that does not violate any constraint. The selected food is added to the meal, and constraints are updated to reflect remaining budgets. Iteration continues until no further additions are possible without violation.

The module returns the composed meal with individual item scores, aggregate nutritional totals, overall compatibility assessment, and suggestions for alternative items that could substitute for lower-scoring selections.

### 7.6 Viruddha Aahara Checker Module

This module implements the incompatible food combination detection system based on Ayurvedic Viruddha Aahara principles. The knowledge base contains documented incompatibilities organized by category including specific food pairs, thermal conflicts, processing incompatibilities, and time-based restrictions.

Specific pair incompatibilities capture combinations explicitly prohibited in classical texts, such as fish with milk products. Thermal conflicts identify combinations mixing strongly heating and strongly cooling foods. Processing incompatibilities flag combinations where one food negates the beneficial properties of another. Time-based restrictions capture foods inappropriate for consumption at specific times, such as yogurt at night.

The module provides functions for checking individual pairs, validating complete meals against all members, and identifying which specific food would be compatible as an addition to an existing selection.

### 7.7 Food Substitution Module

This module identifies alternative foods when items are restricted due to allergies, dietary preferences, or therapeutic contraindications. The substitution engine combines predefined mappings for common restrictions with algorithmic similarity matching.

Predefined mappings capture established substitutions such as plant-based alternatives for dairy products, gluten-free grain options, and protein sources for vegetarian diets. Algorithmic matching calculates similarity scores based on category membership, nutritional profile proximity, and Ayurvedic property alignment including dosha effects, thermal potency, and taste profile.

The module returns ranked alternatives with similarity scores, ANH scores for the specific patient, and natural language explanations of why each alternative is appropriate.

### 7.8 Weekly Planning Module

This module enables seven-day meal planning with automated variety checking. The planner maintains a data structure capturing meals for each day across breakfast, lunch, dinner, and snacks slots.

Variety enforcement tracks food repetition across consecutive days. When an item appears more than twice in three consecutive days, the system generates a warning recommending alternatives. The algorithm considers both individual foods and recipes, tracking ingredient-level repetition for recipe-based meals.

Template application populates the planner from condition-specific presets. Templates define daily calorie targets, meal calorie distributions, required and optional food categories for each slot, suggested recipes, and supplementary guidance. The module rotates suggestions across days to maximize variety while maintaining therapeutic consistency.

### 7.9 Diet Template Module

This module manages condition-specific diet templates providing structured weekly meal frameworks. Each template targets a specific health condition and defines comprehensive parameters for diet planning.

Template parameters include daily calorie targets, macronutrient ranges for protein, carbohydrates, and fat, preferred food categories, categories to avoid, specific recommended foods, specific foods to avoid, dosha focus for Ayurvedic balancing, meal structure with calorie allocations and suggested items for each slot, general guidelines for implementation, and lists of dos and donts for patient reference.

The module provides templates for diabetes management emphasizing low-glycemic foods and bitter vegetables, weight loss focusing on Kapha reduction with light and stimulating foods, polycystic ovary disorder management with hormone-balancing foods, Vata balancing with warm and grounding foods, Pitta cooling with calming and cooling foods, and digestive health recovery with easily digestible preparations.

### 7.10 Printable Chart Module

This module generates exportable diet charts suitable for printing and patient distribution. The chart includes a header section with clinic information and date, a patient information section with name, age, constitution type, and primary goals, daily nutritional targets, a weekly meal schedule in tabular format, lists of recommended and restricted foods, general Ayurvedic eating guidelines, and space for physician signature.

The module formats content for standard paper sizes with appropriate margins and typography for professional presentation.

---

## 8. Algorithms and Methodology

### 8.1 Prakriti Calculation Algorithm

The constitution assessment algorithm processes questionnaire responses to determine dosha distribution. The algorithm proceeds through the following logical steps.

Initialize three accumulators for Vata, Pitta, and Kapha scores to zero. For each question in the questionnaire, retrieve the selected response option. Each option contains predefined effect values for each dosha, expressed as positive integers indicating contribution strength. Add the Vata effect to the Vata accumulator, the Pitta effect to the Pitta accumulator, and the Kapha effect to the Kapha accumulator.

After processing all responses, calculate the total by summing all three accumulators. Convert each accumulator to a percentage by dividing by the total and multiplying by one hundred.

Identify the dominant dosha as the one with the highest percentage. If any other dosha exceeds thirty percent, identify it as the secondary dosha. Store the percentage distribution and identified types in the patient profile.

### 8.2 ANH-Score Calculation Algorithm

The Ayur-Nutri Hybrid Score algorithm calculates food suitability through the following procedure.

Begin by calculating the Ayurvedic subscore. For dosha compatibility, examine the food's effect on the patient's dominant dosha. If the food pacifies the dominant dosha, indicated by a negative effect value, award full compatibility points. If the food is neutral, award partial points. If the food aggravates the dominant dosha, indicated by a positive effect value, award minimal points proportional to the severity.

For Virya appropriateness, compare the food's thermal potency against the patient's constitution. Pitta-dominant patients benefit from cooling foods, Vata-dominant patients benefit from warming foods, and Kapha-dominant patients benefit from warming foods. Award points based on alignment, with seasonal modifiers adjusting the calculation based on current season.

For Rasa contribution, evaluate which tastes are therapeutically indicated for the patient's conditions. Award points for each taste in the food that matches therapeutic recommendations. Aggregate the three Ayurvedic components with equal weighting to produce the Ayurvedic subscore on a zero to one hundred scale.

Calculate the nutritional subscore by evaluating caloric appropriateness. Compare the food's calorie content to the patient's per-meal target derived from daily goals divided by meal count. Award full points when within target range, with graduated reduction for excess or deficit. Evaluate protein adequacy similarly, comparing to per-meal protein targets. Award points for fiber content above threshold values. Aggregate the nutritional components to produce the nutritional subscore.

Calculate the final ANH score as the weighted sum of subscores using the formula: ANH Score equals Ayurvedic weight multiplied by Ayurvedic subscore plus nutritional weight multiplied by nutritional subscore. Default weights are fifty percent each.

Generate explanatory text based on score components, noting particular strengths and any concerns identified during calculation.

### 8.3 Recipe Scoring Algorithm

The recipe scoring algorithm extends ANH-Score calculation to multi-ingredient preparations. The procedure follows these steps.

Initialize accumulators for total nutrition, weighted dosha effects, taste set, and thermal contribution. For each ingredient in the recipe, retrieve the corresponding food item from the database. Calculate the quantity in grams based on the specified amount and unit. Compute the proportion relative to standard serving size.

Add the proportional nutritional values to the total nutrition accumulators. For each dosha, add the food's effect multiplied by quantity weight to the running dosha total. Add all tastes present in the food to the taste set. Add the thermal contribution as positive for heating or negative for cooling, weighted by quantity.

After processing all ingredients, normalize dosha effects by dividing by total weight. Determine dominant Virya based on the sign of thermal contribution. Apply cooking method modifier to adjust thermal contribution and dosha effects based on the preparation technique. Frying adds heat and increases Kapha, steaming is neutral, roasting adds heat and reduces Kapha, and raw preparation is cooling and increases Vata.

Construct a virtual food object with the calculated aggregate properties. Pass this virtual food to the standard ANH-Score calculator to obtain the recipe score.

### 8.4 Meal Composition Algorithm

The meal composition algorithm generates balanced meals through constrained optimization. The procedure follows these steps.

Initialize the meal as an empty collection. Initialize remaining calorie budget from the maximum calorie constraint. Initialize remaining protein requirement from the minimum protein constraint. Initialize the taste set as empty. Create a candidate pool containing all foods appropriate for the specified meal type.

Calculate ANH scores for all candidates relative to the patient profile. Sort candidates by descending score.

Enter the selection loop. For each candidate in sorted order, check whether adding the food would exceed the calorie budget. If so, skip to the next candidate. Check whether the food creates any Viruddha Aahara conflict with existing meal items. If so, skip to the next candidate.

If the candidate passes both checks, add it to the meal. Subtract its calories from the remaining budget. Subtract its protein from the remaining requirement, flooring at zero. Add its tastes to the taste set.

Continue the loop until the calorie budget falls below the minimum viable food portion, or no candidates remain that satisfy constraints.

After exiting the loop, evaluate the composed meal. Check whether protein requirement was satisfied. Check whether taste diversity target was met. Generate the result including selected items, nutritional totals, satisfaction status for each constraint, and suggestions for improvement if any constraint was not fully satisfied.

### 8.5 Viruddha Aahara Detection Algorithm

The incompatibility detection algorithm performs efficient lookup against a precomputed knowledge graph. The procedure for pair checking follows these steps.

Accept two food identifiers as input. Normalize ordering by sorting identifiers alphabetically to ensure consistent lookup regardless of input order. Query the incompatibility index using the normalized pair as key.

If an entry exists, return incompatibility status as true along with the incompatibility type and explanatory description. If no entry exists, perform secondary checks for categorical incompatibilities. Check whether the thermal potencies conflict beyond acceptable threshold. Check whether processing types are incompatible. Check time-based restrictions against provided meal time if available.

If any secondary check fails, return incompatibility status with the relevant type and description. Otherwise, return compatibility status as true.

For meal validation, iterate through all unique pairs in the meal and aggregate any incompatibilities found.

### 8.6 Food Substitution Algorithm

The substitution algorithm identifies alternatives through combined lookup and similarity calculation. The procedure follows these steps.

Accept the food identifier to substitute and the restriction reason. Query predefined substitution mappings for direct alternatives. If mappings exist for this food and reason combination, add all mapped alternatives to the candidate pool.

Perform algorithmic search for additional candidates. Filter the food database to exclude items prohibited by the restriction reason. For dairy-free restrictions, exclude dairy category items. For gluten-free restrictions, exclude identified gluten-containing items. For nut-free restrictions, exclude nuts and seeds category items.

From remaining foods, calculate similarity scores for each candidate. Category match awards thirty points if the candidate shares the original food's category. Nutritional similarity awards up to thirty points based on proximity of caloric content, protein content, and carbohydrate content. Ayurvedic similarity awards up to forty points based on overlap in tastes, match in thermal potency, and alignment in dosha effects.

Calculate ANH score for each candidate relative to the patient profile. Compute final ranking score as thirty percent similarity plus seventy percent ANH score.

Sort candidates by descending ranking score. Return the top candidates with their scores and explanatory reasons for recommendation.

---

## 9. Data Design

### 9.1 Food Data Structure

The food data structure contains the following fields. Identifier is a unique string in snake case format. Name is the English name string. Name Hindi is the transliterated Hindi name string. Category is an enumerated value from the thirteen defined categories.

The Ayurvedic properties object contains Rasa as an array of taste enumeration values, Virya as an enumeration of heating or cooling, Vipaka as an enumeration of the three post-digestive effects, Dosha Effect as an object with Vata, Pitta, and Kapha integer values ranging from negative two to positive two, and Guna as an optional array of quality enumeration values.

The nutrition object contains calories as a decimal number, protein as grams decimal, carbohydrates as grams decimal, fat as grams decimal, and fiber as grams decimal. Optional nested objects capture vitamins and minerals with named properties for specific nutrients.

Serving size is a descriptive string. Serving grams is the integer weight in grams. Season is an optional array of Ayurvedic season names indicating optimal consumption periods. Contraindications is an optional array of strings describing conditions or situations where the food should be avoided.

### 9.2 Recipe Data Structure

The recipe data structure extends food representation for preparations. Identifier, name, and name Hindi follow the food pattern. Type enumerates the meal category. Category enumerates dietary classification.

The ingredients array contains objects with food identifier, quantity as a decimal, unit as an enumerated measurement, and optional flag indicating whether the ingredient is optional.

Preparation method enumerates the cooking technique. Cooking time is an integer in minutes. Servings is an integer count. Region enumerates the geographic origin. Meal types is an array of applicable meal occasions.

Optional arrays capture seasonal recommendations, health benefits as descriptive strings, contraindications, and preparation instructions as ordered steps.

### 9.3 Patient Profile Data Structure

The patient profile contains identifying information including unique identifier, name string, age integer, and gender enumeration.

Prakriti is an object containing Vata, Pitta, and Kapha as integer percentages, dominant dosha as an enumeration, and optional secondary dosha.

Vikriti is an optional object with the same structure capturing current imbalance state.

Conditions is an array of health condition identifier strings. Allergies is an array of allergen strings. Dietary preferences is an array of preference enumeration values.

Goals is an object containing weight goal as an enumeration of lose, maintain, or gain, optional daily calorie target integer, optional protein target integer, and optional diet goals array.

### 9.4 Diet Template Data Structure

Diet templates contain identifier, name, Hindi name, target condition identifier, and description string. Duration enumerates the planned period.

Daily calorie target is an integer. Macro targets is an object with nested minimum and maximum values for protein, carbohydrates, fat, and fiber.

Preferred categories and avoid categories are arrays of category enumerations. Preferred foods and avoid foods are arrays of food identifier strings. Dosha focus enumerates the target dosha for balancing.

Meal structure is an object with keys for each meal slot containing calorie range object, required categories array, optional categories array, suggested recipes array, and optional notes string.

Guidelines is an array of instruction strings. Dos list and donts list are arrays of recommendation strings.

---

## 10. Technology Stack and Justification

### 10.1 Frontend Framework

Next.js version sixteen with the App Router architecture provides the foundation for the presentation layer. This selection is justified by several factors. Server-side rendering capabilities enable fast initial page loads critical for user experience. The file-system based routing simplifies navigation structure. Built-in API routes eliminate the need for separate backend deployment for the current scope. The React foundation provides a mature component ecosystem and strong community support.

### 10.2 Programming Language

TypeScript provides static typing for the entire codebase. Strong typing catches errors during development rather than runtime, particularly valuable for complex data structures representing Ayurvedic properties. Interface definitions serve as documentation for data contracts between modules. The compilation step ensures consistency across the codebase.

### 10.3 Styling Framework

Tailwind CSS provides utility-first styling with several advantages. Rapid prototyping is enabled by composing styles directly in markup. Consistent design tokens ensure visual coherence. Purging unused styles minimizes production bundle size. The configuration system permits customization of the design system including Ayurveda-inspired color palette.

### 10.4 Visualization Library

React Force Graph provides knowledge graph visualization capabilities. The library renders interactive node-link diagrams suitable for displaying food-dosha-condition relationships. WebGL acceleration enables smooth interaction with graphs containing hundreds of nodes. The declarative API integrates cleanly with React component patterns.

### 10.5 Data Storage

Static JSON files provide data storage for the current implementation phase. This approach enables rapid iteration on data structures without database migration overhead. Human-readable format facilitates manual verification and editing. Version control integration tracks data changes alongside code changes.

The architecture accommodates future migration to production databases. The data access layer abstracts storage details behind query functions. PostgreSQL or MongoDB integration would require implementing these functions against database clients while preserving existing interfaces.

---

## 11. Security Considerations

The current implementation operates as a client-side application with no persistent user authentication or sensitive data storage. Nevertheless, several security considerations inform the design.

Patient profile data, while not medically sensitive in the current scope, follows the principle of minimal collection. Only information necessary for diet recommendations is gathered. Profiles are stored in browser local storage with no transmission to external servers.

API endpoints validate input data before processing. Malformed requests receive appropriate error responses without exposing internal implementation details. Rate limiting would be implemented for production deployment to prevent abuse.

The architecture separates algorithm implementations from data access, limiting the attack surface for potential injection vulnerabilities. Input sanitization prevents cross-site scripting in user-provided text fields.

Future enhancements involving user accounts and persistent storage would require implementation of authentication mechanisms, encrypted data transmission, and compliance with relevant health data protection regulations.

---

## 12. Testing Strategy

### 12.1 Unit Testing

Algorithm modules are tested in isolation with defined input-output pairs. ANH-Score calculations are verified against manually computed expected values for representative food-patient combinations. Meal composition is tested with various constraint configurations to verify satisfaction behavior. Viruddha checking is tested against the complete incompatibility knowledge base to ensure correct lookup.

### 12.2 Integration Testing

API endpoints are tested for correct request handling and response formatting. The score endpoint is verified with valid and invalid food identifiers. The meal endpoint is tested with achievable and impossible constraint combinations. The validate endpoint is tested with known compatible and incompatible pairs.

### 12.3 Component Testing

React components are tested for correct rendering and interaction behavior. The Prakriti quiz is verified to track responses correctly and calculate accurate results. The food browser is tested for filter application and search functionality. The weekly planner is tested for variety warning generation.

### 12.4 End-to-End Testing

Complete user workflows are tested from onboarding through recommendation viewing. A test patient completes constitution assessment and verifies appropriate recommendations appear. A test doctor creates a diet plan and verifies printable output generation.

---

## 13. Performance Analysis

### 13.1 Computational Complexity

The ANH-Score calculation operates in constant time relative to database size, requiring only the retrieval and processing of a single food item. For a database of N foods, ranking all items requires N score calculations, yielding linear complexity.

Meal composition complexity depends on the number of candidates C and the maximum meal size M. The greedy algorithm performs at most M iterations, each requiring comparison against remaining candidates. Worst-case complexity is O(M multiplied by C), which remains tractable for realistic values.

Viruddha checking for a pair operates in constant time through hash-based lookup. Validating a meal of M items requires checking M choose two pairs, yielding quadratic complexity in meal size. Given that meals typically contain fewer than ten items, this remains efficient.

### 13.2 Response Time Measurement

Initial page load completes within one second on standard broadband connections. Score calculation returns within fifty milliseconds for individual items. Meal composition returns within two hundred milliseconds for typical constraints. Full database ranking returns within one second for the current one hundred five items.

### 13.3 Scalability Considerations

The current architecture supports expansion to several thousand food items without significant performance degradation. Beyond this scale, implementation of caching for score calculations and pagination for search results would maintain responsiveness. Database migration would be advisable for deployments exceeding ten thousand items.

---

## 14. Limitations

Several limitations constrain the current implementation and should be acknowledged.

The food database, while comprehensive for common Indian foods, does not cover regional variations, prepared foods from restaurants, or packaged products. Users may encounter items not present in the database.

Nutritional values derive from standard references and may not reflect variation due to growing conditions, storage, or preparation variations. Ayurvedic property assignments, while based on classical texts, involve interpretive judgment where sources provide incomplete or conflicting information.

The rule-based algorithms encode knowledge from Ayurvedic texts but cannot capture the nuanced clinical judgment of experienced practitioners. Unusual cases or complex multi-morbidity scenarios may receive suboptimal recommendations.

The system assumes users accurately report their characteristics during constitution assessment. Self-reporting bias may affect Prakriti determination accuracy.

The platform does not integrate with electronic health records, laboratory values, or real-time physiological monitoring that could enhance personalization.

Clinical validation through outcomes research has not been conducted. Recommendations are based on theoretical soundness rather than demonstrated efficacy in controlled trials.

---

## 15. Future Enhancements

Several enhancements are planned for future development phases.

Machine learning model integration will replace rule-based algorithms with trained models capable of learning from clinical outcomes data. The modular architecture supports this transition without user interface changes.

Mobile application development will extend platform accessibility. Native applications for iOS and Android would enable offline access to recommendations and integration with health tracking devices.

Expanded food database coverage will incorporate regional cuisines, restaurant menus, and packaged food products through partnerships with food data providers.

Meal logging and progress tracking will enable longitudinal monitoring of dietary adherence and health outcomes. Integration with wearable devices would automate portions of this tracking.

Multi-language support will enable interface localization for Indian languages beyond Hindi, expanding accessibility for non-English speakers.

Practitioner collaboration features will enable Ayurvedic physicians to share customized food property annotations and treatment protocols, building a community knowledge base.

Clinical validation studies will assess recommendation efficacy through controlled trials measuring health outcomes for patients following system-generated plans versus standard care.

---

## 16. Conclusion

AyurDiet OS demonstrates the feasibility of computationally integrating Ayurvedic dietary principles with modern nutritional science. The Ayur-Nutri Hybrid Score provides a quantitative framework for evaluating food suitability that respects both traditional wisdom and evidence-based standards.

The comprehensive food database with complete Ayurvedic annotation, the constraint-based meal composition engine, and the knowledge graph-based incompatibility detection system together provide a foundation for personalized diet planning that accounts for individual constitution, health conditions, and nutritional requirements.

The modular architecture with well-defined interfaces supports evolutionary development, enabling future enhancement through machine learning integration, expanded data coverage, and clinical validation. The current rule-based implementation serves as both a functional tool and a baseline for comparison with future model-based approaches.

This project contributes to the emerging field of integrative health informatics by demonstrating practical methods for digitizing traditional medical knowledge while maintaining scientific rigor. The platform offers potential value for healthcare practitioners seeking to incorporate Ayurvedic perspectives into dietary counseling, for patients seeking personalized nutrition guidance, and for researchers investigating the intersection of traditional and modern medicine.

---

## 17. References

1. Charaka Samhita with Chakrapani Commentary. Sutrasthana, Chapter 25-27. Chaukhamba Sanskrit Series.

2. Ashtanga Hridayam. Sutrasthana, Chapter 8. Chaukhamba Orientalia.

3. Lad, V. Ayurvedic Perspectives on Selected Pathologies. Albuquerque: Ayurvedic Press.

4. World Health Organization. Diet, Nutrition and the Prevention of Chronic Diseases. WHO Technical Report Series.

5. Indian Council of Medical Research. Nutrient Requirements and Recommended Dietary Allowances for Indians. ICMR Publication.

6. National Institute of Nutrition. Indian Food Composition Tables. NIN Publication.

7. Sharma, H., and Clark, C. Contemporary Ayurveda: Medicine and Research in Maharishi Ayur-Veda. Edinburgh: Churchill Livingstone.

8. Pole, S. Ayurvedic Medicine: The Principles of Traditional Practice. London: Singing Dragon.

9. Russell, S., and Norvig, P. Artificial Intelligence: A Modern Approach. Pearson Education.

10. Next.js Documentation. Vercel Inc. https://nextjs.org/docs
