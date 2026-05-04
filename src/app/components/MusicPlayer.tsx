import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Flame } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // YouTube embed of "River Flows in You" by Yiruma (or similar peaceful piano)
  // Note: For production, use a proper audio file or YouTube embed API
  const musicUrl = 'https://www.youtube.com/embed/7maJOI3QMu0?autoplay=1&loop=1&playlist=7maJOI3QMu0';

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log('Autoplay prevented:', e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      {/* Hidden YouTube embed for music */}
      {isPlaying && (
        <div className="hidden">
          <iframe
            src={musicUrl}
            allow="autoplay; encrypted-media"
            style={{ display: 'none' }}
            title="Background Music"
          />
        </div>
      )}

      {/* Floating Music Control Button */}
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-amber-500/30 rounded-full scale-110" />

          {/* Button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-amber-600/40 to-amber-700/30 backdrop-blur-md rounded-full border-2 border-amber-400/50 flex items-center justify-center shadow-2xl">
            {/* Candle icon when playing */}
            {isPlaying ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Flame className="w-7 h-7 text-amber-300" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <VolumeX className="w-6 h-6 text-amber-300/70" />
              </motion.div>
            )}

            {/* Pulsing ring when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 border-2 border-amber-400/50 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <div className="bg-slate-900 border border-amber-400/50 rounded-lg px-4 py-2 shadow-xl">
              <p className="text-amber-100 text-sm">
                {isPlaying ? 'Pause music' : 'Play music'}
              </p>
            </div>
          </div>
        </motion.button>
      </AnimatePresence>

      {/* Instructions overlay (shows briefly on first load) */}
      {/* <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-32 right-8 z-40 bg-slate-900 border border-amber-400/50 rounded-lg p-4 shadow-2xl max-w-xs"
          >
            <p className="text-amber-100 text-sm mb-2">
              Click the candle to pause/play background music
            </p>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-amber-300/70 hover:text-amber-300 text-xs"
            >
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}
