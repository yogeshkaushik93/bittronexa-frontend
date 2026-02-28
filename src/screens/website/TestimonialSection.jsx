import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Full-Time Trader",
      image: "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
      rating: 5,
      text: "This blueprint completely transformed my trading journey! I went from losing consistently to making 300% profit in just 3 months. The risk management strategies are pure gold.",
      profit: "+₹2.5L"
    },
    {
      name: "Arjun Singh",
      role: "Part-Time Investor",
      image: "https://t3.ftcdn.net/jpg/01/42/01/84/360_F_142018449_yR0avsaJqbIx8NA47sINMoaxdtn1sPzh.jpg",
      rating: 5,
      text: "I was skeptical at first, but the VIP signals are incredibly accurate. The community support and expert guidance helped me achieve financial freedom. Highly recommended!",
      profit: "+₹4.2L"
    },
    {
      name: "Vikram Patel",
      role: "Professional Trader",
      image: "https://t3.ftcdn.net/jpg/10/08/06/84/360_F_1008068412_1IBbPTLdzLvHsWX23QWnYZGnJM0xTyFR.jpg",
      rating: 5,
      text: "The structured approach and clear guidelines made forex trading so much easier. I've been consistently profitable for 6 months now. Best investment decision ever!",
      profit: "+₹6.8L"
    },
    {
      name: "Amit Sharma",
      role: "Forex Enthusiast",
      image: "https://plus.unsplash.com/premium_photo-1722682239201-21c8173e776b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwbWVufGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      rating: 5,
      text: "Amazing results! The gold and indices signals are spot-on. My portfolio has grown tremendously. The team's dedication to member success is truly commendable.",
      profit: "+₹3.9L"
    },
    {
      name: "Rohit Verma",
      role: "Day Trader",
      image: "https://t4.ftcdn.net/jpg/06/32/76/41/360_F_632764175_u9Knj7IFJNZ8MiXm3JsLaNjslNf0Iw5U.jpg",
      rating: 5,
      text: "From zero to hero! The blueprint gave me the confidence and skills to trade professionally. The real-time signals and risk management tips are invaluable.",
      profit: "+₹5.1L"
    },
    {
      name: "Karan Mehta",
      role: "Swing Trader",
      image: "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?w=360",
      rating: 5,
      text: "Life-changing experience! The systematic approach to trading removed all the guesswork. I'm now trading with confidence and seeing consistent profits every month.",
      profit: "+₹7.3L"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="min-h-screen bg-black  px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-[90%] w-full mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-2 mb-6"
          >
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-2xl font-semibold">Success Stories</span>
          </motion.div>
          
          {/* <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 mb-4">
            What Our Traders Say
          </h2> */}
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Join thousands of successful traders who transformed their financial future
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: 20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -20 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-3xl blur-xl opacity-30"
              />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-xl rounded-3xl border-2 border-green-500/30 overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-24 h-24 text-green-500" />
                </div>

                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Image Section */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="relative flex-shrink-0"
                    >
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 30px rgba(34, 197, 94, 0.3)",
                            "0 0 60px rgba(34, 197, 94, 0.6)",
                            "0 0 30px rgba(34, 197, 94, 0.3)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-green-500 p-1 bg-gradient-to-br from-green-500 to-emerald-600"
                      >
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </motion.div>
                      
                      {/* Profit Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg px-4 py-2 rounded-full border-2 border-black shadow-xl"
                      >
                        {currentTestimonial.profit}
                      </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex-1 text-center lg:text-left">
                      {/* Stars */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-1 mb-4 justify-center lg:justify-start"
                      >
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.4 + i * 0.1, type: "spring", bounce: 0.5 }}
                          >
                            <Star className="w-6 h-6 fill-green-500 text-green-500" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Testimonial Text */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 font-light italic"
                      >
                        "{currentTestimonial.text}"
                      </motion.p>

                      {/* Name and Role */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4 className="text-2xl sm:text-3xl font-black text-green-400 mb-1">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-gray-500 text-sm sm:text-base font-medium">
                          {currentTestimonial.role}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Bottom Green Accent */}
                <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#22c55e" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="bg-slate-800 hover:bg-green-600 text-white p-4 rounded-full border-2 border-green-500/50 transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#22c55e" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="bg-slate-800 hover:bg-green-600 text-white p-4 rounded-full border-2 border-green-500/50 transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.3 }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-12 bg-green-500'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-16"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: '#8C8C8C' }}
            className="text-white text-lg sm:text-xl font-black py-5 px-12 rounded-full shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border-2 border-gray-700 relative overflow-hidden group"
          >
            <span className="relative z-10  ">Start Your Success Story</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button> */}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {[
            { number: "5000+", label: "Happy Traders" },
            { number: "₹50Cr+", label: "Total Profits" },
            { number: "98%", label: "Success Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-lg  rounded-2xl p-6 border border-green-500/20 text-center"
            >
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring", bounce: 0.5 }}
                className="text-4xl sm:text-5xl font-black text-green-400 mb-2"
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400 font-medium text-xl">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}