import { Recipe, SubstitutionOption, Ingredient } from '../types';
import { matchWalmartGroceryItem } from '../data/walmartGroceryCatalog';

function bindIngredientsToWalmartCatalog(ingredients: Ingredient[]): Ingredient[] {
  return (ingredients || []).map((ing, idx) => {
    const match = matchWalmartGroceryItem(ing.name || ing.rawText || 'Food item', ing.category);
    return {
      ...ing,
      id: ing.id || `ing-${Date.now()}-${idx}`,
      name: match.name || ing.name,
      category: match.category || ing.category || 'Pantry & Dry Goods',
      walmartQuery: match.walmartQuery,
      walmartSearchUrl: match.walmartSearchUrl,
      walmartDirectAddUrl: match.walmartSearchUrl,
      brandTier: 'great_value',
      estimatedPrice: match.estimatedPrice || ing.estimatedPrice || 2.48,
      packageSize: match.packageSize || ing.packageSize || '1 package',
      isPantryStaple: match.isPantryStaple ?? ing.isPantryStaple ?? false,
      inPantry: Boolean(ing.inPantry),
    };
  });
}

export async function parseRecipeText(recipeText: string, brandPreference: string = 'great_value'): Promise<Recipe> {
  const res = await fetch('/api/recipe/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeText, brandPreference }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to parse recipe' }));
    throw new Error(err.error || 'Server error parsing recipe');
  }
  const data = await res.json();
  const boundIngredients = bindIngredientsToWalmartCatalog(data.recipe.ingredients);

  return {
    ...data.recipe,
    id: `recipe-${Date.now()}`,
    baseServings: data.recipe.servings || 4,
    image: '/src/assets/images/hero_culinary_groceries_1793564753906.jpg',
    ingredients: boundIngredients,
    isCustom: true,
    createdAt: Date.now(),
  };
}

export async function generateAiRecipe(prompt: string, servings: number = 4, budget: string = 'budget_friendly', cuisine: string = 'Any'): Promise<Recipe> {
  const res = await fetch('/api/recipe/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, servings, budget, cuisine }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to generate recipe' }));
    throw new Error(err.error || 'Server error generating recipe');
  }
  const data = await res.json();
  const boundIngredients = bindIngredientsToWalmartCatalog(data.recipe.ingredients);

  return {
    ...data.recipe,
    id: `recipe-ai-${Date.now()}`,
    baseServings: data.recipe.servings || 4,
    image: '/src/assets/images/hero_culinary_groceries_1793564753906.jpg',
    ingredients: boundIngredients,
    isCustom: true,
    createdAt: Date.now(),
  };
}

export async function getIngredientSubstitutions(ingredientName: string, reason: string = 'budget'): Promise<SubstitutionOption[]> {
  const res = await fetch('/api/recipe/substitute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredientName, reason }),
  });
  if (!res.ok) {
    throw new Error('Failed to retrieve substitutions');
  }
  const data = await res.json();
  return (data.substitutions || []).map((sub: any) => {
    const match = matchWalmartGroceryItem(sub.name || ingredientName);
    return {
      name: match.name,
      explanation: sub.explanation || 'Verified alternative food product at Walmart.',
      walmartQuery: match.walmartQuery,
      walmartSearchUrl: match.walmartSearchUrl,
      walmartDirectAddUrl: match.walmartSearchUrl,
      estimatedPrice: match.estimatedPrice,
    };
  });
}
