import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Church, Navigation, Download, Share2 } from 'lucide-react';

export default function ServiceDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

const burialDate = new Date(); // today
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = burialDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [burialDate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vincent Mwaura Wairimu - Burial Service',
        text: 'Join us in celebrating the life of Vinny',
        url: window.location.href,
      });
    }
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=P.C.E.A.+Gituamba+Church+Eldoret', '_blank');
  };

  const orderOfService = [
    { time: '10:00 AM', event: 'Opening Prayer', duration: '15 min' },
    { time: '10:15 AM', event: 'Hymns & Worship', duration: '30 min' },
    { time: '10:45 AM', event: 'Scripture Readings', duration: '15 min' },
    { time: '11:00 AM', event: 'Tributes & Eulogies', duration: '45 min' },
    { time: '11:45 AM', event: 'Sermon', duration: '30 min' },
    { time: '12:15 PM', event: 'Viewing & Final Farewell', duration: '30 min' },
    { time: '12:45 PM', event: 'Procession to Burial Site', duration: '30 min' },
    { time: '1:15 PM', event: 'Interment', duration: '30 min' },
  ];

  return (
    <section
      ref={ref}
      id="service"
      className="relative py-16 px-4 md:py-24 md:px-6 overflow-hidden"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Subtle background movement */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#f0ede8_0%,_#FAFAF8_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 h-px bg-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-gray-800 tracking-wide mb-3">
            Burial Service
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mt-6" />
          <p className="text-gray-400 mt-6 max-w-md mx-auto text-sm tracking-wide">
            Join us as we celebrate Vinny's life and say our final goodbyes
          </p>
        </motion.div>

        {/* Countdown Timer - clean, minimal */}
        {!isPast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white border border-gray-200 rounded-sm p-6 md:p-8 shadow-sm">
              <p className="text-center text-gray-400 text-sm tracking-wider mb-6">
                TIME UNTIL SERVICE
              </p>
              <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-md mx-auto">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((unit, index) => (
                  <div
                    key={unit.label}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-light text-gray-800 font-mono tracking-wide">
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 text-xs tracking-wider mt-2">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Service Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
        >
          {/* Date - Clean horizontal layout */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500 text-sm tracking-wide">DATE</span>
              </div>
              <p className="text-gray-800 text-lg md:text-xl font-serif">
                Tuesday, May 5th, 2026
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500 text-sm tracking-wide">TIME</span>
              </div>
              <p className="text-gray-800 text-lg md:text-xl">
                10:00 AM (East Africa Time)
              </p>
            </div>
          </div>

          {/* Service Location */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Church className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500 text-sm tracking-wide">SERVICE</span>
              </div>
              <div className="text-right">
                <p className="text-gray-800 text-lg md:text-xl">
                  P.C.E.A. Gituamba Church
                </p>
                <p className="text-gray-400 text-sm mt-1">Eldoret, Kenya</p>
              </div>
            </div>
          </div>

          {/* Burial Location */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500 text-sm tracking-wide">BURIAL</span>
              </div>
              <div className="text-right">
                <p className="text-gray-800 text-lg md:text-xl">
                  Family Home, Pioneer Village
                </p>
                <p className="text-gray-400 text-sm mt-1">Eldoret, Kenya</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 md:p-8 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDirections}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm tracking-wide transition-colors duration-300"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm tracking-wide transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
              Share Details
            </button>
          </div>
        </motion.div>

        {/* Order of Service */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="text-center">
              <div className="w-12 h-px bg-gray-300 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 tracking-wide">
                Order of Service
              </h3>
              <div className="w-12 h-px bg-gray-300 mx-auto mt-4" />
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {orderOfService.map((item, index) => (
              <div
                key={index}
                className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm font-mono w-20">
                    {item.time}
                  </span>
                  <span className="text-gray-800">
                    {item.event}
                  </span>
                </div>
                <div className="text-gray-400 text-xs mt-2 sm:mt-0 sm:ml-4">
                  {item.duration}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
            <p className="text-gray-500 text-sm text-center leading-relaxed">
              Reception will follow immediately after the burial service at the family home.
              All are warmly welcome.
            </p>
          </div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="w-12 h-px bg-gray-200 mx-auto mb-6" />
          <p className="text-gray-400 text-sm tracking-wide">
            In lieu of flowers, donations can be made to the family.
            <br />
            For more information, please contact the family directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}