import React from 'react';
import { Store, Users, BarChart3, Moon, Sun, ScanLine, Home, Settings } from 'lucide-react';
import { Tab } from '../types';
import { APP_LOGO } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  isDarkMode,
  toggleTheme,
  onLogout
}) => {
  
  const NavItem = ({ tab, icon: Icon, label }: { tab: Tab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors relative ${
        activeTab === tab
          ? 'text-primary-600 dark:text-primary-400'
          : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
      }`}
    >
      <div className={`p-1 rounded-full transition-all ${activeTab === tab ? 'bg-primary-50 dark:bg-primary-900/30 transform -translate-y-1' : ''}`}>
        <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-medium mt-0.5 ${activeTab === tab ? 'font-bold' : ''}`}>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
      {/* Top App Bar - Added pt-safe for iOS Notch */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-slate-800 z-40 px-4 flex items-center justify-between shadow-sm pt-[env(safe-area-inset-top)] h-[calc(4rem+env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
          <img src={APP_LOGO} alt="Logo" className="w-12 h-12 rounded-xl object-contain" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Cuentas Claras</h1>
        </div>
        <div className="flex items-center gap-2">
            <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
      </header>

      {/* Main Content Area - Added top padding to account for safe-area header */}
      {/* Added pb-safe for iOS Home Indicator */}
      <main className="pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(7rem+env(safe-area-inset-bottom))] px-4 min-h-screen w-full max-w-lg mx-auto">
        {children}
      </main>

      {/* Bottom Navigation Bar - Added pb-safe for iOS Home Indicator */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-slate-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <NavItem tab={Tab.DASHBOARD} icon={Home} label="Inicio" />
          <NavItem tab={Tab.CUSTOMERS} icon={Users} label="Clientes" />
          <NavItem tab={Tab.DIGITIZE} icon={ScanLine} label="Escanear" />
          <NavItem tab={Tab.REPORTS} icon={BarChart3} label="Reportes" />
          <NavItem tab={Tab.SETTINGS} icon={Settings} label="Perfil" />
        </div>
      </nav>
    </div>
  );
};