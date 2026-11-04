import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Sparkles,
  ShoppingBag,
  Filter,
  Check,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  X,
  RotateCcw,
  Store,
} from 'lucide-react';
import { Recipe, Ingredient, SubstitutionOption } from './types';
import { INITIAL_RECIPES } from './data/curatedRecipes';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipeInputModal } from './components/RecipeInputModal';
import { WalmartCartDrawer, CartItem } from './components/WalmartCartDrawer';
import { SubstituteModal } from './components/SubstituteModal';
import { DefaultSelectionModal } from './components/DefaultSelectionModal';
import { HowItWorks } from './components/HowItWorks';
import { matchWalmartGroceryItem, calculateRetailPackageQuantity } from './data/walmartGroceryCatalog';
import { DefaultSelectionSettings } from './types';
import { DEFAULT_SELECTION_SETTINGS, applyDefaultSelectionToRecipe } from './utils/defaultSelection';

// Storage version key to guarantee old corrupt/hallucinated SKU items or stale quantities
// are purged from the user's browser localStorage on first load!
const STORAGE_VERSION_KEY = 'cartcraft_storage_version';
const CURRENT_STORAGE_VERSION = 'v13_bagged_rotisserie_and_default_selection';

// Helper to ensure Walmart URLs are 100% matched against our verified Walmart Grocery Catalog
// CRITICAL: NEVER overwrite the recipe's authentic food name!
function sanitizeIngredientUrls<T extends Ingredient>(ing: T): T {
  const authenticName = (ing.name || ing.rawText || 'Food item').trim();
  const match = matchWalmartGroceryItem(authenticName, ing.category);
  const validItemId = (ing.itemId && /^\d+$/.test(ing.itemId))
    ? ing.itemId
    : (match.itemId && /^\d+$/.test(match.itemId) ? match.itemId : undefined);

  return {
    ...ing,
    itemId: validItemId, // Verified authentic Walmart item ID for 1-click auto-add
    name: authenticName, // ALWAYS PRESERVE AUTHENTIC CULINARY FOOD NAME!
    category: ing.category || match.category || 'Pantry & Dry Goods',
    walmartQuery: ing.walmartQuery && ing.walmartQuery.trim() !== '' && !ing.walmartQuery.toLowerCase().includes('undefined')
      ? ing.walmartQuery
      : match.walmartQuery,
    walmartSearchUrl: match.walmartSearchUrl,
    walmartDirectAddUrl: match.walmartSearchUrl,
    estimatedPrice: ing.estimatedPrice && ing.estimatedPrice > 0 ? ing.estimatedPrice : (match.estimatedPrice || 2.48),
    packageSize: ing.packageSize && ing.packageSize.trim() !== '' ? ing.packageSize : (match.packageSize || '1 package'),
  };
}

export default function App() {
  // Purge stale corrupt data from previous turns if version has updated
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      if (savedVersion !== CURRENT_STORAGE_VERSION) {
        localStorage.removeItem('cartcraft_recipes');
        localStorage.removeItem('cartcraft_cart');
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
      }
    } catch (e) {
      console.error('Storage version migration error', e);
    }
  }, []);

  // Recipes list with local persistence and automatic link sanitization
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      if (savedVersion === CURRENT_STORAGE_VERSION) {
        const saved = localStorage.getItem('cartcraft_recipes');
        if (saved) {
          const parsed: Recipe[] = JSON.parse(saved);
          return parsed.map((r) => ({
            ...r,
            ingredients: r.ingredients.map(sanitizeIngredientUrls),
          }));
        }
      }
    } catch (e) {
      console.error('Error loading saved recipes', e);
    }
    return INITIAL_RECIPES.map((r) => ({
      ...r,
      ingredients: r.ingredients.map(sanitizeIngredientUrls),
    }));
  });

  // Selected active recipe for detail view (null = catalog)
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  // Walmart Master Shopping Cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      if (savedVersion === CURRENT_STORAGE_VERSION) {
        const saved = localStorage.getItem('cartcraft_cart');
        if (saved) {
          const parsed: CartItem[] = JSON.parse(saved);
          return parsed.map(sanitizeIngredientUrls);
        }
      }
    } catch (e) {
      console.error('Error loading saved cart', e);
    }
    return [];
  });

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRecipeInputOpen, setIsRecipeInputOpen] = useState(false);
  const [recipeInputTab, setRecipeInputTab] = useState<'paste' | 'manual' | 'ai'>('paste');
  const [substituteIngredient, setSubstituteIngredient] = useState<Ingredient | null>(null);

  // Global Default Ingredient Selection Settings (persisted across sessions)
  const [defaultSelectionSettings, setDefaultSelectionSettings] = useState<DefaultSelectionSettings>(() => {
    try {
      const saved = localStorage.getItem('cartcraft_default_selection_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading default selection settings', e);
    }
    return DEFAULT_SELECTION_SETTINGS;
  });
  const [isDefaultSelectionOpen, setIsDefaultSelectionOpen] = useState(false);

  const handleSaveDefaultSelectionSettings = (newSettings: DefaultSelectionSettings) => {
    setDefaultSelectionSettings(newSettings);
    try {
      localStorage.setItem('cartcraft_default_selection_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error('Error saving default selection settings', e);
    }
    const label = newSettings.mode === 'all'
      ? 'All Ingredients'
      : newSettings.mode === 'exclude_staples'
      ? `Exclude Home Staples (${newSettings.homeStaples.length} staples)`
      : 'Perishables & Proteins Only';
    showToast(`✓ Default ingredient rule: "${label}" applied to all recipes!`);
  };

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Search & Filters in catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cartcraft_recipes', JSON.stringify(recipes));
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
    } catch (e) {
      console.error('Failed to save recipes', e);
    }
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem('cartcraft_cart', JSON.stringify(cartItems));
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId) || null;
  const cartItemIds = new Set(cartItems.map((i) => i.id));

  // Handler: Add all ingredients (or selected subset) from a recipe into the Walmart Cart
  // Scaled by servings multiplier and converted to true retail packaging quantities!
  const handleAddAllToCart = (
    recipe: Recipe,
    selectedIngredientIds?: Set<string>,
    servingMultiplier: number = 1
  ) => {
    const effectiveSelection = selectedIngredientIds || applyDefaultSelectionToRecipe(recipe.ingredients, defaultSelectionSettings);
    const itemsToAdd = recipe.ingredients.filter((i) => {
      if (i.inPantry) return false;
      if (!effectiveSelection.has(i.id)) return false;
      return true;
    });

    if (itemsToAdd.length === 0) {
      showToast(`No new ingredients to add for "${recipe.title}" (all are in pantry or excluded).`);
      return;
    }

    setCartItems((prev) => {
      const existingMap = new Map<string, CartItem>();
      prev.forEach((item) => existingMap.set(item.id, { ...item }));

      itemsToAdd.forEach((ing) => {
        const clean = sanitizeIngredientUrls(ing);
        const scaledAmount = (clean.amount || 1) * servingMultiplier;
        const retailPackageCount = calculateRetailPackageQuantity(
          scaledAmount,
          clean.unit,
          clean.packageSize,
          clean.category
        );

        if (existingMap.has(clean.id)) {
          const current = existingMap.get(clean.id)!;
          existingMap.set(clean.id, {
            ...current,
            orderQuantity: current.orderQuantity + retailPackageCount,
          });
        } else {
          existingMap.set(clean.id, {
            ...clean,
            recipeTitle: recipe.title,
            orderQuantity: retailPackageCount,
          });
        }
      });

      return Array.from(existingMap.values());
    });

    showToast(`✓ Auto-added ${itemsToAdd.length} verified grocery items from "${recipe.title}"!`);
    setIsCartOpen(true);
  };

  // Handler: Toggle single ingredient in cart with accurate package quantity calculation
  const handleToggleCartItem = (ingredient: Ingredient, servingMultiplier: number = 1) => {
    const clean = sanitizeIngredientUrls(ingredient);
    setCartItems((prev) => {
      const exists = prev.some((i) => i.id === clean.id);
      if (exists) {
        showToast(`Removed "${clean.name}" from your cart.`);
        return prev.filter((i) => i.id !== clean.id);
      } else {
        const scaledAmount = (clean.amount || 1) * (servingMultiplier || 1);
        const retailPackageCount = calculateRetailPackageQuantity(
          scaledAmount,
          clean.unit,
          clean.packageSize,
          clean.category
        );

        showToast(`✓ Added ${retailPackageCount}x "${clean.name}" to your cart!`);
        return [
          ...prev,
          {
            ...clean,
            recipeTitle: selectedRecipe?.title,
            orderQuantity: retailPackageCount,
          },
        ];
      }
    });
  };

  // Handler: Update quantity in cart
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.orderQuantity + delta;
            return newQty > 0 ? { ...item, orderQuantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Handler: Remove single item from cart
  const handleRemoveCartItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.name}" from cart.`);
    }
  };

  // Handler: Remove all items belonging to a specific recipe from cart
  const handleRemoveRecipeFromCart = (recipeTitle: string) => {
    setCartItems((prev) => prev.filter((i) => i.recipeTitle !== recipeTitle));
    showToast(`Removed all items from "${recipeTitle}".`);
  };

  // Handler: Add custom item directly inside cart drawer using verified catalog
  const handleAddCustomCartItem = (newItem: {
    name: string;
    category: string;
    quantity: number;
    estimatedPrice: number;
    walmartQuery?: string;
    walmartSearchUrl?: string;
    packageSize?: string;
  }) => {
    const match = matchWalmartGroceryItem(newItem.name, newItem.category);
    const cartItem: CartItem = {
      id: `custom-cart-${Date.now()}`,
      itemId: match.itemId,
      name: match.name,
      rawText: `${newItem.quantity} ${match.name}`,
      amount: newItem.quantity,
      unit: 'item',
      category: match.category,
      walmartQuery: newItem.walmartQuery || match.walmartQuery,
      walmartSearchUrl: newItem.walmartSearchUrl || match.walmartSearchUrl,
      brandTier: 'great_value',
      estimatedPrice: newItem.estimatedPrice || match.estimatedPrice,
      packageSize: newItem.packageSize || match.packageSize,
      isPantryStaple: match.isPantryStaple,
      inPantry: false,
      recipeTitle: 'Extra Grocery Items',
      orderQuantity: newItem.quantity,
    };

    setCartItems((prev) => [...prev, cartItem]);
    showToast(`✓ Added verified "${match.name}" to your cart.`);
  };

  // Handler: Clear all items from cart
  const handleClearCart = () => {
    setCartItems([]);
    showToast('Your shopping cart has been cleared.');
  };

  // Handler: Reset recipes to clean curated groceries
  const handleResetToVerifiedRecipes = () => {
    setRecipes(INITIAL_RECIPES.map((r) => ({
      ...r,
      ingredients: r.ingredients.map(sanitizeIngredientUrls),
    })));
    setCartItems([]);
    localStorage.removeItem('cartcraft_recipes');
    localStorage.removeItem('cartcraft_cart');
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
    showToast('Catalog refreshed with pre-indexed Walmart food items.');
  };

  // Handler: When a new recipe is parsed or generated
  const handleRecipeCreated = (newRecipe: Recipe) => {
    const sanitized: Recipe = {
      ...newRecipe,
      ingredients: newRecipe.ingredients.map(sanitizeIngredientUrls),
    };
    setRecipes((prev) => [sanitized, ...prev]);
    setSelectedRecipeId(sanitized.id);
    showToast(`Recipe "${sanitized.title}" matched with Walmart food inventory!`);
  };

  // Handler: Update existing recipe
  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    const sanitized: Recipe = {
      ...updatedRecipe,
      ingredients: updatedRecipe.ingredients.map(sanitizeIngredientUrls),
    };
    setRecipes((prev) =>
      prev.map((r) => (r.id === sanitized.id ? sanitized : r))
    );
  };

  // Handler: Apply substitution to ingredient
  const handleApplySubstitution = (ingredientId: string, sub: SubstitutionOption) => {
    if (!selectedRecipe) return;
    const match = matchWalmartGroceryItem(sub.name);
    const updatedIngredients = selectedRecipe.ingredients.map((ing) => {
      if (ing.id === ingredientId) {
        const isGV = sub.isGreatValue || sub.name.toLowerCase().includes('great value') || match.brand === 'Great Value';
        return {
          ...ing,
          itemId: sub.itemId || match.itemId,
          name: sub.name || match.name,
          walmartQuery: sub.walmartQuery || match.walmartQuery,
          walmartSearchUrl: sub.walmartSearchUrl || match.walmartSearchUrl,
          walmartDirectAddUrl: sub.walmartDirectAddUrl || match.walmartSearchUrl,
          estimatedPrice: sub.estimatedPrice || match.estimatedPrice,
          packageSize: match.packageSize,
          category: match.category,
          brandTier: (isGV ? 'great_value' : ing.brandTier) as any,
        };
      }
      return ing;
    });

    handleUpdateRecipe({
      ...selectedRecipe,
      ingredients: updatedIngredients,
    });
    showToast(`Applied verified food substitution: "${sub.name || match.name}"`);
  };

  // Filtered recipes
  const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.cuisine)))];
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 border border-slate-700 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium leading-snug">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Universal Top Bar */}
      <Header
        cartItemCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRecipeInput={() => {
          setRecipeInputTab('paste');
          setIsRecipeInputOpen(true);
        }}
        onOpenDefaultSelectionSettings={() => setIsDefaultSelectionOpen(true)}
        onNavigateSection={(id) => {
          setSelectedRecipeId(null);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {selectedRecipe ? (
          /* Active Recipe Detail View */
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipeId(null)}
            onUpdateRecipe={handleUpdateRecipe}
            onAddAllToCart={handleAddAllToCart}
            onRequestSubstitute={(ing) => setSubstituteIngredient(ing)}
            cartItemIds={cartItemIds}
            onToggleCartItem={handleToggleCartItem}
            onOpenCart={() => setIsCartOpen(true)}
            defaultSelectionSettings={defaultSelectionSettings}
            onOpenDefaultSelectionSettings={() => setIsDefaultSelectionOpen(true)}
          />
        ) : (
          /* Storefront & Catalog View */
          <>
            {/* Hero Section */}
            <Hero
              onOpenRecipeInput={(tab = 'paste') => {
                setRecipeInputTab(tab);
                setIsRecipeInputOpen(true);
              }}
              onExploreRecipes={() => {
                const el = document.getElementById('recipes-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              totalRecipesCount={recipes.length}
            />

            {/* Featured Recipes Section */}
            <section id="recipes-catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#0071DC]" />
                    <span>Verified Walmart Grocery Inventory</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Recipes Pre-Matched with Walmart Food Items
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Every ingredient is pre-indexed and linked to authentic Walmart supermarket items. Auto-add to your cart in 1 click.
                  </p>
                </div>

                {/* Search & Import buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative min-w-[220px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search recipes or food ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-blue-600 shadow-2xs"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setRecipeInputTab('paste');
                      setIsRecipeInputOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0071DC] hover:bg-[#005bb5] rounded-xl shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import Recipe</span>
                  </button>

                  <button
                    onClick={handleResetToVerifiedRecipes}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl shadow-2xs cursor-pointer whitespace-nowrap hover:bg-slate-50"
                    title="Reload pre-indexed verified Walmart food catalog"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-400" />
                    <span>Refresh Catalog</span>
                  </button>
                </div>
              </div>

              {/* Cuisine Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs no-scrollbar">
                {cuisines.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCuisine(c)}
                    className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCuisine === c
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Recipe Cards Grid */}
              {filteredRecipes.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-base font-semibold text-slate-900">No recipes matched your search</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Try another search keyword, or import a new recipe using the button below.
                  </p>
                  <button
                    onClick={() => {
                      setRecipeInputTab('paste');
                      setIsRecipeInputOpen(true);
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0071DC] hover:bg-[#005bb5] rounded-lg shadow-sm cursor-pointer"
                  >
                    Import Custom Recipe
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => {
                    const isAllAdded =
                      recipe.ingredients.length > 0 &&
                      recipe.ingredients.every((i) => i.inPantry || cartItemIds.has(i.id));

                    return (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onSelect={(r) => setSelectedRecipeId(r.id)}
                        onAddAllToCart={handleAddAllToCart}
                        isAddedToCart={isAllAdded}
                      />
                    );
                  })}
                </div>
              )}
            </section>

            {/* How It Works Section */}
            <HowItWorks />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">CartCraft</span>
            <span aria-hidden="true">·</span>
            <span>Recipe to Walmart Grocery Shopper</span>
            <span aria-hidden="true">·</span>
            <span>Pre-indexed Walmart supermarket items for guaranteed food accuracy</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.walmart.com/cart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <span>Walmart Cart</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.walmart.com/grocery"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <span>Walmart Grocery</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Recipe Input Modal (Paste / AI / Manual) */}
      <RecipeInputModal
        isOpen={isRecipeInputOpen}
        onClose={() => setIsRecipeInputOpen(false)}
        onRecipeCreated={handleRecipeCreated}
        initialTab={recipeInputTab}
      />

      {/* Walmart Master Cart Drawer */}
      <WalmartCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveRecipeItems={handleRemoveRecipeFromCart}
        onAddCustomItem={handleAddCustomCartItem}
        onClearCart={handleClearCart}
      />

      {/* Ingredient Substitution Modal */}
      <SubstituteModal
        isOpen={Boolean(substituteIngredient)}
        ingredient={substituteIngredient}
        onClose={() => setSubstituteIngredient(null)}
        onApplySubstitution={handleApplySubstitution}
      />

      {/* Global Default Ingredient Selection Modal (Applies to all pre-made and custom recipes) */}
      <DefaultSelectionModal
        isOpen={isDefaultSelectionOpen}
        settings={defaultSelectionSettings}
        onClose={() => setIsDefaultSelectionOpen(false)}
        onSaveSettings={handleSaveDefaultSelectionSettings}
      />
    </div>
  );
}
