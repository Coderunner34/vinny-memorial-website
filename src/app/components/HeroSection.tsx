import { motion } from 'motion/react';
import { Phone, Send, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// Only the portrait images that will rotate
const portraitImages = [
  '/src/imports/WhatsApp Image 2026-05-02 at 18.01.14 (1).jpeg',
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.13_(1).jpeg',
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.11.jpeg',
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.15_(1).jpeg',
  '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.30.jpeg',
];

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setNextImageIndex((currentImageIndex + 1) % portraitImages.length);
      
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % portraitImages.length);
        setIsTransitioning(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className="bg-white border-b border-gray-100 py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-end items-center gap-3 text-xs md:text-sm">
          <a href="tel:+254722757996" className="text-gray-600 hover:text-amber-700 flex items-center gap-1">
            <Phone className="w-3 h-3" /> 0722 757 996
          </a>
          <a href="tel:+254712345678" className="text-gray-600 hover:text-amber-700 flex items-center gap-1">
            <Phone className="w-3 h-3" /> 0712 345 678
          </a>
          <button 
            onClick={() => scrollToSection('donate')}
            className="border border-amber-600 text-amber-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:bg-amber-50 transition"
          >
            <Send className="w-3 h-3" /> Send Flowers
          </button>
          <button className="border border-gray-300 text-gray-600 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm hover:border-amber-600 hover:text-amber-700 transition">
            Maumee Monument Care
          </button>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div 
              onClick={() => scrollToSection('hero')}
              className="cursor-pointer"
            >
              <span className="text-3xl md:text-4xl font-serif tracking-wide text-gray-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                VINNY
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-[-4px]">IN MEMORY OF</span>
            </div>

            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-xs xl:text-sm font-medium transition">About</button>
              <button onClick={() => scrollToSection('timeline')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-xs xl:text-sm font-medium transition">Timeline</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-xs xl:text-sm font-medium transition">Gallery</button>
              <button onClick={() => scrollToSection('tributes')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-xs xl:text-sm font-medium transition">Tributes</button>
              <button onClick={() => scrollToSection('service')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-xs xl:text-sm font-medium transition">Service</button>
              <button onClick={() => scrollToSection('livestream')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-xs xl:text-sm font-medium transition">Live Stream</button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gray-600">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 py-4 px-4">
            <div className="flex flex-col gap-3">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-sm py-2 border-b border-gray-50">About</button>
              <button onClick={() => scrollToSection('timeline')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-sm py-2 border-b border-gray-50">Timeline</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-sm py-2 border-b border-gray-50">Gallery</button>
              <button onClick={() => scrollToSection('tributes')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-sm py-2 border-b border-gray-50">Tributes</button>
              <button onClick={() => scrollToSection('service')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-sm py-2 border-b border-gray-50">Service</button>
              <button onClick={() => scrollToSection('livestream')} className="text-gray-600 hover:text-amber-700 uppercase tracking-wide text-sm py-2 border-b border-gray-50">Live Stream</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070")',
          }}
        />
        
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          
          {/* Rotating Portrait */}
          <div className="mx-auto mb-6 w-24 h-24 md:w-32 md:h-32">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
              <img
                src={portraitImages[currentImageIndex]}
                alt="Vincent Mwaura Wairimu"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              />
              
              <img
                src={portraitImages[nextImageIndex]}
                alt="Vincent Mwaura Wairimu"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${
                  isTransitioning ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Honor & Remember
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-1">
            Vincent Mwaura Wairimu
          </p>
          
          <p className="text-white/70 text-sm md:text-base italic mb-6">
            "Vinny" · 2005 — 2026 · Forever 21
          </p>

          <button
            onClick={() => scrollToSection('about')}
            className="bg-[#1a2a3a] hover:bg-[#2a3a4a] text-white px-6 md:px-8 py-2.5 md:py-3 rounded text-sm uppercase tracking-wider transition duration-300"
          >
            VIEW HIS STORY
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
        </div>
      </section>

      {/* Accessibility Icon */}
      <button 
        className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-[#1a2a3a] rounded-full flex items-center justify-center shadow-lg hover:bg-[#2a3a4a] transition"
        aria-label="Accessibility Options"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      </button>

      <style>{`
        .duration-600 {
          transition-duration: 600ms;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </>
  );
}