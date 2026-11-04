import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenRecipeInput: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenRecipeInput,
  onNavigateSection,
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
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
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
          <a
            href="https://www.walmart.com/cp/groceries/976759"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Walmart Grocery
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
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
