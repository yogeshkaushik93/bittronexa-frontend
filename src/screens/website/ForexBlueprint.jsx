import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Coins,
  BarChart3,
  Shield,
  MapPin,
  Trophy,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function ForexBlueprint() {
  const containerRef = useRef(null);

  const titleRef = useRef(null);
  const flowRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const flowInView = useInView(flowRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
              opacity: Math.random() * 0.3 + 0.2
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

        {/* TITLE */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 max-w-[90%] mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400">
              The Arbitrage Income Blueprint
            </span>
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-gray-400 font-light">
            A simple system to earn from trading, teams & leadership growth.
          </p>
        </motion.div>

        {/* FLOW SECTION */}
        <motion.div
          ref={flowRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={flowInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto mb-16 sm:mb-24"
        >
          <div className="hidden lg:flex items-center justify-center gap-12">

            {/* JOIN */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-2xl shadow-2xl border-2 border-green-400 min-w-[300px]">
                <Sparkles className="w-10 h-10 text-white mb-3 mx-auto" />
                <h3 className="text-3xl font-black text-white text-center">START</h3>
                <div className="mt-4 space-y-2 text-xl text-green-100">
                  <p>• Trading Account</p>
                  <p>• Arbitrage Access</p>
                </div>
              </div>
              <ArrowRight className="absolute -right-10 top-1/2 -translate-y-1/2 w-12 h-12 text-green-400" />
            </div>

            {/* FOLLOW */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 rounded-2xl shadow-2xl border-2 border-emerald-400 min-w-[240px]">
                <MapPin className="w-10 h-10 text-white mb-3 mx-auto" />
                <h3 className="text-3xl font-black text-white text-center">TRADE</h3>
                <div className="mt-4 space-y-2 text-xl text-emerald-100">
                  <p>• Automated System</p>
                  <p>• Risk Control</p>
                </div>
              </div>
              <ArrowRight className="absolute -right-10 top-1/2 -translate-y-1/2 w-12 h-12 text-emerald-400" />
            </div>

            {/* PROFIT */}
            <div>
              <div className="bg-gradient-to-br from-lime-600 to-green-600 p-8 rounded-2xl shadow-2xl border-2 border-lime-400 min-w-[240px]">
                <Trophy className="w-10 h-10 text-white mb-3 mx-auto" />
                <h3 className="text-3xl font-black text-white text-center">EARN</h3>
                <Zap className="w-16 h-16 text-lime-300 mx-auto mt-4" />
              </div>
            </div>

          </div>
        </motion.div>

        {/* DETAIL CARDS */}
        <motion.div
          ref={cardsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[90%] mx-auto mb-16"
        >

          {/* ACCESS */}
          <div className="bg-slate-900/80 rounded-3xl p-8 border-2 border-green-500/30">
            <h3 className="text-3xl font-black text-green-400 mb-6 text-center">
              Trading Access
            </h3>
            {[
              { icon: TrendingUp, text: 'Arbitrage Trading', desc: 'Multi-market price advantage' },
              { icon: Coins, text: 'Daily Trading Profit', desc: 'System-calculated earnings' },
              { icon: BarChart3, text: 'Live Dashboard', desc: 'Track trades & income' }
            ].map((i, idx) => (
              <div key={idx} className="flex gap-3 text-gray-300 mb-4">
                <i.icon className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-xl font-semibold">{i.text}</p>
                  <p className="text-gray-400">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SYSTEM */}
          <div className="bg-slate-900/80 rounded-3xl p-8 border-2 border-emerald-500/30">
            <h3 className="text-3xl font-black text-emerald-400 mb-6 text-center">
              Income System
            </h3>
            {[
              { icon: DollarSign, text: '8 Income Streams', desc: 'Trading, Team & Rewards' },
              { icon: Shield, text: 'Risk Management', desc: 'Capital protection rules' },
              { icon: MapPin, text: 'Automation', desc: 'No manual execution' }
            ].map((i, idx) => (
              <div key={idx} className="flex gap-3 text-gray-300 mb-4">
                <i.icon className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-xl font-semibold">{i.text}</p>
                  <p className="text-gray-400">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RESULTS */}
          <div className="bg-slate-900/80 rounded-3xl p-8 border-2 border-lime-500/30 text-center">
            <Trophy className="w-28 h-28 text-lime-400 mx-auto mb-4" />
            <h3 className="text-3xl font-black text-lime-400 mb-2">
              Scale & Lead
            </h3>
            <p className="text-gray-300 text-xl">
              Grow from trader to leader and unlock rewards
            </p>
          </div>

        </motion.div>

        {/* CTA */}
        <motion.div ref={buttonRef} className="flex justify-center">
          <button className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white text-xl font-black py-5 px-16 rounded-full shadow-2xl border-2 border-green-400 flex items-center gap-3">
            Get Started Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
