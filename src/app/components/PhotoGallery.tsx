import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

// All photos of Vinny - using all available images
const photos = [
  {
    id: 1,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.11.jpeg',
    caption: 'With family - blessed moments together',
  },
  {
    id: 2,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.13_(1).jpeg',
    caption: 'The smile that lit every room ',
  },
  {
    id: 3,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.15_(1).jpeg',
    caption: 'With his beloved cucu - precious memories',
  },
  {
    id: 4,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.14.jpeg',
    caption: 'Family gathering in Eldoret',
  },
  {
    id: 5,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.14_(2).jpeg',
    caption: 'Young Vinny - full of life and joy',
  },
  {
    id: 6,
    src: '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.30.jpeg',
    caption: 'Church family at P.C.E.A. Gituamba',
  },
  {
    id: 7,
    src: '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.31_(1).jpeg',
    caption: 'Celebrating life with loved ones',
  },
  {
    id: 8,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.12.jpeg',
    caption: 'The whole family - united in love',
  },
  {
    id: 9,
    src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.14_(2).jpeg',
    caption: 'Happy moments in Eldoret',
  },
];

// ============================================
// LIGHTBOX COMPONENT
// ============================================
interface Photo {
  id: number;
  src: string;
  caption: string;
}

function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentPhoto = photos[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    setIsZoomed(false);
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setTouchStart(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Zoom button */}
      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-16 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        {isZoomed ? <ZoomOut className="w-5 h-5 text-white" /> : <ZoomIn className="w-5 h-5 text-white" />}
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Previous button - desktop only */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next button - desktop only */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hidden md:flex"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Main image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-[90vw] max-h-[85vh] md:max-w-[80vw] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.src}
          alt={currentPhoto.caption}
          className={`object-contain w-full h-full transition-transform duration-300 ${
            isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in'
          }`}
          style={{ maxHeight: '85vh', maxWidth: '90vw' }}
        />
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
          <p className="text-white/90 text-center text-sm md:text-base">
            {currentPhoto.caption}
          </p>
        </div>
      </motion.div>

      {/* Thumbnail strip - desktop only */}
      <div className="absolute bottom-6 left-0 right-0 hidden md:flex justify-center gap-2 overflow-x-auto px-4">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-16 h-16 rounded overflow-hidden transition-all duration-200 ${
              idx === currentIndex
                ? 'ring-2 ring-white scale-110'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={photo.src}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Swipe hint for mobile */}
      <div className="absolute bottom-24 left-0 right-0 text-center md:hidden">
        <p className="text-white/40 text-xs">← Swipe to navigate →</p>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN PHOTO GALLERY COMPONENT
// ============================================
export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(3);

  // Responsive columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Calculate masonry layout
  const getColumnedPhotos = () => {
    const columns_array: typeof photos[] = Array.from({ length: columns }, () => []);
    photos.forEach((photo, index) => {
      columns_array[index % columns].push(photo);
    });
    return columns_array;
  };

  const columnedPhotos = getColumnedPhotos();

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-16 px-4 md:py-24 md:px-6"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 h-px bg-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-gray-800 tracking-wide mb-3">
            Memories in Pictures
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mt-6" />
          <p className="text-gray-400 mt-6 max-w-md mx-auto text-sm tracking-wide">
            A glimpse into moments that defined a beautiful life
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="flex gap-3 md:gap-4">
          {columnedPhotos.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex-1 flex flex-col gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: colIndex * 0.1 }}
            >
              {column.map((photo, idx) => {
                // Calculate random height for masonry effect
                const heights = [320, 380, 350, 420, 300, 360, 340, 400, 370];
                const height = heights[(photo.id - 1) % heights.length];
                
                return (
                  <motion.div
                    key={photo.id}
                    className="relative group cursor-pointer overflow-hidden rounded-sm bg-gray-100"
                    style={{ height: `${height}px` }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedPhotoIndex(photos.findIndex(p => p.id === photo.id))}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-white text-center p-4">
                        <p className="text-sm font-light tracking-wide">{photo.caption}</p>
                      </div>
                    </div>
                    
                    {/* Light indicator on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 shadow-inner" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-12"
        >
          Click on any photo to view full gallery
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <Lightbox
            photos={photos}
            initialIndex={selectedPhotoIndex}
            onClose={() => setSelectedPhotoIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}