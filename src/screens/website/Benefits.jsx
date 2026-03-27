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
