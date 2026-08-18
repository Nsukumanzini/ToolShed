import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Zap,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Share2,
  DollarSign,
  ChevronRight,
  RotateCcw,
  HardHat,
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  onBookNow: (
    tool: ToolItem,
    bookingConfig: {
      days: number;
      startDate: string;
      endDate: string;
      isDelivery: boolean;
      safetyGearIncluded?: boolean;
    }
  ) => void;
  onMessageOwner: (tool: ToolItem) => void;
  openProtectionModal: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  onBookNow,
  onMessageOwner,
  openProtectionModal,
}) => {
  if (!tool) return null;

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [rentalDays, setRentalDays] = useState(2);
  const [deliverySelected, setDeliverySelected] = useState(false);
  const [damageWaiver, setDamageWaiver] = useState(true);
  const [safetyGearSelected, setSafetyGearSelected] = useState(false);

  // Calculate dates
  const today = new Date();
  const startDateStr = today.toISOString().split('T')[0];
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + rentalDays);
  const endDateStr = endDate.toISOString().split('T')[0];

  // Price calculations in ZAR (Rands)
  const isWeekly = rentalDays >= 7;
  const rawSubtotal = tool.dailyRate * rentalDays;
  const discountAmount = isWeekly ? Math.round(rawSubtotal * (tool.weeklyDiscountPercent / 100)) : 0;
  const rentalSubtotal = rawSubtotal - discountAmount;
  const protectionFee = damageWaiver ? Math.round(rentalSubtotal * 0.1) || 45 : 0;
  const serviceFee = Math.round(rentalSubtotal * 0.08) || 30;
  const deliveryFee = deliverySelected && tool.deliveryAvailable ? tool.deliveryFee : 0;
  const safetyGearDailyRate = 45;
  const safetyGearFee = safetyGearSelected ? safetyGearDailyRate * rentalDays : 0;
  const totalAmount = rentalSubtotal + protectionFee + serviceFee + deliveryFee + safetyGearFee;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
              {tool.category}
            </span>
            <span className="text-xs text-stone-500">•</span>
            <span className="text-xs font-mono text-stone-600 font-semibold">{tool.brand} {tool.model}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onMessageOwner(tool)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Owner</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Main Top Grid: Gallery & Quick Booking Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
                <img
                  src={tool.images[selectedImgIdx] || tool.images[0]}
                  alt={tool.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {tool.condition} Condition
                </div>
              </div>

              {tool.images.length > 1 && (
                <div className="flex gap-2">
                  {tool.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImgIdx(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImgIdx === i ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="pt-2">
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                  About this Tool
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Included Accessories */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Included Accessories & Bits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tool.includedAccessories.map((acc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Card & Price Breakdown in ZAR */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-2xl font-black text-stone-900 font-heading">R{tool.dailyRate}</span>
                    <span className="text-xs text-stone-500 font-medium"> / day</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 font-bold text-stone-800 text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>{tool.rating.toFixed(1)}</span>
                      <span className="text-stone-500 font-normal">({tool.reviewsCount} reviews)</span>
                    </div>
                    <span className="text-[11px] text-stone-500">Security deposit: R{tool.securityDeposit}</span>
                  </div>
                </div>

                {/* Duration selector */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">
                    Rental Duration
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 7].map((days) => (
                      <button
                        key={days}
                        onClick={() => setRentalDays(days)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          rentalDays === days
                            ? 'bg-stone-900 text-amber-400 shadow-sm'
                            : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {days === 7 ? '1 Week' : `${days} Day${days > 1 ? 's' : ''}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates Display */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-stone-500" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Pickup Date</p>
                      <p className="font-bold text-stone-800">{startDateStr}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Return Date</p>
                    <p className="font-bold text-stone-800">{endDateStr}</p>
                  </div>
                </div>

                {/* Pickup vs Delivery Toggle */}
                {tool.deliveryAvailable && (
                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                    <label className="text-xs font-bold text-stone-800 block">Fulfillment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDeliverySelected(false)}
                        className={`p-2 rounded-lg text-xs font-semibold text-left transition-all border cursor-pointer ${
                          !deliverySelected
                            ? 'bg-amber-50 border-amber-400 text-stone-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        <p className="font-bold">Self Pickup</p>
                        <p className="text-[10px] text-stone-500 font-normal">{tool.location.neighborhood}, {tool.location.city}</p>
                      </button>

                      <button
                        onClick={() => setDeliverySelected(true)}
                        className={`p-2 rounded-lg text-xs font-semibold text-left transition-all border cursor-pointer ${
                          deliverySelected
                            ? 'bg-amber-50 border-amber-400 text-stone-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        <p className="font-bold">Direct Delivery</p>
                        <p className="text-[10px] text-stone-500 font-normal">+R{tool.deliveryFee} return</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Damage Protection Checkbox */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="damage-waiver"
                    checked={damageWaiver}
                    onChange={(e) => setDamageWaiver(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="damage-waiver" className="text-xs cursor-pointer select-none">
                    <span className="font-bold text-stone-900 flex items-center gap-1">
                      ToolShed SA Guarantee (R{protectionFee})
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Covers accidental drops, wear, and motor burnouts. Damage guaranteed with zero deductible.
                    </span>
                  </label>
                </div>

                {/* Safety Gear Add-on Bundle (Upsell) */}
                <div className={`p-3 rounded-xl border transition-all ${
                  safetyGearSelected
                    ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/20'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="safety-gear-upsell"
                      checked={safetyGearSelected}
                      onChange={(e) => setSafetyGearSelected(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="safety-gear-upsell" className="text-xs cursor-pointer select-none flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5 text-amber-600" />
                          <span>Safety PPE Gear Bundle</span>
                        </span>
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-mono">
                          +R45/day
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                        Recommended for heavy equipment: Includes industrial earmuffs, UV/impact safety goggles, vibration-dampening gloves & protective toe guards.
                      </p>
                    </label>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                  <div className="flex justify-between">
                    <span>R{tool.dailyRate} × {rentalDays} days</span>
                    <span className="font-medium text-stone-900">R{rawSubtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Weekly Discount ({tool.weeklyDiscountPercent}%)</span>
                      <span>-R{discountAmount}</span>
                    </div>
                  )}

                  {damageWaiver && (
                    <div className="flex justify-between">
                      <span>Damage Protection Waiver</span>
                      <span className="font-medium text-stone-900">R{protectionFee}</span>
                    </div>
                  )}

                  {safetyGearSelected && (
                    <div className="flex justify-between text-amber-800 font-medium">
                      <span>Safety PPE Gear Kit (R45 × {rentalDays}d)</span>
                      <span className="font-bold text-stone-900">+R{safetyGearFee}</span>
                    </div>
                  )}

                  {deliverySelected && (
                    <div className="flex justify-between">
                      <span>Direct Delivery & Return Fee</span>
                      <span className="font-medium text-stone-900">R{deliveryFee}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>ToolShed SA Platform Fee</span>
                    <span className="font-medium text-stone-900">R{serviceFee}</span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-stone-900 border-t border-stone-200 pt-2">
                    <span>Total Due Now</span>
                    <span className="font-heading text-lg text-stone-950">R{totalAmount}</span>
                  </div>

                  <p className="text-[10px] text-stone-400 text-center pt-1">
                    *R{tool.securityDeposit} refundable deposit is held and released upon safe return.
                  </p>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() =>
                    onBookNow(tool, {
                      days: rentalDays,
                      startDate: startDateStr,
                      endDate: endDateStr,
                      isDelivery: deliverySelected,
                      safetyGearIncluded: safetyGearSelected,
                    })
                  }
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 py-3 rounded-xl font-black text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-stone-950" />
                  <span>Reserve & Rent Equipment</span>
                </button>
              </div>

              {/* Owner Trust Badge */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={tool.owner.avatar}
                    alt={tool.owner.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/50"
                  />
                  <div>
                    <p className="font-bold text-stone-900 flex items-center gap-1">
                      {tool.owner.name}
                      {tool.owner.ficaVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="FICA Verified" />}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {tool.owner.type} • {tool.owner.completedLends} completed loans • FICA Verified
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {tool.owner.responseTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specs & Safety Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
            {/* Technical Specifications */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                Technical Specifications
              </h4>
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-2">
                {tool.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between text-xs py-1 border-b border-stone-200/60 last:border-0">
                    <span className="text-stone-500">{spec.label}</span>
                    <span className="font-bold text-stone-900 text-right">{spec.value}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs py-1">
                  <span className="text-stone-500">Power Source</span>
                  <span className="font-bold text-stone-900">{tool.powerSource}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-stone-500">Replacement Cost</span>
                  <span className="font-bold text-stone-900">R{tool.replacementValue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Safety & Operation Guidelines */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Safety & Loadshedding Precautions
              </h4>
              <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 space-y-2">
                {tool.safetyGuidelines.map((guide, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-800">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-950 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{guide}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Reviews */}
          {tool.reviews && tool.reviews.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                Recent Borrower Experiences in Mzansi ({tool.reviews.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.avatar} alt={rev.author} referrerPolicy="no-referrer" className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-bold text-stone-900">{rev.author}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-800 font-semibold">Project: {rev.project}</p>
                    <p className="text-stone-600 text-xs italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-stone-400 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
