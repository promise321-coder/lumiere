import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

export default function ProductModal({
  product,
  currency,
  onClose,
  onAddToCart
}) {
  const [activeTab, setActiveTab] = useState('actives');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const formatPrice = (nairaAmount) => {
    if (currency === 'USD') {
      const usd = (nairaAmount / 1500).toFixed(2);
      return `$${usd}`;
    }
    return `₦${nairaAmount.toLocaleString()}`;
  };

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Lumière Botanics! I would like to order: ${product.name} (${quantity} unit${quantity > 1 ? 's' : ''}) - Total: ${formatPrice(product.price * quantity)}. Please confirm delivery to my location.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-botanic-950/70 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 my-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-cream-100 hover:bg-cream-200 text-charcoal-700 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative bg-cream-100 flex items-center justify-center p-6 sm:p-8 min-h-[320px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[420px] object-cover rounded-2xl shadow-luxury"
            />
            {product.badge && (
              <span className="absolute top-8 left-8 bg-botanic-900 text-gold-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gold-700 font-bold uppercase tracking-wider">
                  {product.tag}
                </span>
                <div className="flex items-center gap-1 text-gold-600 font-semibold">
                  <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-botanic-950 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs font-medium text-charcoal-600">
                {product.subtitle} • <span className="text-botanic-800">{product.size}</span>
              </p>

              {/* Price Row */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl font-bold text-botanic-950">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to Dispatch
                </span>
              </div>

              {/* Description summary */}
              <p className="text-xs text-charcoal-700 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Tabs Navigation */}
              <div className="pt-3 border-b border-cream-200 flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('actives')}
                  className={`pb-2 transition ${
                    activeTab === 'actives'
                      ? 'border-b-2 border-botanic-900 text-botanic-950'
                      : 'text-gray-400 hover:text-charcoal-800'
                  }`}
                >
                  Clinical Actives
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 transition ${
                    activeTab === 'usage'
                      ? 'border-b-2 border-botanic-900 text-botanic-950'
                      : 'text-gray-400 hover:text-charcoal-800'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-botanic-900 text-botanic-950'
                      : 'text-gray-400 hover:text-charcoal-800'
                  }`}
                >
                  Ingredients
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-2 text-xs text-charcoal-700 min-h-[90px]">
                {activeTab === 'actives' && (
                  <div className="space-y-2">
                    {product.keyActives?.map((active, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-botanic-950">{active.name}:</strong> {active.role}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'usage' && (
                  <div className="space-y-2 bg-cream-100/70 p-3 rounded-xl border border-cream-200">
                    <span className="font-bold text-botanic-950 block">
                      {product.howToUse?.step}
                    </span>
                    <p className="text-charcoal-700 leading-relaxed">
                      {product.howToUse?.instruction}
                    </p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-1">
                    <p className="text-[11px] leading-relaxed text-charcoal-600 italic">
                      {product.ingredients}
                    </p>
                    <p className="text-[10px] text-emerald-800 font-semibold pt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Free of Hydroquinone, Parabens, Mercury & Steroids
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="space-y-3 pt-3 border-t border-cream-200">
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-cream-300 rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-charcoal-600 hover:text-botanic-950 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-botanic-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-charcoal-600 hover:text-botanic-950 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-botanic-900 hover:bg-botanic-800 text-cream-50'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold-300" />
                      <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <a
                href={`https://wa.me/2348123456789?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Order via WhatsApp (+234 812 345 6789)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
