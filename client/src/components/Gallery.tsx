import React, { useState } from 'react';
import { Play, X, Image, Camera, Heart, Star, Zap, Crown } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=500&fit=crop',
      alt: 'رحلة نيلية فاخرة',
      title: '🚢 رحلة نيلية فاخرة',
      category: 'مراكب نيلية',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop',
      alt: 'مطعم راقي',
      title: '🍽️ مطعم راقي VIP',
      category: 'حجوزات مطاعم',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=500&fit=crop',
      alt: 'سهرة مميزة',
      title: '🎉 سهرة مميزة',
      category: 'سهرات وخروجات',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=500&fit=crop',
      alt: 'إطلالة نيلية',
      title: '🌅 إطلالة ساحرة على النيل',
      category: 'إطلالات نيلية',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=600&h=500&fit=crop',
      alt: 'طعام فاخر',
      title: '🥘 أشهى المأكولات',
      category: 'طعام وشراب',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=500&fit=crop',
      alt: 'أجواء رومانسية',
      title: '💕 أجواء رومانسية',
      category: 'أجواء خاصة',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=500&fit=crop',
      alt: 'حفلة موسيقية',
      title: '🎵 حفلة موسيقية',
      category: 'حفلات ومباريات',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=500&fit=crop',
      alt: 'نايت كلاب',
      title: '🕺 نايت كلاب VIP',
      category: 'نايت كلاب',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1549451371-64aa98a6f640?w=600&h=500&fit=crop',
      alt: 'سهرة جماعية',
      title: '👥 سهرة جماعية',
      category: 'سهرات جماعية',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="gallery">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black opacity-80"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 glass-effect px-8 py-4 rounded-2xl">
            <span className="gradient-text-advanced font-bold text-lg flex items-center gap-3">
              <Camera className="w-5 h-5" />
              معرض الصور والذكريات
              <Star className="w-5 h-5" />
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 dancing-script neon-text">
            🎨 لحظات لا تُنسى 🎨
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            استمتع بمشاهدة أجمل اللحظات من تجارب عملائنا المميزة مع جروب VIB
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl cursor-pointer transform hover:scale-105 transition-all duration-700 hover-lift-intense magnetic"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-800 morph-card">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>

              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-white font-bold text-2xl mb-2">{item.title}</h3>
                </div>
              </div>

              {/* Premium Action Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 glass-effect rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300">
                  <Image className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Premium Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-4 text-white hover:text-gray-300 transition-colors z-10 glass-effect w-12 h-12 rounded-full flex items-center justify-center"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="morph-card overflow-hidden">
                <img
                  src={galleryItems[selectedImage].src}
                  alt={galleryItems[selectedImage].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 rounded-b-2xl">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    {galleryItems[selectedImage].category}
                  </span>
                  <h3 className="text-white font-bold text-3xl">
                    {galleryItems[selectedImage].title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revolutionary Call to Action */}
        <div className="text-center">
          <div className="glass-effect p-12 max-w-4xl mx-auto rounded-3xl">
            <div className="flex justify-center items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-current animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <h3 className="text-4xl font-bold gradient-text-advanced mb-6 dancing-script">
              🌟 هل تريد أن تكون جزءاً من هذه التجارب المميزة؟ 🌟
            </h3>
            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              انضم إلى جروب VIB واصنع ذكرياتك الخاصة مع أفضل الخدمات والتجارب الاستثنائية
            </p>
            <a
              href="https://wa.me/201066544784"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-btn px-12 py-6 text-xl font-bold text-white shadow-2xl hover-lift-intense group inline-flex items-center gap-4"
            >
              <Heart className="w-6 h-6 group-hover:animate-bounce" />
              احجز تجربتك الآن
              <Zap className="w-6 h-6 group-hover:animate-spin" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
