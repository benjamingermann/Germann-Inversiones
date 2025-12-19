
import React, { useState } from 'react';
import { Asset, DollarRates } from '../types';
import { NEWS_ITEMS } from '../constants';

interface DashboardScreenProps {
  assets: Asset[];
  dollarRates: DollarRates;
  onAssetClick: (asset: Asset) => void;
  onAddMoney: () => void;
  onOperate: () => void;
  isSyncing?: boolean;
}

const AssetIcon = ({ asset }: { asset: Asset }) => {
  const initials = asset.symbol.substring(0, 2);
  return (
    <div className="h-14 w-14 bg-surface-highlight/40 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
      <span className="text-white font-bold text-sm tracking-tighter uppercase">{initials}</span>
    </div>
  );
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ assets, dollarRates, onAssetClick, onAddMoney, isSyncing }) => {
  const mepRate = dollarRates.mep?.venta || 1200;
  
  const totalValueUSD = assets.reduce((sum, asset) => {
    const assetValue = asset.price * asset.quantity;
    return sum + (asset.market === 'ARG' ? assetValue / mepRate : assetValue);
  }, 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 lg:pb-12 pt-4 lg:pt-8 animate-fade-in font-display">
      <header className="px-6 lg:px-0 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Mi Portafolio</h2>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Hola, Germán</h1>
        </div>
        <div className="flex items-center gap-3">
          {isSyncing && (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
               <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
               <span className="text-[10px] font-bold text-primary uppercase">Actualizando...</span>
             </div>
          )}
          <button 
            onClick={onAddMoney}
            className="w-10 h-10 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-white hover:bg-surface-highlight transition-colors"
          >
            <span className={`material-symbols-outlined text-xl ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-0">
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Top Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-gradient-to-br from-surface-dark to-background-dark p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              <span className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Patrimonio Total</span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-500">u$s</span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tabular-nums tracking-tighter">
                  {totalValueUSD.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-xs">verified</span>
                Precios Reales
              </div>
            </section>

            {/* Ahora Play Card - ESTILO EXACTO CAPTURA */}
            <section 
              onClick={() => window.open('https://www.youtube.com/@Ahora_Play', '_blank')}
              className="relative overflow-hidden p-8 rounded-[2.5rem] flex flex-col justify-between cursor-pointer group shadow-xl bg-[#00102b] border border-white/5"
            >
              <div className="relative flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-white/10 p-1 overflow-hidden transform group-hover:scale-105 transition-transform">
                  <img 
                    src="https://yt3.ggpht.com/ytc/AIdro_n_1768E5q9q9n9q9n9q9n9q9n9q9n9q9n9q=s800-c-k-c0x00ffffff-no-rj" 
                    className="w-full h-full object-contain" 
                    alt="Ahora Play" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://pbs.twimg.com/profile_images/1643265416040857602/f_R1l4t3_400x400.jpg';
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8b1a1a]/40 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-red-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></span>
                  VIVO
                </div>
              </div>
              <div className="relative mt-8">
                <h3 className="text-white text-2xl font-black mb-1.5 tracking-tight">Ahora Play</h3>
                <p className="text-gray-400 text-sm font-medium tracking-tight">Análisis y noticias del mercado</p>
              </div>
            </section>
          </div>

          {/* Featured News Carousel */}
          <section className="flex flex-col gap-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Noticias Destacadas</h3>
            <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {NEWS_ITEMS.map(news => (
                <div key={news.id} className="min-w-[300px] md:min-w-[420px] aspect-[16/10] relative rounded-[2.5rem] overflow-hidden snap-center group cursor-pointer shadow-2xl border border-white/5">
                  <img src={news.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        {news.sourceLogo && (
                          <img src={news.sourceLogo} className="w-4 h-4 object-contain rounded-sm" alt="" />
                        )}
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{news.source}</span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-300">{news.time}</span>
                    </div>
                    <h4 className="text-xl font-black text-white leading-[1.2] group-hover:text-primary transition-colors tracking-tight">{news.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Assets List */}
          <section className="flex flex-col gap-6">
            <h3 className="text-xl font-black text-white tracking-tight px-2">Mis Activos</h3>
            <div className="grid grid-cols-1 gap-4">
              {assets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => onAssetClick(asset)}
                  className="flex items-center justify-between p-6 bg-surface-dark/60 rounded-[2.5rem] border border-white/5 hover:border-primary/40 hover:bg-surface-dark transition-all duration-300 cursor-pointer group shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    <AssetIcon asset={asset} />
                    <div>
                      <p className="font-black text-white text-xl leading-none mb-1.5">{asset.symbol}</p>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5 mb-1">
                      <span className="text-sm font-bold text-gray-500">{asset.market === 'US' ? 'u$s' : '$'}</span>
                      <p className="font-black text-white text-2xl tabular-nums tracking-tighter">
                        {asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className={`text-[12px] font-black flex items-center justify-end gap-1 ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
                      <span className="text-[10px]">{asset.change > 0 ? '▲' : '▼'}</span>
                      {Math.abs(asset.change).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="bg-surface-dark/30 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Dólar Hoy</h3>
              <span className="text-[8px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">LIVE</span>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Dólar Blue', data: dollarRates.blue, icon: 'currency_exchange', color: 'text-blue-400' },
                { label: 'Dólar MEP', data: dollarRates.mep, icon: 'trending_up', color: 'text-primary' },
                { label: 'Dólar CCL', data: dollarRates.ccl, icon: 'account_balance', color: 'text-purple-400' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-background-dark/40 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group cursor-default shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-full bg-surface-dark flex items-center justify-center border border-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-300">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white tabular-nums text-lg">${item.data?.venta || '...'}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Venta</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-primary/10 to-transparent p-10 rounded-[2.5rem] border border-primary/10">
            <h3 className="text-white text-xl font-black mb-4 tracking-tight">Estrategia IA</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 font-medium">
              "El mercado está testeando resistencias clave. Es momento de cautela y de vigilar el flujo de ingresos en CEDEARs."
            </p>
            <button 
              onClick={onAddMoney}
              className="w-full py-4 bg-primary text-background-dark font-black text-xs uppercase tracking-widest rounded-2xl hover:shadow-[0_0_30px_rgba(19,236,91,0.4)] transition-all active:scale-95"
            >
              {isSyncing ? 'Actualizando...' : 'Consultar IA'}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
