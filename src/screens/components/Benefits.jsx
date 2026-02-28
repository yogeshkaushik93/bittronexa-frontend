// import Arrow from "../assets/svg/Arrow";
// import ClipPath from "../assets/svg/ClipPath";
// import { benefits } from "../constants";
// import { GradientLight } from "./design/Benefits";
// import Heading from "./Heading";
// import Section from "./Section";
// import { curve } from "../assets";

// const Benefits = () => {
//   return (
//     <Section id="features">
//       <div className="container relative z-2">
//         <Heading
//           className=""
//           title={
//             <>
//               Chat Smarter, Not Harder with{" "}
//               <span className="inline-block relative font-semibold">
//                 Nexo Invest
//                 <img
//                   src={curve}
//                   className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
//                   width={624}
//                   height={28}
//                   alt="Curve"
//                 />
//               </span>
//             </>
//           }
//         />

//         <div className="flex flex-wrap gap-10 mb-10">
//           {benefits.map((benefit) => (
//             <div
//               className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
//               style={{
//                 backgroundImage: `url(${benefit.backgroundUrl})`,
//               }}
//               key={benefit.id}
//             >
//               <div className="relative z-2 flex flex-col min-h-[24rem] p-[2.4rem] pointer-events-none">
//                 <h5 className="h5 mb-5">{benefit.title}</h5>
//                 <p className="body-2 mb-6 text-n-3">{benefit.text}</p>
//                 <div className="flex items-center mt-auto">
//                   <img
//                     src={benefit.iconUrl}
//                     // width={48}
//                     className="w-20"
//                     // height={48}
//                     alt={benefit.title}
//                   />

//                   <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
//                     Explore more
//                   </p>
//                   <Arrow />
//                 </div>
//               </div>

//               {benefit.light && <GradientLight />}

//               <div
//                 className="absolute inset-0.5 bg-n-8"
//                 style={{ clipPath: "url(#benefits)" }}
//               >
//                 <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
//                   {benefit.imageUrl && (
//                     <img
//                       src={benefit.imageUrl}
//                       width={380}
//                       height={362}
//                       alt={benefit.title}
//                       className="w-full h-full object-cover"
//                     />
//                   )}
//                 </div>
//               </div>

//               <ClipPath />
//             </div>
//           ))}
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default Benefits;    



// import React from 'react'

// const Benefits = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Benefits




// import React from 'react'

// const Benefits = () => {
//   const signals = [
//     {
//       pair: "US30",
//       type: "SELL",
//       entry: "45715.20",
//       profit: "254",
//       sl: "45825.20",
//       tp: "45415.20"
//     },
//     {
//       pair: "US30",
//       type: "SELL",
//       entry: "46444.20",
//       profit: "249",
//       sl: "46554.20",
//       tp: "46144.20"
//     },
//     {
//       pair: "XAUUSD",
//       type: "SELL",
//       entry: "3983",
//       profit: "187",
//       sl: "3991.0",
//       tp: "3959.0"
//     },
//     {
//       pair: "XAUUSD",
//       type: "BUY",
//       entry: "4193.6",
//       profit: "187",
//       sl: "4180.0",
//       tp: "4212.0"
//     }
//   ]

//   return (
//     <div className="bg-black py-16 px-6 lg:px-12">
//       <div className="max-w-full w-[90%]   mx-auto">
//         {/* Heading */}
//         <h2 className="text-5xl lg:text-6xl font-bold  text-green-400 text-center mb-3">
//           Join 50,000+ Members Benefitting from Our Free Signals
//         </h2>
        
//         {/* Subheading */}
//         <p className="text-gray-400 text-center text-2xl mb-12">
//           Explore Our Latest Free Signal Results
//         </p>

//         {/* Signals Container - Horizontal Scroll */}
//         <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-8 overflow-x-auto">
//           <div className="flex justify-between min-w-max">
//             {/* Signal Cards */}
//             {signals.map((signal, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col gap-3 text-center border-r border-gray-700 pr-8 last:border-r-0"
//               >
//                 {/* Pair Name */}
//                 <div className="text-white font-bold text-2xl">
//                   {signal.pair}
//                 </div>

//                 {/* Signal Type and Entry */}
//                 <div className="flex items-center gap-3 justify-center">
//                   <span className={`font-bold text-2xl ${signal.type === 'SELL' ? 'text-red-500' : 'text-blue-400'}`}>
//                     {signal.type}
//                   </span>
//                   <span className="text-gray-300 text-2xl font-semibold">
//                     {signal.entry}
//                   </span>
//                 </div>

//                 {/* Profit */}
//                 <div>
//                   <span className="text-green-400 font-bold text-2xl">
//                     Profit {signal.profit}
//                   </span>
//                 </div>

//                 {/* SL */}
//                 <div className="text-lg">
//                   <span className="text-gray-500">SL</span>
//                   <span className={`ml-2 ${signal.type === 'SELL' ? 'text-red-500' : 'text-gray-300'}`}>
//                     {signal.sl}
//                   </span>
//                 </div>

//                 {/* TP */}
//                 <div className="text-lg">
//                   <span className="text-gray-500">TP</span>
//                   <span className="text-blue-400 ml-2">
//                     {signal.tp}
//                   </span>
//                 </div>
//               </div>
//             ))}

//             {/* Check Performance Button */}
//             <div className="flex-shrink-0 ml-4">
//               <button className="bg-teal-700 hover:bg-teal-600 text-white font-bold px-10 py-6 rounded-lg transition-colors text-center whitespace-nowrap   flex flex-col items-center ">
//                 <span className="text-xl">Check Performance</span>
//                 <span className="text-xl"></span>
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Benefits



import React from "react";

const Benefits = () => {
  const benefits = [
    {
      title: "Professional Arbitrage Trading",
      desc: "Automated trading system that captures real-time price differences across global crypto markets.",
    },
    {
      title: "Fully Automated & Transparent",
      desc: "Algorithm-driven execution with system-based calculations and real-time income tracking.",
    },
    {
      title: "8 Powerful Income Streams",
      desc: "Level Income, Matching Income, Club Income, Achievement Income, Trading Profit, Trading Level Income, Reward Income & IB Income.",
    },
    {
      title: "Leadership & Rank Growth Model",
      desc: "Structured leadership system from Aspire Trader to Royal Crown Ambassador with clear growth milestones.",
    },
    {
      title: "Risk-Controlled Trading System",
      desc: "Smart capital allocation, position management and risk controls designed for long-term sustainability.",
    },
    {
      title: "Global Business Expansion",
      desc: "Build teams worldwide and earn from global volume without location or time-zone dependency.",
    },
  ];

  return (
    <div className="bg-black py-16 px-6 lg:px-12">
      <div className="max-w-[90%] mx-auto">

        {/* Heading */}
        <h2 className="text-5xl lg:text-6xl font-bold text-green-400 text-center mb-4">
          Why Join Bittronexa
        </h2>

        <p className="text-gray-400 text-center text-2xl mb-12">
          A smart arbitrage trading ecosystem designed for scalable income, leadership growth and global expansion
        </p>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 hover:border-green-500 transition"
            >
              <h3 className="text-white font-bold text-2xl mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-teal-700 hover:bg-teal-600 text-white font-bold px-10 py-5 rounded-lg text-xl transition-colors">
            View Income & Leadership Plan
          </button>
        </div>

      </div>
    </div>
  );
};

export default Benefits;
