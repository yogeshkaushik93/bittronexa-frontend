// import React, { useRef, useState } from 'react';
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
// import { DollarSign, TrendingUp, Coins, BarChart3, Shield, MapPin, Trophy, Sparkles, ArrowRight, Zap } from 'lucide-react';

// export default function ForexBlueprint() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const titleRef = useRef(null);
//   const flowRef = useRef(null);
//   const cardsRef = useRef(null);
//   const buttonRef = useRef(null);

//   const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
//   const flowInView = useInView(flowRef, { once: true, amount: 0.3 });
//   const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
//   const buttonInView = useInView(buttonRef, { once: true, amount: 0.5 });

//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div className="min-h-screen overflow-x-hidden">
//       {/* Optimized background - green particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-emerald-400 rounded-full"
//             initial={{ 
//               x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
//               y: -20,
//               opacity: Math.random() * 0.3 + 0.2
//             }}
//             animate={{
//               y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
//             }}
//             transition={{
//               duration: Math.random() * 15 + 15,
//               repeat: Infinity,
//               ease: "linear",
//               delay: Math.random() * 10
//             }}
//           />
//         ))}
//       </div>

//       <div ref={containerRef} className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
//         {/* Title Section */}
//         <motion.div
//           ref={titleRef}
//           initial={{ opacity: 0, y: 50 }}
//           animate={titleInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="text-center mb-12 sm:mb-16 max-w-[90%] mx-auto"
//         >
//           <motion.h1 
//             className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight"
//           >
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400">
//               The Forex Growth Management Blueprint
//             </span>
//           </motion.h1>
//           <motion.p 
//             className="text-base sm:text-xl lg:text-2xl text-gray-400 font-light"
//             initial={{ opacity: 0 }}
//             animate={titleInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             Discover our proven roadmap to boost your trading profits as you scale.
//           </motion.p>
//         </motion.div>

//         {/* Flow Diagram - Green Theme */}
//         <motion.div
//           ref={flowRef}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={flowInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.8 }}
//           className="max-w-6xl mx-auto mb-16 sm:mb-24"
//         >
//           {/* Desktop Flow */}
//           <div className="hidden lg:flex items-center justify-center gap-12">
//             {/* JOIN Box */}
//             <motion.div
//               initial={{ x: -100, opacity: 0 }}
//               animate={flowInView ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="relative"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-2xl shadow-2xl border-2 border-green-400 min-w-[300px]"
//               >
//                 <Sparkles className="w-10 h-10 text-white mb-3 mx-auto" />
//                 <h3 className="text-3xl font-black text-white text-center">JOIN</h3>
//                 <div className="mt-4 space-y-2 text-xl text-green-100">
//                   <p>• Forex VIP</p>
//                   <p>• Gold VIP</p>
//                   {/* <p>• Indices VIP</p> */}
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="absolute -right-6 top-1/2 -translate-y-1/2"
//                 animate={{ x: [0, 8, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <ArrowRight className="w-12 h-12 text-green-400" />
//               </motion.div>
//             </motion.div>

//             {/* FOLLOW Box */}
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={flowInView ? { y: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               className="relative"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 rounded-2xl shadow-2xl border-2 border-emerald-400 min-w-[200px]"
//               >
//                 <MapPin className="w-10 h-10 text-white mb-3 mx-auto" />
//                 <h3 className="text-3xl font-black text-white text-center">FOLLOW</h3>
//                 <div className="mt-4 space-y-2 text-xl text-emerald-100">
//                   <p>• Risk Management</p>
//                   <p>• Trade Guidelines</p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="absolute -right-6 top-1/2 -translate-y-1/2"
//                 animate={{ x: [0, 8, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
//               >
//                 <ArrowRight className="w-12 h-12 text-emerald-400" />
//               </motion.div>
//             </motion.div>

//             {/* PROFIT Box */}
//             <motion.div
//               initial={{ x: 100, opacity: 0 }}
//               animate={flowInView ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.6, duration: 0.6 }}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 className="bg-gradient-to-br from-lime-600 to-green-600 p-8 rounded-2xl shadow-2xl border-2 border-lime-400 min-w-[200px]"
//               >
//                 <Trophy className="w-10 h-10 text-white mb-3 mx-auto" />
//                 <h3 className="text-3xl font-black text-white text-center">PROFIT</h3>
//                 <motion.div
//                   animate={{ rotate: [0, 5, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="mt-4"
//                 >
//                   <Zap className="w-16 h-16 text-lime-300 mx-auto" />
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Mobile Flow */}
//           <div className="lg:hidden flex flex-col items-center gap-6">
//             {/* JOIN Box */}
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={flowInView ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="w-full max-w-sm"
//             >
//               <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-2xl shadow-2xl border-2 border-green-400">
//                 <Sparkles className="w-8 h-8 text-white mb-2 mx-auto" />
//                 <h3 className="text-2xl font-black text-white text-center">JOIN</h3>
//                 <div className="mt-3 space-y-1 text-xl text-green-100 text-center">
//                   <p>• Forex VIP • Gold VIP • Indices VIP</p>
//                 </div>
//               </div>
//               <motion.div
//                 className="flex justify-center my-3"
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <ArrowRight className="w-10 h-10 text-green-400 rotate-90" />
//               </motion.div>
//             </motion.div>

//             {/* FOLLOW Box */}
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               animate={flowInView ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               className="w-full max-w-sm"
//             >
//               <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-6 rounded-2xl shadow-2xl border-2 border-emerald-400">
//                 <MapPin className="w-8 h-8 text-white mb-2 mx-auto" />
//                 <h3 className="text-2xl font-black text-white text-center">FOLLOW</h3>
//                 <div className="mt-3 space-y-1 text-sm text-emerald-100 text-center">
//                   <p>• Risk Management • Trade Guidelines</p>
//                 </div>
//               </div>
//               <motion.div
//                 className="flex justify-center my-3"
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
//               >
//                 <ArrowRight className="w-10 h-10 text-emerald-400 rotate-90" />
//               </motion.div>
//             </motion.div>

//             {/* PROFIT Box */}
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={flowInView ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.6, duration: 0.6 }}
//               className="w-full max-w-sm"
//             >
//               <div className="bg-gradient-to-br from-lime-600 to-green-600 p-6 rounded-2xl shadow-2xl border-2 border-lime-400">
//                 <Trophy className="w-8 h-8 text-white mb-2 mx-auto" />
//                 <h3 className="text-2xl font-black text-white text-center">PROFIT</h3>
//                 <motion.div
//                   animate={{ rotate: [0, 5, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="mt-3"
//                 >
//                   <Zap className="w-12 h-12 text-lime-300 mx-auto" />
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Detailed Cards Grid - Green Theme */}
//         <motion.div
//           ref={cardsRef}
//           initial={{ opacity: 0, y: 50 }}
//           animate={cardsInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[90%] w-full mx-auto mb-12 sm:mb-16"
//         >
//           {/* JOIN Details Card */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             onHoverStart={() => setHoveredCard('join')}
//             onHoverEnd={() => setHoveredCard(null)}
//             className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border-2 border-green-500/30 shadow-2xl relative overflow-hidden"
//           >
//             <motion.div
//               animate={hoveredCard === 'join' ? { opacity: 0.1 } : { opacity: 0.05 }}
//               className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600"
//             />
            
//             <div className="relative">
//               <h3 className="text-2xl sm:text-3xl font-black text-green-400 mb-6 text-center">
//                 VIP Channels Access
//               </h3>
              
//               <div className="space-y-4">
//                 {[
//                   { icon: TrendingUp, text: 'Forex VIP Channel', desc: 'Real-time forex signals' },
//                   { icon: Coins, text: 'Gold VIP Channel', desc: 'Premium gold trades' },
//                   { icon: BarChart3, text: 'Indices VIP Channel', desc: 'Market indices analysis' }
//                 ].map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ x: -30, opacity: 0 }}
//                     animate={cardsInView ? { x: 0, opacity: 1 } : {}}
//                     transition={{ delay: 0.1 * idx }}
//                     className="flex items-start space-x-3 text-gray-200 bg-slate-800/60 p-4 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-colors"
//                   >
//                     <item.icon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="font-semibold text-2xl">{item.text}</p>
//                       <p className="text-xl text-gray-400">{item.desc}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* FOLLOW Details Card */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             onHoverStart={() => setHoveredCard('follow')}
//             onHoverEnd={() => setHoveredCard(null)}
//             className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden"
//           >
//             <motion.div
//               animate={hoveredCard === 'follow' ? { opacity: 0.1 } : { opacity: 0.05 }}
//               className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600"
//             />
            
//             <div className="relative">
//               <h3 className="text-2xl sm:text-3xl font-black text-emerald-400 mb-6 text-center">
//                 Trading Guidelines
//               </h3>
              
//               <div className="space-y-4">
//                 {[
//                   { icon: Shield, text: 'Risk Management', desc: 'Protect your capital' },
//                   { icon: MapPin, text: 'Trade Guidelines', desc: 'Step-by-step process' }
//                 ].map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ x: -30, opacity: 0 }}
//                     animate={cardsInView ? { x: 0, opacity: 1 } : {}}
//                     transition={{ delay: 0.1 * idx }}
//                     className="flex items-start space-x-3 text-gray-200 bg-slate-800/60 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-400/40 transition-colors"
//                   >
//                     <item.icon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="font-semibold text-2xl">{item.text}</p>
//                       <p className="text-xl text-gray-400 ">{item.desc}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* PROFIT Details Card */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             onHoverStart={() => setHoveredCard('profit')}
//             onHoverEnd={() => setHoveredCard(null)}
//             className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border-2 border-lime-500/30 shadow-2xl relative overflow-hidden"
//           >
//             <motion.div
//               animate={hoveredCard === 'profit' ? { opacity: 0.1 } : { opacity: 0.05 }}
//               className="absolute inset-0 bg-gradient-to-br from-lime-500 to-green-600"
//             />
            
//             <div className="relative">
//               <h3 className="text-2xl sm:text-3xl font-black text-lime-400 mb-6 text-center">
//                 Achieve Results
//               </h3>
              
//               <div className="flex flex-col items-center justify-center h-48">
//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.1, 1],
//                     rotate: [0, 5, -5, 0]
//                   }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                 >
//                   <Trophy className="w-32 h-32 text-lime-500 drop-shadow-[0_0_20px_rgba(163,230,53,0.5)]" />
//                 </motion.div>
//                 <p className="text-gray-300 text-center mt-4 text-2xl font-semibold">
//                   Consistent Profits
//                 </p>
//                 <p className="text-gray-400 text-center text-xl mt-2">
//                   Follow the blueprint to success
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* CTA Button - Green Theme */}
//         <motion.div
//           ref={buttonRef}
//           initial={{ opacity: 0, y: 30 }}
//           animate={buttonInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="flex justify-center"
//         >
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white text-lg sm:text-xl font-black py-4 sm:py-5 px-10 sm:px-16 rounded-full shadow-2xl border-2 border-green-400 relative overflow-hidden group"
//           >
//             <span className="relative z-10 flex items-center gap-3">
//               Get Started Now
//               <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </span>
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500"
//               initial={{ x: "-100%" }}
//               whileHover={{ x: "0%" }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.button>
//         </motion.div>
//       </div>
//     </div>
//   );
// }




import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleRef = useRef(null);
  const flowRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const flowInView = useInView(flowRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const buttonInView = useInView(buttonRef, { once: true, amount: 0.5 });

  const [hoveredCard, setHoveredCard] = useState(null);

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
