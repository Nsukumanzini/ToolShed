import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface ContactViewProps {
  onSendMessageSubmitted?: (details: { name: string; email: string; message: string }) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSendMessageSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Equipment Inquiry',
    area: 'Ermelo',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    if (onSendMessageSubmitted) {
      onSendMessageSubmitted({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
    }
  };

  return (
    <div className="space-y-12 text-left py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Ermelo Headquarters & Regional Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 tracking-tight">
          Get in Touch With ToolShed Mpumalanga
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl">
          Have questions about tool hire, lender onboarding, direct delivery across Mpumalanga, or enterprise plant solutions? Our Ermelo team is ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 bg-stone-900 text-white rounded-3xl border border-stone-800 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold font-heading text-amber-400">
              Office & Support Hub
            </h3>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Physical Address</strong>
                  <span>Kerk Street & Joubert St</span>
                  <br />
                  <span>Ermelo Central, Mpumalanga, 2350</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Telephone</strong>
                  <span>+27 (0)17 811 4920</span>
                  <br />
                  <span className="text-stone-400">WhatsApp Dispatch: +27 82 459 2811</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Email Support</strong>
                  <span>support@toolshed.co.za</span>
                  <br />
                  <span>lenders@toolshed.co.za</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Operational Hours</strong>
                  <span>Monday – Friday: 07:00 – 17:30</span>
                  <br />
                  <span>Saturday: 07:30 – 13:00</span>
                  <br />
                  <span>Sunday: Closed (Emergency dispatch available)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Regional coverage list */}
          <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-stone-500 block">
              Direct Delivery Service Zones
            </span>
            <p className="text-stone-600 leading-relaxed">
              We provide delivery and collection services across Ermelo, Secunda, Bethal, Piet Retief, Standerton, Middelburg, Carolina, and surrounding regional farms.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          {isSubmitted ? (
            <div className="p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black font-heading text-stone-900">
                Thank You for Reaching Out!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Our Ermelo customer support desk has received your message. A team member will respond within 2 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'General Equipment Inquiry',
                    area: 'Ermelo',
                    message: '',
                  });
                }}
                className="bg-stone-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-500 hover:text-stone-950 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold font-heading text-stone-900">
                Send an Inquiry or Request a Quote
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Johan Venter"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="johan@mpumalanga.co.za"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+27 82 000 0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Mpumalanga Town / Area
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Ermelo">Ermelo</option>
                    <option value="Secunda">Secunda</option>
                    <option value="Bethal">Bethal</option>
                    <option value="Piet Retief">Piet Retief (eMkhondo)</option>
                    <option value="Standerton">Standerton</option>
                    <option value="Middelburg">Middelburg</option>
                    <option value="Witbank">Witbank (eMalahleni)</option>
                    <option value="Carolina">Carolina</option>
                    <option value="Other">Other Mpumalanga Region</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value="General Equipment Inquiry">General Equipment Inquiry</option>
                  <option value="Listing Fleet as a Tool Owner">Listing Fleet as a Tool Owner</option>
                  <option value="Delivery / Transport Coordination">Delivery / Transport Coordination</option>
                  <option value="Contractor & Farm Bulk Account">Contractor & Farm Bulk Account</option>
                  <option value="Damage Guarantee Information">Damage Guarantee Information</option>
                  <option value="FICA & Account Verification">FICA & Account Verification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Message / Equipment Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the tools you are looking for, job duration, or specific site requirements..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
