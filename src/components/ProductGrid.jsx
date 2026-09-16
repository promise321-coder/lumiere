import React, { useState, useMemo } from 'react';
import { CATEGORIES, SKIN_CONCERNS } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Sparkles, Filter, Check, X } from 'lucide-react';

export default function ProductGrid({
  products,
  currency,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAddToCart,
  onQuickView
}) {
  const [selectedConcern, setSelectedConcern] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Concern match
      const matchConcern =
        selectedConcern === 'all' || product.concerns.includes(selectedConcern);

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.shortDesc.toLowerCase().includes(query) ||
        product.ingredients.toLowerCase().includes(query);

      return matchCategory && matchConcern && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedConcern, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-16 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-800 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Targeted Clinical Formulations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-botanic-950 font-normal tracking-tight">
            Curated for Nigerian Skin & Climate
          </h2>
          <p className="text-sm text-charcoal-700 leading-relaxed">
            Every formula is pH-balanced, hydroquinone-free, and tested for high performance under intense heat and humidity.
          </p>
        </div>



        {/* Active Category Banner Indicator if filtered from Navbar */}
        {selectedCategory !== 'all' && (
          <div className="flex items-center justify-center gap-2 my-4">
            <span className="text-xs text-charcoal-700 font-medium">Filtering by Category:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanic-900 text-gold-300 text-xs font-bold shadow-sm">
              <span>{CATEGORIES.find(c => c.id === selectedCategory)?.label || selectedCategory}</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="hover:text-white ml-1 p-0.5 rounded-full hover:bg-botanic-800 transition"
                title="Clear Category Filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-gold-700 underline font-semibold hover:text-botanic-950 transition ml-1"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Sub-Filters: Concern Pills & Sorting */}
        <div className="mt-4 mb-8 pt-4 border-t border-cream-200/80 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Target Concerns */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-600 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-gold-600" /> Filter Concern:
            </span>
            <button
              onClick={() => {
                setSelectedConcern('all');
                setSelectedCategory('all');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${selectedConcern === 'all' && selectedCategory === 'all'
                  ? 'bg-gold-500 text-botanic-950 font-bold'
                  : 'bg-white text-charcoal-600 hover:bg-cream-200 border border-cream-200'
                }`}
            >
              All Concerns
            </button>
            {SKIN_CONCERNS.map((concern) => (
              <button
                key={concern.id}
                onClick={() => {
                  setSelectedConcern(concern.id);
                  setSelectedCategory('all');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${selectedConcern === concern.id
                    ? 'bg-gold-500 text-botanic-950 font-bold'
                    : 'bg-white text-charcoal-600 hover:bg-cream-200 border border-cream-200'
                  }`}
              >
                {concern.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Counter */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="text-xs text-charcoal-600 font-medium">
              Showing <strong className="text-botanic-950">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-botanic-700" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-cream-300 rounded-lg px-2.5 py-1.5 text-xs text-charcoal-800 focus:outline-none focus:border-gold-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="reviews">Sort: Most Reviews</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-cream-200 p-8 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-charcoal-600">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-botanic-950">No matching formulations found</h3>
            <p className="text-xs text-charcoal-600">
              Try adjusting your search query or selected concerns to explore other treatments.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcern('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-botanic-900 text-cream-50 rounded-full text-xs font-semibold hover:bg-botanic-800 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
