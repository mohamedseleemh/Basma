import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  Star,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

const Booking = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    guests: 1,
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const services = [
    { id: 'nile-cruise', name: 'رحلة نيلية فاخرة', price: '500' },
    { id: 'nightlife', name: 'تجربة الحياة الليلية', price: '300' },
    { id: 'private-tour', name: 'جولة خاصة', price: '800' },
    { id: 'vip-package', name: 'باقة VIP الكاملة', price: '1200' },
  ];

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '19:00',
    '20:00',
    '21:00',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'تم الحجز بنجاح!',
          description: 'سيتم التواصل معكم قريباً لتأكيد الحجز',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          guests: 1,
          specialRequests: '',
        });
      } else {
        throw new Error('فشل في إرسال الحجز');
      }
    } catch (error) {
      toast({
        title: 'خطأ في الحجز',
        description: 'حدث خطأ أثناء إرسال الحجز. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 morph-bg opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 float-element"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 float-element-reverse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dancing-script">
            احجز تجربتك المميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            املأ النموذج أدناه وسيتم التواصل معك خلال 24 ساعة لتأكيد الحجز
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="morph-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <User className="w-4 h-4" />
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        placeholder="أدخل اسمك الكامل"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <Mail className="w-4 h-4" />
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <Phone className="w-4 h-4" />
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        placeholder="+20 12 345 6789"
                        required
                      />
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <Star className="w-4 h-4" />
                        الخدمة المطلوبة
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        required
                      >
                        <option value="">اختر الخدمة</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <Calendar className="w-4 h-4" />
                        التاريخ
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <Clock className="w-4 h-4" />
                        الوقت
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        required
                      >
                        <option value="">اختر الوقت</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium">
                        <Users className="w-4 h-4" />
                        عدد الضيوف
                      </label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                        min="1"
                        max="20"
                        required
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 font-medium">
                      <MapPin className="w-4 h-4" />
                      طلبات خاصة (اختياري)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="أي طلبات خاصة أو ملاحظات إضافية..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        تأكيد الحجز
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Info */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="morph-card p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  تواصل معنا
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">+20 12 345 6789</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">info@vib-bookings.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">القاهرة، مصر</span>
                  </div>
                </div>
              </div>

              {/* Booking Benefits */}
              <div className="morph-card p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">لماذا تختار VIB؟</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">خدمة عملاء 24/7</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">أسعار تنافسية</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">تجربة فاخرة ومميزة</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">ضمان الجودة</span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="morph-card p-6 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">تنبيه هام</h4>
                    <p className="text-amber-700 text-sm">
                      يرجى التأكد من صحة البيانات المدخلة حيث سيتم التواصل معك على الأرقام
                      والإيميلات المذكورة
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
