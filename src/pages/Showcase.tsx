import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import { categories, CategoryId } from '../data/showcaseItems';
import { useShowcaseItems } from '../hooks/useShowcaseItems';
import { usePageSEO } from '../hooks/usePageSEO';
import { VAG_MAKES } from '../data/vehicles';

export default function Showcase() {
  usePageSEO({
    title: 'Showcase — VAG Retrofit & Coding Gallery Leicester',
    description: 'Browse our gallery of completed VAG coding and retrofit projects in Leicester — Virtual Cockpit installs, Apple CarPlay, reverse cameras, screen upgrades and more.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vagleicester.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Showcase', item: 'https://vagleicester.co.uk/showcase' },
      ],
    },
  });
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [activeMake, setActiveMake] = useState<string>('all');
  const allItems = useShowcaseItems();

  const filtered = allItems.filter(item => {
    const catMatch = activeCategory === 'all' || item.category === activeCategory;
    const makeMatch = activeMake === 'all' || (item.vehicle_make || '').toLowerCase() === activeMake.toLowerCase();
    return catMatch && makeMatch;
  });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter">
            Our <span className="text-brand">Showcase</span>
          </h1>
          <p className="text-[var(--text)]/50 text-lg">
            Real work, real vehicles. Every photo is an actual customer job — OEM finish, zero shortcuts.
          </p>
        </motion.div>

        {/* Make & Model Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['all', ...VAG_MAKES].map(make => (
            <button
              key={make}
              onClick={() => setActiveMake(make)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border',
                activeMake === make
                  ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20'
                  : 'bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]/60 hover:border-brand/30'
              )}
            >
              {make === 'all' ? 'All Makes' : make}
            </button>
          ))}
        </div>

        {/* Work Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border',
                activeCategory === cat.id
                  ? 'bg-white/20 border-white/30 text-white shadow-lg'
                  : 'bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]/60 hover:border-brand/30'
              )}
            >
              {cat.name}
              <span className={cn('ml-1.5 text-[10px] opacity-60', activeCategory === cat.id && 'opacity-100')}>
                {cat.id === 'all'
                  ? allItems.filter(i => activeMake === 'all' || (i.vehicle_make || '').toLowerCase() === activeMake.toLowerCase()).length
                  : allItems.filter(i => i.category === cat.id && (activeMake === 'all' || (i.vehicle_make || '').toLowerCase() === activeMake.toLowerCase())).length}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.4) }}
                className="group relative rounded-2xl overflow-hidden card-vw p-0 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[var(--card-bg)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Always-visible pills */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {item.vehicle_make && (
                    <span className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-brand/80 text-white backdrop-blur-sm">
                      {item.vehicle_make}{item.vehicle_model ? ` ${item.vehicle_model}` : ''}
                    </span>
                  )}
                  <span className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-black/60 text-white/80 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-1 text-white leading-tight">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-3">{item.description}</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-brand transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 p-12 card-vw rounded-2xl"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-tighter">
            Want your vehicle in this gallery?
          </h2>
          <p className="text-[var(--text)]/50 mb-8 max-w-xl mx-auto">
            Get in touch and we'll check compatibility for your specific vehicle, module versions and chassis number.
          </p>
          <a
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Book Your Appointment
          </a>
        </motion.div>
      </div>
    </div>
  );
}
