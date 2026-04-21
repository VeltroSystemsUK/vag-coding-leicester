import React, { useState } from 'react';
import { Plus, Trash2, X, Loader2, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ICON_OPTIONS = [
  'Radio', 'MapPin', 'Activity', 'Zap', 'ClipboardCheck', 'Car', 'Gauge', 'Truck', 'Globe', 'Monitor', 'Cpu', 'Camera', 'Shield', 'Wrench', 'Search'
];

export default function ServicesManager() {
  const { settings, updateService, addService, deleteService } = useAdmin();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    featured: false,
    icon: 'Radio',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    setSaving(false);
    setEditingId(null);
    setShowForm(false);
    setNewService({ title: '', description: '', featured: false, icon: 'Radio' });
  };

  const handleAdd = () => {
    if (!newService.title.trim()) return;
    addService(newService);
    setShowForm(false);
    setNewService({ title: '', description: '', featured: false, icon: 'Radio' });
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    const services = [...settings.services];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= services.length) return;
    [services[index], services[newIndex]] = [services[newIndex], services[index]];
    // Update all services with new order
    services.forEach((s, i) => updateService(s.id, { ...s }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/40 text-sm">
          {settings.services.length} services
        </p>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-brand hover:bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white">New Service</h3>

          <input
            value={newService.title}
            onChange={e => setNewService(p => ({ ...p, title: e.target.value }))}
            placeholder="Service title *"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={newService.icon}
              onChange={e => setNewService(p => ({ ...p, icon: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
            >
              {ICON_OPTIONS.map(icon => (
                <option key={icon} value={icon} className="bg-[#111]">{icon}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={newService.featured}
                onChange={e => setNewService(p => ({ ...p, featured: e.target.checked }))}
                className="w-4 h-4 rounded bg-white/10 border-white/20"
              />
              Featured service
            </label>
          </div>

          <textarea
            value={newService.description}
            onChange={e => setNewService(p => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm resize-none"
          />

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={!newService.title.trim()}
              className="flex-1 bg-brand hover:bg-brand-accent disabled:opacity-50 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Save Service
            </button>
            <button
              onClick={() => { setShowForm(false); setNewService({ title: '', description: '', featured: false, icon: 'Radio' }); }}
              className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-3">
        {settings.services.map((service, index) => (
          <div
            key={service.id}
            className={`bg-white/5 border rounded-xl p-4 group ${service.featured ? 'border-brand/30' : 'border-white/[0.07]'}`}
          >
            {editingId === service.id ? (
              <EditServiceForm
                service={service}
                onSave={() => setEditingId(null)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => moveService(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-white/10 text-white/30 disabled:opacity-20"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveService(index, 'down')}
                    disabled={index === settings.services.length - 1}
                    className="p-1 rounded hover:bg-white/10 text-white/30 disabled:opacity-20"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-white text-sm">{service.title}</span>
                    {service.featured && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-1.5 py-0.5 rounded">featured</span>
                    )}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 bg-white/5 px-1.5 py-0.5 rounded">{service.icon}</span>
                  </div>
                  <p className="text-white/40 text-xs line-clamp-2">{service.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingId(service.id)}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { if (confirm('Delete this service?')) deleteService(service.id); }}
                    className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditServiceForm({ service, onSave, onCancel }: { service: any; onSave: () => void; onCancel: () => void }) {
  const { updateService } = useAdmin();
  const [form, setForm] = useState(service);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    updateService(service.id, form);
    await new Promise(r => setTimeout(r, 300));
    setSaving(false);
    onSave();
  };

  return (
    <div className="space-y-3">
      <input
        value={form.title}
        onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={form.icon}
          onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
        >
          {ICON_OPTIONS.map(icon => (
            <option key={icon} value={icon} className="bg-[#111]">{icon}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
            className="w-4 h-4 rounded bg-white/10 border-white/20"
          />
          Featured
        </label>
      </div>
      <textarea
        value={form.description}
        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
        rows={2}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-none"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand px-4 py-2 rounded-lg text-white text-xs font-bold uppercase"
        >
          {saving && <Loader2 className="w-3 h-3 animate-spin" />}
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-white/5 text-white/50 text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}