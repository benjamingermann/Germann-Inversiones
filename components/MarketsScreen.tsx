
import React from 'react';
import { Asset } from '../types';

interface MarketsScreenProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
}

const MarketsScreen: React.FC<MarketsScreenProps> = ({ assets, onAssetClick }) => {
  const indices = [
    { name: 'S&P 500', value: '5,026.12', change: '+1.25%', color: 'text-primary' },
    { name: 'Nasdaq 100', value: '17,890.34', change: '+0.85%', color: 'text-primary' },
    { name: 'Merval', value: '1.245.890', change: '+3.42%', color: 'text-primary' },
    { name: 'Bitcoin', value: '64,234.12', change: '-0.15%', color: 'text-red-500' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-32 lg:pb-12 pt-4 lg:pt-8 animate-fade-in">
      <header className="px-4 lg:px-0 mb-8">
        <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Mercado Global</h2>
        <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Tendencias</h1>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-0">
        <div className="lg:col-span-12 flex flex-col gap-8">
          {/* Grilla de Índices */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {indices.map((idx, i) => (
              <div key={i} className="bg-surface-dark/40 p-6 rounded-[2rem] border border-white/5 shadow-xl">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">{idx.name}</p>
                <h4 className="text-xl font-black text-white mb-1">{idx.value}</h4>
                <p className={`text-xs font-bold ${idx.color}`}>{idx.change}</p>
              </div>
            ))}
          </section>

          {/* Lista de Seguimiento Extendida */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xl font-black text-white px-2">Top Activos Sugeridos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => onAssetClick(asset)}
                  className="flex items-center gap-4 p-5 bg-surface-dark/20 rounded-[1.5rem] border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">
                    {asset.symbol.substring(0,2)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white leading-none mb-1">{asset.symbol}</p>
                    <p className="text-[10px] text-gray-500">{asset.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">${asset.price}</p>
                    <p className={`text-[10px] font-bold ${asset.change > 0 ? 'text-primary' : 'text-red-500'}`}>
                      {asset.change > 0 ? '+' : ''}{asset.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MarketsScreen;
