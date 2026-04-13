import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, X, Loader2 } from 'lucide-react';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';
import { PRODUCTS, Product } from '../../data/products';

const CATEGORIES: Product['category'][] = ['Cameras', 'Retrofits', 'Repairs', 'Parts'];

interface ProductAddition {
  id: string;
  name: string;
  price: string;
  category: Product['category'];
  description: string;
  image_url: string;
}

export default function ShopManager() {
  const [additions, setAdditions] = useState<ProductAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Product['category']>('Cameras');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

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
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setFormError('');
  };

  const resetForm = () => {
    setShowForm(false);
    setName(''); setPrice(''); setDescription('');
    setImageFile(null); setPreview(null); setFormError('');
  };

  const handleAdd = async () => {
    if (!name.trim() || !price.trim() || !imageFile) {
      setFormError('Name, price, and image are required.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const ext = imageFile.name.split('.').pop();
      const fileName = `products/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, imageFile);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('product_additions')
        .insert({ name: name.trim(), price: price.trim(), category, description: description.trim(), image_url: publicUrl });
      if (insertError) throw insertError;

      resetForm();
      fetchData();
    } catch (err) {
      setFormError('Upload failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBuiltin = async (id: string) => {
    if (!confirm('Hide this product from the shop?')) return;
    await supabase.from('hidden_items').insert({ content_type: 'product', item_id: id });
    setHiddenIds(prev => [...prev, id]);
  };

  const handleDeleteAddition = async (item: ProductAddition) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    // Remove image from storage
    const match = item.image_url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    if (match?.[1]) {
      await supabase.storage.from(STORAGE_BUCKET).remove([match[1]]);
    }
    await supabase.from('product_additions').delete().eq('id', item.id);
    setAdditions(prev => prev.filter(a => a.id !== item.id));
  };

  const visibleBuiltin = PRODUCTS.filter(p => !hiddenIds.includes(p.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/40 text-sm">
          {visibleBuiltin.length + additions.length} active products
        </p>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-brand hover:bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white">New Product</h3>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-brand/50 transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-40 object-contain bg-white/5" />
            ) : (
              <div className="h-40 flex flex-col items-center justify-center gap-2 text-white/30">
                <Upload className="w-7 h-7" />
                <span className="text-sm">Click to upload image</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Product name *"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Price (e.g. £420.00) *"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value as Product['category'])}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand transition-colors text-sm"
          >
            {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
          </select>

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
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

      {/* Product List */}
      <div className="space-y-2">
        {additions.map(item => (
          <div key={item.id} className="flex items-center gap-4 bg-white/5 border border-brand/20 rounded-xl p-3 group">
            <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-lg shrink-0 bg-white/10" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-semibold text-white text-sm truncate">{item.name}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded shrink-0">custom</span>
              </div>
              <span className="text-white/40 text-xs">{item.price} · {item.category}</span>
            </div>
            <button
              onClick={() => handleDeleteAddition(item)}
              title="Delete product"
              className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {visibleBuiltin.map(product => (
          <div key={product.id} className="flex items-center gap-4 bg-white/5 border border-white/[0.07] rounded-xl p-3 group">
            <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg shrink-0 bg-white/10" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-semibold text-white text-sm truncate">{product.name}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 bg-white/5 px-1.5 py-0.5 rounded shrink-0">built-in</span>
              </div>
              <span className="text-white/40 text-xs">{product.price} · {product.category}</span>
            </div>
            <button
              onClick={() => handleDeleteBuiltin(product.id)}
              title="Hide product"
              className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
