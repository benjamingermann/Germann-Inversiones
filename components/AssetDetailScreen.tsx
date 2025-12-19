
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
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/5">
        <button 
          onClick={onBack}
          className="text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <h2 className="text-white text-lg font-bold leading-tight">{asset.symbol}</h2>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-primary/20">SEGUIMIENTO</span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-primary filled">visibility</span>
        </button>
      </header>

      <div className="px-5 pt-6 pb-2 text-center">
        <h3 className="text-slate-400 text-sm font-medium tracking-wide mb-1">{asset.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-xl text-slate-400 font-medium translate-y-[-4px]">{asset.market === 'US' ? 'US$' : '$'}</span>
          <h1 className="text-4xl font-bold tracking-tight text-white tabular-nums">{asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</h1>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2 mb-5">
          <div className={`flex items-center gap-1 ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
            <span className="material-symbols-outlined text-sm font-bold">{asset.change > 0 ? 'arrow_upward' : 'arrow_downward'}</span>
            <span className="text-sm font-bold">{(asset.price * (asset.change/100)).toFixed(2)}</span>
          </div>
          <div className={`flex h-6 items-center justify-center rounded-full px-3 ${asset.change > 0 ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
            <p className="text-xs font-bold">{asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%</p>
          </div>
        </div>

        {/* Gemini Insight Box */}
        <div className="mx-auto max-w-[340px] bg-surface-dark border border-white/10 rounded-xl p-4 mb-6 text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <span className="material-symbols-outlined text-primary filled text-[18px]">bolt</span>
            <span className="text-[10px] uppercase font-bold text-primary tracking-widest">Análisis Gemini AI</span>
          </div>
          {loadingInsight ? (
            <div className="animate-pulse space-y-2 relative z-10">
              <div className="h-3 bg-white/10 rounded w-full"></div>
              <div className="h-3 bg-white/10 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="text-sm text-gray-300 leading-relaxed italic relative z-10">
              "{insight}"
            </p>
          )}
        </div>

        <div className="mx-auto max-w-[340px] bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between backdrop-blur-sm">
          <div className="text-left">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="material-symbols-outlined text-xs text-sky-400">inventory</span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Tu Tenencia</p>
            </div>
            <p className="text-lg font-bold text-white leading-tight">{asset.quantity} Acciones</p>
            <p className="text-[10px] text-gray-400 font-medium">u$s {(asset.quantity * asset.price).toLocaleString('es-AR')}</p>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <div className="text-right min-w-[100px]">
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Market Status</p>
              <span className="material-symbols-outlined text-[10px] text-primary">circle</span>
            </div>
            <p className="text-sm font-semibold text-primary">ABIERT0</p>
            <p className="text-[9px] text-slate-500 mt-0.5">Precios real-time</p>
          </div>
        </div>
      </div>

      {/* Detail Chart */}
      <div className="w-full mt-6">
        <div className="relative h-[200px] w-full px-0 group">
          <svg className="overflow-visible" fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%">
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="detailGradient" x1="236" x2="236" y1="0" y2="150">
                <stop stopColor="#13ec5b" stopOpacity="0.3"></stop>
                <stop offset="1" stopColor="#13ec5b" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <path d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25V150H0V109Z" fill="url(#detailGradient)"></path>
            <path d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25" stroke="#13ec5b" strokeLinecap="round" strokeWidth="2.5"></path>
          </svg>
        </div>
        <div className="flex justify-between px-6 py-4">
          {['1D', '1S', '1M', '3M', '1A', 'TOD'].map((p, i) => (
            <button key={p} className={i === 2 ? 'bg-primary text-background-dark text-xs font-bold px-4 py-1.5 rounded-full' : 'text-slate-400 text-xs font-bold'}>{p}</button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6">
        <h3 className="text-white text-lg font-bold mb-4">Métricas del Activo</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          <Stat label="Precio Actual" value={`u$s ${asset.price.toLocaleString('es-AR')}`} />
          <Stat label="Máximo del Día" value={`u$s ${(asset.price * 1.02).toFixed(2)}`} />
          <Stat label="Tu Inversión" value={`u$s ${(asset.quantity * asset.price).toLocaleString('es-AR')}`} />
          <Stat label="Capitalización" value="784.3B" />
        </div>
      </div>

      <div className="px-5 py-6">
        <h3 className="text-white text-lg font-bold mb-4">Últimas Noticias</h3>
        <div className="flex flex-col gap-4">
          {NEWS_ITEMS.slice(0, 2).map(news => (
            <div key={news.id} className="flex gap-4 items-start group">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase">{news.source} • {news.time}</span>
                <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                  {news.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{label}</p>
    <p className="text-white font-bold text-base">{value}</p>
  </div>
);

export default AssetDetailScreen;
