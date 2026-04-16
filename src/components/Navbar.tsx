import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import { useTheme } from '../lib/ThemeContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'pl', name: 'Polski' },
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ur', name: 'اردو' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.shop'), path: '/shop' },
    { name: t('nav.showcase'), path: '/showcase' },
    { name: t('nav.contact'), path: '/contact' },
    { name: 'Info', path: '/info' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b',
        isDark
          ? 'bg-black border-white/10 shadow-black/40'
          : 'bg-white border-black/10 shadow-black/5',
        scrolled ? 'py-2 shadow-md' : 'shadow-none'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <Logo className="h-14 md:h-20" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-xs font-bold uppercase tracking-[0.2em] hover:text-brand transition-colors relative py-1',
                location.pathname === link.path ? 'text-brand' : isDark ? 'text-white/70' : 'text-vw-blue/70'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                />
              )}
            </Link>
          ))}
          
          <div className="flex items-center gap-2 border-l border-[var(--border)] pl-6">
            <CartIcon />
            <ThemeToggle />
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLang(!showLang)}
                className="p-2 hover:bg-[var(--text)]/5 rounded-full transition-colors flex items-center gap-2 text-[var(--text)]/70 hover:text-[var(--text)]"
              >
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase">{i18n.language}</span>
              </button>
              <AnimatePresence>
                {showLang && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 glass border border-[var(--border)] rounded-xl overflow-hidden min-w-[120px] shadow-xl"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setShowLang(false);
                        }}
                        className={cn(
                          'w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-colors',
                          i18n.language === lang.code ? 'text-brand' : 'text-[var(--text)]/70'
                        )}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Link to="/contact" className="btn-primary py-2 px-5 text-xs uppercase tracking-widest">
            {t('nav.bookNow')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setShowLang(!showLang)}
            className="p-2 text-[var(--text)]/70"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-[var(--text)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "absolute top-full left-0 right-0 border-t p-6 md:hidden flex flex-col gap-4 shadow-2xl",
              isDark ? "bg-black border-white/10" : "bg-white border-black/10"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-lg font-bold uppercase tracking-[0.2em]',
                  location.pathname === link.path ? 'text-brand' : 'text-[var(--text)]/70'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center mt-2 uppercase tracking-widest"
            >
              {t('nav.bookNow')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Language Menu */}
      <AnimatePresence>
        {showLang && (
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[-1]"
              onClick={() => setShowLang(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-full right-6 mt-2 glass-dark border border-white/10 rounded-2xl p-2 grid grid-cols-2 gap-2 min-w-[240px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setShowLang(false);
                  }}
                  className={cn(
                    'px-4 py-3 rounded-xl text-center text-sm transition-all border',
                    i18n.language === lang.code 
                      ? 'bg-brand border-brand text-white' 
                      : 'bg-white/5 border-white/5 text-white/70'
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
