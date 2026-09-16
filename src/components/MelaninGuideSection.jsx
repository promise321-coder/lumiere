import React from 'react';
import { Sun, Shield, Sparkles, AlertTriangle, Droplets, CheckCircle2 } from 'lucide-react';

export default function MelaninGuideSection({ onOpenQuiz }) {
  const pillars = [
    {
      icon: <Sun className="w-6 h-6 text-gold-600" />,
      title: "Why Melanin Needs Daily SPF 50",
      desc: "While melanin provides an inherent baseline defense against sunburn, UVA rays penetrate deeply, accelerating hyperpigmentation, melasma, and stubborn dark spots. Sol Shield SPF 50 shields melanin without chalky ashiness."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-600" />,
      title: "Gentle Brightening, Zero Bleaching",
      desc: "Harsh chemicals like hydroquinone or topical steroids damage the skin barrier and cause rebound ochronosis. We formulate with pure Alpha Arbutin, Niacinamide, and Licorice Root for safe, permanent clarity."
    },
    {
      icon: <Droplets className="w-6 h-6 text-gold-600" />,
      title: "Heat & Humidity Barrier Balance",
      desc: "Lagos traffic heat followed by frigid air-conditioned offices strips the skin's moisture mantle. We use plant-derived squalane and non-comedogenic African shea that lock in hydration without clogging pores."
    }
  ];

  return (
    <section className="py-20 bg-botanic-900 text-cream-100 relative overflow-hidden">
      {/* Background soft glow accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5" /> The Melanin Science Protocol
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-cream-50">
            Formulated for Your Complexion. Built for Your Climate.
          </h2>
          <p className="text-sm text-cream-200/80 leading-relaxed">
            Most imported skincare was engineered for dry, cold European or North American weather. Lumière Botanics is precision-formulated in Nigeria for rich skin tones living under equatorial sun.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-dark p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 space-y-4 hover:-translate-y-1 shadow-luxury"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-cream-50">{pillar.title}</h3>
              <p className="text-xs text-cream-200/80 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner CTA inside section */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-botanic-800 to-botanic-950 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-cream-50">
              Not sure which formulation suits your skin?
            </h3>
            <p className="text-xs text-cream-200/80">
              Take our interactive 60-second diagnostic quiz to receive a dermatologist-calibrated 3-step regimen.
            </p>
          </div>
          <button
            onClick={onOpenQuiz}
            className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-botanic-950 font-bold text-xs uppercase tracking-wider rounded-full transition shadow-glow shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-botanic-950" />
            <span>Discover Your Routine</span>
          </button>
        </div>

      </div>
    </section>
  );
}
