import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Settings2, 
  Trophy, 
  Shuffle, 
  Check, 
  Send, 
  ShieldCheck, 
  Cpu, 
  Bell, 
  Copy, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [jigBaseAddress, setJigBaseAddress] = useState('742 Evergreen Terrace');
  const [jigResults, setJigResults] = useState<string[]>([
    '742 Evergreen Terrace Apt 4B',
    '742 Evergreen Terr Ste 102',
    '742 Evergreen Terrace Unit 3',
    '742 Evergreen Tr Fl 2'
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNewJigs = () => {
    const prefixes = ['Apt', 'Suite', 'Unit', 'Fl', 'Bldg', 'Rm', 'Lot'];
    const codes = ['A', 'B', 'C', '101', '204', '3B', '4-D', 'PH'];
    const newJigs = [
      `${jigBaseAddress} ${prefixes[Math.floor(Math.random() * prefixes.length)]} ${codes[Math.floor(Math.random() * codes.length)]}`,
      `${jigBaseAddress.replace('Terrace', 'Tr')} ${prefixes[Math.floor(Math.random() * prefixes.length)]} ${codes[Math.floor(Math.random() * codes.length)]}`,
      `${jigBaseAddress} #${Math.floor(10 + Math.random() * 90)}`,
      `${jigBaseAddress} Unit ${Math.floor(1 + Math.random() * 9)}`
    ];
    setJigResults(newJigs);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#030611]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Streamlined Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How Scalper Works in <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From initial setup to simulated order confirmation, Scalper is engineered by Ayaan Khan to minimize task spin-up overhead and maximize concurrency.
          </p>
        </div>

        {/* Stepper Navigation Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 max-w-2xl mx-auto">
          <button
            id="howitworks-step1-btn"
            onClick={() => setActiveStep(1)}
            className={`w-full sm:w-1/3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              activeStep === 1
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
              activeStep === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              1
            </div>
            <div>
              <div className="text-xs font-bold text-white">1. CREATE</div>
              <div className="text-[11px] text-slate-400">Profiles &amp; Jigging</div>
            </div>
          </button>

          <button
            id="howitworks-step2-btn"
            onClick={() => setActiveStep(2)}
            className={`w-full sm:w-1/3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              activeStep === 2
                ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
              activeStep === 2 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              2
            </div>
            <div>
              <div className="text-xs font-bold text-white">2. AUTOMATE</div>
              <div className="text-[11px] text-slate-400">Proxies &amp; Harvesters</div>
            </div>
          </button>

          <button
            id="howitworks-step3-btn"
            onClick={() => setActiveStep(3)}
            className={`w-full sm:w-1/3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              activeStep === 3
                ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
              activeStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              3
            </div>
            <div>
              <div className="text-xs font-bold text-white">3. DOMINATE</div>
              <div className="text-[11px] text-slate-400">Sub-Second Checkout</div>
            </div>
          </button>
        </div>

        {/* Step Content Container */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Step 01: Profile Engine</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Configure Profiles with Built-in Address Jigging
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Prevent retail cancellation filters (e.g. 1 per household rules) with Stellar&apos;s intelligent address jigging engine. Automatically variations street abbreviations, apartment suffixes, and phone formatting without invalidating postal delivery.
                  </p>
                  
                  <div className="space-y-2 pt-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>One-click bulk profile cloning &amp; virtual card assignment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Supports Slash, Capital One Eno, Privacy.com, and Stripe cards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Encrypted AES-256 local vault storage</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      <span>Proceed to Automate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Interactive Address Jigging Tool */}
                <div className="lg:col-span-6 bg-[#080c1d] rounded-xl border border-slate-700/70 p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
                      <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
                      Live Address Jig Simulator
                    </span>
                    <button
                      onClick={generateNewJigs}
                      className="px-2.5 py-1 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Re-Generate Jigs</span>
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">
                        Base Street Address:
                      </label>
                      <input
                        type="text"
                        value={jigBaseAddress}
                        onChange={(e) => setJigBaseAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div>
                      <span className="block text-[11px] text-slate-400 font-medium mb-1.5">
                        Generated Jig Variations (USPS Validated):
                      </span>
                      <div className="space-y-1.5">
                        {jigResults.map((jig, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between p-2 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200"
                          >
                            <span className="truncate pr-2">{jig}</span>
                            <button
                              onClick={() => copyToClipboard(jig, idx)}
                              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Copy"
                            >
                              {copiedIndex === idx ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Step 02: Infrastructure &amp; Harvesters</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Assign Proxy Pools &amp; Set CAPTCHA Harvesters
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Stellar automatically pairs ISP proxies to fast-firing checkout tasks and rotating residential proxies to inventory monitors. Built-in headless harvesters solve Cloudflare Turnstile, reCAPTCHA v2/v3, and DataDome challenges with zero user intervention.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Automatic proxy latency testing &amp; dead-proxy replacement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>In-app YouTube login integration to harvest pristine 0.9 reCAPTCHA scores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Mass task creation by SKU, URL, or keyword lists</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      <span>Proceed to Dominate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Harvester Matrix Preview */}
                <div className="lg:col-span-6 bg-[#080c1d] rounded-xl border border-slate-700/70 p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      Active CAPTCHA Harvesters (4 Windows)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Tokens Ready: 18
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Window 01</span>
                        <span className="text-emerald-400 font-mono font-bold">0.9 V3</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">Target RedCard</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">Status: Auto-generating tokens</div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Window 02</span>
                        <span className="text-emerald-400 font-mono font-bold">Turnstile</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">Pokémon Center</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">Status: Token cached (45s)</div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Window 03</span>
                        <span className="text-emerald-400 font-mono font-bold">0.9 V3</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">Walmart US</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">Status: Standby queue</div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Window 04</span>
                        <span className="text-cyan-400 font-mono font-bold">hCaptcha</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">Shopify / Kith</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">Status: Solver connected</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Step 03: The Checkout Strike</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Execute Sub-Second Checkouts &amp; Receive Webhooks
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    When inventory drops, Scalper executes tasks in parallel within 300-400ms, testing simulated checkout velocity across configured proxy pools.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Instant push webhooks to Discord and Telegram with order totals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Auto-stop tasks once desired quantity / cart limit is fulfilled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                      <span>Detailed drop summary reports with checkout speed timings</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      <span>Start from Step 01</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Simulated Discord Webhook Notification Card */}
                <div className="lg:col-span-6 bg-[#080c1d] rounded-xl border border-slate-700/70 p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-emerald-400" />
                      Discord Webhook Live Notification
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">Webhook Pushed in 142ms</span>
                  </div>

                  {/* Discord Embed Replica */}
                  <div className="mt-4 rounded-lg bg-[#2b2d31] p-4 border-l-4 border-emerald-500 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] text-white font-bold">
                        S
                      </div>
                      <span className="text-xs font-bold text-white">Scalper Engine Webhook</span>
                      <span className="text-[10px] text-slate-400">BOT Today at 11:30 AM</span>
                    </div>

                    <div className="text-xs font-bold text-emerald-400 mb-1">
                      🎉 Successful Checkout!
                    </div>

                    <div className="text-xs text-white font-medium mb-3">
                      Pokémon Center US — Pokémon TCG: Scarlet &amp; Violet 151 Booster Bundle
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#1e1f22] p-2.5 rounded border border-[#35373c]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">ORDER ID:</span>
                        <span className="text-white font-mono font-semibold">#PK-98214-US</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">CHECKOUT SPEED:</span>
                        <span className="text-emerald-400 font-mono font-semibold">0.38 seconds</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">STORE:</span>
                        <span className="text-white">Pokémon Center US</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">PRICE:</span>
                        <span className="text-white font-mono">$28.94 (Free Shipping)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
