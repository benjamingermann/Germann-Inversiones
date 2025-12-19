
import React, { useEffect, useRef, useState } from 'react';
import { Asset, NewsItem } from '../types';
import { NEWS_ITEMS } from '../constants';

interface AssetDetailScreenProps {
  asset: Asset;
  onBack: () => void;
}

const AssetDetailScreen: React.FC<AssetDetailScreenProps> = ({ asset, onBack }) => {
  const container = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getTVSymbol = (symbol: string, market: string) => {
    const s = symbol.toUpperCase();
    // Forzamos NYSE para YPF y otros ADRs si el usuario los sigue de forma global
    if (s === 'YPF' || s === 'GGAL' || s === 'BMA' || s === 'PAM' || s === 'EDN') {
        return `NYSE:${s}`;
    }
    if (market === 'ARG') return `BCBA:${s}`;
    return `NASDAQ:${s}`;
  };

  useEffect(() => {
    if (container.current) {
      setIsLoaded(false);
      container.current.innerHTML = '';
      
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": getTVSymbol(asset.symbol, asset.market),
        "interval": "D",
        "timezone": "America/Argentina/Buenos_Aires",
        "theme": "dark",
        "style": "3",
        "locale": "es",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": false,
        "save_image": false,
        "backgroundColor": "rgba(16, 34, 22, 1)",
        "gridColor": "rgba(255, 255, 255, 0.05)",
        "container_id": "tradingview_widget"
      });

      script.onload = () => setIsLoaded(true);
      container.current.appendChild(script);
    }
  }, [asset.symbol, asset.market]);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 animate-fade-in">
      <header className="sticky top-0 z-50 flex flex-col items-center bg-background-dark/95 backdrop-blur-xl p-4 pt-6 border-b border-white/5">
        <div className="w-full flex justify-between items-center mb-4">
          <button 
            onClick={onBack}
            className="text-white flex size-12 items-center justify-start rounded-full hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </button>
          <div className="text-center">
            <h2 className="text-white text-2xl font-black tracking-tight leading-none">{asset.symbol}</h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                {asset.market === 'US' ? 'NYSE / NASDAQ' : 'BYMA Argentina'}
            </p>
          </div>
          <div className="size-12 flex items-center justify-end">
             <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#13ec5b]"></span>
          </div>
        </div>
      </header>

      <main className="px-6 max-w-4xl mx-auto w-full pt-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl text-gray-500 font-bold uppercase">{asset.market === 'US' ? 'u$s' : '$'}</span>
            <h1 className="text-7xl font-black tracking-tighter text-white tabular-nums leading-none">
              {asset.price > 0 ? asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '...'}
            </h1>
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em]">{asset.name}</p>
        </div>

        <section className="mb-12 relative">
          <div className="relative bg-surface-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl h-[450px] lg:h-[550px]">
             {!isLoaded && (
               <div className="absolute inset-0 flex items-center justify-center bg-surface-dark z-10">
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Cargando Gráfico Global...</p>
                 </div>
               </div>
             )}
             <div id="tradingview_widget" ref={container} className="w-full h-full"></div>
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Tus Acciones', val: `${asset.quantity}u` },
            { label: 'Tu Capital', val: `${asset.market === 'US' ? 'u$s' : '$'} ${(asset.quantity * asset.price).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`, color: 'text-primary' },
            { label: 'Mercado', val: asset.market === 'US' ? 'Exterior' : 'Local' },
            { label: 'Estado', val: 'Activo' }
          ].map((m, i) => (
            <div key={i} className="bg-surface-dark/40 p-6 rounded-3xl border border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{m.label}</p>
              <p className={`text-xl font-black ${m.color || 'text-white'}`}>{m.val}</p>
            </div>
          ))}
        </div>

        <h3 className="text-white text-xl font-black mb-6 px-2 italic">Noticias Relacionadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS_ITEMS.map(news => (
            <div key={news.id} className="flex gap-4 p-5 bg-surface-dark/20 rounded-[2rem] border border-white/5 hover:bg-surface-dark/40 transition-all cursor-pointer group">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-primary/60 uppercase mb-2">{news.time} • {news.source}</p>
                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                  {news.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssetDetailScreen;
