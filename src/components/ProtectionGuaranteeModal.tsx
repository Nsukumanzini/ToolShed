import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, HeartHandshake, AlertCircle, Wrench } from 'lucide-react';

interface ProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProtectionGuaranteeModal: React.FC<ProtectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-900 to-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Peace of Mind Guarantee
              </span>
              <h3 className="text-xl font-black font-heading">
                ToolShed Damage Protection Guarantee
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700 flex-1">
          <p className="leading-relaxed text-stone-600">
            Every equipment rental facilitated through ToolShed SA is backed by our comprehensive Damage Guarantee. 
            We protect lenders against accidental damage or non-return, and we protect borrowers with pre-inspected equipment quality.
          </p>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Damage Guaranteed</h4>
              <p className="text-xs text-stone-500">
                Full replacement value coverage for damaged or unreturned equipment.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">FICA ID Verified</h4>
              <p className="text-xs text-stone-500">
                Every borrower undergoes South African ID and contact verification before booking.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Dedicated Mediation</h4>
              <p className="text-xs text-stone-500">
                Local Ermelo-based resolution team to quickly resolve any equipment disputes.
              </p>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              What Is Covered:
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Accidental drops, motor burnouts, internal gear stripping during normal project usage.</span>
              </div>
              <div className="flex items-start gap-2 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Non-return or loss during the active rental window.</span>
              </div>
              <div className="flex items-start gap-2 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant EFT payout directly to South African bank accounts (FNB, Standard Bank, Capitec, Nedbank, Absa) within 48 hours of claim approval.</span>
              </div>
            </div>
          </div>

          {/* Claim Process */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>How To File A Claim (Under 5 Minutes)</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Take photos upon return and report the incident in your Seller Console within 48 hours of hire completion. Our claims team in Ermelo processes claims swiftly.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
