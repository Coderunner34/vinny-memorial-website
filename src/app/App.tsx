import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';
import LoadingIntro from './components/LoadingIntro';
import HeroSection from './components/HeroSection';
import Biography from './components/Biography';
import Timeline from './components/Timeline';
import PhotoGallery from './components/PhotoGallery';
import CandleWall from './components/CandleWall';

import ServiceDetails from './components/ServiceDetails';
import LiveStream from './components/LiveStream';
import Farewell from './components/Farewell';
import MusicPlayer from './components/MusicPlayer';
import AdminPanel from './components/AdminPanel';
import FloatingParticles from './components/FloatingParticles';
import DonationPanel from './components/DonationPanel';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleEnter = () => {
    setShowIntro(false);
    setMusicPlaying(true);
  };

  // Secret admin access: Triple-click bottom-left corner
  const handleAdminAccess = () => {
    setClickCount(prev => prev + 1);
    setTimeout(() => setClickCount(0), 1000);

    if (clickCount === 2) {
      setShowAdmin(true);
      setClickCount(0);
    }
  };

  // Keyboard shortcut: Ctrl/Cmd + Shift + A
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <LoadingIntro key="intro" onEnter={handleEnter} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <FloatingParticles />
            <MusicPlayer isPlaying={musicPlaying} setIsPlaying={setMusicPlaying} />

            <HeroSection />
            <Biography />
            <Timeline />
            <PhotoGallery />
            <CandleWall />
            
            <ServiceDetails />
            <LiveStream />
            
            <Farewell />

            {/* Secret Admin Button - Triple-click to access */}
            <button
              onClick={handleAdminAccess}
              className="fixed bottom-8 left-8 w-12 h-12 opacity-0 hover:opacity-100 transition-opacity duration-300 z-40"
              title="Admin Panel (Ctrl+Shift+A or triple-click)"
            >
              <div className="w-full h-full rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center hover:border-amber-400/50 transition-colors">
                <Settings className="w-5 h-5 text-slate-400 hover:text-amber-300 transition-colors" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>
    </div>
  );
}
