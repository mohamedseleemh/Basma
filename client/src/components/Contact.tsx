import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Clock,
  Star,
  Send,
  MapPin,
  Mail,
  Instagram,
  Heart,
  Sparkles,
  Crown,
  Zap,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `مرحباً بسمة، أنا ${formData.name}%0Aرقم التليفون: ${formData.phone}%0Aالخدمة المطلوبة: ${formData.service}%0Aالرسالة: ${formData.message}`;
    window.open(`https://wa.me/201066544784?text=${whatsappMessage}`, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-32 relative overflow-hidden" id="contact">
      {/* Revolutionary Background */}
      <div className="absolute inset-0 morph-bg"></div>
      <div className="absolute inset-0 cosmic-bg"></div>

      {/* Premium Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${60 + Math.random() * 120}px`,
              height: `${60 + Math.random() * 120}px`,
              background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3) 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(25px)',
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white mb-20">
            <div className="inline-block mb-8 glass-effect px-12 py-6 rounded-3xl magnetic">
              <span className="gradient-text-advanced font-bold text-2xl flex items-center gap-4">
                <Crown className="w-8 h-8 animate-pulse" />
                تواصل معنا
                <Sparkles className="w-8 h-8 wiggle" />
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold mb-8 dancing-script neon-text">
              🌟 جاهزة لخدمتك 🌟
            </h2>
            <p className="text-2xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
              تواصل معي الآن واحجز تجربتك المميزة - نحن هنا لجعل كل لحظة لا تُنسى مع خدمة VIP
              استثنائية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Premium Contact Form */}
            <div className="glass-effect rounded-3xl p-12 border border-white/30 hover-lift-intense magnetic">
              <h3 className="text-3xl font-bold text-white mb-8 text-center gradient-text-advanced">
                ✨ احجز استشارة مجانية ✨
              </h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/15 border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-500 text-lg backdrop-blur-sm"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/15 border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-500 text-lg backdrop-blur-sm"
                  />
                </div>
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/15 border border-white/40 text-white focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-500 text-lg backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800 text-white">
                      اختر الخدمة المطلوبة
                    </option>
                    <option value="مراكب نيلية VIP" className="bg-gray-800 text-white">
                      🚢 مراكب نيلية VIP
                    </option>
                    <option value="سهرات وديسكو" className="bg-gray-800 text-white">
                      🎉 سهرات وديسكو
                    </option>
                    <option value="حفلات ومباريات" className="bg-gray-800 text-white">
                      🎵 حفلات ومباريات
                    </option>
                    <option value="نايت كلاب" className="bg-gray-800 text-white">
                      🕺 نايت كلاب
                    </option>
                    <option value="استشارة عامة" className="bg-gray-800 text-white">
                      💬 استشارة عامة
                    </option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="رسالتك أو تفاصيل إضافية"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl bg-white/15 border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-500 resize-none text-lg backdrop-blur-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full liquid-btn py-6 px-8 text-xl font-bold transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-4"
                >
                  <span className="flex items-center gap-3">
                    <Send className="w-6 h-6" />
                    إرسال عبر واتساب
                    <MessageCircle className="w-6 h-6" />
                  </span>
                </button>
              </form>
            </div>

            {/* Premium Contact Info */}
            <div className="space-y-8">
              <div className="glass-effect rounded-3xl p-10 border border-white/30 hover-lift-intense magnetic transform hover:rotate-1 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-6 shadow-2xl">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white gradient-text-advanced">
                    واتساب VIP
                  </h3>
                </div>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  للحجز والاستفسار السريع - متاحة 24/7 مع استجابة فورية
                </p>
                <a
                  href="https://wa.me/201066544784"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl text-white"
                >
                  <MessageCircle className="w-6 h-6" />
                  +20 106 654 4784
                  <Heart className="w-6 h-6 animate-bounce" />
                </a>
              </div>

              <div className="glass-effect rounded-3xl p-10 border border-white/30 hover-lift-intense magnetic transform hover:rotate-1 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-6 shadow-2xl">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white gradient-text-advanced">
                    اتصال مباشر
                  </h3>
                </div>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  للتواصل المباشر والحجز الفوري مع خدمة شخصية مميزة
                </p>
                <a
                  href="tel:+201066544784"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-8 py-4 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl text-white"
                >
                  <Phone className="w-6 h-6" />
                  اتصل الآن
                  <Zap className="w-6 h-6 animate-pulse" />
                </a>
              </div>

              <div className="glass-effect rounded-3xl p-10 border border-white/30">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-6 shadow-2xl">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white gradient-text-advanced">
                    أوقات العمل
                  </h3>
                </div>
                <div className="space-y-3 text-white/90 text-xl">
                  <p>
                    <strong className="text-white">الأحد - الخميس:</strong> 9:00 ص - 12:00 م
                  </p>
                  <p>
                    <strong className="text-white">الجمعة - السبت:</strong> 10:00 ص - 2:00 ص
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <p className="text-yellow-300 font-semibold text-lg">متاحة للطوارئ 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Bottom CTA */}
          <div className="text-center">
            <div className="glass-effect rounded-3xl p-16 border border-white/30">
              <h3 className="text-5xl font-bold text-white mb-8 dancing-script neon-text">
                🌟 جروب VIB المميز 🌟
              </h3>
              <div className="flex justify-center items-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-10 h-10 text-yellow-300 fill-current animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                انضم إلى مجموعتنا المميزة واستمتع بأفضل العروض والخدمات الحصرية مع تجربة VIP
                استثنائية لا تُنسى
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-effect px-8 py-6 rounded-2xl text-white font-semibold text-lg hover-lift-intense magnetic">
                  🎯 خدمة شخصية مميزة
                </div>
                <div className="glass-effect px-8 py-6 rounded-2xl text-white font-semibold text-lg hover-lift-intense magnetic">
                  ✨ عروض حصرية للأعضاء
                </div>
                <div className="glass-effect px-8 py-6 rounded-2xl text-white font-semibold text-lg hover-lift-intense magnetic">
                  🏆 جودة عالمية مضمونة
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
