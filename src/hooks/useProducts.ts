import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PRODUCTS, Product } from '../data/products';

export type ProductSource = 'builtin' | 'custom';

export interface MergedProduct extends Product {
  _source: ProductSource;
  _supabaseId?: string;
}

interface ProductAddition {
  id: string;
  name: string;
  price: string;
  category: Product['category'];
  description: string;
  image_url: string;
}

export function useProducts(): MergedProduct[] {
  const [additions, setAdditions] = useState<ProductAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from('product_additions').select('*').order('created_at', { ascending: false }),
      supabase.from('hidden_items').select('item_id').eq('content_type', 'product'),
    ]).then(([{ data: adds }, { data: hidden }]) => {
      setAdditions((adds ?? []) as ProductAddition[]);
      setHiddenIds((hidden ?? []).map((h: { item_id: string }) => h.item_id));
    });
  }, []);

  return [
    ...PRODUCTS
      .filter(p => !hiddenIds.includes(p.id))
      .map(p => ({ ...p, _source: 'builtin' as const })),
    ...additions.map(a => ({
      id: a.id,
      name: a.name,
      price: a.price,
      category: a.category,
      description: a.description,
      image: a.image_url,
      _source: 'custom' as const,
      _supabaseId: a.id,
    })),
  ];
}
