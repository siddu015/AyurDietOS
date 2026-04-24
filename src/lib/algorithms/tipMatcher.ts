import { AyurvedaTip, DoshaType, PatientProfile, Season, TipCategory } from '../types';
import { ayurvedaTips } from '../data';
import { getCurrentSeason } from '../data';

function getCurrentAyurvedicSeason(): Season {
  return getCurrentSeason() as Season;
}

function getDominantDosha(patient: PatientProfile): DoshaType {
  return patient.prakriti.dominant;
}

export function getTipsForFood(foodId: string, patient?: PatientProfile): AyurvedaTip[] {
  let tips = ayurvedaTips.filter(tip =>
    tip.foodIds?.includes(foodId)
  );

  if (patient) {
    const dosha = getDominantDosha(patient);
    tips = tips.sort((a, b) => {
      const aRelevance = a.doshaAffinity.includes(dosha) ? 1 : 0;
      const bRelevance = b.doshaAffinity.includes(dosha) ? 1 : 0;
      return bRelevance - aRelevance;
    });
  }

  return tips;
}

export function getTipsForMeal(foodIds: string[], patient?: PatientProfile): AyurvedaTip[] {
  const foodSet = new Set(foodIds);
  const seen = new Set<string>();

  const directTips = ayurvedaTips.filter(tip => {
    if (seen.has(tip.id)) return false;
    const match = tip.foodIds?.some(fid => foodSet.has(fid));
    if (match) seen.add(tip.id);
    return match;
  });

  const combinationTips = ayurvedaTips.filter(tip => {
    if (seen.has(tip.id)) return false;
    if (tip.category !== 'combination_tip') return false;
    const linkedFoods = tip.foodIds || [];
    const matchCount = linkedFoods.filter(fid => foodSet.has(fid)).length;
    if (matchCount >= 1) {
      seen.add(tip.id);
      return true;
    }
    return false;
  });

  let tips = [...directTips, ...combinationTips];

  if (patient) {
    const dosha = getDominantDosha(patient);

    const conditionTips = ayurvedaTips.filter(tip => {
      if (seen.has(tip.id)) return false;
      const match = tip.conditions.some(c => patient.conditions.includes(c));
      if (match) seen.add(tip.id);
      return match;
    });
    tips = [...tips, ...conditionTips];

    tips.sort((a, b) => {
      const aScore =
        (a.doshaAffinity.includes(dosha) ? 2 : 0) +
        (a.conditions.some(c => patient.conditions.includes(c)) ? 3 : 0) +
        (a.foodIds?.some(fid => foodSet.has(fid)) ? 1 : 0);
      const bScore =
        (b.doshaAffinity.includes(dosha) ? 2 : 0) +
        (b.conditions.some(c => patient.conditions.includes(c)) ? 3 : 0) +
        (b.foodIds?.some(fid => foodSet.has(fid)) ? 1 : 0);
      return bScore - aScore;
    });
  }

  return tips.slice(0, 5);
}

export function getTipsForCondition(conditionId: string): AyurvedaTip[] {
  return ayurvedaTips.filter(tip => tip.conditions.includes(conditionId));
}

export function getTipsForDosha(doshaType: DoshaType): AyurvedaTip[] {
  return ayurvedaTips.filter(tip => tip.doshaAffinity.includes(doshaType));
}

export function getSeasonalTips(): AyurvedaTip[] {
  const season = getCurrentAyurvedicSeason();

  const seasonalCategoryTips = ayurvedaTips.filter(
    tip => tip.category === 'seasonal_tip'
  );

  const seasonKeywords: Record<string, string[]> = {
    grishma: ['summer', 'grishma', 'cooling', 'heat'],
    varsha: ['monsoon', 'varsha', 'rainy', 'damp'],
    sharad: ['autumn', 'sharad', 'fall'],
    hemanta: ['winter', 'hemanta', 'cold', 'warming'],
    shishira: ['winter', 'shishira', 'cold', 'warming'],
    vasanta: ['spring', 'vasanta'],
  };

  const keywords = seasonKeywords[season] || [];

  return seasonalCategoryTips.filter(tip => {
    const text = (tip.tip + ' ' + (tip.detail || '')).toLowerCase();
    return keywords.some(kw => text.includes(kw));
  });
}

export function getTipsByCategory(category: TipCategory): AyurvedaTip[] {
  return ayurvedaTips.filter(tip => tip.category === category);
}

export function searchTips(query: string): AyurvedaTip[] {
  const q = query.toLowerCase();
  return ayurvedaTips.filter(tip =>
    tip.ingredient.toLowerCase().includes(q) ||
    tip.tip.toLowerCase().includes(q) ||
    tip.detail?.toLowerCase().includes(q) ||
    tip.conditions.some(c => c.includes(q))
  );
}
