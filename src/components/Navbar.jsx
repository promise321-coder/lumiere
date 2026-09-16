import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  searchQuery,
  setSearchQuery,
  onSelectCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { label: 'Shop All', action: () => onSelectCategory('all') },
    { label: 'Zero-Cast SPF', action: () => onSelectCategory('sun-defense') },
    { label: 'Glow Serums', action: () => onSelectCategory('serums') },
    { label: 'Cleansers', action: () => onSelectCategory('cleansers') },
    { label: "Men's Grooming", action: () => onSelectCategory('mens-grooming') }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-cream-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-botanic-950 lg:hidden hover:text-gold-600 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="flex flex-col items-center group">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-semibold text-botanic-950 uppercase group-hover:text-botanic-800 transition">
              LUMIÈRE
            </span>
            <span className="text-[10px] tracking-[0.35em] text-gold-600 uppercase font-medium -mt-1">
              BOTANICS NIGERIA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  cat.action();
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-1 hover:text-gold-600 transition"
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Input / Toggler */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-cream-50 border border-gold-300 rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-60 transition-all">
                  <Search className="w-4 h-4 text-botanic-700 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search SPF, Niacinamide..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full text-xs bg-transparent focus:outline-none text-botanic-950 placeholder:text-gray-400"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    className="text-gray-400 hover:text-botanic-950 text-xs ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-botanic-950 hover:text-gold-600 transition rounded-full hover:bg-cream-100"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Single Elegant AI Consultation Button */}
            <a
              href="#/enquiry"
              className="flex items-center gap-1.5 text-xs font-bold text-botanic-950 bg-gradient-to-r from-gold-400/20 via-cream-100 to-gold-400/20 border border-gold-500/30 hover:border-gold-500 px-3.5 py-1.5 rounded-full transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span className="hidden sm:inline">Ask AI Concierge</span>
              <span className="sm:hidden">AI Ask</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-botanic-900 text-cream-50 hover:bg-botanic-800 rounded-full transition shadow-md flex items-center justify-center group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-gold-300 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-cream-200 px-6 py-6 space-y-4 shadow-2xl animate-fade-in backdrop-blur-md">
          {/* Mobile search bar */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-botanic-600 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream-50 border border-cream-200 rounded-xl pl-9 pr-4 py-2 text-xs text-botanic-950 placeholder:text-gray-400 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  cat.action();
                  setMobileMenuOpen(false);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-botanic-950 hover:bg-cream-100 flex items-center justify-between transition"
              >
                <span>{cat.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            ))}

            <a
              href="#/enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-botanic-950 bg-gold-100/60 border border-gold-300/50 flex items-center justify-between transition mt-2"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                AI Skincare Enquiry & Consultation
              </span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
