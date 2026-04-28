import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { LogOut, ShoppingBag, Camera, Loader2, Eye, EyeOff, ExternalLink, Wrench, Sparkles, Users, Settings, Building2, FolderOpen } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ShopManager from '../components/admin/ShopManager';
import ShowcaseManager from '../components/admin/ShowcaseManager';
import ServicesManager from '../components/admin/ServicesManager';
import PopupBannerManager from '../components/admin/PopupBannerManager';
import UsersManager from '../components/admin/UsersManager';
import InstallationSettingsManager from '../components/admin/InstallationSettingsManager';
import BusinessManager from '../components/admin/BusinessManager';
import MediaGallery from '../components/admin/MediaGallery';
import Logo from '../components/Logo';

type Tab = 'business' | 'shop' | 'showcase' | 'services' | 'popup' | 'users' | 'install' | 'media';

export default function Admin() {
  const { isAuthenticated, login, logout } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [signing, setSigning] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('business');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSigning(true);
    setError('');
    const success = await login(email, password);
    if (!success) setError('Invalid email or password. Please try again.');
    setSigning(false);
  };

  const handleLogout = () => logout();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 flex justify-center">
            <div className="bg-black rounded-xl overflow-hidden p-1">
              <Logo className="h-16" />
            </div>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <h1 className="text-xl font-bold text-white mb-1">Admin Access</h1>
            <p className="text-white/40 text-sm mb-8">Enter your credentials to continue.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Email address"
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-brand transition-colors text-sm"
              />
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-brand transition-colors pr-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
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
                disabled={signing || !email || !password}
                className="w-full bg-[#E30B18] hover:bg-[#c00915] disabled:opacity-40 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
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

  const tabs: { id: Tab; label: string; Icon: typeof ShoppingBag }[] = [
    { id: 'business', label: 'Business', Icon: Building2 },
    { id: 'shop', label: 'Shop', Icon: ShoppingBag },
    { id: 'showcase', label: 'Showcase', Icon: Camera },
    { id: 'services', label: 'Services', Icon: Wrench },
    { id: 'install', label: 'Install', Icon: Settings },
    { id: 'media', label: 'Media', Icon: FolderOpen },
    { id: 'popup', label: 'Popup', Icon: Sparkles },
    { id: 'users', label: 'Users', Icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-black rounded-xl overflow-hidden p-0.5">
            <Logo className="h-12" />
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

      <div className="border-b border-white/[0.06] px-6 flex gap-1 overflow-x-auto">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 py-4 px-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
              activeTab === id
                ? 'border-[#E30B18] text-[#E30B18]'
                : 'border-transparent text-white/30 hover:text-white/60'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'business' && <BusinessManager />}
        {activeTab === 'shop' && <ShopManager />}
        {activeTab === 'showcase' && <ShowcaseManager />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab === 'install' && <InstallationSettingsManager />}
        {activeTab === 'media' && <MediaGallery isModal={false} />}
        {activeTab === 'popup' && <PopupBannerManager />}
        {activeTab === 'users' && <UsersManager />}
      </div>
    </div>
  );
}