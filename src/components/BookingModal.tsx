import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MapPin,
  CreditCard,
  QrCode,
  Truck,
  Zap,
  ArrowRight,
  Download,
  Clock,
  Sparkles,
  Building,
  Smartphone,
  HardHat,
} from 'lucide-react';
import { ToolItem, Booking } from '../types';

interface BookingModalProps {
  tool: ToolItem | null;
  bookingConfig: {
    days: number;
    startDate: string;
    endDate: string;
    isDelivery: boolean;
    safetyGearIncluded?: boolean;
  } | null;
  onClose: () => void;
  onConfirmBooking: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tool,
  bookingConfig,
  onClose,
  onConfirmBooking,
}) => {
  if (!tool || !bookingConfig) return null;

  const [step, setStep] = useState<'checkout' | 'confirmed'>('checkout');
  const [renterName, setRenterName] = useState('Pieter Botha');
  const [renterPhone, setRenterPhone] = useState('082 734 9102');
  const [saIdNumber, setSaIdNumber] = useState('920415 5082 084');
  const [deliveryAddress, setDeliveryAddress] = useState('42 Joubert Street, De Bruin Park, Ermelo');
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'capitec' | 'card'>('card');
  const [safetyGear, setSafetyGear] = useState(bookingConfig.safetyGearIncluded ?? false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<Booking | null>(null);

  // Price calculations in ZAR
  const rawSubtotal = tool.dailyRate * bookingConfig.days;
  const isWeekly = bookingConfig.days >= 7;
  const discount = isWeekly ? Math.round(rawSubtotal * (tool.weeklyDiscountPercent / 100)) : 0;
  const subtotal = rawSubtotal - discount;
  const damageWaiver = Math.round(subtotal * 0.1) || 45;
  const serviceFee = Math.round(subtotal * 0.08) || 30;
  const deliveryFee = bookingConfig.isDelivery ? tool.deliveryFee : 0;
  const safetyGearFee = safetyGear ? 45 * bookingConfig.days : 0;
  const total = subtotal + damageWaiver + serviceFee + deliveryFee + safetyGearFee;

  const handlePayAndReserve = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: `BK-ERM-${Math.floor(1000 + Math.random() * 9000)}`,
        toolId: tool.id,
        tool: tool,
        startDate: bookingConfig.startDate,
        endDate: bookingConfig.endDate,
        days: bookingConfig.days,
        dailyPrice: tool.dailyRate,
        totalRental: subtotal,
        damageProtectionFee: damageWaiver,
        serviceFee: serviceFee,
        deliveryFee: deliveryFee,
        safetyGearIncluded: safetyGear,
        safetyGearFee: safetyGearFee,
        refundableDeposit: tool.securityDeposit,
        totalPaid: total,
        status: 'upcoming',
        deliveryType: bookingConfig.isDelivery ? 'delivery' : 'pickup',
        deliveryAddress: bookingConfig.isDelivery ? deliveryAddress : undefined,
        createdAt: new Date().toISOString().split('T')[0],
        qrCodeCheckin: `TS-ERM-${Math.floor(10000 + Math.random() * 90000)}`,
        pickupInstructions: bookingConfig.isDelivery
          ? `${tool.owner.name} will deliver this equipment to ${deliveryAddress} on ${bookingConfig.startDate} at 08:30 AM.`
          : `Collect at ${tool.location.neighborhood}, ${tool.location.city}. Exact yard address provided upon reservation.`,
        renterName: renterName,
      };

      setConfirmedBookingData(newBooking);
      setStep('confirmed');
      setIsProcessing(false);
      onConfirmBooking(newBooking);

      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#1c1917'],
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-base text-stone-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              {step === 'checkout' ? 'Reserve Equipment (ZAR)' : 'Rental Confirmed!'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {step === 'checkout' ? (
            <>
              {/* Tool Summary Card */}
              <div className="flex gap-3.5 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <img
                  src={tool.images[0]}
                  alt={tool.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {tool.category}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 truncate">{tool.title}</h4>
                  <p className="text-xs text-stone-500">{tool.brand} {tool.model} • {tool.condition} Condition</p>

                  <div className="mt-1.5 flex items-center gap-3 text-xs text-stone-600">
                    <span className="flex items-center gap-1 font-semibold text-stone-900">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {bookingConfig.days} Day{bookingConfig.days > 1 ? 's' : ''} ({bookingConfig.startDate} to {bookingConfig.endDate})
                    </span>
                  </div>
                </div>
              </div>

              {/* Borrower FICA Verification Form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    1. South African Customer Verification (FICA)
                  </h5>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> FICA Compliant
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">Full Name (as per ID)</label>
                    <input
                      type="text"
                      value={renterName}
                      onChange={(e) => setRenterName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">SA Phone (Mobile)</label>
                    <input
                      type="text"
                      value={renterPhone}
                      onChange={(e) => setRenterPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-600 block mb-1 font-medium text-xs">SA National ID / Passport Number</label>
                  <input
                    type="text"
                    value={saIdNumber}
                    onChange={(e) => setSaIdNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                {bookingConfig.isDelivery && (
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium text-xs">Equipment Delivery Street Address</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg py-2 pl-9 pr-3 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* South African Payment Gateway Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    2. South African Payment Method
                  </h5>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    3D-Secure 256-Bit
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-amber-500 bg-amber-50 text-stone-900 ring-2 ring-amber-500/20'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                    <span>Visa / Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ozow')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === 'ozow'
                        ? 'border-amber-500 bg-amber-50 text-stone-900 ring-2 ring-amber-500/20'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>Ozow Instant EFT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('capitec')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === 'capitec'
                        ? 'border-amber-500 bg-amber-50 text-stone-900 ring-2 ring-amber-500/20'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <span>Capitec Pay</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-500">
                  Your payment of <strong>R{total}</strong> will be processed securely. Security deposit of R{tool.securityDeposit} is held until equipment return.
                </p>

                {/* Safety Gear Add-on Toggle */}
                <div className={`p-3 rounded-xl border transition-all ${
                  safetyGear
                    ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/20'
                    : 'bg-stone-50 border-stone-200'
                }`}>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={safetyGear}
                      onChange={(e) => setSafetyGear(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5 text-amber-600" />
                          <span>Include Industrial PPE Safety Kit</span>
                        </span>
                        <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                          +R45/day (+R{45 * bookingConfig.days})
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Industrial earmuffs, anti-impact safety goggles, vibration-dampening gloves & protective toe guards.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Cost Summary Table in ZAR */}
              <div className="bg-stone-900 text-stone-100 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Rental rate ({bookingConfig.days} days)</span>
                  <span>R{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Damage Guarantee</span>
                  <span>R{damageWaiver}</span>
                </div>
                {safetyGear && (
                  <div className="flex justify-between text-amber-400 font-medium">
                    <span>Safety PPE Gear Kit (R45 × {bookingConfig.days}d)</span>
                    <span>+R{safetyGearFee}</span>
                  </div>
                )}
                {bookingConfig.isDelivery && (
                  <div className="flex justify-between text-stone-300">
                    <span>Direct Delivery & Collection</span>
                    <span>R{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-300">
                  <span>Platform Fee (Incl. VAT)</span>
                  <span>R{serviceFee}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-white pt-2 border-t border-stone-800">
                  <span>Total Charged (ZAR)</span>
                  <span className="text-amber-400 font-heading text-base">R{total}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  disabled={isProcessing}
                  onClick={handlePayAndReserve}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 py-3 rounded-xl font-black text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing South African Banking Gate...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-stone-950" />
                      <span>Pay R{total} & Confirm Rental</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Confirmation Receipt State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-xl font-black text-stone-900 font-heading">
                  Your Rental is Booked Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1">
                  Reference <strong>{confirmedBookingData?.id}</strong> is verified. {tool.owner.name} has received your booking details.
                </p>
              </div>

              {/* QR Code & Pickup Badge */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">Security Check-in Code</span>
                    <p className="font-mono text-sm font-black text-stone-900">{confirmedBookingData?.qrCodeCheckin}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-300">
                    <QrCode className="w-8 h-8 text-stone-800" />
                  </div>
                </div>

                <div className="text-xs space-y-1 text-stone-700">
                  <p className="font-bold text-stone-900">Pickup / Delivery Instructions:</p>
                  <p className="text-stone-600">{confirmedBookingData?.pickupInstructions}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  View in My Activity
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
