import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Users, Award, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImprovedHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    'رحلات نيلية فاخرة',
    'تجارب الحياة الليلية',
    'جولات سياحية خاصة',
    'خدمة VIP متميزة',
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'عميل سعيد' },
    { icon: Star, value: '4.9', label: 'تقييم العملاء' },
    { icon: Award, value: '15+', label: 'جائزة تميز' },
    { icon: Calendar, value: '24/7', label: 'خدمة متواصلة' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-200 via-white to-pink-100 shadow-2xl border-b-4 border-purple-200">
      {/* Clean background with subtle patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        {/* Animated floating icons */}
        <div className="absolute top-10 right-10 animate-bounce-slow z-0">
          <span className="text-5xl drop-shadow-xl">🚢</span>
        </div>
        <div className="absolute bottom-10 left-10 animate-pulse z-0">
          <span className="text-5xl drop-shadow-xl">🌃</span>
        </div>
        <div className="absolute top-1/3 left-1/4 animate-float z-0">
          <span className="text-4xl drop-shadow-xl">🏛️</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-200 to-pink-100 text-purple-800 rounded-full text-base font-semibold shadow-md border border-purple-200">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              الخيار الأول للسياحة المميزة في مصر
            </div>

            {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight animate-fade-in tracking-tight">
              <span className="block bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                بسمة نبيل
              </span>
              <span className="block mt-2 text-2xl md:text-4xl text-gray-800 font-bold">متخصصة في الحجوزات والسهرات الفاخرة</span>
              <span className="block mt-2 text-lg md:text-2xl text-purple-700 font-semibold">استمتع بأرقى الرحلات والخدمات السياحية مع فريقنا</span>
            </h1>

            <p className="text-xl text-gray-900 leading-relaxed max-w-2xl animate-fade-in delay-200 shadow-2xl rounded-2xl bg-white/90 px-8 py-4 border-2 border-purple-100">
              اكتشف سحر مصر مع <span className="font-bold text-purple-700">بسمة نبيل</span>: رحلات نيلية فاخرة، سهرات VIP، وجولات خاصة بلمسة فخامة وأصالة. احجز الآن واصنع ذكريات لا تُنسى مع أفضل فريق تنظيم في مصر!
            </p>

              {/* Rotating features */}
            <div className="flex items-center gap-3 animate-fade-in delay-300">
              <span className="text-purple-800 font-bold text-lg">متخصصون في:</span>
              <div className="h-10 overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 px-4 border-2 border-purple-100 shadow-md flex items-center min-w-[200px]">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${currentSlide * 40}px)` }}
                >
                  {features.map((feature, index) => (
                    <div key={index} className="h-10 flex items-center">
                      <span className="font-extrabold text-purple-800 text-lg tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-400">
              <Link
                to="/booking"
                className="group bg-gradient-to-r from-purple-800 to-pink-600 text-white px-12 py-5 rounded-2xl font-extrabold text-2xl hover:from-purple-900 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl flex items-center justify-center gap-4 animate-bounce border-2 border-purple-300"
              >
                احجز تجربتك الآن
                <ArrowLeft className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="border-2 border-purple-300 text-purple-800 px-12 py-5 rounded-2xl font-extrabold text-2xl hover:border-pink-400 hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-4 bg-white/90 shadow-lg"
              >
                اعرف المزيد عن بسمة نبيل
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 animate-fade-in delay-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">تقييم 4.9 من 5</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">القاهرة، مصر</span>
              </div>
              {/* New: Trusted by section */}
              <div className="hidden md:flex items-center gap-2 border-r pr-4 border-gray-200">
                <span className="text-xs text-gray-500">موثوق من قبل:</span>
                <span className="text-lg">🏨</span>
                <span className="text-lg">🛳️</span>
                <span className="text-lg">🌟</span>
                <span className="text-lg">👑</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="relative">
            <div className="relative max-w-lg mx-auto">
              {/* Main showcase card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl font-bold">VIB</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">رحلتك المثالية تبدأ هنا</h3>
                  <p className="text-gray-600">تجربة فاخرة مع أفضل الخدمات</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Service previews */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                      🚢
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">رحلات نيلية فاخرة</div>
                      <div className="text-sm text-gray-600">
                        استمتع بجمال النيل على متن يخت فاخر
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                      🌃
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">تجارب الحياة الليلية</div>
                      <div className="text-sm text-gray-600">أمسيات مميزة في أفضل الأماكن</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
                      🏛️
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">جولات تاريخية خاصة</div>
                      <div className="text-sm text-gray-600">
                        اكتشف تاريخ مصر العريق مع مرشد خاص
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full shadow-lg animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">مرر للأسفل لاكتشاف المزيد</div>
      </div>
    </header>
  );
};

export default ImprovedHeader;
