import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';

export default function Farewell() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [candleLit, setCandleLit] = useState(true);
  const [candleIntensity, setCandleIntensity] = useState(1);
  const [smokeParticles, setSmokeParticles] = useState<{ id: number; x: number; y: number; opacity: number; size: number }[]>([]);
  const [candleFlicker, setCandleFlicker] = useState(1);
  const [wind, setWind] = useState(0);
  const [candleHeight, setCandleHeight] = useState(100);
  const [extinguishing, setExtinguishing] = useState(false);

  // Candle burning duration - 15 seconds then goes out
  useEffect(() => {
    if (!isInView) return;
    
    // Candle burns for 15-20 seconds
    const burnTimer = setTimeout(() => {
      setExtinguishing(true);
      
      // Flame gradually dies
      const flameInterval = setInterval(() => {
        setCandleIntensity(prev => Math.max(0, prev - 0.03));
      }, 150);
      
      setTimeout(() => {
        setCandleLit(false);
        clearInterval(flameInterval);
        
        // Generate smoke particles after candle goes out
        let smokeId = 0;
        const smokeInterval = setInterval(() => {
          setSmokeParticles(prev => [...prev, {
            id: smokeId++,
            x: 50 + (Math.random() - 0.5) * 20,
            y: 60,
            opacity: 0.6 + Math.random() * 0.3,
            size: 15 + Math.random() * 25,
          }]);
        }, 400);
        
        setTimeout(() => clearInterval(smokeInterval), 5000);
      }, 2000);
    }, 15000);
    
    return () => clearTimeout(burnTimer);
  }, [isInView]);

  // Wind and flicker animation
  useEffect(() => {
    if (!candleLit && !extinguishing) return;
    
    const flickerInterval = setInterval(() => {
      if (candleLit) {
        // Natural flame flicker
        setCandleFlicker(0.7 + Math.random() * 0.6);
        // Wind variation
        setWind((Math.sin(Date.now() / 800) * 0.4) + (Math.random() - 0.5) * 0.3);
      }
    }, 80);
    
    return () => clearInterval(flickerInterval);
  }, [candleLit, extinguishing]);

  // Smoke particle animation
  useEffect(() => {
    const smokeAnimation = setInterval(() => {
      setSmokeParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y - 1.5,
          x: p.x + (Math.random() - 0.5) * 1.5,
          opacity: p.opacity - 0.015,
          size: p.size + 1,
        })).filter(p => p.opacity > 0 && p.y > -50)
      );
    }, 50);
    
    return () => clearInterval(smokeAnimation);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background Image - viiinyRIP.png */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/src/imports/viiinyRIP.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90" />

      {/* Smoke particles canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {smokeParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gray-400/20 blur-md"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              y: [particle.y, particle.y - 80],
              opacity: [particle.opacity, 0],
              scale: [1, 1.5],
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto mb-8 w-32 h-32 md:w-44 md:h-44"
        >
          <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-xl" />
          <div className="relative w-full h-full rounded-full overflow-hidden border border-amber-400/30 shadow-2xl">
            <img
              src="/src/imports/farewellvinny.jpeg"
              alt="Vincent Mwaura Wairimu"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Pulsing ring while candle burns */}
          {candleLit && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-400/20"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-amber-100/90 mb-3 tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vincent Mwaura Wairimu
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-amber-400/60 text-base md:text-lg italic mb-1"
        >
          "Vinny" — Forever 21
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-amber-300/40 text-sm tracking-widest mb-8"
        >
          2005 — 2026
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mb-10"
        />

        {/* ========== REALISTIC CANDLE ========== */}
        <div className="flex justify-center mb-10">
          <div className="relative" style={{ width: 60, height: 120 }}>
            {/* Candle glow on surface */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full pointer-events-none"
              style={{
                background: candleLit 
                  ? `radial-gradient(ellipse, rgba(255,100,0,${0.2 * candleIntensity}) 0%, transparent 70%)`
                  : 'radial-gradient(ellipse, rgba(255,100,0,0.05) 0%, transparent 70%)',
                filter: 'blur(6px)',
              }}
              animate={{ 
                opacity: candleLit ? [0.2, 0.4, 0.2] : 0.05,
                scaleX: candleLit ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 2, repeat: candleLit ? Infinity : 0 }}
            />

            {/* Candle body */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm"
              style={{
                width: 24,
                height: candleHeight,
                background: 'linear-gradient(180deg, #F5EDE0 0%, #E8D8C0 40%, #D4C4A8 100%)',
                boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.2)',
              }}
              initial={{ scaleY: 0, transformOrigin: 'bottom' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            {/* Wax drip */}
            <motion.div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full"
              style={{ background: 'linear-gradient(180deg, #F5EDD8, #E0D0B0)' }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            />

            {/* Wick */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{ bottom: candleHeight, width: 2.5, height: 12, background: '#2a1a0a' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />

            {/* Large ambient glow behind flame */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                bottom: candleHeight + 8,
                width: 100,
                height: 100,
                background: candleLit 
                  ? `radial-gradient(circle, rgba(255,100,0,${0.15 * candleIntensity}) 0%, rgba(255,60,0,${0.08 * candleIntensity}) 50%, transparent 80%)`
                  : 'transparent',
                filter: 'blur(15px)',
              }}
              animate={{ scale: candleLit ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 2, repeat: candleLit ? Infinity : 0 }}
            />

            {/* FLAME - with wind sway */}
            <motion.div
              className="absolute left-1/2"
              style={{ bottom: candleHeight + 10 }}
              animate={{
                scaleY: candleLit ? candleIntensity * (0.7 + Math.abs(wind) * 0.3 + candleFlicker * 0.15) : 0,
                scaleX: candleLit ? (0.65 + Math.abs(wind) * 0.2) * (0.8 + candleFlicker * 0.1) : 0,
                x: wind * 8,
                y: candleLit ? [0, -1 - Math.abs(wind) * 1.5, 0.5 + wind, -0.5, 0] : 0,
              }}
              transition={{ duration: 0.08, repeat: 0 }}
            >
              <div className="relative w-12 h-16">
                {/* Outer flame */}
                <svg width="48" height="64" viewBox="0 0 48 64" className="absolute">
                  <defs>
                    <radialGradient id="flameOuter" cx="50%" cy="30%" r="50%">
                      <stop offset="0%" stopColor="#FFD54F" stopOpacity={candleLit ? 0.9 * candleIntensity : 0} />
                      <stop offset="50%" stopColor="#FF9800" stopOpacity={candleLit ? 0.7 * candleIntensity : 0} />
                      <stop offset="100%" stopColor="#E65100" stopOpacity={candleLit ? 0.4 * candleIntensity : 0} />
                    </radialGradient>
                    <radialGradient id="flameInner" cx="50%" cy="55%" r="40%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity={candleLit ? 0.95 * candleIntensity : 0} />
                      <stop offset="40%" stopColor="#FFF9E6" stopOpacity={candleLit ? 0.8 * candleIntensity : 0} />
                      <stop offset="100%" stopColor="#FFD54F" stopOpacity={candleLit ? 0.5 * candleIntensity : 0} />
                    </radialGradient>
                  </defs>
                  <path d="M24 6 C18 18, 10 24, 10 34 C10 44, 15 52, 24 52 C33 52, 38 44, 38 34 C38 24, 30 18, 24 6Z" fill="url(#flameOuter)" />
                  <path d="M24 16 C19 24, 15 28, 15 34 C15 40, 18 45, 24 45 C30 45, 33 40, 33 34 C33 28, 29 24, 24 16Z" fill="url(#flameInner)" />
                </svg>
              </div>
            </motion.div>

            {/* Candle goes out - smoke wisp */}
            {!candleLit && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ bottom: candleHeight + 5 }}
                animate={{ y: [-10, -30, -60], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <div className="w-3 h-3 rounded-full bg-gray-400/30 blur-sm" />
              </motion.div>
            )}

            {/* Extinguishing text */}
            {extinguishing && candleLit && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-amber-400/40 text-[10px] tracking-wider whitespace-nowrap"
              >
                the flame fades...
              </motion.p>
            )}
          </div>
        </div>

        {/* Rest in Peace Message - appears after candle goes out */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView && !candleLit ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4"
        >
          <p className="text-2xl md:text-3xl text-amber-100/70 font-serif italic mb-4">
            Rest in Peace
          </p>
          <p className="text-amber-100/40 text-sm italic max-w-2xl mx-auto leading-relaxed">
            "I have fought the good fight, I have finished the race, I have kept the faith."
          </p>
          <p className="text-amber-400/30 text-xs mt-2">
            — 2 Timothy 4:7
          </p>
        </motion.div>

        {/* Closing Words - fade in after candle goes out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && !candleLit ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-10 space-y-2"
        >
          <p className="text-amber-100/30 text-sm italic">
            He ran. He laughed. He was here.
          </p>
          <p className="text-amber-100/25 text-sm italic">
            Forever remembered, forever loved.
          </p>
        </motion.div>

        {/* Small decorative hearts - fade in after candle goes out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && !candleLit ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 flex justify-center gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Heart className="w-3 h-3 text-amber-500/30" />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && !candleLit ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-0 right-0"
        >
          <p className="text-amber-100/20 text-[10px] tracking-wide">
            In loving memory of Vincent Mwaura Wairimu "Vinny"
          </p>
        </motion.div>
      </div>
    </section>
  );
}