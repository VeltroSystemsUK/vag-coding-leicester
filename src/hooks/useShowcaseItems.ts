import { useState, useEffect, useCallback } from 'react';
import { Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { galleryItems, GalleryItem, CategoryId } from '../data/showcaseItems';

interface ShowcaseAddition {
  id: string;
  title: string;
  category: Exclude<CategoryId, 'all'>;
  description: string;
  image_url: string;
}

export function useShowcaseItems(): GalleryItem[] {
  const [additions, setAdditions] = useState<ShowcaseAddition[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    const [{ data: adds }, { data: hidden }] = await Promise.all([
      supabase.from('showcase_additions').select('*').order('created_at', { ascending: false }),
      supabase.from('hidden_items').select('item_id').eq('content_type', 'showcase'),
    ]);
    setAdditions((adds ?? []) as ShowcaseAddition[]);
    setHiddenIds((hidden ?? []).map((h: { item_id: string }) => h.item_id));
  }, []);

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('showcase_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'showcase_additions' },
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
    ...galleryItems.filter(i => !hiddenIds.includes(String(i.id))),
    ...additions.map((a, idx) => ({
      id: 10000 + idx,
      title: a.title,
      category: a.category,
      description: a.description,
      image: a.image_url,
      icon: Camera,
    })),
  ];
}
