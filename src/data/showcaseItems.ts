import type { LucideIcon } from 'lucide-react';

export type CategoryId = 'all' | 'retrofit' | 'coding' | 'camera' | 'screen' | 'exterior';

export interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<CategoryId, 'all'>;
  image: string;
  description: string;
  icon: LucideIcon;
}

export const categories: { id: CategoryId; name: string }[] = [
  { id: 'all',      name: 'All Work'  },
  { id: 'retrofit', name: 'Retrofits' },
  { id: 'coding',   name: 'Coding'    },
  { id: 'camera',   name: 'Cameras'   },
  { id: 'screen',   name: 'Screens'   },
  { id: 'exterior', name: 'Exterior'  },
];

export const galleryItems: GalleryItem[] = [];
