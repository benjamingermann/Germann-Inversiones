
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import PortfolioSetupScreen from './components/PortfolioSetupScreen';
import DashboardScreen from './components/DashboardScreen';
import AssetDetailScreen from './components/AssetDetailScreen';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { Screen, Asset } from './types';
import { INITIAL_ASSETS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('germann_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Guardar en localStorage siempre que cambien los activos
  useEffect(() => {
    localStorage.setItem('germann_assets', JSON.stringify(assets));
  }, [assets]);

  // Motor de Precios en Tiempo Real (Simulación)
  useEffect(() => {
    if (currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') {
      const interval = setInterval(() => {
        setAssets(prevAssets => 
          prevAssets.map(asset => {
            const fluctuation = 1 + (Math.random() * 0.001 - 0.0005);
            return {
              ...asset,
              price: Number((asset.price * fluctuation).toFixed(2)),
              change: Number((asset.change + (fluctuation - 1) * 10).toFixed(2))
            };
          })
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (selectedAsset) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
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
        return (
          <PortfolioSetupScreen 
            onBack={() => setCurrentScreen('WELCOME')} 
            onSave={handleSavePortfolio}
            initialAssets={assets}
          />
        );
      case 'DASHBOARD':
        return <DashboardScreen assets={assets} onAssetClick={handleAssetClick} onAddMoney={()=>{}} onOperate={()=>{}} />;
      case 'DETAIL':
        return selectedAsset ? <AssetDetailScreen asset={selectedAsset} onBack={() => setCurrentScreen('DASHBOARD')} /> : null;
      default:
        return <WelcomeScreen onStart={handleStart} onLogin={() => setCurrentScreen('DASHBOARD')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      {/* Sidebar visible solo en desktop */}
      {(currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}

      {/* Contenedor Principal */}
      <div className={`flex-1 w-full mx-auto ${currentScreen === 'WELCOME' ? '' : 'max-w-7xl lg:px-8'}`}>
        {renderScreen()}
      </div>

      {/* Nav inferior solo en móvil */}
      {(currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') && (
        <div className="lg:hidden">
          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default App;
