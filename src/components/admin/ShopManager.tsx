import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, X, Loader2, Edit2, Check, ImageIcon, LayoutGrid, List, FolderOpen } from 'lucide-react';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';
import { PRODUCTS, Product } from '../../data/products';
import ImageEditor from './ImageEditor';
import MediaGallery from './MediaGallery';
import { VAG_MAKES } from '../../data/vehicles';

const CATEGORIES: Product['category'][] = ['Cameras', 'Retrofits', 'Repairs', 'Parts'];

interface ProductAddition {
  id: string;
  name: string;
  price: string;
  base_price: string;
  category: Product['category'];
  description: string;
  image_url: string;
  mobile_within_100: string;
  mobile_over_100: string;
  garage: string;
  vehicle_make?: string;
  vehicle_model?: string;
}

export default function ShopManager() {
  const [additions, setAdditions] = useState<ProductAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeMake, setActiveMake] = useState<string>('all');
  const [editingImage, setEditingImage] = useState<{ product: any; imageUrl: string; isCustom: boolean } | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    base_price: '',
    price: '',
    category: 'Cameras' as Product['category'],
    description: '',
    vehicle_make: '',
    vehicle_model: '',
    imageFile: null as File | null,
    preview: null as string | null,
    mobile_within_100: '',
    mobile_over_100: '',
    garage: '',
  });

  const fetchData = async () => {
    const [{ data: adds }, { data: hidden }] = await Promise.all([
      supabase.from('product_additions').select('*').order('created_at', { ascending: false }),
      supabase.from('hidden_items').select('item_id').eq('content_type', 'product'),
    ]);
    setAdditions((adds ?? []) as ProductAddition[]);
    setHiddenIds((hidden ?? []).map((h: { item_id: string }) => h.item_id));
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
    setForm({
      name: '', base_price: '', price: '', category: 'Cameras',
      description: '', vehicle_make: '', vehicle_model: '',
      imageFile: null, preview: null,
      mobile_within_100: '', mobile_over_100: '', garage: '',
    });
    setFormError('');
  };

  const calculateVAT = (amount: number) => {
    return (amount * 1.20).toFixed(2);
  };

  const handleAdd = async () => {
    if (!form.name.trim() || !form.base_price.trim()) {
      setFormError('Name and base price (ex VAT) are required.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      let imageUrl = '';
      if (form.imageFile) {
        const ext = form.imageFile.name.split('.').pop();
        const fileName = `products/${Date.now()}.${ext}`;
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
        const { data: { publicUrl } } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(fileName);
        imageUrl = publicUrl;
      } else if (form.preview) {
        imageUrl = form.preview;
      }

      const { error: insertError } = await supabase
        .from('product_additions')
        .insert({
          name: form.name.trim(),
          base_price: form.base_price.trim(),
          price: `£${calculateVAT(parseFloat(form.base_price))}`,
          category: form.category,
          description: form.description.trim(),
          image_url: imageUrl,
          vehicle_make: form.vehicle_make.trim(),
          vehicle_model: form.vehicle_model.trim(),
          mobile_within_100: form.mobile_within_100.trim(),
          mobile_over_100: form.mobile_over_100.trim(),
          garage: form.garage.trim(),
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

  const handleDeleteAddition = async (item: ProductAddition) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    const match = item.image_url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    if (match?.[1]) {
      await supabase.storage.from(STORAGE_BUCKET).remove([match[1]]);
    }
    await supabase.from('product_additions').delete().eq('id', item.id);
    setAdditions(prev => prev.filter(a => a.id !== item.id));
  };

  const handleDeleteBuiltin = async (id: string) => {
    if (!confirm('Hide this product from the shop?')) return;
    await supabase.from('hidden_items').insert({ content_type: 'product', item_id: String(id) });
    setHiddenIds(prev => [...prev, String(id)]);
  };

  const handleEditImage = (product: any, imageUrl: string, isCustom: boolean) => {
    setEditingImage({ product, imageUrl, isCustom });
  };

  const handleSaveEditedImage = async (editedImageUrl: string) => {
    if (!editingImage) return;

    let finalUrl = editedImageUrl;

    if (editedImageUrl.startsWith('data:')) {
      try {
        const res = await fetch(editedImageUrl);
        const blob = await res.blob();
        const ext = blob.type.split('/')[1] || 'jpg';
        const fileName = `products/edited_${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, blob, { cacheControl: '3600', upsert: false, contentType: blob.type });
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
          finalUrl = publicUrl;
        }
      } catch (err) {
        console.error('Failed to upload edited image to storage:', err);
      }
    }

    if (editingImage.isCustom) {
      await supabase.from('product_additions').update({ image_url: finalUrl }).eq('id', editingImage.product.id);
    } else {
      const p = editingImage.product;
      const basePrice = parseFloat((p.price ?? '0').replace('£', '').replace(',', '')) || 0;
      const exVat = (basePrice / 1.2).toFixed(2);
      await supabase.from('product_additions').insert({
        name: p.name,
        base_price: exVat,
        price: p.price ?? '',
        category: p.category ?? '',
        description: p.description ?? '',
        image_url: finalUrl,
        mobile_within_100: '0',
        mobile_over_100: '0',
        garage: '0',
      });
      await supabase.from('hidden_items').upsert({
        content_type: 'product',
        item_id: String(p.id),
      }, { onConflict: 'content_type,item_id' });
    }

    fetchData();
    setEditingImage(null);
  };

  const visibleBuiltin = PRODUCTS.filter(p => !hiddenIds.includes(p.id));

  const matchesCat = (p: any) => activeCategory === 'all' || p.category === activeCategory;
  const matchesMake = (p: any) => activeMake === 'all' || (p.vehicle_make || '').toLowerCase() === activeMake.toLowerCase();

  const filteredAdditions = additions.filter(p => matchesCat(p) && matchesMake(p));
  const filteredBuiltin = visibleBuiltin.filter(p => matchesCat(p) && matchesMake(p));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm">
            {filteredBuiltin.length + filteredAdditions.length} products
          </span>
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
            Add Product
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
              activeMake === make ? 'bg-brand text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
            }`}
          >
            {make === 'all' ? 'All Makes' : make}
          </button>
        ))}
      </div>

      {/* Work Type Filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <span className="text-white/20 text-[10px] uppercase tracking-widest self-center shrink-0">Type</span>
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
            activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
          }`}
        >
          All Types
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
              activeCategory === cat ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white">New Product</h3>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-brand/50 transition-colors"
          >
            {form.preview ? (
              <img src={form.preview} alt="Preview" className="w-full h-40 object-contain bg-white/5" />
            ) : (
              <div className="h-40 flex flex-col items-center justify-center gap-2 text-white/30">
                <Upload className="w-7 h-7" />
                <span className="text-sm">Click to upload image</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Product name *"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
            <div className="relative">
              <input
                value={form.base_price}
                onChange={e => {
                  const val = e.target.value;
                  setForm(p => ({ ...p, base_price: val, price: val ? `£${calculateVAT(parseFloat(val) || 0)}` : '' }));
                }}
                placeholder="Base price ex VAT * (e.g. 350.00)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
              />
              {form.base_price && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs">
                  +VAT: £{calculateVAT(parseFloat(form.base_price) || 0)}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.vehicle_make}
              onChange={e => setForm(p => ({ ...p, vehicle_make: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
            >
              <option value="" className="bg-[#111]">Compatible Make (optional)</option>
              {VAG_MAKES.map(m => <option key={m} value={m} className="bg-[#111]">{m}</option>)}
            </select>
            <input
              value={form.vehicle_model}
              onChange={e => setForm(p => ({ ...p, vehicle_model: e.target.value }))}
              placeholder="Model (e.g. Golf MK7, optional)"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
          </div>

          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value as Product['category'] }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
          >
            {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
          </select>

          <textarea
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm resize-none"
          />

          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Installation Options (prices ex VAT)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-white/30 text-xs mb-1">Mobile &lt;100 miles</label>
                <input
                  value={form.mobile_within_100}
                  onChange={e => setForm(p => ({ ...p, mobile_within_100: e.target.value }))}
                  placeholder="e.g. 50.00"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 text-sm"
                />
              </div>
              <div>
                <label className="block text-white/30 text-xs mb-1">Mobile &gt;100 miles</label>
                <input
                  value={form.mobile_over_100}
                  onChange={e => setForm(p => ({ ...p, mobile_over_100: e.target.value }))}
                  placeholder="e.g. 100.00"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 text-sm"
                />
              </div>
              <div>
                <label className="block text-white/30 text-xs mb-1">Garage</label>
                <input
                  value={form.garage}
                  onChange={e => setForm(p => ({ ...p, garage: e.target.value }))}
                  placeholder="e.g. 25.00"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 text-sm"
                />
              </div>
            </div>
          </div>

          {formError && <p className="text-red-400 text-xs">{formError}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="flex-1 bg-brand hover:bg-brand-accent disabled:opacity-50 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Product
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

      <div className={viewMode === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3'}>
        {filteredAdditions.map((item: any, idx: number) => (
          <ProductCard key={`add-${item.id || idx}`} product={item} onDelete={() => { handleDeleteAddition(item); }} onUpdate={fetchData} onEditImage={handleEditImage} viewMode={viewMode} />
        ))}

        {filteredBuiltin.map((product: any, idx: number) => (
          <BuiltinProductCard key={`builtin-${product.id || idx}`} product={product} onHide={() => { handleDeleteBuiltin(product.id); }} onUpdate={fetchData} onEditImage={handleEditImage} viewMode={viewMode} />
        ))}
      </div>

      {editingImage && (
        <ImageEditor
          image={editingImage.imageUrl}
          onSave={handleSaveEditedImage}
          onCancel={() => setEditingImage(null)}
        />
      )}

      {showMediaGallery && (
        <MediaGallery
          onSelect={handleGallerySelect}
          onClose={() => setShowMediaGallery(false)}
          isModal={true}
        />
      )}
    </div>
  );
}

function ProductCard(props: any) {
  const { product, onDelete, onUpdate, onEditImage, viewMode = 'list' } = props;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: product.name as string,
    base_price: (product.base_price ?? '') as string,
    category: (product.category ?? 'Cameras') as string,
    description: (product.description ?? '') as string,
    vehicle_make: (product.vehicle_make ?? '') as string,
    vehicle_model: (product.vehicle_model ?? '') as string,
    mobile_within_100: (product.mobile_within_100 ?? '') as string,
    mobile_over_100: (product.mobile_over_100 ?? '') as string,
    garage: (product.garage ?? '') as string,
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const calculateVAT = (amount: number) => (amount * 1.20).toFixed(2);

  const handleSave = async () => {
    setSaving(true);
    setFormError('');
    try {
      const basePrice = parseFloat(form.base_price) || 0;
      const { error } = await supabase.from('product_additions').update({
        name: form.name.trim(),
        base_price: form.base_price.trim(),
        price: `£${calculateVAT(basePrice)}`,
        category: form.category,
        description: form.description.trim(),
        vehicle_make: form.vehicle_make.trim(),
        vehicle_model: form.vehicle_model.trim(),
        mobile_within_100: form.mobile_within_100.trim() || '0',
        mobile_over_100: form.mobile_over_100.trim() || '0',
        garage: form.garage.trim() || '0',
      }).eq('id', product.id);
      if (error) throw error;
      setEditing(false);
      onUpdate();
    } catch (err: any) {
      console.error('Update error:', err);
      setFormError(err?.message || 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: product.name,
      base_price: product.base_price ?? '',
      category: product.category ?? 'Cameras',
      description: product.description ?? '',
      vehicle_make: product.vehicle_make ?? '',
      vehicle_model: product.vehicle_model ?? '',
      mobile_within_100: product.mobile_within_100 ?? '',
      mobile_over_100: product.mobile_over_100 ?? '',
      garage: product.garage ?? '',
    });
    setFormError('');
    setEditing(false);
    onUpdate();
  };

  if (editing) {
    return (
      <div className="bg-white/5 border border-brand/30 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Product name"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">£</span>
            <input
              value={form.base_price}
              onChange={e => setForm(p => ({ ...p, base_price: e.target.value }))}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-3 py-2 text-white text-sm"
            />
            {form.base_price && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400 text-xs">
                = £{calculateVAT(parseFloat(form.base_price) || 0)} inc VAT
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select
            value={form.vehicle_make}
            onChange={e => setForm(p => ({ ...p, vehicle_make: e.target.value }))}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand transition-colors"
          >
            <option value="" className="bg-[#111]">Select Make</option>
            {VAG_MAKES.map(m => <option key={m} value={m} className="bg-[#111]">{m}</option>)}
          </select>
          <input
            value={form.vehicle_model}
            onChange={e => setForm(p => ({ ...p, vehicle_model: e.target.value }))}
            placeholder="Model (e.g. Golf MK7)"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand transition-colors"
          />
        </div>

        <select
          value={form.category}
          onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand transition-colors"
        >
          {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
        </select>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-white/30 text-[10px] uppercase">Mobile &lt;100mi</label>
            <input
              value={form.mobile_within_100}
              onChange={e => setForm(p => ({ ...p, mobile_within_100: e.target.value }))}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs"
            />
          </div>
          <div>
            <label className="text-white/30 text-[10px] uppercase">Mobile &gt;100mi</label>
            <input
              value={form.mobile_over_100}
              onChange={e => setForm(p => ({ ...p, mobile_over_100: e.target.value }))}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs"
            />
          </div>
          <div>
            <label className="text-white/30 text-[10px] uppercase">Garage</label>
            <input
              value={form.garage}
              onChange={e => setForm(p => ({ ...p, garage: e.target.value }))}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs"
            />
          </div>
        </div>

        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder="Description"
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none"
        />
        {formError && <p className="text-red-400 text-xs">{formError}</p>}
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 bg-brand px-3 py-1.5 rounded text-white text-xs">
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            Save
          </button>
          <button onClick={handleCancel} className="px-3 py-1.5 rounded bg-white/5 text-white/50 text-xs">Cancel</button>
        </div>
      </div>
    );
  }

  const basePrice = parseFloat(product.base_price) || 0;

  if (viewMode === 'list') {
    return (
      <div className="group relative rounded-xl overflow-hidden flex border border-brand/20">
        <div className="w-32 h-32 shrink-0">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover bg-white/10" loading="lazy" />
        </div>
        <div className="flex-1 p-3 sm:p-4 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-1.5 mb-1 sm:mb-2 flex-wrap">
            <span className="font-semibold text-white text-sm sm:text-base truncate">{product.name}</span>
            {product.vehicle_make && (
              <span className="text-[9px] font-bold uppercase tracking-widest bg-brand/10 text-brand px-1.5 py-0.5 rounded">
                {product.vehicle_make}{product.vehicle_model ? ` ${product.vehicle_model}` : ''}
              </span>
            )}
            <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white/60 px-1.5 py-0.5 rounded">{product.category}</span>
          </div>
          <div className="text-white/50 text-sm">
            <span className="font-medium text-brand">£{calculateVAT(basePrice)} inc VAT</span>
            <span className="text-white/30"> ({product.base_price || '0'} ex VAT)</span>
          </div>
        </div>
        <div className="flex items-center gap-1 p-3 shrink-0">
          <button onClick={() => onEditImage(product, product.image_url, true)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/40 hover:text-white transition-colors" title="Edit Image">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(true)} className="p-2 rounded-lg bg-brand/20 hover:bg-brand text-brand hover:text-white transition-colors">
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
    <div className="group relative rounded-xl overflow-hidden border border-brand/20">
      <div className="aspect-video">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover bg-white/10" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className="font-semibold text-white text-sm">{product.name}</span>
          {product.vehicle_make && (
            <span className="text-[9px] font-bold uppercase tracking-widest bg-brand/10 text-brand px-1.5 py-0.5 rounded">
              {product.vehicle_make}{product.vehicle_model ? ` ${product.vehicle_model}` : ''}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white/60 px-1.5 py-0.5 rounded">{product.category}</span>
        </div>
        <div className="text-white/50 text-xs mb-2">
          <span className="font-medium text-brand">£{calculateVAT(basePrice)} inc VAT</span>
          <span className="text-white/30"> ({product.base_price || '0'} ex VAT)</span>
        </div>
        <p className="text-white/40 text-xs line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => onEditImage(product, product.image_url, true)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/40 hover:text-white transition-colors" title="Edit Image">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(true)} className="p-2 rounded-lg bg-brand/20 hover:bg-brand text-brand hover:text-white transition-colors">
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

function BuiltinProductCard(props: any) {
  const { product, onHide, onUpdate, onEditImage, viewMode = 'list' } = props;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category
  });
  const [saving, setSaving] = useState(false);

  const basePrice = parseFloat(product.price.replace('£', '').replace(',', '')) / 1.2;

  const calculateVAT = (amount: number) => (amount * 1.20).toFixed(2);

  const handleSave = async () => {
    setSaving(true);
    const newBasePrice = parseFloat(form.price.replace('£', '').replace(',', '')) / 1.2;
    await supabase.from('hidden_items').upsert({
      content_type: 'product-edit',
      item_id: String(product.id),
      metadata: {
        name: form.name,
        description: form.description,
        price: `£${calculateVAT(newBasePrice)}`,
        base_price: newBasePrice.toFixed(2),
        category: form.category
      }
    }, { onConflict: 'content_type,item_id' });
    setSaving(false);
    setEditing(false);
    if (onUpdate) onUpdate();
  };

  if (editing) {
    return (
      <div className="bg-white/5 border border-brand/30 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Product name"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">£</span>
            <input
              value={form.price.replace('£', '')}
              onChange={e => setForm(p => ({ ...p, price: `£${e.target.value}` }))}
              placeholder={product.price.replace('£', '')}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-3 py-2 text-white text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          >
            {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
          </select>
          <div className="text-emerald-400 text-xs flex items-center">
            = £{calculateVAT(parseFloat(form.price.replace('£', '').replace(',', '')) || 0)} inc VAT
          </div>
        </div>

        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder="Description"
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none"
        />

        <div className="text-white/30 text-xs">Changes saved to hidden_items table</div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 bg-brand px-3 py-1.5 rounded text-white text-xs">
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Save
          </button>
          <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded bg-white/5 text-white/50 text-xs">Cancel</button>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="group relative rounded-xl overflow-hidden flex border border-white/[0.07]">
        <div className="w-32 h-32 shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover bg-white/10" loading="lazy" />
        </div>
        <div className="flex-1 p-4 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-white text-base truncate">{product.name}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-1.5 py-0.5 rounded">{product.category}</span>
          </div>
          <span className="text-white/50 text-sm">{product.price}</span>
        </div>
        <div className="flex items-center gap-1 p-3 shrink-0">
          <button onClick={() => onEditImage(product, product.image, false)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/40 hover:text-white transition-colors" title="Edit Image">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(true)} className="p-2 rounded-lg bg-brand/20 hover:bg-brand text-brand hover:text-white transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onHide} className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-xl overflow-hidden border border-white/[0.07]">
      <div className="aspect-video">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover bg-white/10" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-white text-sm">{product.name}</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-1.5 py-0.5 rounded">{product.category}</span>
        </div>
        <span className="text-white/50 text-xs block mb-2">{product.price}</span>
        <p className="text-white/40 text-xs line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => onEditImage(product, product.image, false)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/40 hover:text-white transition-colors" title="Edit Image">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(true)} className="p-2 rounded-lg bg-brand/20 hover:bg-brand text-brand hover:text-white transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onHide} className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
