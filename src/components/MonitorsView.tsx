import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Radio, 
  RefreshCw, 
  Pause, 
  Play, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Terminal, 
  Clock, 
  ExternalLink, 
  Plus, 
  Filter, 
  Trash2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Server, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { StoreMonitor, TrackedProductItem, TelemetryLog } from '../types';
import { 
  INITIAL_STORE_MONITORS, 
  INITIAL_TRACKED_PRODUCTS, 
  INITIAL_TELEMETRY_LOGS 
} from '../data/monitorsData';

export default function MonitorsView() {
  const [monitors, setMonitors] = useState<StoreMonitor[]>(INITIAL_STORE_MONITORS);
  const [products, setProducts] = useState<TrackedProductItem[]>(INITIAL_TRACKED_PRODUCTS);
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_TELEMETRY_LOGS);
  const [logFilter, setLogFilter] = useState<'ALL' | 'RESTOCK' | 'LATENCY' | 'INFO'>('ALL');
  const [isStreaming, setIsStreaming] = useState(true);
  const [copiedLogs, setCopiedLogs] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'STORES' | 'PRODUCTS' | 'TELEMETRY'>('ALL');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  
  // New product form state
  const [newProductName, setNewProductName] = useState('');
  const [newProductStore, setNewProductStore] = useState('Pokémon Center US');
  const [newProductSku, setNewProductSku] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('49.99');

  const logEndRef = useRef<HTMLDivElement>(null);

  // Live periodic ping simulation with latency jitter & active pulse
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setMonitors(prev => prev.map(store => {
        if (!store.active) return store;
        const jitter = Math.floor(Math.random() * 41) - 20;
        const nextLatency = Math.max(32, store.latencyMs + jitter);
        const nextStatus = nextLatency > 500 ? 'ERROR' : nextLatency > 220 ? 'DEGRADED' : 'HEALTHY';
        return {
          ...store,
          latencyMs: nextLatency,
          status: nextStatus,
          lastPing: 'Just now'
        };
      }));

      // Random telemetry event injection
      const randomStore = monitors[Math.floor(Math.random() * monitors.length)];
      if (randomStore && randomStore.active) {
        const events = [
          { level: 'INFO' as const, msg: `Polling payload verified on ${randomStore.name} (200 OK)` },
          { level: 'LATENCY' as const, msg: `Round-trip probe on ${randomStore.endpoint}: ${randomStore.latencyMs}ms` },
          { level: 'INFO' as const, msg: `TLS fingerprint cache hit: 0 handshakes re-negotiated` },
        ];
        const picked = events[Math.floor(Math.random() * events.length)];
        const newLog: TelemetryLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          timestamp: new Date().toLocaleTimeString(),
          level: picked.level,
          store: randomStore.name,
          message: picked.msg,
          latencyMs: randomStore.latencyMs
        };
        setLogs(prev => [newLog, ...prev.slice(0, 49)]);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming, monitors]);

  // Toggle individual store monitoring
  const toggleStore = (id: string) => {
    setMonitors(prev => prev.map(store => {
      if (store.id === id) {
        const nextActive = !store.active;
        const newLog: TelemetryLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'INFO',
          store: store.name,
          message: `Store polling was ${nextActive ? 'RESUMED' : 'PAUSED'} by operator.`
        };
        setLogs(l => [newLog, ...l]);
        return {
          ...store,
          active: nextActive,
          status: nextActive ? 'HEALTHY' : 'PAUSED'
        };
      }
      return store;
    }));
  };

  // Instant single ping trigger
  const pingSingleStore = (id: string) => {
    setMonitors(prev => prev.map(store => {
      if (store.id === id) {
        const fastLatency = Math.floor(Math.random() * 45) + 65;
        const newLog: TelemetryLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'LATENCY',
          store: store.name,
          message: `Manual instant ping dispatched: ${fastLatency}ms roundtrip response.`,
          latencyMs: fastLatency
        };
        setLogs(l => [newLog, ...l]);
        return {
          ...store,
          latencyMs: fastLatency,
          status: 'HEALTHY',
          lastPing: 'Just now'
        };
      }
      return store;
    }));
  };

  // Simulate drop / restock event
  const simulateRestock = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newLog: TelemetryLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'RESTOCK',
          store: p.store,
          message: `🔥 RESTOCK TRIGGERED: SKU ${p.sku} (${p.name})! Dispatching worker routines...`,
          latencyMs: 98
        };
        setLogs(l => [newLog, ...l]);
        return {
          ...p,
          status: 'RESTOCK_DETECTED',
          lastChecked: 'Just now',
          stockCount: (p.stockCount || 0) + 10
        };
      }
      return p;
    }));
  };

  // Add new item to watcher
  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newItem: TrackedProductItem = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      store: newProductStore,
      sku: newProductSku || `SKU-${Math.floor(Math.random() * 90000) + 10000}`,
      price: parseFloat(newProductPrice) || 39.99,
      targetMsrp: parseFloat(newProductPrice) || 39.99,
      status: 'IN_STOCK',
      imageUrl: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&auto=format&fit=crop&q=80',
      lastChecked: 'Just now',
      stockCount: 5,
      category: 'Custom Watch'
    };

    setProducts(prev => [newItem, ...prev]);
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'INFO',
      store: newItem.store,
      message: `Added new product watcher: ${newItem.name} (${newItem.sku})`
    };
    setLogs(l => [newLog, ...l]);
    setShowAddProductModal(false);
    setNewProductName('');
    setNewProductSku('');
  };

  const copyConsoleLogs = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.level}] [${l.store}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  const filteredLogs = logs.filter(l => {
    if (logFilter === 'ALL') return true;
    return l.level === logFilter;
  });

  return (
    <section id="monitors-view" className="py-20 relative overflow-hidden bg-[#020511]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-3">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Real-Time Telemetry &amp; Ping Radar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Retailer Monitors &amp; Product Watcher
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Inspect sub-second health probes across top stores, monitor SKU stock changes, and inspect live WebSocket telemetry logs.
            </p>
          </div>

          {/* Master Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                isStreaming 
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25' 
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Polling Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Polling Paused</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Tracked SKU</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. Live Retailer Health & Ping Monitors Grid */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">Retailer Probing Stations</h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {monitors.filter(m => m.active).length} / {monitors.length} Active
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Thresholds: <span className="text-emerald-400 font-bold">&lt;200ms Fast</span> • <span className="text-amber-400 font-bold">200-500ms Normal</span> • <span className="text-red-400 font-bold">&gt;500ms Slow</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monitors.map((store) => {
              const isFast = store.latencyMs < 200;
              const isMedium = store.latencyMs >= 200 && store.latencyMs <= 500;
              const isSlow = store.latencyMs > 500;

              return (
                <div 
                  key={store.id}
                  className={`glass-card rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
                    !store.active 
                      ? 'border-slate-800 opacity-60' 
                      : isFast 
                        ? 'border-slate-800 hover:border-emerald-500/40' 
                        : isMedium 
                          ? 'border-slate-800 hover:border-amber-500/40' 
                          : 'border-red-500/40 bg-red-950/10'
                  }`}
                >
                  {/* Top Store Info & Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{store.name}</span>
                        {store.active && (
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                              isFast ? 'bg-emerald-400' : isMedium ? 'bg-amber-400' : 'bg-red-400'
                            }`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${
                              isFast ? 'bg-emerald-500' : isMedium ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5 truncate max-w-[190px]">
                        {store.endpoint}
                      </span>
                    </div>

                    {/* Toggle button */}
                    <button
                      onClick={() => toggleStore(store.id)}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                        store.active 
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      }`}
                      title={store.active ? "Pause Monitor" : "Resume Monitor"}
                    >
                      {store.active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Latency Gauge Meter */}
                  <div className="my-3 p-3 rounded-xl bg-[#060a17] border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400 font-mono text-[11px]">PING LATENCY</span>
                      <span className={`font-mono font-bold text-sm ${
                        !store.active 
                          ? 'text-slate-500' 
                          : isFast 
                            ? 'text-emerald-400' 
                            : isMedium 
                              ? 'text-amber-400' 
                              : 'text-red-400'
                      }`}>
                        {store.active ? `${store.latencyMs} ms` : 'PAUSED'}
                      </span>
                    </div>

                    {/* Bar visualization */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${
                          !store.active 
                            ? 'bg-slate-600' 
                            : isFast 
                              ? 'bg-emerald-400' 
                              : isMedium 
                                ? 'bg-amber-400' 
                                : 'bg-red-500'
                        }`}
                        animate={{ width: `${Math.min(100, Math.max(10, (store.latencyMs / 500) * 100))}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Metadata & Quick Action */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="truncate max-w-[150px] font-mono">{store.proxyType}</span>
                    <button
                      onClick={() => pingSingleStore(store.id)}
                      disabled={!store.active}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer disabled:opacity-40 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Ping Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. Tracked Products Watcher Grid */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">Active Product Watchers</h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {products.length} Tracked
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Auto-updating via sub-second headless restock hooks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((item) => {
              const isRestock = item.status === 'RESTOCK_DETECTED';
              const isInStock = item.status === 'IN_STOCK';

              return (
                <div
                  key={item.id}
                  className={`glass-card rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                    isRestock 
                      ? 'border-emerald-500/60 bg-emerald-950/15 shadow-lg shadow-emerald-500/10' 
                      : isInStock 
                        ? 'border-slate-800 hover:border-slate-700' 
                        : 'border-slate-800/70 opacity-80'
                  }`}
                >
                  <div>
                    {/* Header with store & status badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {item.store}
                      </span>

                      {/* Status Badge */}
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isRestock
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                          : isInStock
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {isRestock ? '🔥 Restock Detected' : isInStock ? '✓ In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Product Thumbnail & Details */}
                    <div className="flex gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                          <span>SKU: {item.sku}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Stock info */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">TARGET MSRP</span>
                        <span className="text-white font-bold font-mono text-sm">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">LAST PROBED</span>
                        <span className="text-slate-300 font-mono text-[11px]">
                          {item.lastChecked}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => simulateRestock(item.id)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Simulate Restock</span>
                    </button>

                    <button
                      onClick={() => {
                        const newLog: TelemetryLog = {
                          id: `log-${Date.now()}`,
                          timestamp: new Date().toLocaleTimeString(),
                          level: 'INFO',
                          store: item.store,
                          message: `Manual check completed for ${item.sku}: No status change.`
                        };
                        setLogs(l => [newLog, ...l]);
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                      title="Force Re-check"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. Live Activity & Telemetry Visual Terminal */}
        {/* ------------------------------------------------------------- */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">Streaming Telemetry Console</h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                WebSocket / Restock Hooks
              </span>
            </div>

            {/* Filter Tabs and Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['ALL', 'RESTOCK', 'LATENCY', 'INFO'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                    logFilter === f 
                      ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}

              <button
                onClick={copyConsoleLogs}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy Terminal Logs"
              >
                {copiedLogs ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLogs ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => setLogs([])}
                className="p-1 rounded-md text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer"
                title="Clear Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="rounded-2xl bg-[#030611] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
            {/* Terminal Topbar */}
            <div className="px-4 py-2.5 bg-[#060a19] border-b border-slate-800 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-400 font-bold ml-2">
                  scalper-daemon://telemetry-stream.sock
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                {filteredLogs.length} events logged
              </span>
            </div>

            {/* Terminal Content Stream */}
            <div className="p-4 max-h-72 overflow-y-auto space-y-1.5 divide-y divide-slate-900/50">
              {filteredLogs.length === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  No telemetry logs matching the current filter.
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="pt-1.5 flex items-start gap-2.5">
                    <span className="text-slate-500 text-[10px] shrink-0 pt-0.5">
                      [{log.timestamp}]
                    </span>

                    {/* Level Pill */}
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 border ${
                      log.level === 'RESTOCK'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : log.level === 'LATENCY'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {log.level}
                    </span>

                    <span className="text-slate-400 shrink-0 font-semibold text-[11px]">
                      [{log.store}]:
                    </span>

                    <span className={`leading-relaxed ${
                      log.level === 'RESTOCK' 
                        ? 'text-emerald-300 font-bold' 
                        : log.level === 'LATENCY' 
                          ? 'text-cyan-200' 
                          : 'text-slate-300'
                    }`}>
                      {log.message}
                    </span>
                  </div>
                ))
              )}
              <div ref={logEndRef} />
            </div>

            {/* Bottom Status line */}
            <div className="px-4 py-2 bg-[#060a19] border-t border-slate-800 text-[11px] flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Worker routines listening on 6 store endpoints</span>
              </div>
              <span className="text-slate-500">Press Cmd+K to navigate anywhere</span>
            </div>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* Modal: Add Tracked SKU */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#080d21] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Add Tracked SKU</h3>
                </div>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Store / Retailer</label>
                  <select
                    value={newProductStore}
                    onChange={(e) => setNewProductStore(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>Pokémon Center US</option>
                    <option>Target US Direct</option>
                    <option>Best Buy</option>
                    <option>Walmart US Fast-Cart</option>
                    <option>Amazon US Restock Engine</option>
                    <option>Shopify TCG Boutiques</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 151 Ultra Premium Collection"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">SKU / Item ID</label>
                    <input
                      type="text"
                      placeholder="e.g. PKM-151-UPC"
                      value={newProductSku}
                      onChange={(e) => setNewProductSku(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Target MSRP ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="119.99"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    Add to Watcher
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
