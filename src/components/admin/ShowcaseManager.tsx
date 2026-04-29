import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, X, Loader2, Edit2, Filter, LayoutGrid, List, FolderOpen } from 'lucide-react';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';
import { galleryItems, CategoryId } from '../../data/showcaseItems';
import MediaGallery from './MediaGallery';
import { VAG_MAKES } from '../../data/vehicles';

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
  vehicle_make?: string;
  vehicle_model?: string;
}

interface ShowcaseEdit {
  content_type: string;
  item_id: string;
  metadata: { title?: string; description?: string; category?: string; vehicle_make?: string; vehicle_model?: string };
}

export default function ShowcaseManager() {
  const [additions, setAdditions] = useState<ShowcaseAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [edits, setEdits] = useState<Record<string, { title: string; description: string; category: string; vehicle_make: string; vehicle_model: string }>>({});
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory | 'all'>('all');
  const [activeMake, setActiveMake] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'exterior' as ShowcaseCategory,
    description: '',
    vehicle_make: '',
    vehicle_model: '',
    imageFile: null as File | null,
    preview: null as string | null,
  });

  const fetchData = async () => {
    const [{ data: adds }, { data: hidden }, { data: editData }] = await Promise.all([
      supabase.from('showcase_additions').select('*').order('created_at', { ascending: false }),
      supabase.from('hidden_items').select('item_id').eq('content_type', 'showcase'),
      supabase.from('hidden_items').select('*').eq('content_type', 'showcase-edit'),
    ]);
    
    setAdditions((adds ?? []) as ShowcaseAddition[]);
    setHiddenIds((hidden ?? []).map((h: { item_id: string }) => h.item_id));
    
    const editMap: Record<string, { title: string; description: string; category: string; vehicle_make: string; vehicle_model: string }> = {};
    (editData as ShowcaseEdit[] | null)?.forEach(e => {
      editMap[e.item_id] = {
        title: e.metadata?.title || '',
        description: e.metadata?.description || '',
        category: e.metadata?.category || '',
        vehicle_make: e.metadata?.vehicle_make || '',
        vehicle_model: e.metadata?.vehicle_model || '',
      };
    });
    setEdits(editMap);
  };

  useEffect(() => { fetchData(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm(prev => ({ ...prev, imageFile: file, preview: URL.createObjectURL(file) }));
    setFormError('');
  };

  const handleGallerySelect = (url: string) => {
    setForm(prev => ({ ...prev, imageFile: null, preview: url }));
    setShowMediaGallery(false);
  };

  const resetForm = () => {
    setShowForm(false);
    setForm({ title: '', category: 'exterior', description: '', vehicle_make: '', vehicle_model: '', imageFile: null, preview: null });
    setFormError('');
  };

  const handleAdd = async () => {
    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (!form.imageFile && !form.preview) {
      setFormError('Image is required.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      let publicUrl: string;

      if (form.imageFile) {
        const ext = form.imageFile.name.split('.').pop();
        const fileName = `showcase/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, form.imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: form.imageFile.type || 'image/jpeg'
          });
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(uploadError.message);
        }
        const { data: { publicUrl: url } } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(fileName);
        publicUrl = url;
      } else {
        publicUrl = form.preview as string;
      }

      const { error: insertError } = await supabase
        .from('showcase_additions')
        .insert({
          title: form.title.trim(),
          category: form.category,
          description: form.description.trim(),
          image_url: publicUrl,
          vehicle_make: form.vehicle_make.trim(),
          vehicle_model: form.vehicle_model.trim(),
        });
      if (insertError) throw insertError;

      resetForm();
      fetchData();
    } catch (err: any) {
      console.error('Save error:', err);
      setFormError(err?.message || 'Upload failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBuiltin = async (id: string) => {
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

  const handleSaveEdit = async (itemId: string) => {
    const edit = edits[itemId];
    if (!edit) return;

    const item = additions.find(a => a.id === itemId);
    if (item) {
      await supabase.from('showcase_additions').update({
        title: edit.title,
        description: edit.description,
        category: edit.category as ShowcaseCategory,
        vehicle_make: edit.vehicle_make,
        vehicle_model: edit.vehicle_model,
      }).eq('id', itemId);
    } else {
      await supabase.from('hidden_items').upsert({
        content_type: 'showcase-edit',
        item_id: itemId,
        metadata: edit,
      }, { onConflict: 'content_type,item_id' });
    }
    setEditingId(null);
    fetchData();
  };

  const visibleBuiltin = galleryItems.filter(i => !hiddenIds.includes(String(i.id)));

  const getItemCategory = (item: any): ShowcaseCategory => {
    if (edits[item.id]?.category) return edits[item.id].category as ShowcaseCategory;
    if (item.category) return item.category;
    return 'exterior';
  };

  const getFilteredItems = () => {
    const matchesCat = (item: any) => activeCategory === 'all' || getItemCategory(item) === activeCategory;
    const matchesMake = (item: any) => {
      if (activeMake === 'all') return true;
      const make = (edits[item.id]?.vehicle_make || item.vehicle_make || '').toLowerCase();
      return make === activeMake.toLowerCase();
    };
    return {
      custom: additions.filter(i => matchesCat(i) && matchesMake(i)),
      builtin: visibleBuiltin.filter(i => matchesCat(i) && matchesMake(i)),
    };
  };

  const filtered = getFilteredItems();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <span className="text-white/40 text-sm">{filtered.custom.length + filtered.builtin.length} photos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-brand text-white' : 'text-white/40 hover:text-white'}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'card' ? 'bg-brand text-white' : 'text-white/40 hover:text-white'}`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 bg-brand hover:bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Photo
          </button>
        </div>
      </div>

      {/* Make Filter */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        <span className="text-white/20 text-[10px] uppercase tracking-widest self-center shrink-0">Make</span>
        {['all', ...VAG_MAKES].map(make => (
          <button
            key={make}
            onClick={() => setActiveMake(make)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
              activeMake === make
                ? 'bg-brand text-white'
                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
            }`}
          >
            {make === 'all' ? 'All Makes' : make}
          </button>
        ))}
      </div>

      {/* Work Type Filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <span className="text-white/20 text-[10px] uppercase tracking-widest self-center shrink-0">Work</span>
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
          }`}
        >
          All Work
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white">New Photo</h3>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-brand/50 transition-colors"
          >
            {form.preview ? (
              <img src={form.preview} alt="Preview" className="w-full h-52 object-cover" />
            ) : (
              <div className="h-52 flex flex-col items-center justify-center gap-2 text-white/30">
                <Upload className="w-8 h-8" />
                <span className="text-sm">Click to upload photo</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <button
            type="button"
            onClick={() => setShowMediaGallery(true)}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-lg py-2.5 text-white/40 hover:text-white hover:border-brand/50 transition-colors text-xs font-medium"
          >
            <FolderOpen className="w-4 h-4" />
            Choose from Media Gallery
          </button>

          <input
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Title (e.g. CarPlay Retrofit) *"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.vehicle_make}
              onChange={e => setForm(p => ({ ...p, vehicle_make: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
            >
              <option value="" className="bg-[#111]">Select Make</option>
              {VAG_MAKES.map(m => <option key={m} value={m} className="bg-[#111]">{m}</option>)}
            </select>
            <input
              value={form.vehicle_model}
              onChange={e => setForm(p => ({ ...p, vehicle_model: e.target.value }))}
              placeholder="Model (e.g. Golf MK7)"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
          </div>

          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value as ShowcaseCategory }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
          >
            {CATEGORIES.map(c => <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>)}
          </select>

          <textarea
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
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

      {showMediaGallery && (
        <MediaGallery
          onSelect={handleGallerySelect}
          onClose={() => setShowMediaGallery(false)}
          isModal={true}
        />
      )}

      <div className={viewMode === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3'}>
        {filtered.custom.map(item => (
          <ShowcaseCard
            item={item}
            onDelete={() => { handleDeleteAddition(item); }}
            editing={editingId === item.id}
            edit={edits[item.id] || { title: item.title, description: item.description, category: item.category, vehicle_make: item.vehicle_make || '', vehicle_model: item.vehicle_model || '' }}
            onEdit={() => setEditingId(item.id)}
            onSave={() => { handleSaveEdit(item.id); }}
            onCancel={() => { setEditingId(null); }}
            onEditChange={(field, value) => setEdits(prev => ({ ...prev, [item.id]: { ...prev[item.id], [field]: value } }))}
            isCustom
            categories={CATEGORIES}
            viewMode={viewMode}
          />
        ))}

        {filtered.builtin.map(item => (
          <ShowcaseCard
            item={item}
            onDelete={() => { handleDeleteBuiltin(String(item.id)); }}
            editing={editingId === String(item.id)}
            edit={edits[String(item.id)] || { title: item.title, description: item.description, category: item.category, vehicle_make: item.vehicle_make || '', vehicle_model: item.vehicle_model || '' }}
            onEdit={() => setEditingId(String(item.id))}
            onSave={() => { handleSaveEdit(String(item.id)); }}
            onCancel={() => { setEditingId(null); }}
            onEditChange={(field, value) => setEdits(prev => ({ ...prev, [String(item.id)]: { ...prev[String(item.id)], [field]: value } }))}
            isCustom={false}
            categories={CATEGORIES}
            viewMode={viewMode}
          />
        ))}
      </div>

      {filtered.custom.length === 0 && filtered.builtin.length === 0 && (
        <div className="text-center py-12 text-white/30">
          No photos in this category
        </div>
      )}
    </div>
  );
}

function ShowcaseCard({ 
  item, 
  onDelete, 
  editing, 
  edit, 
  onEdit, 
  onSave, 
  onCancel, 
  onEditChange,
  isCustom,
  categories,
  viewMode = 'card'
}: { 
  item: any; 
  onDelete: () => void | Promise<void>; 
  editing: boolean;
  edit: { title: string; description: string; category: string; vehicle_make: string; vehicle_model: string };
  onEdit: () => void;
  onSave: () => void | Promise<void>;
  onCancel: () => void;
  onEditChange: (field: string, value: string) => void;
  isCustom: boolean;
  categories: { id: string; name: string }[];
  viewMode?: 'list' | 'card';
}) {
  const currentCategory = categories.find(c => c.id === (edit.category || item.category));
  const displayMake = edit.vehicle_make || item.vehicle_make || '';
  const displayModel = edit.vehicle_model || item.vehicle_model || '';

  if (editing) {
    return (
      <div className={`bg-white/5 border ${isCustom ? 'border-brand/30' : 'border-white/10'} rounded-xl p-4 space-y-3`}>
        <input
          value={edit.title}
          onChange={e => onEditChange('title', e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
          placeholder="Title"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={edit.vehicle_make || ''}
            onChange={e => onEditChange('vehicle_make', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="" className="bg-[#111]">Select Make</option>
            {VAG_MAKES.map(m => <option key={m} value={m} className="bg-[#111]">{m}</option>)}
          </select>
          <input
            value={edit.vehicle_model || ''}
            onChange={e => onEditChange('vehicle_model', e.target.value)}
            placeholder="Model (e.g. Golf MK7)"
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
          />
        </div>
        <select
          value={edit.category || item.category || 'exterior'}
          onChange={e => onEditChange('category', e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
        >
          {categories.map(c => (
            <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>
          ))}
        </select>
        <textarea
          value={edit.description}
          onChange={e => onEditChange('description', e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm resize-none"
          placeholder="Description"
          rows={3}
        />
        <div className="flex gap-2">
          <button onClick={onSave} className="flex-1 bg-brand rounded-lg py-2 text-white text-sm font-medium">Save</button>
          <button onClick={onCancel} className="flex-1 bg-white/10 rounded-lg py-2 text-white/60 text-sm">Cancel</button>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className={`group relative rounded-xl overflow-hidden flex ${isCustom ? 'border border-brand/20' : 'border border-white/[0.07]'}`}>
        <div className="w-32 h-32 shrink-0">
          <img src={item.image_url || item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 p-4 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-white text-base truncate">{item.title}</span>
            {displayMake && (
              <span className="text-[9px] font-bold uppercase tracking-widest bg-brand/10 text-brand px-1.5 py-0.5 rounded shrink-0">
                {displayMake}{displayModel ? ` ${displayModel}` : ''}
              </span>
            )}
            {currentCategory && (
              <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white/60 px-1.5 py-0.5 rounded shrink-0">
                {currentCategory.name}
              </span>
            )}
          </div>
          <p className="text-white/50 text-sm line-clamp-2">{item.description}</p>
        </div>
        <div className="flex items-center gap-1 p-3 shrink-0">
          <button onClick={onEdit} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/40 hover:text-white transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative rounded-xl overflow-hidden border ${isCustom ? 'border-brand/20' : 'border-white/[0.07]'}`}>
      <div className="aspect-video">
        <img src={item.image_url || item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="font-semibold text-white text-sm">{item.title}</span>
          {displayMake && (
            <span className="text-[9px] font-bold uppercase tracking-widest bg-brand/10 text-brand px-1.5 py-0.5 rounded">
              {displayMake}{displayModel ? ` ${displayModel}` : ''}
            </span>
          )}
          {currentCategory && (
            <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white/60 px-1.5 py-0.5 rounded">
              {currentCategory.name}
            </span>
          )}
        </div>
        <p className="text-white/50 text-xs line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/40 hover:text-white transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}