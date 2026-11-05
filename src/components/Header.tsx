import React from 'react';
import { ShoppingBag, SlidersHorizontal, Plus } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenRecipeInput: () => void;
  onOpenQuickAddItems?: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDefaultSelectionSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenRecipeInput,
  onOpenQuickAddItems,
  onNavigateSection,
  onOpenDefaultSelectionSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateSection('recipes-catalog')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-600 transition-colors cursor-pointer text-left"
        >
          CartCraft <span className="text-blue-600">Walmart</span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigateSection('recipes-catalog')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Recipes
          </button>
          <button
            onClick={onOpenRecipeInput}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Import Recipe
          </button>
          {onOpenQuickAddItems && (
            <button
              onClick={onOpenQuickAddItems}
              className="text-[#0071DC] hover:text-[#005bb5] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 bg-blue-50/80 hover:bg-blue-100/80 px-2.5 py-1 rounded-lg border border-blue-200/60"
              title="Add individual ingredients, coffee, pet food, and toiletries directly to cart"
            >
              <Plus className="w-3.5 h-3.5 text-[#0071DC]" />
              <span>+ Quick Add Items & Toiletries</span>
            </button>
          )}
          {onOpenDefaultSelectionSettings && (
            <button
              onClick={onOpenDefaultSelectionSettings}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
              title="Configure default ingredient selection for all recipes"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0071DC]" />
              <span>Ingredient Defaults</span>
            </button>
          )}
          <button
            onClick={onOpenCart}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            Walmart Cart
            {cartItemCount > 0 && (
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigateSection('how-it-works')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            How It Works
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenQuickAddItems && (
            <button
              onClick={onOpenQuickAddItems}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0071DC] bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              title="Add individual ingredients, toiletries, and custom items"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Items / Toiletries</span>
            </button>
          )}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0071DC] hover:bg-[#005bb5] active:scale-98 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Walmart Order ({cartItemCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
