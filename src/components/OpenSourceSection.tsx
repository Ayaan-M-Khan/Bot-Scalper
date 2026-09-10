import { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Github, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  FileCode,
  ExternalLink,
  Code2
} from 'lucide-react';

interface OpenSourceProps {
  onOpenQuickstart: () => void;
}

export default function OpenSourceSection({ onOpenQuickstart }: OpenSourceProps) {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const cloneCommand = 'git clone https://github.com/Ayaan-M-Khan/pokemon-bot.git && cd pokemon-bot && pip install -r requirements.txt';

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleDownloadConfig = (filename: string) => {
    let content = '';
    if (filename === 'tasks.sample.json') {
      content = JSON.stringify([
        {
          "id": "TSK-01",
          "retailer": "pokemon_center_us",
          "sku": "705-85340",
          "mode": "fast_cart",
          "profile": "Ayaan_Main_Jig1",
          "proxy_group": "isp_ashburn",
          "monitor_delay_ms": 1000
        }
      ], null, 2);
    } else if (filename === 'profiles.sample.json') {
      content = JSON.stringify([
        {
          "profile_name": "Ayaan_Main_Jig1",
          "first_name": "Ayaan",
          "last_name": "Khan",
          "email": "ayaankhan0510@gmail.com",
          "phone": "555-019-2834",
          "address_line1": "742 Evergreen Terrace",
          "address_line2": "Apt 4B",
          "city": "Springfield",
          "state": "IL",
          "zip": "62704",
          "jig_level": "standard"
        }
      ], null, 2);
    } else {
      content = "127.0.0.1:8080:user:pass\n192.168.1.1:3128:testuser:testpass";
    }

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="open-source" className="py-24 relative overflow-hidden bg-[#040713]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free &amp; Open Source</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built by <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Ayaan Khan</span>. Zero Paywalls.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No license keys, no monthly renewals, and no closed-source fees. Scalper is released under the MIT license for retail automation testing and high-concurrency research.
          </p>
        </div>

        {/* Quickstart Terminal Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#080d21] border border-indigo-500/30 p-6 sm:p-8 shadow-2xl mb-12">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-400">bash — ayaan@workstation: ~/scalper</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd ? 'Copied to Clipboard!' : 'Copy Clone Command'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto space-y-2 border border-slate-800/80">
            <div className="text-slate-500"># 1. Clone Ayaan Khan&apos;s open-source repository</div>
            <div className="text-cyan-300">
              $ git clone https://github.com/Ayaan-M-Khan/pokemon-bot.git
            </div>
            <div className="text-slate-500 mt-2"># 2. Navigate and install Python dependencies</div>
            <div className="text-cyan-300">
              $ cd pokemon-bot &amp;&amp; pip install -r requirements.txt
            </div>
            <div className="text-slate-500 mt-2"># 3. Launch concurrent task engine</div>
            <div className="text-cyan-300">
              $ python -m bot.tasks.engine --workers=15
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Ayaan-M-Khan/pokemon-bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub (Ayaan-M-Khan)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                onClick={onOpenQuickstart}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-colors cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>Quickstart Guide</span>
              </button>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              License: <span className="text-emerald-400 font-bold">MIT (Free Forever)</span>
            </span>
          </div>
        </div>

        {/* Configuration Templates Download Grid */}
        <div className="max-w-4xl mx-auto">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-4 text-center">
            DOWNLOAD SAMPLE CONFIGURATION TEMPLATES:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white text-xs">tasks.sample.json</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Defines multi-task worker schemas, SKUs, and assigned profile/proxy bindings.
                </p>
              </div>
              <button
                onClick={() => handleDownloadConfig('tasks.sample.json')}
                className="mt-4 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download tasks.json</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white text-xs">profiles.sample.json</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Billing, shipping, and automated address jigging parameters.
                </p>
              </div>
              <button
                onClick={() => handleDownloadConfig('profiles.sample.json')}
                className="mt-4 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download profiles.json</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white text-xs">proxies.sample.txt</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Formatting template for importing rotating residential or static ISP lists.
                </p>
              </div>
              <button
                onClick={() => handleDownloadConfig('proxies.sample.txt')}
                className="mt-4 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download proxies.txt</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
