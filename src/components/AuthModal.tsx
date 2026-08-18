import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Briefcase,
  Wrench,
  CreditCard,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS, SOUTH_AFRICAN_CITIES, SA_SUBURBS } from '../data/mockTools';
import { signInWithGoogle, syncUserProfile } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
  initialRole = 'customer',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Ermelo, Mpumalanga');
  const [suburb, setSuburb] = useState('Ermelo Central');
  const [idNumber, setIdNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [bankName, setBankName] = useState('FNB (First National Bank)');
  const [accountNumber, setAccountNumber] = useState('');

  if (!isOpen) return null;

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const suburbs = SA_SUBURBS[newCity] || ['Central'];
    setSuburb(suburbs[0] || 'Central');
  };

  const handleQuickLogin = (demoUser: UserProfile) => {
    syncUserProfile(demoUser).catch((e) => console.warn('Could not sync demo user to cloud:', e));
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    try {
      const fbUser = await signInWithGoogle();
      const profile: UserProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || 'ToolShed User',
        email: fbUser.email || 'user@toolshed.co.za',
        phone: fbUser.phoneNumber || '+27 82 555 0192',
        role: selectedRole,
        avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        city: city.split(',')[0],
        province: city.split(',')[1]?.trim() || 'Mpumalanga',
        suburb,
        ficaVerified: true,
        idNumberMasked: '900101••••089',
        memberSince: 'March 2026',
        rating: 5.0,
        reviewCount: 0,
        completedTransactions: 0,
        businessName: selectedRole === 'seller' ? `${fbUser.displayName || 'Owner'}'s Plant & Tool Hire` : undefined,
      };

      await syncUserProfile(profile);
      onLoginSuccess(profile);
      onClose();
    } catch (err) {
      console.error('Google Auth Failed:', err);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      const existing = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() || u.role === selectedRole
      );
      if (existing) {
        syncUserProfile(existing).catch(() => {});
        onLoginSuccess(existing);
      } else {
        const loggedUser: UserProfile = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0] || 'Mpumalanga User',
          email: email || 'user@toolshed.co.za',
          phone: '+27 82 555 0192',
          role: selectedRole,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          city: city.split(',')[0],
          province: city.split(',')[1]?.trim() || 'Mpumalanga',
          suburb,
          ficaVerified: true,
          idNumberMasked: '900101••••089',
          memberSince: 'March 2026',
          rating: 5.0,
          reviewCount: 0,
          completedTransactions: 0,
        };
        syncUserProfile(loggedUser).catch(() => {});
        onLoginSuccess(loggedUser);
      }
    } else {
      // Registration Flow
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name.trim() || (selectedRole === 'seller' ? 'Tool Hire Partner' : 'Mpumalanga DIYer'),
        email: email.trim() || 'user@toolshed.co.za',
        phone: phone.trim() || '+27 82 000 0000',
        role: selectedRole,
        avatar:
          selectedRole === 'seller'
            ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        city: city.split(',')[0],
        province: city.split(',')[1]?.trim() || 'Mpumalanga',
        suburb,
        ficaVerified: true,
        idNumberMasked: idNumber ? `${idNumber.slice(0, 6)}••••${idNumber.slice(-3)}` : '920315••••085',
        memberSince: 'March 2026',
        rating: 5.0,
        reviewCount: 0,
        completedTransactions: 0,
        businessName: selectedRole === 'seller' ? businessName || `${name}'s Equipment Hire` : undefined,
        bankDetails:
          selectedRole === 'seller'
            ? {
                bankName,
                accountHolder: name || 'Account Holder',
                accountNumber: accountNumber || '62890123901',
                branchCode: '250655',
                accountType: 'Cheque / Current',
              }
            : undefined,
      };
      syncUserProfile(newUser).catch(() => {});
      onLoginSuccess(newUser);
    }
    onClose();
  };

  const SA_BANKS = [
    'FNB (First National Bank)',
    'Capitec Bank',
    'Standard Bank',
    'Absa Bank',
    'Nedbank',
    'TymeBank',
    'Discovery Bank',
    'Investec',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-md shadow-amber-500/20">
              <Wrench className="w-5 h-5 text-stone-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Ermelo • Mpumalanga Gateway
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading">
                {mode === 'login' ? 'Welcome Back to ToolShed' : 'Join the ToolShed Community'}
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

        {/* Tab switcher: Login vs Register */}
        <div className="flex border-b border-stone-200 bg-stone-100 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign In to Account
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Register / Create Account
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-800 flex-1">
          {/* Google Firebase Authentication */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoadingGoogle}
            className="w-full py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer hover:border-amber-500"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoadingGoogle ? 'Connecting Firebase...' : 'Continue with Google Account'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">or direct sign in</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Quick 1-Click Demo Logins */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Quick 1-Click Profiles:
              </span>
              <span className="text-[10px] text-amber-800 font-semibold">Test Seller & Customer Roles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleQuickLogin(demo)}
                  className="p-2 bg-white rounded-xl border border-amber-200 hover:border-amber-500 hover:shadow-xs text-left transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <img
                    src={demo.avatar}
                    alt={demo.name}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-700">
                      {demo.name.split(' ')[0]}
                    </p>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded inline-block ${
                        demo.role === 'seller'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {demo.role === 'seller' ? 'Seller' : 'Customer'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection on Register */}
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Select Your Primary Role:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('customer')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedRole === 'customer'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      {selectedRole === 'customer' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-stone-900">Customer / DIY Borrower</h4>
                    <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                      Rent tools for DIY, home improvement & farm maintenance
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('seller')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedRole === 'seller'
                        ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-500/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      {selectedRole === 'seller' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-stone-900">Seller / Tool Lender</h4>
                    <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                      List your equipment, manage fleet & earn ZAR payout
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Registration specific fields */}
            {mode === 'register' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {selectedRole === 'seller' ? 'Full Legal Name / Owner' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johan Van Der Merwe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                {selectedRole === 'seller' && (
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Business or Trading Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ermelo Plant & Equipment Hire"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      South African Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+27 82 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      SA ID Number / Passport (FICA)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9005120192083"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-mono"
                    />
                  </div>
                </div>

                {/* Location Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      City & Province
                    </label>
                    <select
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
                    >
                      {SOUTH_AFRICAN_CITIES.filter((c) => !c.includes('All')).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Suburb / Area
                    </label>
                    <select
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
                    >
                      {(SA_SUBURBS[city] || ['Central']).map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seller Bank Details Payout Setup */}
                {selectedRole === 'seller' && (
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                      South African Payout Account (EFT / Ozow)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                          Bank Name
                        </label>
                        <select
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                        >
                          {SA_BANKS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                          Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 62849103948"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Email & Password */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>

            {/* FICA Trust Badge Notice */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2.5 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Protected under SA FICA regulations and the ToolShed Damage Guarantee.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>{mode === 'login' ? 'Sign In Now' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
