import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Cpu, Zap, Shield, Camera, Monitor, Radio, ChevronRight,
  CheckCircle2, HelpCircle, Star, Wrench, MapPin, Phone, Car
} from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

const services = [
  {
    icon: Radio,
    title: 'Apple CarPlay & Android Auto',
    body: `Apple CarPlay and Android Auto allow you to mirror your smartphone on your car's infotainment screen, giving you access to navigation, calls, messages and music — all controlled safely via your existing touchscreen or voice commands.\n\nMany VAG group vehicles (VW, Audi, SEAT, Skoda) left the factory without CarPlay or Android Auto enabled, even though the hardware is already installed. With VCDS or OBDeleven coding, we can activate it in under an hour at your location. Wireless CarPlay upgrades are available for compatible head units.`,
    compatible: ['VW Golf MK7/MK7.5/MK8', 'Audi A3/A4/Q5', 'SEAT Leon MK3', 'Skoda Octavia MK3/MK4'],
  },
  {
    icon: Monitor,
    title: 'Virtual Cockpit Retrofit',
    body: `The Virtual Cockpit is a fully digital instrument cluster that replaces the traditional analogue dials with a crisp, configurable 10.25" or 12.3" TFT display. It shows speed, revs, navigation, media and driver assistance information — all in stunning detail.\n\nWe source and fit genuine OEM Virtual Cockpit units and perform the full VCDS coding to integrate them seamlessly with your existing car systems. The result is factory-standard — no one would know it wasn't fitted from new.`,
    compatible: ['VW Golf MK7/MK7.5', 'Audi A3 8V', 'SEAT Leon MK3', 'Skoda Octavia MK3'],
  },
  {
    icon: Cpu,
    title: 'ECU Coding & Hidden Feature Activation',
    body: `Modern VAG group vehicles contain dozens of features that are disabled in software at the factory — either to differentiate trim levels or for market-specific regulations. Using dealer-level diagnostic tools and OBDeleven, we can unlock these features without any hardware modification.\n\nPopular activations include: needle sweep on startup, acoustic confirmation beep on lock/unlock, cornering lights, video in motion (front passenger screen), mirror dip on reverse, lap timer, digital speedometer overlay and much more. Every activation is reversible.`,
    compatible: ['All VAG group vehicles with VCDS/OBDeleven support'],
  },
  {
    icon: Camera,
    title: 'Reverse Camera Installation',
    body: `A reverse camera gives you a clear view behind your vehicle when reversing, displayed directly on your existing infotainment screen — complete with dynamic guidelines. We fit genuine OEM reverse cameras that integrate fully with your car's systems, meaning the camera activates automatically when reverse gear is selected and the image displays on your standard screen.\n\nThis is a popular retrofit for VW, Audi, SEAT and Skoda models that left the factory without a camera fitted. No aftermarket screen or separate monitor required.`,
    compatible: ['VW Golf MK7/MK7.5', 'Audi A3/A4', 'SEAT Leon', 'Skoda Octavia'],
  },
  {
    icon: Zap,
    title: 'Navigation & Map Updates',
    body: `Keeping your in-built navigation system up to date ensures you have the latest road layouts, speed camera data and points of interest. We supply and install the latest official map updates for all VAG group navigation systems — including RNS-510, RNS-315, Discover Media, Discover Pro and MIB2/MIB3 systems.\n\nWe can also activate navigation on vehicles that have the hardware fitted but navigation not enabled — saving you the dealer's activation fee.`,
    compatible: ['All VAG group vehicles with factory sat-nav'],
  },
  {
    icon: Shield,
    title: 'Dealer Level Diagnostics & Fault Finding',
    body: `Warning lights on your dashboard can be concerning, but not every fault requires an expensive dealer visit. Using professional-grade dealer-level diagnostic software, we can read all fault codes across every control module in your vehicle — engine, gearbox, ABS, airbags, comfort systems and more.\n\nWe provide a full diagnostic report, explain what each fault means and advise on the most cost-effective repair route. Many faults can be resolved through coding adjustments alone. We are fully mobile — we come to you.`,
    compatible: ['All VAG group vehicles'],
  },
  {
    icon: Monitor,
    title: 'MIB2 & MIB3 Screen Upgrades',
    body: `The MIB2 and MIB3 are Volkswagen Group's modular infotainment platforms. Older MIB1 or entry-level MIB2 systems can be upgraded to higher-specification units with larger glass displays, faster processors, wireless CarPlay and improved functionality.\n\nWe source, install and fully code the replacement head unit so it works identically to a factory-fitted unit — including steering wheel controls, parking sensors, climate display integration and all coding parameters.`,
    compatible: ['VW Golf MK7/MK7.5', 'Audi A3', 'SEAT Leon MK3', 'Skoda Octavia MK3'],
  },
];

const faqs = [
  {
    q: 'What is VAG coding?',
    a: 'VAG coding refers to modifying the software settings in your vehicle\'s electronic control units (ECUs). VAG group cars (VW, Audi, SEAT, Skoda, Porsche, Bentley) are built on shared platforms and contain many features that are disabled by default. Coding unlocks or adjusts these features without any physical modification to the car.',
  },
  {
    q: 'Is coding safe? Will it void my warranty?',
    a: 'When performed by a qualified specialist using professional tools, coding is safe and reversible. All changes we make can be reverted to factory settings. Regarding warranty: in the UK, a dealer cannot void your warranty solely because the car has been coded — they must prove the coding caused the specific fault being claimed. We document all changes made.',
  },
  {
    q: 'Do you come to me, or do I need to bring the car to you?',
    a: 'We are a fully mobile service based in Leicester. We travel to your home, workplace or any convenient location across Leicester, Leicestershire and surrounding areas. You do not need to leave your car anywhere.',
  },
  {
    q: 'How long does a typical coding session take?',
    a: 'Most coding sessions take between 1–2 hours. A Virtual Cockpit retrofit or screen upgrade typically takes 2–4 hours including the physical install and full coding. Diagnostics usually take around 45–60 minutes.',
  },
  {
    q: 'What tools do you use?',
    a: 'We use VCDS (VAG-COM Diagnostic System) by Ross-Tech — the industry standard for VAG group vehicles — alongside OBDeleven Pro. Both tools allow us to read faults, perform adaptations, code modules and carry out guided functions to the same standard as main dealer equipment.',
  },
  {
    q: 'How do I know if my car is compatible?',
    a: 'Most VAG group vehicles from 2012 onwards support the majority of coding functions. The specific features available depend on your car\'s head unit version, module hardware and build date. Contact us with your registration or VIN and we\'ll tell you exactly what\'s possible before you book.',
  },
  {
    q: 'How much does coding cost?',
    a: 'Coding session prices vary by job. Simple feature activations start from £50. Virtual Cockpit retrofits and full installs are priced per project. Contact us for a free, no-obligation quote — we\'re transparent with pricing and there are no hidden fees.',
  },
  {
    q: 'Which vehicles do you work on?',
    a: 'We work on the full VAG group: Volkswagen, Audi, SEAT, Skoda, Porsche and Bentley. This covers all models on the PQ, MQB, MLB and PPE platforms — including Golf, Polo, Passat, Tiguan, A3, A4, A5, Q5, Leon, Octavia, Cayenne, Macan and more.',
  },
];

const brands = [
  { name: 'Volkswagen', models: 'Golf, Polo, Passat, Tiguan, T-Roc, ID.4' },
  { name: 'Audi', models: 'A3, A4, A5, A6, Q3, Q5, Q7, TT, RS range' },
  { name: 'SEAT', models: 'Leon, Ibiza, Ateca, Arona, Tarraco' },
  { name: 'Skoda', models: 'Octavia, Superb, Kodiaq, Karoq, Fabia' },
  { name: 'Porsche', models: 'Cayenne, Macan, Panamera' },
  { name: 'Bentley', models: 'Bentayga, Continental GT, Flying Spur' },
  { name: 'CUPRA', models: 'Formentor, Leon, Born, Ateca' },
];

export default function Info() {
  usePageSEO({
    title: 'VAG Coding Guide — Services, FAQs & About Us',
    description: 'Everything you need to know about VAG coding in Leicester. Apple CarPlay retrofits, Virtual Cockpit, ECU coding, diagnostics, compatible vehicles and FAQs. VAG Leicester — your local specialist.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Everything You Need To Know About VAG Coding',
        description: 'A comprehensive guide to VAG group ECU coding, retrofits, compatible vehicles and frequently asked questions.',
        author: { '@type': 'Organization', name: 'VAG Leicester Ltd' },
        publisher: {
          '@type': 'Organization',
          name: 'VAG Leicester Ltd',
          url: 'https://vagleicester.co.uk',
        },
        url: 'https://vagleicester.co.uk/info',
        mainEntityOfPage: 'https://vagleicester.co.uk/info',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vagleicester.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'VAG Coding Guide', item: 'https://vagleicester.co.uk/info' },
        ],
      },
    ],
  });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6">
            <Wrench className="w-3 h-3" />
            VAG Coding Explained
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter leading-tight">
            Everything You Need To Know About <span className="text-brand">VAG Coding</span>
          </h1>
          <p className="text-[var(--text)]/60 text-xl leading-relaxed">
            We believe an informed customer is the best customer. This page covers what VAG coding is,
            the services we offer, which vehicles are compatible, and answers to the most common questions we receive.
          </p>
        </motion.div>

        {/* What is VAG Coding */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-tighter">
            What Is <span className="text-brand">VAG Coding?</span>
          </h2>
          <div className="prose max-w-none text-[var(--text)]/70 space-y-4 text-lg leading-relaxed">
            <p>
              VAG stands for <strong className="text-[var(--text)]">Volkswagen Audi Group</strong> — the automotive conglomerate
              that owns Volkswagen, Audi, SEAT, Skoda, Porsche, Bentley and CUPRA. All vehicles across these brands
              share common electronic architectures and software platforms, which means a specialist with the right
              tools can work across all of them.
            </p>
            <p>
              Modern vehicles contain dozens of <strong className="text-[var(--text)]">Electronic Control Units (ECUs)</strong> — small computers
              managing everything from the engine and gearbox to the infotainment system, lighting and driver assistance features.
              VAG group cars are built on shared platforms and many features are present in the hardware but
              <strong className="text-[var(--text)]"> disabled in software</strong> — either to differentiate trim levels, meet regional
              regulations, or simply reduce production complexity.
            </p>
            <p>
              VAG coding uses specialist software — primarily <strong className="text-[var(--text)]">Dealer Level Diagnostics</strong> by
              Ross-Tech and <strong className="text-[var(--text)]">OBDeleven</strong> — to access these control units and modify their parameters.
              This can unlock hidden features, integrate new hardware, perform adaptations after part replacements or
              diagnose and clear faults to a level that main dealers charge hundreds of pounds for.
            </p>
            <p>
              At VAG Leicester, we have over <strong className="text-[var(--text)]">10 years of experience</strong> coding and retrofitting
              VAG group vehicles. We are a fully mobile service — we come to your home or workplace across
              Leicester, Thurmaston, Loughborough, Hinckley, Market Harborough and the wider Leicestershire area.
            </p>
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
            Our Services <span className="text-brand">Explained</span>
          </h2>
          <p className="text-[var(--text)]/50 mb-10 text-lg">In-depth information on everything we offer.</p>

          <div className="space-y-10">
            {services.map((svc, i) => (
              <motion.article
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-vw p-8"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <svc.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold mt-1">{svc.title}</h3>
                </div>
                <div className="space-y-3 text-[var(--text)]/70 leading-relaxed mb-6">
                  {svc.body.split('\n\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand mb-3">Common compatible vehicles</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.compatible.map(c => (
                      <span key={c} className="text-xs px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text)]/60 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Compatible Brands */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
            Compatible <span className="text-brand">Vehicles</span>
          </h2>
          <p className="text-[var(--text)]/50 mb-10 text-lg">We work across the entire VAG group — here's a guide to the most popular models we cover.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-vw flex items-start gap-4"
              >
                <Car className="w-5 h-5 text-brand shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-sm mb-1">{brand.name}</p>
                  <p className="text-xs text-[var(--text)]/50 leading-relaxed">{brand.models}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--text)]/50">
            Not sure if your vehicle is supported? <Link to="/contact" className="text-brand font-bold hover:underline">Contact us with your reg</Link> and we'll confirm compatibility within a few hours.
          </p>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="text-[var(--text)]/50 mb-10 text-lg">The questions we get asked most often.</p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-vw p-6"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-2">{faq.q}</h3>
                    <p className="text-sm text-[var(--text)]/60 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-tighter">
            About <span className="text-brand">VAG Leicester</span>
          </h2>
          <div className="card-vw p-8 space-y-4 text-[var(--text)]/70 text-lg leading-relaxed">
            <p>
              VAG Leicester Ltd is a specialist independent automotive coding and retrofit company based in
              <strong className="text-[var(--text)]"> Thurmaston, Leicester</strong>. With over 10 years of hands-on
              experience working exclusively with Volkswagen Audi Group vehicles, we have built a reputation
              for OEM-standard work at honest prices.
            </p>
            <p>
              We are a <strong className="text-[var(--text)]">fully mobile service</strong> — we come to you. Whether you're
              at home, at work or anywhere across Leicestershire, we bring our professional-grade equipment to your
              location. No need to book a dealer appointment, take time off work or arrange alternative transport.
            </p>
            <p>
              Every job we carry out is documented. We record the before and after state of your vehicle's coding,
              so any changes are fully reversible. We use only genuine OEM parts for retrofits and professional
              Ross-Tech VCDS equipment for all coding and diagnostics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[var(--border)]">
              {[
                { label: 'Years Experience', value: '10+' },
                { label: 'Vehicles Coded', value: '5,000+' },
                { label: 'Customer Rating', value: '4.9 / 5' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-brand mb-1">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 uppercase tracking-tighter">
            Why Choose <span className="text-brand">Us?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'VAG Specialists Only', body: 'We work exclusively on VAG group vehicles. This focus means deeper knowledge and better results than a general garage.' },
              { title: 'Fully Mobile Service', body: 'We come to you — home, work or anywhere in Leicestershire. No dealership queues, no waiting rooms.' },
              { title: 'OEM-Standard Results', body: 'Every retrofit is factory-standard. Genuine parts, correct coding, clean installation — indistinguishable from new.' },
              { title: 'Professional Equipment', body: 'Ross-Tech dealer-level diagnostic tools and OBDeleven Pro — the same tools used by VAG dealers, not cheap clone interfaces.' },
              { title: 'Transparent Pricing', body: 'We quote before we start and stick to it. No surprises, no hidden charges.' },
              { title: 'Fully Documented', body: 'All coding changes are recorded. Everything is reversible. You keep a full record of what was done to your car.' },
            ].map((item, i) => (
              <div key={item.title} className="flex items-start gap-4 p-5 card-vw">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--text)]/60 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-vw p-10 text-center"
        >
          <Star className="w-10 h-10 text-brand mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Upgrade Your VAG?</h2>
          <p className="text-[var(--text)]/50 mb-8 max-w-xl mx-auto">
            Get in touch with your vehicle registration and tell us what you're looking to do.
            We'll come back to you quickly with a quote and availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Book a Session
            </Link>
            <Link to="/showcase" className="btn-secondary flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              View Our Work
            </Link>
          </div>
          <p className="text-xs text-[var(--text)]/30 mt-6 flex items-center justify-center gap-2">
            <MapPin className="w-3 h-3" />
            Unit 8, 171 Church Hill Road, Thurmaston, Leicester, LE4 8DD
          </p>
        </motion.div>

      </div>
    </div>
  );
}
