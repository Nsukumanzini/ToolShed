import React from 'react';
import { Repeat, Leaf, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CommunityImpact } from '../types';

interface CommunityStatsBannerProps {
  metrics: CommunityImpact;
  openProtectionModal: () => void;
}

export const CommunityStatsBanner: React.FC<CommunityStatsBannerProps> = ({
  metrics,
  openProtectionModal,
}) => {
  return (
    <div className="bg-stone-100 border-b border-stone-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          {/* Stat 1: Total Saved in ZAR */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-black text-base">
              R
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
                R{(metrics.totalSavedRands / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Saved By Borrowers
              </p>
            </div>
          </div>

          {/* Stat 2: Tools Shared */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Repeat className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
                {metrics.toolsSharedCount.toLocaleString()}+
              </p>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Tool Loans in SA
              </p>
            </div>
          </div>

          {/* Stat 3: CO2 Saved */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
                {(metrics.co2EmissionsSavedKg / 1000).toFixed(1)}k kg
              </p>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                CO₂ Emissions Offset
              </p>
            </div>
          </div>

          {/* Stat 4: Active Community */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
                {metrics.activeCommunityMembers.toLocaleString()}
              </p>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Mzansi Members
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
