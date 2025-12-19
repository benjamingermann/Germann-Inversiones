
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import PortfolioSetupScreen from './components/PortfolioSetupScreen';
import DashboardScreen from './components/DashboardScreen';
import AssetDetailScreen from './components/AssetDetailScreen';
import BottomNav from './components/BottomNav';
import { Screen, Asset } from './types';
import { INITIAL_ASSETS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Motor de Precios en Tiempo Real
  useEffect(() => {
    if (currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') {
      const interval = setInterval(() => {
        setAssets(prevAssets => 
          prevAssets.map(asset => {
            // Simular fluctuación de mercado entre -0.1% y +0.1%
            const fluctuation = 1 + (Math.random() * 0.002 - 0.001);
            const newPrice = asset.price * fluctuation;
            const newChange = asset.change + (fluctuation - 1) * 100;
            
            return {
              ...asset,
              price: Number(newPrice.toFixed(2)),
              change: Number(newChange.toFixed(2))
            };
          })
        );
      }, 5000); // Actualiza cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  // Sincronizar el activo seleccionado si sus datos cambian en tiempo real
  useEffect(() => {
    if (selectedAsset) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
  }, [assets]);

  const handleStart = () => {
    setCurrentScreen('SETUP');
  };

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
        return (
          <DashboardScreen 
            assets={assets} 
            onAssetClick={handleAssetClick}
            onAddMoney={() => {}} // No longer used
            onOperate={() => {}} // No longer used
          />
        );
      case 'DETAIL':
        return selectedAsset ? (
          <AssetDetailScreen asset={selectedAsset} onBack={() => setCurrentScreen('DASHBOARD')} />
        ) : null;
      default:
        return <WelcomeScreen onStart={handleStart} onLogin={() => setCurrentScreen('DASHBOARD')} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background-dark min-h-screen relative shadow-2xl overflow-x-hidden font-display">
      {renderScreen()}
      {(currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL') && <BottomNav />}
    </div>
  );
};

export default App;
