
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
      price: 0, // Inicia en 0 para ser actualizado por la IA
      change: 0,
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
        <h2 className="text-white text-xl font-black tracking-tight flex-1 text-center pr-12">Nueva Cartera</h2>
        <div className="flex items-center">
          <button 
            onClick={() => onSave(addedAssets)}
            className="bg-primary text-background-dark px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Guardar
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto w-full px-6 pt-10">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">Hola Papá</h1>
          <p className="text-gray-400 text-sm font-medium">Ingresá tus acciones de acá y de afuera para seguir todo en una sola pantalla.</p>
        </div>

        <div className="bg-surface-dark/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">¿Dónde cotiza?</label>
              <div className="flex w-full rounded-2xl bg-background-dark p-1.5 border border-white/5">
                <button 
                  onClick={() => setMarket('US')}
                  className={`flex-1 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all ${market === 'US' ? 'bg-primary text-background-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Wall Street (ADRs/Stocks)
                </button>
                <button 
                  onClick={() => setMarket('ARG')}
                  className={`flex-1 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all ${market === 'ARG' ? 'bg-primary text-background-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Argentina (Pesos)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Ticker / Símbolo</label>
                <input 
                  className="flex w-full rounded-2xl text-white focus:ring-2 focus:ring-primary/40 border-white/5 bg-background-dark h-14 px-6 text-base font-bold uppercase transition-all outline-none" 
                  placeholder="Ej: YPF, GGAL, AAPL" 
                  type="text" 
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Cantidad de acciones</label>
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
              <span className="material-symbols-outlined">add_circle</span>
              Agregar a la lista
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-black text-white px-2 mb-2">Resumen a guardar</h3>
          <div className="grid grid-cols-1 gap-3">
            {addedAssets.map(asset => (
              <div key={asset.id} className="flex items-center justify-between p-6 bg-surface-dark/20 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-background-dark font-black text-xs ${asset.market === 'US' ? 'bg-accent-blue' : 'bg-primary'}`}>
                    {asset.market}
                  </div>
                  <div>
                    <p className="text-white text-lg font-black leading-none">{asset.symbol}</p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase mt-1 tracking-wider">{asset.quantity} acciones</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(asset.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSetupScreen;
