import React, { useState } from 'react';
import { Sparkles, Bot, X } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-botanic-950 text-cream-50 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-gold-400/40 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>Ask <strong>Titi AI</strong> for skincare & price info</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white p-0.5 ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating AI Button Navigating to #/enquiry */}
      <a
        href="#/enquiry"
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-botanic-950 to-botanic-900 border-2 border-gold-400/60 text-gold-300 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="Chat with Titi AI Assistant"
      >
        <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-400 rounded-full border-2 border-botanic-950 animate-pulse flex items-center justify-center text-[9px] font-bold text-botanic-950">
          ✨
        </span>
      </a>
    </div>
  );
}
