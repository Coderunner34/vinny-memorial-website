import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Save, X, Check, Eye, EyeOff } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [saved, setSaved] = useState(false);

  // Admin password - change this to your preferred password
  const ADMIN_PASSWORD = 'Vinny2026';

  useEffect(() => {
    // Load existing live stream URL
    const savedUrl = localStorage.getItem('vinny_livestream_url');
    if (savedUrl) {
      setLiveStreamUrl(savedUrl);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleSave = () => {
    localStorage.setItem('vinny_livestream_url', liveStreamUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('livestreamUrlUpdated', { detail: liveStreamUrl }));
  };

  const handleClear = () => {
    setLiveStreamUrl('');
    localStorage.removeItem('vinny_livestream_url');
    window.dispatchEvent(new CustomEvent('livestreamUrlUpdated', { detail: '' }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-amber-400/30 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-amber-400/20 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600/20 border-2 border-amber-400/40 flex items-center justify-center">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <h2 className="text-2xl font-serif text-amber-100">Admin Panel</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-amber-400/10 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-amber-300" />
          </button>
        </div>

        <div className="p-6">
          {!isAuthenticated ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-amber-100 mb-2">Enter Admin Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-amber-400/30 rounded-lg text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-400/60 pr-12"
                    placeholder="Password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300/70 hover:text-amber-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-amber-600/40 hover:bg-amber-600/50 border border-amber-400/50 text-amber-100 rounded-lg transition-all duration-300 font-semibold"
              >
                Login
              </button>

              <div className="bg-amber-900/20 border border-amber-400/20 rounded-lg p-4">
                <p className="text-amber-100/70 text-sm leading-relaxed">
                  <strong className="text-amber-200">Default Password:</strong> Vinny2026
                  <br />
                  <span className="text-xs text-amber-100/50">
                    (You can change this in the AdminPanel.tsx file)
                  </span>
                </p>
              </div>
            </form>
          ) : (
            /* Admin Dashboard */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <p className="text-green-100">Successfully authenticated</p>
              </div>

              <div>
                <label className="block text-amber-100 mb-2 font-semibold">
                  YouTube Live Stream Embed URL
                </label>
                <p className="text-amber-100/60 text-sm mb-3">
                  Paste the YouTube embed URL here (e.g., https://www.youtube.com/embed/VIDEO_ID)
                </p>
                <textarea
                  value={liveStreamUrl}
                  onChange={(e) => setLiveStreamUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-amber-400/30 rounded-lg text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-400/60 resize-none font-mono text-sm"
                />
              </div>

              <div className="bg-blue-900/20 border border-blue-400/20 rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-2 font-semibold">How to get the YouTube embed URL:</p>
                <ol className="text-blue-100/70 text-sm space-y-1 list-decimal list-inside">
                  <li>Start your YouTube live stream</li>
                  <li>Click "Share" → "Embed"</li>
                  <li>Copy the URL from src="..." (just the URL part)</li>
                  <li>Paste it above and click Save</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-amber-600/40 hover:bg-amber-600/50 border border-amber-400/50 text-amber-100 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save & Update Live
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-red-900/30 hover:bg-red-900/40 border border-red-400/30 text-red-100 rounded-lg transition-all duration-300"
                >
                  Clear
                </button>
              </div>

              <AnimatePresence>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-900/30 border border-green-400/40 rounded-lg p-4 flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-green-400" />
                    <p className="text-green-100">
                      Live stream URL saved! All visitors will now see the updated stream.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {liveStreamUrl && (
                <div className="bg-slate-800/30 border border-amber-400/20 rounded-lg p-4">
                  <p className="text-amber-100/70 text-sm mb-2">Current Live Stream Preview:</p>
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    <iframe
                      src={liveStreamUrl}
                      title="Live Stream Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
