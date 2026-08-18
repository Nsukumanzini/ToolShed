import React, { useState } from 'react';
import {
  CalendarCheck,
  Wrench,
  DollarSign,
  QrCode,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PlusCircle,
  Truck,
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
} from 'lucide-react';
import { Booking, ToolItem } from '../types';

interface DashboardProps {
  bookings: Booking[];
  myListedTools: ToolItem[];
  onNavigateToBrowse: () => void;
  onNavigateToListTool: () => void;
  onOpenTool: (tool: ToolItem) => void;
  onMarkBookingComplete: (bookingId: string) => void;
}

export const LenderBorrowerDashboard: React.FC<DashboardProps> = ({
  bookings,
  myListedTools,
  onNavigateToBrowse,
  onNavigateToListTool,
  onOpenTool,
  onMarkBookingComplete,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'borrowing' | 'lending'>('borrowing');

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming' || b.status === 'active');
  const completedBookings = bookings.filter((b) => b.status === 'completed');

  // Simulated lender revenue
  const totalLenderEarnings = myListedTools.length * 140 + 70;

  return (
    <div className="space-y-6 text-left py-4">
      {/* Header with Sub-tabs */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Account Activity Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900">
            My Tool Hub & Dashboard
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('borrowing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'borrowing'
                ? 'bg-stone-900 text-amber-400 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            My Rentals ({bookings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('lending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'lending'
                ? 'bg-stone-900 text-amber-400 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Lender Earnings & Gear ({myListedTools.length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: BORROWING (MY RENTALS) */}
      {activeSubTab === 'borrowing' && (
        <div className="space-y-6">
          {/* Active / Upcoming Bookings */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
              Active & Upcoming Pickups ({upcomingBookings.length})
            </h3>

            {upcomingBookings.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
                <Wrench className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="font-bold text-stone-700">No active tool rentals at the moment</p>
                <button
                  onClick={onNavigateToBrowse}
                  className="bg-stone-900 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-500 hover:text-stone-950 transition-colors"
                >
                  Browse Available Tools
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div className="flex gap-3.5">
                      <img
                        src={bk.tool.images[0]}
                        alt={bk.tool.title}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                            {bk.status}
                          </span>
                          <span className="text-xs font-bold text-stone-900 font-mono">
                            #{bk.id}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 truncate mt-1">
                          {bk.tool.title}
                        </h4>
                        <p className="text-xs text-stone-500 font-medium">
                          Owner: {bk.tool.owner.name} ({bk.tool.location.neighborhood})
                        </p>
                      </div>
                    </div>

                    {/* Dates and QR */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Rental Period</span>
                        <span className="font-bold text-stone-900">
                          {bk.startDate} to {bk.endDate} ({bk.days} days)
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-stone-200/60 pt-2">
                        <span className="text-stone-500">Check-in Security Code</span>
                        <span className="font-mono font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          {bk.qrCodeCheckin}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="text-xs">
                        <span className="text-stone-500">Total Paid: </span>
                        <span className="font-bold text-stone-900 font-mono">R{bk.totalPaid}</span>
                      </div>

                      <button
                        onClick={() => onMarkBookingComplete(bk.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Return & Complete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Completed Rentals */}
          {completedBookings.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                Rental History ({completedBookings.length})
              </h3>
              <div className="space-y-2.5">
                {completedBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-stone-900">{bk.tool.title}</h5>
                        <p className="text-stone-500">
                          {bk.startDate} • Total Paid R{bk.totalPaid} • Security deposit refunded
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenTool(bk.tool)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold self-start sm:self-auto cursor-pointer"
                    >
                      Rent Again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: LENDING & EARNINGS */}
      {activeSubTab === 'lending' && (
        <div className="space-y-6">
          {/* Revenue Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-stone-900 text-white rounded-2xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Total Earned to Date (ZAR)
              </span>
              <p className="text-3xl font-black font-heading">R{totalLenderEarnings.toLocaleString()}</p>
              <p className="text-xs text-stone-400">EFT payment deposited directly to bank</p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Listed Tools
              </span>
              <p className="text-3xl font-black font-heading text-stone-900">{myListedTools.length}</p>
              <p className="text-xs text-emerald-700 font-semibold">100% covered by Damage Guarantee</p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Lender Rating
              </span>
              <p className="text-3xl font-black font-heading text-stone-900">5.0 ★</p>
              <p className="text-xs text-stone-500">Top Rated Mzansi Lender</p>
            </div>
          </div>

          {/* Tools Listed by User */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                My Listed Gear
              </h3>
              <button
                onClick={onNavigateToListTool}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List Another Tool</span>
              </button>
            </div>

            {myListedTools.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
                <p className="font-bold text-stone-700">You have not listed any tools yet.</p>
                <button
                  onClick={onNavigateToListTool}
                  className="bg-stone-900 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-500 hover:text-stone-950 transition-colors"
                >
                  List a Tool Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myListedTools.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={t.images[0]}
                        alt={t.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-amber-800 uppercase">{t.category}</span>
                        <h4 className="font-bold text-stone-900 truncate">{t.title}</h4>
                        <p className="text-stone-500 font-semibold">R{t.dailyRate}/day • Deposit: R{t.securityDeposit}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                        Available
                      </span>
                      <button
                        onClick={() => onOpenTool(t)}
                        className="text-stone-600 hover:text-stone-900 text-xs font-semibold underline cursor-pointer"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
