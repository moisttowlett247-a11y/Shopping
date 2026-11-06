import { Ingredient } from '../types';

export function isItemInGlobalPantry(
  ing: { name: string; rawText?: string; walmartQuery?: string },
  pantrySet: Set<string>
): boolean {
  if (!pantrySet || pantrySet.size === 0) return false;
  const lowerName = ing.name.toLowerCase().trim();
  const lowerRaw = (ing.rawText || '').toLowerCase().trim();
  const lowerQuery = (ing.walmartQuery || '').toLowerCase().trim();

  for (const item of pantrySet) {
    const lItem = item.toLowerCase().trim();
    if (!lItem) continue;

    if (
      lowerName === lItem ||
      lowerName.includes(lItem) ||
      lItem.includes(lowerName) ||
      (lowerRaw && lowerRaw.includes(lItem)) ||
      (lowerQuery && lowerQuery.includes(lItem))
    ) {
      return true;
    }
  }
  return false;
}

export function isIngredientInPantry(ing: Ingredient, pantrySet?: Set<string>): boolean {
  if (ing.inPantry) return true;
  if (pantrySet && isItemInGlobalPantry(ing, pantrySet)) return true;
  return false;
}
