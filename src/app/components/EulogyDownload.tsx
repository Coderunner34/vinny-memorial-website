import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';

export default function EulogyDownload() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/EULOGY_FOR_THE_LATE_VINCENT_WAIRIMU_FINAL.pdf';
    link.download = 'Eulogy_Vincent_Wairimu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-slate-900/30 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-amber-400/30 p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-600/20 border-2 border-amber-400/40 flex items-center justify-center">
            <FileText className="w-8 h-8 text-amber-300" />
          </div>
          <h3 className="text-2xl font-serif text-amber-100 mb-2">Read Vinny's Eulogy</h3>
          <p className="text-amber-100/70 mb-6 max-w-md mx-auto">
            Download the complete eulogy to read the full tribute to Vincent's life and legacy.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="inline-flex items-center gap-3 px-8 py-3 bg-amber-600/30 hover:bg-amber-600/40 border border-amber-400/50 text-amber-100 rounded-full transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Eulogy (PDF)
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}