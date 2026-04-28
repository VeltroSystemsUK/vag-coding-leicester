import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Car, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { compatibilityData } from '../data/compatibilityData';
import { cn } from '../lib/utils';

export default function CompatibilityChecker() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const brands = useMemo(() => compatibilityData.map(d => d.brand), []);
  
  const models = useMemo(() => {
    if (!selectedBrand) return [];
    return compatibilityData.find(d => d.brand === selectedBrand)?.models.map(m => m.name) || [];
  }, [selectedBrand]);

  const yearRanges = useMemo(() => {
    if (!selectedBrand || !selectedModel) return [];
    const brandData = compatibilityData.find(d => d.brand === selectedBrand);
    const modelData = brandData?.models.find(m => m.name === selectedModel);
    return modelData?.years || [];
  }, [selectedBrand, selectedModel]);

  const activeYearData = useMemo(() => {
    return yearRanges.find(y => y.range === selectedYear);
  }, [yearRanges, selectedYear]);

  const reset = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto" id="compatibility-tool">
      <div className="glass-dark p-8 md:p-12 rounded-[2rem] border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Search size={200} />
        </div>

        <div className="relative z-10">
          <div className="mb-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-tighter">
              Compatibility <span className="text-brand">Checker</span>
            </h3>
            <p className="text-white/50">Select your vehicle details to see likely compatible upgrades and coding options.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Brand Select */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">1. Select Brand</label>
              <div className="grid grid-cols-2 gap-2">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel(null);
                      setSelectedYear(null);
                    }}
                    className={cn(
                      "py-3 px-4 rounded-xl border text-sm font-bold transition-all",
                      selectedBrand === brand 
                        ? "bg-brand border-brand text-white shadow-lg shadow-brand/20" 
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    )}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Select */}
            <div className={cn("space-y-2 transition-opacity", !selectedBrand && "opacity-20 pointer-events-none")}>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">2. Select Model</label>
              <select
                value={selectedModel || ''}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setSelectedYear(null);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand transition-colors appearance-none text-sm font-bold"
              >
                <option value="" className="bg-dark">Choose Model</option>
                {models.map(model => (
                  <option key={model} value={model} className="bg-dark">{model}</option>
                ))}
              </select>
            </div>

            {/* Year/Platform Select */}
            <div className={cn("space-y-2 transition-opacity", !selectedModel && "opacity-20 pointer-events-none")}>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">3. Select Year/Platform</label>
              <select
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand transition-colors appearance-none text-sm font-bold"
              >
                <option value="" className="bg-dark">Choose Year Range</option>
                {yearRanges.map(y => (
                  <option key={y.range} value={y.range} className="bg-dark">{y.range}</option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeYearData ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between p-4 bg-brand/10 border border-brand/20 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
                      <Car className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{selectedBrand} {selectedModel}</h4>
                      <p className="text-xs text-brand font-bold uppercase tracking-widest">Platform: {activeYearData.platform}</p>
                    </div>
                  </div>
                  <button onClick={reset} className="text-xs text-white/40 hover:text-white underline">Clear</button>
                </div>

                <div>
                  <h5 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
                    <ChevronRight className="text-brand w-4 h-4" />
                    Compatible Upgrades
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeYearData.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-4 glass border-white/5 rounded-xl"
                      >
                        <CheckCircle2 className="text-brand w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium text-white/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                  <AlertCircle className="text-brand w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-bold mb-1">Important Note</p>
                    <p className="text-xs text-white/50 leading-relaxed">
                      This list is based on common configurations for the {activeYearData.platform} platform. Actual compatibility depends on your specific head unit version and module hardware. We verify every vehicle via VIN before booking.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center flex-col items-center gap-4">
                  <a href="/contact" className="btn-primary flex items-center gap-2">
                    Book This Upgrade
                    <ChevronRight size={18} />
                  </a>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">
                    Reference: {activeYearData.platform} Platform Standard Features
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-white/20">
                <Car size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium tracking-widest uppercase mb-2">Awaiting vehicle selection...</p>
                <Link to="/contact" className="text-xs text-brand hover:underline font-bold">Can't find your car? Contact us for a manual check</Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
