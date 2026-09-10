import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight, 
  Zap, 
  ArrowUpRight,
  Search,
  Github,
  Terminal,
  Cpu
} from 'lucide-react';

interface NavbarProps {
  onOpenQuickstart: () => void;
  onOpenCommandPalette: () => void;
  onOpenDashboard: () => void;
}

export default function Navbar({ onOpenQuickstart, onOpenCommandPalette, onOpenDashboard }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar with Shimmer */}
      <div className="relative z-50 bg-[#070b19] border-b border-indigo-500/20 text-xs py-2 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <button 
            id="announcement-pill-btn"
            onClick={() => scrollToSection('architecture-lab')}
            className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400">
              <Cpu className="w-3 h-3" />
            </span>
            <span className="font-medium text-slate-200">
              ⚡ Scalper: Open-Source Retail Task Engine &amp; Concurrency Lab by Ayaan Khan
            </span>
            <span className="text-cyan-400 group-hover:text-cyan-300 flex items-center font-semibold">
              Explore Architecture <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Main Sticky Glassmorphism Header */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050713]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3.5' 
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo & Version Badge */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-indigo-700 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#070b19] rounded-[11px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                    SCALPER
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Open Source
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono -mt-0.5">by Ayaan Khan</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
              <button 
                id="nav-task-engine-btn"
                onClick={() => scrollToSection('task-engine')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                Task Engine
              </button>
              <button 
                id="nav-features-btn"
                onClick={() => scrollToSection('features')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                Architecture
              </button>
              <button 
                id="nav-workflow-btn"
                onClick={() => scrollToSection('how-it-works')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button 
                id="nav-sites-btn"
                onClick={() => scrollToSection('supported-sites')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                70+ Sites
              </button>
              <button 
                id="nav-architecture-lab-btn"
                onClick={() => scrollToSection('architecture-lab')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer text-cyan-300 font-semibold"
              >
                Concurrency Lab
              </button>
              <button 
                id="nav-open-source-btn"
                onClick={() => scrollToSection('open-source')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer text-emerald-300 font-semibold"
              >
                Free / MIT
              </button>
              <button 
                id="nav-faq-btn"
                onClick={() => scrollToSection('faq')}
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                FAQ
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Quick Search / Cmd+K Pill */}
              <button
                id="nav-search-shortcut-btn"
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all cursor-pointer"
                title="Open Command Palette"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Quick Find</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono font-semibold">
                  ⌘K
                </kbd>
              </button>

              {/* GitHub Link */}
              <a
                href="https://github.com/Ayaan-M-Khan/pokemon-bot"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all"
              >
                <Github className="w-4 h-4" />
                <span className="hidden md:inline">GitHub</span>
              </a>

              {/* Primary Free Quickstart CTA */}
              <button
                id="nav-quickstart-btn"
                onClick={onOpenQuickstart}
                className="relative group overflow-hidden px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/25 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Get Started (Free)</span>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                id="mobile-search-btn"
                onClick={onOpenCommandPalette}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden border-b border-slate-800 bg-[#070b1a]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3"
            >
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => scrollToSection('task-engine')}
                  className="px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/70 rounded-lg"
                >
                  Task Engine
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/70 rounded-lg"
                >
                  Architecture
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/70 rounded-lg"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('supported-sites')}
                  className="px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/70 rounded-lg"
                >
                  70+ Sites
                </button>
                <button
                  onClick={() => scrollToSection('architecture-lab')}
                  className="px-3 py-2 text-left text-sm font-medium text-cyan-300 hover:bg-slate-800/70 rounded-lg"
                >
                  Concurrency Lab
                </button>
                <button
                  onClick={() => scrollToSection('open-source')}
                  className="px-3 py-2 text-left text-sm font-medium text-emerald-300 hover:bg-slate-800/70 rounded-lg"
                >
                  Free / MIT
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/70 rounded-lg"
                >
                  FAQ
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <a
                  href="https://github.com/Ayaan-M-Khan/pokemon-bot"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm font-medium text-slate-200"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenQuickstart(); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/30"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Get Started (Free)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
