import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialized Gemini AI client for server-side processing
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

import { parseIngredientLine } from './src/utils/ingredientParser.js';

// Helper to build 100% reliable Walmart search URLs without fragile department facets or invalid SKUs
function buildWalmartSearchUrl(query: string): string {
  // Strip special symbols and collapse spaces
  const clean = query.replace(/[^\w\s\-\.\'\&]/g, ' ').replace(/\s+/g, ' ').trim();
  return `https://www.walmart.com/search?q=${encodeURIComponent(clean)}`;
}

// Thorough ingredient text sanitizer to strip culinary prep words, units, and parentheses
// while strictly preserving decimal/fraction amounts, measurement units, and authentic food names!
function cleanIngredientNameForWalmart(rawText: string): { cleanName: string; amount: number; unit: string; extractedPackageSize?: string } {
  const parsed = parseIngredientLine(rawText);
  return {
    cleanName: parsed.cleanName,
    amount: parsed.amount,
    unit: parsed.unit,
    extractedPackageSize: parsed.extractedPackageSize,
  };
}

// Fallback intelligent ingredient parser when Gemini is unavailable or rate-limited
function fallbackParseRecipe(rawText: string) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const title = lines[0] || 'My Custom Recipe';
  
  const ingredientLines: string[] = [];
  const instructionLines: string[] = [];
  let isIngredients = true;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();
    if (lower.includes('instruction') || lower.includes('direction') || lower.includes('method') || lower.includes('steps:')) {
      isIngredients = false;
      continue;
    }
    if (lower.includes('ingredient')) {
      isIngredients = true;
      continue;
    }

    if (isIngredients) {
      if (line.startsWith('-') || line.startsWith('*') || /^\d+/.test(line)) {
        ingredientLines.push(line.replace(/^[-*•\d+.]\s*/, ''));
      } else {
        ingredientLines.push(line);
      }
    } else {
      instructionLines.push(line.replace(/^[-*•\d+.]\s*/, ''));
    }
  }

  const parsedIngredients = ingredientLines.map((line, idx) => {
    const { cleanName, amount, unit } = cleanIngredientNameForWalmart(line);
    const lowerName = cleanName.toLowerCase();
    let category = 'Pantry & Dry Goods';
    let estPrice = 2.48;
    let packageSize = '1 pack';
    let isPantry = false;

    if (lowerName.includes('chicken') || lowerName.includes('beef') || lowerName.includes('pork') || lowerName.includes('salmon') || lowerName.includes('shrimp') || lowerName.includes('meat') || lowerName.includes('roast') || lowerName.includes('steak')) {
      category = 'Meat & Seafood';
      estPrice = 6.94;
      packageSize = '1-2 lb pack';
    } else if (lowerName.includes('onion') || lowerName.includes('garlic') || lowerName.includes('tomato') || lowerName.includes('spinach') || lowerName.includes('cilantro') || lowerName.includes('pepper') || lowerName.includes('lime') || lowerName.includes('lemon') || lowerName.includes('avocado') || lowerName.includes('herb')) {
      category = 'Produce';
      estPrice = 1.48;
      packageSize = 'Fresh / bunch';
    } else if (lowerName.includes('milk') || lowerName.includes('cheese') || lowerName.includes('butter') || lowerName.includes('cream') || lowerName.includes('egg') || lowerName.includes('yogurt') || lowerName.includes('cheddar') || lowerName.includes('oaxaca')) {
      category = 'Dairy & Eggs';
      estPrice = 3.28;
      packageSize = 'Standard package';
    } else if (lowerName.includes('salt') || lowerName.includes('pepper') || lowerName.includes('olive oil') || lowerName.includes('oil') || lowerName.includes('oregano') || lowerName.includes('paprika') || lowerName.includes('cumin') || lowerName.includes('seasoning')) {
      category = 'Spices & Seasonings';
      estPrice = 1.98;
      packageSize = 'Spice container';
      isPantry = true;
    } else if (lowerName.includes('pasta') || lowerName.includes('rice') || lowerName.includes('flour') || lowerName.includes('sugar') || lowerName.includes('broth') || lowerName.includes('beans') || lowerName.includes('canned')) {
      category = 'Pantry & Dry Goods';
      estPrice = 1.78;
      packageSize = '16 oz box / bag';
    } else if (lowerName.includes('tortilla') || lowerName.includes('bread') || lowerName.includes('bun')) {
      category = 'Bakery';
      estPrice = 2.48;
      packageSize = 'Pack / Loaf';
    }

    const walmartQuery = cleanName.toLowerCase().startsWith('great value') || cleanName.toLowerCase().startsWith('fresh')
      ? cleanName
      : `Great Value ${cleanName}`;

    return {
      id: `ing-${Date.now()}-${idx}`,
      name: cleanName,
      rawText: line,
      amount,
      unit: unit.toLowerCase(),
      category,
      walmartQuery,
      walmartSearchUrl: buildWalmartSearchUrl(walmartQuery),
      walmartDirectAddUrl: buildWalmartSearchUrl(walmartQuery),
      brandTier: 'great_value' as const,
      estimatedPrice: estPrice,
      packageSize,
      isPantryStaple: isPantry,
      inPantry: false,
    };
  });

  return {
    title,
    description: 'Freshly assembled recipe ready for Walmart grocery ordering.',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    cuisine: 'American',
    tags: ['Homemade', 'Quick Prep'],
    instructions: instructionLines.length > 0 ? instructionLines : ['Prepare ingredients.', 'Cook thoroughly according to your preference.', 'Serve warm and enjoy!'],
    ingredients: parsedIngredients,
  };
}

// Endpoint: Parse recipe text or extract ingredients
app.post('/api/recipe/parse', async (req: Request, res: Response) => {
  try {
    const { recipeText, brandPreference = 'great_value' } = req.body;

    if (!recipeText || typeof recipeText !== 'string' || !recipeText.trim()) {
      return res.status(400).json({ error: 'Recipe text is required' });
    }

    if (!ai) {
      console.warn('GEMINI_API_KEY not configured, using smart fallback parser');
      const fallback = fallbackParseRecipe(recipeText);
      return res.json({ recipe: fallback, source: 'fallback' });
    }

    const brandInstruction =
      brandPreference === 'organic'
        ? 'For Walmart product queries, prefer Great Value Organic or reputable organic brands.'
        : brandPreference === 'name_brand'
        ? 'For Walmart product queries, prefer top national brand names (Swanson, Barilla, Kraft, McCormick, Tyson, Philadelphia).'
        : 'For Walmart product queries, prefer Walmart Great Value store brand product titles for budget grocery savings.';

    const prompt = `You are a specialized Walmart Grocery inventory matching specialist.
Analyze the following recipe text. Parse all ingredients and instructions into clean, structured data.
${brandInstruction}

CRITICAL RULES FOR WALMART GROCERY ITEM MATCHING (DO NOT VIOLATE):
1. Every ingredient MUST be a genuine FOOD & GROCERY item sold at Walmart (Supermarket/Pantry/Produce/Meat/Dairy).
   - NEVER match non-food items, cosmetics, makeup, hardware, or medicine!
2. "name": The clean, generic supermarket name of the grocery item (e.g. "Boneless Skinless Chicken Breast", "Heavy Whipping Cream", "Garlic", "Yellow Onion", "Dark Red Kidney Beans", "Extra Virgin Olive Oil").
   - NEVER put prep instructions in "name" (no "minced", "diced", "chopped", "sliced", "drained", "rinsed", "divided", "at room temperature", "to taste", "for garnish").
3. "walmartQuery": The EXACT, realistic product title as sold on Walmart.com (e.g. "Great Value Boneless Skinless Chicken Breast 3 lb", "Great Value Heavy Whipping Cream 16 fl oz", "Fresh White Garlic 3 pack", "Great Value Dark Red Kidney Beans 15 oz", "Great Value 100% Extra Virgin Olive Oil 17 fl oz").
   - DO NOT include preparation words in walmartQuery! Walmart's search engine will return 0 products or incorrect categories if prep instructions are in the query!
   - DO NOT hallucinate numeric item IDs.
4. "amount": A clean number (e.g. 1.5, not "1-2").
5. "unit": Standard unit ("lbs", "oz", "cups", "tbsp", "tsp", "cloves", "count", "can", "bunch", "item").
6. "category": Must be one of: "Produce", "Meat & Seafood", "Dairy & Eggs", "Pantry & Dry Goods", "Bakery", "Spices & Seasonings", "Frozen", "Other".
7. "estimatedPrice": Realistic Walmart price in USD (e.g. 1.98, 2.48, 6.94).
8. "packageSize": Realistic Walmart package size (e.g. "16 oz", "32 oz carton", "3 lb bag", "1 bunch").
9. "isPantryStaple": true for salt, black pepper, water, common cooking oils.

Recipe Input:
${recipeText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            cookTime: { type: Type.STRING },
            servings: { type: Type.INTEGER },
            cuisine: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  rawText: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  unit: { type: Type.STRING },
                  category: { type: Type.STRING },
                  walmartQuery: { type: Type.STRING },
                  estimatedPrice: { type: Type.NUMBER },
                  packageSize: { type: Type.STRING },
                  isPantryStaple: { type: Type.BOOLEAN },
                },
                required: ['name', 'amount', 'unit', 'category', 'walmartQuery', 'estimatedPrice', 'packageSize', 'isPantryStaple'],
              },
            },
          },
          required: ['title', 'description', 'prepTime', 'cookTime', 'servings', 'instructions', 'ingredients'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');

    // Attach verified Walmart deep search links
    const enhancedIngredients = (parsedData.ingredients || []).map((ing: any, idx: number) => {
      const parsedRaw = parseIngredientLine(ing.rawText || `${ing.amount || ''} ${ing.unit || ''} ${ing.name || ''}`);
      const cleanName = ing.name ? parseIngredientLine(ing.name).cleanName : parsedRaw.cleanName;
      const category = ing.category || 'Pantry & Dry Goods';
      const amount = typeof ing.amount === 'number' && !isNaN(ing.amount) && ing.amount > 0 ? ing.amount : parsedRaw.amount;
      const unit = ing.unit && ing.unit !== 'item' && ing.unit !== 'unit' ? ing.unit : parsedRaw.unit;
      const packageSize = ing.packageSize && !ing.packageSize.includes('standard pack') ? ing.packageSize : (parsedRaw.extractedPackageSize || '1 package');
      
      // Clean query: remove any remaining prep artifacts
      let walmartQuery = (ing.walmartQuery || `Great Value ${cleanName}`)
        .replace(/\b(diced|minced|sliced|chopped|drained|rinsed|divided|to taste)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      const searchUrl = buildWalmartSearchUrl(walmartQuery);

      return {
        id: `ing-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        name: cleanName,
        rawText: ing.rawText || `${amount} ${unit} ${cleanName}`,
        amount,
        unit,
        category,
        walmartQuery,
        walmartSearchUrl: searchUrl,
        walmartDirectAddUrl: searchUrl,
        brandTier: brandPreference,
        estimatedPrice: ing.estimatedPrice || 2.48,
        packageSize,
        isPantryStaple: Boolean(ing.isPantryStaple),
        inPantry: false, // CRITICAL: NEVER mark in pantry by default! Every recipe item must go into cart.
      };
    });

    return res.json({
      recipe: {
        ...parsedData,
        ingredients: enhancedIngredients,
      },
      source: 'gemini',
    });
  } catch (err: any) {
    console.error('Error in /api/recipe/parse:', err);
    const fallback = fallbackParseRecipe(req.body.recipeText || '');
    return res.json({ recipe: fallback, source: 'fallback', warning: err.message });
  }
});

// Endpoint: Generate a new recipe from a concept or prompt
app.post('/api/recipe/generate', async (req: Request, res: Response) => {
  try {
    const { prompt: userPrompt, servings = 4, budget = 'budget_friendly', cuisine = 'Any' } = req.body;

    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      const sample = fallbackParseRecipe(`Delicious ${userPrompt}\n- 1 whole rotisserie chicken\n- 2 tbsp olive oil\n- 1 tsp salt\n- 1 diced onion\n- 2 cloves garlic\n- 1 cup white rice\nInstructions:\n1. Shred rotisserie chicken and cook aromatics\n2. Combine and season to serve.`);
      sample.title = userPrompt;
      return res.json({ recipe: sample, source: 'fallback' });
    }

    const systemPrompt = `You are an elite grocery meal planner and recipe developer specializing in Walmart shopping.
Create a complete, mouthwatering, practical recipe based on the request: "${userPrompt}".
Cuisine: ${cuisine}
Target servings: ${servings}
Budget level: ${budget} (Prioritize Great Value budget grocery items where possible).

CRITICAL GROCERY RULES:
- For any chicken dish or generic poultry, default to "Freshness Guaranteed Traditional Rotisserie Whole Chicken 2.25 lb" or Great Value chicken.
- Never mark ingredients as in-pantry by default; all items must default to inPantry: false so they can be added to the Walmart shopping cart.
- Only return real FOOD AND GROCERY ingredients sold at Walmart supermarkets.
- Never include non-food items, cosmetics, makeup, or hardware.
- Provide clean, exact Walmart search queries (e.g. "Freshness Guaranteed Traditional Rotisserie Whole Chicken 2.25 lb", "Great Value Long Grain Enriched White Rice 5 lb").
- Do NOT include preparation words in walmartQuery.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            cookTime: { type: Type.STRING },
            servings: { type: Type.INTEGER },
            cuisine: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  rawText: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  unit: { type: Type.STRING },
                  category: { type: Type.STRING },
                  walmartQuery: { type: Type.STRING },
                  estimatedPrice: { type: Type.NUMBER },
                  packageSize: { type: Type.STRING },
                  isPantryStaple: { type: Type.BOOLEAN },
                },
                required: ['name', 'amount', 'unit', 'category', 'walmartQuery', 'estimatedPrice', 'packageSize', 'isPantryStaple'],
              },
            },
          },
          required: ['title', 'description', 'prepTime', 'cookTime', 'servings', 'instructions', 'ingredients'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    const enhancedIngredients = (parsedData.ingredients || []).map((ing: any, idx: number) => {
      const parsedRaw = parseIngredientLine(ing.rawText || `${ing.amount || ''} ${ing.unit || ''} ${ing.name || ''}`);
      const cleanName = ing.name ? parseIngredientLine(ing.name).cleanName : parsedRaw.cleanName;
      const category = ing.category || 'Pantry & Dry Goods';
      const amount = typeof ing.amount === 'number' && !isNaN(ing.amount) && ing.amount > 0 ? ing.amount : parsedRaw.amount;
      const unit = ing.unit && ing.unit !== 'item' && ing.unit !== 'unit' ? ing.unit : parsedRaw.unit;
      const packageSize = ing.packageSize && !ing.packageSize.includes('standard pack') ? ing.packageSize : (parsedRaw.extractedPackageSize || '1 package');

      let walmartQuery = (ing.walmartQuery || `Great Value ${cleanName}`)
        .replace(/\b(diced|minced|sliced|chopped|drained|rinsed|divided|to taste)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      const searchUrl = buildWalmartSearchUrl(walmartQuery);

      return {
        id: `gen-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        name: cleanName,
        rawText: ing.rawText || `${amount} ${unit} ${cleanName}`,
        amount,
        unit,
        category,
        walmartQuery,
        walmartSearchUrl: searchUrl,
        walmartDirectAddUrl: searchUrl,
        brandTier: 'great_value' as const,
        estimatedPrice: ing.estimatedPrice || 2.48,
        packageSize,
        isPantryStaple: Boolean(ing.isPantryStaple),
        inPantry: false, // CRITICAL: NEVER mark in pantry by default!
      };
    });

    return res.json({
      recipe: {
        ...parsedData,
        ingredients: enhancedIngredients,
      },
      source: 'gemini',
    });
  } catch (err: any) {
    console.error('Error in /api/recipe/generate:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate recipe' });
  }
});

// Endpoint: Ingredient substitution suggestion with Walmart product links
app.post('/api/recipe/substitute', async (req: Request, res: Response) => {
  try {
    const { ingredientName, reason = 'budget', originalPrice } = req.body;

    if (!ingredientName) {
      return res.status(400).json({ error: 'ingredientName is required' });
    }

    if (!ai) {
      return res.json({
        substitutions: [
          {
            name: `Great Value ${ingredientName}`,
            explanation: 'Official Walmart Great Value store brand alternative with everyday low prices.',
            walmartQuery: `Great Value ${ingredientName}`,
            walmartSearchUrl: buildWalmartSearchUrl(`Great Value ${ingredientName}`),
            estimatedPrice: originalPrice ? Math.max(0.98, parseFloat((originalPrice * 0.72).toFixed(2))) : 2.18,
          },
        ],
      });
    }

    const prompt = `Provide 3 smart Walmart grocery substitutions for the food ingredient "${ingredientName}".
IMPORTANT STORE-BRAND RULE:
- Always offer a Walmart "Great Value" store brand option as the PRIMARY substitution (or Freshness Guaranteed for rotisserie chicken/bakery) to ensure maximum cost savings for the shopper.
- If the item is chicken, offer Freshness Guaranteed Traditional Rotisserie Chicken or Great Value chicken cut.
Reason for substitution: ${reason} (e.g. budget, store-brand swap, dairy-free, gluten-free, healthy, or out-of-stock).
Rules:
- MUST be grocery/food products only!
- Never return cosmetics or non-food products.
For each substitution, provide:
1. name (prefix with "Great Value" if it is the store brand option)
2. explanation of how it works in recipes and why it saves money
3. exact Walmart product search query (e.g. "Great Value Plain Greek Yogurt 32 oz")
4. estimated price`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              explanation: { type: Type.STRING },
              walmartQuery: { type: Type.STRING },
              estimatedPrice: { type: Type.NUMBER },
            },
            required: ['name', 'explanation', 'walmartQuery', 'estimatedPrice'],
          },
        },
      },
    });

    const list = JSON.parse(response.text || '[]');
    const results = list.map((item: any) => ({
      ...item,
      walmartSearchUrl: buildWalmartSearchUrl(item.walmartQuery),
    }));

    return res.json({ substitutions: results });
  } catch (err: any) {
    console.error('Error in /api/recipe/substitute:', err);
    return res.json({
      substitutions: [
        {
          name: `Great Value Store Brand ${req.body.ingredientName}`,
          explanation: 'Standard affordable Walmart staple alternative.',
          walmartQuery: `Great Value ${req.body.ingredientName}`,
          walmartSearchUrl: buildWalmartSearchUrl(`Great Value ${req.body.ingredientName}`),
          estimatedPrice: 1.98,
        },
      ],
    });
  }
});

// Vite or Static file serving
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`CartCraft server listening on port ${port}`);
});
