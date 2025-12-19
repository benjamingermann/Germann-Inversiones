
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

const AhoraPlayLogo = () => (
  <div className="flex flex-col items-start select-none">
    <div className="flex items-center">
      <span className="text-white text-3xl font-black tracking-tighter leading-none italic">AHORA</span>
      <div className="ml-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
        <span className="material-symbols-outlined text-xs font-black">refresh</span>
      </div>
    </div>
    <div className="mt-1 bg-[#4FBBEB] px-3 py-0.5 rounded-sm flex items-center">
      <span className="text-white text-xl font-black tracking-tighter leading-none">PLAY</span>
      <span className="ml-1 material-symbols-outlined text-white text-lg font-black">play_arrow</span>
    </div>
  </div>
);

const SourceBadge = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(19,236,91,0.5)]"></div>
    <span className="text-[10px] font-black text-white uppercase tracking-wider">{name}</span>
  </div>
);

const AssetIcon = ({ asset }: { asset: Asset }) => {
  const isUSD = asset.market === 'US';
  return (
    <div className={`h-14 w-14 rounded-full flex items-center justify-center border border-white/5 shadow-inner transition-colors ${isUSD ? 'bg-accent-blue/20' : 'bg-primary/20'}`}>
      <span className="text-white font-black text-sm tracking-tighter uppercase">{asset.symbol.substring(0,2)}</span>
    </div>
  );
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ assets, dollarRates, onAssetClick, onAddMoney, isSyncing }) => {
  // Usar un fallback razonable para el MEP si la API tarda
  const mepRate = dollarRates.mep?.venta || dollarRates.blue?.venta || 1200;
  
  const totalValueUSD = assets.reduce((sum, asset) => {
    if (asset.price <= 0) return sum;
    const assetValue = asset.price * asset.quantity;
    return sum + (asset.market === 'ARG' ? assetValue / mepRate : assetValue);
  }, 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 lg:pb-12 pt-4 lg:pt-8 animate-fade-in font-display overflow-y-auto">
      <header className="px-6 lg:px-0 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Portafolio Germann</h2>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Hola, Papá</h1>
        </div>
        <div className="flex items-center gap-3">
          {isSyncing && (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
               <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
               <span className="text-[10px] font-bold text-primary uppercase">Mercado Vivo...</span>
             </div>
          )}
          <button 
            onClick={onAddMoney}
            disabled={isSyncing}
            className={`w-12 h-12 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-white hover:bg-surface-highlight transition-all active:scale-90 ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className={`material-symbols-outlined text-2xl ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-0">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-gradient-to-br from-surface-dark to-background-dark p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center relative overflow-hidden shadow-2xl min-h-[200px]">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <span className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Total Estimado (u$s)</span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-500">u$s</span>
                <h2 className="text-4xl lg:text-6xl font-black text-white tabular-nums tracking-tighter">
                  {totalValueUSD.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Calculado a Dólar MEP (${mepRate.toLocaleString('es-AR')})</p>
            </section>

            <section 
              onClick={() => window.open('https://www.youtube.com/@Ahora_Play', '_blank')}
              className="relative overflow-hidden p-8 rounded-[2.5rem] flex flex-col justify-between cursor-pointer group shadow-xl bg-[#00143a] border border-white/10 min-h-[200px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all"
            >
              <div className="relative flex justify-between items-start">
                <AhoraPlayLogo />
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  MAXI MONTENEGRO
                </div>
              </div>
              <div className="relative mt-4">
                <p className="text-gray-300 text-sm font-bold tracking-tight">Análisis del día</p>
                <div className="flex items-center gap-2 text-[#4FBBEB] mt-1 font-black text-[10px] uppercase tracking-widest">
                  IR AL CANAL <span className="material-symbols-outlined text-sm">open_in_new</span>
                </div>
              </div>
            </section>
          </div>

          <section className="flex flex-col gap-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xl font-black text-white tracking-tight">Mis Activos</h3>
              <div className="flex gap-2">
                 <span className="bg-accent-blue/10 text-accent-blue text-[9px] font-black px-2 py-0.5 rounded border border-accent-blue/20">WALL ST (USD)</span>
                 <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded border border-primary/20">MERVAL (ARS)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {assets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => onAssetClick(asset)}
                  className="flex items-center justify-between p-6 bg-surface-dark/40 rounded-[2.5rem] border border-white/5 hover:border-primary/40 hover:bg-surface-dark/60 transition-all duration-300 cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center gap-5">
                    <AssetIcon asset={asset} />
                    <div>
                      <p className="font-black text-white text-xl leading-none mb-1.5">{asset.symbol}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                         {asset.quantity.toLocaleString('es-AR')} acciones • {asset.market === 'US' ? 'NYSE' : 'BCBA'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5 mb-1">
                      <span className="text-[10px] font-black text-gray-500 uppercase">{asset.market === 'US' ? 'USD' : 'ARS'}</span>
                      <p className="font-black text-white text-2xl tabular-nums tracking-tighter">
                        {asset.price > 0 ? (
                          asset.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })
                        ) : (
                          <span className="flex items-center gap-1 opacity-50 animate-pulse">
                            Cargando...
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                      {asset.price > 0 ? 'Precio Hoy' : 'Consultando IA'}
                    </div>
                  </div>
                </div>
              ))}
              {assets.length === 0 && (
                <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02]">
                   <p className="text-gray-500 font-bold italic">No has ingresado acciones todavía.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="bg-surface-dark/30 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Dólares Argentina</h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                <span className="w-1 h-1 bg-primary rounded-full animate-ping"></span>
                <span className="text-[8px] font-bold text-primary">ONLINE</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Dólar Blue', data: dollarRates.blue, icon: 'payments', color: 'text-blue-400' },
                { label: 'Dólar MEP', data: dollarRates.mep, icon: 'trending_up', color: 'text-primary' },
                { label: 'Dólar CCL', data: dollarRates.ccl, icon: 'account_balance', color: 'text-purple-400' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-background-dark/40 rounded-2xl border border-white/5 group shadow-sm transition-colors hover:bg-white/[0.03]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5 ${item.color}`}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-300">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white tabular-nums text-lg">
                      {item.data?.venta ? `$${item.data.venta.toLocaleString('es-AR')}` : '...'}
                    </p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Venta</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-primary/10 to-transparent p-10 rounded-[2.5rem] border border-primary/10 relative overflow-hidden">
            <h3 className="text-white text-xl font-black mb-4 tracking-tight">Consejo IA</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 font-medium italic">
              "Papá, para activos como YPF, es vital mirar el gráfico de NYSE para entender la tendencia global antes de operar en pesos localmente."
            </p>
            <button 
              onClick={onAddMoney}
              disabled={isSyncing}
              className="w-full py-4 bg-primary text-background-dark font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              {isSyncing ? 'Sincronizando...' : 'Actualizar Todo'}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
