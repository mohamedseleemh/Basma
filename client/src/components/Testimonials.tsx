import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Quote, Heart, Users, Award, Crown } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { data: apiTestimonials, isLoading } = useQuery({
    queryKey: ['/api/testimonials'],
    queryFn: () => apiRequest('/api/testimonials'),
  });

  const avatars = ['👩🏻‍💼', '👨🏻‍💼', '👩🏻‍🎨', '👨🏻‍🎓'];
  const services = ['رحلة نيلية', 'سهرة خاصة', 'حجز VIP', 'تنظيم فعاليات'];

  const testimonials =
    apiTestimonials?.map((testimonial: any, index: number) => ({
      name: testimonial.name,
      text: testimonial.content,
      service: services[index % services.length],
      avatar: avatars[index % avatars.length],
      rating: testimonial.rating,
    })) || [];

  const stats = [
    { icon: Star, value: '5.0', label: 'تقييم مثالي' },
    { icon: Users, value: '500+', label: 'عميل سعيد' },
    { icon: Award, value: '100%', label: 'رضا العملاء' },
    { icon: Crown, value: 'VIP', label: 'خدمة ملكية' },
  ];

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 morph-bg opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dancing-script">
            آراء عملائنا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشفي ما يقوله عملاؤنا عن تجاربهم المميزة معنا
          </p>
        </div>

        {/* Main Testimonial */}
        {testimonials.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="morph-card p-8 text-center">
              <div className="text-6xl mb-4">{testimonials[activeTestimonial]?.avatar || '👤'}</div>
              <Quote className="w-8 h-8 text-gray-400 mx-auto mb-4" />

              <blockquote className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                "{testimonials[activeTestimonial]?.text || ''}"
              </blockquote>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-gray-800 text-xl mb-1">
                  {testimonials[activeTestimonial]?.name || ''}
                </h4>
                <p className="text-primary font-medium">
                  {testimonials[activeTestimonial]?.service || ''}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-primary scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center morph-card p-6 hover-lift-intense">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="morph-card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 dancing-script">
              🌟 انضمي لجروب VIB المميز 🌟
            </h3>
            <p className="text-gray-600 mb-6">
              استمتعي بأفضل العروض والخدمات الحصرية مع تجربة VIP لا تُنسى
            </p>

            <a
              href="https://wa.me/201066544784"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-btn px-8 py-4 text-lg font-bold text-white hover-lift-intense group inline-flex items-center gap-3"
            >
              <Heart className="w-5 h-5 group-hover:animate-bounce" />
              انضمي الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
