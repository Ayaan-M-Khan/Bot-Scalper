import { 
  Zap, 
  ArrowUp, 
  ShieldCheck, 
  Github,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenQuickstart: () => void;
}

export default function Footer({ onOpenQuickstart }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#02040b] border-t border-slate-900 text-slate-400 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-[#070b19] rounded-[7px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-white tracking-tight">SCALPER</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    MIT Open Source
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Created by Ayaan Khan</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An open-source high-throughput retail task engine, concurrency laboratory, and bot defense research project by Ayaan Khan. Built with asynchronous worker pools, address jigging, and atomic queue simulation.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Worker Engine: Ready (100% Free &amp; Open Source)</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Project Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('task-engine')} className="hover:text-white transition-colors cursor-pointer">
                  Task Engine Studio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">
                  Architecture &amp; Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How Scalper Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('supported-sites')} className="hover:text-white transition-colors cursor-pointer">
                  Supported Sites (70+)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('architecture-lab')} className="hover:text-cyan-300 transition-colors cursor-pointer font-semibold">
                  Concurrency Lab
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('open-source')} className="hover:text-emerald-300 transition-colors cursor-pointer font-semibold">
                  Free Setup &amp; Configs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Retail Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Tested Endpoints
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white transition-colors">Target US REST Engine</li>
              <li className="hover:text-white transition-colors">Pokémon Center (US/UK)</li>
              <li className="hover:text-white transition-colors">Walmart US &amp; Canada W+</li>
              <li className="hover:text-white transition-colors">Best Buy High-Demand Queue</li>
              <li className="hover:text-white transition-colors">Amazon US/UK/JP Carting</li>
              <li className="hover:text-white transition-colors">Shopify Custom Boutiques</li>
              <li className="hover:text-white transition-colors">Topps &amp; Panini America TCG</li>
            </ul>
          </div>

          {/* Col 5: Repository & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Repository &amp; Developer
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://github.com/Ayaan-M-Khan/pokemon-bot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub: Ayaan-M-Khan</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenQuickstart}
                  className="text-emerald-400 hover:underline font-medium text-left cursor-pointer flex items-center gap-1"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Quickstart Setup Guide</span>
                </button>
              </li>
              <li className="text-[11px] text-slate-500 pt-2 font-mono">
                Developer: Ayaan Khan<br />
                License: MIT (Free Forever)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} Scalper. Open-source software research project by Ayaan Khan. Not affiliated with any commercial bot or retailer.
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-mono font-semibold">100% Free &amp; Open Source</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
