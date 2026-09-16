import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 35000; // ₦35,000 for free delivery in Lagos
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 2500;
  const total = subtotal - discountAmount + shippingCost;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const formatPrice = (amount) => {
    if (currency === 'USD') {
      return `$${(amount / 1500).toFixed(2)}`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'GLOW10') {
      setDiscountPercent(10);
      setCouponSuccess('10% VIP Discount Applied!');
    } else if (code === 'LAGOSGLOW') {
      setDiscountPercent(15);
      setCouponSuccess('15% Lagos Glow Discount Applied!');
    } else {
      setCouponError('Invalid code. Try GLOW10');
    }
  };

  // WhatsApp Order message generation
  const generateWhatsAppOrder = () => {
    const itemsList = cart
      .map((item) => `• ${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const msg = `*NEW ORDER - LUMIÈRE BOTANICS NIGERIA*\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Subtotal:* ${formatPrice(subtotal)}\n` +
      (discountAmount > 0 ? `*Discount (${discountPercent}%):* -${formatPrice(discountAmount)}\n` : '') +
      `*Estimated Delivery:* ${shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}\n` +
      `*Total Payable:* ${formatPrice(total)}\n\n` +
      `Please provide your delivery address & confirm payment details.`;

    return `https://wa.me/2348123456789?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-botanic-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-cream-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-botanic-900" />
            <h3 className="font-serif text-lg font-bold text-botanic-950">Your Shopping Bag</h3>
            <span className="text-xs bg-gold-500/20 text-gold-800 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-botanic-950 rounded-full hover:bg-cream-200 transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-botanic-900 text-cream-100 p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-gold-400" />
              {amountToFreeShipping === 0 ? (
                <strong className="text-emerald-400 font-bold">You qualify for FREE Lagos Delivery! 🎉</strong>
              ) : (
                <span>
                  Add <strong className="text-gold-300 font-bold">{formatPrice(amountToFreeShipping)}</strong> more for <strong>Free Lagos Delivery</strong>
                </span>
              )}
            </span>
          </div>
          <div className="w-full bg-botanic-950 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gold-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-charcoal-400">
                <ShoppingBag className="w-8 h-8 text-botanic-800" />
              </div>
              <p className="font-serif text-lg text-botanic-950 font-bold">Your bag is empty</p>
              <p className="text-xs text-charcoal-600 max-w-xs mx-auto">
                Discover our bestselling Zero-Cast Sunscreen and Dark Spot Clarifying Drops.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-botanic-900 text-cream-50 rounded-full text-xs font-semibold hover:bg-botanic-800 transition"
              >
                Explore Bestsellers
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-2xl border border-cream-200 bg-white shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl shrink-0 border border-cream-200"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-botanic-950 truncate">{item.name}</h4>
                  <p className="text-[11px] text-gray-500">{item.size}</p>
                  <p className="text-xs font-bold text-botanic-900">{formatPrice(item.price)}</p>

                  <div className="flex items-center justify-between pt-1">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-cream-300 rounded-lg bg-cream-50 px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-botanic-950 text-gray-500"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-botanic-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-botanic-950 text-gray-500"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations and Checkout CTAs */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-cream-200 bg-cream-50/70 space-y-3">
            
            {/* Promo code input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (e.g. GLOW10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white border border-cream-300 rounded-xl px-3 py-1.5 text-xs text-charcoal-900 uppercase placeholder:normal-case focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-botanic-900 hover:bg-botanic-800 text-cream-100 rounded-xl text-xs font-bold transition"
              >
                Apply
              </button>
            </form>
            {couponSuccess && <p className="text-[11px] text-emerald-700 font-semibold">{couponSuccess}</p>}
            {couponError && <p className="text-[11px] text-red-600 font-medium">{couponError}</p>}

            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-charcoal-700 pt-2 border-t border-cream-200/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>VIP Discount ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery (Lagos / Nationwide)</span>
                <span className="font-semibold text-charcoal-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-botanic-950 pt-2 border-t border-cream-200">
                <span>Total Payable</span>
                <span className="text-base text-botanic-950">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Options */}
            <div className="space-y-2 pt-2">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-botanic-900 hover:bg-botanic-800 text-cream-50 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>

              <a
                href={generateWhatsAppOrder()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct Order via WhatsApp</span>
              </a>
            </div>

            <p className="text-[10px] text-center text-charcoal-500 pt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Secured with Paystack, Flutterwave & Bank Transfer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
