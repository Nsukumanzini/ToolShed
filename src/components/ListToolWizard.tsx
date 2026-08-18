import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  PlusCircle,
  Sparkles,
  Camera,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Truck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  Tag,
  Wrench,
} from 'lucide-react';
import { CategoryType, ConditionType, PowerSourceType, ToolItem } from '../types';
import { CATEGORIES } from './ToolFilters';
import { SOUTH_AFRICAN_CITIES } from '../data/mockTools';

interface ListToolWizardProps {
  onToolCreated: (tool: ToolItem) => void;
  onCancel: () => void;
}

export const ListToolWizard: React.FC<ListToolWizardProps> = ({
  onToolCreated,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState<CategoryType>('Power Tools');
  const [powerSource, setPowerSource] = useState<PowerSourceType>('Cordless Battery');
  const [condition, setCondition] = useState<ConditionType>('Like New');
  const [description, setDescription] = useState('');
  const [dailyRate, setDailyRate] = useState<number>(350);
  const [weeklyDiscount, setWeeklyDiscount] = useState<number>(20);
  const [securityDeposit, setSecurityDeposit] = useState<number>(1000);
  const [replacementValue, setReplacementValue] = useState<number>(6500);
  const [neighborhood, setNeighborhood] = useState('De Bruin Park');
  const [city, setCity] = useState('Ermelo');
  const [province, setProvince] = useState('Mpumalanga');
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState<number>(150);
  const [instantBooking, setInstantBooking] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80'
  );
  const [accessories, setAccessories] = useState<string>('Heavy Duty Carry Case, 2x 5Ah Batteries, Rapid Charger, Blade Guide');
  const [safetyNotes, setSafetyNotes] = useState<string>('Wear safety goggles and ear protection. Verify oil levels before starting engine');

  // Market price suggestion helper in ZAR
  const handleAutoSuggestPricing = () => {
    if (category === 'Heavy Equipment & Concrete') {
      setDailyRate(650);
      setSecurityDeposit(2500);
      setReplacementValue(18000);
    } else if (category === 'Loadshedding & Solar') {
      setDailyRate(550);
      setSecurityDeposit(2000);
      setReplacementValue(16000);
    } else if (category === 'Lawn & Garden') {
      setDailyRate(420);
      setSecurityDeposit(1200);
      setReplacementValue(7500);
    } else if (category === 'Cleaning & Pressure Washers') {
      setDailyRate(380);
      setSecurityDeposit(1500);
      setReplacementValue(8500);
    } else {
      setDailyRate(320);
      setSecurityDeposit(950);
      setReplacementValue(5000);
    }
  };

  const handleFillDemoData = () => {
    setTitle('Bosch Professional GKS 18V-57 Cordless Circular Saw Kit');
    setBrand('Bosch');
    setModel('GKS 18V-57 Heavy Duty');
    setCategory('Woodworking');
    setPowerSource('Cordless Battery');
    setCondition('Like New');
    setDescription(
      'Robust and fast cordless circular saw for South African hardwoods, framing, and roofing projects. Ideal for farm and site work in Ermelo. Includes 2x ProCORE 18V 4.0Ah batteries and heavy-duty case.'
    );
    setDailyRate(290);
    setSecurityDeposit(900);
    setReplacementValue(4800);
    setImageUrl('https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80');
    setAccessories('2x Bosch ProCORE 4.0Ah batteries, GAL 18V-40 charger, 165mm Optiline wood blade, L-BOXX carry case');
    setNeighborhood('De Bruin Park');
    setCity('Ermelo');
    setProvince('Mpumalanga');
  };

  const handleFinishListing = () => {
    const newTool: ToolItem = {
      id: `tool-erm-${Date.now()}`,
      title: title || 'Custom Equipment Listing',
      brand: brand || 'Bosch',
      model: model || 'Pro Edition',
      category: category,
      dailyRate: Number(dailyRate) || 290,
      hourlyRate: Math.round(Number(dailyRate) / 4) || 75,
      weeklyDiscountPercent: Number(weeklyDiscount) || 20,
      securityDeposit: Number(securityDeposit) || 900,
      replacementValue: Number(replacementValue) || 5000,
      images: [imageUrl],
      description: description || 'Well-maintained equipment available for local rental in Ermelo, Mpumalanga.',
      specs: [
        { label: 'Condition', value: condition },
        { label: 'Power Source', value: powerSource },
        { label: 'Brand', value: brand || 'Professional' },
      ],
      includedAccessories: accessories.split(',').map((s) => s.trim()).filter(Boolean),
      safetyGuidelines: safetyNotes.split(',').map((s) => s.trim()).filter(Boolean),
      condition: condition,
      powerSource: powerSource,
      location: {
        city: city,
        province: province,
        neighborhood: neighborhood || 'Central',
        postalCode: '2351',
        distanceKm: 2.1,
      },
      deliveryAvailable: deliveryAvailable,
      deliveryFee: deliveryFee,
      instantBooking: instantBooking,
      owner: {
        id: 'owner-current',
        name: 'Johan Van Der Merwe',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        type: 'Plant & Tool Hire',
        rating: 5.0,
        reviewCount: 1,
        memberSince: '2024',
        verified: true,
        ficaVerified: true,
        responseRatePercent: 100,
        responseTime: '< 5 mins',
        completedLends: 0,
        location: `${neighborhood}, ${city}`,
      },
      rating: 5.0,
      reviewsCount: 0,
      isAvailable: true,
      tags: [category, brand, 'Ermelo Equipment Hire'],
    };

    onToolCreated(newTool);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#ffffff'],
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 text-left">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Wizard Header */}
        <div className="p-6 bg-stone-900 text-white border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" />
              Equipment Listing Console
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-heading">List Equipment & Earn Rands</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Turn idle tools and machinery into recurring rental income across Mpumalanga.
            </p>
          </div>

          {/* Quick Demo Pre-fill button */}
          <button
            onClick={handleFillDemoData}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-stone-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-fill Sample Tool</span>
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 border-b border-stone-200 bg-stone-50 text-xs font-bold text-center">
          <div
            className={`py-3 px-2 border-r border-stone-200 ${
              currentStep === 1 ? 'bg-amber-50 text-amber-900 border-b-2 border-b-amber-500' : 'text-stone-500'
            }`}
          >
            1. Tool Basics
          </div>
          <div
            className={`py-3 px-2 border-r border-stone-200 ${
              currentStep === 2 ? 'bg-amber-50 text-amber-900 border-b-2 border-b-amber-500' : 'text-stone-500'
            }`}
          >
            2. Specs & Photos
          </div>
          <div
            className={`py-3 px-2 border-r border-stone-200 ${
              currentStep === 3 ? 'bg-amber-50 text-amber-900 border-b-2 border-b-amber-500' : 'text-stone-500'
            }`}
          >
            3. ZAR Rates & Deposit
          </div>
          <div
            className={`py-3 px-2 ${
              currentStep === 4 ? 'bg-amber-50 text-amber-900 border-b-2 border-b-amber-500' : 'text-stone-500'
            }`}
          >
            4. Delivery & Rules
          </div>
        </div>

        {/* Form Steps Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">What equipment are you listing?</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Listing Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DeWalt 305mm Sliding Compound Mitre Saw"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. Bosch, DeWalt, Makita, Stihl, Matweld, Kärcher"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Model # (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. DWS780 XPS / GKS 18V"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none cursor-pointer"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Power Source</label>
                    <select
                      value={powerSource}
                      onChange={(e) => setPowerSource(e.target.value as PowerSourceType)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none cursor-pointer"
                    >
                      <option value="Cordless Battery">Cordless Battery</option>
                      <option value="Corded Electric">Corded Electric (220V)</option>
                      <option value="Gasoline / Petrol">Petrol Engine</option>
                      <option value="Manual / Hydraulic">Manual / Hydraulic</option>
                      <option value="Pneumatic">Pneumatic Air</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Condition</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as ConditionType)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none cursor-pointer"
                    >
                      <option value="Like New">Like New (Mint)</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good Working Condition</option>
                      <option value="Well-Used">Well-Used</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">Photos & Specifications</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Photo URL (High Resolution)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-mono text-xs text-stone-900 focus:outline-none"
                  />
                  {imageUrl && (
                    <div className="mt-2 aspect-[16/9] max-w-xs rounded-xl overflow-hidden border border-stone-300">
                      <img src={imageUrl} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Equipment Description & Application Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe how to use it, what projects it handles best, and maintenance notes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 font-medium text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Included Accessories (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={accessories}
                    onChange={(e) => setAccessories(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-stone-900">Rental Rates & Security Deposit (ZAR)</h3>
                <button
                  onClick={handleAutoSuggestPricing}
                  className="text-amber-800 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Suggest Market Price
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                  <label className="font-bold text-stone-900 block">Daily Rental Rate (Rands)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 font-bold text-stone-500">R</span>
                    <input
                      type="number"
                      value={dailyRate}
                      onChange={(e) => setDailyRate(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded-lg py-2 pl-8 pr-3 font-bold text-stone-900 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Recommended for this category: R250–R550/day.
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                  <label className="font-bold text-stone-900 block">Refundable Security Deposit (Rands)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 font-bold text-stone-500">R</span>
                    <input
                      type="number"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded-lg py-2 pl-8 pr-3 font-bold text-stone-900 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Held securely during rental period.
                  </p>
                </div>
              </div>

              {/* Earnings Projection Card */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-amber-950 text-sm">
                    Estimated Passive Earnings (4 rentals/month):
                  </p>
                  <p className="text-amber-900">
                    R{(dailyRate * 2 * 4).toLocaleString()}/month (~R{(dailyRate * 2 * 4 * 12).toLocaleString()}/year)
                  </p>
                </div>
                <div className="text-right font-mono font-black text-amber-700 text-lg">
                  +R{(dailyRate * 8).toLocaleString()}/mo
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">Location, Delivery & Confirmation</h3>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Town / Area</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none cursor-pointer"
                    >
                      {SOUTH_AFRICAN_CITIES.filter((c) => c !== 'All Locations').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Suburb / Yard Location</label>
                    <input
                      type="text"
                      placeholder="e.g. De Bruin Park, Ermelo Central, Industrial Area"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-amber-600" />
                        Offer Delivery & Collection
                      </p>
                      <p className="text-[11px] text-stone-500">I can transport and drop off equipment directly to project sites</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={deliveryAvailable}
                      onChange={(e) => setDeliveryAvailable(e.target.checked)}
                      className="h-4 w-4 rounded text-amber-600 cursor-pointer"
                    />
                  </div>

                  {deliveryAvailable && (
                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-stone-700 font-medium">Return delivery fee (ZAR)</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-stone-600">R</span>
                        <input
                          type="number"
                          value={deliveryFee}
                          onChange={(e) => setDeliveryFee(Number(e.target.value))}
                          className="w-20 bg-white border border-stone-300 rounded-lg p-1.5 text-right font-bold"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-stone-900 flex items-center gap-1">
                      Enable Instant Booking
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </p>
                    <p className="text-[11px] text-stone-500">Verified members can reserve immediately without waiting for approval</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={instantBooking}
                    onChange={(e) => setInstantBooking(e.target.checked)}
                    className="h-4 w-4 rounded text-amber-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded-xl text-stone-700 bg-stone-100 hover:bg-stone-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-900 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishListing}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-6 py-2.5 rounded-xl text-xs font-black tracking-wide shadow-md shadow-amber-500/20 cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Equipment to ToolShed</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
