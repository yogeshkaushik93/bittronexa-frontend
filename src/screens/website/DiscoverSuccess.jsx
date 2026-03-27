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
