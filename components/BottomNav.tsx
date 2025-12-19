
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-lg border-t border-white/5 pb-6 pt-3 px-6 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button 
          onClick={() => onNavigate('DASHBOARD')}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${currentScreen === 'DASHBOARD' || currentScreen === 'DETAIL' ? 'text-primary' : 'text-gray-500'}`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === 'DASHBOARD' ? 'filled' : ''}`}>pie_chart</span>
          <span className="text-[10px] font-bold">Cartera</span>
        </button>
        <button 
          onClick={() => onNavigate('MARKETS')}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${currentScreen === 'MARKETS' ? 'text-primary' : 'text-gray-500'}`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === 'MARKETS' ? 'filled' : ''}`}>monitoring</span>
          <span className="text-[10px] font-medium">Mercados</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 w-16 transition-colors">
          <span className="material-symbols-outlined text-[26px]">currency_exchange</span>
          <span className="text-[10px] font-medium">Dólar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 w-16 transition-colors">
          <span className="material-symbols-outlined text-[26px]">menu</span>
          <span className="text-[10px] font-medium">Menú</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
