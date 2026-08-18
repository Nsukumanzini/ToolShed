import React from 'react';
import {
  Layers,
  Clock,
  Wrench,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { ProjectKit, ToolItem } from '../types';

interface ProjectKitsViewProps {
  projectKits: ProjectKit[];
  tools: ToolItem[];
  onSelectKit: (kit: ProjectKit) => void;
  onSelectTool: (tool: ToolItem) => void;
}

export const ProjectKitsView: React.FC<ProjectKitsViewProps> = ({
  projectKits,
  tools,
  onSelectKit,
  onSelectTool,
}) => {
  return (
    <div className="space-y-8 text-left py-4">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-400 inline-flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Curated South African Project Kits
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Stop Guessing Which Tools You Need.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every kit bundles the exact equipment, blade sizes, and accessories required for South African renovations, loadshedding backups, and braai pergolas with step-by-step guides and up to <strong>20% bundle discounts</strong>.
          </p>
        </div>
      </div>

      {/* Grid of Project Kits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectKits.map((kit) => {
          const kitTools = tools.filter((t) => kit.toolIds.includes(t.id));
          const totalOriginalDaily = kitTools.reduce((acc, t) => acc + t.dailyRate, 0);
          const bundleDaily = Math.round(totalOriginalDaily * (1 - kit.bundleDiscountPercent / 100));

          return (
            <div
              key={kit.id}
              onClick={() => onSelectKit(kit)}
              className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Kit Image Header */}
              <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                <img
                  src={kit.image}
                  alt={kit.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-900/90 text-amber-400 backdrop-blur-sm border border-stone-700">
                    {kit.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900/80 text-white backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {kit.estimatedDuration}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5">
                    {kit.category} Project
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {kit.title}
                  </h3>
                </div>
              </div>

              {/* Kit Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                  {kit.description}
                </p>

                {/* Included Tools Pills */}
                <div>
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                    Included Equipment ({kitTools.length} Tools):
                  </span>
                  <div className="space-y-1.5">
                    {kitTools.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs"
                      >
                        <span className="font-semibold text-stone-800 truncate">{t.title}</span>
                        <span className="text-stone-500 font-mono shrink-0 ml-2">R{t.dailyRate}/day</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Materials You Supply:
                  </span>
                  <p className="text-xs text-stone-600 truncate">
                    {kit.materialsList.slice(0, 2).join(' • ')}...
                  </p>
                </div>

                {/* Pricing & CTA in ZAR */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-stone-900 font-heading">
                        R{bundleDaily}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        R{totalOriginalDaily}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ day bundle</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Save {kit.bundleDiscountPercent}% bundle discount
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectKit(kit)}
                    className="bg-stone-900 group-hover:bg-amber-500 group-hover:text-stone-950 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
