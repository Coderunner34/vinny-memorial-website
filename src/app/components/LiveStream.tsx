import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Youtube, Video, Calendar, Clock, AlertCircle, Check, Edit2, X, Settings } from 'lucide-react';

export default function LiveStream() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Service date
  const serviceDate = new Date('2026-05-06T10:00:00');
  const isLiveActive = new Date() >= serviceDate;

  useEffect(() => {
    // Load saved URL from localStorage
    const savedUrl = localStorage.getItem('vinny_livestream_url');
    if (savedUrl) {
      setYoutubeEmbedUrl(savedUrl);
      setTempUrl(savedUrl);
    }

    // Listen for updates from admin panel
    const handleUrlUpdate = (event: CustomEvent) => {
      setYoutubeEmbedUrl(event.detail);
      setTempUrl(event.detail);
    };

    window.addEventListener('livestreamUrlUpdated', handleUrlUpdate as EventListener);

    return () => {
      window.removeEventListener('livestreamUrlUpdated', handleUrlUpdate as EventListener);
    };
  }, []);

  // Admin password check - click the logo 5 times to enable
  const [clickCount, setClickCount] = useState(0);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setShowAdminPrompt(true);
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 3000);
  };

  const handleAdminLogin = () => {
    // Default password - can be changed
    if (adminPassword === 'vinny2026') {
      setIsAuthenticated(true);
      setIsAdminMode(true);
      setShowAdminPrompt(false);
      setAdminPassword('');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleSaveUrl = () => {
    if (tempUrl && (tempUrl.includes('youtube.com/embed/') || tempUrl.includes('youtu.be/'))) {
      // Format the URL properly
      let formattedUrl = tempUrl;
      if (tempUrl.includes('youtu.be/')) {
        const videoId = tempUrl.split('youtu.be/')[1].split('?')[0];
        formattedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      localStorage.setItem('vinny_livestream_url', formattedUrl);
      setYoutubeEmbedUrl(formattedUrl);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else if (tempUrl) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleClearUrl = () => {
    localStorage.removeItem('vinny_livestream_url');
    setYoutubeEmbedUrl('');
    setTempUrl('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Extract video ID for thumbnail if needed
  const getVideoId = (url: string) => {
    if (url.includes('youtube.com/embed/')) {
      return url.split('/embed/')[1].split('?')[0];
    }
    return null;
  };

  const videoId = youtubeEmbedUrl ? getVideoId(youtubeEmbedUrl) : null;

  return (
    <section
      ref={ref}
      id="livestream"
      className="relative py-16 px-4 md:py-24 md:px-6"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 h-px bg-gray-300 mx-auto mb-6" />
          <h2 
            className="text-3xl md:text-5xl font-serif text-gray-800 tracking-wide mb-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            Live Stream
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mt-6" />
          <p className="text-gray-400 mt-6 max-w-md mx-auto text-sm tracking-wide">
            Join us from anywhere in the world
          </p>
        </motion.div>

        {/* Live Stream Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
        >
          {/* Status Bar */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLiveActive && youtubeEmbedUrl ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-500 tracking-wide">LIVE NOW</span>
                </>
              ) : youtubeEmbedUrl ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-xs text-gray-400 tracking-wide">UPCOMING STREAM</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-xs text-gray-400 tracking-wide">STREAM NOT SET</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>May 6, 2026</span>
              <Clock className="w-3 h-3 ml-2" />
              <span>10:00 AM EAT</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-gray-100">
            {youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title="Burial Service Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                  <Youtube className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl text-gray-500 font-light mb-2">
                  Stream will appear here
                </h3>
                <p className="text-gray-400 text-sm max-w-md">
                  The live stream will be available on Tuesday, May 6th, 2026 at 10:00 AM
                </p>
                <div className="mt-4 text-xs text-gray-300">
                  <p>Check back here at service time</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-6 md:p-8">
            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                For those unable to attend in person, join us through this live stream.
                <br />
                The service will begin at 10:00 AM East Africa Time.
              </p>
            </div>

            {/* Service Details Quick View */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <span>P.C.E.A. Gituamba Church</span>
              <span>•</span>
              <span>Eldoret, Kenya</span>
              <span>•</span>
              <span>Tuesday, May 6, 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Admin Mode - Hidden, accessible only after authentication */}
        <AnimatePresence>
          {isAdminMode && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <h3 className="text-gray-800 font-serif text-lg">Admin Controls</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsAdminMode(false);
                      setIsAuthenticated(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-500 text-sm mb-4">
                  YouTube Embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
                </p>
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveUrl}
                    className="flex-1 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm tracking-wide transition-colors duration-300"
                  >
                    Save Stream URL
                  </button>
                  <button
                    onClick={handleClearUrl}
                    className="px-6 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 text-sm tracking-wide transition-colors duration-300"
                  >
                    Clear
                  </button>
                </div>

                {videoId && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-sm">
                    <p className="text-gray-500 text-xs mb-2">Preview Link:</p>
                    <code className="text-xs text-gray-600 break-all">
                      https://www.youtube.com/watch?v={videoId}
                    </code>
                  </div>
                )}

                <p className="text-gray-400 text-xs mt-4">
                  The stream will appear automatically on the memorial site once saved.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Login Modal */}
        <AnimatePresence>
          {showAdminPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAdminPrompt(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white max-w-md w-full rounded-sm shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-serif text-gray-800">Admin Access</h3>
                  <p className="text-gray-400 text-sm mt-1">Enter password to manage live stream</p>
                </div>
                <div className="p-6">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                    autoFocus
                  />
                  <button
                    onClick={handleAdminLogin}
                    className="w-full mt-4 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm tracking-wide transition-colors duration-300"
                  >
                    Login
                  </button>
                </div>
                <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                  <p className="text-gray-400 text-xs text-center">
                    Contact the family for the admin password
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success/Error Toasts */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 rounded-sm p-4 flex items-center gap-3 shadow-lg"
            >
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-700 text-sm">Stream URL saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-red-50 border border-red-200 rounded-sm p-4 flex items-center gap-3 shadow-lg"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 text-sm">
                Please enter a valid YouTube embed URL
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions Section - only visible when no stream is set or in admin mode */}
        {!youtubeEmbedUrl && !isAdminMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400 text-xs">
              The family will update this section with the live stream link on the day of the service.
            </p>
           <p className="text-gray-400 text-xs mt-2">
              If you have the stream link, please contact the family to have it added.
            </p>
           <p className="text-gray-400 text-xs mt-2">
              Thank you for your understanding.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}