import React from 'react';
import Navigation from '../components/Navigation';
import ImprovedHeader from '../components/ImprovedHeader';
import ImprovedServices from '../components/ImprovedServices';
import ImprovedTestimonials from '../components/ImprovedTestimonials';
import ImprovedGallery from '../components/ImprovedGallery';
import ImprovedContact from '../components/ImprovedContact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-purple-50 to-pink-50 overflow-x-hidden">
      <Navigation />
      {/* شريط مميزات سريع */}
      <div className="w-full bg-gradient-to-r from-purple-100 to-pink-100 py-3 flex flex-wrap items-center justify-center gap-6 text-base font-semibold text-purple-800 z-20 relative border-b border-purple-200 shadow-sm">
        <span className="flex items-center gap-2"><span className="text-lg">⚡</span>حجز فوري</span>
        <span className="flex items-center gap-2"><span className="text-lg">🔒</span>دفع آمن</span>
        <span className="flex items-center gap-2"><span className="text-lg">💬</span>دعم 24/7</span>
        <span className="flex items-center gap-2"><span className="text-lg">⭐</span>تجارب موثوقة</span>
      </div>
      <ImprovedHeader />

      {/* خطوات الحجز */}
      <section className="py-16 bg-gradient-to-br from-white to-purple-50 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-12 tracking-tight">كيف تبدأ رحلتك مع بسمة نبيل؟</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all border border-purple-100 hover:border-purple-300">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-3xl rounded-full shadow-lg">1</div>
              <h3 className="font-bold text-xl mb-2 text-purple-700">اختر الخدمة</h3>
              <p className="text-gray-600">تصفح خدماتنا المتنوعة واختر التجربة الأنسب لك</p>
            </div>
            <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all border border-purple-100 hover:border-purple-300">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-3xl rounded-full shadow-lg">2</div>
              <h3 className="font-bold text-xl mb-2 text-purple-700">احجز بسهولة</h3>
              <p className="text-gray-600">املأ نموذج الحجز أو تواصل معنا مباشرة عبر الواتساب</p>
            </div>
            <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all border border-purple-100 hover:border-purple-300">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-3xl rounded-full shadow-lg">3</div>
              <h3 className="font-bold text-xl mb-2 text-purple-700">استمتع بالتجربة</h3>
              <p className="text-gray-600">فريقنا يهتم بكل التفاصيل لتعيش تجربة لا تُنسى</p>
            </div>
          </div>
        </div>
      </section>

      {/* شريط العملاء والشركاء */}
      <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 py-5 flex flex-wrap items-center justify-center gap-10 border-b border-purple-100 z-10 relative shadow-sm">
        <span className="text-3xl" title="فنادق كبرى">🏨</span>
        <span className="text-3xl" title="شركات سياحة">🛳️</span>
        <span className="text-3xl" title="شخصيات عامة">👑</span>
        <span className="text-3xl" title="عملاء مميزون">🌟</span>
        <span className="text-3xl" title="شركاء نجاح">🤝</span>
      </div>

      {/* انتقال سلس بين الأقسام */}
      <div className="space-y-0">
        <ImprovedServices />
        <div className="h-12" />
        <ImprovedTestimonials />
        <div className="h-12" />
        <ImprovedGallery />
        <div className="h-12" />
      </div>

      {/* قسم أسئلة شائعة مختصر */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white border-t border-b border-purple-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-10 text-center tracking-tight">أسئلة شائعة</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold text-lg mb-2">هل يمكن تخصيص تجربة خاصة؟</h3>
              <p className="text-gray-600">نعم، يمكننا تصميم تجربة سياحية حسب رغبتك واحتياجاتك. فقط تواصل معنا!</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">ما طرق الدفع المتاحة؟</h3>
              <p className="text-gray-600">نوفر خيارات دفع إلكتروني آمنة بالإضافة للدفع النقدي عند بعض الخدمات.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">هل الخدمة متاحة طوال الأسبوع؟</h3>
              <p className="text-gray-600">نعم، فريقنا متواجد لخدمتك 24 ساعة طوال أيام الأسبوع.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">كيف أتواصل معكم بسرعة؟</h3>
              <p className="text-gray-600">يمكنك التواصل عبر نموذج الموقع أو مباشرة عبر الواتساب في أي وقت.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-12" />
      <ImprovedContact />
      <Footer />

      {/* زر واتساب عائم */}
      <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl p-4 flex items-center gap-2 animate-bounce cursor-pointer transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.98L0 24l6.22-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.7 0-3.37-.44-4.83-1.28l-.34-.2-3.69.96.99-3.59-.22-.36A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.07 4.88 4.19.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
        <span className="font-bold text-lg hidden sm:inline">تواصل واتساب</span>
      </a>
    </div>
  );
};

export default Index;
