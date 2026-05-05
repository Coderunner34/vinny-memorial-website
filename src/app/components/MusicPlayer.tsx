import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, SkipForward, SkipBack, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

// Playlist using LOCAL MP3 files (now saved in public/music/)
const playlist = [
  {
    id: 1,
    title: "How Do I Say Goodbye",
    artist: "Dean Lewis",
    file: "/music/how-do-i-say-goodbye.mp3",
    description: "A song about loss, love, and letting go"
  },
  {
    id: 2,
    title: "River Flows in You",
    artist: "Yiruma",
    file: "/music/river-flows-in-you.mp3",
    description: "Peaceful piano for reflection"
  }
];

export default function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = playlist[currentSongIndex];

  // Handle play/pause when isPlaying changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.volume = 0.4;

        if (currentSong.title === "How Do I Say Goodbye") {
        audioRef.current.currentTime = 7;
           }
           
        audioRef.current.play().catch(e => {
          console.log('Playback error:', e);
          // Try again on user interaction
          document.addEventListener('click', function playOnce() {
            audioRef.current?.play();
            document.removeEventListener('click', playOnce);
          });
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  // Change song when index changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log('Song change error:', e));
    }
  }, [currentSongIndex, isPlaying]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  // Auto-hide instructions after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hidden audio element for local MP3 playback */}
      <audio
  ref={audioRef}
  src={currentSong.file}
  loop
  preload="auto"
  onLoadedMetadata={(e) => {
    // Start 7 seconds into the song when it loads
    if (currentSong.title === "How Do I Say Goodbye") {
      e.currentTarget.currentTime = 7;
    }
  }}
/>

      {/* Floating Music Control Button */}
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 blur-xl bg-amber-500/30 rounded-full scale-110" />

          <div className="relative w-14 h-14 bg-gradient-to-br from-amber-600/40 to-amber-700/30 backdrop-blur-md rounded-full border-2 border-amber-400/50 flex items-center justify-center shadow-2xl">
            {isPlaying ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Music className="w-6 h-6 text-amber-300" />
              </motion.div>
            ) : (
              <VolumeX className="w-5 h-5 text-amber-300/70" />
            )}

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
        </motion.button>
      </AnimatePresence>

      {/* Expanded Music Player Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-24 right-6 left-6 md:left-auto md:right-6 md:w-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-amber-400/30 shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-amber-400/30 bg-gray-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-amber-400" />
                  <h3 className="text-amber-100 font-serif text-sm">Memorial Playlist</h3>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-6 h-6 rounded-full hover:bg-amber-400/10 flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-5 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-600/20 border-2 border-amber-400/40 flex items-center justify-center">
                  <Music className="w-7 h-7 text-amber-300" />
                </div>
                <h4 className="text-amber-100 font-semibold text-lg">{currentSong.title}</h4>
                <p className="text-amber-400/60 text-sm">{currentSong.artist}</p>
                <p className="text-amber-400/30 text-xs mt-2 italic">{currentSong.description}</p>
              </div>

              <div className="flex items-center justify-center gap-6 pb-4">
                <button
                  onClick={prevSong}
                  className="w-10 h-10 rounded-full bg-gray-800/50 border border-amber-400/30 flex items-center justify-center hover:bg-amber-600/20 transition-colors"
                >
                  <SkipBack className="w-4 h-4 text-amber-300" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-amber-600/30 border-2 border-amber-400/50 flex items-center justify-center hover:bg-amber-600/40 transition-colors"
                >
                  {isPlaying ? (
                    <VolumeX className="w-6 h-6 text-amber-100" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-amber-100 ml-0.5" />
                  )}
                </button>
                
                <button
                  onClick={nextSong}
                  className="w-10 h-10 rounded-full bg-gray-800/50 border border-amber-400/30 flex items-center justify-center hover:bg-amber-600/20 transition-colors"
                >
                  <SkipForward className="w-4 h-4 text-amber-300" />
                </button>
              </div>

              <div className="border-t border-amber-400/30 max-h-48 overflow-y-auto">
                {playlist.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-3 flex items-center justify-between hover:bg-amber-400/10 transition-colors ${
                      currentSongIndex === index ? 'bg-amber-400/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        currentSongIndex === index && isPlaying
                          ? 'bg-amber-600/30 border border-amber-400/50'
                          : 'bg-gray-800/50 border border-gray-600'
                      }`}>
                        {currentSongIndex === index && isPlaying ? (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-amber-400"
                          />
                        ) : (
                          <span className="text-amber-400/50 text-[10px]">{index + 1}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <p className={`text-xs ${currentSongIndex === index ? 'text-amber-100' : 'text-amber-100/70'}`}>
                          {song.title}
                        </p>
                        <p className="text-[10px] text-amber-400/40">{song.artist}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 border-t border-amber-400/20 text-center">
                <p className="text-amber-400/30 text-[9px]">For Vinny 🕯️</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Initial Instructions */}
      <AnimatePresence>
        {showInstructions && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 right-8 z-40 bg-gray-900 border border-amber-400/50 rounded-lg p-3 shadow-2xl max-w-xs"
          >
            <p className="text-amber-100 text-xs mb-2">
              🎵 Click the music button to play
            </p>
            <p className="text-amber-400/50 text-[10px] mb-2">
              "How Do I Say Goodbye" - Dean Lewis
            </p>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-amber-400/50 hover:text-amber-400 text-[10px]"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}