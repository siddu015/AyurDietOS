import { AyurvedaTip } from '../types';

export const ayurvedaTips: AyurvedaTip[] = [
  // ============================================================
  // SPICE REMEDIES (25 tips)
  // ============================================================

  // Turmeric (5)
  {
    id: 'spice_turmeric_wounds',
    ingredient: 'Turmeric (Haridra)',
    foodIds: ['turmeric'],
    category: 'spice_remedy',
    conditions: ['skin_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Apply turmeric paste on minor wounds and cuts to speed healing.',
    detail:
      'Turmeric contains curcumin, a potent antiseptic and anti-inflammatory compound. Mix ½ tsp turmeric with a few drops of coconut oil and apply topically. For internal healing, take ¼ tsp turmeric in warm water twice daily.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'spice_turmeric_inflammation',
    ingredient: 'Turmeric (Haridra)',
    foodIds: ['turmeric'],
    category: 'spice_remedy',
    conditions: ['arthritis'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Take ½ tsp turmeric in warm milk daily to reduce chronic inflammation and joint stiffness.',
    detail:
      'Curcumin inhibits NF-kB and COX-2 inflammatory pathways. Combining with a pinch of black pepper increases bioavailability by up to 2000%. Best taken at night for overnight anti-inflammatory action.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_turmeric_immunity',
    ingredient: 'Turmeric (Haridra)',
    foodIds: ['turmeric'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['kapha'],
    tip: 'Add turmeric to daily cooking to bolster immune function and prevent seasonal infections.',
    detail:
      'Turmeric is classified as a Rasayana (rejuvenative) in Ayurveda. Its immunomodulatory properties stimulate both innate and adaptive immunity. Use ¼–½ tsp in dals, curries, and rice preparations.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'spice_turmeric_skin',
    ingredient: 'Turmeric (Haridra)',
    foodIds: ['turmeric'],
    category: 'spice_remedy',
    conditions: ['skin_disorders'],
    doshaAffinity: ['pitta', 'kapha'],
    tip: 'Mix turmeric with gram flour and rose water as a face pack to improve complexion and treat acne.',
    detail:
      'Turmeric purifies blood (Rakta Shodhaka) and clears Pitta-related skin conditions. Apply paste for 15 minutes, then rinse. Internal consumption of ¼ tsp turmeric in warm water supports the external treatment.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'spice_turmeric_liver',
    ingredient: 'Turmeric (Haridra)',
    foodIds: ['turmeric'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['pitta', 'kapha'],
    tip: 'Take ½ tsp turmeric with warm water on an empty stomach to support liver detoxification.',
    detail:
      'Turmeric is a Yakrit Uttejaka (liver stimulant) that enhances bile production and supports Phase II liver detoxification. Especially beneficial during spring cleansing routines.',
    source: 'Charaka Samhita',
  },

  // Ginger (5)
  {
    id: 'spice_ginger_digestion',
    ingredient: 'Ginger (Shunti/Ardraka)',
    foodIds: ['ginger'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Chew a thin slice of fresh ginger with rock salt before meals to kindle Agni (digestive fire).',
    detail:
      'Fresh ginger (Ardraka) is Deepana (appetite-stimulating) and Pachana (digestive). This pre-meal practice is called Agni Deepana and is one of the simplest yet most effective Ayurvedic digestive aids.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_ginger_nausea',
    ingredient: 'Ginger (Shunti/Ardraka)',
    foodIds: ['ginger'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Sip ginger tea to relieve nausea, morning sickness, and motion sickness.',
    detail:
      'Ginger contains gingerols and shogaols which act on 5-HT3 receptors to reduce nausea. Boil 1-inch fresh ginger in 2 cups water for 10 minutes. Can be safely used during pregnancy in moderate amounts.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'spice_ginger_cold',
    ingredient: 'Ginger (Shunti/Ardraka)',
    foodIds: ['ginger'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Drink dry ginger (Shunti) powder in hot water with honey at the onset of cold and flu symptoms.',
    detail:
      'Dry ginger is more heating (Ushna Virya) than fresh and is preferred for Kapha-type colds with congestion and white mucus. Mix ½ tsp dry ginger powder in hot water and add honey after it cools slightly. Take 2–3 times daily.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'spice_ginger_joints',
    ingredient: 'Ginger (Shunti/Ardraka)',
    foodIds: ['ginger'],
    category: 'spice_remedy',
    conditions: ['arthritis'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Apply warm ginger paste externally on painful joints to reduce Vata-type pain and swelling.',
    detail:
      'Ginger is Vedanasthapana (pain-relieving). Grate fresh ginger, warm it slightly, and apply as a poultice to affected joints for 20 minutes. Combine with internal ginger tea for synergistic benefit.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'spice_ginger_circulation',
    ingredient: 'Ginger (Shunti/Ardraka)',
    foodIds: ['ginger'],
    category: 'spice_remedy',
    conditions: ['hypertension'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Include fresh ginger in daily diet to improve peripheral circulation and reduce cold extremities.',
    detail:
      'Ginger promotes Rasa-Rakta circulation (plasma and blood tissue flow). Particularly beneficial for Vata types who tend toward poor circulation. Add 1-inch grated ginger to cooking or sip ginger tea twice daily.',
    source: 'Charaka Samhita',
  },

  // Cumin (4)
  {
    id: 'spice_cumin_digestion',
    ingredient: 'Cumin (Jeeraka)',
    foodIds: ['cumin'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Drink cumin water (Jeeraka Kashaya) daily to improve digestion and reduce gas.',
    detail:
      'Cumin is Tridoshahara—it balances all three doshas. Soak 1 tsp cumin seeds in a glass of water overnight, strain and drink in the morning. This simple remedy strengthens Agni without aggravating Pitta.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_cumin_bloating',
    ingredient: 'Cumin (Jeeraka)',
    foodIds: ['cumin'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Dry roast cumin seeds and chew ½ tsp after meals to relieve bloating and heaviness.',
    detail:
      'Roasting enhances the Deepana (appetite-kindling) quality of cumin while reducing its raw, slightly Kapha-aggravating nature. This is a simple Vayu-anulomana (carminative) practice.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'spice_cumin_iron',
    ingredient: 'Cumin (Jeeraka)',
    foodIds: ['cumin'],
    category: 'spice_remedy',
    conditions: ['anemia'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Add roasted cumin to meals regularly to boost iron absorption and combat anemia.',
    detail:
      'Cumin is naturally rich in iron (1 tsp provides ~1.4 mg iron). When combined with vitamin C-rich foods like amla or lemon, iron absorption increases significantly. Particularly useful for women and those with Rakta Kshaya (blood deficiency).',
    source: 'Dhanvantari Nighantu',
  },
  {
    id: 'spice_cumin_weight',
    ingredient: 'Cumin (Jeeraka)',
    foodIds: ['cumin'],
    category: 'spice_remedy',
    conditions: ['obesity'],
    doshaAffinity: ['kapha'],
    tip: 'Drink warm cumin-lemon water twice daily to support healthy weight management.',
    detail:
      'Cumin boosts metabolic rate and improves fat metabolism by enhancing the Medas-dhatu Agni (fat tissue metabolism). Boil 1 tsp cumin in water for 5 minutes, cool slightly, add lemon juice. Drink before breakfast and lunch.',
    source: 'Charaka Samhita',
  },

  // Black Pepper (3)
  {
    id: 'spice_black_pepper_bioavailability',
    ingredient: 'Black Pepper (Maricha)',
    foodIds: ['black_pepper'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Add a pinch of black pepper to turmeric preparations to enhance curcumin absorption by up to 2000%.',
    detail:
      'Piperine in black pepper inhibits hepatic and intestinal glucuronidation, dramatically increasing curcumin bioavailability. In Ayurvedic formulation science (Bhaishajya Kalpana), Maricha is classified as a Yogavahi—an agent that enhances the potency of other herbs.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_black_pepper_congestion',
    ingredient: 'Black Pepper (Maricha)',
    foodIds: ['black_pepper'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['kapha'],
    tip: 'Inhale steam infused with crushed black pepper to clear nasal and sinus congestion.',
    detail:
      'Black pepper is one of the strongest Kapha-reducing spices due to its Katu Rasa (pungent taste) and Ushna Virya (hot potency). Add 5–6 crushed peppercorns to a bowl of hot water and inhale the steam with a towel over your head.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'spice_black_pepper_metabolism',
    ingredient: 'Black Pepper (Maricha)',
    foodIds: ['black_pepper'],
    category: 'spice_remedy',
    conditions: ['obesity'],
    doshaAffinity: ['kapha'],
    tip: 'Include black pepper in daily cooking to boost metabolism and reduce Ama (metabolic toxins).',
    detail:
      'Maricha is part of Trikatu (three pungents: ginger, black pepper, long pepper), the premier Ayurvedic formula for boosting Agni and burning Ama. Use freshly ground pepper for maximum potency—pre-ground pepper loses piperine over time.',
    source: 'Charaka Samhita',
  },

  // Cinnamon (3)
  {
    id: 'spice_cinnamon_blood_sugar',
    ingredient: 'Cinnamon (Twak/Dalchini)',
    foodIds: ['cinnamon'],
    category: 'spice_remedy',
    conditions: ['diabetes'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Take ½ tsp cinnamon powder daily to help regulate blood sugar levels.',
    detail:
      'Cinnamon improves insulin sensitivity and reduces fasting blood glucose. In Ayurveda, Twak is Madhura-Tikta Rasa and helps manage Prameha (diabetes). Best taken with warm water or sprinkled on food. Use Ceylon cinnamon for long-term use.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_cinnamon_circulation',
    ingredient: 'Cinnamon (Twak/Dalchini)',
    foodIds: ['cinnamon'],
    category: 'spice_remedy',
    conditions: ['hypertension'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Add cinnamon to warm drinks to promote circulation and warm cold hands and feet.',
    detail:
      'Cinnamon is a powerful Ushna Virya herb that stimulates Rakta Vahini Srotas (circulatory channels). Particularly helpful for Vata-Kapha types with sluggish circulation during winter months.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'spice_cinnamon_cold',
    ingredient: 'Cinnamon (Twak/Dalchini)',
    foodIds: ['cinnamon'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Boil cinnamon sticks with ginger and honey for a potent cold and flu remedy.',
    detail:
      'This combination is Kapha-Vatahara (reduces both Kapha and Vata). Boil 1 cinnamon stick and 1-inch ginger in 2 cups water until reduced to 1 cup. Cool to lukewarm and add 1 tsp honey. Drink 2–3 times daily at onset of symptoms.',
    source: 'Ashtanga Hridaya',
  },

  // Cardamom (2)
  {
    id: 'spice_cardamom_breath',
    ingredient: 'Cardamom (Ela)',
    foodIds: ['cardamom'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Chew 1–2 cardamom pods after meals to freshen breath and support digestion.',
    detail:
      'Cardamom is Tridoshahara and uniquely aromatic. Its volatile oils (cineole, limonene) provide antimicrobial action in the oral cavity. It is also a mild digestive stimulant without the heat of other spices, making it safe even for Pitta types.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'spice_cardamom_detox',
    ingredient: 'Cardamom (Ela)',
    foodIds: ['cardamom'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Add crushed cardamom to tea or warm milk to aid gentle detoxification and reduce bloating.',
    detail:
      'Cardamom supports Mutrala (diuretic) function and helps eliminate excess fluid and toxins through the urinary tract. It is one of the few warming spices that does not aggravate Pitta, making it suitable for year-round use.',
    source: 'Dhanvantari Nighantu',
  },

  // Fennel (2)
  {
    id: 'spice_fennel_bloating',
    ingredient: 'Fennel (Shatapushpa)',
    foodIds: ['fennel'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Chew fennel seeds after meals to prevent gas, bloating, and acid reflux.',
    detail:
      'Fennel is Sheeta Virya (cooling potency) yet Deepana (digestive stimulant)—a rare combination that makes it ideal for Pitta types with weak digestion. Its volatile oil anethole relaxes smooth muscle in the GI tract, relieving spasms and gas.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_fennel_lactation',
    ingredient: 'Fennel (Shatapushpa)',
    foodIds: ['fennel'],
    category: 'spice_remedy',
    conditions: ['pcod_pcos'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Nursing mothers can drink fennel tea to naturally promote breast milk production.',
    detail:
      'Fennel is a galactagogue (Stanyajanana) recognized in Ayurveda. Steep 1 tsp fennel seeds in hot water for 10 minutes and drink 2–3 cups daily. It also helps reduce infant colic when compounds pass through breast milk.',
    source: 'Sushruta Samhita',
  },

  // Fenugreek (2)
  {
    id: 'spice_fenugreek_blood_sugar',
    ingredient: 'Fenugreek (Methi)',
    foodIds: ['fenugreek_seeds'],
    category: 'spice_remedy',
    conditions: ['diabetes'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Soak 1 tsp fenugreek seeds overnight and consume on an empty stomach to lower blood sugar.',
    detail:
      'Fenugreek seeds contain galactomannan fiber and 4-hydroxyisoleucine, which slow carbohydrate absorption and improve insulin function. In Ayurveda, Methi is Pramehaghna (anti-diabetic). Soaking reduces its bitter taste and improves digestibility.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_fenugreek_cholesterol',
    ingredient: 'Fenugreek (Methi)',
    foodIds: ['fenugreek_seeds'],
    category: 'spice_remedy',
    conditions: ['hypertension'],
    doshaAffinity: ['kapha'],
    tip: 'Consume sprouted fenugreek seeds regularly to help reduce cholesterol and triglycerides.',
    detail:
      'Fenugreek saponins bind bile acids in the gut, forcing the liver to use cholesterol to produce more bile. Sprouting increases saponin content and reduces the Tikta (bitter) taste. Eat 1–2 tbsp sprouted seeds with meals.',
    source: 'Bhavaprakasha',
  },

  // Clove (2)
  {
    id: 'spice_clove_dental',
    ingredient: 'Clove (Lavanga)',
    foodIds: ['clove'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Place a whole clove near a painful tooth for natural analgesic and antimicrobial relief.',
    detail:
      'Clove contains 70–90% eugenol, a powerful local anesthetic and antimicrobial. In Ayurveda, Lavanga is Dantya (beneficial for teeth). Bite down gently on a clove to release its oil, and hold near the affected area for 20–30 minutes.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'spice_clove_digestion',
    ingredient: 'Clove (Lavanga)',
    foodIds: ['clove'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Add 2–3 cloves to chai or warm water to stimulate digestion and eliminate intestinal parasites.',
    detail:
      'Clove is Krimighna (anti-parasitic) and Deepana-Pachana (appetizing and digestive). It reduces Vata and Kapha without significantly aggravating Pitta when used in small quantities. Avoid large doses in Pitta-dominant constitutions.',
    source: 'Ashtanga Hridaya',
  },

  // Ajwain (2)
  {
    id: 'spice_ajwain_gas',
    ingredient: 'Ajwain (Yavani)',
    foodIds: ['ajwain'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Chew ½ tsp ajwain seeds with warm water after meals to relieve gas and indigestion.',
    detail:
      'Ajwain contains thymol, which stimulates gastric acid secretion and promotes peristalsis. It is the most potent Vata-anulomana (carminative) spice in the Ayurvedic pharmacopoeia. Particularly effective for Vata-type gas with distension and cramping.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'spice_ajwain_cold',
    ingredient: 'Ajwain (Yavani)',
    foodIds: ['ajwain'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Inhale steam from ajwain-infused hot water to clear nasal congestion during colds.',
    detail:
      'Ajwain is Kaphaghna (Kapha-destroying) and acts on the Pranavaha Srotas (respiratory channels). Boil 1 tbsp ajwain in water and inhale steam for 10 minutes. Can also be tied in a cloth and sniffed periodically throughout the day.',
    source: 'Charaka Samhita',
  },

  // Asafoetida (2)
  {
    id: 'spice_asafoetida_flatulence',
    ingredient: 'Asafoetida (Hingu)',
    foodIds: ['asafoetida'],
    category: 'spice_remedy',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Add a pinch of asafoetida to lentil and bean dishes to prevent flatulence.',
    detail:
      'Hingu is the premier Vatanulomana (carminative) in Ayurveda. Its sulfur compounds reduce gas production and improve the digestibility of legumes. Always fry asafoetida briefly in ghee before adding to dishes to activate its compounds and reduce its raw pungency.',
    source: 'Charaka Samhita',
  },
  {
    id: 'spice_asafoetida_respiratory',
    ingredient: 'Asafoetida (Hingu)',
    foodIds: ['asafoetida'],
    category: 'spice_remedy',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Dissolve a pinch of asafoetida in warm water for relief from respiratory congestion and cough.',
    detail:
      'Asafoetida acts as a bronchodilator and expectorant (Kasahara). It liquefies thick Kapha in the respiratory tract, making it easier to expel. This remedy is especially useful for Vata-Kapha type dry coughs with difficult expectoration.',
    source: 'Ashtanga Hridaya',
  },

  // ============================================================
  // SUPPLEMENTS (20 tips)
  // ============================================================

  // Ashwagandha (5)
  {
    id: 'supp_ashwagandha_stress',
    ingredient: 'Ashwagandha (Withania somnifera)',
    category: 'supplement',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Take 300–600 mg Ashwagandha root extract daily to reduce cortisol and manage chronic stress.',
    detail:
      'Ashwagandha is the premier Medhya Rasayana (mind rejuvenator) and adaptogen in Ayurveda. It reduces cortisol by 28% on average. Take standardized extract (5% withanolides) with warm milk at night. Avoid in acute Pitta conditions.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_ashwagandha_strength',
    ingredient: 'Ashwagandha (Withania somnifera)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Use Ashwagandha regularly to improve muscle strength, stamina, and recovery from exercise.',
    detail:
      'The name means "smell of horse"—indicating it gives the vitality and strength of a horse. Ashwagandha increases muscle mass and strength through androgen-like action (Balya and Brimhana properties). Take 500 mg twice daily with meals.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_ashwagandha_sleep',
    ingredient: 'Ashwagandha (Withania somnifera)',
    category: 'supplement',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['vata'],
    tip: 'Take Ashwagandha with warm milk and a pinch of nutmeg before bed to promote deep, restful sleep.',
    detail:
      'Ashwagandha contains triethylene glycol, which promotes non-REM sleep. Combined with the Nidrajanana (sleep-promoting) property of warm milk and Jatiphala (nutmeg), this creates a potent Vata-pacifying sleep formula.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'supp_ashwagandha_immunity',
    ingredient: 'Ashwagandha (Withania somnifera)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Take Ashwagandha during seasonal changes to boost immunity and prevent infections.',
    detail:
      'Ashwagandha increases NK cell activity and immunoglobulin production. As a Rasayana, it builds Ojas (vital essence of immunity). Take 500 mg daily during Ritucharya (seasonal transitions) for best immunoprotective effect.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_ashwagandha_thyroid',
    ingredient: 'Ashwagandha (Withania somnifera)',
    category: 'supplement',
    conditions: ['thyroid_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Ashwagandha may help normalize thyroid function, particularly in subclinical hypothyroidism.',
    detail:
      'Ashwagandha stimulates T4 to T3 conversion and normalizes TSH levels. Take 600 mg daily for at least 8 weeks. Monitor thyroid levels regularly. This is supportive therapy—do not replace prescribed medication without medical guidance.',
    source: 'Sushruta Samhita',
  },

  // Triphala (4)
  {
    id: 'supp_triphala_digestion',
    ingredient: 'Triphala (Three Fruits)',
    foodIds: ['amla'],
    category: 'supplement',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Take 1 tsp Triphala churna with warm water before bed for gentle bowel regulation and detox.',
    detail:
      'Triphala (Amalaki, Bibhitaki, Haritaki) is Tridoshahara—the only Ayurvedic formula that balances all three doshas. It is a mild laxative (Mriduvirechana) that tones rather than irritates the bowel. For constipation, increase dose; for loose stools, decrease.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_triphala_detox',
    ingredient: 'Triphala (Three Fruits)',
    foodIds: ['amla'],
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Use Triphala as a periodic internal cleanse to remove accumulated Ama (metabolic waste).',
    detail:
      'Triphala acts on all 7 Dhatus (tissues) and clears Srotamsi (channels). For deep cleansing, take 1 tsp with warm water on an empty stomach for 2–4 weeks during seasonal transitions. It simultaneously nourishes while it cleanses—a unique dual action.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'supp_triphala_eye',
    ingredient: 'Triphala (Three Fruits)',
    foodIds: ['amla'],
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['pitta'],
    tip: 'Wash eyes with filtered Triphala decoction to relieve eye strain and improve vision.',
    detail:
      'Triphala is Chakshushya (beneficial for eyes) and particularly rich in vitamin C from Amalaki. Soak 1 tsp Triphala overnight in water, strain through fine cloth, and use as an eye wash. This practice is called Netra Prakshalana.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'supp_triphala_immunity',
    ingredient: 'Triphala (Three Fruits)',
    foodIds: ['amla'],
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Regular Triphala use builds long-term immunity by nourishing all seven tissue layers (Dhatus).',
    detail:
      'Triphala is rich in polyphenols and vitamin C, with Rasayana (rejuvenative) properties. Each fruit targets specific Dhatus: Haritaki nourishes Vata tissues, Bibhitaki nourishes Kapha tissues, and Amalaki nourishes Pitta tissues and Rasa Dhatu.',
    source: 'Charaka Samhita',
  },

  // Brahmi (3)
  {
    id: 'supp_brahmi_memory',
    ingredient: 'Brahmi (Bacopa monnieri)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Take Brahmi daily to enhance memory, learning, and cognitive function.',
    detail:
      'Brahmi is the foremost Medhya Rasayana (intellect rejuvenator). Its bacosides improve synaptic communication and memory consolidation. Take 300 mg standardized extract (50% bacosides) daily. Benefits are cumulative—expect results after 8–12 weeks.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_brahmi_anxiety',
    ingredient: 'Brahmi (Bacopa monnieri)',
    category: 'supplement',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Use Brahmi to calm an anxious, overactive mind and improve focus in ADHD-like symptoms.',
    detail:
      'Brahmi modulates serotonin and GABA pathways, producing anxiolytic effects without sedation. Unlike Ashwagandha (which is heating), Brahmi is Sheeta Virya (cooling), making it ideal for Pitta-type anxiety with irritability and burning sensations.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'supp_brahmi_hair',
    ingredient: 'Brahmi (Bacopa monnieri)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['pitta'],
    tip: 'Apply Brahmi oil to the scalp to promote hair growth and reduce premature graying.',
    detail:
      'Brahmi oil nourishes hair follicles and strengthens roots (Keshya property). Its cooling nature pacifies Pitta at the scalp, the primary cause of premature hair loss and graying. Massage into scalp 30 minutes before washing, 2–3 times per week.',
    source: 'Bhavaprakasha',
  },

  // Shatavari (2)
  {
    id: 'supp_shatavari_female',
    ingredient: 'Shatavari (Asparagus racemosus)',
    category: 'supplement',
    conditions: ['pcod_pcos'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Take Shatavari daily to support female reproductive health, hormonal balance, and fertility.',
    detail:
      'Shatavari means "she who possesses 100 husbands"—indicating its rejuvenative power for the female reproductive system. It nourishes Artava Dhatu (reproductive tissue), balances estrogen, and supports healthy menstrual cycles. Take 500 mg twice daily with warm milk.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_shatavari_digestion',
    ingredient: 'Shatavari (Asparagus racemosus)',
    category: 'supplement',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Use Shatavari to soothe gastritis, hyperacidity, and Pitta-aggravated digestive issues.',
    detail:
      'Shatavari is one of the best Pittashamaka (Pitta-pacifying) herbs for the GI tract. Its mucilaginous properties coat and protect the gastric lining. Take 500 mg with cool water or milk 30 minutes before meals for gastritis and acid reflux.',
    source: 'Ashtanga Hridaya',
  },

  // Guduchi/Giloy (2)
  {
    id: 'supp_guduchi_fever',
    ingredient: 'Guduchi/Giloy (Tinospora cordifolia)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Take Guduchi to manage chronic and recurrent fevers (Jvara) of unknown origin.',
    detail:
      'Guduchi is called Amrita (nectar) due to its Rasayana properties. It is Jvarahara (antipyretic) and works on all types of fevers—Vata (irregular), Pitta (high, burning), and Kapha (low-grade, lingering). Take 500 mg twice daily or drink fresh stem juice.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_guduchi_liver',
    ingredient: 'Guduchi/Giloy (Tinospora cordifolia)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['pitta'],
    tip: 'Use Guduchi regularly to protect and regenerate liver cells (Yakrit Rakshaka).',
    detail:
      'Guduchi is hepatoprotective—it protects against drug-induced and toxin-induced liver damage. Its Tikta Rasa (bitter taste) directly nourishes and purifies Rakta Dhatu (blood tissue) and liver. Take 500 mg daily or use Guduchi Satva (aqueous extract).',
    source: 'Bhavaprakasha',
  },

  // Tulsi (2)
  {
    id: 'supp_tulsi_respiratory',
    ingredient: 'Tulsi (Ocimum sanctum)',
    foodIds: ['tulsi_tea'],
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Drink 2–3 cups of Tulsi tea daily to support respiratory health and prevent infections.',
    detail:
      'Tulsi is Shwasahara (anti-asthmatic) and Kasahara (anti-tussive). Its eugenol, camphene, and cineole provide bronchodilatory and expectorant action. Steep 5–7 fresh leaves in hot water for 5 minutes. Best taken during Kapha time (morning).',
    source: 'Bhavaprakasha',
  },
  {
    id: 'supp_tulsi_stress',
    ingredient: 'Tulsi (Ocimum sanctum)',
    foodIds: ['tulsi_tea'],
    category: 'supplement',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Use Tulsi as a daily adaptogen to reduce stress, lower cortisol, and improve resilience.',
    detail:
      'Tulsi is classified as a Rasayana and adaptogen that normalizes the HPA axis. Regular consumption reduces cortisol, improves stamina, and enhances mental clarity. Take as tea (3 cups daily) or as extract (300–600 mg daily).',
    source: 'Charaka Samhita',
  },

  // Amalaki/Amla (2)
  {
    id: 'supp_amla_vitamin_c',
    ingredient: 'Amalaki/Amla (Emblica officinalis)',
    foodIds: ['amla'],
    category: 'supplement',
    conditions: ['anemia'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Consume 1 fresh amla daily or 1 tsp amla powder for the richest natural source of stable vitamin C.',
    detail:
      'Amla contains 600–900 mg vitamin C per fruit, and unlike synthetic ascorbic acid, the tannins in amla protect the vitamin C from heat degradation. It is the primary ingredient in Chyawanprash and Triphala. Amla is Tridoshahara—it balances all three doshas.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_amla_hair_skin',
    ingredient: 'Amalaki/Amla (Emblica officinalis)',
    foodIds: ['amla'],
    category: 'supplement',
    conditions: ['skin_disorders'],
    doshaAffinity: ['pitta'],
    tip: 'Use amla internally and externally for lustrous hair, clear skin, and prevention of premature aging.',
    detail:
      'Amla is Vayasthapana (anti-aging) and Keshya (hair-nourishing). Internal use nourishes Rasa and Rakta Dhatus, which directly feed skin and hair. Apply amla oil to hair, and eat amla murabba or take amla powder daily for best results.',
    source: 'Sushruta Samhita',
  },

  // Mulethi/Licorice (2)
  {
    id: 'supp_mulethi_throat',
    ingredient: 'Mulethi/Yashtimadhu (Glycyrrhiza glabra)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Suck on a small piece of mulethi root to soothe sore throat and hoarseness.',
    detail:
      'Yashtimadhu means "sweet stick" and is Kanthya (throat-beneficial). Its glycyrrhizin coats and soothes inflamed mucous membranes. Also effective as a gargle: boil mulethi in water, cool, and gargle 3–4 times daily. Avoid in hypertension.',
    source: 'Charaka Samhita',
  },
  {
    id: 'supp_mulethi_gastritis',
    ingredient: 'Mulethi/Yashtimadhu (Glycyrrhiza glabra)',
    category: 'supplement',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Take mulethi powder with honey to heal gastritis and protect the stomach lining.',
    detail:
      'Yashtimadhu is Shothahara (anti-inflammatory) for the GI tract. It stimulates mucin secretion, protecting the gastric lining from acid damage. Take ½ tsp powder with 1 tsp honey twice daily, 30 minutes before meals. Deglycyrrhizinated licorice (DGL) is safer for long-term use.',
    source: 'Ashtanga Hridaya',
  },

  // Neem (2)
  {
    id: 'supp_neem_skin',
    ingredient: 'Neem (Nimba)',
    category: 'supplement',
    conditions: ['skin_disorders'],
    doshaAffinity: ['pitta', 'kapha'],
    tip: 'Take neem leaf extract or apply neem paste to treat acne, eczema, and fungal skin infections.',
    detail:
      'Neem is Kushtaghna (anti-dermatosis)—one of the most powerful skin herbs in Ayurveda. Its Tikta Rasa (bitter taste) purifies Rakta Dhatu (blood tissue), the root of most skin conditions. Take 500 mg neem extract daily or apply neem paste topically.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'supp_neem_dental',
    ingredient: 'Neem (Nimba)',
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['pitta', 'kapha'],
    tip: 'Use neem twigs as a natural toothbrush (Datun) or neem mouthwash for gum health.',
    detail:
      'Neem is Dantya (dental tonic) and has been used as a natural toothbrush in India for millennia. Its antimicrobial properties prevent gingivitis and cavities. If twigs are unavailable, use neem-based toothpaste or rinse with neem water.',
    source: 'Charaka Samhita',
  },

  // Chyawanprash (1)
  {
    id: 'supp_chyawanprash_tonic',
    ingredient: 'Chyawanprash',
    foodIds: ['amla', 'ghee', 'honey'],
    category: 'supplement',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Take 1–2 tsp Chyawanprash daily as a general health tonic for immunity, energy, and longevity.',
    detail:
      'Chyawanprash is the oldest Ayurvedic Rasayana formulation, containing 40+ herbs with Amla as the base. It was originally formulated for the sage Chyawan to restore his youth. Take with warm milk in the morning. Safe for all ages and all Prakruti types.',
    source: 'Charaka Samhita',
  },

  // ============================================================
  // FOOD AS MEDICINE (20 tips)
  // ============================================================

  // Honey (4)
  {
    id: 'food_honey_cough',
    ingredient: 'Honey (Madhu)',
    foodIds: ['honey'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Take 1 tsp raw honey with a pinch of black pepper to relieve cough and sore throat.',
    detail:
      'Honey is Kanthya (throat-soothing) and Kasahara (anti-tussive). Its viscosity coats the throat while its antimicrobial properties fight infection. NEVER heat honey above 40°C—Ayurveda considers heated honey (Ama Visha) toxic as it produces hydroxymethylfurfural.',
    source: 'Charaka Samhita',
  },
  {
    id: 'food_honey_wounds',
    ingredient: 'Honey (Madhu)',
    foodIds: ['honey'],
    category: 'food_as_medicine',
    conditions: ['skin_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Apply raw honey topically on minor burns and wounds for antimicrobial healing.',
    detail:
      'Honey creates a moist, low-pH environment inhospitable to bacteria. Its hydrogen peroxide content provides gentle antiseptic action. Manuka honey is particularly effective but any raw, unprocessed honey works. Apply a thin layer and cover with a bandage.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'food_honey_weight',
    ingredient: 'Honey (Madhu)',
    foodIds: ['honey'],
    category: 'food_as_medicine',
    conditions: ['obesity'],
    doshaAffinity: ['kapha'],
    tip: 'Take honey with warm water in the morning to support Kapha-type weight management.',
    detail:
      'In Ayurveda, honey is Lekhana (scraping)—it helps reduce excess Kapha and Medas (fat tissue). Mix 1 tsp honey in a glass of warm (not hot) water and drink on an empty stomach. Its Ruksha (dry) and Sukshma (subtle) Gunas counteract Kapha heaviness.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'food_honey_energy',
    ingredient: 'Honey (Madhu)',
    foodIds: ['honey'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Use raw honey as a natural pre-workout energy source—it provides quickly available glucose and fructose.',
    detail:
      'Honey is Balya (strength-giving) and its simple sugars are rapidly absorbed without requiring significant digestion. Take 1 tbsp 30 minutes before exercise. Combine with warm water for faster absorption. Avoid for Pitta-dominant individuals during summer.',
    source: 'Charaka Samhita',
  },

  // Ghee (4)
  {
    id: 'food_ghee_joints',
    ingredient: 'Ghee (Ghrita)',
    foodIds: ['ghee'],
    category: 'food_as_medicine',
    conditions: ['arthritis'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Take 1 tsp warm ghee daily to lubricate joints and reduce Vata-type joint pain and cracking.',
    detail:
      'Ghee is Snigdha (unctuous) and Snehana (oleating)—the direct antidote to Vata dryness that causes joint degeneration. It nourishes Asthi Dhatu (bone tissue) and Majja Dhatu (marrow). Take on an empty stomach with warm water, or cook with ghee daily.',
    source: 'Charaka Samhita',
  },
  {
    id: 'food_ghee_brain',
    ingredient: 'Ghee (Ghrita)',
    foodIds: ['ghee'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Consume ghee daily to nourish brain tissue and enhance cognitive function.',
    detail:
      'Ghee is Medhya (intellect-promoting) and is the primary vehicle for brain-nourishing herbs in Ayurveda. Its butyric acid and fat-soluble vitamins cross the blood-brain barrier. Brahmi Ghrita (Brahmi-infused ghee) is a classical Medhya Rasayana formulation.',
    source: 'Charaka Samhita',
  },
  {
    id: 'food_ghee_digestion',
    ingredient: 'Ghee (Ghrita)',
    foodIds: ['ghee'],
    category: 'food_as_medicine',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Cook with ghee to enhance the digestibility and nutritional absorption of foods.',
    detail:
      'Ghee is Agni Deepana (kindles digestive fire) without aggravating Pitta—a unique property among fats. It enhances the bioavailability of fat-soluble nutrients (A, D, E, K) in vegetables. Use 1–2 tsp per meal. Old ghee (Purana Ghrita, aged 1+ years) is even more medicinal.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'food_ghee_skin',
    ingredient: 'Ghee (Ghrita)',
    foodIds: ['ghee'],
    category: 'food_as_medicine',
    conditions: ['skin_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Apply ghee topically to dry skin, cracked lips, and minor burns for deep moisturizing and healing.',
    detail:
      'Ghee is Varnya (complexion-enhancing) and Vrana Ropana (wound-healing). It penetrates all 7 layers of skin (Twacha). For internal skin nourishment, take 1 tsp ghee with warm milk at bedtime. For external use, apply a thin layer of pure ghee to affected areas.',
    source: 'Sushruta Samhita',
  },

  // Buttermilk (3)
  {
    id: 'food_buttermilk_digestion',
    ingredient: 'Buttermilk (Takra)',
    foodIds: ['buttermilk'],
    category: 'food_as_medicine',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Drink a glass of spiced buttermilk (Takra) with lunch to improve digestion and nutrient absorption.',
    detail:
      'Charaka states: "As Amrita (nectar) is for the gods, Takra is for humans." Buttermilk is Grahi (absorbent) and Deepana (appetizing). Add roasted cumin, rock salt, and a pinch of asafoetida for maximum digestive benefit. Avoid in Kapha-excess conditions.',
    source: 'Charaka Samhita',
  },
  {
    id: 'food_buttermilk_hydration',
    ingredient: 'Buttermilk (Takra)',
    foodIds: ['buttermilk'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Use diluted buttermilk as a natural rehydration drink during summer heat and after exercise.',
    detail:
      'Buttermilk is Sheeta Virya (cooling) in its diluted form and replenishes electrolytes naturally. Mix 1 part yogurt with 4 parts water, churn well, and add rock salt and cumin. This traditional recipe is superior to commercial sports drinks for natural hydration.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'food_buttermilk_probiotic',
    ingredient: 'Buttermilk (Takra)',
    foodIds: ['buttermilk'],
    category: 'food_as_medicine',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Consume fresh buttermilk daily as a natural probiotic to maintain healthy gut flora.',
    detail:
      'Fresh buttermilk contains Lactobacillus and other beneficial bacteria that support the microbiome. Unlike curd (which is Abhishyandi/channel-blocking), buttermilk is Srotoshodhaka (channel-clearing) due to its churning and dilution.',
    source: 'Ashtanga Hridaya',
  },

  // Jaggery (3)
  {
    id: 'food_jaggery_iron',
    ingredient: 'Jaggery (Guda)',
    foodIds: ['jaggery'],
    category: 'food_as_medicine',
    conditions: ['anemia'],
    doshaAffinity: ['vata'],
    tip: 'Replace refined sugar with jaggery as a natural iron source to help prevent anemia.',
    detail:
      'Jaggery retains the iron from sugarcane (up to 11 mg per 100g) unlike refined sugar. It is Raktavardhaka (blood-building) and particularly beneficial for menstruating women and children. Combine with vitamin C-rich foods like amla for enhanced iron absorption.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'food_jaggery_cough',
    ingredient: 'Jaggery (Guda)',
    foodIds: ['jaggery'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata'],
    tip: 'Dissolve a small piece of old jaggery in warm water with ginger to relieve dry cough.',
    detail:
      'Old jaggery (Purana Guda) is more medicinal than fresh—it becomes less Kapha-aggravating with age. It soothes the throat and acts as a demulcent for dry, irritating coughs. Combine with dry ginger powder for a synergistic expectorant effect.',
    source: 'Charaka Samhita',
  },
  {
    id: 'food_jaggery_digestion',
    ingredient: 'Jaggery (Guda)',
    foodIds: ['jaggery'],
    category: 'food_as_medicine',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata'],
    tip: 'Eat a small piece of jaggery after meals to stimulate digestive enzyme secretion.',
    detail:
      'Jaggery activates digestive enzymes and aids in Anulomana (downward movement of Vata), preventing post-meal heaviness. Take a marble-sized piece after lunch. However, avoid in diabetes and Kapha-excess conditions as jaggery is Guru (heavy) and Madhura (sweet).',
    source: 'Dhanvantari Nighantu',
  },

  // Coconut Oil (2)
  {
    id: 'food_coconut_oil_skin',
    ingredient: 'Coconut Oil (Narikela Taila)',
    foodIds: ['coconut_oil'],
    category: 'food_as_medicine',
    conditions: ['skin_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Apply virgin coconut oil daily for natural skin moisturizing, especially for Pitta-type dry or inflamed skin.',
    detail:
      'Coconut oil is Sheeta Virya (cooling) and Twachya (skin-nourishing). Its lauric acid provides antimicrobial protection. It is the preferred Abhyanga (self-massage) oil for Pitta-dominant individuals and during summer months.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'food_coconut_oil_pulling',
    ingredient: 'Coconut Oil (Narikela Taila)',
    foodIds: ['coconut_oil'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Practice oil pulling (Gandusha) with coconut oil for 10–15 minutes daily for oral health.',
    detail:
      'Gandusha (oil pulling) is described in classical Ayurvedic texts as a daily practice (Dinacharya). Swish 1 tbsp coconut oil in the mouth, pulling through teeth, for 10–15 minutes then spit out. It strengthens gums, whitens teeth, and reduces harmful oral bacteria.',
    source: 'Charaka Samhita',
  },

  // Sesame Oil (2)
  {
    id: 'food_sesame_oil_massage',
    ingredient: 'Sesame Oil (Tila Taila)',
    foodIds: ['sesame_oil'],
    category: 'food_as_medicine',
    conditions: ['arthritis', 'anxiety_insomnia'],
    doshaAffinity: ['vata'],
    tip: 'Perform daily warm sesame oil self-massage (Abhyanga) to calm Vata, nourish skin, and improve sleep.',
    detail:
      'Tila Taila is the king of oils in Ayurveda and the default Abhyanga oil for Vata types. Warm the oil slightly, apply head to toe in long strokes on limbs and circular motions on joints. Wait 15–20 minutes, then bathe. This is the single most effective Vata-pacifying practice.',
    source: 'Charaka Samhita',
  },
  {
    id: 'food_sesame_oil_dental',
    ingredient: 'Sesame Oil (Tila Taila)',
    foodIds: ['sesame_oil'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata'],
    tip: 'Use warm sesame oil for oil pulling (Kavala Graha) to strengthen teeth and prevent gum recession.',
    detail:
      'Sesame oil is traditionally preferred for Kavala Graha (gargling/oil pulling) due to its Ushna Virya (warming) and deep-penetrating properties. It strengthens tooth enamel and prevents Vata-type dental issues like receding gums and sensitivity.',
    source: 'Sushruta Samhita',
  },

  // Amla as food (1)
  {
    id: 'food_amla_immunity',
    ingredient: 'Amla (Amalaki)',
    foodIds: ['amla'],
    category: 'food_as_medicine',
    conditions: [],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Eat fresh amla or drink amla juice daily during seasonal changes to boost natural immunity.',
    detail:
      'Amla is the best single-herb Rasayana in Ayurveda. One fresh amla fruit provides 600–900 mg vitamin C in a heat-stable, biologically available form. Eat raw, make murabba (preserve), or blend into juice with ginger and honey. It balances all three doshas.',
    source: 'Charaka Samhita',
  },

  // Pomegranate (1)
  {
    id: 'food_pomegranate_anemia',
    ingredient: 'Pomegranate (Dadima)',
    category: 'food_as_medicine',
    conditions: ['anemia'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Drink fresh pomegranate juice regularly to build blood and combat iron-deficiency anemia.',
    detail:
      'Pomegranate is Raktavardhaka (blood-building) and Hridya (cardiotonic). Its unique combination of iron, vitamin C, and folic acid makes it ideal for anemia. Charaka considers sweet pomegranate (Madhura Dadima) as Tridoshahara and one of the best fruits for daily consumption.',
    source: 'Charaka Samhita',
  },

  // ============================================================
  // COMBINATION TIPS (15 tips)
  // ============================================================
  {
    id: 'combo_turmeric_pepper',
    ingredient: 'Turmeric + Black Pepper',
    foodIds: ['turmeric', 'black_pepper'],
    category: 'combination_tip',
    conditions: ['arthritis'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Always combine turmeric with a pinch of black pepper—piperine increases curcumin absorption by 2000%.',
    detail:
      'This is the classic Yogavahi principle in Ayurveda: certain substances (Anupana) dramatically enhance the bioavailability of others. Add black pepper whenever using turmeric internally—in golden milk, curries, or as a supplement. A small pinch is sufficient.',
    source: 'Charaka Samhita',
  },
  {
    id: 'combo_golden_milk',
    ingredient: 'Turmeric + Milk (Golden Milk)',
    foodIds: ['turmeric', 'milk_cow', 'black_pepper'],
    category: 'combination_tip',
    conditions: ['arthritis'],
    doshaAffinity: ['vata'],
    tip: 'Drink Haldi Doodh (golden milk) nightly—warm milk with turmeric, pepper, and ghee for deep immunity.',
    detail:
      'Golden milk (Haldi Doodh) is a traditional Rasayana drink. Boil 1 cup milk with ½ tsp turmeric, a pinch of black pepper, and ½ tsp ghee. The fat in milk and ghee enhances curcumin absorption. Best taken 30 minutes before sleep for overnight healing.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'combo_honey_ginger',
    ingredient: 'Honey + Ginger',
    foodIds: ['honey', 'ginger'],
    category: 'combination_tip',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Mix ½ tsp fresh ginger juice with 1 tsp honey for an effective cough and cold remedy.',
    detail:
      'This combination is called Ardraka Kshaudra Yoga. Ginger provides the heating, expectorant action while honey soothes the throat and acts as a Yogavahi (carrier). Take every 3–4 hours during acute cold. Remember: honey should not be heated.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'combo_ghee_milk_sleep',
    ingredient: 'Ghee + Warm Milk',
    foodIds: ['ghee', 'milk_cow'],
    category: 'combination_tip',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Take 1 tsp ghee in a cup of warm milk before bed as a natural sleep aid and Vata-pacifier.',
    detail:
      'This is the simplest and most effective Nidrajanana (sleep-inducing) remedy in Ayurveda. Warm milk is Nidrakara and ghee is Snigdha—together they deeply calm Vata. Add a pinch of nutmeg for enhanced effect. Avoid if there is Kapha-type congestion or heaviness.',
    source: 'Charaka Samhita',
  },
  {
    id: 'combo_ccf_tea',
    ingredient: 'Cumin + Coriander + Fennel (CCF Tea)',
    foodIds: ['cumin', 'coriander', 'fennel'],
    category: 'combination_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Brew CCF tea (equal parts cumin, coriander, fennel) as a gentle Tridoshic digestive tea.',
    detail:
      'CCF tea is the most universally recommended Ayurvedic herbal tea because it balances all three doshas. Steep ½ tsp each of cumin, coriander, and fennel seeds in 2 cups hot water for 10 minutes. Drink throughout the day, especially between meals. Safe during pregnancy.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'combo_triphala_night',
    ingredient: 'Triphala + Warm Water',
    foodIds: ['amla'],
    category: 'combination_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Take 1 tsp Triphala in warm water before bed for gentle overnight detoxification and bowel cleansing.',
    detail:
      "The warm water acts as Anupana (vehicle) and enhances Triphala's cleansing action. For Vata: take with ghee. For Pitta: take with milk. For Kapha: take with honey. This nightly routine is the cornerstone of Ayurvedic digestive health maintenance.",
    source: 'Charaka Samhita',
  },
  {
    id: 'combo_honey_lemon_water',
    ingredient: 'Honey + Lemon + Warm Water',
    foodIds: ['honey'],
    category: 'combination_tip',
    conditions: ['obesity'],
    doshaAffinity: ['kapha'],
    tip: 'Start the day with warm water, lemon juice, and honey for Kapha-clearing morning detox.',
    detail:
      "This morning ritual is Ama Pachana (toxin-digesting). Warm water opens Srotas (channels), lemon's sour taste stimulates liver and bile, and honey scrapes Kapha. Use warm (not hot) water to preserve honey's properties. Drink 30 minutes before breakfast.",
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'combo_ajwain_salt',
    ingredient: 'Ajwain + Rock Salt',
    foodIds: ['ajwain'],
    category: 'combination_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Chew ½ tsp ajwain with a pinch of rock salt and warm water for immediate stomach ache relief.',
    detail:
      "This is a classic Shula Prashamana (pain-relieving) combination for Vata-type abdominal pain. Ajwain's thymol provides antispasmodic action while rock salt (Saindhava Lavana) is Deepana and Tridoshahara. Works within 15-20 minutes for gas-related pain.",
    source: 'Bhavaprakasha',
  },
  {
    id: 'combo_iron_vitamin_c',
    ingredient: 'Iron-rich Foods + Vitamin C (Amla)',
    foodIds: ['amla', 'jaggery'],
    category: 'combination_tip',
    conditions: ['anemia'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Pair iron-rich foods like jaggery and leafy greens with amla or lemon for enhanced iron absorption.',
    detail:
      'Vitamin C converts ferric iron (Fe3+) to the more absorbable ferrous form (Fe2+), increasing absorption by 3–6x. Ayurveda achieves this naturally: Chyawanprash combines iron-rich herbs with Amla. Eat amla murabba with meals or squeeze lemon over iron-rich dishes.',
    source: 'Charaka Samhita',
  },
  {
    id: 'combo_ashwagandha_milk',
    ingredient: 'Ashwagandha + Warm Milk',
    foodIds: ['milk_cow'],
    category: 'combination_tip',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['vata'],
    tip: 'Take Ashwagandha churna in warm milk before bed for deep stress relief and restorative sleep.',
    detail:
      'Milk is the traditional Anupana (vehicle) for Ashwagandha, enhancing its Rasayana (rejuvenative) and Nidrajanana (sleep-promoting) properties. Mix 1 tsp Ashwagandha powder in warm milk with a pinch of cardamom. This is called Ashwagandha Ksheerapaka.',
    source: 'Charaka Samhita',
  },
  {
    id: 'combo_tulsi_ginger_honey',
    ingredient: 'Tulsi + Ginger + Honey',
    foodIds: ['tulsi_tea', 'ginger', 'honey'],
    category: 'combination_tip',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Brew tulsi-ginger tea with honey as a powerful Kapha-clearing remedy during cold and flu season.',
    detail:
      'This trio covers all aspects of upper respiratory illness: Tulsi is antiviral and bronchodilatory, ginger is expectorant and circulatory stimulant, and honey is demulcent and antimicrobial. Boil tulsi and ginger, cool slightly, then add honey.',
    source: 'Bhavaprakasha',
  },
  {
    id: 'combo_ghee_turmeric_wound',
    ingredient: 'Ghee + Turmeric (Wound Paste)',
    foodIds: ['ghee', 'turmeric'],
    category: 'combination_tip',
    conditions: ['skin_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Mix turmeric with ghee for a healing paste for minor cuts, burns, and skin irritations.',
    detail:
      'This is a classical Vrana Ropana (wound-healing) combination. Turmeric provides antimicrobial and anti-inflammatory action while ghee provides moisture and deep tissue penetration. This paste is also used in Panchakarma for post-procedure skin care.',
    source: 'Sushruta Samhita',
  },
  {
    id: 'combo_cumin_buttermilk',
    ingredient: 'Cumin + Buttermilk',
    foodIds: ['cumin', 'buttermilk'],
    category: 'combination_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Add roasted cumin and rock salt to buttermilk for the ultimate Ayurvedic digestive drink.',
    detail:
      'This combination is called Takra Jeeraka and is one of the most frequently prescribed dietary remedies in Ayurveda. Buttermilk provides probiotics and Grahi (absorbent) properties while cumin adds Deepana (digestive fire-kindling) action. Drink with lunch daily.',
    source: 'Charaka Samhita',
  },
  {
    id: 'combo_cinnamon_honey_cold',
    ingredient: 'Cinnamon + Honey',
    foodIds: ['cinnamon', 'honey'],
    category: 'combination_tip',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Mix ½ tsp cinnamon powder with 1 tsp honey and take thrice daily at the first sign of a cold.',
    detail:
      'Cinnamon is Kaphahara (Kapha-reducing) with strong antimicrobial properties, while honey is Yogavahi (potency-enhancing carrier). Together they form a powerful Pratimarsha (preventive dose) against upper respiratory infections. Continue for 3 days after symptoms resolve.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'combo_ghee_almond_brain',
    ingredient: 'Ghee + Almonds',
    foodIds: ['ghee', 'almond'],
    category: 'combination_tip',
    conditions: [],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Eat soaked almonds sautéed in ghee daily to nourish brain, improve memory, and strengthen Ojas.',
    detail:
      'Almonds are Medhya (intellect-promoting) and Balya (strength-giving). Soaking overnight removes tannins and makes them Laghu (lighter to digest). Sautéing in ghee enhances absorption of fat-soluble nutrients. Peel after soaking and eat 5–7 almonds each morning.',
    source: 'Charaka Samhita',
  },

  // ============================================================
  // TIMING TIPS (10 tips)
  // ============================================================
  {
    id: 'timing_warm_water_morning',
    ingredient: 'Warm Water',
    category: 'timing_tip',
    conditions: ['digestive_disorders', 'obesity'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Drink a glass of warm water first thing in the morning to flush toxins and stimulate peristalsis.',
    detail:
      'This practice is called Ushapana and is the very first step of Dinacharya (daily routine). Warm water activates Agni, clears Ama from the GI tract, and stimulates bowel movement. Use copper-vessel water for additional antimicrobial benefit. Avoid cold water.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'timing_no_cold_water',
    ingredient: 'Water Temperature',
    category: 'timing_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'Avoid drinking cold or iced water with meals—it extinguishes Agni (digestive fire) and impairs digestion.',
    detail:
      'Cold water solidifies fats in food, making them harder to digest, and constricts blood vessels in the stomach, reducing enzyme secretion. Sip small amounts of warm or room-temperature water during meals. Drink larger quantities between meals, not during.',
    source: 'Charaka Samhita',
  },
  {
    id: 'timing_lunch_heaviest',
    ingredient: 'Meal Timing',
    category: 'timing_tip',
    conditions: ['digestive_disorders', 'obesity'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Eat your heaviest meal at lunch (12–1 PM) when digestive Agni is at its peak, aligned with the sun.',
    detail:
      'Ayurveda teaches that Jatharagni (digestive fire) mirrors the sun—strongest at midday. This is Pitta time (10 AM–2 PM) when digestive capacity is maximum. Eating heavy food at dinner when Agni is low creates Ama (toxins). Make lunch your main meal and dinner light.',
    source: 'Charaka Samhita',
  },
  {
    id: 'timing_light_dinner',
    ingredient: 'Dinner Timing',
    category: 'timing_tip',
    conditions: ['digestive_disorders', 'obesity'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Eat a light dinner at least 2–3 hours before bed, ideally before sunset or by 7 PM.',
    detail:
      'Late, heavy dinners create Ama (undigested metabolic waste) because Agni weakens after sunset. Ideal dinner options: kitchari, soup, or steamed vegetables. If eating late is unavoidable, take a short walk (Shatapavali—100 steps) after dinner to aid digestion.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'timing_fruit_alone',
    ingredient: 'Fruit Timing',
    category: 'timing_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Eat fruits alone, not with meals—combining fruits with other foods causes fermentation and gas.',
    detail:
      'Fruits are Sheegra Paki (quickly digested) and when combined with slow-digesting grains or proteins, they ferment in the stomach, producing Ama and gas. Eat fruits 30 minutes before meals or 2 hours after. This is a key Viruddha Ahara (food incompatibility) principle.',
    source: 'Charaka Samhita',
  },
  {
    id: 'timing_water_after_meals',
    ingredient: 'Post-Meal Water',
    category: 'timing_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'Wait 30 minutes after meals before drinking a full glass of water to avoid diluting digestive enzymes.',
    detail:
      'Drinking large amounts of water immediately after meals dilutes Jatharagni (digestive fire) and gastric juices. Small sips during meals are fine. A full glass of water 30–45 minutes after meals actually aids digestion. Drinking before meals reduces appetite (useful for weight loss).',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'timing_sleep_pitta',
    ingredient: 'Sleep Timing',
    category: 'timing_tip',
    conditions: ['anxiety_insomnia'],
    doshaAffinity: ['pitta'],
    tip: 'Sleep before 10 PM to avoid entering Pitta time (10 PM–2 AM) when the mind becomes active again.',
    detail:
      'Between 10 PM and 2 AM, Pitta becomes dominant, stimulating metabolism and mental activity. Sleeping through this period allows Pitta to perform Rasa-Rakta Shodhana (tissue cleansing). Staying awake during this window leads to "second wind" energy, late-night eating, and Pitta aggravation.',
    source: 'Charaka Samhita',
  },
  {
    id: 'timing_exercise_kapha',
    ingredient: 'Exercise Timing',
    category: 'timing_tip',
    conditions: ['obesity'],
    doshaAffinity: ['kapha'],
    tip: 'Exercise during Kapha time (6–10 AM) for maximum benefit—it counters morning heaviness and sluggishness.',
    detail:
      'Morning Kapha time naturally brings heaviness and stability. Vigorous exercise during this window directly counteracts Kapha accumulation, boosting metabolism for the rest of the day. Exercise to half capacity (Ardha Shakti)—until sweat appears on the forehead and under the arms.',
    source: 'Ashtanga Hridaya',
  },
  {
    id: 'timing_ghee_empty_stomach',
    ingredient: 'Ghee Timing',
    foodIds: ['ghee'],
    category: 'timing_tip',
    conditions: ['arthritis', 'digestive_disorders'],
    doshaAffinity: ['vata', 'pitta'],
    tip: 'Take 1 tsp ghee on an empty stomach in the morning for maximum joint lubrication and Vata pacification.',
    detail:
      'Ghee taken on an empty stomach (Apana Kala) is absorbed more completely and reaches deeper tissues (Dhatus). It acts as an internal oleation (Snehana) that lubricates joints, nourishes Majja Dhatu (nerve tissue), and improves bowel movement. Wait 30 minutes before eating.',
    source: 'Charaka Samhita',
  },
  {
    id: 'timing_no_curd_night',
    ingredient: 'Curd/Yogurt Timing',
    foodIds: ['curd_yogurt'],
    category: 'timing_tip',
    conditions: ['skin_disorders', 'digestive_disorders'],
    doshaAffinity: ['pitta', 'kapha'],
    tip: 'Avoid eating curd (yogurt) at night—it increases Kapha and blocks Srotas (body channels).',
    detail:
      'Curd is Abhishyandi (channel-blocking) and its Guru (heavy), Snigdha (unctuous) qualities aggravate Kapha when eaten at night. Night is Kapha time, and combining two Kapha-increasing factors leads to congestion, mucus, and weight gain. Use buttermilk instead, or consume curd only at lunch.',
    source: 'Charaka Samhita',
  },

  // ============================================================
  // SEASONAL TIPS (10 tips)
  // ============================================================

  // Summer / Grishma (2)
  {
    id: 'season_summer_cooling',
    ingredient: 'Cooling Foods',
    foodIds: ['coconut_oil', 'ghee', 'buttermilk'],
    category: 'seasonal_tip',
    conditions: [],
    doshaAffinity: ['pitta'],
    tip: 'During summer (Grishma Ritu), favor sweet, cooling foods and drinks to pacify aggravated Pitta.',
    detail:
      'Summer aggravates Pitta dosha. Favor Madhura (sweet), Sheeta (cooling) foods: coconut water, watermelon, cucumber, mint, fennel water, and milk. Reduce Katu (pungent), Amla (sour), and Lavana (salty) tastes. Apply sandalwood or coconut oil to the body.',
    source: 'Charaka Samhita',
  },
  {
    id: 'season_summer_avoid_spicy',
    ingredient: 'Summer Dietary Adjustments',
    category: 'seasonal_tip',
    conditions: [],
    doshaAffinity: ['pitta'],
    tip: 'Reduce hot spices, fermented foods, and alcohol during summer to prevent Pitta-related disorders.',
    detail:
      'Summer Pitta aggravation manifests as acidity, skin rashes, sunburn, irritability, and loose stools. Avoid chili, garlic, excessive salt, vinegar, and fermented foods. Increase intake of Gulkand (rose petal preserve), coriander water, and Sattu (roasted gram flour drink).',
    source: 'Ashtanga Hridaya',
  },

  // Winter / Hemanta (2)
  {
    id: 'season_winter_warming',
    ingredient: 'Warming Foods',
    foodIds: ['ghee', 'ginger', 'cinnamon'],
    category: 'seasonal_tip',
    conditions: [],
    doshaAffinity: ['vata', 'kapha'],
    tip: 'During winter (Hemanta Ritu), eat warming, nourishing foods with ghee to build strength and immunity.',
    detail:
      'Winter naturally increases Agni (digestive fire) due to the body conserving heat. This is the best season to eat heavy, nutritious foods: ghee, sesame, warm soups, root vegetables, and whole grains. Agni is strongest in winter—not utilizing this leads to Vata aggravation.',
    source: 'Charaka Samhita',
  },
  {
    id: 'season_winter_sesame',
    ingredient: 'Sesame (Winter Staple)',
    foodIds: ['sesame_oil'],
    category: 'seasonal_tip',
    conditions: ['arthritis'],
    doshaAffinity: ['vata'],
    tip: 'Include sesame in winter diet—sesame seeds, sesame oil for cooking, and Abhyanga with warm sesame oil.',
    detail:
      'Sesame (Tila) is the quintessential winter food in Ayurveda. It is Ushna (warming), Snigdha (unctuous), and Vata-shamaka (Vata-pacifying). Make Til Laddu (sesame-jaggery balls), use sesame oil for cooking, and perform daily warm oil Abhyanga to combat winter dryness and cold.',
    source: 'Bhavaprakasha',
  },

  // Monsoon / Varsha (2)
  {
    id: 'season_monsoon_light',
    ingredient: 'Light Foods for Monsoon',
    foodIds: ['ginger', 'ghee'],
    category: 'seasonal_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata', 'pitta', 'kapha'],
    tip: 'During monsoon (Varsha Ritu), eat light, easily digestible, freshly cooked meals with warming spices.',
    detail:
      'Monsoon aggravates all three doshas, especially Vata, and weakens Agni significantly. Water contamination risk increases. Eat only freshly cooked, warm food. Add ginger, cumin, and black pepper to boost weakened Agni. Avoid raw salads, street food, and leafy greens (prone to contamination).',
    source: 'Charaka Samhita',
  },
  {
    id: 'season_monsoon_avoid_raw',
    ingredient: 'Monsoon Precautions',
    foodIds: ['ginger'],
    category: 'seasonal_tip',
    conditions: ['digestive_disorders'],
    doshaAffinity: ['vata'],
    tip: 'Avoid raw foods, cold drinks, and stale food during the monsoon when digestive fire is weakest.',
    detail:
      'Varsha Ritu brings humidity that aggravates Vata externally and weakens Agni internally. Raw foods require strong Agni to digest—eating them now creates Ama. Drink boiled and cooled water with ginger. Add Panchakola churna (five pungent spice mix) to meals to strengthen digestion.',
    source: 'Ashtanga Hridaya',
  },

  // Spring / Vasanta (2)
  {
    id: 'season_spring_bitter',
    ingredient: 'Spring Detox Foods',
    foodIds: ['honey', 'ginger'],
    category: 'seasonal_tip',
    conditions: ['obesity'],
    doshaAffinity: ['kapha'],
    tip: 'During spring (Vasanta Ritu), favor bitter, astringent, and pungent foods to clear accumulated winter Kapha.',
    detail:
      'Spring is the season when Kapha accumulated during winter begins to liquefy and cause allergies, congestion, lethargy, and weight gain. Favor Tikta (bitter) greens, Kashaya (astringent) beans, and Katu (pungent) spices. Take honey daily. This is the ideal season for Panchakarma.',
    source: 'Charaka Samhita',
  },
  {
    id: 'season_spring_light_meals',
    ingredient: 'Spring Dietary Lightening',
    foodIds: ['honey'],
    category: 'seasonal_tip',
    conditions: ['obesity', 'digestive_disorders'],
    doshaAffinity: ['kapha'],
    tip: 'Eat lighter meals in spring—reduce dairy, wheat, and sweets that aggravate Kapha.',
    detail:
      'After the heavy eating of winter, spring requires dietary Langhana (lightening). Reduce portions, skip breakfast if not hungry (or have light fruit only), and make lunch the main meal. Barley (Yava), mung dal, and bitter vegetables are ideal spring foods. Exercise more vigorously.',
    source: 'Ashtanga Hridaya',
  },

  // Autumn / Sharad (2)
  {
    id: 'season_autumn_pitta',
    ingredient: 'Autumn Pitta-Pacifying Foods',
    foodIds: ['ghee'],
    category: 'seasonal_tip',
    conditions: ['skin_disorders'],
    doshaAffinity: ['pitta'],
    tip: 'During autumn (Sharad Ritu), follow a Pitta-pacifying diet with sweet, bitter foods and ghee.',
    detail:
      'Autumn releases Pitta accumulated during summer, often manifesting as skin rashes, acidity, and inflammation. Favor sweet (Madhura) and bitter (Tikta) tastes. Take Tikta Ghrita (bitter herb-infused ghee). Avoid sour, spicy, and fermented foods. Moonbathing (Chandratapa) is recommended.',
    source: 'Charaka Samhita',
  },
  {
    id: 'season_autumn_ghee_therapy',
    ingredient: 'Autumn Ghee Therapy',
    foodIds: ['ghee', 'amla'],
    category: 'seasonal_tip',
    conditions: [],
    doshaAffinity: ['pitta'],
    tip: 'Increase ghee consumption in autumn and take Amalaki (amla) to cleanse excess Pitta from the system.',
    detail:
      'Sharad Ritu is called "Pitta Prakopa Kala" (season of Pitta aggravation). The classical recommendation is Virechana (therapeutic purgation) or at minimum, increased ghee intake and bitter herbs. Take 1 tsp ghee morning and night. Consume amla daily in any form.',
    source: 'Ashtanga Hridaya',
  },
];
