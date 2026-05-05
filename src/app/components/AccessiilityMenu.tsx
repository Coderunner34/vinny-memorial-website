import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, Type, Contrast, Globe, X, Plus, Minus, Moon, Sun } from 'lucide-react';

interface AccessibilityMenuProps {
  onFontSizeChange: (size: number) => void;
  onContrastChange: (mode: 'normal' | 'high') => void;
  onLanguageChange: (lang: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ki', name: 'Gĩkũyũ', flag: '🇰🇪' },
];

export default function AccessibilityMenu({ onFontSizeChange, onContrastChange, onLanguageChange }: AccessibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Apply font size to root
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // Apply contrast mode
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [fontSize, isHighContrast]);

  const increaseFont = () => {
    if (fontSize < 150) setFontSize(prev => prev + 10);
  };

  const decreaseFont = () => {
    if (fontSize > 70) setFontSize(prev => prev - 10);
  };

  const toggleContrast = () => {
    const newMode = !isHighContrast;
    setIsHighContrast(newMode);
    onContrastChange(newMode ? 'high' : 'normal');
  };

  const selectLanguage = (code: string) => {
    setCurrentLang(code);
    onLanguageChange(code);
  };

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-6 bottom-24 z-50 w-14 h-14 bg-gradient-to-br from-amber-600/40 to-amber-700/30 backdrop-blur-md rounded-full border-2 border-amber-400/50 flex items-center justify-center shadow-2xl group"
      >
        <Accessibility className="w-7 h-7 text-amber-300" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-slate-900 border border-amber-400/50 rounded-lg px-4 py-2">
            <p className="text-amber-100 text-sm">Accessibility Options</p>
          </div>
        </div>
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-amber-400/30 z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-amber-400/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-600/20 border-2 border-amber-400/40 flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-amber-300" />
                  </div>
                  <h2 className="text-xl font-serif text-amber-100">Accessibility</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-amber-400/10 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-amber-300" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Font Size */}
                <div>
                  <label className="flex items-center gap-2 text-amber-100 mb-3">
                    <Type className="w-4 h-4" />
                    <span>Text Size</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decreaseFont}
                      className="w-10 h-10 rounded-full bg-slate-800 border border-amber-400/30 flex items-center justify-center hover:bg-amber-600/20 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-amber-300" />
                    </button>
                    <span className="text-amber-100 text-lg w-16 text-center">{fontSize}%</span>
                    <button
                      onClick={increaseFont}
                      className="w-10 h-10 rounded-full bg-slate-800 border border-amber-400/30 flex items-center justify-center hover:bg-amber-600/20 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>

                {/* High Contrast */}
                <div>
                  <label className="flex items-center gap-2 text-amber-100 mb-3">
                    <Contrast className="w-4 h-4" />
                    <span>High Contrast Mode</span>
                  </label>
                  <button
                    onClick={toggleContrast}
                    className={`w-full p-3 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                      isHighContrast
                        ? 'bg-amber-600/30 border-amber-400 text-amber-100'
                        : 'bg-slate-800/50 border-slate-600 text-amber-100/70'
                    }`}
                  >
                    <span>{isHighContrast ? 'High Contrast Active' : 'Enable High Contrast'}</span>
                    {isHighContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>

                {/* Language */}
                <div>
                  <label className="flex items-center gap-2 text-amber-100 mb-3">
                    <Globe className="w-4 h-4" />
                    <span>Language / Lugha / Rũthiomi</span>
                  </label>
                  <div className="space-y-2">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => selectLanguage(lang.code)}
                        className={`w-full p-3 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                          currentLang === lang.code
                            ? 'bg-amber-600/30 border-amber-400 text-amber-100'
                            : 'bg-slate-800/50 border-slate-600 text-amber-100/70 hover:bg-slate-800/70'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-amber-900/20 border border-amber-400/20 rounded-lg p-4 mt-4">
                  <p className="text-amber-100/60 text-xs text-center leading-relaxed">
                    These settings are saved and will persist across your visit.
                    <br />
                    High contrast mode improves readability for users with visual impairments.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

