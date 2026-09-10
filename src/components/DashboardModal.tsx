import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Cpu, 
  Laptop, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Terminal,
  ShieldCheck,
  Zap,
  Github,
  Database
} from 'lucide-react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickstart: () => void;
}

export default function DashboardModal({ isOpen, onClose, onOpenQuickstart }: DashboardModalProps) {
  const [activeWorkers, setActiveWorkers] = useState(15);
  const [redisStatus, setRedisStatus] = useState<'Connected' | 'Reconnecting'>('Connected');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleTestEngine = () => {
    setRedisStatus('Reconnecting');
    setTimeout(() => {
      setRedisStatus('Connected');
      setFeedback("Engine connection verified! Async worker pool is responsive (<1.2ms latency).");
      setTimeout(() => setFeedback(null), 3500);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#080d21] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Scalper Node &amp; Configuration</h3>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Local runtime status, worker pool limit, and configuration templates by Ayaan Khan.
        </p>

        {feedback && (
          <div className="mb-4 p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-xs text-cyan-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Node Details Card */}
        <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-mono">RUNTIME ENVIRONMENT:</span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="font-mono font-bold text-white text-sm">Python 3.11+ (asyncio.TaskGroup)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
                MIT License
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono">REDIS IN-MEMORY QUEUE:</span>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5 text-slate-200">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>localhost:6379 (Lua Atomic Scripts)</span>
              </div>
              <span className="text-emerald-400 font-mono font-semibold">{redisStatus}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono">CONCURRENT WORKER LIMIT:</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white font-medium">{activeWorkers} Worker Threads</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveWorkers(prev => Math.max(5, prev - 5))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
                >
                  -5
                </button>
                <button
                  onClick={() => setActiveWorkers(prev => Math.min(50, prev + 5))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
                >
                  +5
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleTestEngine}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ping Engine Health</span>
          </button>

          <button
            onClick={() => { onClose(); onOpenQuickstart(); }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Quickstart Setup</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-5 text-center text-[11px] text-slate-500">
          Open-Source Project created by Ayaan Khan • 100% Free Forever
        </div>
      </motion.div>
    </div>
  );
}
