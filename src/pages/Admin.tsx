import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogOut, ShoppingBag, Camera, Loader2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';
import ShopManager from '../components/admin/ShopManager';
import ShowcaseManager from '../components/admin/ShowcaseManager';
import Logo from '../components/Logo';

type Tab = 'shop' | 'showcase';

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [signing, setSigning] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('shop');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setSigning(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    if (error) setError('Incorrect password. Please try again.');
    setSigning(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  // ─── Login ──────────────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 flex justify-center">
            {/* Force dark background on logo in this always-dark admin page */}
            <div className="bg-black rounded-xl overflow-hidden p-1">
              <Logo className="h-14" />
            </div>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <h1 className="text-xl font-bold text-white mb-1">Admin Access</h1>
            <p className="text-white/40 text-sm mb-8">Enter your admin password to continue.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Password"
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-brand transition-colors pr-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-xs"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={signing || !password}
                className="w-full bg-brand hover:bg-brand-accent disabled:opacity-40 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {signing && <Loader2 className="w-4 h-4 animate-spin" />}
                Sign In
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-black rounded-xl overflow-hidden p-0.5">
            <Logo className="h-9" />
          </div>
          <div className="border-l border-white/10 pl-4">
            <p className="text-white font-bold text-sm leading-none mb-0.5">Admin Panel</p>
            <p className="text-white/30 text-xs">VAG Coding Leicester</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-1.5 text-white/30 hover:text-white/70 text-xs uppercase tracking-widest transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/30 hover:text-red-400 text-xs uppercase tracking-widest transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="border-b border-white/[0.06] px-6 flex gap-1">
        {([
          { id: 'shop'     as Tab, label: 'Shop',     Icon: ShoppingBag },
          { id: 'showcase' as Tab, label: 'Showcase',  Icon: Camera      },
        ]).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 py-4 px-2 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === id
                ? 'border-brand text-brand'
                : 'border-transparent text-white/30 hover:text-white/60'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'shop' ? <ShopManager /> : <ShowcaseManager />}
      </div>
    </div>
  );
}
