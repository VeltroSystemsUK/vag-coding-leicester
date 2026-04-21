import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { X, Crop, Eraser, Wand2, Type, Download, RotateCw, FlipHorizontal, FlipVertical, Save } from 'lucide-react';

interface ImageEditorProps {
  image: string;
  onSave: (editedImage: string) => void;
  onCancel: () => void;
}

export default function ImageEditor({ image, onSave, onCancel }: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [mode, setMode] = useState<'crop' | 'erase' | 'background' | 'text'>('crop');
  const [textOverlay, setTextOverlay] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(24);
  const [isProcessing, setIsProcessing] = useState(false);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    if (!croppedAreaPixels || !image) return null;
    
    const imageElem = document.createElement('img');
    imageElem.src = image;
    
    await new Promise((resolve) => {
      imageElem.onload = resolve;
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    const rotRad = (rotation * Math.PI) / 180;
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      imageElem.width,
      imageElem.height,
      rotation
    );
    
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;
    
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.translate(-imageElem.width / 2, -imageElem.height / 2);
    
    ctx.drawImage(imageElem, 0, 0);
    
    const data = ctx.getImageData(
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    ctx.putImageData(data, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      let finalImage = editedImage || image;
      
      // If crop mode, get cropped image
      if (mode === 'crop' && croppedAreaPixels) {
        const cropped = await getCroppedImg();
        if (cropped) finalImage = cropped;
      }
      
      // If text mode, add text overlay
      if (mode === 'text' && textOverlay) {
        finalImage = await addTextToImage(finalImage);
      }
      
      onSave(finalImage);
    } catch (err) {
      console.error('Error saving image:', err);
    }
    setIsProcessing(false);
  };

  const addTextToImage = async (imgSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(imgSrc);
        
        ctx.drawImage(img, 0, 0);
        ctx.font = `bold ${textSize}px Arial`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        const x = (textPosition.x / 100) * img.width;
        const y = (textPosition.y / 100) * img.height;
        ctx.strokeText(textOverlay, x, y);
        ctx.fillText(textOverlay, x, y);
        
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = imgSrc;
    });
  };

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const imglyModule = require('@imgly/background-removal');
      const removeBackground = imglyModule.removeBackground;
      
      const result = await removeBackground(image, {
        progress: (key: string, current: number, total: number) => {
          console.log(`Removing background: ${Math.round((current / total) * 100)}%`);
        }
      });
      
      // Convert blob to data URL
      const response = await fetch(result);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        setEditedImage(reader.result as string);
        setShowCanvas(true);
        setIsProcessing(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Background removal failed:', err);
      alert('Background removal failed. Please try again.');
      setIsProcessing(false);
    }
  };

  // Erase functionality - simple brush that reveals transparent
  const handleErase = () => {
    setMode('erase');
    alert('Erase mode: Click and drag on the image to erase areas. (This will be implemented with canvas drawing)');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-bold">Image Editor</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('crop')}
              className={`p-2 rounded-lg flex items-center gap-2 ${mode === 'crop' ? 'bg-brand text-white' : 'bg-white/10 text-white/60 hover:text-white'}`}
            >
              <Crop className="w-4 h-4" />
              <span className="text-xs">Crop</span>
            </button>
            <button
              onClick={handleErase}
              className={`p-2 rounded-lg flex items-center gap-2 ${mode === 'erase' ? 'bg-brand text-white' : 'bg-white/10 text-white/60 hover:text-white'}`}
            >
              <Eraser className="w-4 h-4" />
              <span className="text-xs">Erase</span>
            </button>
            <button
              onClick={handleRemoveBackground}
              disabled={isProcessing}
              className="p-2 rounded-lg flex items-center gap-2 bg-white/10 text-white/60 hover:text-white disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" />
              <span className="text-xs">Remove BG</span>
            </button>
            <button
              onClick={() => setMode('text')}
              className={`p-2 rounded-lg flex items-center gap-2 ${mode === 'text' ? 'bg-brand text-white' : 'bg-white/10 text-white/60 hover:text-white'}`}
            >
              <Type className="w-4 h-4" />
              <span className="text-xs">Add Text</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={onCancel} className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 relative overflow-hidden">
        {mode === 'crop' ? (
          <div className="absolute inset-0">
            <Cropper
              image={editedImage || image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid
            />
          </div>
        ) : mode === 'text' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={editedImage || image} 
              alt="Edit" 
              className="max-w-full max-h-full object-contain"
              style={{ transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` }}
            />
          </div>
        ) : mode === 'erase' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <img 
              src={editedImage || image} 
              alt="Erase" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {isProcessing ? (
              <div className="text-white text-xl">Processing...</div>
            ) : editedImage ? (
              <img src={editedImage} alt="Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <img src={image} alt="Original" className="max-w-full max-h-full object-contain" />
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-white/10 space-y-4">
        {mode === 'crop' && (
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-xs">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-white/60 text-xs">Rotate</span>
            <input
              type="range"
              min={0}
              max={360}
              step={90}
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-24"
            />
            <button
              onClick={() => setRotation(r => r + 90)}
              className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFlipH(f => !f)}
              className={`p-2 rounded-lg ${flipH ? 'bg-brand' : 'bg-white/10'} text-white`}
            >
              <FlipHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFlipV(f => !f)}
              className={`p-2 rounded-lg ${flipV ? 'bg-brand' : 'bg-white/10'} text-white`}
            >
              <FlipVertical className="w-4 h-4" />
            </button>
          </div>
        )}

        {mode === 'text' && (
          <div className="flex items-center gap-4 flex-wrap">
            <input
              type="text"
              value={textOverlay}
              onChange={(e) => setTextOverlay(e.target.value)}
              placeholder="Enter text..."
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm flex-1"
            />
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="range"
              min={12}
              max={72}
              value={textSize}
              onChange={(e) => setTextSize(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="text-white/60 text-xs">Position X</span>
            <input
              type="range"
              min={0}
              max={100}
              value={textPosition.x}
              onChange={(e) => setTextPosition(p => ({ ...p, x: parseInt(e.target.value) }))}
              className="w-24"
            />
            <span className="text-white/60 text-xs">Position Y</span>
            <input
              type="range"
              min={0}
              max={100}
              value={textPosition.y}
              onChange={(e) => setTextPosition(p => ({ ...p, y: parseInt(e.target.value) }))}
              className="w-24"
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-white/10 text-white/60 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="px-6 py-2 rounded-lg bg-brand text-white font-bold flex items-center gap-2"
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}