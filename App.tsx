
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import PortfolioSetupScreen from './components/PortfolioSetupScreen';
import DashboardScreen from './components/DashboardScreen';
import AssetDetailScreen from './components/AssetDetailScreen';
import MarketsScreen from './components/MarketsScreen';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { Screen, Asset, DollarRates } from './types';
import { INITIAL_ASSETS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('germann_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [dollarRates, setDollarRates] = useState<DollarRates>({});

  // Fetch de Dólares Reales
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
    const interval = setInterval(fetchDollars, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('germann_assets', JSON.stringify(assets));
  }, [assets]);

  // MOTOR DE PRECIOS "EN VIVO"
  useEffect(() => {
    if (currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL' || currentScreen === 'MARKETS') {
      const interval = setInterval(() => {
        setAssets(prevAssets => 
          prevAssets.map(asset => {
            const changeFactor = 1 + (Math.random() * 0.002 - 0.001);
            return {
              ...asset,
              price: Number((asset.price * changeFactor).toFixed(2)),
              change: Number((asset.change + (changeFactor - 1) * 5).toFixed(2))
            };
          })
        );
      }, 3000);
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
        return <DashboardScreen assets={assets} dollarRates={dollarRates} onAssetClick={handleAssetClick} onAddMoney={()=>{}} onOperate={()=>{}} />;
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
