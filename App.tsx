
import React, { useState, useEffect, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import PortfolioSetupScreen from './components/PortfolioSetupScreen';
import DashboardScreen from './components/DashboardScreen';
import AssetDetailScreen from './components/AssetDetailScreen';
import MarketsScreen from './components/MarketsScreen';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { Screen, Asset, DollarRates } from './types';
import { INITIAL_ASSETS } from './constants';
import { fetchRealPrices } from './services/priceService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const [isSyncing, setIsSyncing] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('germann_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [dollarRates, setDollarRates] = useState<DollarRates>({});

  // Sincronización de Dólares
  useEffect(() => {
    const fetchDollars = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        const data = await response.json();
        const rates: DollarRates = {
          oficial: data.find((d: any) => d.casa === 'oficial'),
          blue: data.find((d: any) => d.casa === 'blue'),
          mep: data.find((d: any) => d.casa === 'mep'),
          ccl: data.find((d: any) => d.casa === 'contadoconliqui'),
        };
        setDollarRates(rates);
      } catch (error) {
        console.error("Error fetching dollars:", error);
      }
    };
    fetchDollars();
    const interval = setInterval(fetchDollars, 60000);
    return () => clearInterval(interval);
  }, []);

  // SINCRONIZACIÓN DE PRECIOS REALES (Gemini Search)
  const syncRealPrices = useCallback(async () => {
    if (assets.length === 0) return;
    setIsSyncing(true);
    const symbols = assets.map(a => a.symbol);
    const updates = await fetchRealPrices(symbols);
    
    if (updates.length > 0) {
      setAssets(prev => prev.map(asset => {
        const update = updates.find(u => u.symbol.toUpperCase() === asset.symbol.toUpperCase());
        return update ? { ...asset, price: update.price } : asset;
      }));
    }
    setIsSyncing(false);
  }, [assets.length]);

  // Sincronizar al iniciar el Dashboard
  useEffect(() => {
    if (currentScreen === 'DASHBOARD' && !isSyncing) {
      syncRealPrices();
    }
  }, [currentScreen]);

  // Sincronización periódica cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') {
        syncRealPrices();
      }
    }, 300000); 
    return () => clearInterval(interval);
  }, [currentScreen, syncRealPrices]);

  useEffect(() => {
    localStorage.setItem('germann_assets', JSON.stringify(assets));
  }, [assets]);

  // MOTOR DE MOVIMIENTO "LIVE" (Micro-fluctuaciones entre syncs reales)
  useEffect(() => {
    if (currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL' || currentScreen === 'MARKETS') {
      const interval = setInterval(() => {
        setAssets(prevAssets => 
          prevAssets.map(asset => {
            // Fluctuación muy pequeña para simular mercado vivo (0.01% max)
            const changeFactor = 1 + (Math.random() * 0.0002 - 0.0001);
            return {
              ...asset,
              price: Number((asset.price * changeFactor).toFixed(2)),
              change: Number((asset.change + (changeFactor - 1) * 10).toFixed(2))
            };
          })
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (selectedAsset) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
  }, [assets, selectedAsset]);

  const handleStart = () => setCurrentScreen('SETUP');
  const handleSavePortfolio = (newAssets: Asset[]) => {
    setAssets(newAssets);
    setCurrentScreen('DASHBOARD');
  };
  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentScreen('DETAIL');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'WELCOME':
        return <WelcomeScreen onStart={handleStart} onLogin={() => setCurrentScreen('DASHBOARD')} />;
      case 'SETUP':
        return <PortfolioSetupScreen onBack={() => setCurrentScreen('WELCOME')} onSave={handleSavePortfolio} initialAssets={assets} />;
      case 'DASHBOARD':
        return <DashboardScreen 
          assets={assets} 
          dollarRates={dollarRates} 
          onAssetClick={handleAssetClick} 
          onAddMoney={syncRealPrices} 
          onOperate={()=>{}}
          isSyncing={isSyncing} 
        />;
      case 'MARKETS':
        return <MarketsScreen assets={assets} onAssetClick={handleAssetClick} />;
      case 'DETAIL':
        return selectedAsset ? <AssetDetailScreen asset={selectedAsset} onBack={() => setCurrentScreen('DASHBOARD')} /> : null;
      default:
        return <WelcomeScreen onStart={handleStart} onLogin={() => setCurrentScreen('DASHBOARD')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      {(currentScreen !== 'WELCOME' && currentScreen !== 'SETUP') && (
        <div className="hidden lg:block">
          <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      )}

      <div className={`flex-1 w-full mx-auto transition-all duration-500 ${(currentScreen === 'WELCOME' || currentScreen === 'SETUP') ? '' : 'max-w-7xl lg:px-12'}`}>
        {renderScreen()}
      </div>

      {(currentScreen !== 'WELCOME' && currentScreen !== 'SETUP') && (
        <div className="lg:hidden">
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      )}
    </div>
  );
};

export default App;
