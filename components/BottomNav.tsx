
import React from 'react';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-lg border-t border-white/5 pb-6 pt-3 px-6 z-40">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <button className="flex flex-col items-center gap-1 text-primary w-16">
          <span className="material-symbols-outlined filled text-[26px]">pie_chart</span>
          <span className="text-[10px] font-bold">Cartera</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 w-16 transition-colors">
          <span className="material-symbols-outlined text-[26px]">candlestick_chart</span>
          <span className="text-[10px] font-medium">Mercados</span>
        </button>
        <div className="relative -top-5">
          <button className="flex items-center justify-center h-14 w-14 bg-primary text-background-dark rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[28px]">swap_horiz</span>
          </button>
        </div>
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
