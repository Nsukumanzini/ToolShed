import React, { useState } from 'react';
import {
  ShoppingBag,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  Download,
  Heart,
  MessageSquare,
  Wrench,
  Search,
  ChevronRight,
  ExternalLink,
  Zap,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Phone,
  FileText,
  User,
} from 'lucide-react';
import { BookingRequest, ToolItem, UserProfile } from '../types';

interface CustomerPortalProps {
  currentUser: UserProfile;
  bookings: BookingRequest[];
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
  onNavigateToExplore: () => void;
  onOpenProtectionModal: () => void;
  onOpenEditProfile?: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  currentUser,
  bookings,
  tools,
  onSelectTool,
  onNavigateToExplore,
  onOpenProtectionModal,
  onOpenEditProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'payments' | 'fica'>('bookings');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all');

  // Customer bookings calculation
  const customerBookings = bookings.length > 0 ? bookings : [
    {
      id: 'bk-erm-9901',
      toolId: 't1',
      borrowerName: currentUser.name,
      borrowerEmail: currentUser.email,
      borrowerPhone: currentUser.phone || '+27 82 734 9102',
      ficaNumber: currentUser.idNumberMasked || '890412••••088',
      startDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      totalDays: 3,
      dayRate: 350,
      totalCost: 1050,
      serviceFee: 126,
      securityDeposit: 1000,
      deliveryOption: 'delivery' as const,
      deliveryFee: 150,
      totalAmount: 2326,
      status: 'confirmed' as const,
      paymentMethod: 'Ozow Instant EFT',
      paymentReference: 'OZOW-ERM-489201',
      ficaVerified: true,
      projectType: 'Ermelo farm timber fence maintenance',
    },
    {
      id: 'bk-erm-9902',
      toolId: 't4',
      borrowerName: currentUser.name,
      borrowerEmail: currentUser.email,
      borrowerPhone: currentUser.phone || '+27 82 734 9102',
      ficaNumber: currentUser.idNumberMasked || '890412••••088',
      startDate: '2025-02-10',
      endDate: '2025-02-12',
      totalDays: 2,
      dayRate: 420,
      totalCost: 840,
      serviceFee: 91,
      securityDeposit: 1200,
      deliveryOption: 'pickup' as const,
      deliveryFee: 0,
      totalAmount: 2131,
      status: 'completed' as const,
      paymentMethod: 'Capitec Pay',
      paymentReference: 'CAP-ERM-118274',
      ficaVerified: true,
      projectType: 'Commercial paving cleaning before winter',
    }
  ];

  const totalSpentZAR = customerBookings.reduce((acc, b) => acc + b.totalAmount, 0);
  const activeRentalsCount = customerBookings.filter((b) => b.status === 'confirmed').length;

  return (
    <div className="space-y-6 text-left py-4 animate-in fade-in duration-200">
      {/* Customer Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-400 inline-flex items-center gap-1.5 uppercase tracking-wider">
                <ShoppingBag className="w-3.5 h-3.5" />
                Customer Hub
              </span>
              {currentUser.ficaVerified && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  FICA Verified
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Track your active equipment rentals, delivery schedules, security deposits, and invoices in one central dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenEditProfile && (
              <button
                onClick={onOpenEditProfile}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Profile</span>
              </button>
            )}
            <button
              onClick={onNavigateToExplore}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-5 py-2.5 rounded-xl text-xs font-black tracking-wide flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Browse Equipment</span>
            </button>
            <button
              onClick={onOpenProtectionModal}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2.5 rounded-xl text-xs font-bold border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Damage Guarantee</span>
            </button>
          </div>
        </div>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-800 text-xs">
          <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/80">
            <span className="text-stone-400 block text-[11px]">Active Rentals</span>
            <span className="text-lg font-black text-amber-400 font-heading">{activeRentalsCount} Tools</span>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/80">
            <span className="text-stone-400 block text-[11px]">Total Equipment Hires</span>
            <span className="text-lg font-black text-white font-heading">{customerBookings.length} Bookings</span>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/80">
            <span className="text-stone-400 block text-[11px]">Total Spent (ZAR)</span>
            <span className="text-lg font-black text-emerald-400 font-heading">R{totalSpentZAR.toLocaleString()}</span>
          </div>
          <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/80">
            <span className="text-stone-400 block text-[11px]">Deposit Protection</span>
            <span className="text-lg font-black text-white font-heading">100% Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'bookings'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>My Rentals & Bookings ({customerBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('fica')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'fica'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>FICA & ID Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'saved'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Saved Tools & Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'payments'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Invoices & Payments (ZAR)</span>
        </button>
      </div>

      {/* TAB CONTENT: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900">Your Equipment Hires</h3>
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setSelectedStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedStatusFilter === 'all' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatusFilter('active')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedStatusFilter === 'active' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setSelectedStatusFilter('completed')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedStatusFilter === 'completed' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {customerBookings
              .filter((b) => selectedStatusFilter === 'all' || (selectedStatusFilter === 'active' ? b.status === 'confirmed' : b.status === 'completed'))
              .map((b) => {
                const tool = tools.find((t) => t.id === b.toolId) || tools[0];

                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={tool.images[0]}
                        alt={tool.title}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {b.status === 'confirmed' ? 'Active Hire' : 'Returned & Completed'}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">Ref: {b.id}</span>
                        </div>

                        <h4 className="text-sm sm:text-base font-black text-stone-900 hover:text-amber-600 transition-colors cursor-pointer" onClick={() => onSelectTool(tool)}>
                          {tool.title}
                        </h4>

                        <p className="text-xs text-stone-500 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>Owner: {tool.owner.name} • {tool.location.neighborhood}, {tool.location.city}</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            {b.startDate} to {b.endDate} ({b.totalDays} days)
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-stone-900">
                            {b.deliveryOption === 'delivery' ? (
                              <span className="text-amber-700 flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5" />
                                Direct Delivery (R{b.deliveryFee})
                              </span>
                            ) : (
                              'Self Pickup at Owner Yard'
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Price & Actions */}
                    <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                      <div className="md:text-right">
                        <span className="text-xs text-stone-500 block">Total Paid (ZAR):</span>
                        <span className="text-xl font-black text-stone-900 font-heading">
                          R{b.totalAmount.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-stone-400 block">
                          Includes R{b.securityDeposit} refundable deposit
                        </span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => onSelectTool(tool)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                        >
                          View Tool
                        </button>
                        <a
                          href={`tel:${tool.owner.id === 'owner-me' ? '+27821234567' : '+27827349102'}`}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Contact Owner</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: FICA VERIFICATION */}
      {activeTab === 'fica' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                South African Regulatory Compliance
              </span>
              <h3 className="text-xl font-black text-stone-900 font-heading mt-1">
                FICA & RSA Identity Verification
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                To prevent fraud and protect equipment across Ermelo and Mpumalanga, all borrowers and lenders are FICA verified.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Account Status</span>
                <span className="text-sm font-black text-emerald-700">FICA VERIFIED & ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Registered Identity Details
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Full Legal Name</span>
                  <span className="font-bold text-stone-900">{currentUser.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">RSA ID / Passport #</span>
                  <span className="font-mono font-bold text-stone-900">{currentUser.idNumber || '890412 5089 088'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Contact Number</span>
                  <span className="font-bold text-stone-900">{currentUser.phone || '+27 82 734 9102'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Residential City / Area</span>
                  <span className="font-bold text-stone-900">{currentUser.city || 'Ermelo, Mpumalanga'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Verified Safety Checklist
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>South African Home Affairs ID confirmation passed</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Proof of residential address validated</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant EFT / Bank Account Verification (Ozow & Capitec)</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ToolShed Damage Protection Guarantee active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SAVED TOOLS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900">Saved Tools for Upcoming Projects</h3>
            <span className="text-xs text-stone-500">3 Saved</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tools.slice(0, 3).map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img src={tool.images[0]} alt={tool.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-stone-900/80 text-amber-400 text-xs font-bold backdrop-blur-sm">
                    R{tool.dailyRate}/day
                  </span>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      {tool.category}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{tool.title}</h4>
                    <p className="text-xs text-stone-500">{tool.location.neighborhood}, {tool.location.city}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTool(tool);
                    }}
                    className="w-full py-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PAYMENTS & INVOICES */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-lg font-black text-stone-900 font-heading">
                Payment History & Tax Invoices (ZAR)
              </h3>
              <p className="text-xs text-stone-500">
                All transactions processed in South African Rands with VAT breakdown.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600">Total Invoiced:</span>
              <span className="text-lg font-black text-stone-900 font-mono font-heading">
                R{totalSpentZAR.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {customerBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">Invoice #{b.id.toUpperCase()}</span>
                    <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-mono text-[10px]">
                      {b.paymentMethod}
                    </span>
                  </div>
                  <p className="text-stone-500">
                    Rental Period: {b.startDate} to {b.endDate} • Payment Ref: {b.paymentReference}
                  </p>
                  <p className="text-stone-500">
                    Rental Subtotal: R{b.totalCost} • Platform Fee: R{b.serviceFee} • Security Deposit: R{b.securityDeposit}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-base font-black text-stone-900 font-mono">
                    R{b.totalAmount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => alert(`Downloading South African Tax Invoice for ${b.id}...`)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
