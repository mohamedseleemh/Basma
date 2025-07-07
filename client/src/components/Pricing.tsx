import { Check, Star, Crown, Sparkles, Calendar } from 'lucide-react';

const Pricing = () => {
  const packages = [
    {
      name: 'الباقة الأساسية',
      price: '299',
      duration: 'يوم واحد',
      icon: Star,
      gradient: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        'رحلة نيلية لمدة 3 ساعات',
        'وجبة غداء فاخرة',
        'مشروبات ترحيبية',
        'مرشد سياحي',
        'تصوير فوتوغرافي',
        'خدمة النقل',
      ],
    },
    {
      name: 'الباقة المميزة',
      price: '599',
      duration: 'يومين',
      icon: Crown,
      gradient: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'رحلة نيلية فاخرة لمدة 5 ساعات',
        'وجبتين (غداء + عشاء)',
        'مشروبات مفتوحة',
        'جولة في الأهرامات',
        'تجربة الحياة الليلية',
        'فندق 4 نجوم ليلة واحدة',
        'خدمة النقل الفاخرة',
        'تصوير احترافي',
      ],
    },
    {
      name: 'الباقة الملكية',
      price: '1299',
      duration: '3 أيام',
      icon: Sparkles,
      gradient: 'from-amber-500 to-orange-500',
      popular: false,
      features: [
        'رحلة نيلية ملكية لمدة 7 ساعات',
        'جميع الوجبات مشمولة',
        'مشروبات مفتوحة وكوكتيلات',
        'جولة كاملة في القاهرة والأقصر',
        'تجربة الحياة الليلية VIP',
        'فندق 5 نجوم لمدة ليلتين',
        'خدمة النقل الفاخرة',
        'تصوير احترافي + فيديو',
        'مساج وسبا',
        'خدمة كونسيرج شخصي',
      ],
    },
  ];

  const addOns = [
    { name: 'تصوير فيديو إضافي', price: '150' },
    { name: 'خدمة النقل من المطار', price: '80' },
    { name: 'وجبة إضافية', price: '50' },
    { name: 'مرشد سياحي خاص', price: '120' },
    { name: 'جولة تسوق', price: '100' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 morph-bg opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 float-element"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 float-element-reverse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dancing-script">
            باقاتنا المميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            اختر الباقة التي تناسب احتياجاتك واستمتع بتجربة لا تُنسى في مصر
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`morph-card p-8 relative hover-lift-intense ${pkg.popular ? 'border-2 border-purple-500 scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    الأكثر طلباً
                  </div>
                </div>
              )}

              {/* Package Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-r ${pkg.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <pkg.icon className="w-8 h-8 text-white" />
              </div>

              {/* Package Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-gray-800 mb-2 dancing-script">
                  ${pkg.price}
                </div>
                <p className="text-gray-600">{pkg.duration}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full bg-gradient-to-r ${pkg.gradient} text-white py-3 px-6 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
              >
                احجز الآن
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 dancing-script">خدمات إضافية</h3>
            <p className="text-gray-600">أضف المزيد من الخدمات المميزة لتجربتك</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {addOns.map((addon, index) => (
              <div key={index} className="morph-card p-6 text-center hover-lift-intense">
                <h4 className="font-bold text-gray-800 mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-primary mb-4 dancing-script">
                  ${addon.price}
                </div>
                <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300">
                  إضافة
                </button>
              </div>
            ))}
          </div>

          {/* Booking Notice */}
          <div className="morph-card p-8 bg-gradient-to-r from-blue-50 to-purple-50 text-center">
            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4 dancing-script">
              احجز مبكراً واحصل على خصم 15%
            </h3>
            <p className="text-gray-600 mb-6">
              احجز تجربتك قبل أسبوعين على الأقل واستمتع بخصم مميز على جميع الباقات
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              احجز الآن وادخر المال
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 dancing-script">
            الأسئلة الشائعة
          </h3>

          <div className="space-y-6">
            <div className="morph-card p-6">
              <h4 className="font-bold text-gray-800 mb-3">
                هل يمكنني تعديل الباقة حسب احتياجاتي؟
              </h4>
              <p className="text-gray-600">
                نعم، يمكنك تخصيص أي باقة لتناسب احتياجاتك الخاصة. تواصل معنا لمناقشة التفاصيل
                والأسعار.
              </p>
            </div>

            <div className="morph-card p-6">
              <h4 className="font-bold text-gray-800 mb-3">ماذا يحدث في حالة إلغاء الحجز؟</h4>
              <p className="text-gray-600">
                يمكنك إلغاء الحجز حتى 48 ساعة قبل موعد الرحلة مع استرداد 80% من المبلغ. الإلغاء خلال
                24 ساعة يخضع لرسوم إضافية.
              </p>
            </div>

            <div className="morph-card p-6">
              <h4 className="font-bold text-gray-800 mb-3">هل الأسعار شاملة الضرائب؟</h4>
              <p className="text-gray-600">
                نعم، جميع الأسعار المعروضة شاملة الضرائب والرسوم الإضافية. لا توجد رسوم خفية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
