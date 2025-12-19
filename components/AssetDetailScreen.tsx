
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

  // Mapeo de símbolos para TradingView
  const getTVSymbol = (symbol: string, market: string) => {
    if (market === 'ARG') return `BCBA:${symbol}`;
    if (symbol === 'AAPL' || symbol === 'NVDA' || symbol === 'MELI') return `NASDAQ:${symbol}`;
    return `NYSE:${symbol}`;
  };

  // EFECTO CRÍTICO: Solo recarga el script si cambia el SÍMBOLO, no el PRECIO
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
    // IMPORTANTE: Solo re-ejecutar si cambia el símbolo o el mercado
  }, [asset.symbol, asset.market]);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 animate-fade-in">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/95 backdrop-blur-xl p-4 pb-2 justify-between border-b border-white/5">
        <button 
          onClick={onBack}
          className="text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg font-bold leading-tight">{asset.symbol}</h2>
          <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Mercado Abierto</span>
        </div>
        <div className="size-10 flex items-center justify-center">
           <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>
      </header>

      {/* Area de Precio: Se actualiza sin parpadear el gráfico */}
      <div className="px-6 pt-8 pb-4 text-center">
        <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">{asset.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl text-gray-500 font-bold">{asset.market === 'US' ? 'u$s' : '$'}</span>
          <h1 className="text-5xl font-black tracking-tighter text-white tabular-nums transition-all duration-500">
            {asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </h1>
        </div>
        
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm transition-colors duration-500 ${asset.change > 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            <span className="material-symbols-outlined text-sm font-bold">{asset.change > 0 ? 'arrow_upward' : 'arrow_downward'}</span>
            {Math.abs(asset.change).toFixed(2)}%
          </div>
        </div>
      </div>

      <main className="px-6 max-w-4xl mx-auto w-full">
        {/* TradingView Chart Container */}
        <section className="mt-4 mb-8 relative">
          <div className="absolute -inset-1 bg-primary/20 rounded-[2rem] blur-xl opacity-10"></div>
          <div className="relative bg-surface-dark border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
             {!isLoaded && (
               <div className="absolute inset-0 flex items-center justify-center bg-surface-dark z-10">
                 <div className="flex flex-col items-center gap-3">
                   <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cargando Gráfico...</p>
                 </div>
               </div>
             )}
             <div id="tradingview_widget" ref={container} className="w-full h-full"></div>
          </div>
        </section>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-dark/40 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Tenencia</p>
            <p className="text-xl font-bold text-white">{asset.quantity}u</p>
          </div>
          <div className="bg-surface-dark/40 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Valor Total</p>
            <p className="text-xl font-bold text-primary">{asset.market === 'US' ? 'u$s' : '$'} {(asset.quantity * asset.price).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-surface-dark/40 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Rend. Diario</p>
            <p className={`text-xl font-bold ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
              {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
            </p>
          </div>
          <div className="bg-surface-dark/40 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Volumen</p>
            <p className="text-xl font-bold text-white">Alta</p>
          </div>
        </div>

        <h3 className="text-white text-lg font-bold mb-4 px-2">Noticias de {asset.symbol}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS_ITEMS.map(news => (
            <div key={news.id} className="flex gap-4 p-4 bg-surface-dark/20 rounded-2xl border border-white/5 hover:bg-surface-dark/40 transition-all cursor-pointer group">
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-sky-400 uppercase mb-1">{news.time} • {news.source}</p>
                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h4>
              </div>
              <img src={news.imageUrl} className="size-14 rounded-xl object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssetDetailScreen;
