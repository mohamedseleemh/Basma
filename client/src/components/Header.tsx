import React, { useEffect, useState } from 'react';
import { Crown, Sparkles, Award } from 'lucide-react';
import ProfileSection from './header/ProfileSection';
import AnimatedText from './header/AnimatedText';
import ActionButtons from './header/ActionButtons';
import StatsGrid from './header/StatsGrid';

const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Crown,
      title: 'خدمة ملكية',
      desc: 'تجربة VIP استثنائية',
      gradient: 'from-yellow-400 to-orange-400',
    },
    {
      icon: Sparkles,
      title: 'أجواء ساحرة',
      desc: 'تفاصيل لا تُنسى',
      gradient: 'from-pink-400 to-purple-400',
    },
    {
      icon: Award,
      title: 'جودة عالمية',
      desc: 'معايير عالمية للخدمة',
      gradient: 'from-green-400 to-emerald-400',
    },
  ];

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden morph-bg">
      <div className="absolute inset-0 cosmic-bg opacity-80"></div>

      {/* Interactive Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute w-[300px] h-[300px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl floating-element"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%',
          }}
        />
        <div
          className="absolute w-[250px] h-[250px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl floating-element"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            right: '15%',
            bottom: '25%',
          }}
        />
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-7xl mx-auto">
        <ProfileSection />

        <h1 className="text-5xl md:text-7xl font-bold mb-8 stagger-item dancing-script neon-text text-white">
          بسمة نبيل
        </h1>

        <AnimatedText />
        <ActionButtons />
        <StatsGrid />

        {/* Features Showcase */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 stagger-item">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect p-6 rounded-2xl hover-lift-intense magnetic group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold gradient-text-advanced mb-2">{feature.title}</h3>
              <p className="text-white/80 text-base">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium gradient-text-advanced">اكتشف المزيد</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center glass-effect">
              <div className="w-1 h-3 bg-gradient-to-b from-white to-transparent rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
