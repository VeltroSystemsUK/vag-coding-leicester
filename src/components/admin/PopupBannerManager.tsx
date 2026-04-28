import React from 'react';
import { Calendar } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function PopupBannerManager() {
  const { settings, updatePopupBanner } = useAdmin();
  const banner = settings.popupBanner;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-lg">Popup Banner</h3>
          <p className="text-white/40 text-sm">Eye-catching promotional banner for the home page</p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-white/60 text-sm">Active</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={banner.active}
              onChange={e => updatePopupBanner({ active: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${banner.active ? 'bg-brand' : 'bg-white/20'}`} />
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${banner.active ? 'translate-x-7' : 'translate-x-1'}`} />
          </div>
        </label>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Title *</label>
            <input
              value={banner.title}
              onChange={e => updatePopupBanner({ title: e.target.value })}
              placeholder="Special Offer!"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Subtitle</label>
            <input
              value={banner.subtitle}
              onChange={e => updatePopupBanner({ subtitle: e.target.value })}
              placeholder="Get 20% off this month"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Button Text</label>
            <input
              value={banner.ctaText}
              onChange={e => updatePopupBanner({ ctaText: e.target.value })}
              placeholder="Book Now"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Button Link</label>
            <select
              value={banner.ctaLink}
              onChange={e => updatePopupBanner({ ctaLink: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
            >
              <option value="/contact" className="bg-[#111]">Contact Page</option>
              <option value="/shop" className="bg-[#111]">Shop</option>
              <option value="/services" className="bg-[#111]">Services</option>
              <option value="/" className="bg-[#111]">Home Page</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Background Image URL (optional)</label>
          <input
            value={banner.backgroundImage}
            onChange={e => updatePopupBanner({ backgroundImage: e.target.value })}
            placeholder="https://example.com/banner.jpg"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />
          {banner.backgroundImage && (
            <div className="mt-2 rounded-lg overflow-hidden h-20 bg-black/50">
              <img src={banner.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Expiry Date (optional)</label>
          <input
            type="date"
            value={banner.expiryDate}
            onChange={e => updatePopupBanner({ expiryDate: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
          />
          <p className="text-white/20 text-xs mt-1">Banner will automatically hide after this date</p>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h4 className="text-white/40 text-xs uppercase tracking-widest mb-3">Preview</h4>
        <div className="rounded-xl overflow-hidden border border-white/10">
          <div className="bg-gradient-to-r from-[#E30B18] to-[#ff3b4a] p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">{banner.title || 'Title'}</div>
                <div className="text-white/80 text-xs">{banner.subtitle || 'Subtitle'}</div>
              </div>
              {banner.ctaText && (
                <div className="ml-auto bg-white text-[#E30B18] text-xs font-bold px-3 py-1 rounded">
                  {banner.ctaText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/>
    </svg>
  );
}