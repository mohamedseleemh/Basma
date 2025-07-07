import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

const ImprovedServices = () => {
  const [activeService, setActiveService] = useState<number>(0);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    queryFn: () => fetch('/api/services').then(res => res.json()),
  });

  const activeServices = services
    .filter((service: Service) => service.is_active)
    .sort((a: Service, b: Service) => a.sort_order - b.sort_order);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden border-b-2 border-purple-100">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-pink-100/30"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-200 to-pink-100 text-purple-800 rounded-full text-lg font-bold mb-6 shadow-md border border-purple-200">
            <Star className="w-6 h-6" />
            خدمات بسمة نبيل
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-6 tracking-tight drop-shadow-lg">
            تجارب سياحية وسهرات لا تُنسى
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium bg-white/70 rounded-xl py-3 px-4 shadow">
            نقدم مجموعة متنوعة من الخدمات الفاخرة التي تناسب جميع الأذواق والاحتياجات، مع اهتمام بأدق التفاصيل وراحة العميل.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {activeServices.map((service: Service, index: number) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-3xl p-10 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                activeService === index
                  ? 'border-purple-300 bg-purple-50/80 scale-105'
                  : 'border-gray-100 hover:border-purple-200'
              }`}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Service icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-purple-200">
                <span className="text-3xl text-white drop-shadow-xl">{service.icon || '⭐'}</span>
              </div>

              {/* Service content */}
              <h3 className="text-2xl font-extrabold text-purple-900 mb-4 group-hover:text-pink-600 transition-colors tracking-tight">
                {service.title}
              </h3>

              <p className="text-gray-700 mb-6 leading-relaxed font-medium">{service.description}</p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-purple-800 font-semibold text-lg">{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-base text-gray-500 mt-2">
                    +{service.features.length - 3} ميزة إضافية
                  </div>
                )}
              </div>

              {/* Action button */}
              <Link
                to="/booking"
                className="group/btn w-full bg-gradient-to-r from-purple-800 to-pink-600 text-white py-4 px-8 rounded-2xl font-extrabold text-lg hover:from-purple-900 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg border-2 border-purple-200 hover:scale-105"
              >
                احجز الآن
                <ArrowLeft className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-12 max-w-4xl mx-auto border-2 border-purple-200 shadow-lg">
            <h3 className="text-3xl font-extrabold text-purple-900 mb-4">لم تجد ما تبحث عنه؟</h3>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              يمكننا تخصيص تجربة سياحية أو سهرة خاصة تناسب احتياجاتك ومتطلباتك الفريدة مع بسمة نبيل.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/booking"
                className="bg-gradient-to-r from-purple-800 to-pink-600 text-white px-10 py-4 rounded-2xl font-extrabold text-lg hover:from-purple-900 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl border-2 border-purple-300 hover:scale-105"
              >
                طلب تجربة مخصصة
                <ArrowLeft className="w-6 h-6" />
              </Link>

              <Link
                to="/contact"
                className="border-2 border-purple-300 text-purple-800 px-10 py-4 rounded-2xl font-extrabold text-lg hover:border-pink-400 hover:text-pink-600 transition-all duration-300 bg-white/90 shadow-lg"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedServices;
