import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface BusinessSettings {
  businessName: string;
  logoUrl: string;
  darkMode: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  lightMode: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  address: string;
  telephone: string;
  telephoneEnabled: boolean;
  email: string;
}

interface AdminSettings {
  promoBanners: {
    carPlay: { active: boolean; title: string; subtitle: string };
    japaneseEu: { active: boolean; title: string; subtitle: string };
  };
  popupBanner: {
    active: boolean;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    expiryDate: string;
  };
  installationSettings: {
    mobileWithin100: string;
    mobileOver100: string;
    garage: string;
    installationRequired: boolean;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    featured: boolean;
    icon: string;
  }>;
  business: BusinessSettings;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  user: AdminUser | null;
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  updatePromoBanner: (key: 'carPlay' | 'japaneseEu', data: Partial<AdminSettings['promoBanners']['carPlay']>) => void;
  togglePromoBanner: (key: 'carPlay' | 'japaneseEu') => void;
  updateService: (id: string, data: Partial<AdminSettings['services'][0]>) => void;
  addService: (service: Omit<AdminSettings['services'][0], 'id'>) => void;
  deleteService: (id: string) => void;
  updatePopupBanner: (data: Partial<AdminSettings['popupBanner']>) => void;
  updateInstallationSettings: (data: Partial<AdminSettings['installationSettings']>) => void;
  updateBusinessSettings: (data: Partial<BusinessSettings>) => void;
  // User management
  fetchUsers: () => Promise<AdminUser[]>;
  addUser: (email: string, password: string, name: string) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  changePassword: (id: string, newPassword: string) => Promise<boolean>;
}

const defaultSettings: AdminSettings = {
  business: {
    businessName: 'VAG Coding Leicester',
    logoUrl: '',
    darkMode: {
      primaryColor: '#E30B18',
      accentColor: '#E30B18',
      backgroundColor: '#050505',
      textColor: '#FFFFFF',
    },
    lightMode: {
      primaryColor: '#E30B18',
      accentColor: '#c00915',
      backgroundColor: '#FFFFFF',
      textColor: '#111111',
    },
    address: '',
    telephone: '',
    telephoneEnabled: true,
    email: '',
  },
  promoBanners: {
    carPlay: { active: true, title: 'Apple CarPlay & Android Auto', subtitle: 'Most Popular Service' },
    japaneseEu: { active: true, title: 'Japanese to EU Radio Conversions', subtitle: 'Specialist Service' },
  },
  popupBanner: {
    active: false,
    title: 'Special Offer!',
    subtitle: 'Get 20% off CarPlay activation this month',
    ctaText: 'Book Now',
    ctaLink: '/contact',
    backgroundImage: '',
    expiryDate: '',
  },
  installationSettings: {
    mobileWithin100: '50.00',
    mobileOver100: '100.00',
    garage: '25.00',
    installationRequired: true,
  },
  services: [
    { id: '1', title: 'Apple CarPlay / Android Auto', description: 'Full activation of Apple CarPlay and Android Auto for MIB2 and MIB3 head units. Wireless options available.', featured: true, icon: 'Radio' },
    { id: '2', title: 'Satellite Navigation Updates', description: 'Latest map updates and navigation system activations.', featured: true, icon: 'MapPin' },
    { id: '3', title: 'Dealer Level Diagnostics', description: 'Professional-grade vehicle health checks.', featured: true, icon: 'Activity' },
    { id: '4', title: 'Wiring & Soldering', description: 'Expert automotive wiring and soldering services.', featured: true, icon: 'Zap' },
    { id: '5', title: 'Vehicle Health Checks', description: 'Comprehensive pre-purchase inspections.', featured: true, icon: 'ClipboardCheck' },
    { id: '6', title: 'Car Buying Advice', description: 'Professional guidance when buying your next VAG vehicle.', featured: true, icon: 'Car' },
    { id: '7', title: 'ECU Remapping', description: 'Performance remapping for improved power and torque.', featured: true, icon: 'Gauge' },
    { id: '8', title: 'Fully Mobile Service', description: 'We come to you — home, work or anywhere.', featured: true, icon: 'Truck' },
    { id: '9', title: 'Japanese to EU Radio Conversions', description: 'Convert Japanese-market head units to EU specification.', featured: true, icon: 'Globe' },
    { id: '10', title: 'MIB2 & MIB2.5 Screen Upgrades', description: 'Upgrade your older screen to high-resolution glass displays.', featured: false, icon: 'Monitor' },
    { id: '11', title: 'Virtual Cockpit Retrofits', description: 'Genuine digital instrument cluster retrofits.', featured: false, icon: 'Cpu' },
    { id: '12', title: 'Reverse Camera Installation', description: 'High-line reverse cameras with dynamic guidelines.', featured: false, icon: 'Camera' },
    { id: '13', title: 'OEM Coding Activations', description: 'Unlock hidden features.', featured: false, icon: 'Shield' },
  ],
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEY = 'vag_admin_settings';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<AdminSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return {
            ...defaultSettings,
            ...parsed,
            business: { ...defaultSettings.business, ...(parsed.business || {}) },
            promoBanners: { ...defaultSettings.promoBanners, ...(parsed.promoBanners || {}) },
            popupBanner: { ...defaultSettings.popupBanner, ...(parsed.popupBanner || {}) },
            installationSettings: { ...defaultSettings.installationSettings, ...(parsed.installationSettings || {}) },
          };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  // Prevent the initial DB load from immediately triggering a save back to DB
  const isLoadingFromDb = useRef(true);
  const dbSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load settings from Supabase on startup (for all visitors)
  useEffect(() => {
    const loadFromDb = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('settings')
          .eq('id', 1)
          .single();
        if (!error && data?.settings && Object.keys(data.settings).length > 0) {
          const remote = data.settings as Partial<AdminSettings>;
          setSettings(prev => ({
            ...defaultSettings,
            ...prev,
            ...remote,
            business: { ...defaultSettings.business, ...prev.business, ...(remote.business || {}) },
            promoBanners: {
              ...defaultSettings.promoBanners,
              ...prev.promoBanners,
              ...(remote.promoBanners || {}),
            },
            popupBanner: { ...defaultSettings.popupBanner, ...prev.popupBanner, ...(remote.popupBanner || {}) },
            installationSettings: {
              ...defaultSettings.installationSettings,
              ...prev.installationSettings,
              ...(remote.installationSettings || {}),
            },
            services: remote.services ?? prev.services,
          }));
        }
      } catch {
        // Supabase unavailable — fall back to localStorage
      } finally {
        // Allow one render cycle before enabling saves, so the DB load itself doesn't trigger a write
        requestAnimationFrame(() => { isLoadingFromDb.current = false; });
      }
    };
    loadFromDb();
  }, []);

  // Persist settings: localStorage always, Supabase (debounced) when authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
    if (isAuthenticated && !isLoadingFromDb.current) {
      if (dbSaveTimer.current) clearTimeout(dbSaveTimer.current);
      dbSaveTimer.current = setTimeout(() => {
        supabase
          .from('site_settings')
          .upsert({ id: 1, settings, updated_at: new Date().toISOString() }, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) console.error('Failed to save settings to Supabase:', error);
          });
      }, 800);
    }
    return () => {
      if (dbSaveTimer.current) clearTimeout(dbSaveTimer.current);
    };
  }, [settings, isAuthenticated]);

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        setIsAuthenticated(true);
        setCurrentUser({ id: data.user.id, email: data.user.email!, name: '' });
        sessionStorage.setItem('vag_admin_auth', 'true');
        return true;
      }
      return false;
    } catch {
      // Fallback to legacy credential check if Supabase unavailable
      if (email === 'admin@vagleicester.co.uk' && password === 'VAGLeicester2024!') {
        setIsAuthenticated(true);
        setCurrentUser({ id: 'legacy-admin', email: 'admin@vagleicester.co.uk', name: 'Admin' });
        sessionStorage.setItem('vag_admin_auth', 'true');
        return true;
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore errors during logout
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('vag_admin_auth');
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updatePromoBanner = (key: 'carPlay' | 'japaneseEu', data: Partial<AdminSettings['promoBanners']['carPlay']>) => {
    setSettings(prev => ({
      ...prev,
      promoBanners: {
        ...prev.promoBanners,
        [key]: { ...prev.promoBanners[key], ...data },
      },
    }));
  };

  const togglePromoBanner = (key: 'carPlay' | 'japaneseEu') => {
    setSettings(prev => ({
      ...prev,
      promoBanners: {
        ...prev.promoBanners,
        [key]: { ...prev.promoBanners[key], active: !prev.promoBanners[key].active },
      },
    }));
  };

  const updateService = (id: string, data: Partial<AdminSettings['services'][0]>) => {
    setSettings(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...data } : s),
    }));
  };

  const addService = (service: Omit<AdminSettings['services'][0], 'id'>) => {
    const newId = String(Date.now());
    setSettings(prev => ({
      ...prev,
      services: [...prev.services, { ...service, id: newId }],
    }));
  };

  const deleteService = (id: string) => {
    setSettings(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id),
    }));
  };

  const updatePopupBanner = (data: Partial<AdminSettings['popupBanner']>) => {
    setSettings(prev => ({
      ...prev,
      popupBanner: { ...prev.popupBanner, ...data },
    }));
  };

  const updateInstallationSettings = (data: Partial<AdminSettings['installationSettings']>) => {
    setSettings(prev => ({
      ...prev,
      installationSettings: { ...prev.installationSettings, ...data },
    }));
  };

  const updateBusinessSettings = (data: Partial<BusinessSettings>) => {
    setSettings(prev => ({
      ...prev,
      business: { ...prev.business, ...data },
    }));
  };

  const fetchUsers = async (): Promise<AdminUser[]> => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch {
      return [];
    }
  };

  const addUser = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (error) throw error;
      
      if (data.user) {
        // Add to admin_users table
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert({ id: data.user.id, email, name });
        if (insertError) throw insertError;
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding user:', err);
      return false;
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      // Delete from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) throw authError;
      
      // Delete from admin_users table
      const { error: tableError } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
      if (tableError) throw tableError;
      
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      return false;
    }
  };

  const changePassword = async (id: string, newPassword: string): Promise<boolean> => {
    try {
      // Use the admin API properly
      const { error } = await supabase.auth.admin.updateUserById(id, { password: newPassword });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error changing password:', err);
      return false;
    }
  };

  useEffect(() => {
    const auth = sessionStorage.getItem('vag_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      user: currentUser,
      settings,
      updateSettings,
      updatePromoBanner,
      togglePromoBanner,
      updateService,
      addService,
      deleteService,
      updatePopupBanner,
      updateInstallationSettings,
      updateBusinessSettings,
      fetchUsers,
      addUser,
      deleteUser,
      changePassword,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
