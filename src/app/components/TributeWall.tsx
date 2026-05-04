import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Send, 
  Sparkles,
  Users,
  Quote,
  Star,
  Feather,
  Clock,
  BookOpen
} from 'lucide-react';

interface Tribute {
  id: number;
  name: string;
  relationship: string;
  message: string;
  timestamp: Date;
  likes?: number;
  liked?: boolean;
}

// Sample tributes
const initialTributes: Tribute[] = [
  {
    id: 1,
    name: 'The Wairimu Family',
    relationship: 'Family',
    message: 'Our beloved son, brother, and friend. Your light will never fade from our hearts. You fought the good fight, and now you rest in eternal peace. We love you forever, Vinny.',
    timestamp: new Date('2026-04-26'),
    likes: 24,
    liked: false,
  },
  {
    id: 2,
    name: 'Friends from Ting\'ang\'a Secondary',
    relationship: 'Classmates',
    message: 'Vinny, you were more than a friend — you were family. Your leadership, your kindness, your unforgettable smile. We will carry your memory with us always. Rest easy, Commander.',
    timestamp: new Date('2026-04-27'),
    likes: 18,
    liked: false,
  },
  {
    id: 3,
    name: 'P.C.E.A. Gituamba Youth',
    relationship: 'Church Family',
    message: 'A faithful servant, a loving brother in Christ. Your prayers, your service, your devotion inspired us all. Until we meet again in glory, Vinny. God has gained another angel.',
    timestamp: new Date('2026-04-28'),
    likes: 32,
    liked: false,
  },
];

// Additional inspiring quotes
const inspiringQuotes = [
  "What we have once enjoyed we can never lose. All that we love deeply becomes a part of us.",
  "Those we love don't go away, they walk beside us every day.",
  "Perhaps they are not stars, but openings in heaven where the love of our lost ones pours through.",
  "Grief is the price we pay for love.",
  "The song is ended, but the melody lingers on.",
];

export default function TributeWall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');
  const [totalLikes, setTotalLikes] = useState(0);
  const [animatedCard, setAnimatedCard] = useState<number | null>(null);

  useEffect(() => {
    // Set random quote
    const randomIndex = Math.floor(Math.random() * inspiringQuotes.length);
    setRandomQuote(inspiringQuotes[randomIndex]);
    
    // Calculate total likes
    const total = tributes.reduce((sum, t) => sum + (t.likes || 0), 0);
    setTotalLikes(total);
  }, [tributes]);

  const handleLike = (id: number) => {
    setTributes(prev => prev.map(tribute => {
      if (tribute.id === id && !tribute.liked) {
        setAnimatedCard(id);
        setTimeout(() => setAnimatedCard(null), 500);
        return { 
          ...tribute, 
          likes: (tribute.likes || 0) + 1, 
          liked: true 
        };
      }
      return tribute;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setIsSubmitting(true);
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTribute: Tribute = {
        id: Date.now(),
        name: name.trim(),
        relationship: relationship.trim(),
        message: message.trim(),
        timestamp: new Date(),
        likes: 0,
        liked: false,
      };
      
      setTributes([newTribute, ...tributes]);
      setName('');
      setRelationship('');
      setMessage('');
      setShowForm(false);
      setIsSubmitting(false);
      
      // Show success animation
      setAnimatedCard(newTribute.id);
      setTimeout(() => setAnimatedCard(null), 1000);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section
      ref={ref}
      id="tributes"
      className="relative py-16 px-4 md:py-24 md:px-6 overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#1f1f1f] to-[#141414]" />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 h-px bg-gray-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-gray-100 tracking-wide mb-3">
            Tribute Wall
          </h2>
          <div className="w-16 h-px bg-gray-600 mx-auto mt-6" />
          <p className="text-gray-400 mt-6 max-w-md mx-auto text-sm tracking-wide">
            Share your memories, condolences, and love
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-6 md:gap-12 mb-12"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-light text-gray-100">{tributes.length}</div>
            <div className="text-xs text-gray-500 tracking-wide mt-1">TRIBUTES</div>
          </div>
          <div className="w-px h-8 bg-gray-700 self-center" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-light text-gray-100">{totalLikes}</div>
            <div className="text-xs text-gray-500 tracking-wide mt-1">HEARTS</div>
          </div>
          <div className="w-px h-8 bg-gray-700 self-center" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-light text-gray-100">
              {tributes.filter(t => t.relationship === 'Family').length}
            </div>
            <div className="text-xs text-gray-500 tracking-wide mt-1">FAMILY</div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          {!showForm ? (
            <button
              onClick={() => {
                setShowForm(true);
                setShowInspiration(true);
                const newIndex = Math.floor(Math.random() * inspiringQuotes.length);
                setRandomQuote(inspiringQuotes[newIndex]);
              }}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 rounded-sm transition-all duration-300 text-sm tracking-wide"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Leave a Tribute
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 border border-gray-700 shadow-2xl"
            >
              {/* Inspirational quote */}
              {showInspiration && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gray-900/50 border-l-2 border-gray-500"
                >
                  <Quote className="w-4 h-4 text-gray-500 mb-2" />
                  <p className="text-gray-400 text-sm italic leading-relaxed">
                    "{randomQuote}"
                  </p>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                  required
                />
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="Your relationship (e.g., Friend, Family)"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your memories and tribute to Vinny..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-sm text-gray-200 placeholder-gray-500 mb-4 focus:outline-none focus:border-gray-500 resize-none transition-colors"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-sm text-sm tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post Tribute
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setShowInspiration(false);
                  }}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 rounded-sm text-sm tracking-wide transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>

        {/* Tributes Grid */}
        <div className="space-y-4 mt-8">
          <AnimatePresence>
            {tributes.map((tribute, index) => (
              <motion.div
                key={tribute.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.5, delay: Math.min(index * 0.05, 1) }
                }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                whileHover={{ x: 4 }}
                className={`relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-5 md:p-6 transition-all duration-300 ${
                  animatedCard === tribute.id ? 'ring-1 ring-gray-500 bg-gray-800/50' : ''
                }`}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }} />
                </div>

                <div className="relative flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
                      <span className="text-gray-300 text-base font-serif">
                        {tribute.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h3 className="text-base md:text-lg text-gray-200 font-medium">
                        {tribute.name}
                      </h3>
                      {tribute.relationship && (
                        <span className="text-gray-500 text-xs">
                          · {tribute.relationship}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      {tribute.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs">
                      <button
                        onClick={() => handleLike(tribute.id)}
                        disabled={tribute.liked}
                        className={`flex items-center gap-1.5 transition-all duration-300 ${
                          tribute.liked 
                            ? 'text-rose-500 cursor-default' 
                            : 'text-gray-500 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${tribute.liked ? 'fill-rose-500' : ''}`} />
                        <span>{tribute.likes || 0}</span>
                      </button>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(tribute.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {tributes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-500 text-sm">No tributes yet. Be the first to share.</p>
          </motion.div>
        )}

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-8 text-center border-t border-gray-800"
        >
          <div className="flex justify-center gap-1 text-gray-700">
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gray-700" />
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-4 tracking-wide">
            Every tribute, every heart, every prayer — a legacy that lives on
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-gentle-pulse {
          animation: gentlePulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}