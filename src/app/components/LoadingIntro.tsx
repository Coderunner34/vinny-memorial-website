import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FIXED: Correct image paths
// Update these paths to match your actual image locations
import vinnyPortrait from '@/public/images/vinny-portrait.jpg';
import treeImage from '@/public/images/tree.png';

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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Very subtle stars - almost invisible
    const stars: Array<{
      x: number; y: number; radius: number;
      twinkleSpeed: number; twinkleOffset: number;
      baseOpacity: number;
    }> = [];

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        baseOpacity: Math.random() * 0.2 + 0.05,
      });
    }

    let shootingStars: any[] = [];

    function spawnShootingStar() {
      if (shootingStars.length > 1) return;
      shootingStars.push({
        x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
        y: Math.random() * canvas.height * 0.3,
        vx: -4 - Math.random() * 5,
        vy: 1 + Math.random() * 2.5,
        length: 50 + Math.random() * 60,
        opacity: 0.12 + Math.random() * 0.08,
        trail: [] as { x: number; y: number }[],
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now();

      // Draw stars - very faint
      stars.forEach((star) => {
        const flicker = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${star.baseOpacity * flicker})`;
        ctx.fill();
      });

      // Shooting stars - very subtle
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.002;
        s.trail.unshift({ x: s.x, y: s.y });
        if (s.trail.length > 12) s.trail.pop();

        if (s.opacity <= 0 || s.x < -100) {
          shootingStars.splice(i, 1);
          continue;
        }

        for (let j = 0; j < s.trail.length; j++) {
          const t = s.trail[j];
          const trailAlpha = s.opacity * (1 - j / s.trail.length);
          ctx.beginPath();
          ctx.arc(t.x, t.y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 220, 160, ${trailAlpha * 0.4})`;
          ctx.fill();
        }

        const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.length * 0.7, s.y - s.length * 0.35);
        gradient.addColorStop(0, `rgba(255, 240, 200, ${s.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y - s.length * 0.5);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    const spawnInterval = setInterval(() => {
      if (Math.random() > 0.85) spawnShootingStar();
    }, 8000);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(spawnInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }} />;
}

// ============================================
// FLOATING PARTICLES (Leaves/Smoke/Wind from tree)
// ============================================
function FloatingParticles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const windRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      type: 'leaf' | 'ember' | 'smoke';
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];

    function spawnParticle() {
      if (!canvas) return;
      // Spawn from tree area (left side, various heights)
      const rand = Math.random();
      let type: 'leaf' | 'ember' | 'smoke';
      if (rand < 0.5) type = 'leaf';
      else if (rand < 0.75) type = 'smoke';
      else type = 'ember';
      
      const life = 150 + Math.random() * 100;
      particles.push({
        x: Math.random() * canvas.width * 0.35 + canvas.width * 0.05,
        y: Math.random() * canvas.height * 0.7 + canvas.height * 0.1,
        size: Math.random() * (type === 'leaf' ? 6 : 4) + (type === 'leaf' ? 2 : 1),
        speedX: Math.random() * (type === 'smoke' ? 0.4 : 1.2) + 0.3,
        speedY: (Math.random() - 0.5) * (type === 'smoke' ? 0.3 : 0.8),
        opacity: Math.random() * (type === 'ember' ? 0.7 : 0.4) + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        type,
        life: 0,
        maxLife: life,
      });
    }

    let lastSpawn = 0;
    let time = 0;

    function animate(now: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time = now;
      
      // Gentle wind variation - creates the feeling of a soft breeze
      const wind = Math.sin(now * 0.001) * 0.3;
      windRef.current = wind;

      // Spawn particles rhythmically
      if (now - lastSpawn > 180 && particles.length < 45) {
        spawnParticle();
        lastSpawn = now;
        // Sometimes spawn two at once
        if (Math.random() > 0.7) spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.speedX + wind * 0.15;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        
        // Add slight upward drift for smoke
        if (p.type === 'smoke') {
          p.y -= 0.08;
          p.opacity *= 0.998;
        } else {
          p.speedY += 0.01; // gravity for leaves/embers
          p.opacity *= 0.996;
        }
        
        // Gentle wind flutter for leaves
        if (p.type === 'leaf') {
          p.rotation += Math.sin(now * 0.003 + i) * 0.02;
        }

        const lifeProgress = p.life / p.maxLife;

        if (p.life > p.maxLife || p.opacity < 0.02 || p.x > canvas.width + 80 || p.y < -80 || p.y > canvas.height + 80) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity * (1 - lifeProgress * 0.5);

        if (p.type === 'leaf') {
          // Leaf shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.8, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size);
          ctx.fillStyle = `rgba(100, 65, 35, ${0.4 - lifeProgress * 0.2})`;
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.6);
          ctx.lineTo(p.size * 0.3, 0);
          ctx.lineTo(0, p.size * 0.6);
          ctx.lineTo(-p.size * 0.3, 0);
          ctx.fillStyle = `rgba(70, 45, 25, ${0.3 - lifeProgress * 0.1})`;
          ctx.fill();
        } else if (p.type === 'ember') {
          // Glowing ember with flicker
          const flicker = 0.7 + Math.sin(now * 0.01 + i) * 0.3;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 120, 40, ${p.opacity * flicker * 0.8})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 220, 100, ${p.opacity * flicker})`;
          ctx.fill();
        } else {
          // Smoke wisp
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * (0.8 + lifeProgress * 0.5), p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80, 70, 60, ${p.opacity * 0.25})`;
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    // Spawn initial particles
    for (let i = 0; i < 18; i++) {
      setTimeout(() => spawnParticle(), i * 80);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 z-[5]" style={{ pointerEvents: 'none' }} />;
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
// PORTRAIT - EMERGES FROM DEEP SPACE (blur to clear)
// ============================================
function DeepSpacePortrait({ revealProgress }: { revealProgress: number }) {
  const eased = Math.pow(revealProgress, 0.55);
  const scale = 0.25 + eased * 0.75;
  const blurPx = Math.max(0, 30 * (1 - eased));
  const opacity = Math.min(1, eased * 1.2);
  const sepia = Math.max(0, (1 - eased) * 0.6);

  return (
    <div
      className="relative mx-auto"
      style={{
        width: 'clamp(140px, 22vw, 210px)',
        height: 'clamp(140px, 22vw, 210px)',
        transform: `scale(${scale})`,
        opacity,
        filter: `blur(${blurPx * 0.5}px) sepia(${sepia})`,
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
// MEMORIAL CANDLE - WITH FLICKERING WIND EFFECT
// ============================================
function MemorialCandle() {
  const [isLit, setIsLit] = useState(false);
  const [flameHeight, setFlameHeight] = useState(0);
  const [windStrength, setWindStrength] = useState(0);
  const [flameOffsetX, setFlameOffsetX] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    // Candle appears and lights
    const appearTimer = setTimeout(() => setIsLit(true), 1200);
    return () => clearTimeout(appearTimer);
  }, []);

  // Animate flame growing when lit
  useEffect(() => {
    if (!isLit) return;
    
    const startTime = performance.now();
    const duration = 1100;
    
    function growFlame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 1.5);
      setFlameHeight(eased);
      setGlowIntensity(eased);
      
      if (progress < 1) {
        requestAnimationFrame(growFlame);
      }
    }
    
    requestAnimationFrame(growFlame);
  }, [isLit]);

  // Wind and flicker animation loop
  useEffect(() => {
    if (!isLit) return;
    
    let frameId: number;
    let lastTime = performance.now();
    
    function animateFlicker(now: number) {
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      
      // Natural wind variation - sine wave with noise
      const windBase = Math.sin(now * 0.002) * 0.4;
      const windNoise = Math.sin(now * 0.017) * 0.2 + Math.sin(now * 0.053) * 0.15;
      const wind = windBase + windNoise;
      setWindStrength(wind);
      
      // Flame sways with wind
      setFlameOffsetX(wind * 1.8);
      
      frameId = requestAnimationFrame(animateFlicker);
    }
    
    frameId = requestAnimationFrame(animateFlicker);
    return () => cancelAnimationFrame(frameId);
  }, [isLit]);

  return (
    <motion.div
      className="relative flex flex-col items-center z-10"
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 0.88, 0.36, 1], delay: 0.2 }}
    >
      {/* Large ambient glow - intensity grows with flame */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 140,
          height: 140,
          background: `radial-gradient(circle, rgba(255,100,0,${glowIntensity * 0.22}) 0%, rgba(255,60,0,${glowIntensity * 0.08}) 50%, transparent 80%)`,
          filter: 'blur(18px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
        animate={{
          scale: isLit ? [1, 1.18, 1] : 0.5,
        }}
        transition={{ duration: 2.2, repeat: isLit ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Ground glow */}
      <motion.div
        className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-40 h-12 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, rgba(255,120,0,${glowIntensity * 0.28}) 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
        animate={{ 
          opacity: isLit ? [0.2, 0.55, 0.2] : 0,
          scaleX: isLit ? [1, 1.15, 1] : 1,
        }}
        transition={{ duration: 2.5, repeat: isLit ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Candle body container */}
      <div className="relative" style={{ width: 24, height: 100 }}>
        {/* Wax body */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-sm"
          style={{
            height: 88,
            background: 'linear-gradient(180deg, #F8F0E4 0%, #E8D8C0 40%, #D4C4A8 100%)',
            boxShadow: 'inset -1.5px 0 5px rgba(0,0,0,0.06), 0 5px 15px rgba(0,0,0,0.15)',
          }}
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />

        {/* Wax drips */}
        <motion.div
          className="absolute top-2 left-0.5 w-2 h-4 rounded-full"
          style={{ background: 'linear-gradient(180deg, #F5EDD8, #E0D0B0)' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
        <motion.div
          className="absolute top-1.5 right-0.5 w-1.5 h-3 rounded-full"
          style={{ background: 'linear-gradient(180deg, #F5EDD8, #E0D0B0)' }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />

        {/* Wick */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: 88, width: 2.2, height: 11, background: '#2a1a0a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />

        {/* FLAME with wind sway */}
        <motion.div
          className="absolute"
          style={{ 
            left: '50%', 
            bottom: 96,
            x: flameOffsetX,
          }}
          animate={{
            scaleY: isLit ? flameHeight * (0.85 + Math.abs(windStrength) * 0.2 + Math.random() * 0.1) : 0,
            scaleX: isLit ? (0.7 + Math.abs(windStrength) * 0.15) * Math.min(1, flameHeight * 1.1) : 0,
            y: isLit ? [
              0, 
              -1.2 - Math.abs(windStrength) * 1.5, 
              0.6 + windStrength * 1.2, 
              -0.5 - windStrength * 1, 
              0
            ] : 0,
          }}
          transition={{ 
            duration: 0.2, 
            repeat: isLit ? Infinity : 0,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <svg width="28" height="48" viewBox="0 0 28 48" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="fo" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#FFD54F" />
                <stop offset="55%" stopColor="#FF9800" />
                <stop offset="100%" stopColor="#E65100" stopOpacity="0.9" />
              </radialGradient>
              <radialGradient id="fi" cx="50%" cy="55%" r="40%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#FFF9E6" />
                <stop offset="100%" stopColor="#FFD54F" />
              </radialGradient>
            </defs>
            <path 
              d="M14 2 C10.5 11, 5.5 17, 5.5 25 C5.5 33, 9 39, 14 39 C19 39, 22.5 33, 22.5 25 C22.5 17, 17.5 11, 14 2Z" 
              fill="url(#fo)" 
              opacity={Math.min(0.95, flameHeight * 1.1)} 
            />
            <path 
              d="M14 10 C11.5 16, 9.5 20, 9.5 25 C9.5 29.5, 11 33, 14 33 C17 33, 18.5 29.5, 18.5 25 C18.5 20, 16.5 16, 14 10Z" 
              fill="url(#fi)" 
              opacity={Math.min(0.9, flameHeight * 1.15)} 
            />
          </svg>
        </motion.div>

        {/* Floating embers / sparks */}
        {isLit && [0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              width: 2.5, 
              height: 2.5, 
              background: '#FFB347',
              left: '50%',
              filter: 'blur(0.5px)',
            }}
            initial={{ x: -6 + i * 4 + (Math.random() - 0.5) * 6, y: -95, opacity: 0.8 }}
            animate={{
              y: [-95, -130, -175],
              x: [-6 + i * 4 + (Math.random() - 0.5) * 4, -14 + i * 6 + (Math.random() - 0.5) * 8, -5 + i * 5],
              opacity: [0.8, 0.4, 0],
              scale: [1, 1.1, 0.6],
            }}
            transition={{ duration: 1.6 + i * 0.3, repeat: Infinity, delay: i * 0.45, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* "Lighting..." text - subtle, fades out */}
      {!isLit && (
        <motion.p
          className="text-[#D4AF6A]/40 text-[10px] tracking-[0.25em] mt-3 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          lighting a candle for you...
        </motion.p>
      )}
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

  // Portrait reveal progress
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

  // Handle phrase completion
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

  // Show enter button after dark phase settles
  useEffect(() => {
    if (phase === 2) {
      const timer = setTimeout(() => setShowEnterButton(true), 3400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleSkipOrEnter = useCallback(() => {
  setIsExiting(true);
  // Wait for cinematic exit animation (blur + fade)
  setTimeout(onEnter, 2800);
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
      {/* STARFIELD - only in dark phase */}
      <StarfieldCanvas active={phase >= 1} />

      {/* FLOATING PARTICLES - leaves, embers, smoke from tree area */}
      <FloatingParticles active={phase === 2} />

      {/* TREE IMAGE AS BACKGROUND - dark phase only */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            className="fixed inset-0 z-[1] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeIn' }}
          >
            <img
              src={treeImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              style={{ opacity: 0.55 }}
            />
            {/* Left side blur overlay so text is readable */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(2,4,8,0.75) 0%, rgba(2,4,8,0.3) 35%, transparent 65%)',
                backdropFilter: 'blur(4px)',
              }}
            />
            {/* Bottom-right vignette for candle area */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 55% 40% at 78% 88%, transparent 30%, rgba(2,4,8,0.55) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAPER TEXTURE - white phase only */}
      {phase === 0 && (
        <div
          className="fixed inset-0 z-[2] pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px',
          }}
        />
      )}

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
  transition={isExiting ? { duration: 1.2, ease: 'easeOut' } : { duration: 1.5, ease: 'easeOut' }}
>
            {/* Small portrait above name */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
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

            {/* Name */}
            <motion.h1
              className="font-serif text-[#F5EDD8] leading-tight mb-3 text-left"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.8rem)', fontWeight: 300, maxWidth: '70%', letterSpacing: '0.02em' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.55 }}
            >
              Vincent Mwaura Wairimu
            </motion.h1>

            {/* Dates */}
            <motion.p
              className="text-[#D4AF6A] font-light tracking-[0.28em] mb-5 text-left"
              style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.95 }}
            >
              2005 — 2026
            </motion.p>

            {/* Gold divider */}
            <motion.div
              className="mb-5"
              style={{ width: 80, height: 1, background: 'rgba(212,175,106,0.4)' }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
            />

            {/* Quote */}
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

            {/* Enter Button */}
            {showEnterButton && (
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 50px rgba(212, 175, 106, 0.45)',
                  borderColor: '#D4AF6A',
                  backgroundColor: 'rgba(212,175,106,0.05)',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSkipOrEnter}
                className="px-8 py-2.5 bg-transparent border border-[#D4AF6A]/40 text-[#E8C97A] rounded-full text-sm tracking-[0.22em] uppercase font-light backdrop-blur-sm transition-all duration-300"
              >
                Enter Memorial →
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candle - positioned at bottom-right, rendered separately so it doesn't interfere with text */}
      <AnimatePresence>
        {phase === 2 && (
          <div className="fixed bottom-8 right-8 z-15">
            <MemorialCandle />
          </div>
        )}
      </AnimatePresence>

      {/* Skip button - white phase only */}
      {phase === 0 && !isExiting && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          whileHover={{ opacity: 0.7 }}
          onClick={handleSkipOrEnter}
          className="fixed bottom-6 right-6 z-40 text-[#888480] text-xs tracking-[0.18em] uppercase hover:text-[#D4AF6A] transition-colors"
        >
          Skip →
        </motion.button>
      )}

     {/* ========== CINEMATIC EXIT SEQUENCE ========== */}
{/* Everything blurs out, candle is the last thing visible */}
<AnimatePresence>
  {isExiting && (
    <>
      {/* Dark vignette that slowly closes in */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </motion.div>

      {/* Blur overlay that increases over time - affects the whole screen */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ backdropFilter: 'blur(0px)' }}
        animate={{ backdropFilter: 'blur(12px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* White flash that pulses at the very end */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0] }}
        transition={{ duration: 2.2, times: [0, 0.6, 0.85, 1], ease: 'easeOut' }}
      />

      {/* Final candle glow that fades last - overlays everything */}
      <motion.div
        className="fixed bottom-8 right-8 z-45 pointer-events-none"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }}
      >
        <div className="relative">
          {/* Candle glow that pulses as it fades */}
          <div
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,100,0,0.4) 0%, rgba(255,60,0,0.15) 50%, transparent 80%)',
              filter: 'blur(15px)',
            }}
          />
          {/* Simplified candle icon that remains visible longest */}
          <div className="relative w-6 h-20">
            <div className="absolute bottom-0 w-5 h-16 rounded-sm bg-gradient-to-t from-[#E8D8C0] to-[#F8F0E4]" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-8">
              <div className="w-full h-full rounded-full bg-orange-400 animate-pulse" 
                   style={{ filter: 'blur(3px)', boxShadow: '0 0 20px rgba(255,100,0,0.8)' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </motion.div>
  );
}