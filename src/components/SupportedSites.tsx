import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Globe2, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Sparkles,
  Zap,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { SUPPORTED_SITES, CATEGORIES } from '../data/sitesData';
import { SupportedSite } from '../types';

export default function SupportedSites() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSite, setSelectedSite] = useState<SupportedSite | null>(null);

  // Filter sites based on category and search query
  const filteredSites = useMemo(() => {
    return SUPPORTED_SITES.filter((site) => {
      const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        site.name.toLowerCase().includes(query) ||
        site.region.toLowerCase().includes(query) ||
        site.status.toLowerCase().includes(query) ||
        (site.notes && site.notes.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="supported-sites" className="py-24 relative overflow-hidden bg-[#040713]">
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>70+ Retail &amp; Sneaker Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Supported Sites &amp; <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">Retail Modules</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Scalper provides deep native modules across top retail, trading card, and electronics endpoints with sub-second request handling and concurrent worker pools.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          {/* Search Input Box */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="site-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search retailer, category, or region (e.g., Target, Pokémon, Nike, CA)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-xl transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' 
                ? SUPPORTED_SITES.length 
                : SUPPORTED_SITES.filter(s => s.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === cat ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2 max-w-7xl mx-auto pt-2">
            <div>
              Showing <span className="font-semibold text-white">{filteredSites.length}</span> of {SUPPORTED_SITES.length} sites
              {searchQuery && (
                <span className="ml-1 text-indigo-400 font-medium">matching &quot;{searchQuery}&quot;</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-[11px] hidden sm:flex">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Instant Cart / Operational
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Queue Bypass Active
              </span>
            </div>
          </div>
        </div>

        {/* Sites Grid */}
        {filteredSites.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/80 p-8">
            <Globe2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No matching sites found</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any site matching &quot;{searchQuery}&quot;. Have a custom retail request?
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className="group p-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-850/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60">
                      {site.region}
                    </span>
                    
                    {/* Status Pill */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      site.status === 'Instant Cart' || site.status === 'Operational'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        site.status === 'Instant Cart' || site.status === 'Operational' ? 'bg-emerald-400' : 'bg-cyan-400'
                      }`} />
                      {site.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {site.name}
                  </h3>
                  
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {site.category}
                  </p>
                </div>

                {site.notes && (
                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="truncate pr-1 text-slate-400">{site.notes}</span>
                    <Info className="w-3 h-3 text-indigo-400 shrink-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Selected Site Detail Modal */}
        <AnimatePresence>
          {selectedSite && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#090e24] border border-indigo-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedSite(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedSite.region}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedSite.status}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  {selectedSite.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{selectedSite.category}</p>

                <div className="mt-5 space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Checkout Mode:</span>
                    <span className="text-white font-medium">Native API / REST Protocol</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Anti-Bot Shield:</span>
                    <span className="text-cyan-400 font-medium">Auto-Token Solver Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recommended Proxy:</span>
                    <span className="text-white font-medium">ISP / Static Residential</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Multi-Cart Support:</span>
                    <span className="text-emerald-400 font-medium">Yes (Unlimited Tasks)</span>
                  </div>
                </div>

                {selectedSite.notes && (
                  <div className="mt-4 p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs text-indigo-200">
                    <span className="font-semibold text-white">Module Feature: </span>
                    {selectedSite.notes}
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedSite(null)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
