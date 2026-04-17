import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminSettings {
  promoBanners: {
    carPlay: { active: boolean; title: string; subtitle: string };
    japaneseEu: { active: boolean; title: string; subtitle: string };
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    featured: boolean;
    icon: string;
  }>;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  updatePromoBanner: (key: 'carPlay' | 'japaneseEu', data: Partial<AdminSettings['promoBanners']['carPlay']>) => void;
  togglePromoBanner: (key: 'carPlay' | 'japaneseEu') => void;
  updateService: (id: string, data: Partial<AdminSettings['services'][0]>) => void;
}

const defaultSettings: AdminSettings = {
  promoBanners: {
    carPlay: { active: true, title: 'Apple CarPlay & Android Auto', subtitle: 'Most Popular Service' },
    japaneseEu: { active: true, title: 'Japanese to EU Radio Conversions', subtitle: 'Specialist Service' },
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

const ADMIN_CREDENTIALS = {
  email: 'admin@vagleicester.co.uk',
  password: 'VAGLeicester2024!',
};

const STORAGE_KEY = 'vag_admin_settings';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<AdminSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem('vag_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
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
      settings,
      updateSettings,
      updatePromoBanner,
      togglePromoBanner,
      updateService,
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
