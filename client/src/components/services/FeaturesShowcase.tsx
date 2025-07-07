import React from 'react';
import { Crown, Sparkles, Gift, Camera, Award, Zap } from 'lucide-react';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Crown,
      title: 'خدمة ملكية',
      desc: 'تجربة VIP استثنائية',
      bg: 'from-yellow-400 to-orange-400',
    },
    {
      icon: Sparkles,
      title: 'أجواء ساحرة',
      desc: 'تفاصيل لا تُنسى',
      bg: 'from-pink-400 to-purple-400',
    },
    {
      icon: Gift,
      title: 'عروض حصرية',
      desc: 'أسعار مميزة للأعضاء',
      bg: 'from-purple-400 to-indigo-400',
    },
    { icon: Camera, title: 'تصوير مجاني', desc: 'ذكريات خالدة', bg: 'from-blue-400 to-cyan-400' },
    {
      icon: Award,
      title: 'جودة عالمية',
      desc: 'معايير عالمية للخدمة',
      bg: 'from-green-400 to-emerald-400',
    },
    {
      icon: Zap,
      title: 'استجابة فورية',
      desc: 'خدمة عملاء 24/7',
      bg: 'from-orange-400 to-red-400',
    },
  ];

  return (
    <div className="morph-bg rounded-2xl p-12 shadow-2xl mb-16">
      <h3 className="text-4xl font-bold text-center text-white mb-12 dancing-script neon-text">
        ⭐ لماذا جروب VIB الأفضل؟ ⭐
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center group magnetic hover-lift-intense transition-all duration-300"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2 group-hover:text-yellow-300 transition-colors duration-300">
              {feature.title}
            </h4>
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesShowcase;
