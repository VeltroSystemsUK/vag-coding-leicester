import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const DISMISS_KEY = 'vag_popup_dismissed';

export default function PopupBanner() {
  const { settings, updatePopupBanner } = useAdmin();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const banner = settings?.popupBanner || { active: false, title: '', subtitle: '', ctaText: '', ctaLink: '', backgroundImage: '', expiryDate: '' };

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISS_KEY);
    const isExpired = banner.expiryDate && new Date(banner.expiryDate) < new Date();
    
    if (banner.active && !isDismissed && !isExpired) {
      setVisible(true);
    }
  }, [banner]);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-50"
      >
        <div className="relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E30B18] via-[#ff3b4a] to-[#E30B18] animate-gradient" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
              )`,
            }} />
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[100%] animate-shine skew-x-12">
              <div className="h-full w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-[100%]" />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="shrink-0">
                <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wider drop-shadow-lg">
                  {banner.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base truncate">
                  {banner.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {banner.ctaText && banner.ctaLink && (
                <Link
                  to={banner.ctaLink}
                  onClick={handleDismiss}
                  className="bg-white text-[#E30B18] hover:bg-white/90 font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105"
                >
                  {banner.ctaText}
                </Link>
              )}
              <button
                onClick={handleDismiss}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </AnimatePresence>
  );
}