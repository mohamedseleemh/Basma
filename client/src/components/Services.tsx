import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Anchor, PartyPopper, Music, Diamond, Gem, Heart, Sparkles, Crown } from 'lucide-react';
import ServiceCard from './services/ServiceCard';
import FeaturesShowcase from './services/FeaturesShowcase';
import { apiRequest } from '@/lib/queryClient';

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const { data: apiServices, isLoading } = useQuery({
    queryKey: ['/api/services'],
    queryFn: () => apiRequest('/api/services'),
  });

  const iconMapping: { [key: string]: React.ComponentType<{ className?: string }> } = {
    '🚢': Anchor,
    '🎉': PartyPopper,
    '🎵': Music,
    '💎': Diamond,
    '💝': Gem,
    '💖': Heart,
    '✨': Sparkles,
    '👑': Crown,
  };

  const gradientMapping = [
    {
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
      shadowColor: 'shadow-blue-400/50',
      hoverGradient: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      gradient: 'from-purple-400 via-pink-400 to-red-400',
      bgGradient: 'from-purple-50 via-pink-50 to-red-50',
      shadowColor: 'shadow-purple-400/50',
      hoverGradient: 'from-purple-500 via-pink-500 to-red-500',
    },
    {
      gradient: 'from-yellow-400 via-orange-400 to-red-400',
      bgGradient: 'from-yellow-50 via-orange-50 to-red-50',
      shadowColor: 'shadow-yellow-400/50',
      hoverGradient: 'from-yellow-500 via-orange-500 to-red-500',
    },
  ];

  const services =
    apiServices?.map((service: any, index: number) => ({
      icon: iconMapping[service.icon] || Anchor,
      title: service.title,
      description: service.description || '',
      features: service.features || [],
      ...gradientMapping[index % gradientMapping.length],
    })) || [];

  return (
    <section className="py-20 relative overflow-hidden" id="services">
      <div className="absolute inset-0 morph-bg opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 glass-effect px-8 py-4 magnetic rounded-2xl">
            <span className="gradient-text-advanced font-bold text-lg flex items-center gap-3">
              <Diamond className="w-6 h-6" />
              ✨ خدماتنا المميزة للترفيه والمتعة ✨
              <Gem className="w-6 h-6" />
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 dancing-script neon-text text-gray-800">
            🎉 المتعة والإثارة 🎉
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed rubik-font">
            احجزي معانا أحلى السهرات والرحلات النيلية وشاهدي أهم المباريات والحفلات مع جروب VIB
            المميز
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isHovered={hoveredService === index}
              onHover={() => setHoveredService(index)}
              onLeave={() => setHoveredService(null)}
            />
          ))}
        </div>

        <FeaturesShowcase />

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-effect p-12 max-w-4xl mx-auto rounded-2xl">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text-advanced mb-6 dancing-script">
              🎊 جاهزة للمتعة والإثارة؟ 🎊
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              انضمي لجروب VIB واستمتعي بأروع السهرات والرحلات النيلية والحفلات مع تجربة VIP لا تُنسى
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wa.me/201066544784"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-btn px-12 py-6 text-xl font-bold text-white shadow-xl hover-lift-intense group"
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-6 h-6 group-hover:animate-bounce" />
                  احجزي الآن واتساب
                  <Sparkles className="w-6 h-6" />
                </span>
              </a>

              <div className="glass-effect px-8 py-4 magnetic rounded-2xl">
                <span className="gradient-text-advanced font-bold text-lg flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  🌟 جروب VIB المميز 🌟
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
