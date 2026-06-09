import React from 'react';
import { ShieldCheck, Truck, Database, Leaf } from 'lucide-react';
import { PartialMetadata } from '../types/types';

const LABELS: Record<string, string> = {
  nutritionFacts: "Nutrition Facts",
  calories: "Calories",
  totalFat: "Total Fat",
  saturatedFat: "Saturated Fat",
  carbohydrates: "Total Carbohydrates",
  sugars: "Sugars",
  protein: "Protein",
  sodium: "Sodium",
  ingredients: "Ingredients",
  allergens: "Allergens",
  certifications: "Certifications",
  mainIngredients: "Main Ingredients",
  amountPerServing: "Amount Per Serving",
  durabilityLifeSpan: "Durability & Life Span",
  repairability: "Repairability",
  manufacturing: "Manufacturing",
  lifecycleImpact: "Lifecycle Impact",

  // Metadata property keys
  life_span: "Life Span",
  reliability: "Reliability",
  reusability: "Reusability",
  refurbishment: "Refurbishment",
  recycled_content: "Recycled Content",
  ease_of_repair: "Ease of Repair",
  spare_parts: "Spare Parts Availability",
  maintenance_manual: "Maintenance Manual",
  carbon_footprint: "Carbon Footprint",
  water_consumption: "Water Consumption",
  recyclability: "Recyclability",
  facility: "Manufacturing Facility",
  location: "Location",
};

function formatValue(val: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'number') {
    return val % 1 === 0 ? String(val) : val.toFixed(1);
  }
  const str = String(val).trim();
  const match = str.match(/^([\d.]+)\s*([a-zA-Z%]*)$/);
  if (match) {
    const num = Number(match[1]);
    if (!isNaN(num)) {
      const formattedNum = num % 1 === 0 ? String(num) : num.toFixed(1);
      const unit = match[2];
      return unit ? `${formattedNum}${unit}` : formattedNum;
    }
  }
  return str;
}

function label(key: string): string {
  return LABELS[key] || key.replace(/_/g, ' ');
}

interface MetadataInspectorProps {
  metadata: PartialMetadata | null;
}

export function MetadataInspector({ metadata }: MetadataInspectorProps) {
  if (!metadata) return null;

  if (metadata.nutritional_info) {
    const nut = metadata.nutritional_info;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-gray-105 dark:border-slate-800 transition-colors w-full text-left">
        {/* Nutrition Facts Label */}
        <div className="lg:col-span-5 border-4 border-black dark:border-white p-4 font-sans bg-white text-black select-none max-w-sm mx-auto w-full">
          <h2 className="text-2xl font-extrabold tracking-tight text-center leading-none border-b-8 border-black pb-1 uppercase">
            {label('nutritionFacts')}
          </h2>
          <div className="text-xs font-bold mt-1 border-b border-black pb-1 uppercase">{label('amountPerServing')}</div>
          
          <div className="flex justify-between items-baseline py-1 border-b-4 border-black">
            <span className="text-lg font-black uppercase">{label('calories')}</span>
            <span className="text-xl font-extrabold">{formatValue(nut.calories)}</span>
          </div>

          <div className="space-y-1.5 pt-2 text-sm text-black">
            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span><strong>{label('totalFat')}</strong> {formatValue(nut.total_fat)}</span>
            </div>
            {nut.saturated_fat && (
              <div className="flex justify-between border-b border-gray-300 pb-1 pl-4">
                <span>{label('saturatedFat')} {formatValue(nut.saturated_fat)}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span><strong>{label('carbohydrates')}</strong> {formatValue(nut.carbohydrates)}</span>
            </div>
            {nut.sugars && (
              <div className="flex justify-between border-b border-gray-300 pb-1 pl-4">
                <span>{label('sugars')} {formatValue(nut.sugars)}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span><strong>{label('protein')}</strong> {formatValue(nut.protein)}</span>
            </div>
            {nut.sodium && (
              <div className="flex justify-between border-b border-black pb-1">
                <span><strong>{label('sodium')}</strong> {formatValue(nut.sodium)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients & Allergens List */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
          {/* Ingredients */}
          {nut.ingredients && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{label('ingredients')}</h4>
              <p className="text-sm font-bold text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800/40 p-4 rounded-xl border border-gray-100/50 dark:border-slate-800/40">
                {Array.isArray(nut.ingredients) ? nut.ingredients.join(', ') : nut.ingredients}
              </p>
            </div>
          )}

          {/* Main Ingredients */}
          {nut.main_ingredients && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">{label('mainIngredients')}</h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(nut.main_ingredients) ? nut.main_ingredients : [nut.main_ingredients]).map((item: string, i: number) => (
                  <span key={i} className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens */}
          {nut.allergens && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">{label('allergens')}</h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(nut.allergens) ? nut.allergens : [nut.allergens]).map((allergen: string, i: number) => (
                  <span key={i} className="px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider rounded-xl border border-rose-100 dark:border-rose-900/40">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {nut.certifications && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">{label('certifications')}</h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(nut.certifications) ? nut.certifications : [nut.certifications]).map((cert: string, i: number) => (
                  <span key={i} className="px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider rounded-xl border border-amber-100 dark:border-amber-900/40">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback to sustainability view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <SectionCard
        title={label('durabilityLifeSpan')}
        icon={<ShieldCheck className="w-5 h-5" />}
        color="indigo"
        data={metadata.durability_data}
      />
      <SectionCard
        title={label('repairability')}
        icon={<Truck className="w-5 h-5" />}
        color="blue"
        data={metadata.repairability_data}
      />
      <SectionCard
        title={label('manufacturing')}
        icon={<Database className="w-5 h-5" />}
        color="violet"
        data={metadata.manufacturing_data}
      />
      <SectionCard
        title={label('lifecycleImpact')}
        icon={<Leaf className="w-5 h-5" />}
        color="emerald"
        data={metadata.lifecycle_data}
      />
    </div>
  );
}

function SectionCard({ title, icon, color, data }: { title: string, icon: React.ReactNode, color: string, data?: any }) {
  if (!data) return null;

  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-800",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
  };

  return (
    <div className={`p-6 rounded-[1rem] border ${colorClasses[color] || colorClasses.indigo} transition-all`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white dark:bg-black/20 rounded-xl shadow-sm">
          {icon}
        </div>
        <h4 className="font-black uppercase tracking-widest text-xs">{title}</h4>
      </div>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          if (!value || (typeof value !== 'string' && typeof value !== 'number')) return null;
          return (
            <div key={key} className="flex flex-col">
              <span className="text-[10px] font-black uppercase opacity-50 tracking-tighter mb-0.5">
                {label(key)}
              </span>
              <span className="text-sm font-bold leading-tight">{formatValue(value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
