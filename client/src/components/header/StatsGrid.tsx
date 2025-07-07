import React from 'react';
import { Heart, Compass, Sparkles, Rocket } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    { number: '500+', label: 'عميل سعيد', icon: Heart, gradient: 'from-pink-400 to-red-400' },
    { number: '50+', label: 'رحلة نيلية', icon: Compass, gradient: 'from-blue-400 to-teal-400' },
    {
      number: '100+',
      label: 'سهرة مميزة',
      icon: Sparkles,
      gradient: 'from-purple-400 to-blue-400',
    },
    { number: '24/7', label: 'خدمة العملاء', icon: Rocket, gradient: 'from-yellow-400 to-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 stagger-item">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="morph-card p-6 text-center hover-lift-intense magnetic group transition-all duration-300"
        >
          <div
            className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg`}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl md:text-3xl font-bold gradient-text-advanced mb-2 rubik-font">
            {stat.number}
          </div>
          <div className="text-sm text-white/90 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
