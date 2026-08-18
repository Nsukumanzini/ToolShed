import React from 'react';
import {
  Sparkles,
  Shield,
  Zap,
  Truck,
} from 'lucide-react';
import { CategoryType } from '../types';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (c: CategoryType) => void;
  onExploreProjects?: () => void;
  onListTool?: () => void;
}

const POPULAR_SEARCHES = [
  'Sliding Mitre Saw',
  'Kärcher Pressure Washer',
  'Petrol Chainsaw',
  '6kVA Generator',
  'EcoFlow Power Station',
  'Demolition Jackhammer',
  'Plate Compactor',
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onExploreProjects,
  onListTool,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white border-b border-stone-800">
      {/* Subtle industrial grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <div className="max-w-3xl space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Mpumalanga Equipment & Tool Rental Network
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-stone-100">
            Why buy expensive equipment when you can{' '}
            <span className="text-amber-400 underline decoration-amber-500/40 decoration-wavy decoration-2">
              hire from local owners?
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            ToolShed connects tool owners, plant hire yards, and contractors with local DIYers, homeowners, and agricultural enterprises across Ermelo, Secunda, Bethal, and Mpumalanga. 
            Save up to 80% on project equipment or earn consistent revenue from your equipment fleet.
          </p>

          {/* Quick trust badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-stone-300">
            <div className="flex items-center gap-1.5 bg-stone-800/80 px-2.5 py-1.5 rounded-lg border border-stone-700/60">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Damage Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-800/80 px-2.5 py-1.5 rounded-lg border border-stone-700/60">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Delivery Available</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-800/80 px-2.5 py-1.5 rounded-lg border border-stone-700/60">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>FICA ID Verified Lenders</span>
            </div>
          </div>

          {/* Popular quick search chips */}
          <div className="pt-2">
            <span className="text-xs text-stone-400 font-semibold mr-2">Popular in Mpumalanga:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 px-2.5 py-1 rounded-full border border-stone-700 transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
