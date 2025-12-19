
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>
      
      <div className="flex-1 flex flex-col items-center justify-between z-10 px-6 pt-16 pb-12 h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-4 animate-fade-in-down">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background-dark">
            <span className="material-symbols-outlined text-xl filled">candlestick_chart</span>
          </div>
          <span className="text-white text-lg font-bold tracking-wide">Germann Inversiones</span>
        </div>

        {/* Feature Visual */}
        <div className="w-full relative grow flex flex-col justify-center items-center py-6">
          <div className="relative w-full aspect-square max-w-[320px] mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-white/5 backdrop-blur-sm p-4 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">Balance Total</span>
                  <span className="text-white text-2xl font-bold mt-1">$14,235.80</span>
                </div>
                <div className="px-2 py-1 bg-primary/20 rounded text-primary text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +2.4%
                </div>
              </div>
              
              <div className="grow w-full relative">
                <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(19,236,91,0.6)]" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <path d="M0 45 C 20 40, 30 48, 50 25 S 70 30, 100 5" fill="none" stroke="#13ec5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <defs>
                    <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#13ec5b', stopOpacity: 0.2 }}></stop>
                      <stop offset="100%" style={{ stopColor: '#13ec5b', stopOpacity: 0 }}></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 45 C 20 40, 30 48, 50 25 S 70 30, 100 5 V 50 H 0 Z" fill="url(#grad1)" stroke="none"></path>
                </svg>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="bg-[#2C3E33] px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-[8px] text-black font-bold">A</span>
                  </div>
                  <span className="text-white text-xs font-bold">AAPL</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-0 -translate-x-2 flex gap-2">
                <div className="bg-[#2C3E33] px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg transform -rotate-6">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">G</span>
                  </div>
                  <span className="text-white text-xs font-bold">GGAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Actions */}
        <div className="w-full flex flex-col items-center gap-6 mt-auto">
          <div className="text-center space-y-4 px-2">
            <h1 className="text-white tracking-tight text-[32px] md:text-[36px] font-bold leading-[1.1]">
              Inversiones en <br/>
              <span className="text-primary">Tiempo Real</span>
            </h1>
            <p className="text-gray-400 text-base font-medium leading-relaxed max-w-xs mx-auto">
              Gestiona tu portafolio de acciones de EE. UU. y Argentina (Merval y CEDEARs) en un solo lugar.
            </p>
          </div>

          <div className="w-full space-y-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full group relative cursor-pointer flex items-center justify-center rounded-xl h-14 px-5 bg-primary hover:bg-[#0fd650] transition-all duration-300 shadow-[0_0_20px_rgba(19,236,91,0.3)] hover:shadow-[0_0_30px_rgba(19,236,91,0.5)] active:scale-[0.98]"
            >
              <span className="text-background-dark text-lg font-bold leading-normal tracking-wide mr-2">Comenzar Ahora</span>
              <span className="material-symbols-outlined text-background-dark transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
            <button 
              onClick={onLogin}
              className="w-full cursor-pointer flex items-center justify-center rounded-xl h-12 px-5 bg-transparent border border-white/10 hover:bg-white/5 transition-colors text-white/80 hover:text-white text-base font-semibold"
            >
              Ya tengo cuenta
            </button>
          </div>

          <div className="text-xs text-white/30 text-center pb-2">
            Al continuar, aceptas nuestros <a className="underline hover:text-primary" href="#">Términos</a> y <a className="underline hover:text-primary" href="#">Privacidad</a>.
          </div>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-20 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
