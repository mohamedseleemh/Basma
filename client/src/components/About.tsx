import { Award, Users, Star, Heart, Shield, Clock } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: Users, number: '5000+', label: 'عميل سعيد' },
    { icon: Star, number: '4.9', label: 'تقييم العملاء' },
    { icon: Award, number: '15+', label: 'جائزة تميز' },
    { icon: Clock, number: '24/7', label: 'خدمة عملاء' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'الشغف',
      description: 'نحن متحمسون لتقديم أفضل التجارب السياحية التي تترك أثراً لا يُنسى',
    },
    {
      icon: Shield,
      title: 'الثقة',
      description: 'نضمن لك تجربة آمنة وموثوقة مع أعلى معايير الجودة والاحترافية',
    },
    {
      icon: Award,
      title: 'التميز',
      description: 'نسعى دائماً لتحقيق التميز في كل خدمة نقدمها لعملائنا الكرام',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 morph-bg opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 float-element"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 float-element-reverse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dancing-script">
            من نحن
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            شركة VIB للحجوزات المميزة، رائدة في تقديم أفضل التجارب السياحية والترفيهية في مصر
          </p>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="morph-card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                نسعى لأن نكون الخيار الأول لكل من يبحث عن تجربة سياحية فريدة ومميزة في مصر. نؤمن بأن
                السياحة ليست مجرد زيارة أماكن، بل هي تجربة حياة تستحق أن تُعاش بأفضل طريقة ممكنة.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">مهمتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                نقدم خدمات حجز متكاملة تشمل الرحلات النيلية الفاخرة، تجارب الحياة الليلية المميزة،
                والجولات السياحية الخاصة. نحن نهتم بكل التفاصيل لضمان حصولك على تجربة لا تُنسى.
              </p>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="morph-card p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 dancing-script">قصتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                بدأت رحلتنا من حب مصر وتراثها العريق. أردنا أن نشارك هذا الحب مع العالم، فأنشأنا VIB
                لنكون الجسر الذي يربط بين الضيوف وجمال مصر الساحر.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="morph-card p-6 text-center hover-lift-intense">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2 dancing-script">
                {achievement.number}
              </div>
              <p className="text-gray-600 font-medium">{achievement.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 dancing-script">
            قيمنا
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="morph-card p-8 text-center hover-lift-intense">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="morph-card p-8 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 dancing-script">
              انضم إلى عائلة VIB
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              اكتشف مصر بطريقة جديدة ومميزة. احجز تجربتك القادمة معنا واستمتع بخدمة لا مثيل لها
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              ابدأ رحلتك الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
