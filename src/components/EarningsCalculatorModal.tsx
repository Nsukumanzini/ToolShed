import React, { useState } from 'react';
import { X, Sparkles, DollarSign, Calculator, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';

interface EarningsCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartListing: () => void;
}

const POPULAR_TOOL_PRESETS = [
  { name: 'DeWalt 305mm Sliding Mitre Saw', rate: 350, origCost: 8500, estDays: 6 },
  { name: 'Kärcher 180 Bar Pressure Washer', rate: 420, origCost: 9200, estDays: 7 },
  { name: 'Husqvarna 55.5cc Petrol Chainsaw', rate: 380, origCost: 11500, estDays: 5 },
  { name: 'Yamaha 6.0kVA Petrol Generator', rate: 490, origCost: 18000, estDays: 8 },
  { name: 'EcoFlow 2.4kW Solar Generator', rate: 460, origCost: 24000, estDays: 8 },
  { name: 'Makita 19kg Demolition Jackhammer', rate: 480, origCost: 14000, estDays: 5 },
];

export const EarningsCalculatorModal: React.FC<EarningsCalculatorModalProps> = ({
  isOpen,
  onClose,
  onStartListing,
}) => {
  if (!isOpen) return null;

  const [dailyRate, setDailyRate] = useState(380);
  const [daysPerMonth, setDaysPerMonth] = useState(6);
  const [origToolCost, setOrigToolCost] = useState(8500);

  const monthlyGross = dailyRate * daysPerMonth;
  const yearlyGross = monthlyGross * 12;
  const monthsToPayoff = origToolCost > 0 ? (origToolCost / monthlyGross).toFixed(1) : '1.0';

  const selectPreset = (preset: typeof POPULAR_TOOL_PRESETS[0]) => {
    setDailyRate(preset.rate);
    setDaysPerMonth(preset.estDays);
    setOrigToolCost(preset.origCost);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Mpumalanga Equipment ROI Estimator
              </span>
              <h3 className="text-xl font-black font-heading">
                How Much Can Your Equipment Earn in Rands?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700 flex-1">
          {/* Quick Presets */}
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Select a Typical Equipment Preset:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TOOL_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => selectPreset(p)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between font-bold text-stone-900 text-xs">
                <span>Daily Rental Price (ZAR)</span>
                <span className="text-amber-800 font-mono text-sm font-black">R{dailyRate}/day</span>
              </div>
              <input
                type="range"
                min={150}
                max={1500}
                step={25}
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <p className="text-[11px] text-stone-500">Most power tools in Mpumalanga rent between R250 and R600/day</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between font-bold text-stone-900 text-xs">
                <span>Days Rented Per Month</span>
                <span className="text-amber-800 font-mono text-sm font-black">{daysPerMonth} days/mo</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <p className="text-[11px] text-stone-500">Just 2 weekend DIY or farm loans easily equals 4–6 days</p>
            </div>
          </div>

          {/* Big Highlight Earnings Card in ZAR */}
          <div className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl text-stone-950 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-600/30 pb-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                  Projected Monthly Rand Earnings
                </p>
                <p className="text-4xl sm:text-5xl font-black font-heading tracking-tight">
                  R{monthlyGross.toLocaleString()}
                  <span className="text-sm font-bold text-stone-900"> / month</span>
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs font-bold text-stone-900 uppercase">Annual Potential</p>
                <p className="text-2xl font-black font-heading">R{yearlyGross.toLocaleString()} / year</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1 font-semibold">
              <div className="bg-amber-400/40 p-2.5 rounded-xl">
                <span className="block text-stone-900 font-normal text-[11px]">Tool Payoff Period</span>
                <span className="font-bold text-stone-950 text-sm">~{monthsToPayoff} months</span>
              </div>
              <div className="bg-amber-400/40 p-2.5 rounded-xl">
                <span className="block text-stone-900 font-normal text-[11px]">Damage Protection</span>
                <span className="font-bold text-stone-950 text-sm">Damage Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 hidden sm:inline">Takes under 2 minutes to list in Ermelo</span>
          <button
            onClick={() => {
              onClose();
              onStartListing();
            }}
            className="w-full sm:w-auto bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>List Equipment in Mpumalanga</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
