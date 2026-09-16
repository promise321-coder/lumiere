import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Building2, Truck, ArrowRight, Sparkles, MessageCircle, Copy, Check } from 'lucide-react';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Rivers (Port Harcourt)', 'Oyo (Ibadan)', 'Ogun',
  'Delta', 'Edo (Benin)', 'Enugu', 'Anambra', 'Kano', 'Kaduna', 'Kwara',
  'Plateau (Jos)', 'Ondo', 'Osun', 'Akwa Ibom', 'Cross River', 'Imo', 'Abia'
];

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currency,
  onOrderSuccess
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: 'Lagos',
    city: '',
    address: '',
    deliveryMethod: 'lagos-standard',
    paymentMethod: 'paystack'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 35000;
  
  let deliveryFee = 2500;
  if (formData.deliveryMethod === 'lagos-express') {
    deliveryFee = 3800;
  } else if (formData.state !== 'Lagos') {
    deliveryFee = 3500;
  } else if (isFreeDelivery) {
    deliveryFee = 0;
  }

  const grandTotal = subtotal + deliveryFee;

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 1500).toFixed(2)}`;
    return `₦${amount.toLocaleString()}`;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = `LB-NG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onOrderSuccess();
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappReceipt = encodeURIComponent(
    `*ORDER CONFIRMATION - LUMIÈRE BOTANICS*\n` +
    `*Order Ref:* ${orderId}\n` +
    `*Customer:* ${formData.fullName}\n` +
    `*Phone:* ${formData.phone}\n` +
    `*Delivery State:* ${formData.state} (${formData.city})\n` +
    `*Total:* ${formatPrice(grandTotal)}\n` +
    `*Payment Selected:* ${formData.paymentMethod.toUpperCase()}\n\n` +
    `Please confirm receipt and dispatch time.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-botanic-950/75 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 my-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 text-gray-400 hover:text-botanic-950 rounded-full hover:bg-cream-100 transition"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Express Nigerian Checkout</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-botanic-950">
                Delivery & Payment Details
              </h3>
              <p className="text-xs text-charcoal-600">
                Lagos orders dispatched same-day. Nationwide parcels shipped via express logistics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Contact & Address */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-botanic-900 border-b border-cream-200 pb-2">
                  1. Recipient Information
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amaka Okafor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="amaka@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1">Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1">Delivery State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1">City / Area *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lekki Phase 1 / Ikeja"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Street Address & Landmark *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House number, street name, and nearest prominent landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Right Column: Delivery Method & Payment */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-botanic-900 border-b border-cream-200 pb-2">
                  2. Shipping & Payment Method
                </h4>

                {/* Shipping Selection */}
                <div className="space-y-2">
                  {formData.state === 'Lagos' ? (
                    <>
                      <label
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                          formData.deliveryMethod === 'lagos-standard'
                            ? 'border-gold-500 bg-gold-50/50'
                            : 'border-cream-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={formData.deliveryMethod === 'lagos-standard'}
                            onChange={() => setFormData({ ...formData, deliveryMethod: 'lagos-standard' })}
                            className="text-botanic-900 focus:ring-gold-500"
                          />
                          <div>
                            <p className="font-bold text-botanic-950">Lagos Standard Delivery</p>
                            <p className="text-[11px] text-charcoal-600">Dispatched within 24 hours</p>
                          </div>
                        </div>
                        <span className="font-bold text-botanic-900">
                          {isFreeDelivery ? 'FREE' : formatPrice(2500)}
                        </span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                          formData.deliveryMethod === 'lagos-express'
                            ? 'border-gold-500 bg-gold-50/50'
                            : 'border-cream-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={formData.deliveryMethod === 'lagos-express'}
                            onChange={() => setFormData({ ...formData, deliveryMethod: 'lagos-express' })}
                            className="text-botanic-900 focus:ring-gold-500"
                          />
                          <div>
                            <p className="font-bold text-botanic-950">Lagos Same-Day Priority Bike</p>
                            <p className="text-[11px] text-charcoal-600">Delivered within 3–5 hours</p>
                          </div>
                        </div>
                        <span className="font-bold text-botanic-900">{formatPrice(3800)}</span>
                      </label>
                    </>
                  ) : (
                    <div className="p-3 rounded-xl border border-gold-300 bg-gold-50/40 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-botanic-950">Nationwide Express Dispatch</p>
                        <p className="text-[11px] text-charcoal-600">GIGL / DHL tracked to {formData.state} (24–48hrs)</p>
                      </div>
                      <span className="font-bold text-botanic-900">{formatPrice(3500)}</span>
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-charcoal-800">Select Payment Gateway</label>
                  
                  <div className="space-y-2">
                    {/* Paystack */}
                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                        formData.paymentMethod === 'paystack'
                          ? 'border-botanic-900 bg-botanic-50/60'
                          : 'border-cream-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'paystack'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'paystack' })}
                        />
                        <div>
                          <p className="font-bold text-botanic-950 flex items-center gap-1.5">
                            Paystack Secure Checkout
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-bold">Fastest</span>
                          </p>
                          <p className="text-[11px] text-charcoal-600">Debit Card, Bank Transfer, USSD (*737#), Apple Pay</p>
                        </div>
                      </div>
                      <CreditCard className="w-4 h-4 text-botanic-700" />
                    </label>

                    {/* Direct Bank Transfer */}
                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                        formData.paymentMethod === 'bank-transfer'
                          ? 'border-botanic-900 bg-botanic-50/60'
                          : 'border-cream-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank-transfer' })}
                        />
                        <div>
                          <p className="font-bold text-botanic-950">Direct Naira Bank Transfer</p>
                          <p className="text-[11px] text-charcoal-600">GTBank / Zenith / Kuda (Instant verification)</p>
                        </div>
                      </div>
                      <Building2 className="w-4 h-4 text-botanic-700" />
                    </label>

                    {/* Pay on Delivery (Lagos only) */}
                    {formData.state === 'Lagos' && (
                      <label
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                          formData.paymentMethod === 'pod'
                            ? 'border-botanic-900 bg-botanic-50/60'
                            : 'border-cream-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="payment"
                            checked={formData.paymentMethod === 'pod'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'pod' })}
                          />
                          <div>
                            <p className="font-bold text-botanic-950">Pay on Delivery (Lagos Only)</p>
                            <p className="text-[11px] text-charcoal-600">POS or Cash upon arrival at your doorstep</p>
                          </div>
                        </div>
                        <Truck className="w-4 h-4 text-botanic-700" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Total Summary */}
                <div className="p-3 bg-cream-100 rounded-xl space-y-1.5 text-xs text-charcoal-700">
                  <div className="flex justify-between">
                    <span>Items Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span className="font-bold text-charcoal-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="font-bold text-charcoal-900">
                      {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-botanic-950 pt-1.5 border-t border-cream-300">
                    <span>Total Amount</span>
                    <span className="text-base text-botanic-950">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-charcoal-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-bit Encrypted Transaction • Verified Nigerian Merchant</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-botanic-900 hover:bg-botanic-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-luxury"
              >
                <span>Complete Order ({formatPrice(grandTotal)})</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>

          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">
                Order Placed Successfully!
              </span>
              <h3 className="font-serif text-3xl font-bold text-botanic-950">
                E se gan o, {formData.fullName}!
              </h3>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
                Your order is currently being hand-prepared by our Lagos lab. A confirmation SMS & email has been dispatched to <strong>{formData.phone}</strong>.
              </p>
            </div>

            {/* Reference Box */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-cream-100 border border-cream-200 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider">Tracking Reference</p>
                  <p className="text-base font-serif font-bold text-botanic-950">{orderId}</p>
                </div>
                <button
                  onClick={handleCopyOrderId}
                  className="px-3 py-1.5 bg-white hover:bg-cream-200 rounded-lg text-xs font-semibold text-botanic-900 border border-cream-300 flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xs text-charcoal-700 pt-2 border-t border-cream-200/80 space-y-1">
                <p><strong>Deliver To:</strong> {formData.address}, {formData.city}, {formData.state}</p>
                <p><strong>Payment Status:</strong> Pending Verification ({formData.paymentMethod.toUpperCase()})</p>
                <p><strong>Total Paid:</strong> {formatPrice(grandTotal)}</p>
              </div>
            </div>

            {/* Next steps buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/2348123456789?text=${whatsappReceipt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order to WhatsApp Dispatch</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-botanic-900 hover:bg-botanic-800 text-cream-50 rounded-xl text-xs font-bold transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
