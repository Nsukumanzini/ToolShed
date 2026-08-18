import React, { useState } from 'react';
import {
  Wrench,
  Search,
  MapPin,
  PlusCircle,
  MessageSquare,
  User,
  ShieldCheck,
  Building2,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Layers,
  ArrowRight,
  Info,
  PhoneCall,
  ShoppingBag,
  Briefcase,
  Store,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { SOUTH_AFRICAN_CITIES } from '../data/mockTools';

interface NavbarProps {
  activeTab: 'browse' | 'projects' | 'about' | 'contact' | 'list-tool' | 'dashboard' | 'seller-portal';
  setActiveTab: (tab: 'browse' | 'projects' | 'about' | 'contact' | 'list-tool' | 'dashboard' | 'seller-portal') => void;
  openMessages: () => void;
  openProtectionModal: () => void;
  openEarningsModal: () => void;
  openAuthModal: (mode?: 'login' | 'register', role?: UserRole) => void;
  onOpenEditProfile: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onSwitchRole: (newRole: UserRole) => void;
  unreadCount: number;
  activeRentalsCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openMessages,
  openProtectionModal,
  openEarningsModal,
  openAuthModal,
  onOpenEditProfile,
  currentUser,
  onLogout,
  onSwitchRole,
  unreadCount,
  activeRentalsCount,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      {/* Main Executive Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo & Regional Base Badge */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => handleNavClick('browse')}
              className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md shadow-amber-500/20 text-stone-950 font-black group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 text-stone-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-heading">
                  Tool<span className="text-amber-400">Shed</span>
                </span>
                <span className="block text-[10px] text-stone-400 font-semibold tracking-wider uppercase">
                  Ermelo • Mpumalanga
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleNavClick('browse')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'browse'
                    ? 'bg-stone-800 text-amber-400 shadow-inner'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                Browse Equipment
              </button>

              <button
                onClick={() => handleNavClick('projects')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-stone-800 text-amber-400 shadow-inner'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                Project Kits
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'about'
                    ? 'bg-stone-800 text-amber-400 shadow-inner'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                About ToolShed
              </button>

              <button
                onClick={openProtectionModal}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Damage Guarantee</span>
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-stone-800 text-amber-400 shadow-inner'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                Contact & Support
              </button>
            </nav>
          </div>

          {/* Right Actions & Auth */}
          <div className="flex items-center gap-3">
            {/* Mpumalanga Town Selector */}
            <div className="hidden md:flex items-center bg-stone-800/90 rounded-xl px-2.5 py-1.5 border border-stone-700/80 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mr-1.5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-stone-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              >
                {SOUTH_AFRICAN_CITIES.map((city) => (
                  <option key={city} value={city} className="bg-stone-900 text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Dedicated Seller Portal Entry Button */}
            <button
              onClick={() => {
                if (currentUser?.role === 'seller') {
                  handleNavClick('seller-portal');
                } else if (currentUser) {
                  onSwitchRole('seller');
                } else {
                  openAuthModal('register', 'seller');
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all cursor-pointer shadow-sm"
              title="Access dedicated equipment lender & fleet management console"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Seller Portal</span>
            </button>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 transition-colors cursor-pointer text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-amber-500/40 shrink-0"
                  />
                  <div className="hidden xl:block">
                    <span className="text-xs font-bold text-white block leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold uppercase">
                      {currentUser.role === 'seller' ? 'Seller Hub' : 'Borrower'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl py-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-800">
                      <p className="font-bold text-white text-sm">{currentUser.name}</p>
                      <p className="text-stone-400 text-[11px] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {currentUser.city}, {currentUser.province}
                      </span>
                    </div>

                    {/* Edit Profile Action */}
                    <button
                      onClick={() => {
                        onOpenEditProfile();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-stone-200 hover:bg-stone-800 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <User className="w-4 h-4 text-amber-400" />
                      <span>Edit Personal Profile</span>
                    </button>

                    {currentUser.role === 'seller' ? (
                      <button
                        onClick={() => {
                          handleNavClick('seller-portal');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-amber-400 font-bold hover:bg-stone-800 flex items-center gap-2 cursor-pointer"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Seller Management Portal</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleNavClick('dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-stone-200 hover:bg-stone-800 flex items-center gap-2 cursor-pointer font-bold"
                      >
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>Customer Hub & Rentals</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        const newRole = currentUser.role === 'seller' ? 'customer' : 'seller';
                        onSwitchRole(newRole);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-stone-300 hover:bg-stone-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-stone-400" />
                      <span>
                        Switch to {currentUser.role === 'seller' ? 'Customer Mode' : 'Seller Mode'}
                      </span>
                    </button>

                    <div className="border-t border-stone-800 pt-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-stone-800 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-stone-200 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('register', 'customer')}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-t border-stone-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150 text-left">
          {/* User Status in Mobile */}
          {currentUser ? (
            <div className="p-3 bg-stone-900 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover border border-amber-500 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-bold text-white text-xs truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-amber-400 font-semibold uppercase">
                    {currentUser.role === 'seller' ? 'Seller Account' : 'Customer Account'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenEditProfile();
                  setIsMobileMenuOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-400 text-[11px] font-bold transition-colors shrink-0"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-stone-900 text-stone-200 font-bold text-xs text-center border border-stone-800 cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  openAuthModal('register', 'customer');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-black text-xs text-center shadow-sm cursor-pointer"
              >
                Register Free
              </button>
            </div>
          )}

          {/* Location for mobile */}
          <div className="flex items-center bg-stone-900 rounded-xl px-3 py-2 border border-stone-800 text-xs mb-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mr-2" />
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setIsMobileMenuOpen(false);
              }}
              className="bg-transparent text-stone-200 text-xs font-semibold focus:outline-none w-full cursor-pointer"
            >
              {SOUTH_AFRICAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-stone-900 text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* DYNAMIC ROLE-BASED LINKS */}
          {currentUser?.role === 'seller' ? (
            /* SELLER / LENDER MOBILE MENU LINKS */
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('seller-portal')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === 'seller-portal'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Seller Management Console
                </span>
                <span className="text-[10px] uppercase font-mono font-bold">HQ</span>
              </button>

              <button
                onClick={() => handleNavClick('list-tool')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'list-tool'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                List New Equipment
              </button>

              <button
                onClick={() => {
                  openEarningsModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-200 hover:bg-stone-900 flex items-center justify-between"
              >
                <span>Earnings ROI Calculator</span>
                <span className="text-amber-400 font-mono text-[11px] font-semibold">ZAR ROI</span>
              </button>

              <button
                onClick={() => handleNavClick('browse')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'browse'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                Browse Marketplace Equipment
              </button>

              <button
                onClick={() => {
                  openProtectionModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-200 hover:bg-stone-900 flex items-center justify-between"
              >
                <span>Damage Guarantee Protection</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'contact'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                Seller Support & Help
              </button>
            </div>
          ) : (
            /* CUSTOMER & GUEST MOBILE MENU LINKS */
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('browse')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'browse'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                Browse Equipment
              </button>

              {currentUser && (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeTab === 'dashboard'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:bg-stone-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    Customer Hub & My Rentals
                  </span>
                  {activeRentalsCount > 0 && (
                    <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.5 rounded-full">
                      {activeRentalsCount} active
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => handleNavClick('projects')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'projects'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                Project Kits
              </button>

              <button
                onClick={() => {
                  openProtectionModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-200 hover:bg-stone-900 flex items-center justify-between"
              >
                <span>Damage Guarantee Policy</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'about'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                About ToolShed SA
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'contact'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                Contact & Support (Ermelo)
              </button>
            </div>
          )}

          {/* BOTTOM QUICK SWITCH / ACTIONS */}
          <div className="pt-3 border-t border-stone-800 space-y-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    const newRole = currentUser.role === 'seller' ? 'customer' : 'seller';
                    onSwitchRole(newRole);
                    if (newRole === 'seller') {
                      handleNavClick('seller-portal');
                    } else {
                      handleNavClick('browse');
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-stone-700"
                >
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>Switch to {currentUser.role === 'seller' ? 'Customer Mode' : 'Seller Mode'}</span>
                </button>

                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-stone-400 hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  openAuthModal('register', 'seller');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Become an Equipment Lender & Earn</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
