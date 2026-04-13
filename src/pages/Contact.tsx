import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { usePageSEO } from '../hooks/usePageSEO';

export default function Contact() {
  usePageSEO({
    title: 'Contact Us — Book a VAG Coding or Retrofit in Leicester',
    description: 'Get in touch with VAG Leicester. Book ECU coding, Apple CarPlay, Virtual Cockpit or any retrofit service. Visit us at Unit 8, 171 Church Hill Road, Thurmaston, Leicester LE4 8DD or call 07943 341362.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vagleicester.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://vagleicester.co.uk/contact' },
      ],
    },
  });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    car: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass bg-green-500/20 border-green-500/50 p-4 rounded-lg flex items-center gap-3"
          >
            <CheckCircle2 className="text-green-500 w-5 h-5" />
            <p className="text-sm font-bold">Inquiry sent successfully! We'll be in touch.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter">
            Get In <span className="text-brand">Touch</span>
          </h1>
          <p className="text-[var(--text)]/50 text-lg">
            Book a service, check vehicle compatibility, or ask us anything. We respond fast — usually within a few hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-vw">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <MessageSquare className="text-brand w-6 h-6" />
                Contact Details
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Phone className="text-brand w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text)]/40 mb-1">Call / WhatsApp</p>
                    <a href="tel:07943341362" className="font-bold hover:text-brand transition-colors">07943 341362</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Mail className="text-brand w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text)]/40 mb-1">Email Us</p>
                    <a href="mailto:info@vagleicester.co.uk" className="font-bold hover:text-brand transition-colors">info@vagleicester.co.uk</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text)]/40 mb-1">Our Location</p>
                    <address className="font-bold not-italic leading-relaxed text-sm">
                      VAG Leicester Ltd<br />
                      Unit 8, 171 Church Hill Road<br />
                      Thurmaston, Leicester<br />
                      LE4 8DD
                    </address>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card-vw">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Clock className="text-brand w-6 h-6" />
                Opening Hours
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-[var(--text)]/50">Mon – Fri:</span>
                  <span className="font-bold">09:00 – 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--text)]/50">Saturday:</span>
                  <span className="font-bold">10:00 – 16:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--text)]/50">Sunday:</span>
                  <span className="text-brand font-bold uppercase tracking-widest text-[10px]">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card-vw p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand transition-colors text-[var(--text)]"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand transition-colors text-[var(--text)]"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Vehicle Model &amp; Year</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand transition-colors text-[var(--text)]"
                    placeholder="e.g. 2022 VW Golf"
                    value={formState.car}
                    onChange={(e) => setFormState({ ...formState, car: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Required Service</label>
                  <select
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand transition-colors appearance-none text-[var(--text)]"
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    <option value="coding">Software Coding</option>
                    <option value="retrofit">Hardware Retrofit</option>
                    <option value="carplay">Apple CarPlay / Android Auto</option>
                    <option value="virtual-cockpit">Virtual Cockpit Retrofit</option>
                    <option value="camera">Reverse Camera</option>
                    <option value="diagnostic">Diagnostics</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Your Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand transition-colors resize-none text-[var(--text)]"
                  placeholder="Tell us about your requirements..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-4">
                <Send className="w-5 h-5" />
                Send Enquiry
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <MapPin className="text-brand w-6 h-6" />
            Find Us
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl h-52 md:h-64">
            <iframe
              title="VAG Leicester location map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Unit+8%2C+171+Chury+Hill+Road%2C+Thurmaston%2C+Leicester%2C+LE4+8DD&output=embed&z=15"
            />
          </div>
          <p className="mt-3 text-sm text-[var(--text)]/50 text-center">
            VAG Leicester Ltd · Unit 8, 171 Church Hill Road, Thurmaston, Leicester, LE4 8DD
          </p>
        </motion.div>
      </div>
    </div>
  );
}
