import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Square, 
  Plus, 
  RotateCw, 
  Zap, 
  Shield, 
  Terminal, 
  Cpu, 
  Shuffle, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { BotTask } from '../types';

const SAMPLE_TASKS: BotTask[] = [
  {
    id: 'TSK-01',
    site: 'Pokémon Center US',
    product: 'Scarlet & Violet 151 Booster Bundle',
    mode: 'Fast Cart',
    profile: 'Profile_Ayaan_Jig1',
    proxy: 'Static-ISP-Ashburn-01',
    status: 'MONITORING',
    price: '$28.94',
    time: 'Polling (800ms)'
  },
  {
    id: 'TSK-02',
    site: 'Target',
    product: 'PlayStation 5 Pro Digital Edition',
    mode: 'Account Login',
    profile: 'Profile_Ayaan_Jig2',
    proxy: 'Residential-Pool-East',
    status: 'IN_QUEUE',
    price: '$699.99',
    time: 'Waitroom Pos #41'
  },
  {
    id: 'TSK-03',
    site: 'Best Buy',
    product: 'NVIDIA RTX 5090 FE 32GB',
    mode: 'Fast Cart',
    profile: 'Profile_Ayaan_Jig3',
    proxy: 'Static-ISP-Chicago-04',
    status: 'CARTING',
    price: '$1,999.00',
    time: 'Carting Payload Sent'
  },
  {
    id: 'TSK-04',
    site: 'Pokémon Center US',
    product: 'Prismatic Evolutions Elite Trainer Box',
    mode: 'Guest',
    profile: 'Profile_Ayaan_Jig4',
    proxy: 'Static-ISP-Ashburn-02',
    status: 'SOLVING_CAPTCHA',
    price: '$54.99',
    time: 'Requesting Token Queue'
  },
  {
    id: 'TSK-05',
    site: 'Walmart',
    product: 'One Piece TCG: OP-06 Booster Box',
    mode: 'Account Login',
    profile: 'Profile_Ayaan_Jig1',
    proxy: 'Residential-Pool-West',
    status: 'SUCCESS',
    price: '$119.88',
    speed: '0.41s',
    time: 'Completed',
    orderNumber: '#WMT-984210'
  }
];

export default function TaskEngineSimulator() {
  const [tasks, setTasks] = useState<BotTask[]>(SAMPLE_TASKS);
  const [isRunning, setIsRunning] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'jigging' | 'tokens'>('tasks');
  const [tokenPoolCount, setTokenPoolCount] = useState(12);
  const [addressInput, setAddressInput] = useState('742 Evergreen Terrace, Apt 4B');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Address jigging generator logic
  const generateJigs = (base: string) => {
    const parts = base.split(',');
    const street = (parts[0] || '123 Main St').trim();
    const apt = (parts[1] || 'Apt 2').trim();

    return [
      `${street}, Ste ${apt.replace(/[^0-9]/g, '') || '4B'}`,
      `${street}, Unit ${apt.replace(/[^0-9]/g, '') || '4B'}`,
      `${street.replace('Terrace', 'Ter.').replace('Street', 'St.')}, # ${apt.replace(/[^0-9]/g, '') || '4B'}`,
      `APT ${apt.replace(/[^0-9]/g, '') || '4B'} - ${street}`
    ];
  };

  const jigs = generateJigs(addressInput);

  // Cycle tasks when running
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task.status === 'MONITORING' && Math.random() > 0.6) {
            return { ...task, status: 'IN_QUEUE', time: 'In Queue (Position #12)' };
          }
          if (task.status === 'IN_QUEUE' && Math.random() > 0.5) {
            return { ...task, status: 'CARTING', time: 'Sending Cart Request' };
          }
          if (task.status === 'CARTING' && Math.random() > 0.5) {
            return { ...task, status: 'SOLVING_CAPTCHA', time: 'Fetching Token' };
          }
          if (task.status === 'SOLVING_CAPTCHA' && Math.random() > 0.4) {
            return { ...task, status: 'CHECKING_OUT', time: 'Submitting Order' };
          }
          if (task.status === 'CHECKING_OUT' && Math.random() > 0.5) {
            return { 
              ...task, 
              status: 'SUCCESS', 
              speed: `${(0.25 + Math.random() * 0.35).toFixed(2)}s`,
              time: 'Order Confirmed',
              orderNumber: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`
            };
          }
          if (task.status === 'SUCCESS' && Math.random() > 0.8) {
            return { ...task, status: 'MONITORING', time: 'Stock Monitor' };
          }
          return task;
        });
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartAll = () => {
    setIsRunning(true);
    setTasks(prev => prev.map(t => ({ ...t, status: t.status === 'SUCCESS' ? 'MONITORING' : t.status })));
  };

  const handleStopAll = () => {
    setIsRunning(false);
    setTasks(prev => prev.map(t => ({ ...t, status: 'IDLE', time: 'Paused' })));
  };

  const handleAddQuickTask = () => {
    const newTask: BotTask = {
      id: `TSK-0${tasks.length + 1}`,
      site: Math.random() > 0.5 ? 'Pokémon Center US' : 'Best Buy',
      product: 'Pokémon Scarlet & Violet Booster Pack',
      mode: 'Fast Cart',
      profile: `Profile_Ayaan_Jig${(tasks.length % 4) + 1}`,
      proxy: `Static-ISP-Ashburn-0${(tasks.length % 3) + 1}`,
      status: 'MONITORING',
      price: '$29.99',
      time: 'Starting Task...'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleCopyJig = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const getStatusBadge = (status: BotTask['status']) => {
    switch (status) {
      case 'SUCCESS':
        return <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">SUCCESS</span>;
      case 'CHECKING_OUT':
        return <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold animate-pulse">CHECKING OUT</span>;
      case 'SOLVING_CAPTCHA':
        return <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">SOLVING CAPTCHA</span>;
      case 'CARTING':
        return <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">CARTING</span>;
      case 'IN_QUEUE':
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">IN QUEUE</span>;
      case 'MONITORING':
        return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">MONITORING</span>;
      case 'IDLE':
      default:
        return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold">IDLE</span>;
    }
  };

  return (
    <div className="rounded-2xl bg-[#090d22] border border-indigo-500/30 overflow-hidden shadow-2xl shadow-indigo-950/40">
      
      {/* Studio Header */}
      <div className="px-5 py-4 bg-[#060918] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">Scalper Task Engine &amp; Worker Pool</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                asyncio.TaskGroup
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Multi-threaded concurrent task executor with isolated profiles and proxy binding.
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {isRunning ? (
            <button
              onClick={handleStopAll}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop All</span>
            </button>
          ) : (
            <button
              onClick={handleStartAll}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start All</span>
            </button>
          )}

          <button
            onClick={handleAddQuickTask}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Quick Task</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center px-5 border-b border-slate-800 bg-[#070b1b] text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('tasks')}
          className={`py-3 px-4 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'tasks'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Active Tasks ({tasks.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('jigging')}
          className={`py-3 px-4 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'jigging'
              ? 'border-cyan-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Address Jigging Studio</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tokens')}
          className={`py-3 px-4 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'tokens'
              ? 'border-purple-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-purple-400" />
          <span>CAPTCHA Token Harvester ({tokenPoolCount})</span>
        </button>
      </div>

      {/* Tab 1: Live Tasks Table */}
      {activeSubTab === 'tasks' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050816] text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">TASK ID</th>
                <th className="py-3 px-4">RETAILER &amp; PRODUCT</th>
                <th className="py-3 px-4">PROFILE / JIG</th>
                <th className="py-3 px-4">PROXY GROUP</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">LATENCY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-300">
                    {task.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white truncate max-w-[220px]">
                      {task.product}
                    </div>
                    <div className="text-[11px] text-cyan-400 font-medium">
                      {task.site} • {task.mode}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {task.profile}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {task.proxy}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(task.status)}
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {task.time}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {task.speed ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" />
                        {task.speed}
                      </span>
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

      {/* Tab 2: Address Jigging Generator */}
      {activeSubTab === 'jigging' && (
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-cyan-400" />
              <span>USPS &amp; Retail Filter Address Jigging Generator</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Retailers enforce strictly monitored &quot;one order per household&quot; cancellation rules. Scalper automatically applies syntactic and phonetic permutations so shipments route to the exact same physical home while bypassing merchant duplicate cancellation algorithms.
            </p>
          </div>

          <div className="max-w-xl">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Enter Baseline Physical Address:
            </label>
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-3">
              Generated Address Permutations (Ready for Profile Pool):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jigs.map((jig, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block font-bold">
                      JIG VARIANT #{idx + 1}
                    </span>
                    <span className="font-mono text-slate-200">{jig}</span>
                  </div>
                  <button
                    onClick={() => handleCopyJig(jig, idx)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy Jig"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Token Queue & Harvester */}
      {activeSubTab === 'tokens' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-400" />
                <span>Pre-Solved Token Queue &amp; Harvester Windows</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Tasks consume pre-solved tokens from this shared queue instantly during drops. Harvester instances rotate Google sessions to maintain high-trust scores.
              </p>
            </div>

            <button
              onClick={() => setTokenPoolCount(prev => prev + 3)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Harvest +3 Tokens</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] block font-mono">AVAILABLE RECAPTCHA V2/V3</span>
              <div className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">
                {tokenPoolCount} Tokens
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Valid for 110s before auto-expire</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] block font-mono">CLOUDFLARE TURNSTILE POOL</span>
              <div className="text-2xl font-mono font-extrabold text-cyan-400 mt-1">
                8 Tokens
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">0.12s average retrieval latency</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] block font-mono">HARVESTER CHANNELS</span>
              <div className="text-2xl font-mono font-extrabold text-purple-400 mt-1">
                3 Active
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Google Login session active</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer telemetry */}
      <div className="px-5 py-3 bg-[#060918] border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Worker Pool: Healthy</span>
          </span>
          <span>Concurrent Limit: 20</span>
          <span>Avg Checkout: 0.38s</span>
        </div>
        <span className="text-indigo-400">Scalper Engine by Ayaan Khan</span>
      </div>

    </div>
  );
}
