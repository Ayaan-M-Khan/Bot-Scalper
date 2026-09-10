import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Github, 
  CheckCircle2, 
  Cpu, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface QuickstartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickstartModal({ isOpen, onClose }: QuickstartModalProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const steps = [
    {
      title: '1. Clone Repository from GitHub',
      cmd: 'git clone https://github.com/Ayaan-M-Khan/pokemon-bot.git\ncd pokemon-bot'
    },
    {
      title: '2. Install Python Dependencies & Playwright',
      cmd: 'pip install -r requirements.txt\nplaywright install chromium'
    },
    {
      title: '3. Configure Environment (.env)',
      cmd: 'cp .env.example .env\n# Edit PROXY_LIST, USER_PROFILES, and REDIS_URL'
    },
    {
      title: '4. Run Concurrent Task Engine',
      cmd: 'python -m bot.tasks.engine --workers=10'
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(index);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-2xl bg-[#080d21] border border-indigo-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Scalper Engine Quickstart</h3>
            <p className="text-xs text-slate-400">Open-source retail automation &amp; concurrency lab by Ayaan Khan</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {steps.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{step.title}</span>
                </span>
                <button
                  onClick={() => handleCopy(step.cmd, idx)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                >
                  {copiedStep === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedStep === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-cyan-300 text-[11px] whitespace-pre-wrap overflow-x-auto">
                {step.cmd}
              </pre>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <a
            href="https://github.com/Ayaan-M-Khan/pokemon-bot"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>GitHub: Ayaan-M-Khan / pokemon-bot</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
}
