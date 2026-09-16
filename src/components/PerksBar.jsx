import React from 'react';
import { Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_PERKS } from '../data/products';

export default function PerksBar() {
  const iconMap = {
    Truck: <Truck className="w-5 h-5 text-gold-600" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-gold-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-gold-600" />,
    MessageCircle: <MessageCircle className="w-5 h-5 text-gold-600" />
  };

  return (
    <section className="bg-cream-100/70 border-y border-cream-300/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_PERKS.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-white border border-gold-300/40 flex items-center justify-center shrink-0 shadow-sm">
                {iconMap[perk.icon]}
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-botanic-950 font-serif tracking-tight">{perk.title}</h2>
                <p className="text-xs text-charcoal-700 leading-relaxed">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
