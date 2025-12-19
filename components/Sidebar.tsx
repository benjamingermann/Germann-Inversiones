
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-surface-dark border-r border-white/5 p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-background-dark">
          <span className="material-symbols-outlined filled">candlestick_chart</span>
        </div>
        <span className="font-bold text-lg tracking-tight">Germann Inv.</span>
      </div>

      <nav className="flex flex-col gap-2">
        <SidebarItem icon="pie_chart" label="Mi Cartera" active />
        <SidebarItem icon="monitoring" label="Mercados" />
        <SidebarItem icon="news" label="Noticias" />
        <SidebarItem icon="settings" label="Ajustes" />
      </nav>

      <div className="mt-auto">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[10px] font-bold text-primary uppercase mb-2">Soporte VIP</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">¿Necesitas ayuda con tu estrategia?</p>
          <button className="w-full py-2 bg-primary text-background-dark rounded-lg text-xs font-bold">Hablar con IA</button>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary text-background-dark font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
    <span className={`material-symbols-outlined ${active ? 'filled' : ''}`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

export default Sidebar;
