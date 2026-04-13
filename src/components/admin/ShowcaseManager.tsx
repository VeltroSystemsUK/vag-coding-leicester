import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, X, Loader2 } from 'lucide-react';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';
import { galleryItems, CategoryId } from '../../data/showcaseItems';

type ShowcaseCategory = Exclude<CategoryId, 'all'>;

const CATEGORIES: { id: ShowcaseCategory; name: string }[] = [
  { id: 'retrofit', name: 'Retrofits'  },
  { id: 'coding',   name: 'Coding'     },
  { id: 'camera',   name: 'Cameras'    },
  { id: 'screen',   name: 'Screens'    },
  { id: 'exterior', name: 'Exterior'   },
];

interface ShowcaseAddition {
  id: string;
  title: string;
  category: ShowcaseCategory;
  description: string;
  image_url: string;
}

export default function ShowcaseManager() {
  const [additions, setAdditions] = useState<ShowcaseAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ShowcaseCategory>('exterior');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    const [{ data: adds }, { data: hidden }] = await Promise.all([
      supabase.from('showcase_additions').select('*').order('created_at', { ascending: false }),
      supabase.from('hidden_items').select('item_id').eq('content_type', 'showcase'),
    ]);
    setAdditions((adds ?? []) as ShowcaseAddition[]);
    setHiddenIds((hidden ?? []).map((h: { item_id: string }) => h.item_id));
  };

  useEffect(() => { fetchData(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setFormError('');
  };

  const resetForm = () => {
    setShowForm(false);
    setTitle(''); setDescription('');
    setImageFile(null); setPreview(null); setFormError('');
  };

  const handleAdd = async () => {
    if (!title.trim() || !imageFile) {
      setFormError('Title and image are required.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const ext = imageFile.name.split('.').pop();
      const fileName = `showcase/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, imageFile);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('showcase_additions')
        .insert({ title: title.trim(), category, description: description.trim(), image_url: publicUrl });
      if (insertError) throw insertError;

      resetForm();
      fetchData();
    } catch {
      setFormError('Upload failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBuiltin = async (id: number) => {
    if (!confirm('Hide this photo from the showcase?')) return;
    await supabase.from('hidden_items').insert({ content_type: 'showcase', item_id: String(id) });
    setHiddenIds(prev => [...prev, String(id)]);
  };

  const handleDeleteAddition = async (item: ShowcaseAddition) => {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    const match = item.image_url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    if (match?.[1]) {
      await supabase.storage.from(STORAGE_BUCKET).remove([match[1]]);
    }
    await supabase.from('showcase_additions').delete().eq('id', item.id);
    setAdditions(prev => prev.filter(a => a.id !== item.id));
  };

  const visibleBuiltin = galleryItems.filter(i => !hiddenIds.includes(String(i.id)));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/40 text-sm">
          {visibleBuiltin.length + additions.length} active photos
        </p>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-brand hover:bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white">New Photo</h3>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-brand/50 transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-52 object-cover" />
            ) : (
              <div className="h-52 flex flex-col items-center justify-center gap-2 text-white/30">
                <Upload className="w-8 h-8" />
                <span className="text-sm">Click to upload photo</span>
                <span className="text-xs text-white/20">JPG, PNG, WEBP</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title (e.g. VW Golf CarPlay Retrofit) *"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value as ShowcaseCategory)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
          >
            {CATEGORIES.map(c => <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>)}
          </select>

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Brief description (optional)"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm resize-none"
          />

          {formError && <p className="text-red-400 text-xs">{formError}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="flex-1 bg-brand hover:bg-brand-accent disabled:opacity-50 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Photo
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {/* Custom items shown first */}
        {additions.map(item => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square border border-brand/20">
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
              <button
                onClick={() => handleDeleteAddition(item)}
                className="self-end p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div>
                <p className="text-white text-xs font-semibold truncate leading-tight">{item.title}</p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">custom</span>
              </div>
            </div>
          </div>
        ))}

        {/* Built-in items */}
        {visibleBuiltin.map(item => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square border border-white/[0.07]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
              <button
                onClick={() => handleDeleteBuiltin(item.id)}
                className="self-end p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div>
                <p className="text-white text-xs font-semibold truncate leading-tight">{item.title}</p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">built-in</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
