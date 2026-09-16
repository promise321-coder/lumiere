import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  ArrowLeft,
  Bot,
  User,
  ShoppingBag,
  RotateCcw,
  Loader2,
  Package
} from 'lucide-react';

const STARTER_PROMPTS = [
  "What is the price of Sol Shield SPF 50?",
  "Recommend a routine for hyperpigmentation & dark spots",
  "What cleansers are best for oily, acne-prone skin?",
  "How fast is delivery to Lagos & other Nigerian states?"
];

// Fallback Groq model candidates in order of preference
const GROQ_MODELS = [
  'groq/compound',
  'openai/gpt-oss-20b',
  'llama3-70b-8192',
  'qwen/qwen3.8-27b'
];

export default function AIChatbotEnquiry({
  products,
  currency,
  onAddToCart,
  onNavigateToStore
}) {
  const [messages, setMessages] = useState(() => {
    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: "Hello! I am **Titi**, your personal dermatologist assistant. Ask me anything about our melanin skincare formulations, product prices, key ingredients, or custom routine recommendations for your skin goals!",
        suggestedProductIds: [] // No product cards by default until requested
      }
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const formatPrice = (amount) => {
    if (currency === 'USD') {
      return `$${(amount / 1500).toFixed(2)}`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  const renderFormattedContent = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={index} className="font-bold text-gold-700 bg-gold-50/60 px-1 py-0.5 rounded border border-gold-300/30">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Smart local response generator if API network is offline
  const generateLocalResponse = (query) => {
    const q = query.toLowerCase();

    // Check specific product match
    const matchedProducts = products.filter(p =>
      q.includes(p.name.toLowerCase()) ||
      q.includes(p.id.toLowerCase()) ||
      (p.tag && q.includes(p.tag.toLowerCase()))
    );

    // 1. Price Inquiry
    if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
      if (matchedProducts.length > 0) {
        const prod = matchedProducts[0];
        return {
          content: `**${prod.name}** is **${formatPrice(prod.price)}**.`,
          suggestedProductIds: [prod.id]
        };
      }
      return {
        content: "Prices: Sol Shield SPF 50 (₦18,500), Botanical Glow Serum (₦22,000), Salises Cleanser (₦16,000).",
        suggestedProductIds: []
      };
    }

    // 2. Delivery & Shipping
    if (q.includes('delivery') || q.includes('ship') || q.includes('lagos') || q.includes('location')) {
      return {
        content: "🚚 **Same-Day Lagos Delivery** (₦2,500) & 2-3 day interstate delivery across Nigeria (₦3,500).",
        suggestedProductIds: []
      };
    }

    // 3. Hyperpigmentation / Dark Spots
    if (q.includes('hyperpigmentation') || q.includes('dark spot') || q.includes('discoloration') || q.includes('glow')) {
      const serum = products.find(p => p.id === 'botanical-glow-drop-serum');
      const spf = products.find(p => p.id === 'sol-shield-spf50');
      return {
        content: "We recommend **Botanical Glow Serum** and **Sol Shield SPF 50** to fade dark spots and prevent hyperpigmentation.",
        suggestedProductIds: [serum?.id, spf?.id].filter(Boolean)
      };
    }

    // 4. Cleansers / Acne / Oily Skin
    if (q.includes('cleanser') || q.includes('acne') || q.includes('oily') || q.includes('pimple') || q.includes('wash')) {
      const cleanser = products.find(p => p.id === 'salises-purifying-cleanser');
      return {
        content: "For oily & acne-prone skin, we recommend **Salises Purifying Cleanser** with Salicylic Acid.",
        suggestedProductIds: [cleanser?.id].filter(Boolean)
      };
    }

    // 5. Explicit request for image / show product
    if (q.includes('image') || q.includes('picture') || q.includes('photo') || q.includes('show me') || q.includes('catalogue') || q.includes('catalog')) {
      return {
        content: "Here are our top melanin skincare formulations:",
        suggestedProductIds: products.slice(0, 3).map(p => p.id)
      };
    }

    // Default general answer
    if (matchedProducts.length > 0) {
      const prod = matchedProducts[0];
      return {
        content: `**${prod.name}** (${formatPrice(prod.price)}) — ${prod.tag || 'Formulated for melanin skin'}.`,
        suggestedProductIds: [prod.id]
      };
    }

    return {
      content: "Feel free to ask about specific products, prices, hyperpigmentation, or delivery!",
      suggestedProductIds: []
    };
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isGenerating) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsGenerating(true);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const productCatalogSummary = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      tag: p.tag,
      description: p.description,
      inStock: p.inStock !== false
    }));

    const systemPrompt = `You are "Titi," the warm, empathetic, and expert AI skincare assistant for a premium Nigerian beauty brand. Your job is to help customers find the best solutions for their skin concerns while making them feel heard, valued, and pampered. 

Follow these strict conversational guidelines:
1. TONE & PERSONALITY: Be deeply empathetic, warm, and human. Avoid sounding like a rigid database. Use a polite, friendly Nigerian customer service tone (warm, respectful, slightly enthusiastic). You can occasionally use mild, widely accepted local expressions like "Oh, I completely understand," "Don't worry, love," or "We’ve got you covered!" if a customer is frustrated with their skin.
2. EMPATHY FIRST: Before recommending a product or quoting a price, acknowledge the user's struggle. Validate their feelings (e.g., "Ah, dealing with oily skin can be so stressful, especially in this heat!").
3. BREVITY & SCANNABILITY: Keep your responses short, punchy, and conversational (ideally 2-3 sentences max). Do not dump long paragraphs.
4. FORMATTING: Separate the empathy/benefit statement from the price so it is easy to read. Never just blurt out a price alone.
5. RESTRICTIONS: Do not use robotic phrases like "Product Suggestion:" or "Price: ₦X". Speak like a human beauty consultant texting a friend.
   If asked about prices: State the exact price in ₦ (Naira).
6. If asked about oily/acne skin: Recommend Salises Purifying Cleanser.
7. If asked about dark spots/hyperpigmentation: Recommend Botanical Glow Drop Serum and Sol Shield SPF 50.
8. ONLY if the user asks for recommendations, specific products, or images, append a JSON block at the VERY END with product IDs:
9. Make your answer concise and a bit short.
10. Make sure you bolden the product name and prices by adding  before the product name and prices and ** after the product name and prices
\`\`\`json
{ "suggestedProductIds": ["product-id-1"] }
\`\`\`
Do NOT include JSON block for general questions.;

Example Transformation:
Robotic: "For oily skin, we suggest Salises Blemish & Pore Purifying Cleanser—it clears pores and controls shine. It’s priced at ₦15,200."
Human (Your Style): "Ah, dealing with oily skin in this our Naija weather can be so frustrating, but don't worry! I highly recommend our Salises Purifying Cleanser—it keeps the shine away and clears out pores beautifully. It goes for ₦15,200. Would you like me to add it to your cart?" 




Product Catalog:
${JSON.stringify(productCatalogSummary, null, 2)}`





    const chatHistory = messages
      .filter(m => m.id !== 'welcome-msg')
      .map((m) => ({
        role: m.role,
        content: m.content
      }));

    let apiSuccess = false;

    if (apiKey) {
      for (const modelName of GROQ_MODELS) {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: 'system', content: systemPrompt },
                ...chatHistory,
                { role: 'user', content: query.trim() }
              ],
              temperature: 0.3,
              max_tokens: 80
            })
          });

          if (response.status === 200) {
            const data = await response.json();
            let assistantText = data.choices?.[0]?.message?.content;

            if (assistantText) {
              let suggestedIds = [];

              // Extract JSON suggestedProductIds if present
              const jsonMatch = assistantText.match(/```json\s*(\{[\s\S]*?\})\s*```/);
              if (jsonMatch) {
                try {
                  const parsed = JSON.parse(jsonMatch[1]);
                  if (Array.isArray(parsed.suggestedProductIds)) {
                    suggestedIds = parsed.suggestedProductIds;
                  }
                } catch {
                  // Ignore JSON parse fail
                }
                assistantText = assistantText.replace(/```json\s*\{[\s\S]*?\}\s*```/g, '').trim();
              }

              setMessages((prev) => [
                ...prev,
                {
                  id: `ai-${Date.now()}`,
                  role: 'assistant',
                  content: assistantText,
                  suggestedProductIds: suggestedIds
                }
              ]);
              apiSuccess = true;
              break; // Success! Exit model retry loop
            }
          }
        } catch (err) {
          console.warn(`Groq model ${modelName} fetch error:`, err);
        }
      }
    }

    // Fallback if API fails or network offline
    if (!apiSuccess) {
      const localResult = generateLocalResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-local-${Date.now()}`,
          role: 'assistant',
          content: localResult.content,
          suggestedProductIds: localResult.suggestedProductIds
        }
      ]);
    }

    setIsGenerating(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: "Chat cleared! How can I assist you with Lumière Botanics skincare today?",
        suggestedProductIds: []
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col selection:bg-gold-400">

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-botanic-950 text-cream-50 shadow-xl border-b border-gold-500/20 px-4 py-3.5 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToStore}
              className="p-2 bg-botanic-900 hover:bg-botanic-800 text-gold-400 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold border border-gold-500/20 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Store</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-botanic-950 flex items-center justify-center font-bold shadow-md shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-serif text-base sm:text-lg font-bold text-cream-50">
                    Lumière AI Concierge
                  </h1>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-gray-400">
                  Melanin Skincare Expert & Product Enquiries
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 text-xs text-gray-400 hover:text-cream-50 hover:bg-botanic-900 rounded-xl transition flex items-center gap-1.5 border border-transparent hover:border-gold-500/20"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Chat</span>
          </button>
        </div>
      </header>

      {/* Chat Conversation Scroll Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 overflow-y-auto space-y-6 pb-40">

        {/* Intro Announcement Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-botanic-900/10 via-cream-100 to-gold-100/50 border border-gold-400/30 flex items-center gap-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-gold-600 shrink-0" />
          <div className="text-xs text-botanic-950 space-y-0.5">
            <p className="font-bold">Ask about product prices, ingredients, or customized routine advice</p>
            <p className="text-charcoal-600 text-[11px]">
              Trained on Lumière Botanics NAFDAC-certified formulations.
            </p>
          </div>
        </div>

        {/* Messages Stream */}
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const suggestedProducts = msg.suggestedProductIds
            ?.map((id) => products.find((p) => p.id === id))
            .filter(Boolean);

          const shouldShowProducts = suggestedProducts && suggestedProducts.length > 0;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'
                }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-botanic-900 text-gold-400 flex items-center justify-center shrink-0 shadow-sm border border-gold-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`space-y-3 max-w-lg sm:max-w-xl ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Bubble Text */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${isUser
                    ? 'bg-botanic-900 text-cream-50 rounded-tr-xs font-medium'
                    : 'bg-white text-botanic-950 border border-cream-200 rounded-tl-xs'
                    }`}
                >
                  <p className="whitespace-pre-line">{renderFormattedContent(msg.content)}</p>
                </div>

                {/* Embedded Suggested Product Cards (ONLY if explicitly requested or suggested) */}
                {shouldShowProducts && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 w-full">
                    {suggestedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 bg-white rounded-2xl border border-gold-400/40 shadow-sm flex items-center justify-between gap-3 group hover:border-gold-500 transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-xl border border-cream-200 shrink-0 bg-cream-50"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-botanic-950 truncate">
                              {prod.name}
                            </h5>
                            <p className="text-[11px] text-gold-700 font-bold">
                              {formatPrice(prod.price)}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(prod)}
                          className="p-2 bg-botanic-900 hover:bg-gold-500 text-cream-50 hover:text-botanic-950 rounded-xl transition shrink-0 shadow-xs"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-gold-500 text-botanic-950 flex items-center justify-center shrink-0 shadow-sm font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Generator State */}
        {isGenerating && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-botanic-900 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 bg-white border border-cream-200 rounded-2xl rounded-tl-xs text-xs text-charcoal-600 flex items-center gap-2 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-gold-600" />
              <span>Lumière AI is analyzing skincare catalog...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Fixed Mobile Bottom Input & Quick Prompts Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-cream-200 p-4 sm:p-5 shadow-2xl">
        <div className="max-w-4xl mx-auto space-y-3">

          {/* Starter Quick Prompts Scrollable Bar */}
          {messages.length < 5 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {STARTER_PROMPTS.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 bg-cream-100 hover:bg-gold-100 text-botanic-950 border border-cream-300 rounded-full text-xs font-medium whitespace-nowrap transition shrink-0 hover:border-gold-400"
                >
                  {promptText}
                </button>
              ))}
            </div>
          )}

          {/* Form Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about skincare products, prices, hyperpigmentation..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isGenerating}
              className="flex-1 bg-cream-50 border border-cream-300 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-botanic-950 placeholder:text-gray-400 focus:outline-none focus:border-botanic-800 focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isGenerating}
              className="p-3 bg-botanic-900 hover:bg-botanic-800 disabled:opacity-50 text-cream-50 font-bold rounded-2xl transition shadow-md shrink-0"
            >
              <Send className="w-4 h-4 text-gold-400" />
            </button>
          </form>
        </div>
      </footer>

    </div>
  );
}
