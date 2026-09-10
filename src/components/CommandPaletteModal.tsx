import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Terminal, 
  Zap, 
  Globe2, 
  HelpCircle, 
  Layers, 
  ArrowRight,
  Shield,
  Cpu,
  Radio,
  Sliders,
  Github,
  Shuffle,
  BarChart3
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

export default function CommandPaletteModal({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    { id: 'task-engine', title: 'Open Task Engine Interactive Simulator', category: 'Engine', icon: Cpu, shortcut: '⌘ E' },
    { id: 'monitors-view', title: 'Open Live Retailer Health Monitors & Product Watcher', category: 'Monitoring', icon: Radio, shortcut: 'G M' },
    { id: 'view-sites', title: 'Browse 70+ Supported Retail Modules', category: 'Navigation', icon: Globe2, shortcut: 'G S' },
    { id: 'architecture-lab', title: 'Launch Concurrency & Bot Defense Lab', category: 'Research', icon: BarChart3, shortcut: 'G L' },
    { id: 'open-source', title: 'View Free Setup & JSON Configuration Templates', category: 'Setup', icon: Terminal, shortcut: 'G O' },
    { id: 'quickstart', title: 'Open CLI Quickstart Guide', category: 'Setup', icon: Terminal, shortcut: '↵' },
    { id: 'how-it-works', title: 'View 3-Step Automation Architecture', category: 'Guides', icon: Sliders, shortcut: 'G W' },
    { id: 'open-faq', title: 'Frequently Asked Questions & Proxy Setup', category: 'Support', icon: HelpCircle, shortcut: 'G Q' },
    { id: 'pokemon-center', title: 'Inspect Pokémon Center US REST Module', category: 'Retail Module', icon: Zap, shortcut: 'M P' },
    { id: 'target-engine', title: 'Inspect Target US Direct Engine', category: 'Retail Module', icon: Zap, shortcut: 'M T' },
    { id: 'best-buy-engine', title: 'Inspect Best Buy High-Demand Queue Solver', category: 'Retail Module', icon: Zap, shortcut: 'M B' },
    { id: 'github-repo', title: 'Open GitHub Repository (Ayaan-M-Khan / pokemon-bot)', category: 'Community', icon: Github, shortcut: 'G H' }
  ];

  const filteredActions = actions.filter(action =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter' && filteredActions[selectedIndex]) {
        e.preventDefault();
        handleExecute(filteredActions[selectedIndex].id);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  const handleExecute = (actionId: string) => {
    onSelectAction(actionId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        className="w-full max-w-2xl bg-[#090d22] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden shadow-cyan-950/50"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command or jump to section (e.g. Concurrency Lab, Quickstart)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((action, index) => {
              const Icon = action.icon;
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={action.id}
                  onClick={() => handleExecute(action.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-white border border-cyan-500/30' 
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/30 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold block">{action.title}</span>
                      <span className="text-[10px] text-slate-400">{action.category}</span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {action.shortcut}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#050817] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span className="text-cyan-400">Scalper by Ayaan Khan • Free &amp; Open Source</span>
        </div>
      </motion.div>
    </div>
  );
}
