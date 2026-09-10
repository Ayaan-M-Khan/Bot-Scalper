import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Square, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Wifi, 
  Cpu, 
  Layers, 
  Shield, 
  Sparkles, 
  Terminal, 
  RotateCw,
  SlidersHorizontal,
  BellRing,
  ArrowRight,
  ExternalLink,
  Github,
  Shuffle
} from 'lucide-react';
import { BotTask } from '../types';

interface HeroProps {
  onOpenQuickstart: () => void;
  onExploreFeatures: () => void;
}

const INITIAL_TASKS: BotTask[] = [
  {
    id: 'TSK-1092',
    site: 'Pokémon Center US',
    product: 'Scarlet & Violet 151 Booster Bundle (6 Packs)',
    mode: 'Fast Cart',
    profile: 'Ayaan_Jig1_Chase',
    proxy: 'ISP-Ashburn-04',
    status: 'SUCCESS',
    speed: '0.38s',
    price: '$28.94',
    time: 'Just now',
    orderNumber: '#PK-892401'
  },
  {
    id: 'TSK-1093',
    site: 'Target',
    product: 'PlayStation 5 Pro Digital Edition Console',
    mode: 'Account Login',
    profile: 'Ayaan_Jig2_Amex',
    proxy: 'Resi-DC-FastTrack',
    status: 'SUCCESS',
    speed: '0.42s',
    price: '$699.99',
    time: '2s ago',
    orderNumber: '#TGT-45911'
  },
  {
    id: 'TSK-1094',
    site: 'Best Buy US',
    product: 'NVIDIA GeForce RTX 5090 FE 32GB',
    mode: 'Fast Cart',
    profile: 'Ayaan_Jig3_CapOne',
    proxy: 'ISP-Chicago-09',
    status: 'CARTING',
    speed: '0.24s',
    price: '$1,999.00',
    time: 'Active'
  },
  {
    id: 'TSK-1095',
    site: 'Walmart US',
    product: 'One Piece TCG: Wings of the Captain OP-06 Box',
    mode: 'Account Login',
    profile: 'Ayaan_Jig4_Disc',
    proxy: 'Resi-Global-Rot',
    status: 'MONITORING',
    price: '$119.88',
    time: 'Restock Radar'
  }
];

export default function Hero({ onOpenQuickstart, onExploreFeatures }: HeroProps) {
  const [tasks, setTasks] = useState<BotTask[]>(INITIAL_TASKS);
  const [isRunning, setIsRunning] = useState(true);
  const [activeTab, setActiveTab] = useState<'tasks' | 'proxies' | 'logs'>('tasks');
  const [ping, setPing] = useState(18);
  const [isTestingPing, setIsTestingPing] = useState(false);
  const [activeToast, setActiveToast] = useState<{ title: string; desc: string; order: string } | null>({
    title: 'Atomic Reservation Simulated!',
    desc: 'Pokémon Center 151 Booster Bundle — 0.38s response',
    order: '#PK-892401'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(prev => Math.min(32, Math.max(14, prev + (Math.floor(Math.random() * 7) - 3))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setTimeout(() => {
        setActiveToast({
          title: 'Simulated Order Confirmed!',
          desc: 'Target: PlayStation 5 Pro Console — 0.41s response',
          order: `#TGT-${Math.floor(10000 + Math.random() * 90000)}`
        });
        setTimeout(() => setActiveToast(null), 5000);
      }, 1500);
    }
  };

  const handleRunPingTest = () => {
    setIsTestingPing(true);
    setTimeout(() => {
      setPing(Math.floor(12 + Math.random() * 8));
      setIsTestingPing(false);
    }, 800);
  };

  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-cyan-600/15 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline & Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open Source Project by Ayaan Khan</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-300 font-mono">MIT Licensed</span>
          </motion.div>

          {/* High-Impact Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            Scalper: Open Source{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              Retail Task Engine.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            A high-concurrency multi-threaded task runner, address jigging generator, and retail queue laboratory created by Ayaan Khan. Zero paywalls, zero license keys.
          </motion.p>

          {/* Dual Primary Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <button
              id="hero-quickstart-btn"
              onClick={onOpenQuickstart}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 shadow-xl shadow-cyan-500/25 transition-all duration-300 cursor-pointer active:scale-98 flex items-center justify-center gap-2 group"
            >
              <Terminal className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" />
              <span>Get Started (100% Free)</span>
              <span className="text-xs font-mono font-medium text-cyan-100 bg-black/20 px-2 py-0.5 rounded-md">
                v2.4
              </span>
            </button>

            <a
              id="hero-github-btn"
              href="https://github.com/Ayaan-M-Khan/pokemon-bot"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-slate-100 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 shadow-lg shadow-black/40 transition-all duration-300 cursor-pointer active:scale-98 flex items-center justify-center gap-2 group"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>Clone on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </motion.div>

          {/* Social Proof Mini Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Anti-Detection Lab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Threaded asyncio</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Automated Address Jigging</span>
            </div>
          </motion.div>
        </div>

        {/* HERO VISUAL CONTAINER: Interactive Desktop Bot Interface Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-indigo-600/30 to-emerald-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

          {/* Main App Window Shell */}
          <div className="rounded-2xl bg-[#090d22] border border-slate-700/60 shadow-2xl shadow-black/90 overflow-hidden">
            
            {/* Window Top Titlebar */}
            <div className="px-4 py-3 bg-[#060818] border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-tight text-white">
                    SCALPER ENGINE v2.4.0 • AYAAN KHAN LAB
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    MIT Open Source
                  </span>
                </div>
              </div>

              {/* Status Pointers */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div 
                  onClick={handleRunPingTest}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 cursor-pointer transition-colors"
                  title="Click to test ping"
                >
                  <Wifi className={`w-3.5 h-3.5 ${isTestingPing ? 'animate-spin text-cyan-400' : 'text-emerald-400'}`} />
                  <span>{ping}ms</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Worker Pool: 15/20</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                  <span className="text-[11px] font-semibold">{isRunning ? 'RUNNING' : 'PAUSED'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Navigation Bar */}
            <div className="px-4 py-2.5 bg-[#070b1d] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'tasks' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Active Tasks ({tasks.length})</span>
                </button>

                <button 
                  onClick={() => setActiveTab('proxies')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'proxies' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Proxy Groups (4)</span>
                </button>

                <button 
                  onClick={() => setActiveTab('logs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'logs' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Telemetry Logs</span>
                </button>
              </div>

              {/* Bot Control Actions */}
              <div className="flex items-center gap-2">
                <button
                  id="hero-bot-toggle-btn"
                  onClick={handleToggleRunning}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isRunning
                      ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isRunning ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isRunning ? 'Stop Tasks' : 'Start Tasks'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Table Content */}
            <div className="p-4 bg-[#080c20] min-h-[260px]">
              {activeTab === 'tasks' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="text-[11px] font-mono text-slate-400 border-b border-slate-800/80">
                      <tr>
                        <th className="pb-2.5 font-medium">TASK ID</th>
                        <th className="pb-2.5 font-medium">RETAILER &amp; TARGET</th>
                        <th className="pb-2.5 font-medium">MODE</th>
                        <th className="pb-2.5 font-medium">PROFILE / JIG</th>
                        <th className="pb-2.5 font-medium">STATUS</th>
                        <th className="pb-2.5 font-medium text-right">RESPONSE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 font-mono">
                      {tasks.map((task) => (
                        <tr key={task.id} className="group hover:bg-slate-800/30 transition-colors">
                          <td className="py-2.5 text-slate-300 font-semibold">{task.id}</td>
                          <td className="py-2.5">
                            <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {task.site}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate max-w-[200px] font-sans">
                              {task.product}
                            </span>
                          </td>
                          <td className="py-2.5 text-[11px] text-slate-300">{task.mode}</td>
                          <td className="py-2.5 text-cyan-300/80">{task.profile}</td>
                          <td className="py-2.5">
                            {task.status === 'SUCCESS' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3" /> CHECKED OUT
                              </span>
                            )}
                            {task.status === 'CARTING' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">
                                <RotateCw className="w-3 h-3 animate-spin" /> CARTING
                              </span>
                            )}
                            {task.status === 'MONITORING' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                                <Activity className="w-3 h-3 text-indigo-400" /> MONITORING
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-right font-bold text-slate-200">
                            {task.speed ? (
                              <span className="text-emerald-400">{task.speed}</span>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'proxies' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">ISP-Ashburn-FastTrack</div>
                      <div className="text-[11px] text-slate-400">Static Datacenter ISP • 45 Proxies</div>
                    </div>
                    <span className="text-emerald-400 font-bold">14ms avg</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">Residential-East-Pool</div>
                      <div className="text-[11px] text-slate-400">Rotating Residential • 250 Proxies</div>
                    </div>
                    <span className="text-cyan-400 font-bold">42ms avg</span>
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="font-mono text-[11px] text-slate-300 space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-slate-500">[11:42:01.092] INFO [Worker-Pool] Spawning 15 asyncio workers...</div>
                  <div className="text-cyan-400">[11:42:01.380] SUCCESS [Task-1092] Pokémon Center Restock detected via SKU 705-85340</div>
                  <div className="text-emerald-400">[11:42:01.760] SUCCESS [Task-1092] Atomic cart payload dispatched (0.38s response)</div>
                  <div className="text-slate-400">[11:42:02.100] INFO [Jig-Engine] Applied syntax permutation #2 to shipping profile</div>
                </div>
              )}
            </div>

            {/* Simulated Live Toast Notification */}
            {activeToast && (
              <div className="px-4 py-2.5 bg-gradient-to-r from-emerald-950/80 to-slate-900 border-t border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-bold text-emerald-300">{activeToast.title}</span>
                  <span className="text-slate-400 hidden sm:inline">{activeToast.desc}</span>
                </div>
                <span className="font-mono text-cyan-300 font-semibold">{activeToast.order}</span>
              </div>
            )}

          </div>
        </motion.div>

      </div>
    </section>
  );
}
