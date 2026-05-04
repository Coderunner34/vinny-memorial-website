import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import {
  Heart,
  School,
  Award,
  Church,
  GraduationCap,
  Cross,
  Calendar,
  Sparkles,
  Leaf,
  Flower2,
  Compass,
  Star,
} from 'lucide-react';

// Types
interface Milestone {
  year: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: React.ElementType;
  image?: string;
  color?: string;
  quote?: string;
  final?: boolean;
}

// Sample images - replace with actual Vinny photos
const milestoneImages = [
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.11.jpeg',
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.13_(1).jpeg',
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.14.jpeg',
  '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.15_(1).jpeg',
  '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.30.jpeg',
  '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.31_(1).jpeg',
];

const milestones: Milestone[] = [
  {
    year: '2005',
    title: 'A Life Begins',
    description: 'Born in Pioneer Village, Eldoret',
    longDescription: 'On a quiet morning in Eldoret, Vincent Mwaura Wairimu took his first breath. From the very beginning, he brought light and joy to everyone around him.',
    icon: Heart,
    color: '#E8A849',
    image: milestoneImages[0],
    quote: 'Every life is a story waiting to unfold',
  },
  {
    year: '2010',
    title: 'Baptism',
    description: 'Welcomed into the faith at P.C.E.A. Gituamba',
    longDescription: 'At P.C.E.A. Gituamba Church, with family gathered from across Kenya, Vinny was baptized into the Christian faith.',
    icon: Church,
    color: '#9B8EC1',
    image: milestoneImages[1],
    quote: 'Let the little children come to me — Matthew 19:14',
  },
  {
    year: '2012-2018',
    title: 'Primary School Years',
    description: 'Growing in knowledge and character',
    longDescription: 'These were the years of discovery. Vinny excelled in academics and friendships. Teachers remember him as the child who would help others without being asked.',
    icon: School,
    color: '#7CB342',
    image: milestoneImages[2],
  },
  {
    year: '2015',
    title: 'Confirmation',
    description: 'Confirming his faith and commitment',
    longDescription: 'Standing before his congregation, Vinny confirmed his faith. He was becoming a servant of God.',
    icon: Church,
    color: '#9B8EC1',
    image: milestoneImages[3],
    quote: 'For I know the plans I have for you — Jeremiah 29:11',
  },
  {
    year: '2019-2022',
    title: 'Ting\'ang\'a Secondary School',
    description: 'Scouts Commander, Red Cross member, beloved friend',
    longDescription: 'As Scouts Commander, Vinny led with courage. As a Red Cross member, he learned to heal. His peers loved him.',
    icon: Award,
    color: '#E8A849',
    image: milestoneImages[4],
  },
  {
    year: '2022',
    title: 'KCSE Success',
    description: 'Completed his secondary education with distinction',
    longDescription: 'Vinny\'s KCSE results showed his dedication. But he was prouder of the friendships he made.',
    icon: GraduationCap,
    color: '#E8A849',
    image: milestoneImages[5],
  },
  {
    year: '2023-2026',
    title: 'Mount Kenya University',
    description: 'Pursuing his dreams with passion and purpose',
    longDescription: 'University life suited Vinny. He dreamed of a future where he could serve his community.',
    icon: GraduationCap,
    color: '#7CB342',
    image: milestoneImages[0],
  },
  {
    year: 'April 25, 2026',
    title: 'Called Home',
    description: 'Returned to the embrace of his Creator',
    longDescription: 'At 21, Vinny\'s journey on earth ended. He is now the warmth in the sun, the whisper in the wind, the star that shines a little brighter.',
    icon: Cross,
    color: '#9B8EC1',
    image: milestoneImages[1],
    quote: 'I have fought the good fight — 2 Timothy 4:7',
    final: true,
  },
];

// ============================================
// FLOATING PARTICLES (Butterflies, Petals)
// ============================================
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
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

    const particles: any[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        type: Math.random() > 0.7 ? 'butterfly' : 'petal',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 50) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.globalAlpha = p.opacity;

        if (p.type === 'butterfly') {
          ctx.fillStyle = '#E8A849';
          ctx.beginPath();
          ctx.ellipse(-p.size * 0.5, 0, p.size * 0.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(p.size * 0.5, 0, p.size * 0.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#5D4037';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.15, p.size * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#FFB7C5';
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.6, -p.size * 0.3, 0, p.size * 0.5);
          ctx.quadraticCurveTo(-p.size * 0.6, -p.size * 0.3, 0, -p.size);
          ctx.fill();
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

// ============================================
// FLIP CARD COMPONENT (No GSAP)
// ============================================
function FlipCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const Icon = milestone.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-4xl mx-auto mb-16 cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-48 md:h-64 overflow-hidden">
            {milestone.image && (
              <img
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
                style={{ backgroundColor: milestone.color }}
              >
                <Calendar className="w-3 h-3" />
                {milestone.year}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white">{milestone.title}</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${milestone.color}20`, border: `2px solid ${milestone.color}` }}
              >
                <Icon className="w-5 h-5" style={{ color: milestone.color }} />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-lg">{milestone.description}</p>
                <p className="text-amber-600 text-sm mt-3">↻ Tap to read more</p>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-2" style={{ backgroundColor: milestone.color }} />
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            {milestone.quote && (
              <div className="mb-6 italic border-l-4 pl-4" style={{ borderLeftColor: milestone.color }}>
                <p className="text-gray-600">"{milestone.quote}"</p>
              </div>
            )}
            <p className="text-gray-700 leading-relaxed">{milestone.longDescription}</p>
            <p className="text-gray-400 text-xs mt-6 text-right">↻ Tap to flip back</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MAIN TIMELINE COMPONENT
// ============================================
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.5]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F7F5F2 0%, #E8D5C4 100%)',
      }}
    >
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#E8A84910_0%,_transparent_70%)]" />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm mb-6">
            <Compass className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 text-sm tracking-wide">A Life Well Lived</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif text-gray-800 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            His Journey
          </h2>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
            A celebration of every moment, every memory, every heartbeat.
            Tap each card to discover the beautiful story of Vincent Mwaura Wairimu.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-300/50 via-amber-400/30 to-transparent hidden md:block" />

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const Icon = milestone.icon;

            return (
              <div
                key={index}
                className={`relative mb-24 md:mb-32 ${isEven ? 'md:pl-[50%]' : 'md:pr-[50%] md:text-right'}`}
              >
                {/* Year badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`absolute top-0 ${isEven ? 'md:right-[calc(50%+2rem)]' : 'md:left-[calc(50%+2rem)]'} hidden md:block`}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${milestone.color}20`, border: `2px solid ${milestone.color}` }}
                  >
                    <span className="text-lg font-bold" style={{ color: milestone.color }}>
                      {milestone.year.split('-')[0]}
                    </span>
                  </div>
                </motion.div>

                {/* Card */}
                <FlipCard milestone={milestone} index={index} />

                {/* Decorative star */}
                {milestone.final && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2 text-amber-600/60 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>Eternal Light</span>
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

          <p className="text-gray-500 italic max-w-2xl mx-auto text-lg">
            "Vinny taught us that life isn't measured by the number of years,
            but by the number of lives we touch. His was a life that touched eternity."
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-amber-600/50">
            <Leaf className="w-4 h-4" />
            <span className="text-sm">Forever in our hearts</span>
            <Leaf className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}