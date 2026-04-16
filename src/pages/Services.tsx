import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Shield, Camera, Monitor, Radio, Wrench, Activity, Gauge, Truck, ClipboardCheck, Car, Search, MapPin } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
}

interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

const services: ServiceCategory[] = [
  {
    category: 'Our Main Services',
    items: [
      {
        title: 'Apple CarPlay / Android Auto',
        description: 'Full activation of Apple CarPlay and Android Auto for MIB2 and MIB3 head units. Wireless options available.',
        icon: Radio,
        featured: true,
      },
      {
        title: 'Satellite Navigation Updates',
        description: 'Latest map updates and navigation system activations. Stay up to date with the newest road layouts and points of interest.',
        icon: MapPin,
        featured: true,
      },
      {
        title: 'Dealer Level Diagnostics',
        description: 'Professional-grade vehicle health checks using dealer-level diagnostic equipment. Read and clear fault codes across all modules.',
        icon: Activity,
        featured: true,
      },
      {
        title: 'Wiring & Soldering',
        description: 'Expert automotive wiring and soldering services. Proper connections for retrofits, repairs and bespoke installations.',
        icon: Zap,
        featured: true,
      },
      {
        title: 'Vehicle Health Checks',
        description: 'Comprehensive pre-purchase inspections and vehicle health assessments. Know exactly what you\'re buying.',
        icon: ClipboardCheck,
        featured: true,
      },
      {
        title: 'Car Buying Advice',
        description: 'Professional guidance when buying your next VAG vehicle. We help you find the right car with the right specifications.',
        icon: Car,
        featured: true,
      },
      {
        title: 'ECU Remapping',
        description: 'Performance remapping for improved power and torque. Optimised tuning for economy or performance gains.',
        icon: Gauge,
        featured: true,
      },
      {
        title: 'Fully Mobile Service',
        description: 'We come to you — home, work or anywhere in Leicestershire. No need to visit a workshop.',
        icon: Truck,
        featured: true,
      },
      {
        title: 'MIB2 & MIB2.5 Screen Upgrades',
        description: 'Upgrade your older screen to the latest high-resolution glass displays for a modern look.',
        icon: Monitor,
      },
      {
        title: 'Virtual Cockpit Retrofits',
        description: 'Genuine digital instrument cluster retrofits for Golf, A3, Leon, and more. Full integration.',
        icon: Cpu,
      },
      {
        title: 'Reverse Camera Installation',
        description: 'High-line reverse cameras with dynamic guidelines and full integration into your existing screen.',
        icon: Camera,
      },
      {
        title: 'OEM Coding Activations',
        description: 'Unlock hidden features like needle sweep, acoustic lock, video in motion, and mirror dip on reverse.',
        icon: Shield,
      },
    ],
  },
];

export default function Services() {
  usePageSEO({
    title: 'Our Services — VW Audi Coding & Retrofits Leicester',
    description: 'Apple CarPlay, Android Auto, Virtual Cockpit, reverse cameras, MIB screen upgrades, OEM coding activations and navigation updates for all VAG group vehicles in Leicester.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vagleicester.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://vagleicester.co.uk/services' },
      ],
    },
  });
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter">
            Our <span className="text-brand">Services</span>
          </h1>
          <p className="text-[var(--text)]/50 text-lg">
            Specialist retrofits and coding for Volkswagen, Audi, Porsche, SEAT, and Skoda.
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((section, idx) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-4">
                <span className="w-12 h-px bg-brand" />
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`card-vw group ${item.featured ? 'ring-2 ring-brand ring-opacity-50' : ''}`}
                  >
                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand transition-colors">
                      <item.icon className="w-6 h-6 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-[var(--text)]/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
