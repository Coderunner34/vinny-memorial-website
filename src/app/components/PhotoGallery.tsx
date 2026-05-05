import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

// ALL YOUR WORKING IMAGES - using the correct paths from your imports folder
const photos = [
  {
    id: 1,
    src: '/images/WhatsApp_Image_2026-05-02_at_18.01.11.jpeg',
    caption: 'With family - blessed moments together',
  },
  {
    id: 2,
    src: '/images/WhatsApp_Image_2026-05-02_at_18.01.12.jpeg',
    caption: 'The whole family - united in love',
  },
  {
    id: 3,
    src: '/images/WhatsApp_Image_2026-05-02_at_18.01.13_(1).jpeg',
    caption: 'The smile that lit every room',
  },
  {
    id: 4,
    src: '/images/WhatsApp_Image_2026-05-02_at_18.01.14.jpeg',
    caption: 'Family gathering in Eldoret',
  },
  {
    id: 5,
    src: '/images/WhatsApp_Image_2026-05-02_at_18.01.14_(2).jpeg',
    caption: 'Happy moments in Eldoret',
  },
  {
    id: 6,
    src: '/images/WhatsApp_Image_2026-05-02_at_18.01.15_(1).jpeg',
    caption: 'With his beloved cucu - precious memories',
  },
  // {
  //   id: 7,
  //   src: '/images/WhatsApp_Image_2026-05-03_at_21.34.07.jpeg',
  //   caption: 'Vinny in his element - radiant smile',
  // },
  // {
  //   id: 8,
  //   src: '/images/WhatsApp_Image_2026-05-03_at_21.34.09.jpeg',
  //   caption: 'Cherished family moment',
  // },
  // {
  //   id: 9,
  //   src: '/images/WhatsApp_Image_2026-05-03_at_21.34.11.jpeg',
  //   caption: 'Young Vinny - full of life and joy',
  // },
  {
    id: 10,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.12_(1).jpeg',
    caption: 'Celebrating with loved ones',
  },
  {
    id: 11,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.13.jpeg',
    caption: 'A moment of happiness',
  },
  {
    id: 12,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.14.jpeg',
    caption: 'Family time - pure joy',
  },
  {
    id: 13,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.16.jpeg',
    caption: 'The beautiful soul we will always remember',
  },
  // {
  //   id: 14,
  //   src: '/images/WhatsApp_Image_2026-05-03_at_21.34.21.jpeg',
  //   caption: 'Surrounded by love',
  // },
  {
    id: 15,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.22.jpeg',
    caption: 'Vinny ',
  },
  {
    id: 16,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.28.jpeg',
    caption: 'Creating beautiful memories in catering',
  },
  // {
  //   id: 17,
  //   src: '/images/WhatsApp_Image_2026-05-03_at_21.34.29_(2).jpeg',
  //   caption: 'Celebrating life together',
  // },
  {
    id: 18,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.30.jpeg',
    caption: 'With family at Njurii High school ',
  },
  // {
  //   id: 19,
  //   src: '/images/WhatsApp_Image_2026-05-03_at_21.34.31.jpeg',
  //   caption: 'A special moment captured in time',
  // },
  {
    id: 20,
    src: '/images/WhatsApp_Image_2026-05-03_at_21.34.31_(1).jpeg',
    caption: 'Celebrating life with loved ones',
  },
  // {
  //   id: 21,
  //   src: '/images/WhatsApp_Image_2026-05-04_at_01.48.42.jpeg',
  //   caption: 'A memory to treasure forever',
  // },
  {
    id: 22,
    src: '/images/WhatsApp Image 2026-05-02 at 18.01.14 (1).jpeg',
    caption: 'Vinny with his brother - unbreakable bond',
  },
  {
    id: 23,
    src: '/images/vinn&shoshschl.jpeg',
    caption: 'Vinny and his beloved grandmother',
  },
  {
    id: 24,
    src: '/images/fstdayincampus.jpeg',
    caption: 'First day at Mount Kenya University',
  },
  
  {
    id: 25,
    src: '/images/tree.png',
    caption: 'A peaceful memory',
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrevious();
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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-16 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        {isZoomed ? <ZoomOut className="w-5 h-5 text-white" /> : <ZoomIn className="w-5 h-5 text-white" />}
      </button>

      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
        {currentIndex + 1} / {photos.length}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
        className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goToNext(); }}
        className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hidden md:flex"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

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
          className={`object-contain w-full h-full transition-transform duration-300 ${isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in'}`}
          style={{ maxHeight: '85vh', maxWidth: '90vw' }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
          <p className="text-white/90 text-center text-sm md:text-base">{currentPhoto.caption}</p>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 hidden md:flex justify-center gap-2 overflow-x-auto px-4">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-16 h-16 rounded overflow-hidden transition-all duration-200 ${idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}
          >
            <img src={photo.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-24 left-0 right-0 text-center md:hidden">
        <p className="text-white/40 text-xs">← Swipe to navigate →</p>
      </div>
    </motion.div>
  );
}

// ============================================
// POLAROID SCRAPBOOK GALLERY
// ============================================
export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Generate random rotations for each photo (stored once, not changing on rerender)
  const [rotations] = useState(() => 
    photos.map(() => (Math.random() - 0.5) * 6) // -3deg to +3deg
  );
  
  const [yOffsets] = useState(() => 
    photos.map(() => (Math.random() - 0.5) * 8) // -4px to +4px
  );

  // Split photos into 3 columns for masonr y layout
  const getColumns = () => {
    const cols: Photo[][] = [[], [], []];
    photos.forEach((photo, idx) => {
      cols[idx % 3].push(photo);
    });
    return cols;
  };

  const columns = getColumns();

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-16 px-4 md:py-24 md:px-6"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      {/* Vintage paper background texture */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 h-px bg-amber-400/50 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-gray-700 tracking-wide mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Scattered Memories
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mt-6" />
          <p className="text-gray-400 mt-6 max-w-md mx-auto text-sm tracking-wide italic">
            Just like photos spread across a table — slightly messy, deeply real
          </p>
        </motion.div>

        {/* Polaroid Grid */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 justify-center">
          {columns.map((column, colIdx) => (
            <motion.div
              key={colIdx}
              className="flex-1 flex flex-col gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: colIdx * 0.1 }}
            >
              {column.map((photo, idx) => {
                const globalIndex = photos.findIndex(p => p.id === photo.id);
                const rotation = rotations[globalIndex];
                const yOffset = yOffsets[globalIndex];
                
                return (
                  <motion.div
                    key={photo.id}
                    className="group cursor-pointer"
                    style={{ 
                      transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
                      transition: 'transform 0.3s ease'
                    }}
                    whileHover={{ 
                      rotate: 0, 
                      scale: 1.02,
                      y: -8,
                      zIndex: 50,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => setSelectedPhotoIndex(globalIndex)}
                  >
                    {/* Polaroid Card */}
                    <div className="bg-white rounded-sm shadow-md overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      {/* Photo Container */}
                      <div className="relative overflow-hidden bg-gray-100" style={{ padding: '8px 8px 0 8px' }}>
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full aspect-square object-cover hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Polaroid Bottom (for handwritten caption area) */}
                      <div className="p-3 bg-white text-center">
                        <p className="text-gray-500 text-xs font-light italic tracking-wide" style={{ fontFamily: "'Caveat', 'Courier New', cursive" }}>
                          {photo.caption.length > 40 ? photo.caption.substring(0, 37) + '...' : photo.caption}
                        </p>
                        {/* Tiny decorative line like real Polaroids */}
                        <div className="w-8 h-px bg-gray-200 mx-auto mt-2" />
                      </div>
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
          className="text-center text-gray-400 text-sm mt-12 italic"
        >
          {photos.length} moments scattered in time · click any photo to remember
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