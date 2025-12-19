
import React, { useState } from 'react';
import { Asset } from '../types';

interface PortfolioSetupScreenProps {
  onBack: () => void;
  onSave: (assets: Asset[]) => void;
  initialAssets: Asset[];
}

const PortfolioSetupScreen: React.FC<PortfolioSetupScreenProps> = ({ onBack, onSave, initialAssets }) => {
  const [market, setMarket] = useState<'US' | 'ARG'>('US');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [addedAssets, setAddedAssets] = useState<Asset[]>(initialAssets);

  const handleAddAsset = () => {
    if (!symbol || !quantity) return;
    const newAsset: Asset = {
      id: Math.random().toString(36).substr(2, 9),
      symbol: symbol.toUpperCase(),
      name: symbol.toUpperCase(),
      market,
      quantity: parseFloat(quantity),
      price: market === 'US' ? 150 : 2500,
      change: Math.random() * 5 - 2,
      type: market === 'US' ? 'Stock' : 'Merval'
    };
    setAddedAssets([newAsset, ...addedAssets]);
    setSymbol('');
    setQuantity('');
  };

  const handleDelete = (id: string) => {
    setAddedAssets(addedAssets.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white pb-20">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/95 backdrop-blur-xl p-6 border-b border-white/5">
        <button 
          onClick={onBack}
          className="text-white flex size-12 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-xl font-black tracking-tight flex-1 text-center pr-12">Configuración</h2>
        <div className="flex items-center">
          <button 
            onClick={() => onSave(addedAssets)}
            className="bg-primary text-background-dark px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Listo
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto w-full px-6 pt-10">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">Tu Cartera</h1>
          <p className="text-gray-400 text-base font-medium leading-relaxed">
            Añade los símbolos de tus activos (AAPL, GGAL, BTC) para sincronizar precios en tiempo real.
          </p>
        </div>

        <div className="bg-surface-dark/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Mercado</label>
              <div className="flex w-full rounded-2xl bg-background-dark p-1.5 border border-white/5">
                <button 
                  onClick={() => setMarket('US')}
                  className={`flex-1 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all ${market === 'US' ? 'bg-primary text-background-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Wall Street
                </button>
                <button 
                  onClick={() => setMarket('ARG')}
                  className={`flex-1 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all ${market === 'ARG' ? 'bg-primary text-background-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Argentina
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Símbolo</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">search</span>
                  <input 
                    className="flex w-full rounded-2xl text-white focus:ring-2 focus:ring-primary/40 border-white/5 bg-background-dark h-14 pl-12 pr-4 text-base font-bold uppercase transition-all outline-none" 
                    placeholder="AAPL / GGAL" 
                    type="text" 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Cantidad</label>
                <input 
                  className="flex w-full rounded-2xl text-white focus:ring-2 focus:ring-primary/40 border-white/5 bg-background-dark h-14 px-6 text-base font-bold transition-all outline-none" 
                  placeholder="0.00" 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={handleAddAsset}
              className="flex w-full items-center justify-center rounded-2xl h-14 bg-white/5 border border-white/10 text-white gap-3 text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 mt-2"
            >
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
              Añadir Activo
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-2 mb-2">
            <h3 className="text-xl font-black text-white tracking-tight">Activos en Cartera</h3>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full border border-primary/20 uppercase">
              {addedAssets.length} activos
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {addedAssets.map(asset => (
              <div key={asset.id} className="flex items-center justify-between p-6 bg-surface-dark/20 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-background-dark flex items-center justify-center text-white font-black text-sm border border-white/5">
                    {asset.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-white text-lg font-black leading-none">{asset.symbol}</p>
                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-white/10 text-gray-400 uppercase tracking-widest">
                        {asset.market}
                      </span>
                    </div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase mt-1 tracking-wider">{asset.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-white text-xl font-black leading-none tabular-nums">{asset.quantity}</p>
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mt-1">acciones</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(asset.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-[22px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
            {addedAssets.length === 0 && (
              <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest italic">Tu cartera está vacía</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSetupScreen;
