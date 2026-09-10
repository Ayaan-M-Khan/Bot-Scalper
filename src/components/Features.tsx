import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Command, 
  Search, 
  Radio, 
  Zap, 
  Cpu, 
  Globe2, 
  BarChart3, 
  Sliders, 
  ArrowUpRight, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  Flame,
  ArrowRight,
  Shuffle
} from 'lucide-react';

interface FeaturesProps {
  onOpenCommandPalette: () => void;
  onExploreSites: () => void;
}

export default function Features({ onOpenCommandPalette, onExploreSites }: FeaturesProps) {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Performance Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Inside the <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">Scalper Engine</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Built by Ayaan Khan to explore low-latency task orchestration, isolated proxy binding, automatic address jigging, and atomic inventory reservation.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Command Palette (lg:col-span-7) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Command className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  Headless &amp; GUI Navigation
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Unified Shortcuts &amp; Command Palette (<kbd className="font-mono text-cyan-300">Cmd + K</kbd>)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Run commands with zero friction. Instantly batch-spawn tasks, rotate proxy pools, test response latencies, or inspect 70+ supported retailers in milliseconds.
              </p>
            </div>

            {/* Interactive Mini Command Bar Preview */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div 
                onClick={onOpenCommandPalette}
                className="cursor-pointer p-3.5 rounded-xl bg-[#090e21] border border-slate-700/80 hover:border-cyan-500/60 shadow-inner transition-all flex items-center justify-between group/cmd"
              >
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <Search className="w-4 h-4 text-cyan-400 group-hover/cmd:text-white transition-colors" />
                  <span className="group-hover/cmd:text-slate-200">
                    Type a command... (e.g. <span className="text-cyan-300 font-mono">Spawn 15x Pokémon Center Tasks</span>)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/50">
                  <span>Press</span>
                  <span className="font-bold">⌘K</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">⌘ + N: New Task</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">⌘ + S: Start All</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">⌘ + J: Jig Address</span>
              </div>
            </div>
          </div>

          {/* Card 2: Real-Time Restock Feeds (lg:col-span-5) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Telemetry Radar
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Sub-Second Restock Polling
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct WebSocket feeds and lightweight headless monitoring. Restocks are detected and passed to worker pools with minimal network overhead.
              </p>
            </div>

            {/* Restock Feed Live Stream Simulation */}
            <div className="mt-6 rounded-xl bg-[#070b18] border border-slate-800 p-3 text-xs space-y-2 font-mono">
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800/80 text-slate-400">
                <span>MONITOR ENDPOINT</span>
                <span>LATENCY</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">Target US Direct</span>
                </div>
                <span className="text-emerald-400 font-bold">18ms ping</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">Pokémon Center SKU</span>
                </div>
                <span className="text-emerald-400 font-bold">24ms ping</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-white">Best Buy API Feed</span>
                </div>
                <span className="text-cyan-300 font-bold">31ms ping</span>
              </div>
            </div>
          </div>

          {/* Card 3: Address Jigging & Anti-Detection (lg:col-span-4) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Shuffle className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Automated Address Jigging
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Bypass merchant &apos;one per household&apos; cancellations through automatic syntactic permutations, apartment abbreviations, and phonetic variations.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-medium">Syntactic Line 1 / Line 2 Jigs</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-medium">Automated Pre-Solved Token Queue</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-300 font-medium">Rotating Residential &amp; Static ISP Binding</span>
              </div>
            </div>
          </div>

          {/* Card 4: Multi-Site Engine (lg:col-span-4) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                70+ Native Site Modules
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Custom low-level modules tailored specifically for individual retailer cart and checkout payload requirements.
              </p>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Pokémon Center</span>
                  <span className="text-emerald-400">✓</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Target US</span>
                  <span className="text-emerald-400">✓</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Walmart US</span>
                  <span className="text-cyan-400">✓</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Best Buy</span>
                  <span className="text-cyan-400">✓</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Shopify Custom</span>
                  <span className="text-indigo-400">✓</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Amazon US</span>
                  <span className="text-indigo-400">✓</span>
                </div>
              </div>

              <button
                onClick={onExploreSites}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <span>Browse all 70+ supported site configs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Performance Analytics (lg:col-span-4) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Sub-Second Benchmarks
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Benchmark execution speeds across HTTP proxy routes, evaluate TLS handshake overhead, and optimize task concurrency limits.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-[#080d1e] border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-slate-400 font-mono">AVG DISPATCH LATENCY</span>
                <span className="text-xs font-mono font-bold text-emerald-400">340ms (Sub-second)</span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Target API Direct</span>
                  <span className="text-white font-mono">290ms</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }} />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Shopify Fast Cart</span>
                  <span className="text-white font-mono">310ms</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '82%' }} />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Pokémon Center Restock</span>
                  <span className="text-white font-mono">380ms</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full" style={{ width: '74%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
