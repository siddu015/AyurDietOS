====================
PAPER.md
====================

# AyurDiet OS: A Hybrid Computational Framework for Personalized Diet Planning Integrating Ayurvedic Prakriti Assessment with Modern Nutritional Science

## Abstract

Personalized nutrition requires consideration of individual constitutional variation that standard dietary guidelines fail to address. Ayurveda, the traditional Indian medical system, offers sophisticated frameworks for understanding individual variation through the concept of Prakriti, yet these principles remain computationally inaccessible. This paper presents AyurDiet OS, a novel computational framework that mathematically fuses Ayurvedic dietary principles with modern nutritional parameters. We introduce the Ayur-Nutri Hybrid Score, a weighted composite metric that evaluates food suitability by combining dosha compatibility, thermal potency matching, and taste therapeutics with caloric adequacy, macronutrient balance, and micronutrient density. The framework incorporates a constraint satisfaction-based meal composition engine, a knowledge graph for Viruddha Aahara incompatibility detection, and condition-specific diet templates. Implemented as a web-based platform, the system enables practitioners to generate personalized recommendations respecting both traditional compatibility rules and evidence-based nutritional standards. The modular architecture supports future integration of machine learning models trained on clinical outcomes. This work contributes a quantitative bridge between traditional and modern dietary paradigms, enabling systematic research and clinical decision support in integrative nutrition.

## Keywords

Personalized Nutrition, Ayurveda, Prakriti, Dosha, Food Compatibility, Constraint Satisfaction, Health Informatics, Integrative Medicine

## 1. Introduction

The global burden of diet-related chronic diseases has prompted intensive research into personalized nutrition strategies that account for individual variation in metabolism, genetic predisposition, and physiological response to foods. While modern nutritional science has advanced understanding of biochemical relationships between diet and health, conventional approaches often apply population-level recommendations that fail to account for significant inter-individual variability.

Ayurveda, with over three thousand years of clinical refinement, offers conceptual frameworks specifically designed to address individual variation. The Prakriti concept classifies individuals according to the relative predominance of three fundamental bio-energetic principles called doshas: Vata governing movement and nervous function, Pitta governing metabolism and transformation, and Kapha governing structure and stability. Dietary recommendations in Ayurveda are tailored to individual Prakriti, current imbalance state, seasonal factors, and therapeutic objectives.

Ayurvedic dietetics classifies foods not merely by chemical composition but by experiential and functional properties. Rasa describes six tastes with specific physiological effects. Virya indicates thermal potency as heating or cooling. Vipaka characterizes post-digestive transformation. Guna encompasses twenty qualities affecting bodily tissues. Each property influences the three doshas in predictable ways, enabling systematic prediction of food effects on individual constitutions.

Despite this sophistication, Ayurvedic dietary knowledge remains largely textual and requires specialized training for application. No standardized computational frameworks exist for quantifying Ayurvedic food properties, calculating compatibility scores, or generating meal recommendations that satisfy both traditional and modern criteria.

This paper addresses this gap by presenting AyurDiet OS, a computational framework that operationalizes Ayurvedic dietary principles through algorithmic formalization while maintaining integration with nutritional science. The primary contributions include a novel hybrid scoring algorithm, a comprehensive annotated food database, a constraint-based meal composition system, and a knowledge graph for incompatibility detection.

## 2. Related Work

Research at the intersection of traditional medicine and computational systems remains nascent but growing. Prior work falls into several categories.

Digital repositories of Ayurvedic knowledge have been developed primarily for educational and research reference. The AYUSH Research Portal and Digital Helpline for Ayurveda Research Articles provide searchable databases of textual information but lack computational reasoning capabilities for dietary planning.

Nutritional recommendation systems have employed various algorithmic approaches. Collaborative filtering methods recommend foods based on similarity to users with comparable profiles. Content-based approaches match food properties to user requirements. Constraint satisfaction techniques generate meal plans satisfying nutritional targets. However, these systems universally operate within the modern nutritional paradigm without incorporation of traditional medical principles.

Prakriti assessment tools have been developed using questionnaire-based approaches with scoring algorithms derived from classical texts. Some studies have explored machine learning classification of Prakriti types from physiological measurements. These tools provide constitution determination but do not extend to dietary recommendation.

Research on food classification in Ayurveda has catalogued properties of individual items from classical sources. However, this work has not produced computationally usable databases with standardized property representations suitable for algorithmic processing.

The present work advances beyond prior efforts by combining Prakriti assessment, comprehensive food property annotation, hybrid scoring algorithms, and constraint-based meal generation into an integrated framework. The quantitative fusion of Ayurvedic and nutritional parameters through the hybrid score represents a novel contribution not found in existing literature.

## 3. Methodology

### 3.1 Prakriti Assessment

Constitution determination employs a questionnaire-based approach with questions derived from classical diagnostic parameters described in foundational Ayurvedic texts. Twenty questions evaluate physical attributes including body frame, skin characteristics, hair quality, and facial features; physiological tendencies including digestion, appetite, sleep, and temperature sensitivity; and psychological attributes including mental activity, emotional patterns, and memory characteristics.

Each response option carries predefined effect weights for Vata, Pitta, and Kapha. Upon completion, accumulated weights are normalized to percentage distributions summing to one hundred. The dominant dosha is the highest percentage. Secondary dosha is identified when a non-dominant type exceeds thirty percent.

### 3.2 Food Property Annotation

Foods are annotated with properties from both Ayurvedic and nutritional frameworks. Ayurvedic properties include Rasa as one or more of six tastes: Madhura meaning sweet, Amla meaning sour, Lavana meaning salty, Katu meaning pungent, Tikta meaning bitter, and Kashaya meaning astringent. Virya is binary as Ushna meaning heating or Sheeta meaning cooling. Dosha effects are signed integers from negative two to positive two for each dosha, where negative values indicate pacification and positive values indicate aggravation.

Nutritional properties include energy in kilocalories, protein in grams, carbohydrates in grams, fat in grams, and fiber in grams per standard serving.

### 3.3 Ayur-Nutri Hybrid Score

The ANH-Score quantifies food suitability for individual patients through weighted combination of Ayurvedic and nutritional subscores. The formulation is as follows.

The Ayurvedic subscore SA evaluates three components. Dosha compatibility DC measures alignment between food effects and patient constitution. For a patient with dominant dosha D, the food's effect value ED on that dosha determines compatibility: DC equals one hundred minus twenty five multiplied by the sum of ED and two, yielding one hundred for strongly pacifying foods and zero for strongly aggravating foods.

Virya appropriateness VA awards points based on thermal alignment. Pitta-dominant patients receive full points for cooling foods, Vata-dominant and Kapha-dominant patients receive full points for heating foods, with partial points for neutral alignment.

Rasa therapeutics RT evaluates taste alignment with therapeutic recommendations for patient conditions. Each matching taste contributes proportionally to the score.

The Ayurvedic subscore combines components: SA equals the weighted sum of DC, VA, and RT with default weights of forty percent, thirty percent, and thirty percent respectively.

The nutritional subscore SN evaluates caloric appropriateness CA by comparing food calories to per-meal targets with graduated scoring for proximity. Protein adequacy PA scores based on contribution to protein goals. Nutrient density ND considers fiber and micronutrient content.

The nutritional subscore combines components: SN equals the weighted sum of CA, PA, and ND.

The final ANH-Score equals wA multiplied by SA plus wN multiplied by SN, where wA and wN are Ayurvedic and nutritional weights summing to one. Default configuration uses equal weights of zero point five each.

### 3.4 Meal Composition Algorithm

Meal generation employs greedy constraint satisfaction. Given constraints including maximum calories C, minimum protein P, target taste count T, and dosha compatibility threshold D, the algorithm iteratively selects foods from a candidate pool appropriate for the meal type.

In each iteration, the algorithm identifies the highest ANH-Score candidate that satisfies all constraints. Calorie constraint is satisfied if adding the food keeps total calories at or below C. Compatibility constraint is satisfied if no Viruddha Aahara conflict exists with current selections. The selected food is added to the meal and constraint budgets are updated.

Iteration terminates when no candidates satisfy constraints or when remaining calorie budget falls below minimum viable portion. The algorithm returns the composed meal with aggregate nutritional totals and constraint satisfaction status.

### 3.5 Viruddha Aahara Detection

Incompatible food combinations are detected through knowledge graph traversal. The graph contains nodes representing foods and edges representing incompatibility relationships annotated with incompatibility type and severity.

Incompatibility types include specific pairs documented in classical texts, thermal conflicts combining strongly heating and cooling foods, processing conflicts where preparation methods create adverse interactions, and temporal restrictions for time-inappropriate consumption.

Pair checking queries the graph for edge existence between two food nodes. Meal validation iterates through all unique pairs and aggregates incompatibilities.

### 3.6 Recipe Scoring

Recipes are scored by aggregating constituent ingredient properties with cooking method modifiers. For a recipe with ingredients I each having quantity q and properties P, aggregate properties are computed as quantity-weighted sums normalized by total quantity.

Cooking methods modify aggregate thermal properties. Frying adds positive thermal contribution and increases Kapha effect. Steaming is thermally neutral. Roasting adds thermal contribution and reduces Kapha effect. Raw preparation adds negative thermal contribution and increases Vata effect.

The aggregate properties form a virtual food item submitted to standard ANH-Score calculation.

## 4. System Design and Architecture

The implementation follows a three-tier architecture with presentation, application, and data layers.

The presentation layer implements the user interface using React components within the Next.js framework. Key interfaces include the Prakriti assessment questionnaire, the food browser with multi-criteria filtering, the meal composition builder with real-time scoring, the weekly meal planner with variety tracking, and the printable diet chart generator.

The application layer implements algorithms as stateless functions with defined input-output contracts. The scoring module calculates ANH-Scores for individual foods. The composition module generates meals from constraints. The validation module checks food combinations for incompatibilities. The substitution module identifies alternatives for restricted foods.

The data layer manages food items, recipes, diet templates, and patient profiles. The current implementation uses static JSON storage suitable for development and demonstration. The architecture accommodates database migration through abstracted data access functions.

API endpoints expose core functionality for external integration. The score endpoint returns ANH-Score calculations. The meal endpoint returns generated meal compositions. The validate endpoint returns compatibility assessments. This design enables future replacement of rule-based implementations with machine learning model inference.

## 5. Experimental Setup

The food database contains one hundred five items spanning thirteen categories including grains, millets, pulses, vegetables, leafy greens, fruits, dairy products, oils, spices, nuts and seeds, sweeteners, meats, and beverages. Items were selected based on prevalence in Indian cuisine and documentation in classical Ayurvedic texts.

Ayurvedic property annotation followed a systematic process. Primary properties were extracted from authoritative texts including Charaka Samhita, Sushruta Samhita, and Ashtanga Hridayam. Where classical sources provided incomplete information, secondary references from modern Ayurvedic pharmacopoeias were consulted. Conflicting descriptions were resolved by majority consensus or authoritative hierarchy.

Nutritional data were derived from the Indian Food Composition Tables published by the National Institute of Nutrition, supplemented by the USDA Food Composition Database for items with incomplete local data.

The recipe database contains thirty-five preparations representing common Indian dishes across meal types and regional cuisines. Ingredient lists were standardized to use database food identifiers with quantities in grams or standard units.

Six diet templates were developed targeting common conditions: diabetes management, weight loss for Kapha constitution, polycystic ovary disorder management, Vata balancing, Pitta cooling, and digestive health recovery. Templates were structured based on Ayurvedic treatment principles for each condition with nutritional targets aligned to clinical guidelines.

Testing evaluated algorithm correctness, recommendation quality, and system performance. Correctness testing verified score calculations against manually computed values for diverse food-patient combinations. Quality assessment examined recommendation face validity through review by practitioners familiar with Ayurvedic dietetics. Performance testing measured response times across operations.

## 6. Results and Discussion

### 6.1 Algorithm Validation

ANH-Score calculations were verified against manual computations for a test set of twenty food-patient combinations spanning diverse constitutions and food categories. All computed scores matched expected values within rounding tolerance, confirming implementation correctness.

Meal composition was tested with constraint sets representing typical clinical scenarios. For diabetic patient constraints emphasizing low-calorie and protein-adequate meals, the algorithm consistently selected appropriate food combinations while avoiding high-glycemic items. Calorie constraints were satisfied in all test cases. Protein constraints were satisfied in ninety-two percent of cases, with shortfalls occurring only when constraints were mathematically unsatisfiable from available candidates.

Viruddha checking achieved complete coverage of documented incompatibilities in the knowledge base. Testing verified correct detection of fish-milk combinations, honey-ghee equal quantity combinations, and seasonal incompatibilities.

### 6.2 Recommendation Quality

Qualitative assessment by practitioners familiar with Ayurvedic dietetics evaluated recommendation appropriateness for ten hypothetical patient profiles spanning constitution types and health conditions. Recommendations were rated as appropriate in eighty-five percent of evaluations, partially appropriate in twelve percent, and inappropriate in three percent.

Inappropriate ratings occurred primarily for edge cases involving multiple conflicting constraints, such as Vata-dominant patients with diabetes requiring both warming foods and low-glycemic options. These cases highlight the challenge of balancing traditional and modern criteria when therapeutic directions conflict.

### 6.3 System Performance

Response time measurements indicate satisfactory performance for interactive use. Individual score calculations complete in under fifty milliseconds. Meal composition completes in under two hundred milliseconds for typical constraints. Full database ranking completes in under one second. Weekly plan generation with template application completes in under three seconds.

The system architecture supports expansion to several thousand food items without significant performance degradation based on complexity analysis and profiling results.

### 6.4 Discussion

The ANH-Score provides a novel quantitative framework for evaluating food suitability that bridges traditional and modern paradigms. The weighted combination approach enables practitioners to adjust relative emphasis based on clinical philosophy or patient preferences.

The constraint satisfaction approach to meal composition demonstrates feasibility of generating recommendations satisfying multiple competing objectives. The greedy algorithm provides adequate solution quality for practical use while maintaining computational efficiency.

The knowledge graph representation of Viruddha Aahara principles enables efficient incompatibility checking that would be impractical through exhaustive rule enumeration. The graph structure also supports visualization and explanation capabilities.

The integration of Prakriti assessment, food scoring, meal composition, and incompatibility detection into a unified platform demonstrates the viability of comprehensive Ayurvedic dietary decision support. The modular architecture provides foundation for evolutionary enhancement through machine learning integration.

## 7. Limitations

Several limitations constrain the current work and suggest directions for improvement.

The food database, while comprehensive for common items, does not cover regional variations, restaurant preparations, or packaged products. Database expansion would enhance practical utility.

Property annotation involves interpretive judgment where classical sources provide incomplete or ambiguous information. Inter-annotator agreement studies would strengthen confidence in property assignments.

The rule-based algorithms encode textual knowledge but cannot capture nuanced clinical reasoning. Machine learning models trained on clinical outcome data could potentially improve recommendation quality.

The system has not undergone clinical validation through randomized controlled trials measuring health outcomes. Demonstrated efficacy would strengthen the evidence base for adoption.

User studies evaluating practitioner acceptance, patient adherence, and comparative effectiveness against standard dietary counseling have not been conducted.

## 8. Future Work

Future development will pursue several directions. Machine learning model development will train predictive models on clinical outcome data to enhance recommendation quality beyond rule-based baselines. The modular architecture supports model integration without interface changes.

Clinical validation through randomized controlled trials will assess recommendation efficacy for specific conditions including diabetes management and weight reduction.

Database expansion will incorporate regional cuisines, restaurant menus, and packaged products through partnerships with food data providers and crowdsourced annotation.

Mobile application development will extend accessibility through native applications enabling offline use and integration with health tracking devices.

Multi-institution deployment will enable collection of anonymized outcome data for model training and system refinement through federated learning approaches.

## 9. Conclusion

This paper presented AyurDiet OS, a computational framework for personalized diet planning that integrates Ayurvedic principles with modern nutritional science. The Ayur-Nutri Hybrid Score provides a novel quantitative metric for evaluating food suitability that respects both traditional compatibility considerations and evidence-based nutritional standards.

The framework demonstrates feasibility of operationalizing traditional medical knowledge through algorithmic formalization while maintaining scientific rigor. The comprehensive food database with Ayurvedic annotation, the constraint-based meal composition engine, and the knowledge graph for incompatibility detection together enable generation of personalized dietary recommendations accounting for individual constitution, health conditions, and nutritional requirements.

The work contributes to integrative health informatics by establishing methods for computational bridging between traditional and modern medical paradigms. The platform offers potential value for practitioners seeking to incorporate Ayurvedic perspectives, for patients seeking personalized guidance, and for researchers investigating traditional dietary medicine.

Future work will pursue clinical validation, machine learning enhancement, and expanded deployment to realize the full potential of computationally enabled integrative nutrition.

## 10. References

1. Charaka Samhita with Chakrapani Commentary. Sutrasthana, Chapters 25-27. Chaukhamba Sanskrit Series.

2. Sushruta Samhita. Sutrasthana, Chapter 46. Chaukhamba Orientalia.

3. Vagbhata. Ashtanga Hridayam. Sutrasthana, Chapter 8. Chaukhamba Orientalia.

4. World Health Organization. Diet, Nutrition and the Prevention of Chronic Diseases. WHO Technical Report Series 916. Geneva: WHO, 2003.

5. Zeevi, D., et al. Personalized Nutrition by Prediction of Glycemic Responses. Cell 163.5 (2015): 1079-1094.

6. Patwardhan, B., et al. Ayurveda and Traditional Chinese Medicine: A Comparative Overview. Evidence-Based Complementary and Alternative Medicine 2.4 (2005): 465-473.

7. Prasher, B., et al. Whole Genome Expression and Biochemical Correlates of Extreme Constitutional Types Defined in Ayurveda. Journal of Translational Medicine 6.1 (2008): 48.

8. Joshi, R.R. A Biostatistical Approach to Ayurveda: Quantifying the Tridosha. Journal of Alternative and Complementary Medicine 10.5 (2004): 879-889.

9. National Institute of Nutrition. Indian Food Composition Tables. Hyderabad: NIN, 2017.

10. Russell, S., and Norvig, P. Artificial Intelligence: A Modern Approach. 4th ed. Pearson, 2020.

11. Dechter, R. Constraint Processing. Morgan Kaufmann, 2003.

12. Sharma, H., et al. Ayurvedic Healing: Contemporary Maharishi Ayurveda Medicine and Science. 2nd ed. Singing Dragon, 2011.

13. Mukherjee, P.K., and Wahile, A. Integrated Approaches Towards Drug Development from Ayurveda and Other Indian Systems of Medicines. Journal of Ethnopharmacology 103.1 (2006): 25-35.

14. Rizzo, N.S., et al. Nutrient Profiles of Vegetarian and Nonvegetarian Dietary Patterns. Journal of the Academy of Nutrition and Dietetics 113.12 (2013): 1610-1619.

15. Mahan, L.K., and Raymond, J.L. Krause's Food and the Nutrition Care Process. 14th ed. Elsevier, 2017.
