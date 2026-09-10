import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageCircle,
  ExternalLink,
  Github
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';

export default function FAQ() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Open Source', 'Architecture', 'Proxies & Stealth', 'General'];

  const filteredItems = FAQ_ITEMS.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#030612]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Project &amp; Architecture FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
            Everything you need to know about Scalper, open-source setup, architecture, and proxy pools by Ayaan Khan.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredItems.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/50 overflow-hidden transition-all duration-200 hover:border-slate-700"
              >
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      {item.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {item.question}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-800/80 px-6 py-5 bg-[#050817]"
                    >
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#080d21] border border-cyan-500/30 text-center">
          <h4 className="text-base font-bold text-white mb-1">
            Want to contribute or report an issue?
          </h4>
          <p className="text-xs text-slate-300 mb-4 max-w-md mx-auto">
            Scalper is maintained on GitHub. Star the repository, file pull requests, or open architecture discussions.
          </p>
          <a
            href="https://github.com/Ayaan-M-Khan/pokemon-bot"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Visit Ayaan-M-Khan / pokemon-bot</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
