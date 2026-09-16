import React from 'react';
import { PhoneCall, Sparkles, Truck, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar({ currency, setCurrency }) {
  return (
    <div className="bg-botanic-900 text-cream-100 text-xs py-2 px-4 border-b border-botanic-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        {/* Left message */}
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="inline-flex items-center justify-center bg-gold-500/20 text-gold-400 p-0.5 rounded">
            <Truck className="w-3.5 h-3.5" />
          </span>
          <span>
            <strong className="text-gold-400">Same-Day Lagos Delivery</strong> on orders before 2 PM • Nationwide dispatch in 24–48hrs
          </span>
        </div>

        {/* Center alert */}
        <div className="hidden lg:flex items-center gap-1.5 text-cream-200/80">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Use code <span className="font-bold text-cream-50 bg-botanic-800 px-1.5 py-0.5 rounded text-[11px] tracking-widest">GLOW10</span> for 10% off your first order</span>
        </div>

        {/* Right side quick actions */}
        <div className="flex items-center gap-4 text-cream-200">
          <a
            href="https://wa.me/2348123456789?text=Hello%20Lumi%C3%A8re%20Botanics!%20I%20need%20skincare%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gold-400 transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Skin Advisory:</span> +234 812 345 6789
          </a>
          <span className="text-botanic-700">|</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-1.5 py-0.5 rounded transition ${currency === 'NGN' ? 'bg-gold-500 text-botanic-950 font-bold' : 'hover:text-cream-100 opacity-70'}`}
              title="Nigerian Naira"
            >
              ₦ NGN
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 rounded transition ${currency === 'USD' ? 'bg-gold-500 text-botanic-950 font-bold' : 'hover:text-cream-100 opacity-70'}`}
              title="US Dollar Preview"
            >
              $ USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
