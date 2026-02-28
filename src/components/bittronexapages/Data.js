import { TrendingUp, Zap, Award, Crown } from 'lucide-react';

export const automatedBotPackages = [
  {
    id: 1,
    name: "Standard Package",
    slug: "standard",
    investmentRange: {
      min: 100,
      max: 1000,
    },
    tradingProfitSharingPercent: 9.75,
    currency: "USD",
    features: [
      "Automated bot trading",
      "Profit sharing model",
      "Real-time performance tracking",
    ],
    badge: "STANDARD",
    icon: TrendingUp,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    name: "Premium Package",
    slug: "premium",
    investmentRange: {
      min: 1001,
      max: 5000,
    },
    tradingProfitSharingPercent: 10.5,
    currency: "USD",
    features: [
      "Advanced automated bot",
      "Higher profit sharing",
      "Priority trade execution",
    ],
    badge: "PREMIUM",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Silver Package",
    slug: "silver",
    investmentRange: {
      min: 5001,
      max: 10000,
    },
    tradingProfitSharingPercent: 11.25,
    currency: "USD",
    features: [
      "High-volume trading bot",
      "Enhanced strategy allocation",
      "Dedicated monitoring",
    ],
    badge: "SILVER",
    icon: Award,
    gradient: "from-gray-400 to-gray-600",
  },
  {
    id: 4,
    name: "Gold Package",
    slug: "gold",
    investmentRange: {
      min: 10000,
      max: null,
    },
    tradingProfitSharingPercent: 12,
    currency: "USD",
    features: [
      "Enterprise-grade trading bot",
      "Maximum profit sharing",
      "VIP priority execution",
    ],
    badge: "GOLD",
    icon: Crown,
    gradient: "from-yellow-500 to-orange-500",
  },
];

