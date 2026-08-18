import React from 'react';
import {
  X,
  Clock,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ProjectKit, ToolItem } from '../types';

interface ProjectKitModalProps {
  kit: ProjectKit | null;
  tools: ToolItem[];
  onClose: () => void;
  onSelectTool: (tool: ToolItem) => void;
}

export const ProjectKitModal: React.FC<ProjectKitModalProps> = ({
  kit,
  tools,
  onClose,
  onSelectTool,
}) => {
  if (!kit) return null;

  const kitTools = tools.filter((t) => kit.toolIds.includes(t.id));
  const totalOriginalDaily = kitTools.reduce((acc, t) => acc + t.dailyRate, 0);
  const bundleDaily = Math.round(totalOriginalDaily * (1 - kit.bundleDiscountPercent / 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
              {kit.category} Project Blueprint
            </span>
            <span className="text-xs text-stone-500">•</span>
            <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {kit.estimatedDuration}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Hero Banner inside modal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-heading leading-tight">
                {kit.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {kit.description}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-stone-600">
                <span className="bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200 font-semibold text-stone-800">
                  Difficulty: {kit.difficulty}
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
                  {kit.bundleDiscountPercent}% Bundle Savings (ZAR)
                </span>
              </div>
            </div>

            <div className="md:col-span-5 aspect-[16/10] rounded-xl overflow-hidden shadow-md">
              <img src={kit.image} alt={kit.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Tools Required Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Tools Included in this Blueprint ({kitTools.length})
              </h4>
              <span className="text-xs text-stone-500">Rent individually or book bundle</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {kitTools.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={t.images[0]}
                      alt={t.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-stone-900 truncate">{t.title}</h5>
                      <p className="text-[11px] text-stone-500">{t.brand} • R{t.dailyRate}/day</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectTool(t);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-stone-900 hover:text-white border border-stone-300 rounded-lg text-xs font-bold text-stone-800 transition-colors shrink-0 cursor-pointer"
                  >
                    View Tool
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step DIY Roadmap */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Step-by-Step Execution Roadmap
            </h4>
            <div className="space-y-2.5">
              {kit.keySteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-stone-900 text-sm">{step.title}</h5>
                      {step.toolUsed && (
                        <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                          Tool: {step.toolUsed}
                        </span>
                      )}
                    </div>
                    <p className="text-stone-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials Shopping Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Materials You Need to Buy (Hardware / Consumables in SA)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {kit.materialsList.map((mat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-xs text-stone-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Booking Footer Card in ZAR */}
          <div className="p-4 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Full Kit Bundle Reservation (ZAR)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-heading">R{bundleDaily}</span>
                <span className="text-xs text-stone-400 line-through">R{totalOriginalDaily}</span>
                <span className="text-xs text-stone-300">/ day (All {kitTools.length} tools included)</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (kitTools.length > 0) {
                  onClose();
                  onSelectTool(kitTools[0]);
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black px-6 py-3 rounded-xl text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-stone-950" />
              <span>Book Bundle with {kitTools[0]?.title.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
