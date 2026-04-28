import React, { useRef } from 'react';
import { Upload, Building2, Phone, Mail, MapPin, Loader2, Check } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';

export default function BusinessManager() {
  const { settings, updateBusinessSettings } = useAdmin();
  const business = settings.business;
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSaving(true);
    const ext = file.name.split('.').pop();
    const fileName = `logos/business-${Date.now()}.${ext}`;
    
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file);
    
    if (error) {
      alert('Upload failed');
      setSaving(false);
      return;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);
    
    updateBusinessSettings({ logoUrl: publicUrl });
    setSaving(false);
    showSaved();
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (key: string, value: any) => {
    updateBusinessSettings({ [key]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-white text-lg mb-1">Business Settings</h3>
        <p className="text-white/40 text-sm">Essential business information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
            <Building2 className="w-4 h-4 inline mr-1" />
            Business Name
          </label>
          <input
            type="text"
            value={business.businessName}
            onChange={e => handleChange('businessName', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            placeholder="VAG Coding Leicester"
          />
        </div>

        <div>
          <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email
          </label>
          <input
            type="email"
            value={business.email}
            onChange={e => handleChange('email', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            placeholder="shaun@veltro.co.uk"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Address
          </label>
          <textarea
            value={business.address}
            onChange={e => handleChange('address', e.target.value)}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm resize-none"
            placeholder="123 Business Park, Leicester, LE1 2AB"
          />
        </div>

        <div>
          <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Telephone
          </label>
          <div className="flex items-center gap-3">
            <input
              type="tel"
              value={business.telephone}
              onChange={e => handleChange('telephone', e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
              placeholder="07700 900000"
            />
            <label className="flex items-center gap-2 cursor-pointer shrink-0">
              <span className="text-white/40 text-xs">Show</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={business.telephoneEnabled}
                  onChange={e => handleChange('telephoneEnabled', e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${business.telephoneEnabled ? 'bg-brand' : 'bg-white/20'}`} />
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${business.telephoneEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h4 className="font-bold text-white mb-4">Logo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-brand/50 transition-colors"
            >
              {business.logoUrl ? (
                <div className="relative aspect-video">
                  <img src={business.logoUrl} alt="Logo" className="w-full h-full object-contain bg-black p-4" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">Click to change</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video flex flex-col items-center justify-center gap-2 text-white/30">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to upload logo</span>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            {saving && (
              <div className="mt-2 text-white/40 text-xs flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Uploading...
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Preview</p>
            <div className="flex items-center justify-center bg-black rounded-lg p-4 min-h-[100px]">
              {business.logoUrl ? (
                <img src={business.logoUrl} alt="Logo" className="max-h-16 object-contain" />
              ) : (
                <span className="text-white/20 text-sm">{business.businessName || 'Business Name'}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h4 className="font-bold text-white mb-4">Color Themes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/40 text-xs uppercase tracking-widest">Primary Color</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={business.darkMode.primaryColor}
                  onChange={e => {
                    handleChange('darkMode', { ...business.darkMode, primaryColor: e.target.value });
                    handleChange('lightMode', { ...business.lightMode, primaryColor: e.target.value });
                  }}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <span className="text-white/40 text-xs font-mono">{business.darkMode.primaryColor}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/30 text-[10px] uppercase mb-2">Dark Mode</p>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: business.darkMode.primaryColor }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: business.darkMode.accentColor }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: business.darkMode.backgroundColor }} />
                </div>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase mb-2">Light Mode</p>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: business.lightMode.primaryColor }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: business.lightMode.accentColor }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: business.lightMode.backgroundColor }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}