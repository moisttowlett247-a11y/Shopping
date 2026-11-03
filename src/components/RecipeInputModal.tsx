import React, { useState } from 'react';
import { X, Sparkles, FileText, Plus, Loader2, ArrowRight } from 'lucide-react';
import { Recipe, Ingredient } from '../types';
import { parseRecipeText, generateAiRecipe } from '../services/api';
import { matchWalmartGroceryItem } from '../data/walmartGroceryCatalog';
import { parseIngredientLine } from '../utils/ingredientParser';
import { heroImg } from '../assets/images';

interface RecipeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeCreated: (recipe: Recipe) => void;
  initialTab?: 'paste' | 'manual' | 'ai';
}

export const RecipeInputModal: React.FC<RecipeInputModalProps> = ({
  isOpen,
  onClose,
  onRecipeCreated,
  initialTab = 'paste',
}) => {
  const [activeTab, setActiveTab] = useState<'paste' | 'manual' | 'ai'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Tab 1: Paste Text State
  const [pastedText, setPastedText] = useState('');
  const [brandPreference, setBrandPreference] = useState<'great_value' | 'name_brand' | 'organic'>('great_value');

  // Tab 2: AI Recipe Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiServings, setAiServings] = useState(4);
  const [aiCuisine, setAiCuisine] = useState('American');
  const [aiBudget, setAiBudget] = useState('budget_friendly');

  // Tab 3: Manual Recipe Form State
  const [manualTitle, setManualTitle] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [manualPrepTime, setManualPrepTime] = useState('15 mins');
  const [manualCookTime, setManualCookTime] = useState('20 mins');
  const [manualServings, setManualServings] = useState(4);
  const [manualCuisine, setManualCuisine] = useState('Home Cooking');
  const [manualInstructions, setManualInstructions] = useState('');
  const [manualIngredientInput, setManualIngredientInput] = useState('');

  if (!isOpen) return null;

  // Handle Tab 1: Parse pasted recipe
  const handleParseRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const parsedRecipe = await parseRecipeText(pastedText, brandPreference);
      onRecipeCreated(parsedRecipe);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to parse recipe. Please check your text.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Tab 2: Generate with AI
  const handleGenerateAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const generated = await generateAiRecipe(aiPrompt, aiServings, aiBudget, aiCuisine);
      onRecipeCreated(generated);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate recipe with AI.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Tab 3: Manual Recipe Build with accurate quantity and food extraction
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const rawIngLines = manualIngredientInput.split('\n').filter((l) => l.trim().length > 0);
    const ingredients: Ingredient[] = rawIngLines.map((line, idx) => {
      const parsed = parseIngredientLine(line);
      const match = matchWalmartGroceryItem(parsed.cleanName);
      const packageSize = parsed.extractedPackageSize || match.packageSize || '1 package';

      return {
        id: `manual-ing-${Date.now()}-${idx}`,
        itemId: match.itemId,
        name: parsed.cleanName, // Keep authentic food name
        rawText: line,
        amount: parsed.amount, // Real parsed numerical amount (e.g. 4, 1.5, 0.5, 18)
        unit: parsed.unit, // Real unit (e.g. count, lbs, cups, cloves, cans)
        category: match.category,
        walmartQuery: match.walmartQuery,
        walmartSearchUrl: match.walmartSearchUrl,
        brandTier: 'great_value',
        estimatedPrice: match.estimatedPrice,
        packageSize,
        isPantryStaple: match.isPantryStaple,
        inPantry: false,
      };
    });

    const instructions = manualInstructions
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const newRecipe: Recipe = {
      id: `recipe-manual-${Date.now()}`,
      title: manualTitle.trim(),
      description: manualDescription.trim() || 'Custom created recipe with matched Walmart items.',
      prepTime: manualPrepTime || '15 mins',
      cookTime: manualCookTime || '20 mins',
      servings: manualServings || 4,
      baseServings: manualServings || 4,
      cuisine: manualCuisine || 'General',
      tags: ['Custom Recipe'],
      image: heroImg,
      instructions: instructions.length > 0 ? instructions : ['Prepare ingredients and cook to taste.'],
      ingredients,
      isCustom: true,
      createdAt: Date.now(),
    };

    onRecipeCreated(newRecipe);
    onClose();
  };

  const loadSample = (sampleType: 'fajitas' | 'chili') => {
    if (sampleType === 'fajitas') {
      setPastedText(`One-Pan Chicken Fajitas
Prep: 15 mins | Cook: 15 mins | Servings: 4

Ingredients:
- 1.5 lbs boneless skinless chicken breasts, sliced into strips
- 2 bell peppers (1 red, 1 green), sliced
- 1 large yellow onion, sliced
- 2 tbsp olive oil
- 1 packet Great Value Fajita Seasoning Mix
- 8 flour tortillas (8-inch)
- 1 cup shredded Mexican blend cheese
- 1 jar Great Value Salsa
- 1 tub Great Value Sour Cream (16 oz)
- 1 fresh lime, cut into wedges

Instructions:
1. In a large bowl, toss chicken strips, bell peppers, and sliced onions with olive oil and fajita seasoning.
2. Heat a large cast-iron skillet over high heat. Add chicken and veggies in a single layer.
3. Sear for 8-10 minutes, stirring occasionally, until chicken reaches 165°F and veggies are tender-crisp with slight char.
4. Warm tortillas and serve hot with cheese, salsa, sour cream, and lime wedges.`);
    } else {
      setPastedText(`Classic Hearty Beef Chili
Prep: 15 mins | Cook: 40 mins | Servings: 6

Ingredients:
- 2 lbs lean ground beef (80/20)
- 1 medium yellow onion, diced
- 3 cloves garlic, minced
- 2 cans (15 oz each) Great Value Dark Red Kidney Beans, drained
- 2 cans (14.5 oz) diced tomatoes with green chilies
- 1 can (8 oz) Great Value Tomato Sauce
- 2 tbsp chili powder
- 1 tsp ground cumin
- 1 tsp smoked paprika
- 1 tsp salt and black pepper

Instructions:
1. Brown ground beef and diced onion in a large Dutch oven over medium heat until cooked through. Drain excess fat.
2. Add minced garlic, chili powder, cumin, and paprika. Cook for 1 minute until fragrant.
3. Stir in kidney beans, diced tomatoes with juices, and tomato sauce.
4. Bring to a boil, then reduce heat to low and simmer uncovered for 30 minutes, stirring occasionally.
5. Serve warm topped with shredded cheddar and green onions.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Import or Create Recipe</h2>
            <p className="text-xs text-slate-500">
              Input any recipe — CartCraft instantly matches ingredients to Walmart grocery items.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-2">
          <button
            onClick={() => {
              setActiveTab('paste');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'paste'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Text or Notes</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ai');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'ai'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Generate with AI</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('manual');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Manual Form</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {errorMessage}
          </div>
        )}

        {/* Tab 1: Paste Text Content */}
        {activeTab === 'paste' && (
          <form onSubmit={handleParseRecipe} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900">
                Paste Recipe Title, Ingredients & Directions
              </label>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Quick samples:</span>
                <button
                  type="button"
                  onClick={() => loadSample('fajitas')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Chicken Fajitas
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => loadSample('chili')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Beef Chili
                </button>
              </div>
            </div>

            <textarea
              required
              rows={8}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste recipe here, e.g.:&#10;Creamy Garlic Pasta&#10;- 1 lb penne pasta&#10;- 2 cups heavy cream&#10;- 4 cloves garlic, minced&#10;- 1 cup parmesan&#10;Instructions: Boil pasta. Simmer cream and garlic..."
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-blue-600 font-mono"
            />

            {/* Brand preference selection */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-slate-800">Walmart Brand Matching Preference:</span>
                <p className="text-slate-500 text-[11px]">
                  Choose how ingredients should be paired with Walmart items
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setBrandPreference('great_value')}
                  className={`px-2.5 py-1 font-semibold rounded cursor-pointer transition-colors ${
                    brandPreference === 'great_value'
                      ? 'bg-[#0071DC] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Great Value (Budget)
                </button>
                <button
                  type="button"
                  onClick={() => setBrandPreference('name_brand')}
                  className={`px-2.5 py-1 font-semibold rounded cursor-pointer transition-colors ${
                    brandPreference === 'name_brand'
                      ? 'bg-[#0071DC] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Top Brand Names
                </button>
                <button
                  type="button"
                  onClick={() => setBrandPreference('organic')}
                  className={`px-2.5 py-1 font-semibold rounded cursor-pointer transition-colors ${
                    brandPreference === 'organic'
                      ? 'bg-[#0071DC] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Organic
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0071DC] hover:bg-[#005bb5] active:scale-98 rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Parsing Ingredients with Gemini...</span>
                  </>
                ) : (
                  <>
                    <span>Parse & Match Walmart Items</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: AI Recipe Generator Content */}
        {activeTab === 'ai' && (
          <form onSubmit={handleGenerateAi} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                What recipe would you like to cook?
              </label>
              <input
                type="text"
                required
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. 20-minute spicy honey garlic chicken stir fry with jasmine rice"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Servings</label>
                <select
                  value={aiServings}
                  onChange={(e) => setAiServings(parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value={2}>2 Servings</option>
                  <option value={4}>4 Servings</option>
                  <option value={6}>6 Servings</option>
                  <option value={8}>8 Servings</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Cuisine / Style</label>
                <select
                  value={aiCuisine}
                  onChange={(e) => setAiCuisine(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="American">American</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian / Stir Fry">Asian / Stir Fry</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="BBQ & Comfort">BBQ & Comfort</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Budget Target</label>
                <select
                  value={aiBudget}
                  onChange={(e) => setAiBudget(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="budget_friendly">Great Value Budget ($)</option>
                  <option value="balanced">Standard Balanced ($$)</option>
                  <option value="premium">Gourmet Fresh ($$$)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0071DC] hover:bg-[#005bb5] active:scale-98 rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Recipe & Walmart List...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Recipe with Walmart Matches</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Manual Recipe Form Content */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-900 mb-1">Recipe Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandma's Lemon Pepper Chicken"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Cuisine / Category</label>
                <input
                  type="text"
                  value={manualCuisine}
                  onChange={(e) => setManualCuisine(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Servings</label>
                <input
                  type="number"
                  value={manualServings}
                  onChange={(e) => setManualServings(parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Prep Time</label>
                <input
                  type="text"
                  value={manualPrepTime}
                  onChange={(e) => setManualPrepTime(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Cook Time</label>
                <input
                  type="text"
                  value={manualCookTime}
                  onChange={(e) => setManualCookTime(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Ingredients (one per line)
              </label>
              <textarea
                required
                rows={4}
                value={manualIngredientInput}
                onChange={(e) => setManualIngredientInput(e.target.value)}
                placeholder="2 lbs chicken thighs&#10;1 fresh lemon&#10;2 tbsp olive oil&#10;1 tsp black pepper"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Instructions / Cooking Steps (one per line)
              </label>
              <textarea
                rows={3}
                value={manualInstructions}
                onChange={(e) => setManualInstructions(e.target.value)}
                placeholder="1. Season chicken with salt, pepper, and lemon juice.&#10;2. Bake at 400°F for 30 minutes until 165°F."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-blue-600"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0071DC] hover:bg-[#005bb5] rounded-lg shadow-sm cursor-pointer"
              >
                Save Recipe & Generate Walmart Links
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
