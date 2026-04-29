import { useState, useEffect, useCallback } from 'react';
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
  vehicle_make?: string;
  vehicle_model?: string;
}

export function useProducts(): MergedProduct[] {
  const [additions, setAdditions] = useState<ProductAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    const [{ data: adds }, { data: hidden }] = await Promise.all([
      supabase.from('product_additions').select('*').order('created_at', { ascending: false }),
      supabase.from('hidden_items').select('item_id').eq('content_type', 'product'),
    ]);
    setAdditions((adds ?? []) as ProductAddition[]);
    setHiddenIds((hidden ?? []).map((h: { item_id: string }) => h.item_id));
  }, []);

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('product_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'product_additions' },
        fetchData
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'hidden_items' },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

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
      vehicle_make: a.vehicle_make,
      vehicle_model: a.vehicle_model,
      _source: 'custom' as const,
      _supabaseId: a.id,
    })),
  ];
}
