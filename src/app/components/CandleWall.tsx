import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Flame, Heart, Sparkles, Wind, Star, Users, Clock, Quote } from 'lucide-react';

interface Candle {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  intensity?: number;
  flickerSpeed?: number;
}

export default function CandleWall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [candles, setCandles] = useState<Candle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLighting, setIsLighting] = useState(false);
  const [ambientGlow, setAmbientGlow] = useState(0);
  const [selectedCandle, setSelectedCandle] = useState<Candle | null>(null);
  const [totalPrayers, setTotalPrayers] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Load candles from localStorage
  useEffect(() => {
    const savedCandles = localStorage.getItem('vinny_candles');
    if (savedCandles) {
      const parsed = JSON.parse(savedCandles);
      setCandles(parsed.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) })));
    } else {
      // Sample candles
      const sampleCandles: Candle[] = [
        { 
          id: 1, 
          name: 'The Wairimu Family', 
          message: 'Forever in our hearts, our beloved Vinny. Your light guides us daily.', 
          timestamp: new Date(), 
          intensity: 0.9,
          flickerSpeed: 1.2 
        },
        { 
          id: 2, 
          name: 'Friends from Ting\'ang\'a', 
          message: 'Rest in peace, Commander. You led us with courage and love.', 
          timestamp: new Date(Date.now() - 86400000), 
          intensity: 0.85,
          flickerSpeed: 1.0 
        },
        { 
          id: 3, 
          name: 'P.C.E.A. Gituamba Youth', 
          message: 'A light in our fellowship. You are missed beyond words.', 
          timestamp: new Date(Date.now() - 172800000), 
          intensity: 0.95,
          flickerSpeed: 1.4 
        },
      ];
      setCandles(sampleCandles);
      localStorage.setItem('vinny_candles', JSON.stringify(sampleCandles));
    }
  }, []);

  // Calculate total prayers
  useEffect(() => {
    const total = candles.reduce((sum, c) => sum + (c.message.length > 0 ? 1 : 0), 0);
    setTotalPrayers(total);
  }, [candles]);

  // Ambient glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientGlow(prev => 0.6 + Math.random() * 0.3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLightCandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setIsLighting(true);
      
      setTimeout(() => {
        const newCandle: Candle = {
          id: Date.now(),
          name: name.trim(),
          message: message.trim(),
          timestamp: new Date(),
          intensity: 0.8 + Math.random() * 0.3,
          flickerSpeed: 0.8 + Math.random() * 0.8,
        };
        
        const updatedCandles = [newCandle, ...candles];
        setCandles(updatedCandles);
        localStorage.setItem('vinny_candles', JSON.stringify(updatedCandles));
        
        setName('');
        setMessage('');
        setShowForm(false);
        setIsLighting(false);
        
        // Play virtual lighting sound effect
        const audio = new Audio('/candle-light.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }, 800);
    }
  };

  const handleDeleteCandle = (id: number) => {
    const updatedCandles = candles.filter(c => c.id !== id);
    setCandles(updatedCandles);
    localStorage.setItem('vinny_candles', JSON.stringify(updatedCandles));
    setSelectedCandle(null);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Generate random positions for floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section
      ref={ref}
      id="candlewall"
      className="relative py-16 px-4 md:py-24 md:px-6 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Dark gradient background with deep charcoal tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
      
      {/* Ambient glow overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: ambientGlow }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-amber-900/10 via-transparent to-transparent" />
      </motion.div>
      
      {/* Floating particles - dust/embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-amber-500/20"
            style={{
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: ['100vh', '-20vh'],
              x: [`${particle.left}%`, `${particle.left + (Math.random() - 0.5) * 20}%`],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with stats toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 h-px bg-amber-700/50 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-amber-100 tracking-wide mb-3">
            Light a Candle
          </h2>
          <div className="w-16 h-px bg-amber-700/50 mx-auto mt-6" />
          <p className="text-amber-200/40 mt-6 max-w-md mx-auto text-sm tracking-wide">
            Each flame represents a prayer, a memory, a heart forever touched
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <div className="bg-amber-900/10 backdrop-blur-sm border border-amber-700/20 rounded-sm px-6 py-3 text-center min-w-[120px]">
            <div className="text-2xl md:text-3xl font-light text-amber-200">{candles.length}</div>
            <div className="text-amber-400/50 text-xs tracking-wide mt-1">CANDLES LIT</div>
          </div>
          <div className="bg-amber-900/10 backdrop-blur-sm border border-amber-700/20 rounded-sm px-6 py-3 text-center min-w-[120px]">
            <div className="text-2xl md:text-3xl font-light text-amber-200">{totalPrayers}</div>
            <div className="text-amber-400/50 text-xs tracking-wide mt-1">PRAYERS OFFERED</div>
          </div>
          <div className="bg-amber-900/10 backdrop-blur-sm border border-amber-700/20 rounded-sm px-6 py-3 text-center min-w-[120px]">
            <div className="text-2xl md:text-3xl font-light text-amber-200">
              {candles.filter(c => c.name.includes('Family')).length}
            </div>
            <div className="text-amber-400/50 text-xs tracking-wide mt-1">FAMILY FLAMES</div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-amber-800/30 hover:bg-amber-800/50 border border-amber-600/50 text-amber-200 rounded-sm transition-all duration-300 text-sm tracking-wide"
            >
              <Flame className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Light a Candle for Vinny
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleLightCandle}
              className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-md p-6 md:p-8 border border-amber-700/30 shadow-2xl rounded-sm"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-800/20 border border-amber-600/30 rounded-full">
                  <Heart className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300/70 text-xs tracking-wide">LIGHT A CANDLE</span>
                </div>
              </div>
              
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-sm text-gray-200 placeholder-gray-500 mb-4 focus:outline-none focus:border-amber-600/50 transition-colors"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your prayer or message for Vinny..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-sm text-gray-200 placeholder-gray-500 mb-4 focus:outline-none focus:border-amber-600/50 transition-colors resize-none"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLighting}
                  className="flex-1 px-6 py-3 bg-amber-800/40 hover:bg-amber-800/60 border border-amber-600/50 text-amber-200 rounded-sm text-sm tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLighting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      Lighting...
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4" />
                      Light Candle
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 rounded-sm text-sm tracking-wide transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>

        {/* Candle Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {candles.map((candle, index) => (
              <motion.div
                key={candle.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 1) }}
                whileHover={{ y: -4 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedCandle(candle)}
              >
                {/* Candle glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,100,0,0.3) 0%, rgba(255,100,0,0) 70%)',
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: candle.flickerSpeed || 1, repeat: Infinity }}
                />

                <div className="flex flex-col items-center">
                  {/* Flame with realistic flicker */}
                  <motion.div
                    className="relative"
                    animate={{
                      scaleY: [1, 1.08, 0.96, 1.05, 1],
                      scaleX: [1, 0.97, 1.04, 0.99, 1],
                      y: [0, -1, 0.5, -0.5, 0],
                    }}
                    transition={{
                      duration: 0.2 * (candle.flickerSpeed || 1),
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="w-8 h-10 relative">
                      {/* Outer glow */}
                      <motion.div
                        className="absolute inset-0 blur-md bg-orange-500/30 rounded-full"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      
                      {/* SVG Flame */}
                      <svg width="32" height="40" viewBox="0 0 32 40" className="relative">
                        <defs>
                          <radialGradient id={`flame-grad-${candle.id}`} cx="50%" cy="30%" r="50%">
                            <stop offset="0%" stopColor="#FFF5E0" />
                            <stop offset="35%" stopColor="#FFD54F" />
                            <stop offset="70%" stopColor="#FF9800" />
                            <stop offset="100%" stopColor="#E65100" stopOpacity="0.8" />
                          </radialGradient>
                        </defs>
                        <path
                          d="M16 2 C12 10, 6 15, 6 22 C6 29, 10 34, 16 34 C22 34, 26 29, 26 22 C26 15, 20 10, 16 2 Z"
                          fill={`url(#flame-grad-${candle.id})`}
                          opacity={0.95}
                        />
                        <path
                          d="M16 9 C13 15, 11 18, 11 22 C11 26, 13 29, 16 29 C19 29, 21 26, 21 22 C21 18, 19 15, 16 9 Z"
                          fill="#FFF9E6"
                          opacity={0.7}
                        />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Candle body */}
                  <div className="relative mt-1">
                    <div className="w-4 h-14 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 rounded-sm shadow-lg" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-1 bg-amber-100 rounded-full opacity-30" />
                  </div>

                  {/* Small indicator dot for presence */}
                  <div className="mt-2 w-1 h-1 rounded-full bg-amber-500/30 animate-pulse" />
                </div>

                {/* Hover info - minimal */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-amber-400/60 text-xs">
                    {candle.name.split(' ')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {candles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Flame className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-500 text-sm">No candles lit yet. Be the first to light one.</p>
          </motion.div>
        )}

        {/* Total count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-amber-400/40 text-sm mt-12 tracking-wide"
        >
          {candles.length} candle{candles.length !== 1 ? 's' : ''} burning in memory of Vinny
        </motion.p>

        {/* Inspirational footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 text-center border-t border-gray-800"
        >
          <Quote className="w-4 h-4 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-600 text-xs max-w-md mx-auto">
            "The light of one candle can never be extinguished by darkness."
          </p>
        </motion.div>
      </div>

      {/* Modal for candle details */}
      <AnimatePresence>
        {selectedCandle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCandle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900 max-w-md w-full border border-amber-700/30 rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Flame animation in modal */}
              <div className="p-6 text-center border-b border-gray-800">
                <motion.div
                  animate={{ scaleY: [1, 1.1, 0.95, 1.05, 1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="inline-block"
                >
                  <div className="w-12 h-14 relative mx-auto">
                    <svg width="48" height="56" viewBox="0 0 48 56">
                      <path
                        d="M24 4 C18 14, 10 20, 10 30 C10 39, 15 46, 24 46 C33 46, 38 39, 38 30 C38 20, 30 14, 24 4 Z"
                        fill="#FF9800"
                        opacity="0.9"
                      />
                      <path
                        d="M24 14 C20 22, 16 26, 16 30 C16 35, 19 39, 24 39 C29 39, 32 35, 32 30 C32 26, 28 22, 24 14 Z"
                        fill="#FFF9E6"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-serif text-amber-100 text-center mb-1">
                  {selectedCandle.name}
                </h3>
                <p className="text-amber-400/50 text-xs text-center mb-4">
                  {formatDate(selectedCandle.timestamp)}
                </p>
                <p className="text-gray-300 text-sm text-center leading-relaxed italic">
                  "{selectedCandle.message}"
                </p>
                
                <div className="mt-6 flex gap-3 justify-center">
                  <button
                    onClick={() => handleDeleteCandle(selectedCandle.id)}
                    className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-700/30 text-red-300 text-xs rounded-sm transition-colors"
                  >
                    Remove Candle
                  </button>
                  <button
                    onClick={() => setSelectedCandle(null)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 text-xs rounded-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gentleFlicker {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        .animate-flicker {
          animation: gentleFlicker 2s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}