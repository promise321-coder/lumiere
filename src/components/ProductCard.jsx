import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';

export default function ProductCard({
  product,
  currency,
  onAddToCart,
  onQuickView
}) {
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (nairaAmount) => {
    if (currency === 'USD') {
      // Approximate ₦1,500 to $1 USD for reference
      const usd = (nairaAmount / 1500).toFixed(2);
      return `$${usd}`;
    }
    return `₦${nairaAmount.toLocaleString()}`;
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-cream-200/80 hover:border-gold-400/60 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge Overlay (e.g. Bestseller, Zero Cast) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-botanic-900/90 backdrop-blur-md text-gold-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Quick View Button on Desktop Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute inset-x-4 bottom-3 py-2 bg-white/95 backdrop-blur-md text-botanic-950 hover:bg-botanic-900 hover:text-cream-100 text-xs font-semibold rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hidden sm:flex items-center justify-center gap-1.5 border border-cream-200"
          aria-label="Quick View details"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View Actives</span>
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating and Size */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-gold-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">{product.size}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-base font-bold text-botanic-950 group-hover:text-gold-700 transition leading-snug">
            {product.name}
          </h2>

          {/* Subtitle / Key Benefit */}
          <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-cream-200/60 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-botanic-950">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> In Stock Lagos
            </span>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-botanic-900 hover:bg-botanic-800 text-cream-50 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
                <span className="hidden sm:inline">Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
