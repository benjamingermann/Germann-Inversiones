
import React, { useState, useEffect } from 'react';
import { Asset, MarketRate } from '../types';
import { MARKET_RATES, NEWS_ITEMS } from '../constants';

interface DashboardScreenProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAddMoney: () => void;
  onOperate: () => void;
}

const AssetIcon = ({ asset }: { asset: Asset }) => {
  const [error, setError] = useState(false);
  const initials = asset.symbol.substring(0, 2);

  if (error || !asset.logo) {
    return (
      <div className="h-12 w-12 bg-surface-highlight rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
        <span className="text-white font-bold text-sm tracking-tighter">{initials}</span>
      </div>
    );
  }

  return (
    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform duration-300">
      <img 
        src={asset.logo} 
        onError={() => setError(true)}
        className="h-full w-full object-contain" 
        alt={asset.symbol} 
      />
    </div>
  );
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ assets, onAssetClick }) => {
  const totalValue = assets.reduce((sum, asset) => sum + (asset.price * asset.quantity), 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 lg:pb-12 pt-4 lg:pt-8 animate-fade-in">
      {/* Header Desk / Mobile */}
      <header className="px-4 lg:px-0 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Mi Portafolio</h2>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Hola, Germán</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Estado</span>
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Mercado Abierto
            </span>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-white hover:bg-surface-highlight transition-colors">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-0">
        
        {/* COLUMNA IZQUIERDA: Balance y Activos */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Balance Pro */}
            <section className="bg-gradient-to-br from-surface-dark to-background-dark p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              
              <span className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Patrimonio Neto</span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-500">u$s</span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tabular-nums tracking-tighter">
                  {totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                Ganancia hoy: +2.45%
              </div>
            </section>

            {/* Acceso Directo Ahora Play */}
            <section 
              onClick={() => window.open('https://www.youtube.com/@Ahora_Play', '_blank')}
              className="relative overflow-hidden p-8 rounded-[2.5rem] flex flex-col justify-between cursor-pointer group shadow-xl bg-[#1a0505] border border-red-900/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent"></div>
              <div className="relative flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                  <img src="https://yt3.googleusercontent.com/ytc/AIdro_n_1768E5q9q9n9q9n9q9n9q9n9q9n9q9n9q=s176-c-k-c0x00ffffff-no-rj" className="w-8 h-8 object-contain" alt="Play" />
                </div>
                <div className="px-3 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest animate-pulse border border-red-400">EN VIVO</div>
              </div>
              <div className="relative mt-4">
                <h3 className="text-white text-xl font-black mb-1">Ahora Play</h3>
                <p className="text-gray-400 text-sm font-medium">Análisis de mercado con expertos</p>
              </div>
            </section>
          </div>

          {/* Listado de Activos Grid */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-white tracking-tight">Mis Activos</h3>
              <button className="text-primary text-xs font-bold hover:underline">Gestionar</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => onAssetClick(asset)}
                  className="flex items-center justify-between p-5 bg-surface-dark/40 rounded-[2rem] border border-white/5 hover:border-primary/40 hover:bg-surface-dark transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <AssetIcon asset={asset} />
                    <div>
                      <p className="font-black text-white text-lg leading-none mb-1">{asset.symbol}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter line-clamp-1 max-w-[120px]">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white tabular-nums tracking-tighter">
                      {asset.market === 'US' ? 'u$s' : '$'} {asset.price.toLocaleString('es-AR')}
                    </p>
                    <span className={`text-[10px] font-black flex items-center justify-end gap-1 ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
                      {asset.change > 0 ? '▲' : '▼'} {Math.abs(asset.change).toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: Mercado e Información */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Cotizaciones Dólar Pro */}
          <section className="bg-surface-dark/30 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 px-2">Mercado Cambiario</h3>
            <div className="flex flex-col gap-3">
              {MARKET_RATES.map((rate, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-background-dark/40 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center border border-white/5 ${rate.color}`}>
                      <span className="material-symbols-outlined text-[18px]">{rate.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-300">{rate.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white tabular-nums">${rate.sell}</p>
                    {rate.change && <p className="text-[9px] font-bold text-primary">+{rate.change}%</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Noticias Feed */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Última Hora</h3>
              <button className="text-primary text-[10px] font-black tracking-widest">VER MÁS</button>
            </div>
            <div className="flex flex-col gap-4">
              {NEWS_ITEMS.map(news => (
                <div 
                  key={news.id} 
                  onClick={() => window.open('https://es.investing.com/','_blank')}
                  className="flex gap-4 p-4 bg-surface-dark/20 rounded-2xl border border-white/5 hover:bg-surface-dark/40 transition-all cursor-pointer group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black text-sky-400 uppercase tracking-tighter">{news.source}</span>
                      <span className="text-[9px] font-bold text-gray-600">• {news.time}</span>
                    </div>
                    <h4 className="text-xs font-bold leading-relaxed text-gray-200 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                  </div>
                  <img src={news.imageUrl} className="w-14 h-14 rounded-xl object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all shadow-lg" alt="" />
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
