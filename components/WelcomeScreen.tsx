
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>
      
      <div className="flex-1 flex flex-col items-center z-10 px-6 pt-12 pb-20">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-12 animate-fade-in-down">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-background-dark shadow-[0_0_15px_rgba(19,236,91,0.4)]">
            <span className="material-symbols-outlined text-2xl filled">candlestick_chart</span>
          </div>
          <span className="text-white text-xl font-black tracking-tight uppercase">Germann Inversiones</span>
        </div>

        {/* Feature Visual - Scaled for Desktop compatibility */}
        <div className="w-full relative flex flex-col justify-center items-center py-8 mb-10">
          <div className="relative w-full aspect-square max-w-[280px] md:max-w-[340px] mx-auto transition-transform hover:scale-105 duration-700">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#162b1e]/60 backdrop-blur-xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">Balance Total</span>
                  <span className="text-white text-3xl font-black mt-1 tabular-nums tracking-tighter">$14,235.80</span>
                </div>
                <div className="px-3 py-1.5 bg-primary/10 rounded-xl text-primary text-xs font-black flex items-center gap-1.5 border border-primary/20">
                  <span className="material-symbols-outlined text-sm font-black">trending_up</span>
                  +2.4%
                </div>
              </div>
              
              <div className="grow w-full relative mt-4">
                <svg className="w-full h-32 drop-shadow-[0_0_15px_rgba(19,236,91,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <path d="M0 45 C 20 40, 30 48, 50 25 S 70 30, 100 5" fill="none" stroke="#13ec5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  <defs>
                    <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#13ec5b', stopOpacity: 0.3 }}></stop>
                      <stop offset="100%" style={{ stopColor: '#13ec5b', stopOpacity: 0 }}></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 45 C 20 40, 30 48, 50 25 S 70 30, 100 5 V 50 H 0 Z" fill="url(#grad1)" stroke="none"></path>
                </svg>
              </div>

              {/* Floating elements with better fallback icons to avoid "broken image" look */}
              <div className="absolute bottom-10 right-6 flex gap-2">
                <div className="bg-[#244230] px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl backdrop-blur-md">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-white/20">
                    <span className="text-[10px] text-black font-black">A</span>
                  </div>
                  <span className="text-white text-xs font-black tracking-wider">AAPL</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-0 -translate-x-4 flex gap-2">
                <div className="bg-[#244230] px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl transform -rotate-6 backdrop-blur-md">
                  <div className="w-6 h-6 rounded-full bg-[#ff4d00] flex items-center justify-center border border-white/20">
                    <span className="text-[10px] text-white font-black">G</span>
                  </div>
                  <span className="text-white text-xs font-black tracking-wider">GGAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Actions */}
        <div className="w-full flex flex-col items-center gap-8 max-w-sm mx-auto">
          <div className="text-center space-y-4 px-2">
            <h1 className="text-white tracking-tighter text-4xl md:text-5xl font-black leading-[0.95]">
              Inversiones en <br/>
              <span className="text-primary italic">Tiempo Real</span>
            </h1>
            <p className="text-gray-400 text-base font-medium leading-relaxed">
              Gestiona tu portafolio de acciones de EE. UU. y Argentina en un solo lugar con inteligencia artificial.
            </p>
          </div>

          <div className="w-full space-y-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full group relative cursor-pointer flex items-center justify-center rounded-[2rem] h-16 px-8 bg-primary hover:bg-[#0fd650] transition-all duration-300 shadow-[0_10px_30px_rgba(19,236,91,0.3)] hover:shadow-[0_15px_40px_rgba(19,236,91,0.5)] active:scale-[0.98]"
            >
              <span className="text-background-dark text-lg font-black leading-normal tracking-wide mr-3">Comenzar Ahora</span>
              <span className="material-symbols-outlined text-background-dark transition-transform group-hover:translate-x-2 font-black">arrow_forward</span>
            </button>
            <button 
              onClick={onLogin}
              className="w-full cursor-pointer flex items-center justify-center rounded-[2rem] h-14 px-8 bg-transparent border border-white/10 hover:bg-white/5 transition-colors text-white font-black text-sm uppercase tracking-widest"
            >
              Ya tengo cuenta
            </button>
          </div>

          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.1em] text-center pt-4">
            © 2024 Germann Inversiones • <a className="underline hover:text-primary transition-colors" href="#">Privacidad</a>
          </div>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="fixed bottom-2 w-full flex justify-center z-20 pointer-events-none lg:hidden">
        <div className="w-[134px] h-[5px] bg-white rounded-full opacity-10"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
