import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Package,
  Sparkles,
  ArrowLeft,
  Search,
  RotateCcw,
  Check,
  DollarSign,
  AlertTriangle,
  X,
  Upload,
  Eye,
  Filter
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'serums', label: 'Serums' },
  { id: 'cleansers', label: 'Cleansers' },
  { id: 'moisturizers', label: 'Moisturizers' },
  { id: 'sunscreen', label: 'Sunscreen' },
  { id: 'exfoliants', label: 'Exfoliants' },
  { id: 'out-of-stock', label: 'Out of Stock' }
];

const PRESET_IMAGES = [
  { label: 'Serum Bottle', url: '/Images/Botanical Glow Drop Serum.png' },
  { label: 'Cleanser', url: '/Images/Salises Purifying Cleanser.png' },
  { label: 'Moisturizer Soufflé', url: '/Images/Berry Refined Barrier Soufflé.png' },
  { label: 'SPF 50 Sunscreen', url: '/Images/Sol Shield SPF 50.png' },
  { label: 'Night Elixir', url: '/Images/Night Recovery Elixir.png' },
  { label: 'Exfoliant', url: '/Images/Lactic Glow Dermafoliant.png' }
];

export default function AdminDashboard({
  products,
  currency,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetCatalog,
  onNavigateToStore
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [quickPriceEditId, setQuickPriceEditId] = useState(null);
  const [quickPriceValue, setQuickPriceValue] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'serums',
    tag: 'Melanin Glow',
    description: '',
    image: PRESET_IMAGES[0].url,
    inStock: true
  });

  // Calculate statistics
  const totalCount = products.length;
  const inStockCount = products.filter(p => p.inStock !== false).length;
  const outOfStockCount = products.filter(p => p.inStock === false).length;

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tag?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'out-of-stock') return matchesSearch && product.inStock === false;
    return matchesSearch && product.category === selectedCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: 'serums',
      tag: 'Melanin Care',
      description: '',
      image: PRESET_IMAGES[0].url,
      inStock: true
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || 'serums',
      tag: product.tag || '',
      description: product.description || '',
      image: product.image || PRESET_IMAGES[0].url,
      inStock: product.inStock !== false
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const productPayload = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formData.name.trim(),
      price: Number(formData.price),
      category: formData.category,
      tag: formData.tag.trim() || 'Melanin Care',
      description: formData.description.trim(),
      image: formData.image || PRESET_IMAGES[0].url,
      inStock: formData.inStock
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setIsAddModalOpen(false);
  };

  const handleToggleStock = (product) => {
    onUpdateProduct({
      ...product,
      inStock: product.inStock === false ? true : false
    });
  };

  const handleSaveQuickPrice = (product) => {
    const newPrice = Number(quickPriceValue);
    if (!isNaN(newPrice) && newPrice > 0) {
      onUpdateProduct({
        ...product,
        price: newPrice
      });
    }
    setQuickPriceEditId(null);
  };

  const formatPrice = (amount) => {
    if (currency === 'USD') {
      return `$${(amount / 1500).toFixed(2)}`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-cream-100 text-botanic-950 pb-20 selection:bg-gold-400">
      
      {/* Top Mobile Header */}
      <header className="sticky top-0 z-40 bg-botanic-950 text-cream-50 shadow-xl border-b border-gold-500/20 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToStore}
              className="p-2 bg-botanic-900 hover:bg-botanic-800 text-gold-400 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold border border-gold-500/20 shrink-0"
              title="Return to Store Front"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Store</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-cream-50">
                  Lumière Vendor Admin
                </h1>
                <span className="bg-gold-500/20 text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-gold-400/30 shrink-0">
                  Mobile Portal
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Manage your product catalog, prices, and stock status on the go.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetCatalog}
              className="p-2 sm:px-3 text-xs text-gray-400 hover:text-rose-400 hover:bg-botanic-900 rounded-xl transition flex items-center gap-1 border border-transparent hover:border-rose-900"
              title="Reset Catalog to Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onNavigateToStore}
              className="px-3 py-2 bg-gold-500 hover:bg-gold-600 text-botanic-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shrink-0"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Live Store</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Vendor Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">

        {/* Mobile Stats Dashboard */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-cream-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-charcoal-600">
              <span className="font-medium">Total Items</span>
              <Package className="w-4 h-4 text-botanic-800" />
            </div>
            <p className="text-xl sm:text-3xl font-bold font-serif text-botanic-950 mt-1">
              {totalCount}
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-800">
              <span className="font-medium">In Stock</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-3xl font-bold font-serif text-emerald-950 mt-1">
              {inStockCount}
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-rose-800">
              <span className="font-medium">Out of Stock</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-xl sm:text-3xl font-bold font-serif text-rose-950 mt-1">
              {outOfStockCount}
            </p>
          </div>
        </div>

        {/* Action Header & Mobile Add CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-cream-200 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search product by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-botanic-800 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto px-5 py-3 bg-botanic-900 hover:bg-botanic-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4 text-gold-400" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Category Pills (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-botanic-950 text-cream-50 border-botanic-950 shadow-sm'
                    : 'bg-white text-charcoal-700 border-cream-300 hover:border-botanic-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product List Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-cream-200 space-y-3 p-6">
            <Package className="w-10 h-10 mx-auto text-gray-300" />
            <h3 className="font-serif text-lg font-bold text-botanic-950">No products found</h3>
            <p className="text-xs text-charcoal-600 max-w-sm mx-auto">
              No items match your filter criteria. Add a new product or clear your search.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-botanic-900 text-cream-50 text-xs font-bold rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 text-gold-400" /> Add Product Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const isInStock = product.inStock !== false;
              const isEditingPrice = quickPriceEditId === product.id;

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden flex flex-col justify-between ${
                    isInStock ? 'border-cream-200 hover:border-gold-400' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="p-4 space-y-3">
                    {/* Top Row: Image & Info */}
                    <div className="flex items-start gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-cream-200 shrink-0 bg-cream-100"
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 truncate">
                            {product.category || 'Skincare'}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              isInStock
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isInStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-botanic-950 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-charcoal-600 line-clamp-1">
                          {product.tag || product.description}
                        </p>
                      </div>
                    </div>

                    {/* Price & Quick Price Editor */}
                    <div className="pt-2 border-t border-cream-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-charcoal-600 font-medium">Price:</span>
                        {isEditingPrice ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={quickPriceValue}
                              onChange={(e) => setQuickPriceValue(e.target.value)}
                              className="w-24 px-2 py-1 bg-cream-50 border border-botanic-800 rounded-lg text-xs font-bold text-botanic-950 focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveQuickPrice(product)}
                              className="p-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                              title="Save Price"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setQuickPriceEditId(null)}
                              className="p-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setQuickPriceEditId(product.id);
                              setQuickPriceValue(product.price);
                            }}
                            className="group flex items-center gap-1 hover:text-gold-700 font-bold text-sm text-botanic-950 transition"
                            title="Tap to quick edit price"
                          >
                            <span>{formatPrice(product.price)}</span>
                            <Edit2 className="w-3 h-3 text-gray-400 group-hover:text-gold-600" />
                          </button>
                        )}
                      </div>

                      {/* Stock Toggle Switch */}
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${
                          isInStock
                            ? 'bg-cream-100 text-charcoal-700 border-cream-300 hover:bg-rose-100 hover:text-rose-800 hover:border-rose-300'
                            : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        {isInStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </button>
                    </div>
                  </div>

                  {/* Card Bottom Controls */}
                  <div className="px-4 py-2.5 bg-cream-50/80 border-t border-cream-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="text-botanic-800 font-bold hover:text-botanic-950 flex items-center gap-1 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Details
                    </button>

                    <button
                      onClick={() => setDeletingProductId(product.id)}
                      className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal (Mobile Fullscreen / Bottom Sheet) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-botanic-950/75 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 p-6 animate-slide-up space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-xl font-bold text-botanic-950">
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-gray-400 hover:text-botanic-950 rounded-full hover:bg-cream-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Product Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-botanic-950 uppercase tracking-wider">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Salicylic Cleansing Gel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-semibold text-botanic-950 focus:outline-none focus:border-botanic-800"
                />
              </div>

              {/* Price & Category Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-botanic-950 uppercase tracking-wider">
                    Price (₦ NGN) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="18500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-semibold text-botanic-950 focus:outline-none focus:border-botanic-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-botanic-950 uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-semibold text-botanic-950 focus:outline-none focus:border-botanic-800"
                  >
                    <option value="serums">Serums</option>
                    <option value="cleansers">Cleansers</option>
                    <option value="moisturizers">Moisturizers</option>
                    <option value="sunscreen">Sunscreen</option>
                    <option value="exfoliants">Exfoliants</option>
                  </select>
                </div>
              </div>

              {/* Tag / Sub-headline */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-botanic-950 uppercase tracking-wider">
                  Key Benefit Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brightening & Hyperpigmentation"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-semibold text-botanic-950 focus:outline-none focus:border-botanic-800"
                />
              </div>

              {/* Image Selection / Presets / File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-botanic-950 uppercase tracking-wider">
                  Product Image
                </label>

                {/* File Upload Button from Phone/Computer */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <label
                    htmlFor="fileUploadInput"
                    className="py-2.5 px-4 bg-botanic-900 hover:bg-botanic-800 text-cream-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition shrink-0 active:scale-95"
                  >
                    <Upload className="w-4 h-4 text-gold-400" />
                    <span>Upload Image from Gallery / File</span>
                  </label>
                  <input
                    id="fileUploadInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64Data = event.target?.result;
                        if (base64Data) {
                          setFormData({ ...formData, image: base64Data });
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="hidden"
                  />
                  {formData.image && (
                    <div className="flex items-center gap-2 p-1.5 bg-cream-100 border border-cream-200 rounded-xl">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-8 h-8 object-cover rounded-lg shrink-0 border border-gold-400"
                      />
                      <span className="text-[10px] font-bold text-emerald-700 truncate">
                        Photo Loaded!
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-gray-500 font-medium pt-1">
                  Or select a preset product image:
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      type="button"
                      key={preset.url}
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`p-1.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                        formData.image === preset.url
                          ? 'border-gold-500 bg-gold-50 shadow-sm'
                          : 'border-cream-200 bg-cream-50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span className="text-[10px] font-bold text-botanic-950 truncate w-full">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Or paste custom image URL..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs font-medium text-botanic-950 focus:outline-none focus:border-botanic-800"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-botanic-950 uppercase tracking-wider">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Formulated specifically for melanin skin..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-medium text-botanic-950 focus:outline-none focus:border-botanic-800"
                />
              </div>

              {/* In Stock Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 rounded text-botanic-950 focus:ring-botanic-900 border-gray-300 cursor-pointer"
                />
                <label htmlFor="inStockCheck" className="text-xs font-bold text-botanic-950 cursor-pointer">
                  Available in Stock
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 border border-cream-300 hover:bg-cream-100 rounded-xl text-xs font-bold text-charcoal-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-botanic-900 hover:bg-botanic-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg"
                >
                  {editingProduct ? 'Save Changes' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-botanic-950/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl border border-cream-200 p-6 max-w-sm w-full space-y-4 shadow-2xl animate-slide-up text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-botanic-950">Delete Product?</h4>
              <p className="text-xs text-charcoal-600">
                Are you sure you want to permanently remove this product from your inventory?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="flex-1 py-2.5 border border-cream-300 text-xs font-bold rounded-xl hover:bg-cream-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(deletingProductId);
                  setDeletingProductId(null);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
