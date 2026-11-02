import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, ExternalLink, Loader2, Check } from 'lucide-react';
import { Ingredient, SubstitutionOption } from '../types';
import { getIngredientSubstitutions } from '../services/api';

interface SubstituteModalProps {
  isOpen: boolean;
  ingredient: Ingredient | null;
  onClose: () => void;
  onApplySubstitution: (ingredientId: string, sub: SubstitutionOption) => void;
}

export const SubstituteModal: React.FC<SubstituteModalProps> = ({
  isOpen,
  ingredient,
  onClose,
  onApplySubstitution,
}) => {
  const [reason, setReason] = useState<'budget' | 'dairy_free' | 'healthy' | 'out_of_stock'>('budget');
  const [substitutions, setSubstitutions] = useState<SubstitutionOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && ingredient) {
      loadSubstitutions();
    }
  }, [isOpen, ingredient, reason]);

  const loadSubstitutions = async () => {
    if (!ingredient) return;
    setIsLoading(true);
    try {
      const results = await getIngredientSubstitutions(ingredient.name, reason);
      setSubstitutions(results);
    } catch (err) {
      console.error(err);
      // Fallback
      setSubstitutions([
        {
          name: `Great Value Alternative for ${ingredient.name}`,
          explanation: 'Standard affordable Walmart store brand replacement.',
          walmartQuery: `Great Value ${ingredient.name}`,
          walmartSearchUrl: `https://www.walmart.com/search?q=Great%20Value%20${encodeURIComponent(ingredient.name)}`,
          estimatedPrice: Math.max(0.98, ingredient.estimatedPrice * 0.8),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !ingredient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Walmart Substitutions for &quot;{ingredient.name}&quot;
              </h3>
              <p className="text-xs text-slate-500">
                Current estimate: ${ingredient.estimatedPrice.toFixed(2)} ({ingredient.walmartQuery})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reason Selector */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Reason for substitution:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'budget', label: 'Save Money ($)' },
                { id: 'healthy', label: 'Healthier / Lean' },
                { id: 'dairy_free', label: 'Dairy / Plant Free' },
                { id: 'out_of_stock', label: 'Out of Stock' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setReason(item.id as any)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer text-center ${
                    reason === item.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3 pt-2">
            {isLoading ? (
              <div className="py-8 flex flex-col items-center justify-center text-slate-500 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-xs font-medium">Finding Walmart substitutions...</span>
              </div>
            ) : substitutions.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No substitutions found.
              </p>
            ) : (
              substitutions.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{sub.name}</span>
                      <span className="font-mono font-bold text-xs text-slate-900 tabular-nums">
                        ${sub.estimatedPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {sub.explanation}
                    </p>
                    <div className="text-[11px] text-blue-600 font-mono truncate mt-1">
                      Walmart Match: {sub.walmartQuery}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={sub.walmartSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Preview on Walmart.com"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        onApplySubstitution(ingredient.id, sub);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#0071DC] hover:bg-[#005bb5] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Swap in Recipe</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
