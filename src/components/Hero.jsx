import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Sun, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Hero({ onOpenQuiz, onShopClick, onSelectProduct, products }) {
  const featuredProduct = products.find(p => p.id === 'sol-shield-spf50') || products[0];

  return (
    <section className="relative overflow-hidden bg-cream-50">
      
      {/* MOBILE HERO VIEW (Background Overlay Style) */}
      <div className="relative block lg:hidden min-h-[560px] flex items-end justify-center pb-10 px-5 text-center overflow-hidden">
        {/* Fullscreen Background Image */}
        <img
          src="/images/hero-model.jpg"
          alt="Lumière Botanics Melanin Skin Care"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        
        {/* Dark Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-botanic-950 via-botanic-950/80 to-botanic-950/30" />

        {/* Content Container */}
        <div className="relative z-10 space-y-4 max-w-sm mx-auto text-cream-50 animate-slide-up">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-[10px] font-bold text-gold-300 uppercase tracking-widest shadow-md">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Melanin-First Skincare</span>
          </div>

          {/* Minimalist Headline */}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-cream-50 leading-tight">
            Luminous Skin Under the African Sun.
            <span className="block text-gold-300 italic font-normal text-xl mt-1">
              Zero White Cast. Zero Compromise.
            </span>
          </h1>

          {/* Clean Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={onShopClick}
              className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-botanic-950 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Shop Formulations</span>
              <ArrowRight className="w-4 h-4 text-botanic-950" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="w-full py-3 bg-botanic-900/90 hover:bg-botanic-900 text-cream-50 border border-gold-500/40 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Ask Titi AI Assistant</span>
            </button>
          </div>

          {/* Rating Pill */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-cream-200/90 font-medium">
            <div className="flex text-gold-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span>4.95/5.0 Rating (14,000+ Nigerian Clients)</span>
          </div>
        </div>
      </div>


      {/* DESKTOP HERO VIEW (Original Side-by-Side Grid Layout) */}
      <div className="hidden lg:block relative py-14 lg:pb-24">
        {/* Subtle background ambient blur circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gold-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-botanic-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 items-center">

            {/* Left Hero Narrative */}
            <div className="col-span-7 space-y-6 text-left">

              {/* Top Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-botanic-900/5 border border-botanic-900/15 text-xs font-semibold text-botanic-900 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>NIGERIA'S PREMIER MELANIN-FIRST SKINCARE</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl lg:text-6xl tracking-tight text-botanic-950 font-normal leading-[1.12]">
                Luminous Skin Under the African Sun.{' '}
                <span className="italic font-normal text-gold-700 block mt-1">
                  Zero White Cast. Zero Compromise.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base lg:text-lg text-charcoal-800/85 max-w-2xl font-normal leading-relaxed">
                Dermatologist-formulated for heat, humidity, and deep skin tones. Fade stubborn hyperpigmentation, shield against UV rays without ashiness, and fortify your natural barrier.
              </p>

              {/* Key benefits list */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-medium text-botanic-950 max-w-lg">
                <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-cream-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Chalky White Cast</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-cream-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hydroquinone-Free</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-cream-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NAFDAC Certified Actives</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={onShopClick}
                  className="px-8 py-4 bg-botanic-900 text-cream-50 hover:bg-botanic-800 rounded-full font-medium text-sm tracking-wider uppercase transition shadow-luxury flex items-center gap-2 group"
                >
                  <span>Shop Formulations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-400" />
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-7 py-4 bg-white hover:bg-cream-100 text-botanic-950 border border-gold-400/70 rounded-full font-medium text-sm tracking-wide transition flex items-center gap-2 shadow-soft group"
                >
                  <Sparkles className="w-4 h-4 text-gold-600 group-hover:rotate-12 transition-transform" />
                  <span>Ask Titi AI Assistant</span>
                </button>
              </div>

              {/* Social Proof & Rating Bar */}
              <div className="pt-4 flex items-center gap-4 text-xs text-charcoal-800">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gold-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-botanic-950 shadow-sm">AO</div>
                  <div className="w-8 h-8 rounded-full bg-botanic-700 border-2 border-white flex items-center justify-center text-[10px] font-bold text-cream-100 shadow-sm">BE</div>
                  <div className="w-8 h-8 rounded-full bg-terracotta-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">ZI</div>
                  <div className="w-8 h-8 rounded-full bg-gold-600 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">TD</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-gold-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    ))}
                    <span className="font-bold text-charcoal-900 ml-1 text-xs">4.95 / 5.0</span>
                  </div>
                  <p className="text-charcoal-600 text-[11px] mt-0.5">
                    Trusted by over 14,000+ glowing clients across Lagos, Abuja & nationwide
                  </p>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Showcase */}
            <div className="col-span-5 relative flex justify-center">

              {/* Primary Portrait Card */}
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-cream-100 group">
                <img
                  src="/images/hero-model.jpg"
                  alt="Radiant Nigerian woman with dewy melanin skin"
                  className="w-full h-[520px] object-cover object-center group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-botanic-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Card Overlay Details */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-gold-700">CLINICALLY FORMULATED</span>
                      <h2 className="text-sm font-serif font-bold text-botanic-950">Sol Shield Invisible SPF 50</h2>
                    </div>
                    <button
                      onClick={() => onSelectProduct(featuredProduct)}
                      className="px-3 py-1.5 bg-botanic-900 hover:bg-botanic-800 text-cream-100 rounded-lg text-xs font-medium transition flex items-center gap-1 shadow-sm"
                    >
                      <span>View Actives</span>
                      <ArrowRight className="w-3 h-3 text-gold-300" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-charcoal-700 pt-2 border-t border-cream-200/70">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Invisible on Dark Skin
                    </span>
                    <span className="font-bold text-botanic-900">₦18,500</span>
                  </div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-4 -left-6 glass-card p-3 rounded-xl shadow-luxury max-w-[200px] border border-gold-300/40 flex items-center gap-2.5 animate-slide-up">
                <div className="w-9 h-9 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5 text-gold-600" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase text-gold-800">Humidity Proof</p>
                  <p className="text-xs font-semibold text-botanic-950">No Sweat Greasiness</p>
                </div>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute -bottom-5 -right-6 glass-card p-3 rounded-xl shadow-luxury border border-botanic-900/15 flex items-center gap-2.5 animate-slide-up">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase text-emerald-800">Lagos Same-Day</p>
                  <p className="text-xs font-semibold text-botanic-950">Orders before 2PM</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
