import React from 'react';
import { Settings, Truck, Home } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function InstallationSettingsManager() {
  const { settings, updateInstallationSettings } = useAdmin();
  const install = settings.installationSettings;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-lg">Installation Settings</h3>
          <p className="text-white/40 text-sm">Master settings applied to all products</p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-white/60 text-sm">Installation Required</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={install.installationRequired}
              onChange={e => updateInstallationSettings({ installationRequired: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${install.installationRequired ? 'bg-brand' : 'bg-white/20'}`} />
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${install.installationRequired ? 'translate-x-7' : 'translate-x-1'}`} />
          </div>
        </label>
      </div>

      {install.installationRequired && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Default Installation Costs (ex VAT)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                <Truck className="w-4 h-4 inline mr-1" />
                Mobile &lt;100 miles
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={install.mobileWithin100}
                  onChange={e => updateInstallationSettings({ mobileWithin100: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
                  placeholder="0.00"
                />
              </div>
              <p className="text-emerald-400 text-xs mt-1">
                Inc VAT: £{(parseFloat(install.mobileWithin100 || '0') * 1.2).toFixed(2)}
              </p>
            </div>

            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                <Truck className="w-4 h-4 inline mr-1" />
                Mobile &gt;100 miles
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={install.mobileOver100}
                  onChange={e => updateInstallationSettings({ mobileOver100: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
                  placeholder="0.00"
                />
              </div>
              <p className="text-emerald-400 text-xs mt-1">
                Inc VAT: £{(parseFloat(install.mobileOver100 || '0') * 1.2).toFixed(2)}
              </p>
            </div>

            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                <Home className="w-4 h-4 inline mr-1" />
                Garage
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={install.garage}
                  onChange={e => updateInstallationSettings({ garage: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
                  placeholder="0.00"
                />
              </div>
              <p className="text-emerald-400 text-xs mt-1">
                Inc VAT: £{(parseFloat(install.garage || '0') * 1.2).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-brand/10 border border-brand/20 rounded-xl">
            <p className="text-white/60 text-sm">
              <strong className="text-brand">How it works:</strong> Installation costs are added to the base price 
              BEFORE VAT is calculated. Each product can override these defaults if needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}