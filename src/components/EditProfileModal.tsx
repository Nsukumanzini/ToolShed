import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Lock,
  Building2,
  CheckCircle2,
  Save,
  Sparkles,
  Camera,
} from 'lucide-react';
import { UserProfile } from '../types';
import { SOUTH_AFRICAN_CITIES, SA_SUBURBS } from '../data/mockTools';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile,
}) => {
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [city, setCity] = useState(
    currentUser.city ? `${currentUser.city}, ${currentUser.province}` : 'Ermelo, Mpumalanga'
  );
  const [suburb, setSuburb] = useState(currentUser.suburb || 'Ermelo Central');
  const [avatar, setAvatar] = useState(currentUser.avatar || AVATAR_PRESETS[0]);
  const [idNumberMasked, setIdNumberMasked] = useState(currentUser.idNumberMasked || '890412••••088');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const suburbs = SA_SUBURBS[newCity] || ['Central'];
    setSuburb(suburbs[0] || 'Central');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedProfile: UserProfile = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      email: email.trim() || currentUser.email,
      phone: phone.trim() || currentUser.phone,
      city: city.split(',')[0].trim(),
      province: city.split(',')[1]?.trim() || currentUser.province || 'Mpumalanga',
      suburb: suburb.trim(),
      avatar,
      idNumberMasked: idNumberMasked.trim(),
      // Business information remains STRICTLY unchanged and preserved
      businessName: currentUser.businessName,
      bankDetails: currentUser.bankDetails,
    };

    setTimeout(() => {
      onSaveProfile(updatedProfile);
      setIsSaving(false);
      onClose();
    }, 200);
  };

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
              <User className="w-5 h-5 text-stone-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Account Settings
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading">
                Edit Personal Profile
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-800 flex-1">
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-sm shrink-0"
              />
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-stone-600">Choose a preset avatar:</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(preset)}
                      className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        avatar === preset ? 'border-amber-500 scale-110 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Fields (Editable) */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  placeholder="e.g. Johan Van Der Merwe"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    placeholder="user@toolshed.co.za"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    placeholder="+27 82 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  FICA ID Number / Passport
                </label>
                <input
                  type="text"
                  value={idNumberMasked}
                  onChange={(e) => setIdNumberMasked(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-mono"
                  placeholder="e.g. 890412 5089 088"
                />
              </div>
            </div>

            {/* Regional Location Selection */}
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
          </div>

          {/* Locked Business Information (READ-ONLY) */}
          <div className="p-4 bg-stone-100 rounded-2xl border border-stone-300/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-500" />
                Verified Business Information (Locked)
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                <Lock className="w-3 h-3 text-stone-500" />
                Read-Only
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div>
                <span className="text-stone-500 text-[11px]">Registered Trading Name: </span>
                <span className="font-bold text-stone-900">
                  {currentUser.businessName || 'Individual Tool Owner (Non-Corporate)'}
                </span>
              </div>
              <div>
                <span className="text-stone-500 text-[11px]">Account Type: </span>
                <span className="font-bold text-stone-900 capitalize">
                  {currentUser.role === 'seller' ? 'Plant & Equipment Hire Partner' : 'Standard Customer Account'}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-stone-500 leading-relaxed border-t border-stone-200/80 pt-2">
              To update verified commercial company names, CIPC registration numbers, or corporate tax IDs, please submit a formal request to the Ermelo support desk.
            </p>
          </div>

          {/* Submit Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Personal Details'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
