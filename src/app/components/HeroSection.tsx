import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Send, ChevronDown, Menu, X, Heart, Copy, Check, 
  Smartphone, Banknote, Gift, Flower2, Sparkles, User, 
  Mail, MessageCircle, ExternalLink, Briefcase, Globe, 
  Camera, Code, Star, Quote
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Single portrait image
const portraitImage = '/images/farewellvinny.jpeg';

// Floating flower petals for the modal
const flowerPetals = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 4,
  size: 6 + Math.random() * 10,
}));

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBellNotification, setShowBellNotification] = useState(false);
  const [copiedTill, setCopiedTill] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const tillNumber = '538960';
  const phoneNumber = '0792211741';
  const email = 'sckaranu@gmail.com';
  const quickAmounts = [500, 1000, 2000, 5000];

  // Auto-hide bell notification after 5 seconds
  useEffect(() => {
    if (showBellNotification) {
      // Play subtle sound
      if (audioRef.current) {
        audioRef.current.volume = 0.2;
        audioRef.current.play().catch(() => {});
      }
      const timer = setTimeout(() => setShowBellNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showBellNotification]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'till') {
      setCopiedTill(true);
      setTimeout(() => setCopiedTill(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount && amount >= 10) {
      window.location.href = `tel:*483#`;
    }
  };

  const handleBellClick = () => {
    const bell = document.getElementById('bell-icon');
    if (bell) {
      bell.classList.add('bell-ring');
      setTimeout(() => bell.classList.remove('bell-ring'), 1000);
    }
    setShowBellNotification(true);
  };

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className="bg-white border-b border-gray-100 py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-end items-center gap-3 text-xs md:text-sm">
          <a href="tel:+254724554404" className="text-gray-600 hover:text-amber-700 flex items-center gap-1">
            <Phone className="w-3 h-3" /> 0724 554 404
          </a>
          
          {/* Bell Icon with Notification */}
          <div className="relative">
            <button
              id="bell-icon"
              onClick={handleBellClick}
              className="relative text-gray-500 hover:text-amber-600 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            </button>
          </div>

          <button 
            onClick={() => setShowDonateModal(true)}
            className="border border-amber-600 text-amber-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:bg-amber-50 transition"
          >
            <Flower2 className="w-3 h-3" /> Send Flowers
          </button>
          
          <button 
            onClick={() => setShowContactModal(true)}
            className="border border-gray-300 text-gray-600 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm hover:border-amber-600 hover:text-amber-700 transition"
          >
            Developer
          </button>
        </div>
      </div>

      {/* BELL NOTIFICATION POPUP */}
      <AnimatePresence>
        {showBellNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-14 right-4 z-[100] w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                  <Heart className="w-3 h-3 text-amber-600" />
                </div>
                <p className="text-gray-700 text-xs font-medium">In Memory of Vinny</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-700 text-xs font-serif">VM</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm font-medium"> <i style={{color: '#236fa1'}}>Inspired by </i>
                      Karanu Isaac · Leon · Joseph Mburu
                  </p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Class of 2018 · Karia-Ini Academy classmates of Vincent
                  </p>
                  <p className="text-gray-400 text-[10px] mt-2 italic">
                    Forever in our hearts
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex justify-between items-center">
              <p className="text-gray-400 text-[10px]">Just now</p>
              <button 
                onClick={() => setShowBellNotification(false)}
                className="text-gray-400 hover:text-gray-600 text-[10px] transition-colors"
              >
                Dismiss
              </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio for notification sound */}
      <audio ref={audioRef} src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" preload="auto" />

      {/* MAIN NAVIGATION */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div 
              onClick={() => scrollToSection('hero')}
              className="cursor-pointer"
            >
              <span className="text-3xl md:text-4xl font-serif tracking-wide text-gray-800">VINNY</span>
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
          {/* Portrait */}
          <div className="mx-auto mb-6 w-24 h-24 md:w-32 md:h-32">
            <motion.div 
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/50 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src={portraitImage} alt="Vincent Mwaura Wairimu" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-3 tracking-wide"
          >
            Honor & Remember
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl mb-1"
          >
            Vincent Mwaura Wairimu
          </motion.p>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-sm md:text-base italic mb-6"
          >
            "Vinny" · 2005 — 2026 · Forever 21
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => scrollToSection('about')}
            className="bg-[#1a2a3a] hover:bg-[#2a3a4a] text-white px-6 md:px-8 py-2.5 md:py-3 rounded text-sm uppercase tracking-wider transition duration-300"
          >
            VIEW HIS STORY
          </motion.button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
        </div>
      </section>

      {/* DONATE MODAL */}
      <AnimatePresence>
        {showDonateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowDonateModal(false)}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {flowerPetals.map((petal) => (
                <motion.div
                  key={petal.id}
                  className="absolute rounded-full bg-amber-400/30"
                  style={{ left: `${petal.left}%`, width: petal.size, height: petal.size }}
                  animate={{
                    y: ['-20vh', '120vh'],
                    x: [`${petal.left}%`, `${petal.left + (Math.random() - 0.5) * 30}%`],
                    opacity: [0, 0.6, 0],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: 'linear' }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-6 text-center border-b border-amber-100">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                  <Flower2 className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Send Flowers & Support</h3>
                <p className="text-gray-500 text-sm mt-1">Your generosity honors Vinny's memory</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600" />
                    Till Number (No Charges)
                  </p>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <code className="text-gray-800 text-lg font-mono">{tillNumber}</code>
                    <button onClick={() => handleCopy(tillNumber, 'till')} className="p-2 hover:bg-gray-200 rounded transition-colors">
                      {copiedTill ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600" />
                    Suggested Amounts
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                        className={`p-2 rounded-lg border transition-all ${selectedAmount === amount ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'}`}
                      >
                        KES {amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  placeholder="Custom amount (KES)"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />

                <button
                  onClick={handleDonate}
                  disabled={!selectedAmount && !customAmount}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Donate via M-Pesa
                </button>

                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-amber-700 text-xs">All donations support funeral expenses and a scholarship fund in Vinny's memory.</p>
                </div>
              </div>

              <button onClick={() => setShowDonateModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT DEVELOPER MODAL */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center">
                  <Code className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-serif">BizWaziri Digital</h3>
                <p className="text-gray-400 text-sm mt-1">We build digital experiences</p>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <Quote className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm italic">"Vinny was my close friend. His laughter, his kindness, his light — they stay with me forever. This memorial is my love letter to him."</p>
                  <p className="text-amber-600 text-xs mt-2 font-medium">— Isaac Karanu</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Developer
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{phoneNumber}</span>
                      </div>
                      <button onClick={() => handleCopy(phoneNumber, 'phone')} className="p-1 hover:bg-gray-200 rounded transition-colors">
                        {copiedPhone ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>

                    <a href={`https://wa.me/${phoneNumber.replace('0', '254')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-200 hover:bg-green-100 transition">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">WhatsApp</span>
                      </div>
                      <span className="text-green-600 text-xs">+254 {phoneNumber}</span>
                    </a>

                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 text-sm">{email}</span>
                      </div>
                      <button onClick={() => handleCopy(email, 'email')} className="p-1 hover:bg-gray-200 rounded transition-colors">
                        {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Briefcase className="w-3 h-3" />
                    What We Build
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Globe, name: 'Websites' },
                      { icon: Heart, name: 'Memorial Sites' },
                      { icon: Camera, name: 'Digital Menus' },
                      { icon: Sparkles, name: 'Wedding Sites' },
                    ].map((service, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <service.icon className="w-3 h-3 text-amber-600" />
                        <span className="text-gray-600 text-xs">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="https://bizwaziri-clean.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                    <span className="text-white text-sm">BizWaziri Digital</span>
                  </div>
                  <span className="text-amber-400 text-xs">Visit →</span>
                </a>

                <div className="text-center pt-2">
                  <p className="text-gray-400 text-[10px]">Find us on Google: <span className="text-amber-600">BizWaziri Digital</span></p>
                </div>
              </div>

              <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed bottom left contact button */}
      <button 
        onClick={() => setShowContactModal(true)}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-[#1a2a3a] rounded-full flex items-center justify-center shadow-lg hover:bg-[#2a3a4a] transition group"
        aria-label="Contact Developer"
      >
        <Code className="w-4 h-4 text-white" />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Developer
        </span>
      </button>

      <style>{`
        .duration-600 { transition-duration: 600ms; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .animate-bounce { animation: bounce 1.5s infinite; }
        @keyframes bellRing { 0% { transform: rotate(0deg); } 10% { transform: rotate(15deg); } 20% { transform: rotate(-10deg); } 30% { transform: rotate(5deg); } 40% { transform: rotate(-5deg); } 50% { transform: rotate(0deg); } }
        .bell-ring { animation: bellRing 1s ease-in-out; }
      `}</style>
    </>
  );
}