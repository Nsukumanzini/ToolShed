import React from 'react';
import {
  Filter,
  SlidersHorizontal,
  Zap,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';
import { CategoryType, PowerSourceType } from '../types';

export const CATEGORIES: CategoryType[] = [
  'All',
  'Power Tools',
  'Lawn & Garden',
  'Woodworking',
  'Heavy Equipment & Concrete',
  'Loadshedding & Solar',
  'Cleaning & Pressure Washers',
  'Automotive',
  'Plumbing & Electrical',
  'Painting & Drywall',
];

interface ToolFiltersProps {
  selectedCategory: CategoryType;
  setSelectedCategory: (c: CategoryType) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  maxDistance: number;
  setMaxDistance: (d: number) => void;
  selectedPowerSource: string;
  setSelectedPowerSource: (p: string) => void;
  deliveryOnly: boolean;
  setDeliveryOnly: (v: boolean) => void;
  instantBookingOnly: boolean;
  setInstantBookingOnly: (v: boolean) => void;
  ownerTypeFilter: string;
  setOwnerTypeFilter: (t: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const ToolFilters: React.FC<ToolFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  maxDistance,
  setMaxDistance,
  selectedPowerSource,
  setSelectedPowerSource,
  deliveryOnly,
  setDeliveryOnly,
  instantBookingOnly,
  setInstantBookingOnly,
  ownerTypeFilter,
  setOwnerTypeFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  activeFilterCount,
}) => {
  return (
    <div className="space-y-4 text-left">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-900 text-amber-400 shadow-sm ring-1 ring-stone-900'
                : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Controls Row (Sort, Radius, Price, Toggles) */}
      <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Quick filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Instant Booking Toggle */}
          <button
            onClick={() => setInstantBookingOnly(!instantBookingOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-colors border cursor-pointer ${
              instantBookingOnly
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 font-bold'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${instantBookingOnly ? 'text-amber-600 fill-amber-500' : 'text-stone-400'}`} />
            <span>Instant Book</span>
          </button>

          {/* Delivery Available Toggle */}
          <button
            onClick={() => setDeliveryOnly(!deliveryOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-colors border cursor-pointer ${
              deliveryOnly
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 font-bold'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Truck className={`w-3.5 h-3.5 ${deliveryOnly ? 'text-amber-600' : 'text-stone-400'}`} />
            <span>Delivery Available</span>
          </button>

          {/* Max Price in ZAR */}
          <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700">
            <span className="text-stone-500 font-medium">Max Daily:</span>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value={1000}>Any Price</option>
              <option value={350}>Under R350/day</option>
              <option value={500}>Under R500/day</option>
              <option value={700}>Under R700/day</option>
            </select>
          </div>

          {/* Distance in km */}
          <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700">
            <span className="text-stone-500 font-medium">Radius:</span>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value={50}>Within 50 km</option>
              <option value={20}>Within 20 km</option>
              <option value={10}>Within 10 km</option>
              <option value={5}>Within 5 km (Neighbor)</option>
            </select>
          </div>

          {/* Power Source selector */}
          <div className="hidden md:flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700">
            <span className="text-stone-500 font-medium">Power:</span>
            <select
              value={selectedPowerSource}
              onChange={(e) => setSelectedPowerSource(e.target.value)}
              className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All Power Types</option>
              <option value="Cordless Battery">Cordless Battery</option>
              <option value="Corded Electric">Corded Electric (220V)</option>
              <option value="Gasoline / Petrol">Petrol Engine</option>
              <option value="Manual / Hydraulic">Manual / Hydraulic</option>
            </select>
          </div>

          {/* Reset Filters button if any active */}
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-900 px-2 py-1 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Right: Sort By */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-stone-500 font-medium shrink-0">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 font-bold text-stone-900 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Featured & Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="distance">Nearest Distance</option>
          </select>
        </div>
      </div>
    </div>
  );
};
