
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
      name: symbol.toUpperCase(), // Mocked name
      market,
      quantity: parseFloat(quantity),
      price: market === 'US' ? 150 : 2500, // Mocked price
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
    <div className="flex flex-col h-screen bg-background-dark text-white overflow-hidden">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark p-4 pb-2 justify-between border-b border-white/5 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="text-white flex size-12 shrink-0 items-center justify-start cursor-pointer transition-opacity hover:opacity-70"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-2">Configuración de Cartera</h2>
        <div className="flex items-center justify-end">
          <button 
            onClick={() => onSave(addedAssets)}
            className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0 hover:text-primary/80 transition-colors"
          >
            Guardar
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-white mb-2">Construye tu Cartera</h1>
          <p className="text-[#92c9a4] text-sm font-normal leading-normal">
            Selecciona el mercado y añade los tickers de tus acciones de EE. UU. o Argentina (Merval/CEDEARs) junto con la cantidad.
          </p>
        </div>

        <div className="px-4 pb-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <label className="text-white text-sm font-medium leading-normal pb-2 ml-1">Mercado</label>
              <div className="flex w-full rounded-xl bg-[#152b1e] p-1 border border-[#326744]">
                <button 
                  onClick={() => setMarket('US')}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${market === 'US' ? 'bg-[#23482f] text-white' : 'text-[#92c9a4]'}`}
                >
                  EE. UU.
                </button>
                <button 
                  onClick={() => setMarket('ARG')}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${market === 'ARG' ? 'bg-[#23482f] text-white' : 'text-[#92c9a4]'}`}
                >
                  Argentina
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-white text-sm font-medium leading-normal pb-2 ml-1">Símbolo</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#92c9a4]">search</span>
                  <input 
                    className="form-input flex w-full rounded-xl text-white focus:ring-primary/50 border-[#326744] bg-[#193322] h-14 pl-12 pr-4 text-base font-normal uppercase transition-all" 
                    placeholder="AAPL" 
                    type="text" 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col w-32 shrink-0">
                <label className="text-white text-sm font-medium leading-normal pb-2 ml-1">Cantidad</label>
                <input 
                  className="form-input flex w-full rounded-xl text-white focus:ring-primary/50 border-[#326744] bg-[#193322] h-14 px-4 text-base font-normal text-center transition-all" 
                  placeholder="0" 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={handleAddAsset}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-4 bg-primary text-background-dark gap-2 text-sm font-bold leading-normal transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span className="truncate">Añadir Activo</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col flex-1 bg-[#152b1e] rounded-t-3xl min-h-[400px]">
          <div className="px-6 pt-6 pb-2 flex justify-between items-center">
            <h3 className="text-white tracking-tight text-xl font-bold">Acciones Añadidas</h3>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full border border-primary/20">
              {addedAssets.length} activos
            </span>
          </div>

          <div className="flex flex-col px-4 pb-10">
            {addedAssets.map(asset => (
              <div key={asset.id} className="flex items-center justify-between p-4 border-b border-slate-700/50 hover:bg-[#1a3525] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#23482f] text-white font-bold text-sm">
                    {asset.symbol.substring(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-base font-bold leading-tight">{asset.symbol}</p>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${asset.market === 'US' ? 'bg-blue-900/30 text-blue-300' : 'bg-sky-900/30 text-sky-300'}`}>
                        {asset.market}
                      </span>
                    </div>
                    <p className="text-[#92c9a4] text-xs font-medium">{asset.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white text-base font-bold leading-tight">{asset.quantity}</p>
                    <p className="text-slate-500 text-xs">acciones</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(asset.id)}
                    className="size-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSetupScreen;
