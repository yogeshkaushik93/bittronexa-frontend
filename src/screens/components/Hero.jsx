

// import React from 'react';

// const Hero = () => {
//   return (
//     <div className="relative min-h-screen bg-black overflow-hidden">
//       {/* Animated Background with Rotating Circles */}
//       <div className="absolute inset-0">
//         {/* Main Rotating Circle Border - Orange/Gold */}
//         <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px]">
//           <svg className="w-full h-full animate-spin-slow" viewBox="0 0 600 600">
//             <defs>
//               <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
//                 <stop offset="50%" stopColor="#fb923c" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#fdba74" stopOpacity="0.4" />
//               </linearGradient>
//             </defs>
//             <circle 
//               cx="300" 
//               cy="300" 
//               r="280" 
//               fill="none" 
//               stroke="url(#orangeGradient)" 
//               strokeWidth="2"
//               strokeDasharray="40 20"
//             />
//           </svg>
          
//           {/* Small Triangle Markers on Circle */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-orange-500 animate-pulse"></div>
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-orange-500 animate-pulse animation-delay-500"></div>
//         </div>

//         {/* Second Rotating Circle - Reverse Direction */}
//         <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px]">
//           <svg className="w-full h-full animate-spin-reverse" viewBox="0 0 700 700">
//             <defs>
//               <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
//                 <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
//               </linearGradient>
//             </defs>
//             <circle 
//               cx="350" 
//               cy="350" 
//               r="330" 
//               fill="none" 
//               stroke="url(#goldGradient)" 
//               strokeWidth="1.5"
//               strokeDasharray="30 30"
//             />
//           </svg>
//         </div>

//         {/* Glowing Center Effect */}
//         <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        
//         {/* Small Glowing Dots/Stars */}
//         <div className="absolute top-[30%] right-[35%] w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
//         <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-yellow-400 rounded-full animate-ping animation-delay-300"></div>
//         <div className="absolute top-[45%] right-[40%] w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse"></div>
//       </div>

//       <div className="relative z-10 md:w-[90%] w-full mx-auto px-8 lg:px-16 py-12 flex items-center min-h-screen">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
//           {/* Left Content */}
//           <div className="space-y-10">
//             {/* Halloween Badge */}
//             <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500/20 to-green-600/10 border-2 border-green-500/40 rounded-full px-8 py-4 animate-bounce shadow-lg shadow-green-500/20">
//               <span className="text-5xl animate-pulse">🎃</span>
//               <span className="text-green-400 font-bold text-2xl tracking-widest">FRIGHT NIGHT SALE</span>
//             </div>

//             {/* Main Heading with Animation */}
//             <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
//               <span className="block text-white animate-fade-in-up">Harness the Power of AI to Effortlessly</span>
//               <span className="block text-green-400 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Grow Your Income.</span>
//             </h1>

//             {/* Description - 1.5x larger */}
//             <p className="text-gray-300 text-3xl leading-relaxed animate-fade-in-up animation-delay-400 max-w-4xl">
//              The Smart, Secure, and Transparent Financial Product for Every Investor – No Prior Experience Required.
//             </p>
//             <p className="text-gray-300 text-3xl leading-relaxed animate-fade-in-up animation-delay-400 max-w-4xl">
//           Start Your Financial Journey Today
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-6  animate-fade-in-up animation-delay-600">
//               <button className="bg-green-400 hover:bg-green-500 text-black font-bold px-10 py-1 rounded-xl text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 shadow-lg">
//                 Get VIP Signals
//               </button>
//               <button className="border-2 border-green-400 text-green-400 hover:bg-green-400/10 font-bold px-10 py-4 rounded-xl text-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20">
//                 Test Free Signals
//               </button>
//             </div>
//           </div>

//           {/* Right Content - Image with Cards */}
//           <div className="relative h-[500px] animate-fade-in-right">
//             {/* Rotating Circle Border Behind Image */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
//               <svg className="w-full h-full animate-spin-slow" viewBox="0 0 550 550">
//                 <defs>
//                   <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
//                     <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
//                     <stop offset="100%" stopColor="#fb923c" stopOpacity="0.5" />
//                   </linearGradient>
//                 </defs>
//                 <circle 
//                   cx="275" 
//                   cy="275" 
//                   r="260" 
//                   fill="none" 
//                   stroke="url(#circleGradient)" 
//                   strokeWidth="3"
//                   strokeDasharray="50 20"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               {/* Triangle markers */}
//               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
//                 <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-orange-500"></div>
//               </div>
//             </div>

//             {/* Main Image Container with Glow */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              
//               <img 
//                 src="https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg" 
//                 alt="Trader"
//                 className="relative rounded-full w-[400px] h-[400px] object-cover border-4 border-orange-500/60 shadow-2xl shadow-orange-500/40"
//               />
//             </div>

//             {/* Floating Cards */}
//             {/* Forex Signal Card */}
//             <div className="absolute top-8 left-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-2">Forex Signal</h3>
//               <p className="text-gray-400 text-base mb-3">Premium Currency Signals</p>
//               <p className="text-green-400 font-bold text-5xl mb-1">3000+</p>
//               <p className="text-gray-300 text-lg">Pips Monthly</p>
//             </div>

//             {/* Gold Signal Card */}
//             <div className="absolute top-8 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float animation-delay-200 hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-2">Gold Signal</h3>
//               <p className="text-gray-400 text-base mb-3">Exclusive Gold Trades</p>
//               <p className="text-green-400 font-bold text-5xl mb-1">4000+</p>
//               <p className="text-gray-300 text-lg">Pips Monthly</p>
//             </div>

//             {/* Indices Signal Card */}
//             <div className="absolute bottom-8 left-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float animation-delay-400 hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-2">Indices Signal</h3>
//               <p className="text-gray-400 text-base mb-3">Elite Indices Signals</p>
//               <p className="text-green-400 font-bold text-5xl mb-1">4500+</p>
//               <p className="text-gray-300 text-lg">Pips Monthly</p>
//             </div>

//             {/* Signal Copier Card */}
//             <div className="absolute bottom-8 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float animation-delay-600 text-center hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-4">Signal Copier</h3>
//               <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-400/50">
//                 <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//                 </svg>
//               </div>
//               <p className="text-white font-bold text-xl">Download</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chat Button */}
//       <div className="fixed bottom-8 right-8 z-50">
//         <button className="bg-blue-500 hover:bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce hover:scale-110 transition-transform">
//           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
//           </svg>
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInRight {
//           from {
//             opacity: 0;
//             transform: translateX(60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-25px);
//           }
//         }

//         @keyframes spinSlow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes spinReverse {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 1s ease-out forwards;
//         }

//         .animate-fade-in-right {
//           animation: fadeInRight 1.2s ease-out forwards;
//         }

//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }

//         .animate-spin-slow {
//           animation: spinSlow 25s linear infinite;
//         }

//         .animate-spin-reverse {
//           animation: spinReverse 30s linear infinite;
//         }

//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }

//         .animation-delay-300 {
//           animation-delay: 0.3s;
//         }

//         .animation-delay-400 {
//           animation-delay: 0.4s;
//         }

//         .animation-delay-500 {
//           animation-delay: 0.5s;
//         }

//         .animation-delay-600 {
//           animation-delay: 0.6s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;




// import React from 'react';

// const Hero = () => {
//   return (
//     <div className="relative min-h-screen bg-black overflow-hidden">
//       {/* Animated Background with Rotating Circles */}
//       <div className="absolute inset-0">
//         {/* Main Rotating Circle Border - Orange/Gold */}
//         <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px]">
//           <svg className="w-full h-full animate-spin-slow" viewBox="0 0 600 600">
//             <defs>
//               <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
//                 <stop offset="50%" stopColor="#fb923c" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#fdba74" stopOpacity="0.4" />
//               </linearGradient>
//             </defs>
//             <circle 
//               cx="300" 
//               cy="300" 
//               r="280" 
//               fill="none" 
//               stroke="url(#orangeGradient)" 
//               strokeWidth="2"
//               strokeDasharray="40 20"
//             />
//           </svg>

//           {/* Triangle Markers */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-orange-500 animate-pulse"></div>
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-orange-500 animate-pulse animation-delay-500"></div>
//         </div>

//         {/* Second Rotating Circle */}
//         <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px]">
//           <svg className="w-full h-full animate-spin-reverse" viewBox="0 0 700 700">
//             <defs>
//               <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
//                 <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
//               </linearGradient>
//             </defs>
//             <circle 
//               cx="350" 
//               cy="350" 
//               r="330" 
//               fill="none" 
//               stroke="url(#goldGradient)" 
//               strokeWidth="1.5"
//               strokeDasharray="30 30"
//             />
//           </svg>
//         </div>

//         {/* Glowing Center Effect */}
//         <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>

//         {/* Small Stars */}
//         <div className="absolute top-[30%] right-[35%] w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
//         <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-yellow-400 rounded-full animate-ping animation-delay-300"></div>
//         <div className="absolute top-[45%] right-[40%] w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse"></div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="relative z-10 md:w-[90%] w-full mx-auto px-8 lg:px-16 py-12 flex items-center min-h-screen">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
//           {/* LEFT SIDE CONTENT */}
//           <div className="space-y-10">
//             {/* Promo Badge */}
//             <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500/20 to-green-600/10 border-2 border-green-500/40 rounded-full px-8 py-4 animate-bounce shadow-lg shadow-green-500/20">
//               <span className="text-5xl animate-pulse">🎃</span>
//               <span className="text-green-400 font-bold text-2xl tracking-widest">FRIGHT NIGHT SALE</span>
//             </div>

//             {/* MAIN HEADING UPDATED */}
//             <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
//               <span className="block text-white animate-fade-in-up">
//                 Harness Real Crypto Mining & Node Power
//               </span>
//               <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
//                 to Build Long-Term Digital Wealth
//               </span>
//             </h1>

//             {/* DESCRIPTION UPDATED */}
//             <p className="text-gray-300 text-3xl leading-relaxed animate-fade-in-up animation-delay-400 max-w-4xl">
//               MineCryptos combines real crypto mining with a powerful node-based 
//               income model—allowing you to earn daily from Bitcoin, Ethereum, 
//               Dogecoin and more. Our automated mining, hybrid affiliate system, 
//               and secure smart-contract framework help you grow wealth with 
//               clarity and confidence.
//             </p>


//             {/* CTA BUTTONS */}
//             <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-600">
//               <button className="bg-green-400 hover:bg-green-500 text-black font-bold px-10 py-4 rounded-xl text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 shadow-lg">
//                 Start Mining
//               </button>
//               <button className="border-2 border-green-400 text-green-400 hover:bg-green-400/10 font-bold px-10 py-4 rounded-xl text-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20">
//                 Explore Node Plans
//               </button>
//             </div>
//           </div>

//           {/* RIGHT SIDE — IMAGE + FLOATING CARDS (unchanged) */}
//           <div className="relative h-[500px] animate-fade-in-right">

//             {/* Rotating Circle */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
//               <svg className="w-full h-full animate-spin-slow" viewBox="0 0 550 550">
//                 <defs>
//                   <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
//                     <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
//                     <stop offset="100%" stopColor="#fb923c" stopOpacity="0.5" />
//                   </linearGradient>
//                 </defs>
//                 <circle 
//                   cx="275" 
//                   cy="275" 
//                   r="260" 
//                   fill="none" 
//                   stroke="url(#circleGradient)" 
//                   strokeWidth="3"
//                   strokeDasharray="50 20"
//                   strokeLinecap="round"
//                 />
//               </svg>

//               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
//                 <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-orange-500"></div>
//               </div>
//             </div>

//             {/* Profile Img */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              
//               <img 
//                 src="https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg" 
//                 alt="Trader"
//                 className="relative rounded-full w-[400px] h-[400px] object-cover border-4 border-orange-500/60 shadow-2xl shadow-orange-500/40"
//               />
//             </div>

//             {/* FLOATING CARDS */}
//             <div className="absolute top-8 left-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-2">Forex Signal</h3>
//               <p className="text-gray-400 text-base mb-3">Premium Currency Signals</p>
//               <p className="text-green-400 font-bold text-5xl mb-1">3000+</p>
//               <p className="text-gray-300 text-lg">Pips Monthly</p>
//             </div>

//             <div className="absolute top-8 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float animation-delay-200 hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-2">Gold Signal</h3>
//               <p className="text-gray-400 text-base mb-3">Exclusive Gold Trades</p>
//               <p className="text-green-400 font-bold text-5xl mb-1">4000+</p>
//               <p className="text-gray-300 text-lg">Pips Monthly</p>
//             </div>

//             <div className="absolute bottom-8 left-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float animation-delay-400 hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-2">Indices Signal</h3>
//               <p className="text-gray-400 text-base mb-3">Elite Indices Signals</p>
//               <p className="text-green-400 font-bold text-5xl mb-1">4500+</p>
//               <p className="text-gray-300 text-lg">Pips Monthly</p>
//             </div>

//             <div className="absolute bottom-8 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 shadow-2xl shadow-orange-500/10 animate-float animation-delay-600 text-center hover:scale-105 transition-transform">
//               <h3 className="text-white font-bold text-2xl mb-4">Signal Copier</h3>
//               <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-400/50">
//                 <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//                 </svg>
//               </div>
//               <p className="text-white font-bold text-xl">Download</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CHAT BUTTON */}
//       <div className="fixed bottom-8 right-8 z-50">
//         <button className="bg-blue-500 hover:bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce hover:scale-110 transition-transform">
//           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
//           </svg>
//         </button>
//       </div>

//       {/* CUSTOM ANIMATIONS */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(40px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeInRight {
//           from { opacity: 0; transform: translateX(60px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-25px); }
//         }
//         @keyframes spinSlow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes spinReverse {
//           from { transform: rotate(360deg); }
//           to { transform: rotate(0); }
//         }

//         .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
//         .animate-fade-in-right { animation: fadeInRight 1.2s ease-out forwards; }
//         .animate-float { animation: float 3s ease-in-out infinite; }
//         .animate-spin-slow { animation: spinSlow 25s linear infinite; }
//         .animate-spin-reverse { animation: spinReverse 30s linear infinite; }

//         .animation-delay-200 { animation-delay: 0.2s; }
//         .animation-delay-300 { animation-delay: 0.3s; }
//         .animation-delay-400 { animation-delay: 0.4s; }
//         .animation-delay-500 { animation-delay: 0.5s; }
//         .animation-delay-600 { animation-delay: 0.6s; }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;




import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background with Rotating Circles */}
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
