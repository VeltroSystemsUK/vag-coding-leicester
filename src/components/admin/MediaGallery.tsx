import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Upload, ImageIcon, Loader2, Check, Trash2, FolderOpen, Grid3X3, List as ListIcon, Search } from 'lucide-react';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';

export interface MediaItem {
  name: string;
  url: string;
  size: number;
  createdAt: string;
  path: string;
}

interface MediaGalleryProps {
  onSelect?: (url: string) => void;
  onClose?: () => void;
  /** If true, acts as a modal picker; if false, renders inline in admin tab */
  isModal?: boolean;
  /** Pre-selected image URL for highlighting */
  selectedUrl?: string;
}

export default function MediaGallery({
  onSelect,
  onClose,
  isModal = true,
  selectedUrl,
}: MediaGalleryProps) {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(selectedUrl ?? null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [uploadProgress, setUploadProgress] = useState<{ total: number; done: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const prefixes = ['products/', 'showcase/', 'media/', ''];
      const allItems: MediaItem[] = [];

      for (const prefix of prefixes) {
        const { data, error: listError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .list(prefix, { sortBy: { column: 'created_at', order: 'desc' } });

        if (listError) {
          console.error(`Error listing ${prefix}:`, listError);
          continue;
        }

        if (!data) continue;

        for (const item of data) {
          if (item.metadata) {
            const { data: urlData } = supabase.storage
              .from(STORAGE_BUCKET)
              .getPublicUrl(prefix + item.name);

            allItems.push({
              name: item.name,
              url: urlData.publicUrl,
              size: item.metadata.size ?? 0,
              createdAt: item.created_at ?? '',
              path: prefix + item.name,
            });
          }
        }
      }

      const { data: allFolders, error: folderError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list('', { sortBy: { column: 'created_at', order: 'desc' } });

      if (!folderError && allFolders) {
        for (const folder of allFolders) {
          if (folder.metadata) continue;
          const { data: folderData, error: fError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .list(folder.name + '/', { sortBy: { column: 'created_at', order: 'desc' } });
          if (fError || !folderData) continue;
          for (const item of folderData) {
            if (item.metadata) {
              const { data: urlData } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(folder.name + '/' + item.name);
              allItems.push({
                name: item.name,
                url: urlData.publicUrl,
                size: item.metadata.size ?? 0,
                createdAt: item.created_at ?? '',
                path: folder.name + '/' + item.name,
              });
            }
          }
        }
      }

      const unique = Array.from(
        new Map(allItems.map(i => [i.path, i])).values()
      );

      setImages(unique.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')));
    } catch (err: any) {
      setError(err.message || 'Failed to load media');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleBulkUpload = async (files: FileList) => {
    if (!files.length) return;
    setUploading(true);
    setUploadProgress({ total: files.length, done: 0 });

    const uploaded: string[] = [];
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const ext = file.name.split('.').pop() || 'jpg';
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fileName = `media/${Date.now()}_${i}_${cleanName}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          hasError = true;
        } else {
          uploaded.push(fileName);
        }
      } catch (e) {
        hasError = true;
      }

      setUploadProgress(prev => prev ? { ...prev, done: prev.done + 1 } : null);
    }

    setUploadProgress(null);
    setUploading(false);

    if (uploaded.length > 0) {
      await loadImages();
      if (onSelect && uploaded.length === 1) {
        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(uploaded[0]);
        onSelect(data.publicUrl);
      }
    }

    if (hasError) {
      setError('Some files failed to upload. Check console for details.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleBulkUpload(files);
    e.target.value = '';
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setDeleting(item.path);
    try {
      const { error: delError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([item.path]);
      if (delError) throw delError;
      setImages(prev => prev.filter(i => i.path !== item.path));
      if (selected === item.url) setSelected(null);
    } catch (err: any) {
      setError(err.message || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const handleSelect = (item: MediaItem) => {
    setSelected(item.url);
    if (onSelect) {
      onSelect(item.url);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredImages = search
    ? images.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : images;

  const content = (
    <div className={isModal ? 'flex flex-col h-full' : 'flex flex-col h-[calc(100vh-200px)]'}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-5 h-5 text-brand" />
          <h3 className="text-white font-bold text-lg">Media Gallery</h3>
          <span className="text-white/30 text-xs font-medium">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files..."
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-white/30 text-xs outline-none focus:border-brand w-48"
            />
          </div>

          <div className="flex bg-white/5 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-brand text-white' : 'text-white/40 hover:text-white'}`}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-brand text-white' : 'text-white/40 hover:text-white'}`}
              title="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-brand hover:bg-brand-accent disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {uploadProgress && (
        <div className="mb-4 bg-white/5 border border-brand/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-xs font-medium">
              Uploading... ({uploadProgress.done}/{uploadProgress.total})
            </span>
            <span className="text-brand text-xs font-bold">
              {Math.round((uploadProgress.done / uploadProgress.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div
              className="bg-brand h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(uploadProgress.done / uploadProgress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</p>
      )}

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white/30 gap-3">
          <ImageIcon className="w-12 h-12" />
          <span className="text-sm">{search ? 'No images match your search' : 'No images uploaded yet'}</span>
          {!search && (
            <button
              onClick={() => fileRef.current?.click()}
              className="text-brand text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Upload your first image
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredImages.map(item => (
              <div
                key={item.path}
                onClick={() => handleSelect(item)}
                className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                  selected === item.url || selectedUrl === item.url
                    ? 'border-brand shadow-lg shadow-brand/20'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="aspect-square bg-white/5">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {(selected === item.url || selectedUrl === item.url) && (
                  <div className="absolute inset-0 bg-brand/20 flex items-center justify-center">
                    <div className="bg-brand rounded-full p-2">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                    disabled={deleting === item.path}
                    className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
                  >
                    {deleting === item.path ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white/80 text-[10px] truncate">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-1">
          {filteredImages.map(item => (
            <div
              key={item.path}
              onClick={() => handleSelect(item)}
              className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selected === item.url || selectedUrl === item.url
                  ? 'bg-brand/20 border border-brand/50'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{item.name}</p>
                <p className="text-white/30 text-xs">
                  {formatSize(item.size)} • {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              {selected === item.url && (
                <Check className="w-5 h-5 text-brand shrink-0" />
              )}
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                disabled={deleting === item.path}
                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all shrink-0"
              >
                {deleting === item.path ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {isModal && onClose && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
          <span className="text-white/30 text-xs">
            {selected ? 'Image selected' : 'Click an image to select it'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 text-xs transition-colors"
            >
              Cancel
            </button>
            {onSelect && (
              <button
                onClick={() => { if (selected && onSelect) onSelect(selected); }}
                disabled={!selected}
                className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-accent disabled:opacity-50 text-white text-xs font-bold transition-colors"
              >
                <Check className="w-3.5 h-3.5 inline mr-1" />
                Select
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <h3 className="text-white font-bold">Media Gallery</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {content}
        </div>
      </div>
    );
  }

  return <div className="p-6">{content}</div>;
}
