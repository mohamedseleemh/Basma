import React from 'react';
import { Sparkles, Heart, Star, Zap } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16 stagger-item">
      <div className="glass-effect px-8 py-4 text-lg font-semibold magnetic rounded-2xl">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <span className="gradient-text-advanced">جروب VIB المميز</span>
          <Zap className="w-6 h-6 text-blue-300" />
        </div>
      </div>

      <a
        href="https://wa.me/201066544784"
        target="_blank"
        rel="noopener noreferrer"
        className="liquid-btn px-12 py-4 text-xl font-bold text-white shadow-xl hover-lift-intense group"
      >
        <span className="flex items-center gap-3">
          <Heart className="w-6 h-6 group-hover:animate-bounce" />
          تواصل واتساب
          <Star className="w-6 h-6" />
        </span>
      </a>
    </div>
  );
};

export default ActionButtons;
