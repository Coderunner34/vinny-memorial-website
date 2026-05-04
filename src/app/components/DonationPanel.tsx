import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Copy, Check, Phone, Smartphone, Banknote, Users, Gift, Shield, ExternalLink } from 'lucide-react';

export default function DonationPanel() {
  const [copiedTill, setCopiedTill] = useState(false);
  const [copiedPhone1, setCopiedPhone1] = useState(false);
  const [copiedPhone2, setCopiedPhone2] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'till' | 'paybill' | 'send'>('till');

  // M-Pesa details
  const tillNumber = '5389604';
  const phoneNumber1 = '0722757996';
  const phoneNumber2 = '0712345678';
  const paybillNumber = '4567890';
  const accountNumber = 'VINCENT2026';

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'till') {
      setCopiedTill(true);
      setTimeout(() => setCopiedTill(false), 2000);
    } else if (type === 'phone1') {
      setCopiedPhone1(true);
      setTimeout(() => setCopiedPhone1(false), 2000);
    } else if (type === 'phone2') {
      setCopiedPhone2(true);
      setTimeout(() => setCopiedPhone2(false), 2000);
    }
  };

  const handleMPesaDonate = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount && amount >= 10) {
      // Open M-Pesa STK push simulation
      window.location.href = `tel:*483#`;
    }
  };

  return (
    <section
      id="donate"
      className="relative py-16 px-4 md:py-24 md:px-6 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-12 h-px bg-amber-700/50 mx-auto mb-6" />
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-800/20 border border-amber-600/30 flex items-center justify-center">
            <Heart className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-amber-100 tracking-wide mb-3">
            Support & Donations
          </h2>
          <div className="w-16 h-px bg-amber-700/50 mx-auto mt-6" />
          <p className="text-amber-200/40 mt-6 max-w-md mx-auto text-sm tracking-wide">
            Your generosity helps honor Vinny's legacy and supports his family
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-8"
        >
          {[
            { id: 'till', label: 'Till Number', icon: Smartphone, free: true },
            { id: 'send', label: 'Send Money', icon: Phone, free: true },
            { id: 'paybill', label: 'Paybill', icon: Banknote, free: false },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-amber-800/30 border border-amber-600/50 text-amber-200'
                  : 'bg-gray-800/30 border border-gray-700 text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.free && (
                <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded-sm ml-1">
                  FREE
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Main Donation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-sm overflow-hidden"
        >
          {/* TILL NUMBER SECTION */}
          {activeTab === 'till' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <div className="w-10 h-10 rounded-full bg-green-800/30 border border-green-600/40 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-amber-100">Till Number (Buy Goods)</h3>
                  <p className="text-green-400/60 text-xs mt-1">✓ No transaction fees</p>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-2">Till Number</p>
                <div className="inline-flex items-center gap-3 bg-gray-800/80 px-6 py-3 rounded-sm">
                  <code className="text-2xl md:text-3xl font-mono text-amber-200 tracking-wider">{tillNumber}</code>
                  <button
                    onClick={() => handleCopy(tillNumber, 'till')}
                    className="p-2 hover:bg-gray-700 rounded transition-colors"
                  >
                    {copiedTill ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700 rounded-sm p-4 text-center">
                <p className="text-gray-400 text-sm">
                  How to donate:
                </p>
                <ol className="text-gray-500 text-xs mt-2 space-y-1 text-left max-w-xs mx-auto">
                  <li>1. Open M-Pesa &gt; Lipa na M-Pesa</li>
                  <li>2. Select "Buy Goods and Services"</li>
                  <li>3. Enter Till Number <span className="text-amber-400">{tillNumber}</span></li>
                  <li>4. Enter Amount</li>
                  <li>5. Enter your M-Pesa PIN</li>
                </ol>
              </div>
            </div>
          )}

          {/* SEND MONEY SECTION */}
          {activeTab === 'send' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <div className="w-10 h-10 rounded-full bg-blue-800/30 border border-blue-600/40 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-amber-100">Send Money Directly</h3>
                  <p className="text-green-400/60 text-xs mt-1">✓ No transaction fees</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">Primary Contact</p>
                  <div className="inline-flex items-center gap-3 bg-gray-800/80 px-6 py-3 rounded-sm">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <code className="text-xl md:text-2xl font-mono text-amber-200">{phoneNumber1}</code>
                    <button
                      onClick={() => handleCopy(phoneNumber1, 'phone1')}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedPhone1 ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">Secondary Contact</p>
                  <div className="inline-flex items-center gap-3 bg-gray-800/80 px-6 py-3 rounded-sm">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <code className="text-xl md:text-2xl font-mono text-amber-200">{phoneNumber2}</code>
                    <button
                      onClick={() => handleCopy(phoneNumber2, 'phone2')}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedPhone2 ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800/30 border border-gray-700 rounded-sm p-4 text-center mt-4">
                  <p className="text-gray-400 text-sm">
                    Open M-Pesa &gt; Send Money &gt; Enter Phone Number &gt; Enter Amount
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PAYBILL SECTION */}
          {activeTab === 'paybill' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <div className="w-10 h-10 rounded-full bg-orange-800/30 border border-orange-600/40 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-amber-100">Paybill (Business)</h3>
                  <p className="text-orange-400/60 text-xs mt-1">Standard M-Pesa rates apply</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">Paybill Number</p>
                  <div className="inline-flex items-center gap-3 bg-gray-800/80 px-6 py-3 rounded-sm">
                    <code className="text-xl md:text-2xl font-mono text-amber-200">{paybillNumber}</code>
                    <button
                      onClick={() => handleCopy(paybillNumber, 'till')}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">Account Number</p>
                  <div className="inline-flex items-center gap-3 bg-gray-800/80 px-6 py-3 rounded-sm">
                    <code className="text-lg font-mono text-amber-200">{accountNumber}</code>
                    <button
                      onClick={() => handleCopy(accountNumber, 'till')}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700 rounded-sm p-4 text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Open M-Pesa &gt; Lipa na M-Pesa &gt; Paybill &gt; Enter {paybillNumber} &gt; Account {accountNumber}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Donation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-sm overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Gift className="w-4 h-4 text-amber-500" />
              <h3 className="text-lg font-serif text-amber-100">Suggested Donation Amounts</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {quickAmounts.map(amount => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`px-5 py-2 transition-all duration-300 ${
                    selectedAmount === amount
                      ? 'bg-amber-800/50 border border-amber-600 text-amber-200'
                      : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  KES {amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Custom amount (KES)"
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-600/50 transition-colors"
              />
              <button
                onClick={() => {
                  const amount = selectedAmount || parseInt(customAmount);
                  if (amount && amount >= 10) {
                    if (activeTab === 'till') {
                      window.location.href = `tel:*483#`;
                    } else if (activeTab === 'send') {
                      window.location.href = `tel:${phoneNumber1}`;
                    } else {
                      window.location.href = `tel:*483#`;
                    }
                  }
                }}
                disabled={!selectedAmount && !customAmount}
                className="px-6 py-2 bg-amber-800/40 hover:bg-amber-800/60 disabled:opacity-50 disabled:cursor-not-allowed border border-amber-600/40 text-amber-200 transition-all duration-300 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Donate
              </button>
            </div>

            <p className="text-gray-600 text-xs text-center mt-6">
              All donations go directly to the family. Thank you for your generosity.
            </p>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="w-12 h-px bg-gray-800 mx-auto mb-4" />
          <p className="text-gray-600 text-xs max-w-md mx-auto">
            For any issues or questions regarding donations, please contact the family directly.
            <br />
            Your support means the world to us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}