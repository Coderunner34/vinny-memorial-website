// Biography.tsx - Complete emotional masterpiece
import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { 
  Heart, 
  BookOpen, 
  Cross, 
  Globe, 
  ChevronDown,
  Sparkles,
  GraduationCap,
  Church,
  Users,
  Calendar,
  Star,
  Quote
} from 'lucide-react';

// Language translations from the PDF
const content = {
  en: {
    title: "Who Was Vinny",
    subtitle: "A Life That Touched Thousands",
    sections: {
      birth: {
        title: "A Gift Arrives",
        text: "In the year 2005, celebration was witnessed at Grace Wairimu Wanjiru's residence when God blessed her with her firstborn son, Vincent Mwaura. This gift was truly celebrated at Pioneer Village, Eldoret. He was brother to Nathan Nyamu."
      },
      childhood: {
        title: "The Boy Who Helped",
        text: "In childhood, Vinny used to assist his grandmother with different house chores. He was a very hardworking, committed, and obedient boy at home. He helped without being asked — he swept, he cleaned, he walked alongside his family with a quiet strength that belied his years."
      },
      education: {
        title: "A Scholar and a Leader",
        text: "Vinny joined St. Joseph The Worker Primary School, Ting'ang'a in 2010. Later, he transferred to Karia-ini Academy, Ndumberi, completing his KCPE in 2019 with distinction. In 2020, accompanied by his aunt Lucy Wandai and his beloved grandmother, he joined Njurii High School in Chuka. There he became Scouts Commander and an active, dedicated member of the Red Cross. In 2023, he sat for his KCSE and passed well. He later joined Mount Kenya University, Thika Main Campus, pursuing his dreams until his passing."
      },
      faith: {
        title: "A Man of Faith",
        text: "Having been brought up by a family that loves God, Vinny was baptized at P.C.E.A. Ayub Kinyua, Eldoret, by Rev. Geoffrey Mwihanda on September 23, 2007. He later joined P.C.E.A. Gituamba Church, Ting'ang'a, where he was confirmed in 2018 by Rev. Titus Kibaara. His faith was not mere attendance — it was the quiet engine of his life."
      },
      passing: {
        title: "Called Home",
        text: "On Saturday, April 25th, 2026, while on his way to visit friends, Vinny fell ill. He was rushed to St. Claire Dispensary, Ting'ang'a (Kwa Dennis), and from there referred to Kiambu Level 5 Hospital. But by the time he arrived, he had already been called home. He passed at the age of 21 years. The Lord gave Vinny, and the Lord has taken him. May His name be praised. Amen."
      }
    },
    quote: "He was here. He was real. He was loved beyond measure.",
    scripture: "To everything there is a season, and a time for every purpose under heaven.",
    download: "Download Complete Eulogy (PDF)"
  },
  kikuyu: {
    title: "Weki Mũndũ Ũrĩa Warĩ Vinny?",
    subtitle: "Ũtũũro Ũrĩa Wathire Mĩoyo Mĩingĩ",
    sections: {
      birth: {
        title: "Kĩheo Gĩgĩũka",
        text: "Mwaka-inĩ wa ngiri igiri na ithano, nikwaigwikire ngemi ithano cia kahii, nyumba-inĩ ya Grace Wairimu Wanjiru rĩrĩa Ngai amũrathimire na mwana wake wa irigithathi, Vincent Mwaura. Kĩheo gĩkĩ giakenereiwo mũno nĩ andũ a itũũra rĩa Pioneer, Eldoret. Vinny nĩ arĩ mũrũ wa mbere wa Nathan Nyamu."
      },
      childhood: {
        title: "Mũrũ Ũrĩa Watethagĩra",
        text: "Vinny aarĩ mwana mũnyinyi nĩatethagĩra cucu wao na mawira maingĩ ma mũciĩ. Aarĩ mũrũ mũnyinyi mũkĩrĩra, mũtĩĩri, na mũtaata-inĩ. Nĩatethagĩra ategũthura na akameka na rwendo — ndaatiririo."
      },
      education: {
        title: "Mũrutwo na Mũtongoria",
        text: "Vinny nĩathomire cukũru-inĩ wa St Joseph The Worker, Ting'ang'a mwaka wa 2010. Thutha ũcio nĩagithamiirio Karia-ini Academy, Ndumberi, na akihituka kĩgeranio gĩake gĩa K.C.P.E mwaka wa 2019. Mwaka wa 2020, nĩanyita gĩthomo gĩake kĩa sekondari Njurii High School, Chuka. Kũu nĩatuĩkire Commando wa Scouts na mũmemba wa Red Cross. Mwaka wa 2023, nĩakihitukire K.C.S.E. Thutha ũcio nĩathomire Mt Kenya University nginya kũhuruka gwake."
      },
      faith: {
        title: "Mũndũ wa Wĩtĩkio",
        text: "Vinny nĩarĩire mũciĩ ũrĩa wendete Ngai. Nĩabatithirio P.C.E.A. Ayub Kinyua, Eldoret nĩ Mũtũngatiri Geoffrey Mwihanda mweri wa 23/9/2007. Thutha ũcio nĩathithire P.C.E.A. Gituamba, Ting'ang'a, na akiigĩrĩrio moko nĩ Mũtũngatiri Titus Kibaara mwaka wa 2018."
      },
      passing: {
        title: "Gwĩtagwo Ũrĩa Mũnene",
        text: "Jumamũri, 25/4/2026, rĩrĩa Vinny aarĩ na njĩra agĩthiĩ kũrĩ arata ake, nĩanyitĩkire. Maumaga nĩmakĩmuigĩra thibitari ya St. Claire, Ting'ang'a (Kwa Dennis), na kuuma kũu nĩmamũtwarire Kiambu Level 5. No rĩrĩa moogire, nĩ Ahurukire. Arahurukire aarĩ na miaka 21. Nĩ Mwathani wamũheane, nĩwe wamũtwarire. Rĩtwa rĩake rĩrogoocwo. Ameni."
      }
    },
    quote: "Aarĩ hano. Aarĩ wa ma. Aarĩendetwo mũno mũna mũno.",
    scripture: "Kĩrĩa gĩothe kĩrĩ mwanya, na kũrĩ mabũrũri ma kĩrĩa gĩothe o rĩrĩa rĩagĩtwo rĩrĩ.",
    download: "Rutithia Eulogy Ĩrĩa Yothe (PDF)"
  },
  swahili: {
    title: "Vinny Alikuwa Nani?",
    subtitle: "Maisha Yaliyogusa Mioyo Mingi",
    sections: {
      birth: {
        title: "Zawadi Inawasili",
        text: "Mwaka wa 2005, kulikuwa na sherehe nyumbani kwa Grace Wairimu Wanjiru wakati Mungu alipombariki na mtoto wake wa kwanza wa kiume, Vincent Mwaura. Zawadi hii ilisherehekewa sana katika Kijiji cha Pioneer, Eldoret. Alikuwa kaka wa Nathan Nyamu."
      },
      childhood: {
        title: "Kijana Aliyependa Kusaidia",
        text: "Vinny alikuwa msaidizi wa nyanya yake katika kazi za nyumbani. Alikuwa mtoto mchapakazi, mnyoofu, na mtiifu. Alisaidia bila kuulizwa — alifagia, alisafisha, alitembea pamoja na familia yake kwa nguvu tulivu iliyozidi umri wake."
      },
      education: {
        title: "Msomi na Kiongozi",
        text: "Vinny alijiunga na Shule ya Msingi ya St Joseph The Worker, Ting'ang'a mwaka 2010. Baadaye alihamishiwa Karia-ini Academy, Ndumberi, akimaliza mtihani wake wa KCPE mwaka 2019 kwa alama bora. Mwaka 2020, akiandamana na shangazi yake Lucy Wandai na nyanya yake, alijiunga na Shule ya Upili ya Njurii, Chuka. Huko alikuwa Kamanda wa Skauti na mwanachama hai wa Msalaba Mwekundu. Mwaka 2023, alifaulu mtihani wake wa KCSE. Baadaye alijiunga na Chuo Kikuu cha Mt Kenya hadi kifo chake."
      },
      faith: {
        title: "Mtu wa Imani",
        text: "Akiwa amelelewa katika familia inayompenda Mungu, Vinny alibatizwa katika P.C.E.A. Ayub Kinyua, Eldoret na Mchungaji Geoffrey Mwihanda tarehe 23/9/2007. Baadaye alihamia Kanisa la P.C.E.A. Gituamba, Ting'ang'a, ambapo alithibitishwa mwaka 2018 na Mchungaji Titus Kibaara."
      },
      passing: {
        title: "Kuitwa Nyumbani",
        text: "Jumamosi, Aprili 25, 2026, alipokuwa njiani kuwatembelea marafiki zake, Vinny aliugua. Alipelekwa katika Zahanati ya St. Claire, Ting'ang'a (Kwa Dennis), na kutoka hapo akapelekwa Hospitali ya Kiambu Level 5. Lakini alipofika, alikuwa tayari ameaga dunia. Alifariki akiwa na umri wa miaka 21. Bwana alimpa Vinny, na Bwana amemchukua. Jina lake lihimidiwe. Amina."
      }
    },
    quote: "Alikuwa hapa. Alikuwa halisi. Alipendwa sana.",
    scripture: "Kila kitu kina wakati wake, na kila jambo chini ya mbingu lina muda wake.",
    download: "Pakua Eulogy Kamili (PDF)"
  }
};

type Language = 'en' | 'kikuyu' | 'swahili';

export default function Biography() {
  const ref = useRef(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const currentContent = content[language];

  // Vintage photo array with proper dimensions
  const vintagePhotos = [
    { src: '/src/imports/WhatsApp Image 2026-05-02 at 18.01.14 (1).jpeg', caption: 'Vinny na mũrũ wa nyina (Vinny with his brother)', orientation: 'portrait' },
    { src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.13_(1).jpeg', caption: 'Vinny -With his beloved uncle ', orientation: 'portrait' },
    { src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.15_(1).jpeg', caption: 'The Radiant Smile', orientation: 'square' },
    { src: '/src/imports/WhatsApp_Image_2026-05-02_at_18.01.11.jpeg', caption: 'Family gathered in love', orientation: 'landscape' },
    { src: '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.30.jpeg', caption: 'Church family - P.C.E.A. Gituamba', orientation: 'square' },
    { src: '/src/imports/WhatsApp_Image_2026-05-03_at_21.34.31_(1).jpeg', caption: 'A moment of joy', orientation: 'landscape' },
  ];

  return (
    <section 
      id="about" 
      ref={ref} 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFFDF9 0%, #FDF6EC 50%, #F9EFE0 100%)'
      }}
    >
      {/* Vintage paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-200/15 rounded-full blur-2xl" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-amber-300/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Language Switcher */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-end mb-8 relative"
        >
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full shadow-sm hover:shadow-md transition"
          >
            <Globe className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-gray-600">
              {language === 'en' ? 'English' : language === 'kikuyu' ? 'Gĩkũyũ' : 'Kiswahili'}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          
          {showLangMenu && (
            <div className="absolute top-12 right-0 bg-white border border-amber-100 rounded-lg shadow-lg z-20 overflow-hidden">
              {[
                { code: 'en', name: 'English' },
                { code: 'kikuyu', name: 'Gĩkũyũ' },
                { code: 'swahili', name: 'Kiswahili' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as Language);
                    setShowLangMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition ${
                    language === lang.code ? 'text-amber-700 bg-amber-50' : 'text-gray-600'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
            <span className="text-rose-400 text-sm tracking-wide uppercase">His Story</span>
            <Star className="w-4 h-4 text-amber-400" /> */}
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {currentContent.title}
          </h2>
          <p className="text-amber-600/70 text-sm tracking-wide">{currentContent.subtitle}</p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN - EULOGY TEXT */}
          <motion.div
            style={{ y }}
            className="space-y-8"
          >
            {/* Birth Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-serif text-gray-700">{currentContent.sections.birth.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.sections.birth.text}</p>
            </div>

            {/* Childhood Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-serif text-gray-700">{currentContent.sections.childhood.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.sections.childhood.text}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-serif text-gray-700">{currentContent.sections.education.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.sections.education.text}</p>
            </div>

            {/* Faith Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Church className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-serif text-gray-700">{currentContent.sections.faith.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.sections.faith.text}</p>
            </div>

            {/* Passing Section - Heartbreaking */}
            <div className="bg-rose-50/80 backdrop-blur-sm rounded-xl p-6 border border-rose-200 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Cross className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-xl font-serif text-rose-700">{currentContent.sections.passing.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{currentContent.sections.passing.text}</p>
              <div className="mt-4 pt-4 border-t border-rose-200">
                <Quote className="w-8 h-8 text-rose-300 mx-auto mb-2" />
                <p className="text-rose-600 italic text-center">{currentContent.quote}</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - VINTAGE PHOTO GALLERY */}
          <motion.div
            style={{ opacity }}
            className="space-y-6"
          >
            {/* Main Featured Photo - Vinny with Brother */}
            <motion.div
              initial={{ opacity: 0, rotateY: 10 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group perspective-1000"
            >
              <div className="relative transform-gpu transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/50 via-rose-200/50 to-amber-200/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-amber-100">
                  <div className="relative overflow-hidden">
                    <img
                      src="/src/imports/WhatsApp Image 2026-05-02 at 18.01.14 (1).jpeg"
                      alt="Vinny with his brother"
                      className="w-full h-[400px] object-contain object-center bg-gradient-to-b from-amber-50 to-amber-100"
                    />
                    {/* Vintage vignette effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 border-8 border-white/30 rounded-2xl pointer-events-none" />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-500 text-sm text-center italic font-serif">
                      Vinny na mũrũ wa nyina — A bond that death cannot break
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3D Grid of Vintage Photos */}
            <div className="grid grid-cols-2 gap-4">
              {vintagePhotos.slice(1, 5).map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, rotate: idx % 2 === 0 ? -2 : 2 }}
                  animate={isInView ? { opacity: 1, y: 0, rotate: idx % 2 === 0 ? -2 : 2 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
                  className="group cursor-pointer relative"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 transform-gpu transition-all duration-300">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-gray-400 text-xs text-center truncate">{photo.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vintage Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-amber-900/10 to-amber-800/5 rounded-xl p-6 text-center border border-amber-200/50"
            >
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <p className="text-gray-600 text-base italic leading-relaxed">
                "{currentContent.scripture}"
              </p>
              <p className="text-amber-600 text-xs mt-3">— Ecclesiastes 3:1</p>
            </motion.div>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center pt-4"
            >
              <a
                href="/src/imports/EULOGY_FOR_THE_LATE_VINCENT_WAIRIMU_FINAL.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full text-sm hover:bg-amber-700 transition shadow-md hover:shadow-lg"
              >
                <BookOpen className="w-4 h-4" />
                {currentContent.download}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}