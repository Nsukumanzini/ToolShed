import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Zap,
  Truck,
  ShieldCheck,
  Battery,
  Flame,
  Plug,
  Clock,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  onSelect: (tool: ToolItem) => void;
  onQuickBook: (tool: ToolItem) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onSelect,
  onQuickBook,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const getPowerIcon = (power: string) => {
    switch (power) {
      case 'Cordless Battery':
        return <Battery className="w-3 h-3 text-emerald-600" />;
      case 'Gasoline / Petrol':
        return <Flame className="w-3 h-3 text-orange-500" />;
      case 'Corded Electric':
        return <Plug className="w-3 h-3 text-blue-500" />;
      default:
        return <Zap className="w-3 h-3 text-stone-500" />;
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col overflow-hidden text-left relative">
      {/* Tool Image Container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelect(tool)}>
        <img
          src={tool.images[currentImageIdx] || tool.images[0]}
          alt={tool.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-900/85 text-white backdrop-blur-sm shadow-sm">
            {getPowerIcon(tool.powerSource)}
            <span>{tool.condition}</span>
          </span>

          <div className="flex items-center gap-1.5">
            {tool.instantBooking && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-400 text-stone-950 shadow-sm flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-stone-950" />
                Instant
              </span>
            )}
            {tool.deliveryAvailable && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-stone-900/80 text-amber-300 backdrop-blur-sm flex items-center gap-1">
                <Truck className="w-2.5 h-2.5" />
                Delivery
              </span>
            )}
          </div>
        </div>

        {/* Multi-image indicators if more than 1 image */}
        {tool.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {tool.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIdx(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIdx === i ? 'bg-amber-400 w-3' : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-medium">
            <span className="text-amber-800 font-bold uppercase tracking-wider text-[10px]">
              {tool.category}
            </span>
            <span className="flex items-center gap-1 text-stone-500 text-[11px]">
              <MapPin className="w-3 h-3 text-stone-400" />
              {tool.location.neighborhood}, {tool.location.city} • {tool.location.distanceKm} km
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(tool)}
            className="text-base font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
          >
            {tool.title}
          </h3>

          {/* Model & Brand */}
          <p className="text-xs text-stone-500 mt-1 font-mono">
            {tool.brand} • {tool.model}
          </p>

          {/* Specs preview pill */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tool.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/80 font-medium"
              >
                {spec.label}: <strong className="text-stone-900">{spec.value}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Owner Info & Pricing */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          {/* Owner strip */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={tool.owner.avatar}
                alt={tool.owner.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover ring-1 ring-stone-200"
              />
              <div className="leading-tight">
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  {tool.owner.name}
                  {tool.owner.ficaVerified && <ShieldCheck className="w-3 h-3 text-emerald-600" title="FICA Verified" />}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 font-bold text-stone-800 text-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{tool.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal text-[11px]">({tool.reviewsCount})</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-stone-900 font-heading">R{tool.dailyRate}</span>
                <span className="text-xs text-stone-500 font-medium">/ day</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold">
                Save {tool.weeklyDiscountPercent}% on weekly hire
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onSelect(tool)}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                title="View specs & details"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => onQuickBook(tool)}
                className="bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>Rent</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
