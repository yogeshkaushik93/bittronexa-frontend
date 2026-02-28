// import React from 'react'
// import { motion } from 'framer-motion'

// const DiscoverSuccess = () => {
//   const cards = [
//     {
//       icon: "📈",
//       title: "Our Transparency",
//       description: "At SureShot FX, we champion transparency, trust, and accuracy. We openly display our trade results, offering an insight into our successful Forex signal services."
//     },
//     {
//       icon: "📊",
//       title: "Proof in Performance",
//       description: "We stand by our trade results. They're real, verifiable, and integral to showcasing our success. It's this honesty that solidifies our reputation as a trustworthy Forex signal provider."
//     },
//     {
//       icon: "🎚️",
//       title: "Trading Analysis Simplified",
//       description: "We empower clients by simplifying complex trading strategies. Our detailed analysis provides a comprehensive understanding of Forex trading, boosting your confidence and profitability."
//     },
//     {
//       icon: "📈",
//       title: "Learning Success Strategies",
//       description: "We guide clients through our complete trading plan. This knowledge-sharing approach allows you to learn and capitalize on profitable opportunities, leading to a surefire Forex trading strategy."
//     }
//   ]

//   const mediaCards = [
//     {
//       image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=400&fit=crop",
//       title: "Market Analysis",
//       description: "Deep dive into market trends"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1518066331714-f49ad69b3289?w=500&h=400&fit=crop",
//       title: "Trading Signals",
//       description: "Real-time signal delivery"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
//       title: "Expert Guidance",
//       description: "Professional trading support"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1573166768170-e368b02b4050?w=500&h=400&fit=crop",
//       title: "Success Stories",
//       description: "Client testimonials and wins"
//     }
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   }

//   const mediaVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   }

//   return (
//     <div className="bg-black min-h-screen">
//       {/* Main Section */}
//       <div className="py-20 px-6 lg:px-12">
//         <div className="max-w-[90%] w-full mx-auto">
//           {/* Heading */}
//           <motion.h2 
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-6xl lg:text-7xl font-black text-white text-center mb-6"
//           >
//             Discover Success with SureShot FX
//           </motion.h2>
          
//           {/* Subheading */}
//           <motion.p 
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-gray-200 text-center text-2xl mb-16 max-w-3xl mx-auto font-semibold"
//           >
//             Join us on your journey to smart, sustainable trading growth.
//           </motion.p>

//           {/* Cards Grid */}
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 whileHover={{ 
//                   y: -15,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className="group relative bg-gray-900/40 border border-gray-700 rounded-2xl p-8 backdrop-blur-md overflow-hidden cursor-pointer shadow-lg shadow-emerald-500/0 hover:shadow-2xl hover:shadow-emerald-500/60"
//               >
//                 {/* Main Glow Effect */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 via-emerald-500/25 to-emerald-400/30 rounded-2xl"
//                 ></motion.div>

//                 {/* Animated Border Glow */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 rounded-2xl pointer-events-none"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/60 via-emerald-500/50 to-emerald-400/60 blur-2xl"></div>
//                 </motion.div>

//                 {/* Pulsing Outer Glow */}
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   whileHover={{ opacity: 1, scale: 1.1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-emerald-500/50 to-emerald-500/20 rounded-2xl blur-3xl -z-10"
//                 ></motion.div>

//                 {/* Corner Accent - Top Right */}
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileHover={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/50 via-emerald-400/40 to-transparent rounded-bl-3xl"
//                 ></motion.div>

//                 {/* Animated Circle Glow - Left Side */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl"
//                 ></motion.div>

//                 {/* Content */}
//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <motion.div 
//                     whileHover={{ 
//                       scale: 1.2,
//                       rotate: 5,
//                       transition: { duration: 0.3 }
//                     }}
//                     className="text-5xl mb-6"
//                   >
//                     {card.icon}
//                   </motion.div>

//                   {/* Title */}
//                   <motion.h3 
//                     initial={{ color: "#fff" }}
//                     whileHover={{ color: "#4ade80" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-white font-bold text-3xl mb-4"
//                   >
//                     {card.title}
//                   </motion.h3>

//                   {/* Description */}
//                   <motion.p 
//                     initial={{ color: "#d1d5db" }}
//                     whileHover={{ color: "#e5e7eb" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-gray-300 text-lg leading-relaxed font-medium"
//                   >
//                     {card.description}
//                   </motion.p>
//                 </div>

//                 {/* Shine Effect */}
//                 <motion.div 
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "100%" }}
//                   transition={{ duration: 0.8, ease: "easeInOut" }}
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent"
//                 ></motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Media Section */}
//       <div className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black via-gray-900/20 to-black">
//         <div className="max-w-[90%] w-full mx-auto">
//           {/* Section Heading */}
//           <motion.h2 
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl lg:text-6xl font-black text-white text-center mb-4"
//           >
//             Recognized by the Leading Media Outlets
//           </motion.h2>

//           {/* Section Subheading */}
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-gray-300 text-center text-xl font-semibold mb-16"
//           >
//             As Featured On
//           </motion.p>

//           {/* Media Cards Grid */}
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {mediaCards.map((media, index) => (
//               <motion.div
//                 key={index}
//                 variants={mediaVariants}
//                 whileHover={{ 
//                   y: -20,
//                   scale: 1.08,
//                   transition: { duration: 0.3 }
//                 }}
//                 className="group relative bg-gray-900/60 border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300"
//               >
//                 {/* Image Container */}
//                 <div className="relative h-64 overflow-hidden">
//                   <motion.img
//                     src={media.image}
//                     alt={media.title}
//                     className="w-full h-full object-cover"
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                   />
                  
//                   {/* Image Overlay */}
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
//                   ></motion.div>
//                 </div>

//                 {/* Content */}
//                 <div className="relative z-10 p-6 bg-gradient-to-t from-gray-900 to-gray-900/80 backdrop-blur-md">
//                   {/* Title */}
//                   <motion.h3 
//                     initial={{ color: "#fff" }}
//                     whileHover={{ color: "#4ade80" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-white font-bold text-2xl mb-3"
//                   >
//                     {media.title}
//                   </motion.h3>

//                   {/* Description */}
//                   <motion.p 
//                     initial={{ color: "#d1d5db" }}
//                     whileHover={{ color: "#e5e7eb" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-gray-300 text-lg font-semibold leading-relaxed"
//                   >
//                     {media.description}
//                   </motion.p>
//                 </div>

//                 {/* Border Glow */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 rounded-2xl pointer-events-none"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/40 via-emerald-500/30 to-emerald-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DiscoverSuccess



// import React from 'react'
// import { motion } from 'framer-motion'

// const DiscoverSuccess = () => {
//   const cards = [
//     {
//       icon: "📈",
//       title: "Our Transparency",
//       description: "At SureShot FX, we champion transparency, trust, and accuracy. We openly display our trade results, offering an insight into our successful Forex signal services."
//     },
//     {
//       icon: "📊",
//       title: "Proof in Performance",
//       description: "We stand by our trade results. They're real, verifiable, and integral to showcasing our success. It's this honesty that solidifies our reputation as a trustworthy Forex signal provider."
//     },
//     {
//       icon: "🎚️",
//       title: "Trading Analysis Simplified",
//       description: "We empower clients by simplifying complex trading strategies. Our detailed analysis provides a comprehensive understanding of Forex trading, boosting your confidence and profitability."
//     },
//     {
//       icon: "📈",
//       title: "Learning Success Strategies",
//       description: "We guide clients through our complete trading plan. This knowledge-sharing approach allows you to learn and capitalize on profitable opportunities, leading to a surefire Forex trading strategy."
//     }
//   ]

//   const mediaCards = [
//     {
//       image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=400&fit=crop",
//       title: "Market Analysis",
//       description: "Deep dive into market trends"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1518066331714-f49ad69b3289?w=500&h=400&fit=crop",
//       title: "Trading Signals",
//       description: "Real-time signal delivery"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
//       title: "Expert Guidance",
//       description: "Professional trading support"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1573166768170-e368b02b4050?w=500&h=400&fit=crop",
//       title: "Success Stories",
//       description: "Client testimonials and wins"
//     }
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   }

//   const mediaVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   }

//   return (
//     <div className="bg-black min-h-screen">
//       {/* Main Section */}
//       <div className="py-20 px-6 lg:px-12 relative overflow-hidden">
//         {/* Background Glow Effects */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.03, 0.06, 0.03],
//             }}
//             transition={{ duration: 8, repeat: Infinity }}
//             className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"
//           />
//           <motion.div
//             animate={{
//               scale: [1.2, 1, 1.2],
//               opacity: [0.06, 0.03, 0.06],
//             }}
//             transition={{ duration: 10, repeat: Infinity }}
//             className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
//           />
//         </div>

//         <div className="max-w-[90%] w-full mx-auto relative z-10">
//           {/* Heading */}
//           <motion.h2 
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl lg:text-6xl font-black text-transparent  bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-center mb-6"
//           >
//             Discover Success with SureShot FX
//           </motion.h2>
          
//           {/* Subheading */}
//           <motion.p 
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-gray-200 text-center text-2xl mb-16 max-w-3xl mx-auto font-semibold"
//           >
//             Join us on your journey to smart, sustainable trading growth.
//           </motion.p>

//           {/* Cards Grid */}
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 whileHover={{ 
//                   y: -15,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className="group relative bg-gradient-to-br from-slate-900/60 to-black/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-md overflow-hidden cursor-pointer shadow-lg shadow-green-500/0 hover:shadow-2xl hover:shadow-green-500/60 transition-all duration-300"
//               >
//                 {/* Main Glow Effect */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-green-400/25 rounded-2xl"
//                 ></motion.div>

//                 {/* Animated Border Glow */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 rounded-2xl pointer-events-none"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/50 via-emerald-500/40 to-green-400/50 blur-xl"></div>
//                 </motion.div>

//                 {/* Pulsing Outer Glow */}
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   whileHover={{ opacity: 1, scale: 1.1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute -inset-2 bg-gradient-to-r from-green-500/20 via-emerald-500/40 to-green-500/20 rounded-2xl blur-2xl -z-10"
//                 ></motion.div>

//                 {/* Corner Accent - Top Right */}
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileHover={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-500/40 via-emerald-400/30 to-transparent rounded-bl-3xl"
//                 ></motion.div>

//                 {/* Animated Circle Glow - Left Side */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/25 rounded-full blur-2xl"
//                 ></motion.div>

//                 {/* Content */}
//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <motion.div 
//                     whileHover={{ 
//                       scale: 1.2,
//                       rotate: 5,
//                       transition: { duration: 0.3 }
//                     }}
//                     className="text-5xl mb-6 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
//                   >
//                     {card.icon}
//                   </motion.div>

//                   {/* Title */}
//                   <motion.h3 
//                     initial={{ color: "#fff" }}
//                     whileHover={{ color: "#22c55e" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-white font-bold text-3xl mb-4 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]"
//                   >
//                     {card.title}
//                   </motion.h3>

//                   {/* Description */}
//                   <motion.p 
//                     initial={{ color: "#d1d5db" }}
//                     whileHover={{ color: "#e5e7eb" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-gray-300 text-lg leading-relaxed font-medium"
//                   >
//                     {card.description}
//                   </motion.p>
//                 </div>

//                 {/* Shine Effect */}
//                 <motion.div 
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "100%" }}
//                   transition={{ duration: 0.8, ease: "easeInOut" }}
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/30 to-transparent"
//                 ></motion.div>

//                 {/* Border Highlight */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 rounded-2xl border-2 border-green-400/40"
//                 ></motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Media Section */}
//       <div className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950/50 to-black relative overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.02, 0.05, 0.02],
//             }}
//             transition={{ duration: 12, repeat: Infinity }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-3xl"
//           />
//         </div>

//         <div className="max-w-[90%] w-full mx-auto relative z-10">
//           {/* Section Heading */}
//           <motion.h2 
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-center mb-4"
//           >
//             Recognized by the Leading Media Outlets
//           </motion.h2>

//           {/* Section Subheading */}
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-gray-300 text-center text-xl font-semibold mb-16"
//           >
//             As Featured On
//           </motion.p>

//           {/* Media Cards Grid */}
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {mediaCards.map((media, index) => (
//               <motion.div
//                 key={index}
//                 variants={mediaVariants}
//                 whileHover={{ 
//                   y: -20,
//                   scale: 1.08,
//                   transition: { duration: 0.3 }
//                 }}
//                 className="group relative bg-gradient-to-br from-slate-900/70 to-black/90 border border-green-500/20 rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-green-500/0 hover:shadow-2xl hover:shadow-green-500/60 transition-all duration-300"
//               >
//                 {/* Image Container */}
//                 <div className="relative h-64 overflow-hidden">
//                   <motion.img
//                     src={media.image}
//                     alt={media.title}
//                     className="w-full h-full object-cover"
//                     whileHover={{ scale: 1.15 }}
//                     transition={{ duration: 0.5 }}
//                   />
                  
//                   {/* Green Overlay */}
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black via-green-900/30 to-transparent"
//                   ></motion.div>

//                   {/* Animated Green Glow on Image */}
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     transition={{ duration: 0.4 }}
//                     className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px]"
//                   ></motion.div>
//                 </div>

//                 {/* Content */}
//                 <div className="relative z-10 p-6 bg-gradient-to-t from-black to-slate-900/90 backdrop-blur-md">
//                   {/* Title */}
//                   <motion.h3 
//                     initial={{ color: "#fff" }}
//                     whileHover={{ color: "#22c55e" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-white font-bold text-2xl mb-3 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]"
//                   >
//                     {media.title}
//                   </motion.h3>

//                   {/* Description */}
//                   <motion.p 
//                     initial={{ color: "#d1d5db" }}
//                     whileHover={{ color: "#e5e7eb" }}
//                     transition={{ duration: 0.3 }}
//                     className="text-gray-300 text-lg font-semibold leading-relaxed"
//                   >
//                     {media.description}
//                   </motion.p>
//                 </div>

//                 {/* Border Glow - Enhanced */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 rounded-2xl pointer-events-none"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/40 via-emerald-500/50 to-green-400/40 blur-lg"></div>
//                 </motion.div>

//                 {/* Outer Glow Shadow */}
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileHover={{ opacity: 1, scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute -inset-1 bg-gradient-to-r from-green-500/30 via-emerald-500/40 to-green-500/30 rounded-2xl blur-xl -z-10"
//                 ></motion.div>

//                 {/* Top Border Accent */}
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   whileHover={{ scaleX: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 origin-left"
//                 ></motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DiscoverSuccess




// import React from 'react'
// import { motion } from 'framer-motion'

// const DiscoverSuccess = () => {
//   const cards = [
//     {
//       icon: "⚡",
//       title: "Real Mining. Real Profits.",
//       description: 
//         "bittronexa provides daily income powered by real Bitcoin, Ethereum & Dogecoin mining farms located in ultra-low-cost regions like Oman."
//     },
//     {
//       icon: "🔒",
//       title: "Decentralized & Secure System",
//       description: 
//         "Audited smart contracts, strong KYC/AML protocols, and real-time mining dashboards ensure trust, transparency, and long-term reliability."
//     },
//     {
//       icon: "💹",
//       title: "Multiple Income Streams",
//       description: 
//         "Earn through mining profits, generation income, matching income, club rewards & leadership bonuses — all automated via the hybrid model."
//     },
//     {
//       icon: "🏭",
//       title: "World-Class Mining Infrastructure",
//       description: 
//         "Hosted with 99.95% uptime, PUE < 1.1 efficiency, and expansion into UAE, Georgia, Iceland & Kazakhstan for maximum scalability."
//     }
//   ]

//   const mediaCards = [
//     {
//       image: "https://images.unsplash.com/photo-1621506032756-74d701d4f3a3?auto=format&fit=crop&w=800&q=80",
//       title: "Mining Dashboard",
//       description: "Track real-time mining output & revenue performance"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1629904853716-f91f7b1f2a9e?auto=format&fit=crop&w=800&q=80",
//       title: "Smart Contract Automation",
//       description: "Fully automated payouts through decentralized contracts"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1614064641938-3bbee0bbfe0e?auto=format&fit=crop&w=800&q=80",
//       title: "Node Mining System",
//       description: "Earn rewards by participating in Bittronex validator nodes"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
//       title: "Leadership & Rewards",
//       description: "Achieve ranks & unlock bonuses up to $5M lifetime"
//     }
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   }

//   const mediaVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   }

//   return (
//     <div className="bg-black min-h-screen">
      
//       {/* MAIN SECTION */}
//       <div className="py-20 px-6 lg:px-12 relative overflow-hidden">
        
//         {/* Decorative Background Lights */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
//             transition={{ duration: 8, repeat: Infinity }}
//             className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"
//           />
//           <motion.div
//             animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.03, 0.06] }}
//             transition={{ duration: 10, repeat: Infinity }}
//             className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
//           />
//         </div>

//         <div className="max-w-[90%] w-full mx-auto relative z-10">
          
//           {/* Heading */}
//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-center mb-6"
//           >
//             Discover Success with Bittronexa
//           </motion.h2>

//           {/* Subheading */}
//           <motion.p
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-gray-200 text-center text-2xl mb-16 max-w-3xl mx-auto font-semibold"
//           >
//             A decentralized mining ecosystem built for transparency, stability & long-term earnings.
//           </motion.p>

//           {/* Benefits Cards */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 whileHover={{ y: -15, scale: 1.05, transition: { duration: 0.3 } }}
//                 className="group relative bg-gradient-to-br from-slate-900/60 to-black/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-md overflow-hidden cursor-pointer shadow-lg hover:shadow-green-500/60 transition-all duration-300"
//               >
//                 <div className="relative z-10">
//                   <motion.div
//                     whileHover={{ scale: 1.2, rotate: 5 }}
//                     transition={{ duration: 0.3 }}
//                     className="text-5xl mb-6"
//                   >
//                     {card.icon}
//                   </motion.div>

//                   <h3 className="text-white font-bold text-3xl mb-4">
//                     {card.title}
//                   </h3>

//                   <p className="text-gray-300 text-lg leading-relaxed font-medium">
//                     {card.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//         </div>
//       </div>

//       {/* MEDIA SECTION */}
//       <div className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950/50 to-black relative overflow-hidden">
        
//         <div className="max-w-[90%] w-full mx-auto relative z-10">

//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-center mb-4"
//           >
//             Explore the Bittronex Ecosystem
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-gray-300 text-center text-xl font-semibold mb-16"
//           >
//             From mining infrastructure to automated rewards — everything is built for scalability.
//           </motion.p>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {mediaCards.map((media, index) => (
//               <motion.div
//                 key={index}
//                 variants={mediaVariants}
//                 whileHover={{ y: -20, scale: 1.08, transition: { duration: 0.3 } }}
//                 className="group relative bg-gradient-to-br from-slate-900/70 to-black/90 border border-green-500/20 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-green-500/60 transition-all duration-300"
//               >
//                 <div className="relative h-64 overflow-hidden">
//                   <motion.img
//                     src={media.image}
//                     alt={media.title}
//                     className="w-full h-full object-cover"
//                     whileHover={{ scale: 1.15 }}
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-green-900/20 to-transparent"></div>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-white font-bold text-2xl mb-3">
//                     {media.title}
//                   </h3>
//                   <p className="text-gray-300 text-lg font-semibold leading-relaxed">
//                     {media.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//         </div>
//       </div>

//     </div>
//   )
// }

// export default DiscoverSuccess




import React from 'react'
import { motion } from 'framer-motion'

const DiscoverSuccess = () => {
  const cards = [
    {
      icon: "⚡",
      title: "Smart Arbitrage Trading",
      description:
        "Automated arbitrage strategies capture real-time price differences across global crypto exchanges to generate consistent trading profits."
    },
    {
      icon: "🔒",
      title: "System-Driven & Transparent",
      description:
        "Algorithm-based execution, automated calculations, and real-time dashboards ensure clarity, accuracy, and full transparency."
    },
    {
      icon: "💹",
      title: "8 Powerful Income Streams",
      description:
        "Earn from Trading Profit, Level Income, Matching Income, Club Income, Achievement Income, Trading Level Income, Reward Income & IB Income."
    },
    {
      icon: "🌍",
      title: "Leadership & Global Expansion",
      description:
        "Grow from Aspire Trader to Royal Crown Ambassador while earning from global team volume without location limitations."
    }
  ]

  const mediaCards = [
    {
      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?auto=format&fit=crop&w=800&q=80",
      title: "Arbitrage Trading Dashboard",
      description: "Monitor live trades, profits, and market spreads in real time"
    },
    {
      image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=800&q=80",
      title: "Automated Trading Engine",
      description: "System-driven execution with no manual intervention"
    },
    {
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80",
      title: "Income & Rank Tracker",
      description: "Track income growth, leadership ranks & rewards from one dashboard"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCev46GTq_trI7gqvIH42WYff2MNJdPNgBvQ&s",
      title: "Leadership Rewards Program",
      description: "Unlock matching rewards and lifetime bonuses through team performance"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="bg-black min-h-screen">

      {/* MAIN SECTION */}
      <div className="py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.03, 0.06] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-[90%] w-full mx-auto relative z-10">

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-center mb-6"
          >
            Discover Success with Bittronexa
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-200 text-center text-2xl mb-16 max-w-3xl mx-auto font-semibold"
          >
            A smart arbitrage trading ecosystem designed for scalable income, leadership growth & long-term sustainability.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -15, scale: 1.05, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-slate-900/60 to-black/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-md overflow-hidden cursor-pointer shadow-lg hover:shadow-green-500/60 transition-all duration-300"
              >
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl mb-6"
                  >
                    {card.icon}
                  </motion.div>

                  <h3 className="text-white font-bold text-3xl mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MEDIA SECTION */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950/50 to-black relative overflow-hidden">
        <div className="max-w-[90%] w-full mx-auto relative z-10">

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-center mb-4"
          >
            Explore the Bittronexa Ecosystem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-center text-xl font-semibold mb-16"
          >
            From automated trading to leadership rewards — everything runs on a system.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {mediaCards.map((media, index) => (
              <motion.div
                key={index}
                variants={mediaVariants}
                whileHover={{ y: -20, scale: 1.08, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-slate-900/70 to-black/90 border border-green-500/20 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-green-500/60 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={media.image}
                    alt={media.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-green-900/20 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-white font-bold text-2xl mb-3">
                    {media.title}
                  </h3>
                  <p className="text-gray-300 text-lg font-semibold leading-relaxed">
                    {media.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </div>
  )
}

export default DiscoverSuccess
