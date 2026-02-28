// import React from 'react';
// import { motion } from 'framer-motion';
// import { TrendingUp, Award, BarChart3, ArrowRight } from 'lucide-react';

// export default function BlogSection() {
//   const blogs = [
//     {
//       id: 1,
//       title: "Forex Signals: The Ultimate Guide to Successful Trading",
//       image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
//       icon: TrendingUp,
//       gradient: "from-green-600 to-emerald-700"
//     },
//     {
//       id: 2,
//       title: "Top 10 Best Forex Signal Providers in October 2025: Expert Guide",
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
//       icon: Award,
//       gradient: "from-emerald-600 to-teal-700"
//     },
//     {
//       id: 3,
//       title: "Eightcap Review 2025: Complete Forex Broker Review",
//       image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
//       icon: BarChart3,
//       gradient: "from-teal-600 to-green-700"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.03, 0.05, 0.03],
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//           className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1.3, 1, 1.3],
//             opacity: [0.05, 0.03, 0.05],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
//         />
//       </div>

//       <div className="max-w-[90%] w-full mx-auto relative z-10">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12 sm:mb-16"
//         >
//           <motion.h2
//             className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6"
//           >
//             Useful Blogs to Read
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="text-base sm:text-lg lg:text-xl text-gray-400 font-light max-w-3xl mx-auto"
//           >
//             Explore Expert Insights and Latest Trends in Forex Trading
//           </motion.p>
//         </motion.div>

//         {/* Blog Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
//           {blogs.map((blog, index) => (
//             <motion.div
//               key={blog.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.15, duration: 0.6 }}
//               whileHover={{ y: -10 }}
//               className="group relative"
//             >
//               {/* Glow Effect */}
//               <motion.div
//                 className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
//               />

//               {/* Card */}
//               <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-3xl overflow-hidden border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
//                 {/* Image Container */}
//                 <div className="relative h-56 sm:h-64 overflow-hidden">
//                   {/* Overlay Gradient */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-60 z-10`} />
                  
//                   {/* Image */}
//                   <motion.img
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.6 }}
//                     src={blog.image}
//                     alt={blog.title}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* Icon Badge */}
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     whileInView={{ scale: 1, rotate: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.6 }}
//                     className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-3 rounded-full border-2 border-green-400"
//                   >
//                     <blog.icon className="w-6 h-6 text-green-400" />
//                   </motion.div>

//                   {/* Animated Lines */}
//                   <div className="absolute inset-0 z-10">
//                     <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
//                       <motion.path
//                         d="M50,150 Q150,100 250,150 T450,150"
//                         stroke="rgba(34, 197, 94, 0.3)"
//                         strokeWidth="2"
//                         fill="none"
//                         initial={{ pathLength: 0 }}
//                         whileInView={{ pathLength: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 2, delay: index * 0.2 }}
//                       />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 sm:p-8">
//                   <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.4 + index * 0.1 }}
//                     className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors duration-300"
//                   >
//                     {blog.title}
//                   </motion.h3>

//                   {/* Read More Link */}
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                     className="flex items-center gap-2 mt-4 text-green-400 font-semibold group-hover:gap-4 transition-all duration-300"
//                   >
//                     <button className='text-xl'>Explore Blog</button>
//                     <ArrowRight className="w-5 h-5" />
//                   </motion.div>
//                 </div>

//                 {/* Bottom Accent Line */}
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   whileInView={{ scaleX: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
//                   className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 origin-left"
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="text-center"
//         >
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-black text-lg sm:text-xl font-black py-4 sm:py-5 px-10 sm:px-14 rounded-full shadow-2xl border-2 border-green-400 relative overflow-hidden group"
//           >
//             <span className="relative z-10 flex items-center gap-3">
//               Explore Blogs Now
//               <motion.div
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <ArrowRight className="w-6 h-6" />
//               </motion.div>
//             </span>
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
//               initial={{ x: "-100%" }}
//               whileHover={{ x: "0%" }}
//               transition={{ duration: 0.4 }}
//             />
//           </motion.button>
//         </motion.div>

//         {/* Decorative Elements */}
//         <div className="absolute top-20 left-10 opacity-20">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             className="w-16 h-16 border-2 border-green-500 rounded-lg"
//           />
//         </div>
//         <div className="absolute bottom-20 right-10 opacity-20">
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//             className="w-20 h-20 border-2 border-emerald-500 rounded-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, BarChart3, ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "What Is Crypto Arbitrage Trading? A Complete Beginner’s Guide",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      icon: TrendingUp,
      gradient: "from-green-600 to-emerald-700"
    },
    {
      id: 2,
      title: "How Automated Arbitrage Systems Generate Consistent Profits",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      icon: Award,
      gradient: "from-emerald-600 to-teal-700"
    },
    {
      id: 3,
      title: "Understanding Multiple Income Streams in Trading Ecosystems",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      icon: BarChart3,
      gradient: "from-teal-600 to-green-700"
    }
  ];

  return (
    <div className="min-h-screen bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.03, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-[90%] w-full mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            Learn & Grow With Knowledge
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Insights on arbitrage trading, automated systems, and building scalable income streams
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <motion.div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-3xl overflow-hidden border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-60 z-10`} />

                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-3 rounded-full border-2 border-green-400">
                    <blog.icon className="w-6 h-6 text-green-400" />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-4 text-green-400 font-semibold group-hover:gap-4 transition-all duration-300">
                    <button className="text-xl">Read More</button>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-black text-lg sm:text-xl font-black py-4 sm:py-5 px-10 sm:px-14 rounded-full shadow-2xl border-2 border-green-400"
          >
            Explore All Blogs
          </motion.button>
        </div>
      </div>
    </div>
  );
}
