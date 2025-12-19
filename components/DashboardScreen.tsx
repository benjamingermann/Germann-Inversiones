
import React, { useState } from 'react';
import { Asset, MarketRate } from '../types';
import { MARKET_RATES, NEWS_ITEMS } from '../constants';

interface DashboardScreenProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAddMoney: () => void;
  onOperate: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ assets, onAssetClick }) => {
  const [activeTab, setActiveTab] = useState<'Consolidado' | 'EE. UU.' | 'Argentina'>('Consolidado');
  
  const totalValue = assets.reduce((sum, asset) => sum + (asset.price * asset.quantity), 0);
  const totalChange = 5.12; 

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 lg:pb-12 pt-4 lg:pt-8">
      {/* Header simplificado para desktop */}
      <header className="px-4 lg:px-0 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Resumen General</h2>
          <h1 className="text-3xl lg:text-4xl font-black text-white">Hola, Germán</h1>
        </div>
        <div className="hidden lg:flex items-center gap-4 bg-surface-dark p-2 rounded-2xl border border-white/5">
          <div className="text-right px-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Mercado Abierto</p>
            <p className="text-xs font-bold text-primary">Sincronizado</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">schedule</span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-0">
        
        {/* COLUMNA IZQUIERDA: Balance y Gráfico */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Balance */}
            <section className="bg-surface-dark p-8 rounded-[2rem] border border-white/5 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
              </div>
              <span className="text-xs font-bold text-primary mb-2 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Patrimonio Total
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white tabular-nums mb-4">
                u$s {totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </h2>
              <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                +$1,203 (+{totalChange}%)
              </div>
            </section>

            {/* Banner Ahora Play */}
            <section 
              onClick={() => window.open('https://www.youtube.com/@Ahora_Play', '_blank')}
              className="bg-gradient-to-br from-red-600 to-red-900 p-8 rounded-[2rem] flex flex-col justify-between cursor-pointer group shadow-xl shadow-red-900/20"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <img src="https://yt3.googleusercontent.com/ytc/AIdro_n_1768E5q9q9n9q9n9q9n9q9n9q9n9q9n9q=s176-c-k-c0x00ffffff-no-rj" className="w-8 h-8 object-contain" alt="Play" />
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">En Vivo</div>
              </div>
              <div>
                <h3 className="text-white text-xl font-black mb-1">Ahora Play</h3>
                <p className="text-white/70 text-sm font-medium">Sigue el mercado en directo</p>
              </div>
            </section>
          </div>

          {/* Listado de Activos */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Mis Activos</h3>
              <div className="flex bg-surface-dark p-1 rounded-xl">
                {['Todos', 'Acciones', 'CEDEARs'].map(f => (
                  <button key={f} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${f === 'Todos' ? 'bg-primary text-background-dark' : 'text-gray-500 hover:text-white'}`}>{f}</button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => onAssetClick(asset)}
                  className="flex items-center justify-between p-5 bg-surface-dark rounded-[1.5rem] border border-white/5 hover:border-primary/40 transition-all cursor-pointer group hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-inner">
                      <img src={asset.logo || 'https://via.placeholder.com/40'} className="h-full w-full object-contain" alt="" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg leading-tight">{asset.symbol}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white tabular-nums">{asset.market === 'US' ? 'u$s' : '$'} {asset.price.toLocaleString('es-AR')}</p>
                    <span className={`text-[10px] font-bold ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
                      {asset.change > 0 ? '▲' : '▼'} {Math.abs(asset.change).toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: Mercado y Noticias */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Cotizaciones Dólar */}
          <section className="bg-surface-dark/50 p-6 rounded-[2rem] border border-white/5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Mercado Cambiario</h3>
            <div className="flex flex-col gap-4">
              {MARKET_RATES.map((rate, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-background-dark/50 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-sm ${rate.color}`}>{rate.icon}</span>
                    <span className="text-xs font-bold">{rate.name}</span>
                  </div>
                  <p className="font-bold text-white">${rate.sell}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Noticias Investing */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Investing.com</h3>
              <button onClick={() => window.open('https://es.investing.com/','_blank')} className="text-primary text-[10px] font-bold">VER TODO</button>
            </div>
            <div className="flex flex-col gap-4">
              {NEWS_ITEMS.map(news => (
                <div 
                  key={news.id} 
                  onClick={() => window.open('https://es.investing.com/','_blank')}
                  className="flex gap-4 p-4 bg-surface-dark/30 rounded-2xl border border-white/5 hover:bg-surface-dark transition-colors cursor-pointer group"
                >
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-sky-400 uppercase mb-1">{news.time}</p>
                    <h4 className="text-sm font-bold leading-snug text-white group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                  </div>
                  <img src={news.imageUrl} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
