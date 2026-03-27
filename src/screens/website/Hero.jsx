import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px]">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 600 600">
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fb923c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fdba74" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <circle
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="url(#orangeGradient)"
              strokeWidth="2"
              strokeDasharray="40 20"
            />
          </svg>
        </div>

        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px]">
          <svg className="w-full h-full animate-spin-reverse" viewBox="0 0 700 700">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle
              cx="350"
              cy="350"
              r="330"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeDasharray="30 30"
            />
          </svg>
        </div>

        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 md:w-[90%] w-full mx-auto px-8 lg:px-16 py-12 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT CONTENT */}
          <div className="space-y-10">
            <div className="inline-flex mt-10 items-center gap-4 bg-gradient-to-r from-green-500/20 to-green-600/10 border-2 border-green-500/40 rounded-full px-8 py-4 animate-bounce shadow-lg shadow-green-500/20">
              <span className="text-5xl animate-pulse">⚡</span>
              <span className="text-green-400 font-bold text-2xl tracking-widest">
                SMART ARBITRAGE ECOSYSTEM
              </span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-white animate-fade-in-up">
                Automated Arbitrage Trading
              </span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
                Earn From Trading, Teams & Leadership
              </span>
            </h1>

            <p className="text-gray-300 text-3xl leading-relaxed animate-fade-in-up animation-delay-400 max-w-4xl">
              Our platform operates an advanced <span className="text-green-400 font-semibold">
              arbitrage trading system</span> that captures real-time price
              differences across global markets.
              <br /><br />
              Along with daily trading profit, members earn through
              <span className="text-green-400"> Level Income</span>,
              <span className="text-green-400"> Matching Income</span>,
              <span className="text-green-400"> Club & Achievement Income</span>,
              <span className="text-green-400"> Trading Level & IB Income</span>,
              and structured <span className="text-green-400"> Reward Programs</span>.
            </p>

            <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-600">
              <button className="bg-green-400 hover:bg-green-500 text-black font-bold px-10 py-4 rounded-xl text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 shadow-lg">
                Start Trading
              </button>
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400/10 font-bold px-10 py-4 rounded-xl text-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20">
                View Income Plan
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (unchanged visuals) */}
          <div className="relative h-[400px] animate-fade-in-right">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <img
                src="https://static.vecteezy.com/system/resources/previews/026/571/287/non_2x/small-robot-assistant-full-length-free-photo.jpg  "
                alt="Trader"
                className="relative rounded-full w-[600px] h-[400px] object-cover border-4 border-orange-500/60 shadow-2xl shadow-orange-500/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CHAT BUTTON */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-blue-500 hover:bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce">
          <span className="text-white text-2xl">💬</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 1.2s ease-out forwards; }
        .animate-spin-slow { animation: spinSlow 25s linear infinite; }
        .animate-spin-reverse { animation: spinReverse 30s linear infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default Hero;
