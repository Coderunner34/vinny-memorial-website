import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// CORRECT PATHS - relative from src/app/components/ to src/imports/
import vinnyPortrait from '../../imports/viiinyRIP.png';
import treeImage from '../../imports/tree.png';

// ============================================
// TYPES
// ============================================
interface LoadingIntroProps {
  onEnter: () => void;
}

// ============================================
// STARFIELD WITH SUBTLE SHOOTING STARS
// ============================================
function StarfieldCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const stars: Array<{ x: number; y: number; radius: number; speed: number; opacity: number }> = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.01 + 0.003,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now();
      
      stars.forEach((star) => {
        const flicker = 0.5 + Math.sin(time * star.speed) * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 200, ${star.opacity * flicker})`;
        ctx.fill();
      });
      
      animFrameRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ============================================
// PHRASE WITH SMOKE-OUT EFFECT
// ============================================
function Phrase({
  text,
  isCurrent,
  onWriteComplete,
}: {
  text: string;
  isCurrent: boolean;
  onWriteComplete?: () => void;
}) {
  const letters = Array.from(text);

  return (
    <motion.div
      animate={
        isCurrent
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: -30, filter: 'blur(12px)' }
      }
      transition={
        isCurrent
          ? { duration: 0.7, ease: [0.22, 0.88, 0.36, 1] }
          : { duration: 1.3, ease: [0.4, 0, 0.6, 1] }
      }
      className="absolute inset-x-0 flex justify-center"
      initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
    >
      <p className="text-4xl md:text-6xl lg:text-7xl text-[#1A1A1A] font-serif italic tracking-wide select-none whitespace-nowrap">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={isCurrent ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.07,
              duration: 0.4,
              ease: 'easeOut',
            }}
            onAnimationComplete={
              isCurrent && i === letters.length - 1 ? onWriteComplete : undefined
            }
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}

// ============================================
// PORTRAIT - EMERGES FROM DEEP SPACE
// ============================================
function DeepSpacePortrait({ revealProgress }: { revealProgress: number }) {
  const eased = Math.pow(revealProgress, 0.55);
  const scale = 0.25 + eased * 0.75;
  const blurPx = Math.max(0, 30 * (1 - eased));
  const opacity = Math.min(1, eased * 1.2);

  return (
    <div
      className="relative mx-auto"
      style={{
        width: 'clamp(140px, 22vw, 210px)',
        height: 'clamp(140px, 22vw, 210px)',
        transform: `scale(${scale})`,
        opacity,
        filter: `blur(${blurPx * 0.5}px)`,
      }}
    >
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: `1px solid rgba(212, 168, 83, ${eased * 0.4})`,
          boxShadow: eased > 0.7 ? `0 0 45px rgba(212, 168, 83, ${(eased - 0.7) * 0.35})` : 'none',
        }}
      >
        <img
          src={vinnyPortrait}
          alt="Vincent Mwaura Wairimu"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>
    </div>
  );
}

// ============================================
// MEMORIAL CANDLE
// ============================================
function MemorialCandle() {
  const [isLit, setIsLit] = useState(false);
  const [flameHeight, setFlameHeight] = useState(0);
  const [windStrength, setWindStrength] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const appearTimer = setTimeout(() => setIsLit(true), 1000);
    return () => clearTimeout(appearTimer);
  }, []);

  useEffect(() => {
    if (!isLit) return;
    
    const startTime = performance.now();
    const duration = 1000;
    
    function growFlame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setFlameHeight(progress);
      setGlowIntensity(progress);
      if (progress < 1) requestAnimationFrame(growFlame);
    }
    
    requestAnimationFrame(growFlame);
  }, [isLit]);

  useEffect(() => {
    if (!isLit) return;
    let frameId: number;
    function animateFlicker(now: number) {
      const wind = Math.sin(now * 0.002) * 0.3 + Math.sin(now * 0.015) * 0.15;
      setWindStrength(wind);
      frameId = requestAnimationFrame(animateFlicker);
    }
    frameId = requestAnimationFrame(animateFlicker);
    return () => cancelAnimationFrame(frameId);
  }, [isLit]);

  return (
    <motion.div
      className="relative flex flex-col items-center z-10"
      initial={{ opacity: 0, x: 30, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 120,
          height: 120,
          background: `radial-gradient(circle, rgba(255,100,0,${glowIntensity * 0.2}) 0%, transparent 70%)`,
          filter: 'blur(15px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: isLit ? [1, 1.15, 1] : 0.5 }}
        transition={{ duration: 2, repeat: isLit ? Infinity : 0 }}
      />

      <div className="relative" style={{ width: 22, height: 95 }}>
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-sm"
          style={{
            height: 84,
            background: 'linear-gradient(180deg, #F8F0E4 0%, #E8D8C0 40%, #D4C4A8 100%)',
          }}
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: 84, width: 2, height: 10, background: '#2a1a0a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 92 }}
          animate={{
            scaleY: isLit ? flameHeight * (0.85 + Math.abs(windStrength) * 0.2) : 0,
            scaleX: isLit ? (0.75 + Math.abs(windStrength) * 0.1) * Math.min(1, flameHeight * 1.1) : 0,
            x: windStrength * 2,
          }}
          transition={{ duration: 0.15 }}
        >
          <svg width="26" height="44" viewBox="0 0 26 44">
            <path d="M13 2 C9.5 10, 4.5 16, 4.5 24 C4.5 32, 8 38, 13 38 C18 38, 21.5 32, 21.5 24 C21.5 16, 16.5 10, 13 2Z" fill="#FF8C00" opacity={0.9} />
            <path d="M13 9 C10.5 15, 8.5 19, 8.5 24 C8.5 28, 10 31.5, 13 31.5 C16 31.5, 17.5 28, 17.5 24 C17.5 19, 15.5 15, 13 9Z" fill="#FFD54F" opacity={0.85} />
          </svg>
        </motion.div>

        {isLit && [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-400"
            style={{ width: 2, height: 2, left: '50%' }}
            initial={{ x: -4 + i * 4, y: -90, opacity: 0.7 }}
            animate={{
              y: [-90, -125, -165],
              x: [-4 + i * 4, -10 + i * 6, -2 + i * 5],
              opacity: [0.7, 0.3, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN LOADING INTRO
// ============================================
export default function LoadingIntro({ onEnter }: LoadingIntroProps) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [previousPhraseIndex, setPreviousPhraseIndex] = useState<number | null>(null);
  const [phraseSequenceComplete, setPhraseSequenceComplete] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const phrases = ['He ran.', 'He laughed.', 'He was here.'];
  const PORTRAIT_REVEAL_DURATION = 6800;

  useEffect(() => {
    const startTime = performance.now();
    let frameId: number;
    function tick(now: number) {
      const elapsed = now - startTime;
      const raw = Math.min(1, elapsed / PORTRAIT_REVEAL_DURATION);
      setRevealProgress(raw);
      if (raw < 1) frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePhraseWriteComplete = useCallback(
    (index: number) => {
      if (index < phrases.length - 1) {
        setTimeout(() => {
          setPreviousPhraseIndex(index);
          setCurrentPhraseIndex(index + 1);
        }, 900);
      } else {
        setTimeout(() => {
          setPhraseSequenceComplete(true);
          setTimeout(() => {
            setPhase(1);
            setTimeout(() => setPhase(2), 1300);
          }, 1100);
        }, 900);
      }
    },
    [phrases.length]
  );

  useEffect(() => {
    if (phase === 2) {
      const timer = setTimeout(() => setShowEnterButton(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleEnter = useCallback(() => {
    setIsExiting(true);
    setTimeout(onEnter, 2500);
  }, [onEnter]);

  const bgColor = phase === 0 ? '#FAFAF8' : phase === 1 ? '#0F0F0F' : '#020408';

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 1.4s cubic-bezier(0.22, 0.61, 0.36, 1)',
      }}
    >
      <StarfieldCanvas active={phase >= 1} />

      {/* TREE BACKGROUND - dark phase only */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            className="fixed inset-0 z-[1] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
          >
            <img
              src={treeImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              style={{ opacity: 0.55 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(2,4,8,0.75) 0%, rgba(2,4,8,0.3) 35%, transparent 65%)',
                backdropFilter: 'blur(4px)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 55% 40% at 78% 88%, transparent 30%, rgba(2,4,8,0.55) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== WHITE PHASE ========== */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="mb-10">
              <DeepSpacePortrait revealProgress={revealProgress} />
            </div>
            <div className="relative" style={{ height: 90, width: '100%', maxWidth: 700 }}>
              {previousPhraseIndex !== null && (
                <Phrase
                  key={`prev-${previousPhraseIndex}`}
                  text={phrases[previousPhraseIndex]}
                  isCurrent={false}
                />
              )}
              {!phraseSequenceComplete && (
                <Phrase
                  key={`curr-${currentPhraseIndex}`}
                  text={phrases[currentPhraseIndex]}
                  isCurrent={true}
                  onWriteComplete={() => handlePhraseWriteComplete(currentPhraseIndex)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== DARK PHASE ========== */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-center px-8 md:px-16"
            style={{ alignItems: 'flex-start' }}
            initial={{ opacity: 0 }}
            animate={isExiting ? { opacity: 0, filter: 'blur(8px)', y: -20 } : { opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={isExiting ? { duration: 1.2 } : { duration: 1.5 }}
          >
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div
                className="rounded-full overflow-hidden border border-[#D4AF6A]/40 shadow-lg"
                style={{ width: 72, height: 72 }}
              >
                <img
                  src={vinnyPortrait}
                  alt="Vincent"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>

            <motion.h1
              className="font-serif text-[#F5EDD8] leading-tight mb-3 text-left"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.8rem)', fontWeight: 300, maxWidth: '70%' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.55 }}
            >
              Vincent Mwaura Wairimu
            </motion.h1>

            <motion.p
              className="text-[#D4AF6A] font-light tracking-[0.28em] mb-5 text-left"
              style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.95 }}
            >
              2005 — 2026
            </motion.p>

            <motion.div
              className="mb-5"
              style={{ width: 80, height: 1, background: 'rgba(212,175,106,0.4)' }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
            />

            <motion.p
              className="text-[#C4B89A] italic text-left leading-relaxed mb-10 max-w-md"
              style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, delay: 1.45 }}
            >
              "He ran. He laughed. He was here.<br/>
              Forever remembered, forever loved."
            </motion.p>

            {showEnterButton && (
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 50px rgba(212, 175, 106, 0.45)',
                  borderColor: '#D4AF6A',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnter}
                className="px-8 py-2.5 bg-transparent border border-[#D4AF6A]/40 text-[#E8C97A] rounded-full text-sm tracking-[0.22em] uppercase font-light backdrop-blur-sm transition-all duration-300"
              >
                Enter Memorial →
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candle */}
      <AnimatePresence>
        {phase === 2 && (
          <div className="fixed bottom-8 right-8 z-15">
            <MemorialCandle />
          </div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {phase === 0 && !isExiting && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          whileHover={{ opacity: 0.7 }}
          onClick={handleEnter}
          className="fixed bottom-6 right-6 z-40 text-[#888480] text-xs tracking-[0.18em] uppercase hover:text-[#D4AF6A] transition-colors"
        >
          Skip →
        </motion.button>
      )}

      {/* Exit animation */}
      <AnimatePresence>
        {isExiting && (
          <>
            <motion.div
              className="fixed inset-0 z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <div className="absolute inset-0 bg-black" />
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 pointer-events-none"
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(12px)' }}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className="fixed inset-0 z-50 pointer-events-none bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.95, 0] }}
              transition={{ duration: 2.2, times: [0, 0.6, 0.85, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}