import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { usePageSEO } from '../hooks/usePageSEO';
import { ShoppingBag, Search, Filter, ChevronRight, LayoutGrid, List, CreditCard, Shield, Check } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';
import { PaymentIcons } from '../components/PaymentIcons';

const categories = ['All', 'Cameras', 'Retrofits', 'Repairs', 'Parts'] as const;

const PaymentIcon = ({ type }: { type: string }) => (
  <span 
    className="w-10 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:text-current" 
    dangerouslySetInnerHTML={{ __html: PaymentIcons[type as keyof typeof PaymentIcons] || '' }} 
  />
);

const PAYMENT_METHODS = [
  { name: 'Visa', type: 'visa' },
  { name: 'Mastercard', type: 'mastercard' },
  { name: 'Apple Pay', type: 'applepay' },
  { name: 'PayPal', type: 'paypal' },
  { name: 'Klarna', type: 'klarna' },
];

const WARRANTY_INFO = {
  new: '12 months warranty',
  used: '28 days warranty - security seal applied',
};

export default function Shop() {
  const { t } = useTranslation();
  usePageSEO({
    title: 'Shop — OEM VAG Parts, Cameras & Retrofit Kits Leicester',
    description: 'Buy OEM-quality VAG parts, reverse cameras, retrofit kits and accessories for VW, Audi, SEAT, Skoda, Porsche and Bentley. Expert fitting available across Leicester.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vagleicester.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://vagleicester.co.uk/shop' },
      ],
    },
  });
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedId, setAddedId] = useState<string | null>(null);
  const allProducts = useProducts();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-4"
            >
              <ShoppingBag className="w-3 h-3" />
              {t('nav.shop')}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold font-outfit text-black dark:text-white mb-4"
            >
              Premium VAG <span className="text-brand">Upgrades</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-black/60 dark:text-white/60 max-w-xl text-lg"
            >
              Enhance your driving experience with our range of OEM retrofit components and expert repair services.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 w-full md:w-auto"
          >
            {/* View Toggle */}
            <div className="flex bg-white/50 dark:bg-white/5 p-1 rounded-2xl border border-vw-blue/10 dark:border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === 'grid' ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-black/40 dark:text-white/40 hover:text-brand"
                )}
                title="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === 'list' ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-black/40 dark:text-white/40 hover:text-brand"
                )}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40 group-focus-within:text-brand transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-11 pr-4 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-black/30 dark:placeholder:text-white/30 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === category
                  ? "bg-brand text-white shadow-lg shadow-brand/20 scale-105"
                    : "bg-white/50 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-brand/10 hover:text-brand"
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Products Container */}
        <div className={cn(
          "grid gap-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <div className={cn(
                  "glass-dark overflow-hidden rounded-3xl border border-white/10 group-hover:border-brand/30 transition-all duration-500 shadow-xl flex bg-white dark:bg-vw-blue/20",
                  viewMode === 'grid' ? "flex-col h-full" : "flex-col md:flex-row items-center"
                )}>
                  {/* Image Container */}
                  <div className={cn(
                    "relative overflow-hidden bg-white/5 shrink-0",
                    viewMode === 'grid' ? "h-64 w-full" : "h-64 md:h-48 w-full md:w-64"
                  )}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vw-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">
                      {product.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn(
                    "p-6 flex flex-col flex-grow w-full",
                    viewMode === 'list' && "md:flex-row md:items-center justify-between gap-8"
                  )}>
                    <div className={cn(
                      "mb-4",
                      viewMode === 'list' ? "md:mb-0 flex-1" : ""
                    )}>
                      <h3 className="text-xl font-bold font-outfit text-black dark:text-white mb-2 group-hover:text-brand transition-colors">
                        {product.name}
                      </h3>
                      <p className={cn(
                         "text-sm text-black/60 dark:text-white/60",
                        viewMode === 'grid' ? "line-clamp-2" : "md:line-clamp-3"
                      )}>
                        {product.description}
                      </p>
                    </div>

                    <div className={cn(
                      "flex items-center justify-between gap-6 pt-6 border-t border-vw-blue/5 dark:border-white/5",
                      viewMode === 'list' && "md:pt-0 md:border-t-0 md:border-l md:pl-8 shrink-0 flex-col md:flex-row md:gap-8"
                    )}>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand block tracking-widest mb-1">Price</span>
                         <span className="text-2xl font-bold text-black dark:text-white">{product.price}</span>
                        <span className={cn(
                          "text-[10px] block mt-1",
                          product.condition === 'new' ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                        )}>
                          {product.condition === 'new' ? WARRANTY_INFO.new : WARRANTY_INFO.used}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className={cn(
                            "py-3 px-6 text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-brand/10 transition-all",
                            addedId === product.id 
                              ? "bg-green-500 text-white" 
                              : "btn-primary group/btn"
                          )}
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added!
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                              Add to Cart
                            </>
                          )}
                        </button>
                        <div className="flex items-center justify-center gap-3 text-[var(--text)]/40">
                          <span className="text-[10px]">Pay with:</span>
                          {PAYMENT_METHODS.slice(0, 3).map(pm => (
                            <span key={pm.name} title={pm.name} className="flex items-center"><PaymentIcon type={pm.type} /></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-brand" />
            </div>
             <h3 className="text-2xl font-bold text-black dark:text-white mb-2">No products found</h3>
             <p className="text-black/60 dark:text-white/60">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-6 text-brand font-bold uppercase tracking-widest flex items-center gap-2 mx-auto hover:gap-3 transition-all"
            >
              Clear all filters <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Payment & Warranty Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="card-vw p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand" />
              Payment Methods
            </h3>
            <div className="flex flex-wrap gap-3">
              {PAYMENT_METHODS.map(pm => (
                <span key={pm.name} className="px-4 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm font-medium flex items-center gap-2">
                  <span className="w-10 flex items-center"><PaymentIcon type={pm.type} /></span> {pm.name}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--text)]/40 mt-4">Secure checkout powered by Stripe. All major cards accepted.</p>
          </div>

          <div className="card-vw p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand" />
              Warranty Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold">New Equipment:</span>
                  <span className="text-[var(--text)]/60"> 12 months warranty</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold">Second Hand Equipment:</span>
                  <span className="text-[var(--text)]/60"> 28 days warranty with security seal applied</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
