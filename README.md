# ⚡ Scalper Engine

> **Open-Source High-Throughput Retail Task Engine, Concurrency Laboratory, and Real-Time Telemetry Monitor**  
> Created and maintained by **[Ayaan Khan](https://github.com/Ayaan-M-Khan/pokemon-bot)**  
> Licensed under the [MIT License](LICENSE) — 100% Free & Open Source.

---

## 🚀 2-Minute Turnkey Quickstart

Run Scalper locally in an **isolated, standalone desktop application format** without manual dependency debugging:

### Option A: Local Desktop App (Recommended)

#### 1. Clone the repository
```bash
git clone https://github.com/Ayaan-M-Khan/pokemon-bot.git
cd pokemon-bot
```

#### 2. Run Automated Environment Setup
The setup script automatically checks Python 3.10–3.12, creates an isolated `.venv`, installs modern pinned packages, installs Playwright Chromium drivers, and provisions frontend dependencies:

* **macOS / Linux**:
  ```bash
  chmod +x setup.sh
  ./setup.sh
  ```
* **Windows**:
  ```cmd
  setup.bat
  ```

#### 3. Launch Turnkey Desktop App
```bash
python run_app.py
```
> **What happens?** `run_app.py` automatically detects your `.venv`, concurrently boots the FastAPI backend daemon (port 8000) and Vite React dashboard (port 3000), and presents the interface in a dedicated desktop application window (via `pywebview` or standalone browser application mode). Closing the window gracefully terminates all background processes.

---

### Option B: Zero-Config Docker Compose

If you prefer containerized execution with pre-configured Playwright dependencies:

```bash
docker compose up --build
```
Open **http://localhost:3000** in your browser.

---

## 🛠️ Project Structure

```
├── bot/
│   ├── main.py              # Asynchronous FastAPI daemon & telemetry streamer
│   └── requirements.txt     # Pinned Python 3.10-3.12 dependencies
├── src/
│   ├── components/
│   │   ├── MonitorsView.tsx # Live Retailer Health, Product Watcher & Terminal
│   │   ├── TaskEngineSimulator.tsx # Concurrency simulator
│   │   ├── ArchitectureLab.tsx     # Redis vs SQL locking lab
│   │   ├── SupportedSites.tsx      # 70+ retail modules directory
│   │   └── ...
│   ├── data/                # Initial store monitors, products & profiles
│   └── types.ts             # Strict TypeScript data contracts
├── run_app.py               # Turnkey desktop app runner
├── setup.sh                 # macOS/Linux automated setup
├── setup.bat                # Windows automated setup
├── docker-compose.yml       # Orchestrated multi-container stack
├── Dockerfile.backend       # Playwright Python backend container
└── Dockerfile.frontend      # Node.js Vite dashboard container
```

---

## 📡 Live Visual Monitors & Telemetry

Scalper features an integrated visual monitor dashboard:
1. **Live Retailer Health & Ping Radar:** Real-time sub-second latency meters (<200ms Fast, 200–500ms Normal, >500ms Error) across Pokémon Center, Target, Best Buy, Walmart, Amazon, and Shopify.
2. **Product Watcher Grid:** Track high-demand SKUs, target MSRPs, real-time in-stock badges, and instant restock simulation.
3. **Live Streaming Telemetry Console:** Dark-mode terminal streaming cycle events, TLS handshakes, and restock alerts with log filtering.

---

## 📜 License & Attribution

- **Creator:** [Ayaan Khan](https://github.com/Ayaan-M-Khan)
- **Repository:** [https://github.com/Ayaan-M-Khan/pokemon-bot](https://github.com/Ayaan-M-Khan/pokemon-bot)
- **License:** MIT
