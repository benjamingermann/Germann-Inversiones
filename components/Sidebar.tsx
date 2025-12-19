
import React from 'react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-surface-dark border-r border-white/5 p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-background-dark">
          <span className="material-symbols-outlined filled">candlestick_chart</span>
        </div>
        <span className="font-bold text-lg tracking-tight">Germann Inv.</span>
      </div>

      <nav className="flex flex-col gap-2">
        <button 
          onClick={() => onNavigate('DASHBOARD')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL' ? 'bg-primary text-background-dark font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
        >
          <span className={`material-symbols-outlined ${(currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') ? 'filled' : ''}`}>pie_chart</span>
          <span className="text-sm">Mi Cartera</span>
        </button>
        <button 
          onClick={() => onNavigate('MARKETS')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentScreen === 'MARKETS' ? 'bg-primary text-background-dark font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
        >
          <span className={`material-symbols-outlined ${currentScreen === 'MARKETS' ? 'filled' : ''}`}>monitoring</span>
          <span className="text-sm">Mercados</span>
        </button>
        <SidebarItem icon="news" label="Noticias" />
        <SidebarItem icon="settings" label="Ajustes" />
      </nav>

      <div className="mt-auto">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[10px] font-bold text-primary uppercase mb-2">Soporte VIP</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">¿Necesitas ayuda con tu estrategia?</p>
          <button className="w-full py-2 bg-primary text-background-dark rounded-lg text-xs font-bold hover:scale-[1.02] transition-transform">Hablar con IA</button>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label }: { icon: string, label: string }) => (
  <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
    <span className="material-symbols-outlined">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

export default Sidebar;
