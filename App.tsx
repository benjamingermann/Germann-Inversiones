
import React, { useState, useEffect, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import PortfolioSetupScreen from './components/PortfolioSetupScreen';
import DashboardScreen from './components/DashboardScreen';
import AssetDetailScreen from './components/AssetDetailScreen';
import MarketsScreen from './components/MarketsScreen';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { Screen, Asset, DollarRates } from './types';
import { fetchRealPrices } from './services/priceService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const [isSyncing, setIsSyncing] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('germann_assets_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [dollarRates, setDollarRates] = useState<DollarRates>({});

  // Saltear bienvenida si ya tiene acciones
  useEffect(() => {
    if (assets.length > 0 && currentScreen === 'WELCOME') {
      setCurrentScreen('DASHBOARD');
    }
  }, []);

  // Sincronización de Dólares (API Gratuita estable)
  const fetchDollars = async () => {
    try {
      const response = await fetch('https://dolarapi.com/v1/dolares');
      const data = await response.json();
      const rates: DollarRates = {
        oficial: data.find((d: any) => d.casa.toLowerCase().includes('oficial')),
        blue: data.find((d: any) => d.casa.toLowerCase().includes('blue')),
        mep: data.find((d: any) => d.casa.toLowerCase().includes('mep')),
        ccl: data.find((d: any) => d.casa.toLowerCase().includes('contadoconliqui') || d.casa.toLowerCase().includes('ccl')),
      };
      setDollarRates(rates);
    } catch (error) {
      console.error("Error fetching dollars:", error);
    }
  };

  useEffect(() => {
    fetchDollars();
    const interval = setInterval(fetchDollars, 300000); // Cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  // Sincronización de precios con IA
  const syncRealPrices = useCallback(async () => {
    if (assets.length === 0 || isSyncing) return;
    setIsSyncing(true);
    const symbols = assets.map(a => a.symbol);
    try {
      const updates = await fetchRealPrices(symbols);
      if (updates && updates.length > 0) {
        setAssets(prev => prev.map(asset => {
          const update = updates.find(u => u.symbol.toUpperCase() === asset.symbol.toUpperCase());
          // Solo actualizamos si el precio es mayor a 0 para no sobreescribir con errores
          return (update && update.price > 0) ? { ...asset, price: update.price } : asset;
        }));
      }
    } catch (e) {
      console.error("Sync failed", e);
    } finally {
      setIsSyncing(false);
    }
  }, [assets.length, isSyncing]);

  // AUTO-SYNC: Si hay activos con precio 0, intentar sincronizar inmediatamente
  useEffect(() => {
    const hasUnpricedAssets = assets.some(a => a.price === 0);
    if (hasUnpricedAssets && !isSyncing && assets.length > 0) {
      syncRealPrices();
    }
  }, [assets, isSyncing, syncRealPrices]);

  // Persistencia local permanente
  useEffect(() => {
    localStorage.setItem('germann_assets_v2', JSON.stringify(assets));
  }, [assets]);

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
