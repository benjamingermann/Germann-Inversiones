
import React, { useState, useEffect } from 'react';
import { Asset, NewsItem } from '../types';
import { NEWS_ITEMS } from '../constants';
import { getInvestmentInsight } from '../services/geminiService';

interface AssetDetailScreenProps {
  asset: Asset;
  onBack: () => void;
}

const AssetDetailScreen: React.FC<AssetDetailScreenProps> = ({ asset, onBack }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const result = await getInvestmentInsight(asset.symbol);
      setInsight(result);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [asset.symbol]);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/90 backdrop-blur-xl p-4 pb-2 justify-between border-b border-white/5">
        <button 
          onClick={onBack}
          className="text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg font-bold leading-tight">{asset.symbol}</h2>
          <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Detalle de Activo</span>
        </div>
        <div className="size-10"></div> {/* Spacer */}
      </header>

      <div className="px-6 pt-8 pb-4 text-center">
        <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">{asset.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl text-gray-500 font-bold">{asset.market === 'US' ? 'u$s' : '$'}</span>
          <h1 className="text-5xl font-black tracking-tighter text-white tabular-nums">
            {asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </h1>
        </div>
        
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm ${asset.change > 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            <span className="material-symbols-outlined text-sm font-bold">{asset.change > 0 ? 'arrow_upward' : 'arrow_downward'}</span>
            {Math.abs(asset.change).toFixed(2)}%
          </div>
        </div>
      </div>

      <main className="px-6 max-w-2xl mx-auto w-full">
        {/* Gemini Insight Box - Rediseñada para ser el centro de atención */}
        <section className="mt-6 mb-8 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent-blue/50 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-surface-dark border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-background-dark shadow-[0_0_15px_rgba(19,236,91,0.4)]">
                  <span className="material-symbols-outlined filled text-xl">bolt</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-none">Análisis con IA</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Sugerencia Estratégica</p>
                </div>
              </div>
              {loadingInsight && <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
            </div>
            
            <div className="min-h-[60px] flex items-center">
              {loadingInsight ? (
                <div className="w-full space-y-2">
                  <div className="h-3 bg-white/5 rounded-full w-full animate-pulse"></div>
                  <div className="h-3 bg-white/5 rounded-full w-2/3 animate-pulse"></div>
                </div>
              ) : (
                <p className="text-gray-200 text-base leading-relaxed italic font-medium">
                  "{insight}"
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-dark/40 p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Tu Tenencia</p>
            <p className="text-xl font-bold text-white">{asset.quantity}u</p>
            <p className="text-xs text-primary font-bold">u$s {(asset.quantity * asset.price).toLocaleString('es-AR')}</p>
          </div>
          <div className="bg-surface-dark/40 p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Estado</p>
            <p className="text-xl font-bold text-primary">Abierto</p>
            <p className="text-xs text-gray-500 font-bold">Tiempo Real</p>
          </div>
        </div>

        <h3 className="text-white text-lg font-bold mb-4">Últimas Noticias</h3>
        <div className="flex flex-col gap-4">
          {NEWS_ITEMS.map(news => (
            <div key={news.id} className="flex gap-4 p-4 bg-surface-dark/20 rounded-2xl border border-white/5 hover:bg-surface-dark/40 transition-colors cursor-pointer group">
              <div className="flex-1">
                <p className="text-[10px] font-bold text-sky-400 uppercase mb-1">{news.time} • {news.source}</p>
                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h4>
              </div>
              <img src={news.imageUrl} className="size-16 rounded-xl object-cover opacity-60" alt="" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssetDetailScreen;
