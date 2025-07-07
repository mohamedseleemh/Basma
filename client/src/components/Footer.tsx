import React from 'react';
import { Heart, Star, Crown, Sparkles, Award, Gem } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black"></div>
      <div className="absolute inset-0 grid-glow opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute floating-element opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 60}px`,
              height: `${30 + Math.random() * 60}px`,
              background: `linear-gradient(45deg, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 60%))`,
              borderRadius: '50%',
              filter: 'blur(15px)',
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 text-center relative z-10">
        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Crown className="w-12 h-12 text-yellow-400 animate-pulse" />
            <h3 className="text-4xl md:text-5xl font-extrabold gradient-text-advanced dancing-script drop-shadow-lg">
              بسمة نبيل
            </h3>
            <Gem className="w-12 h-12 text-purple-400 wiggle" />
          </div>
          <p className="text-gray-200 max-w-3xl mx-auto text-xl leading-relaxed font-medium bg-black/20 rounded-xl py-3 px-4 shadow-md">
            متخصصة في تنظيم الحجوزات والسهرات الفاخرة في مصر. نعدك بتجربة لا تُنسى واهتمام بأدق التفاصيل.
          </p>
        </div>

        <div className="flex justify-center items-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className="w-8 h-8 text-yellow-400 fill-current animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          <span className="mr-4 text-gray-300 text-lg font-semibold">تقييم 5 نجوم من عملائنا</span>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-effect p-6 rounded-2xl hover-lift-intense magnetic">
            <Crown className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <p className="text-white font-semibold">خدمة ملكية</p>
          </div>
          <div className="glass-effect p-6 rounded-2xl hover-lift-intense magnetic">
            <Award className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p className="text-white font-semibold">جودة عالمية</p>
          </div>
          <div className="glass-effect p-6 rounded-2xl hover-lift-intense magnetic">
            <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-3" />
            <p className="text-white font-semibold">أجواء ساحرة</p>
          </div>
          <div className="glass-effect p-6 rounded-2xl hover-lift-intense magnetic">
            <Gem className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-white font-semibold">تجارب مميزة</p>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8">
          <p className="text-gray-400 flex items-center justify-center gap-3 text-lg mb-4">
            صُنع بكل
            <Heart className="w-6 h-6 text-red-400 fill-current animate-bounce" />
            وإبداع لخدمتك
          </p>
          <p className="text-gray-500 mt-2 text-lg">
            جميع الحقوق محفوظة © 2024 بسمة نبيل - جروب VIB
          </p>
          <div className="mt-4 flex justify-center items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-gray-400">تجربة VIP استثنائية</span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
