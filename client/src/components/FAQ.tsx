import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'كيف يمكنني حجز رحلة؟',
      answer:
        'يمكنك حجز رحلة بسهولة من خلال موقعنا الإلكتروني أو عبر الاتصال بنا مباشرة. املأ نموذج الحجز واختر الباقة التي تناسبك، وسيتم التواصل معك خلال 24 ساعة لتأكيد الحجز.',
    },
    {
      question: 'ما هي وسائل الدفع المتاحة؟',
      answer:
        'نقبل جميع وسائل الدفع الرئيسية بما في ذلك البطاقات الائتمانية (فيزا، ماستركارد)، التحويل البنكي، والدفع النقدي. يمكنك أيضاً الدفع بالتقسيط لبعض الباقات.',
    },
    {
      question: 'هل يمكنني إلغاء أو تعديل الحجز؟',
      answer:
        'نعم، يمكنك إلغاء الحجز حتى 48 ساعة قبل موعد الرحلة مع استرداد 80% من المبلغ. للتعديل، يمكنك التواصل معنا قبل 24 ساعة على الأقل من موعد الرحلة.',
    },
    {
      question: 'هل تشمل الباقات وجبات الطعام؟',
      answer:
        'نعم، معظم باقاتنا تشمل وجبات الطعام. الباقة الأساسية تشمل وجبة غداء، والباقة المميزة تشمل وجبتين، أما الباقة الملكية فتشمل جميع الوجبات.',
    },
    {
      question: 'ما هي المدة الزمنية للرحلات؟',
      answer:
        'تتراوح مدة الرحلات من يوم واحد إلى 3 أيام حسب الباقة المختارة. الباقة الأساسية ليوم واحد، والمميزة ليومين، والملكية لثلاثة أيام.',
    },
    {
      question: 'هل يوجد مرشد سياحي مع الرحلة؟',
      answer:
        'نعم، جميع رحلاتنا تشمل مرشد سياحي متخصص يتحدث العربية والإنجليزية. يمكنك أيضاً طلب مرشد خاص مقابل رسوم إضافية.',
    },
    {
      question: 'هل النقل مشمول في الباقة؟',
      answer:
        'نعم، جميع باقاتنا تشمل خدمة النقل من وإلى الفندق أو المطار. نستخدم سيارات حديثة ومكيفة مع سائقين محترفين.',
    },
    {
      question: 'ما هي أفضل الأوقات للحجز؟',
      answer:
        'يمكنك الحجز في أي وقت من السنة، لكن أفضل الأوقات هي من أكتوبر إلى مارس حيث يكون الطقس معتدلاً. ننصح بالحجز المبكر للحصول على أفضل الأسعار.',
    },
    {
      question: 'هل يمكن حجز رحلة جماعية؟',
      answer:
        'نعم، نقدم خصومات خاصة للمجموعات (أكثر من 8 أشخاص). يمكنك التواصل معنا لمناقشة الأسعار والترتيبات الخاصة للمجموعات.',
    },
    {
      question: 'ماذا يحدث في حالة سوء الأحوال الجوية؟',
      answer:
        'في حالة سوء الأحوال الجوية، سيتم إعادة جدولة الرحلة لتاريخ آخر يناسبك، أو يمكنك اختيار استرداد المبلغ كاملاً.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 morph-bg opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 float-element"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 float-element-reverse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dancing-script">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا وعملية الحجز
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="morph-card overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {activeIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {activeIndex === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="morph-card p-8 bg-gradient-to-r from-purple-50 to-pink-50 text-center">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4 dancing-script">
              لم تجد إجابة لسؤالك؟
            </h3>
            <p className="text-gray-600 mb-6">فريق خدمة العملاء متاح 24/7 لمساعدتك في أي استفسار</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+20 12 345 6789</span>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 w-full">
                  اتصل بنا
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>support@vib-bookings.com</span>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 w-full">
                  راسلنا
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
