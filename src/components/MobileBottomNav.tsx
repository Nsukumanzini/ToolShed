import React from 'react';
import {
  Search,
  ShoppingBag,
  MessageSquare,
  User,
  Wrench,
  Layers,
  Briefcase,
  PlusCircle,
  TrendingUp,
  ClipboardList,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface MobileBottomNavProps {
  activeTab: 'browse' | 'projects' | 'about' | 'contact' | 'list-tool' | 'dashboard' | 'seller-portal';
  setActiveTab: (tab: 'browse' | 'projects' | 'about' | 'contact' | 'list-tool' | 'dashboard' | 'seller-portal') => void;
  currentUser: UserProfile | null;
  unreadCount: number;
  activeRentalsCount: number;
  openMessages: () => void;
  openAuthModal: (mode?: 'login' | 'register', role?: UserRole) => void;
  onOpenEditProfile: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  unreadCount,
  activeRentalsCount,
  openMessages,
  openAuthModal,
  onOpenEditProfile,
}) => {
  const isSeller = currentUser?.role === 'seller';

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 shadow-[0_-8px_20px_rgba(0,0,0,0.35)] px-2 py-1.5 pb-safe select-none">
      <div className="grid grid-cols-4 items-center justify-around max-w-md mx-auto">
        {/* TAB 1: Explore (Customer) OR Inventory (Seller) */}
        {!isSeller ? (
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              activeTab === 'browse'
                ? 'text-amber-400 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="relative">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium">Explore</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('seller-portal')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              activeTab === 'seller-portal'
                ? 'text-amber-400 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="relative">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium">Fleet</span>
          </button>
        )}

        {/* TAB 2: My Bookings (Customer) OR Rental Requests (Seller) */}
        {!isSeller ? (
          <button
            onClick={() => {
              if (currentUser) {
                setActiveTab('dashboard');
              } else {
                openAuthModal('login');
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-amber-400 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {activeRentalsCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-stone-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-stone-900">
                  {activeRentalsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium">My Bookings</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('list-tool')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              activeTab === 'list-tool'
                ? 'text-amber-400 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="relative">
              <PlusCircle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium text-amber-400 font-bold">List Tool</span>
          </button>
        )}

        {/* TAB 3: Messages (Both with Unread Badge) */}
        <button
          onClick={openMessages}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-400 hover:text-stone-200 transition-all cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-500 text-stone-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-stone-900 animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Messages</span>
        </button>

        {/* TAB 4: Profile / Edit Profile / Account */}
        <button
          onClick={() => {
            if (currentUser) {
              onOpenEditProfile();
            } else {
              openAuthModal('login');
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-400 hover:text-stone-200 transition-all cursor-pointer"
        >
          <div className="relative">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-amber-400/80"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium truncate max-w-[65px]">
            {currentUser ? (isSeller ? 'Lender Hub' : 'Profile') : 'Account'}
          </span>
        </button>
      </div>
    </div>
  );
};
