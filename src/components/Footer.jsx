import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Heart, Sparkles, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenQuiz, onSelectCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-botanic-950 text-cream-100 pt-16 pb-12 border-t border-botanic-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-botanic-900 border border-gold-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Exclusive Welcome Privilege
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 font-bold">
              Join the Lumière Glow Society
            </h3>
            <p className="text-xs text-cream-200/80 max-w-lg">
              Receive <strong>₦2,000 off</strong> your first order, plus insider dermatologist guides for melanin sun care and dark spot management.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-center text-xs text-emerald-200 font-medium">
                ✨ Thank you for joining! Use code <strong className="text-white bg-emerald-800 px-2 py-0.5 rounded">GLOW2000</strong> at checkout for ₦2,000 off!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-botanic-950 border border-gold-500/30 rounded-xl px-4 py-3 text-xs text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-botanic-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Claim ₦2k</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-cream-50 uppercase">
                LUMIÈRE
              </span>
              <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-medium">
                BOTANICS NIGERIA
              </span>
            </div>
            <p className="text-cream-200/70 leading-relaxed max-w-sm">
              Clinically formulated in Nigeria with high-potency botanical actives and dermatological science. Zero white cast, zero harsh bleaches, pure healthy radiance for all melanin complexions.
            </p>
            <div className="pt-2 text-cream-300/80 space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Showroom: 14 Akin Adesola St, Victoria Island, Lagos</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Customer Care & WhatsApp: +234 812 345 6789</span>
              </p>
            </div>
          </div>

          {/* Formulations Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-gold-400 text-xs">Formulations</h4>
            <ul className="space-y-2 text-cream-200/80">
              <li><button onClick={() => onSelectCategory('sun-defense')} className="hover:text-gold-300 transition">Sol Shield SPF 50</button></li>
              <li><button onClick={() => onSelectCategory('serums')} className="hover:text-gold-300 transition">Dark Spot Drops</button></li>
              <li><button onClick={() => onSelectCategory('cleansers')} className="hover:text-gold-300 transition">Purifying Cleansers</button></li>
              <li><button onClick={() => onSelectCategory('moisturizers')} className="hover:text-gold-300 transition">Barrier Creams</button></li>
              <li><button onClick={() => onSelectCategory('mens-grooming')} className="hover:text-gold-300 transition">Men's Razor Defense</button></li>
              <li><button onClick={() => onSelectCategory('body-care')} className="hover:text-gold-300 transition">Body & Joint Silk Milk</button></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-gold-400 text-xs">Customer Care</h4>
            <ul className="space-y-2 text-cream-200/80">
              <li><a href="https://wa.me/2348123456789" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition">WhatsApp Consultation</a></li>
              <li><a href="#/enquiry" className="hover:text-gold-300 transition text-left">Ask AI Skincare Concierge</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition">Delivery Rates (Lagos & Interstate)</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition">Refund & Guarantee Policy</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-gold-400 text-xs">Clinical Standards</h4>
            <ul className="space-y-2 text-cream-200/80">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 100% NAFDAC Certified Actives</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Hydroquinone & Mercury Free</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Cruelty-Free & Dermatologist Tested</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Ethically Harvested African Shea</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-botanic-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-cream-300/60">
          <p>© 2026 LUMIÈRE BOTANICS NIGERIA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="bg-botanic-900 px-2 py-1 rounded border border-botanic-800 text-cream-200">
              💳 Secured by Paystack & Flutterwave
            </span>
            <span>Made with <Heart className="w-3 h-3 text-red-400 inline mx-0.5" /> in Lagos, Nigeria</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
