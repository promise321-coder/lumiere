import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-cream-100/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
            Verified Nigerian Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-botanic-950 font-normal tracking-tight">
            Real Glow Stories Across the Nation
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            From Lagos Mainland to Abuja and Port Harcourt — read how thousands transformed their skin barrier and hyperpigmentation.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-cream-200/90 shadow-soft flex flex-col justify-between space-y-4 hover:shadow-luxury transition duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-600">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-cream-300" />
                </div>

                <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-bold text-botanic-950">{t.name}</h3>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Buyer
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500">{t.location}</p>
                <p className="text-[11px] text-gold-700 font-medium">Routine: {t.productUsed}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
