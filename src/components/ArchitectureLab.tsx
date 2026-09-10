import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Zap, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Sliders, 
  Clock, 
  Lock,
  Layers,
  ArrowRight,
  Activity
} from 'lucide-react';

export default function ArchitectureLab() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [rateLimitRPS, setRateLimitRPS] = useState(45); // requests per min

  const runConcurrencyTest = () => {
    setIsSimulating(true);
    setSimulationDone(false);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationDone(true);
    }, 1200);
  };

  // Sliding window calculations: limit is 30 req/min
  const rateLimitCap = 30;
  const passedRequests = Math.min(rateLimitRPS, rateLimitCap);
  const blockedRequests = Math.max(0, rateLimitRPS - rateLimitCap);

  return (
    <section id="architecture-lab" className="py-24 relative overflow-hidden bg-[#030612] border-t border-slate-900">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Concurrency &amp; Defense Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Testing Scalper vs. <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Retail Defenses</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore the engineering mechanics behind high-throughput retail drops: from atomic in-memory reservation queues to sliding-window rate limiters.
          </p>
        </div>

        {/* Experiment 1: Concurrency Stress Test */}
        <div className="rounded-3xl bg-[#070b1c] border border-indigo-500/30 p-6 sm:p-10 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                EXPERIMENT #1: INVENTORY CONTENTION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Atomic Redis Hold (Lua) vs. Traditional SQL Transactions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                During a high-demand drop (e.g. 100 bot tasks competing for 10 available booster boxes), naive SQL transactions suffer race conditions and over-sell inventory. Scalper tests the efficacy of atomic Redis scripts.
              </p>
            </div>

            <button
              onClick={runConcurrencyTest}
              disabled={isSimulating}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Firing 100 Concurrent Requests...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Simulate 100-Request Drop</span>
                </>
              )}
            </button>
          </div>

          {/* Results Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            
            {/* Left: Traditional SQL */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  Approach A: Traditional Relational DB (SQL)
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px]">
                  SELECT ... UPDATE
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Available Stock:</span>
                  <span className="text-white font-bold">10 Units</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Concurrent Requests:</span>
                  <span className="text-white">100 Tasks</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Items Sold / Reserved:</span>
                  <span className={`font-bold ${simulationDone ? 'text-rose-400' : 'text-slate-300'}`}>
                    {simulationDone ? '22 Units (12 OVERSOLD!)' : 'Awaiting Test...'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Average Request Latency:</span>
                  <span className="text-slate-300">{simulationDone ? '340ms (Lock Contention)' : '—'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Result Status:</span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Race Condition Detected</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Atomic Redis Lua */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Approach B: Atomic In-Memory Hold (Redis Lua)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                  redis.call(&apos;DECRBY&apos;)
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Available Stock:</span>
                  <span className="text-white font-bold">10 Units</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Concurrent Requests:</span>
                  <span className="text-white">100 Tasks</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Items Sold / Reserved:</span>
                  <span className={`font-bold ${simulationDone ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {simulationDone ? 'Exactly 10 Units (0 Oversold)' : 'Awaiting Test...'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Average Request Latency:</span>
                  <span className="text-emerald-400 font-bold">{simulationDone ? '1.8ms' : '—'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Result Status:</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Inventory Accuracy</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Experiment 2: Sliding-Window Rate Limiter */}
        <div className="rounded-3xl bg-[#070b1c] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="mb-6">
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
              EXPERIMENT #2: ROLLING WINDOW DEFENSE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Sliding-Window Rate Limiting Analyzer
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Adjust request velocity to observe how a sliding 60-second Redis Sorted Set (ZSET) throttles aggressive scrapers while allowing human traffic to proceed without false positives.
            </p>
          </div>

          <div className="max-w-md mb-8">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Simulated Request Velocity:</span>
              <span className="text-cyan-400 font-bold">{rateLimitRPS} requests / minute</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={rateLimitRPS}
              onChange={(e) => setRateLimitRPS(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>10 req/min (Human)</span>
              <span>30 req/min (WAF Threshold)</span>
              <span>90 req/min (High-Frequency Bot)</span>
            </div>
          </div>

          {/* Metric Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">HTTP 200 OK (Allowed)</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">
                {passedRequests} reqs
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Under 30 req/min threshold</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">HTTP 429 (Rate Limited)</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">
                {blockedRequests} reqs
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Throttled by sliding ZSET</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">WAF Action</span>
              <div className={`text-sm font-bold mt-2 ${blockedRequests > 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                {blockedRequests > 0 ? 'Temporary IP Cooldown Triggered' : 'Normal Clean Traffic Passing'}
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Window TTL: 60s sliding</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
