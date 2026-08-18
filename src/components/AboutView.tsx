import React from 'react';
import {
  Wrench,
  ShieldCheck,
  Leaf,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Award,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

interface AboutViewProps {
  onBrowseTools: () => void;
  onOpenSellerPortal: () => void;
  onOpenProtectionModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onBrowseTools,
  onOpenSellerPortal,
  onOpenProtectionModal,
}) => {
  return (
    <div className="space-y-16 text-left py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-8 sm:p-14 border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Headquartered in Ermelo, Mpumalanga</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
            Empowering Local Builders & Communities Through Shared Equipment
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            ToolShed is South Africa’s trusted online equipment rental marketplace. We connect tool owners, contractors, and plant hire businesses with DIYers, homeowners, and agricultural enterprises across Ermelo and the greater Mpumalanga region.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onBrowseTools}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3.5 rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Available Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSellerPortal}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Partner as a Tool Owner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Philosophy & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
            Our Core Belief
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900">
            Access is More Valuable Than Ownership
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            The average specialty power tool or construction machine is used for fewer than 15 minutes in its total operational lifespan. Meanwhile, homeowners, small builders, and farmers spend exorbitant capital purchasing heavy tools for one-time or occasional use.
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            By encouraging local equipment sharing and maximizing the utilization of existing regional resources, ToolShed eliminates unnecessary equipment idle time, drastically lowers capital costs, reduces e-waste, and creates consistent passive revenue for tool owners.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-2xl font-black font-heading text-stone-900">R1.85M+</span>
              <p className="text-xs font-semibold text-stone-500 mt-0.5">Saved by Mpumalanga Renters</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-2xl font-black font-heading text-emerald-700">28.6 Tonnes</span>
              <p className="text-xs font-semibold text-stone-500 mt-0.5">CO₂ Emissions Prevented</p>
            </div>
          </div>
        </div>

        <div className="bg-stone-900 text-white rounded-3xl p-8 border border-stone-800 space-y-6">
          <h3 className="text-xl font-bold font-heading text-amber-400">
            Why ToolShed Works for Mpumalanga
          </h3>
          <ul className="space-y-4 text-sm text-stone-300">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white font-bold block">Agricultural & Farm Ready</strong>
                Fencing equipment, heavy petrol chainsaws, generators, and concrete tools suited for local rural and farm maintenance.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white font-bold block">Loadshedding & Power Resilience</strong>
                High-capacity pure sine wave inverters, solar generators, and silent battery packs ready for collection or delivery.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white font-bold block">Direct Delivery Across Mpumalanga</strong>
                Equipment delivered directly to your farm gate, job site, or residential address in Ermelo, Secunda, Bethal, and surrounding areas.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust, Security & Compliance */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Trust & Security Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900">
            Built for Total Peace of Mind
          </h2>
          <p className="text-stone-600 text-sm">
            Every transaction and hire request on ToolShed is protected by rigorous compliance and financial safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-stone-900">Comprehensive Damage Guarantee</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every listed tool is protected against accidental damage or loss throughout the entire hire period. Lenders are fully covered with zero deductible.
            </p>
            <button
              onClick={onOpenProtectionModal}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Learn about Damage Guarantee</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-stone-900">FICA & RSA Identity Verification</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Both equipment owners and renters undergo identity validation and proof of address checks to ensure community integrity and accountability.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-stone-900">Secure Escrow & Direct Payouts</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Payments via Ozow Instant EFT and Capitec are securely held until tool inspection is verified. Lenders receive automated direct EFT bank transfers.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Commitment */}
      <div className="p-8 bg-stone-900 text-white rounded-3xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Serving Ermelo & Greater Mpumalanga</span>
          </div>
          <h3 className="text-xl font-bold font-heading">
            Need specialized equipment in Ermelo, Secunda, or Bethal?
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm max-w-xl">
            Our local support team in Ermelo is available Monday to Saturday to assist with tool logistics, contractor plant hire, and custom project requirements.
          </p>
        </div>

        <button
          onClick={onBrowseTools}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs whitespace-nowrap transition-colors cursor-pointer"
        >
          View Equipment Directory
        </button>
      </div>
    </div>
  );
};
