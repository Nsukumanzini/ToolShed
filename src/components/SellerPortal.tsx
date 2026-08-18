import React, { useState } from 'react';
import {
  Wrench,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ShieldCheck,
  AlertCircle,
  Package,
  CalendarCheck,
  Building2,
  CreditCard,
  QrCode,
  Sparkles,
  Eye,
  SlidersHorizontal,
  LayoutDashboard,
  Truck,
  MessageSquare,
  FileText,
  Settings,
  ArrowRight,
  LogOut,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  DollarSign,
  Send,
  User,
  Store,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { ToolItem, Booking, UserProfile, UserRole } from '../types';

interface SellerPortalProps {
  user: UserProfile;
  myTools: ToolItem[];
  bookings: Booking[];
  onNavigateToListTool: () => void;
  onOpenTool: (tool: ToolItem) => void;
  onAcceptBooking: (bookingId: string) => void;
  onDeclineBooking: (bookingId: string) => void;
  onMarkBookingComplete: (bookingId: string) => void;
  onToggleToolStatus: (toolId: string) => void;
  onExitToMarketplace: () => void;
  onSwitchToCustomerMode: () => void;
  onOpenEditProfile?: () => void;
}

export const SellerPortal: React.FC<SellerPortalProps> = ({
  user,
  myTools,
  bookings,
  onNavigateToListTool,
  onOpenTool,
  onAcceptBooking,
  onDeclineBooking,
  onMarkBookingComplete,
  onToggleToolStatus,
  onExitToMarketplace,
  onSwitchToCustomerMode,
  onOpenEditProfile,
}) => {
  // Navigation within the dedicated Seller Portal
  const [currentSection, setCurrentSection] = useState<
    'overview' | 'fleet' | 'bookings' | 'financials' | 'messages' | 'fica' | 'settings'
  >('overview');

  // Filter state for fleet and bookings
  const [fleetSearch, setFleetSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [selectedBookingForQR, setSelectedBookingForQR] = useState<Booking | null>(null);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState(false);
  const [activeChatThread, setActiveChatThread] = useState<string>('c1');
  const [replyText, setReplyText] = useState('');
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: string; text: string; time: string }[]>([
    { id: '1', sender: 'Pieter Botha (Ermelo)', text: 'Good day! Is the DeWalt mitre saw available with extra timber blades?', time: '09:45 AM' },
    { id: '2', sender: 'You', text: 'Yes Pieter, it is calibrated with a brand new 60-tooth carbide blade.', time: '10:02 AM' },
  ]);

  // Calculations
  const myToolIds = myTools.map((t) => t.id);
  const sellerBookings = bookings.filter(
    (b) =>
      myToolIds.includes(b.toolId) ||
      b.tool.owner.id === user.id ||
      b.tool.owner.name.includes(user.name.split(' ')[0])
  );

  const pendingBookings = sellerBookings.filter((b) => b.status === 'pending');
  const activeBookings = sellerBookings.filter((b) => b.status === 'active');
  const completedBookings = sellerBookings.filter((b) => b.status === 'completed');

  const totalGrossRevenueZAR = sellerBookings
    .filter((b) => b.status === 'active' || b.status === 'completed')
    .reduce((acc, b) => acc + b.totalRental, 0) + 18450;

  const currentPayableBalanceZAR = 6840;

  const handleRequestPayout = () => {
    setPayoutSuccessMsg(true);
    setTimeout(() => {
      setPayoutSuccessMsg(false);
    }, 4000);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'You', text: replyText, time: 'Just now' },
    ]);
    setReplyText('');
  };

  const filteredFleet = myTools.filter(
    (t) =>
      t.title.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      t.brand.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(fleetSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row antialiased font-sans -mt-6 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* 1. DEDICATED SELLER PORTAL SIDEBAR */}
      <aside className="w-full md:w-64 bg-stone-900 border-r border-stone-800 flex flex-col shrink-0">
        {/* Portal Brand Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-md shadow-amber-500/20">
              <Wrench className="w-5 h-5 text-stone-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-white text-base font-heading tracking-tight block">
                ToolShed <span className="text-amber-400">PRO</span>
              </span>
              <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase block">
                Seller Console • SA
              </span>
            </div>
          </div>
        </div>

        {/* Business Profile Summary in Sidebar */}
        <div className="p-4 mx-3 my-3 bg-stone-850 rounded-2xl border border-stone-800 space-y-2">
          <div className="flex items-center gap-2.5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover border border-amber-500/50 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">
                {user.businessName || user.name}
              </h4>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live in Ermelo
              </span>
            </div>
          </div>
          {onOpenEditProfile && (
            <button
              onClick={onOpenEditProfile}
              className="w-full mt-1 py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 rounded-lg text-[11px] font-bold border border-stone-750 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <User className="w-3 h-3 text-amber-400" />
              <span>Edit Personal Details</span>
            </button>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-3 space-y-1 text-xs font-bold">
          <button
            onClick={() => setCurrentSection('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'overview'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Console Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentSection('fleet')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'fleet'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Equipment Fleet</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                currentSection === 'fleet' ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-300'
              }`}
            >
              {myTools.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentSection('bookings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'bookings'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4" />
              <span>Hire Bookings</span>
            </div>
            {pendingBookings.length > 0 && (
              <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-black animate-bounce">
                {pendingBookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentSection('financials')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'financials'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4" />
              <span>Financials & Payouts</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">EFT</span>
          </button>

          <button
            onClick={() => setCurrentSection('messages')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'messages'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries & Dispatch</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentSection('fica')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'fica'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4" />
              <span>FICA & Compliance</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">Verified</span>
          </button>

          <button
            onClick={() => setCurrentSection('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentSection === 'settings'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              <span>Dispatch & Delivery Rules</span>
            </div>
          </button>
        </nav>

        {/* Bottom Sidebar Action to Exit / Switch */}
        <div className="p-4 border-t border-stone-800 space-y-2 text-xs">
          <button
            onClick={onExitToMarketplace}
            className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>Public Marketplace</span>
          </button>

          <button
            onClick={onSwitchToCustomerMode}
            className="w-full py-2 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-stone-200 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer text-[11px]"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch to Customer Mode</span>
          </button>
        </div>
      </aside>

      {/* 2. SELLER CONSOLE MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 bg-stone-900 overflow-y-auto">
        {/* Top Console Bar */}
        <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {currentSection.toUpperCase()}
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Ermelo Branch, Mpumalanga
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToListTool}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Equipment</span>
            </button>

            <button
              onClick={onExitToMarketplace}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span>View Public Store</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT PANELS */}
        <div className="p-6 space-y-8 flex-1 text-left">
          {/* ===================== VIEW 1: OVERVIEW DASHBOARD ===================== */}
          {currentSection === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Executive Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">
                    Gross Earnings (ZAR)
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black font-heading text-white">
                      R{totalGrossRevenueZAR.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      +18.4% this month
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">Includes direct EFT settlements</p>
                </div>

                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">
                    Available For EFT Payout
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black font-heading text-amber-400 font-mono">
                      R{currentPayableBalanceZAR.toLocaleString()}
                    </span>
                    <button
                      onClick={handleRequestPayout}
                      className="text-[10px] bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-2.5 py-1 rounded transition-colors cursor-pointer"
                    >
                      Withdraw
                    </button>
                  </div>
                  {payoutSuccessMsg ? (
                    <p className="text-[11px] text-emerald-400 font-bold animate-pulse">
                      EFT request submitted to FNB!
                    </p>
                  ) : (
                    <p className="text-[11px] text-stone-500">Auto-payout scheduled for Friday</p>
                  )}
                </div>

                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">
                    Active Hires in Mpumalanga
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black font-heading text-white">
                      {activeBookings.length}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">100% On Schedule</span>
                  </div>
                  <p className="text-[11px] text-stone-500">Covered by Damage Guarantee</p>
                </div>

                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">
                    Total Listed Fleet
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black font-heading text-white">
                      {myTools.length} Units
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold">85% Utilization</span>
                  </div>
                  <p className="text-[11px] text-stone-500">Ermelo & Secunda yards</p>
                </div>
              </div>

              {/* Pending Approvals Alert Banner */}
              {pendingBookings.length > 0 && (
                <div className="p-5 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {pendingBookings.length} New Tool Hire Request awaiting your confirmation
                      </h4>
                      <p className="text-xs text-stone-300">
                        Borrower Pieter Botha requested DeWalt Mitre Saw with site delivery in De Bruin Park, Ermelo.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentSection('bookings')}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-4 py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
                  >
                    Review Request
                  </button>
                </div>
              )}

              {/* Grid of Quick Operations & Recent Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings Feed */}
                <div className="lg:col-span-2 bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                      Recent Hire Bookings & Status
                    </h3>
                    <button
                      onClick={() => setCurrentSection('bookings')}
                      className="text-xs text-amber-400 font-bold hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sellerBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 bg-stone-900 rounded-xl border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.tool.images[0]}
                            alt={booking.tool.title}
                            className="w-12 h-12 rounded-lg object-cover border border-stone-700 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-white block truncate max-w-[200px]">
                              {booking.tool.title}
                            </span>
                            <span className="text-stone-400 text-[11px]">
                              {booking.renterName} • {booking.startDate} to {booking.endDate} ({booking.days} days)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              booking.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : booking.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-stone-800 text-stone-400'
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span className="font-black text-white font-mono text-sm">
                            R{booking.totalRental}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regional Mpumalanga Dispatch Summary */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                    Mpumalanga Dispatch Hub
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>Ermelo Yard</span>
                        <span className="text-emerald-400">Online & Ready</span>
                      </div>
                      <p className="text-stone-400 text-[11px]">
                        Industrial Area, Ermelo • Mon-Sat 07:00-17:30
                      </p>
                    </div>

                    <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>Delivery Vehicle</span>
                        <span className="text-amber-400 font-semibold">Active Dispatch</span>
                      </div>
                      <p className="text-stone-400 text-[11px]">
                        Serving Ermelo, Secunda, Bethal, and Piet Retief radius
                      </p>
                    </div>

                    <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>Damage Guarantee</span>
                        <span className="text-emerald-400">Active Policy</span>
                      </div>
                      <p className="text-stone-400 text-[11px]">
                        100% of listed fleet insured with zero deductible
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 2: FLEET INVENTORY ===================== */}
          {currentSection === 'fleet' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                    Equipment Fleet & Inventory
                  </h2>
                  <p className="text-xs text-stone-400">
                    Manage tool listings, daily rental rates, maintenance logs, and online availability.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search fleet by brand or title..."
                      value={fleetSearch}
                      onChange={(e) => setFleetSearch(e.target.value)}
                      className="bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 w-60"
                    />
                  </div>

                  <button
                    onClick={onNavigateToListTool}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Tool</span>
                  </button>
                </div>
              </div>

              {/* Fleet Table / Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFleet.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between p-4 space-y-4 hover:border-stone-700 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900">
                        <img
                          src={tool.images[0]}
                          alt={tool.title}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            tool.isAvailable
                              ? 'bg-emerald-500/90 text-stone-950'
                              : 'bg-red-500/90 text-white'
                          }`}
                        >
                          {tool.isAvailable ? 'Online / Available' : 'Paused / In Yard'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {tool.category} • {tool.brand}
                        </span>
                        <h4 className="font-bold text-white text-sm line-clamp-1 mt-0.5">
                          {tool.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-850 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-400">Daily Rate:</span>
                        <span className="font-black text-white font-mono text-sm">
                          R{tool.dailyRate} / day
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-400">Security Deposit:</span>
                        <span className="font-semibold text-stone-300 font-mono">
                          R{tool.securityDeposit}
                        </span>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => onToggleToolStatus(tool.id)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            tool.isAvailable
                              ? 'bg-stone-850 hover:bg-stone-800 text-stone-300'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {tool.isAvailable ? 'Pause Listing' : 'Make Active'}
                        </button>

                        <button
                          onClick={() => onOpenTool(tool)}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          View Listing
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== VIEW 3: HIRE BOOKINGS ===================== */}
          {currentSection === 'bookings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                    Hire Bookings & Reservation Requests
                  </h2>
                  <p className="text-xs text-stone-400">
                    Approve incoming reservations, verify QR check-in security codes, and confirm tool returns.
                  </p>
                </div>

                <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
                  <button
                    onClick={() => setBookingStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      bookingStatusFilter === 'all' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                    }`}
                  >
                    All ({sellerBookings.length})
                  </button>
                  <button
                    onClick={() => setBookingStatusFilter('pending')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      bookingStatusFilter === 'pending' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                    }`}
                  >
                    Pending ({pendingBookings.length})
                  </button>
                  <button
                    onClick={() => setBookingStatusFilter('active')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      bookingStatusFilter === 'active' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                    }`}
                  >
                    Active ({activeBookings.length})
                  </button>
                  <button
                    onClick={() => setBookingStatusFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      bookingStatusFilter === 'completed' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                    }`}
                  >
                    Completed ({completedBookings.length})
                  </button>
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {sellerBookings
                  .filter((b) => bookingStatusFilter === 'all' || b.status === bookingStatusFilter)
                  .map((bk) => (
                    <div
                      key={bk.id}
                      className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-850">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                            #{bk.id}
                          </span>
                          <span className="text-xs text-stone-400">
                            Booked on {bk.createdAt}
                          </span>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider self-start sm:self-auto ${
                            bk.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : bk.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          {bk.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="flex items-start gap-3">
                          <img
                            src={bk.tool.images[0]}
                            alt={bk.tool.title}
                            className="w-14 h-14 rounded-xl object-cover border border-stone-800 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold uppercase">
                              {bk.tool.category}
                            </span>
                            <h4 className="font-bold text-white text-sm mt-0.5">
                              {bk.tool.title}
                            </h4>
                            <p className="text-stone-400">R{bk.dailyPrice}/day × {bk.days} days</p>
                          </div>
                        </div>

                        <div className="space-y-1 bg-stone-900 p-3 rounded-xl border border-stone-850">
                          <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                            Borrower Details
                          </span>
                          <p className="font-bold text-white">{bk.renterName}</p>
                          <p className="text-stone-400">{bk.renterPhone || '+27 82 734 9102'}</p>
                          {bk.deliveryAddress && (
                            <p className="text-amber-400 text-[11px] font-medium mt-1">
                              Delivery to: {bk.deliveryAddress}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1 bg-stone-900 p-3 rounded-xl border border-stone-850">
                          <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                            Rental Financials
                          </span>
                          <div className="flex justify-between text-stone-300">
                            <span>Rental Total:</span>
                            <span className="font-bold text-white">R{bk.totalRental}</span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span>Refundable Deposit:</span>
                            <span className="font-mono">R{bk.refundableDeposit}</span>
                          </div>
                          <div className="flex justify-between font-bold text-amber-400 pt-1 border-t border-stone-800">
                            <span>Lender Payout:</span>
                            <span>R{Math.round(bk.totalRental * 0.90)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-850 text-xs">
                        <div className="flex items-center gap-2 text-stone-400">
                          <QrCode className="w-4 h-4 text-amber-400" />
                          <span>Check-in Security Code: </span>
                          <span className="font-mono font-black text-amber-300 bg-stone-900 px-2 py-0.5 rounded">
                            {bk.qrCodeCheckin}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {bk.status === 'pending' && (
                            <>
                              <button
                                onClick={() => onDeclineBooking(bk.id)}
                                className="px-3 py-1.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 font-bold transition-colors cursor-pointer"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => onAcceptBooking(bk.id)}
                                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black transition-colors cursor-pointer"
                              >
                                Accept & Dispatch
                              </button>
                            </>
                          )}

                          {bk.status === 'active' && (
                            <button
                              onClick={() => onMarkBookingComplete(bk.id)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Sign-off & Complete Return</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ===================== VIEW 4: FINANCIALS & PAYOUTS ===================== */}
          {currentSection === 'financials' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                  Financials & South African EFT Payouts
                </h2>
                <p className="text-xs text-stone-400">
                  Track rental settlements, manage linked South African bank accounts, and download VAT invoices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-stone-950 rounded-2xl border border-stone-800 space-y-4">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                    Available Balance
                  </span>
                  <p className="text-3xl font-black font-heading text-amber-400 font-mono">
                    R{currentPayableBalanceZAR.toLocaleString()}
                  </p>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Settlements are processed directly to your registered bank account via Ozow / Nedbank FastEFT.
                  </p>
                  <button
                    onClick={handleRequestPayout}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Request Immediate EFT Transfer
                  </button>
                </div>

                <div className="md:col-span-2 p-6 bg-stone-950 rounded-2xl border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                      Registered South African Bank Account
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                      FICA Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-500 block">Bank Name</span>
                      <p className="font-bold text-white text-sm">
                        {user.bankDetails?.bankName || 'FNB (First National Bank)'}
                      </p>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Account Holder</span>
                      <p className="font-bold text-white text-sm">
                        {user.bankDetails?.accountHolder || user.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Account Number</span>
                      <p className="font-mono font-bold text-white text-sm">
                        {user.bankDetails?.accountNumber || '62849103948'}
                      </p>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Branch Code</span>
                      <p className="font-mono font-bold text-white text-sm">
                        {user.bankDetails?.branchCode || '270344'} (Ermelo Branch)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 5: MESSAGES & DISPATCH ===================== */}
          {currentSection === 'messages' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                  Customer Inquiries & Dispatch Chat
                </h2>
                <p className="text-xs text-stone-400">
                  Coordinate pickup times, delivery addresses, and tool specifications with regional renters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden h-[480px]">
                {/* Threads */}
                <div className="border-r border-stone-850 p-3 space-y-2">
                  <span className="text-[10px] font-bold text-stone-500 uppercase px-2">
                    Active Conversations
                  </span>
                  <button className="w-full text-left p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs">Pieter Botha</span>
                      <span className="text-[10px] text-amber-400">10:15 AM</span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      DeWalt 305mm Mitre Saw delivery in De Bruin Park
                    </p>
                  </button>
                </div>

                {/* Chat window */}
                <div className="md:col-span-2 flex flex-col justify-between p-4">
                  <div className="space-y-3 overflow-y-auto pr-2">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl max-w-sm text-xs ${
                          msg.sender === 'You'
                            ? 'ml-auto bg-amber-500 text-stone-950 font-medium'
                            : 'bg-stone-900 text-stone-200 border border-stone-800'
                        }`}
                      >
                        <p className="font-bold text-[10px] opacity-75 mb-0.5">{msg.sender}</p>
                        <p>{msg.text}</p>
                        <span className="text-[9px] opacity-60 block text-right mt-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendReply} className="flex gap-2 pt-3 border-t border-stone-850">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type a reply to borrower..."
                      className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 6: FICA & COMPLIANCE ===================== */}
          {currentSection === 'fica' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                  FICA Compliance & Business Verification
                </h2>
                <p className="text-xs text-stone-400">
                  ToolShed SA operates under strict South African regulatory compliance to protect both lenders and borrowers.
                </p>
              </div>

              <div className="p-6 bg-stone-950 rounded-2xl border border-stone-800 space-y-6">
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs">
                  <ShieldCheck className="w-6 h-6 shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold text-white">
                      Your Seller Profile is 100% FICA Compliant
                    </strong>
                    <span>
                      Identity verified with Home Affairs database. CIPC business registration and proof of Ermelo premises confirmed.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-stone-900 rounded-xl border border-stone-850 space-y-1">
                    <span className="text-stone-400">Registered Business Name</span>
                    <p className="font-bold text-white text-sm">
                      {user.businessName || 'Dlamini Plant & Agri Hire Ermelo'}
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900 rounded-xl border border-stone-850 space-y-1">
                    <span className="text-stone-400">Tax / VAT Registration</span>
                    <p className="font-bold text-white text-sm">
                      {user.taxVatNumber || '4820193812'}
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900 rounded-xl border border-stone-850 space-y-1">
                    <span className="text-stone-400">National ID Number</span>
                    <p className="font-mono font-bold text-white text-sm">
                      {user.idNumberMasked || '880314••••083'}
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900 rounded-xl border border-stone-850 space-y-1">
                    <span className="text-stone-400">Registered Yard & Dispatch Address</span>
                    <p className="font-bold text-white text-sm">
                      Industrial Area, Ermelo, Mpumalanga, 2350
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 7: SETTINGS & DISPATCH RULES ===================== */}
          {currentSection === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                  Dispatch & Delivery Preferences
                </h2>
                <p className="text-xs text-stone-400">
                  Configure delivery rates, instant booking criteria, and Mpumalanga regional radius.
                </p>
              </div>

              <div className="p-6 bg-stone-950 rounded-2xl border border-stone-800 space-y-5 text-xs">
                <div className="flex items-center justify-between pb-4 border-b border-stone-850">
                  <div>
                    <h4 className="font-bold text-white text-sm">Direct Equipment Delivery</h4>
                    <p className="text-stone-400">
                      Offer drop-off and pickup to farm gates and job sites around Ermelo.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                    Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-300 mb-1">
                      Base Delivery Fee (ZAR)
                    </label>
                    <input
                      type="number"
                      defaultValue={120}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-300 mb-1">
                      Max Delivery Radius (km around Ermelo)
                    </label>
                    <input
                      type="number"
                      defaultValue={65}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-white font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
