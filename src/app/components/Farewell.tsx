// Farewell.tsx - With RIP image as subtle background
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export default function Farewell() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      
      {/* Background Image - Your viiinyRIP.png as subtle overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/src/imports/viiinyRIP.png")',
          opacity: 0.15,
        }}
      />
      
      {/* Dark overlay for text readability - keeps text readable while image shows through */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content - stays on top, fully readable */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        
        {/* Final Candle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="relative mb-12 mx-auto w-fit"
        >
          <div className="relative w-3 h-20 mx-auto">
            {/* Candle body */}
            <div className="absolute bottom-0 w-3 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm shadow-2xl" />

            {/* Flame */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2"
              animate={{
                scaleY: [1, 1.15, 0.95, 1.1, 1],
                scaleX: [1, 0.9, 1.1, 0.95, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 blur-2xl bg-orange-500/50 w-16 h-16 -translate-x-1/2 left-1/2" />
              <svg width="32" height="40" viewBox="0 0 24 32" className="relative">
                <defs>
                  <linearGradient id="farewellFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="40%" stopColor="#FFD54F" />
                    <stop offset="70%" stopColor="#FF9800" />
                    <stop offset="100%" stopColor="#FF6F00" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 0 C8 8, 4 12, 4 18 C4 24, 7 28, 12 28 C17 28, 20 24, 20 18 C20 12, 16 8, 12 0 Z"
                  fill="url(#farewellFlame)"
                />
                <motion.ellipse
                  cx="12"
                  cy="18"
                  rx="5"
                  ry="8"
                  fill="#FFF9E6"
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-serif text-amber-100 mb-6 tracking-wide"
        >
          Vincent Mwaura Wairimu
        </motion.h2>

        {/* Dates */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl md:text-3xl text-amber-300/70 mb-8 tracking-widest font-light"
        >
          2005 — 2026
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent max-w-md mx-auto mb-12"
        />

        {/* Rest in Peace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mb-8"
        >
          <p className="text-3xl md:text-4xl text-amber-100 font-serif italic mb-6">
            Rest in Peace
          </p>
          <p className="text-xl md:text-2xl text-amber-100/80 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
            Until we meet again in glory
          </p>
        </motion.div>

        {/* Final Scripture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl text-amber-100/70 italic leading-relaxed mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            "Blessed are those who mourn, for they shall be comforted."
          </p>
          <p className="text-amber-300/60 text-sm tracking-wider">
            — Matthew 5:4
          </p>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="space-y-4"
        >
          <p className="text-amber-100/60 text-lg leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
            Though the candle has been extinguished,
          </p>
          <p className="text-amber-100/60 text-lg leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
            the light it gave will never fade.
          </p>
          <p className="text-amber-100/60 text-lg leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
            Vinny lives on in every heart he touched,
          </p>
          <p className="text-amber-100/60 text-lg leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
            in every life he changed,
          </p>
          <p className="text-amber-100/60 text-lg leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
            in every soul he inspired.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-20 pt-12 border-t border-amber-400/20"
        >
          <p className="text-amber-100/40 text-sm">
            Created with love by family and friends
          </p>
          <p className="text-amber-100/30 text-xs mt-2">
            In loving memory of Vincent Mwaura Wairimu "Vinny"
          </p>
        </motion.div>
      </div>
    </section>
  );
}