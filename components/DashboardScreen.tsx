
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
  const [filterType, setFilterType] = useState<'Todos' | 'Acciones' | 'CEDEARs'>('Todos');

  const totalValue = assets.reduce((sum, asset) => sum + (asset.price * asset.quantity), 0);
  const totalChange = 5.12; 

  const handleOpenYouTube = () => {
    window.open('https://www.youtube.com/@Ahora_Play', '_blank');
  };

  const handleOpenInvesting = () => {
    window.open('https://es.investing.com/', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32">
      <header className="sticky top-0 z-50 w-full bg-background-dark/95 backdrop-blur-md px-4 pt-2 pb-2">
        <div className="flex items-center justify-between h-14 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-primary/30" 
                style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=1")' }}
              ></div>
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-primary rounded-full border-2 border-background-dark"></div>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase leading-none">Monitor</p>
              <p className="text-white text-sm font-bold">Germann Inv.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-surface-dark text-primary border border-primary/10">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-md mx-auto px-4 flex flex-col gap-5">
        
        {/* Banner Ahora Play Live */}
        <div 
          onClick={handleOpenYouTube}
          className="group relative w-full bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-red-900/20 cursor-pointer overflow-hidden transition-transform active:scale-[0.98]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
          <div className="relative flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full border-2 border-white/30 flex items-center justify-center bg-white shadow-xl overflow-hidden">
               <img src="https://yt3.googleusercontent.com/ytc/AIdro_n_1768E5q9q9n9q9n9q9n9q9n9q9n9q9n9q=s176-c-k-c0x00ffffff-no-rj" className="w-10 h-10 object-contain" alt="Ahora Play" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">AHORA PLAY</span>
              </div>
              <h4 className="text-white font-extrabold text-base leading-tight">Canal EN VIVO</h4>
            </div>
          </div>
          <div className="relative bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1">
            <span className="material-symbols-outlined text-white text-sm filled">play_circle</span>
            <span className="text-white text-xs font-bold">Ver ahora</span>
          </div>
        </div>

        <div className="bg-surface-dark p-1 rounded-xl flex items-center">
          {['Consolidado', 'EE. UU.', 'Argentina'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-primary text-background-dark shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-primary mb-1 flex items-center gap-1 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Balance Live
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white tabular-nums">
            u$s {totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <div className="flex items-center gap-2 mt-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[18px]">trending_up</span>
            <p className="text-primary text-xs font-bold">Ganancia: +$1,203 (+{totalChange}%)</p>
          </div>
        </section>

        <section className="w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Mercado Actual</h3>
            <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              REAL-TIME
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {MARKET_RATES.map((rate, i) => (
              <div key={i} className="min-w-[130px] bg-surface-dark border border-white/5 rounded-2xl p-3 flex flex-col gap-1 shadow-sm">
                <span className={`text-[10px] font-bold uppercase ${rate.color}`}>{rate.name}</span>
                <p className="text-lg font-bold text-white leading-none">${rate.sell}</p>
                <p className={`text-[10px] font-bold flex items-center gap-0.5 text-primary`}>
                  <span className="material-symbols-outlined text-[10px]">arrow_upward</span> 0.5%
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-lg font-bold text-white">Mis Activos</h3>
            <div className="flex gap-3 text-[10px] font-bold text-gray-500 uppercase">
              {['Todos', 'Acciones', 'CEDEARs'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilterType(f as any)}
                  className={`transition-colors ${filterType === f ? 'text-primary' : 'hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {assets.map(asset => (
              <div 
                key={asset.id} 
                onClick={() => onAssetClick(asset)}
                className="flex items-center justify-between p-3.5 bg-surface-dark rounded-2xl border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center overflow-hidden p-1 relative shadow-inner">
                    {asset.logo ? (
                      <img src={asset.logo} className="h-full w-full object-contain" alt={asset.symbol} />
                    ) : (
                      <div className="w-full h-full bg-surface-highlight flex items-center justify-center text-xs font-bold text-white">{asset.symbol.substring(0,2)}</div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-base leading-tight text-white">{asset.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{asset.quantity}u • {asset.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base leading-tight text-white tabular-nums">
                    {asset.market === 'US' ? 'u$s' : '$'} {asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
                    <span className="material-symbols-outlined text-[10px]">{asset.change > 0 ? 'arrow_upward' : 'arrow_downward'}</span>
                    {Math.abs(asset.change).toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Noticias Investing.com */}
        <section className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Noticias Investing.com</h3>
            <button 
              onClick={handleOpenInvesting}
              className="text-primary text-[10px] font-bold uppercase border-b border-primary/30 pb-0.5"
            >
              Ir a Investing
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {NEWS_ITEMS.map(news => (
              <div 
                key={news.id} 
                onClick={handleOpenInvesting}
                className="flex gap-3 items-start group cursor-pointer bg-surface-dark/40 p-3 rounded-2xl border border-white/5 hover:border-white/10"
              >
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 text-[10px] font-bold uppercase tracking-widest">{news.source}</span>
                    <span className="size-1 bg-gray-600 rounded-full"></span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase">{news.time}</span>
                  </div>
                  <h4 className="text-white text-sm font-bold leading-snug group-hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                </div>
                <div className="size-16 rounded-xl overflow-hidden shrink-0 bg-gray-800">
                  <img src={news.imageUrl} className="h-full w-full object-cover opacity-80" alt="news" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardScreen;
