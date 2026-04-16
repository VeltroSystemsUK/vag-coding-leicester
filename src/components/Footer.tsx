import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-dark-accent border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center group">
            <Logo className="h-10" />
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Leicester's premier specialists for Audi, VW, SEAT and Skoda software coding, retrofitting and diagnostics. Fully mobile across Leicestershire.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/vagcodingleicester" rel="noopener noreferrer" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/vagcodingleicester" rel="noopener noreferrer" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/vagcodingleicester" rel="noopener noreferrer" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading font-bold uppercase tracking-widest text-sm mb-6 text-white">Quick Links</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">Services</Link></li>
            <li><Link to="/showcase" className="hover:text-brand transition-colors">Showcase</Link></li>
            <li><Link to="/shop" className="hover:text-brand transition-colors">Shop</Link></li>
            <li><Link to="/info" className="hover:text-brand transition-colors">VAG Coding Guide</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-heading font-bold uppercase tracking-widest text-sm mb-6 text-white">Services</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/services" className="hover:text-brand transition-colors">Apple CarPlay / Android Auto</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">Virtual Cockpit Retrofits</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">Dealer Level Diagnostics</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">Reverse Camera Installs</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">MIB Screen Upgrades</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">Navigation Updates</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading font-bold uppercase tracking-widest text-sm mb-6 text-white">Contact Us</h3>
          <address className="not-italic space-y-4 text-sm text-white/60">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <span>Unit 8, 171 Church Hill Road<br />Thurmaston, Leicester<br />LE4 8DD</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand shrink-0" />
              <a href="mailto:info@vagleicester.co.uk" className="hover:text-brand transition-colors">info@vagleicester.co.uk</a>
            </div>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© {new Date().getFullYear()} VAG Leicester Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
