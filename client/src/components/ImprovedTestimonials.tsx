import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  is_active: boolean;
  sort_order: number;
}

const ImprovedTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  const activeTestimonials = testimonials
    .filter((t: Testimonial) => t.is_active)
    .sort((a: Testimonial, b: Testimonial) => a.sort_order - b.sort_order);

  useEffect(() => {
    if (activeTestimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % activeTestimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTestimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % activeTestimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length,
    );
  };

  if (isLoading || activeTestimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = activeTestimonials[activeTestimonial];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            آراء عملائنا
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">ما يقوله عملاؤنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تجارب حقيقية من عملائنا الكرام الذين عاشوا معنا أجمل اللحظات
          </p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < (currentTestimonial?.rating || 5)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center mb-8 italic">
              "{currentTestimonial?.content}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{currentTestimonial?.name}</h4>
              <p className="text-gray-600">عميل VIB</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex gap-2">
                {activeTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeTestimonial
                        ? 'bg-purple-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">5000+</div>
            <p className="text-gray-600 font-medium">عميل سعيد</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.9</div>
            <p className="text-gray-600 font-medium">تقييم متوسط</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <p className="text-gray-600 font-medium">رضا العملاء</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600 font-medium">خدمة العملاء</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedTestimonials;
