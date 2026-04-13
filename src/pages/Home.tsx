import React, { useState, useEffect } from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Gauge, Volume2, Play, ChevronsRight, Smartphone, Lightbulb, RotateCcw, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CountUp from '../components/CountUp';
import InstagramFeed from '../components/InstagramFeed';
import oemAftermarketImg from '../assets/OEM & AftermarketView.png';
// Hero carousel images
import heroImg0 from '../assets/IMG-20260409-WA0100.jpg';  // VW R at sunset — cinematic
import heroImg1 from '../assets/IMG-20260409-WA0059.jpg';  // Red Audi A3 exterior
import heroImg2 from '../assets/IMG-20260409-WA0063.jpg';  // GTI starlight headliner
import heroImg3 from '../assets/IMG-20260409-WA0061.jpg';  // VW Golf CarPlay + virtual cockpit
import heroImg4 from '../assets/IMG-20260409-WA0080.jpg';  // Audi S3 exterior
import heroImg5 from '../assets/IMG-20260409-WA0062.jpg';  // Audi interior CarPlay
// Recent Work — three distinct job types
import recentRetrofitImg  from '../assets/IMG-20260409-WA0051.jpg';  // virtual cockpit
import recentCameraImg    from '../assets/IMG-20260409-WA0045.jpg';  // reverse camera
import recentScreenImg    from '../assets/IMG-20260409-WA0050.jpg';  // screen upgrade

const HERO_SLIDES = [heroImg0, heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];
const SLIDE_DURATION = 5000;

export default function Home() {
  const { t } = useTranslation();
  usePageSEO({
    title: 'VW Audi Coding, Retrofits & Diagnostics — Leicester',
    description: "Leicester's premier VAG group specialists. ECU coding, Apple CarPlay, Virtual Cockpit retrofits, reverse cameras and diagnostics for VW, Audi, SEAT, Skoda, Porsche & Bentley. Mobile service across Leicestershire.",
  });
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: 'James Wilson',
      car: 'VW Golf MK7.5',
      content: 'Unbelievable service. They coded my Golf with features the dealer said were impossible. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sarah Thompson',
      car: 'Audi A3',
      content: 'Got a virtual cockpit retrofit and high-line camera. The car feels completely different. Professional team.',
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center px-6 pt-48 sm:pt-40 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.img
              key={slideIndex}
              src={HERO_SLIDES[slideIndex]}
              alt="VAG Leicester — client vehicle"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-50"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={[
                  'h-0.5 rounded-full transition-all duration-500',
                  i === slideIndex ? 'w-8 bg-brand' : 'w-4 bg-white/30 hover:bg-white/60',
                ].join(' ')}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-8 leading-[0.9] tracking-tighter">
              {t('hero.title').split('&').map((part, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-brand">& {part}</span> : part}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-2xl text-[var(--text)]/70 mb-12 leading-relaxed max-w-2xl font-medium">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-3 group px-8 py-4 text-sm uppercase tracking-widest">
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary flex items-center justify-center px-8 py-4 text-sm uppercase tracking-widest">
                {t('hero.secondaryCta')}
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 glass border-y border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: t('stats.activations'), value: 5000, suffix: '+' },
            { label: t('stats.experience'), value: 10, suffix: '+' },
            { label: t('stats.satisfaction'), value: 100, suffix: '%' },
            { label: t('stats.warranty'), value: 1, suffix: ' Lifetime' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-bold text-brand mb-2 font-mono">
                {stat.label === t('stats.warranty') ? (
                  <span className="text-lg md:text-2xl uppercase tracking-widest">Lifetime</span>
                ) : (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--text)]/40 font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">Why Choose <span className="text-brand">VAG Leicester?</span></h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'OEM Style Installation',
                    description: 'We pride ourselves on providing factory-standard finishes. No exposed wires or cheap workarounds.',
                  },
                  {
                    title: 'Compatibility Guaranteed',
                    description: 'Every upgrade is checked against your vehicle\'s specific chassis and module versions before booking.',
                  },
                  {
                    title: 'Expert VAG Knowledge',
                    description: 'Specialists in Audi, VW, Porsche, SEAT, and Skoda. We know these vehicles inside and out.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-brand w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-[var(--text)]/50 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand/20 blur-3xl rounded-full" />
              <img
                src={oemAftermarketImg}
                alt="OEM and Aftermarket View"
                className="relative z-10 rounded-2xl shadow-2xl border border-[var(--border)]"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Recent Work / Showcase Section */}
      <section className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tighter">Recent <span className="text-brand">Work</span></h2>
              <p className="text-[var(--text)]/50">Take a look at some of our latest OEM-standard retrofits and coding projects.</p>
            </div>
            <Link to="/showcase" className="btn-secondary flex items-center gap-2 group">
              View Full Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Virtual Cockpit',
                desc: 'Digital cluster retrofit — VW Golf',
                img: recentRetrofitImg
              },
              {
                title: 'OEM Retrofits',
                desc: 'Genuine hardware & module upgrades',
                img: recentCameraImg
              },
              {
                title: 'Screen Upgrade',
                desc: '9.2" Discover Pro glass display',
                img: recentScreenImg
              }
            ].map((work, i) => (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-square card-vw p-0"
              >
                <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h4 className="font-bold text-xl mb-1 text-white">{work.title}</h4>
                  <p className="text-white/50 text-sm">{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Activations */}
      <section className="py-24 px-6 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tighter">Popular <span className="text-brand">Activations</span></h2>
            <p className="text-[var(--text)]/50">Unlock the hidden potential of your vehicle's software.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Needle Sweep',   desc: 'Gauges sweep on startup',              Icon: Gauge },
              { title: 'Acoustic Lock',  desc: 'Beep when locking/unlocking',           Icon: Volume2 },
              { title: 'Video In Motion',desc: 'Play video while driving',              Icon: Play },
              { title: 'Mirror Dip',     desc: 'Passenger mirror dips in reverse',      Icon: RotateCcw },
              { title: 'Digital Speedo', desc: 'Add digital speed to cluster',          Icon: Smartphone },
              { title: 'DRL Control',    desc: 'Toggle DRLs via menu',                  Icon: Lightbulb },
              { title: 'Pulsing Start',  desc: 'Animated start/stop button',            Icon: ChevronsRight },
              { title: 'Lap Timer',      desc: 'Unlock hidden lap timer',               Icon: Timer },
            ].map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="card-vw group hover:border-brand/40 transition-colors flex gap-5 items-center p-5 sm:p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors duration-300">
                  <Icon className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">{title}</h4>
                  <p className="text-[var(--text)]/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Compatibility CTA */}
      <section className="py-24 px-6 relative overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 bg-brand/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="card-vw p-12 md:p-20 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tighter">Not sure if your vehicle is <span className="text-brand">compatible?</span></h2>
              <p className="text-[var(--text)]/60 mb-8 text-lg">
                We check every vehicle against its specific chassis and module versions to ensure 100% compatibility before you book.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-3 group">
                Check My Vehicle
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Apple CarPlay', 'Android Auto', 'Virtual Cockpit', 'Reverse Cameras', 
                'MIB Screen Upgrades', 'OEM Coding', 'Navigation Updates', 'Health Checks'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-[var(--text)]/70">
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
              <p className="text-[var(--text)]/50">Don't just take our word for it. We pride ourselves on delivering excellence for every vehicle.</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-brand text-brand" />
              ))}
              <span className="ml-2 font-bold">4.9/5 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card-vw relative"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>
                <p className="text-lg italic mb-8 text-[var(--text)]/80">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-[var(--text)]">{t.name}</h4>
                  <p className="text-brand text-xs font-bold uppercase tracking-widest">{t.car}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  );
}
