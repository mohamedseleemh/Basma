import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye, X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

const ImprovedGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ['/api/gallery'],
  });

  const activeItems = galleryItems
    .filter((item: GalleryItem) => item.is_active)
    .sort((a: GalleryItem, b: GalleryItem) => a.sort_order - b.sort_order);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % activeItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(activeItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(activeItems[prevIndex]);
  };

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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-purple-50/30"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <ImageIcon className="w-4 h-4" />
            معرض الصور
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">لحظات لا تُنسى</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            شاهد مجموعة من أجمل اللحظات والتجارب التي عاشها عملاؤنا معنا
          </p>
        </div>

        {activeItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد صور متاحة حالياً</h3>
            <p className="text-gray-500">سيتم إضافة الصور قريباً</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {activeItems.map((item: GalleryItem, index: number) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-gray-800" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-medium">{item.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* View all button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                عرض المزيد
              </button>
            </div>
          </>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation */}
              {activeItems.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title || 'Gallery image'}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {/* Image info */}
                {(selectedImage.title || selectedImage.description) && (
                  <div className="p-6">
                    {selectedImage.title && (
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {selectedImage.title}
                      </h3>
                    )}
                    {selectedImage.description && (
                      <p className="text-gray-600">{selectedImage.description}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Counter */}
              {activeItems.length > 1 && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm">
                  {currentIndex + 1} من {activeItems.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImprovedGallery;
