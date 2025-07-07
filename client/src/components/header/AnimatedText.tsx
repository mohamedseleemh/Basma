import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    '✨ خدمات حجوزات ورحلات نيلية VIP ✨',
    '🌟 تجارب استثنائية مع جروب VIB المميز 🌟',
    '👑 رفاهية وأناقة لا مثيل لها 👑',
    '💎 لحظات سحرية وذكريات خالدة 💎',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 mb-12 flex items-center justify-center stagger-item">
      <p className="text-xl md:text-2xl font-light gradient-text-advanced text-center leading-relaxed max-w-4xl transition-all duration-1000 rubik-font">
        {texts[currentText]}
      </p>
    </div>
  );
};

export default AnimatedText;
