#!/usr/bin/env python3
"""
==============================================================================
Scalper Engine - Turnkey Desktop App Launcher
Created by Ayaan Khan (https://github.com/Ayaan-M-Khan/pokemon-bot)

Features:
- Auto-detects and switches to .venv if present
- Concurrently launches FastAPI backend (port 8000) and Vite React dashboard (port 3000)
- Opens in a dedicated standalone desktop app window (pywebview or browser app-mode)
- Gracefully terminates both processes on window close or Ctrl+C
==============================================================================
"""

import os
import sys
import time
import socket
import signal
import shutil
import subprocess
import webbrowser
from pathlib import Path

# Color styling for CLI
try:
    from colorama import init, Fore, Style
    init(autoreset=True)
    CYAN = Fore.CYAN
    GREEN = Fore.GREEN
    YELLOW = Fore.YELLOW
    RED = Fore.RED
    RESET = Style.RESET_ALL
    BOLD = Style.BRIGHT
except ImportError:
    CYAN = GREEN = YELLOW = RED = RESET = BOLD = ""

FRONTEND_PORT = 3000
BACKEND_PORT = 8000
PROJECT_ROOT = Path(__file__).resolve().parent

# ---------------------------------------------------------------------------
# Virtual Environment Auto-Switch
# ---------------------------------------------------------------------------

def ensure_venv():
    """If run with system python, re-execute inside .venv if available."""
    in_venv = sys.prefix != sys.base_prefix
    if in_venv:
        return

    venv_python = (
        PROJECT_ROOT / ".venv" / "bin" / "python"
        if os.name != "nt"
        else PROJECT_ROOT / ".venv" / "Scripts" / "python.exe"
    )

    if venv_python.exists():
        print(f"{CYAN}Switching to isolated virtual environment ({venv_python})...{RESET}")
        os.execv(str(venv_python), [str(venv_python)] + sys.argv)

ensure_venv()

# ---------------------------------------------------------------------------
# Port & Health Utilities
# ---------------------------------------------------------------------------

def is_port_in_use(port: int, host: str = "127.0.0.1") -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex((host, port)) == 0

def wait_for_port(port: int, host: str = "127.0.0.1", timeout: float = 15.0) -> bool:
    start_time = time.time()
    while time.time() - start_time < timeout:
        if is_port_in_use(port, host):
            return True
        time.sleep(0.3)
    return False

# ---------------------------------------------------------------------------
# App Launcher
# ---------------------------------------------------------------------------

class ScalperAppRunner:
    def __init__(self):
        self.backend_proc = None
        self.frontend_proc = None
        self.running = True

    def start_backend(self):
        """Starts the FastAPI backend daemon."""
        print(f"{CYAN}Starting FastAPI backend on port {BACKEND_PORT}...{RESET}")
        env = os.environ.copy()
        env["PYTHONPATH"] = str(PROJECT_ROOT)
        
        cmd = [sys.executable, "-m", "uvicorn", "bot.main:app", "--host", "127.0.0.1", "--port", str(BACKEND_PORT)]
        
        self.backend_proc = subprocess.Popen(
            cmd,
            cwd=str(PROJECT_ROOT),
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE
        )

    def start_frontend(self):
        """Starts the Vite React frontend server."""
        print(f"{CYAN}Starting Vite frontend on port {FRONTEND_PORT}...{RESET}")
        
        npm_bin = shutil.which("npm") or shutil.which("npm.cmd")
        if not npm_bin:
            raise RuntimeError("npm is not found in PATH. Please install Node.js.")

        cmd = [npm_bin, "run", "dev"]
        self.frontend_proc = subprocess.Popen(
            cmd,
            cwd=str(PROJECT_ROOT),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE
        )

    def launch_window(self, url: str):
        """Attempts to open in pywebview, browser app mode, or default browser."""
        print(f"{GREEN}✓ Services active! Launching Scalper GUI at {url}{RESET}")

        # 1. Try PyWebView
        try:
            import webview
            print(f"{CYAN}Launching in standalone PyWebView desktop window...{RESET}")
            webview.create_window(
                title="Scalper - Task Engine & Concurrency Lab by Ayaan Khan",
                url=url,
                width=1380,
                height=900,
                min_size=(1024, 700),
                background_color="#040711"
            )
            webview.start()
            return
        except (ImportError, Exception) as e:
            pass

        # 2. Try Chrome / Edge / Brave in --app mode (looks like a native window)
        browser_candidates = [
            # macOS
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
            # Windows
            os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
            os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
            os.path.expandvars(r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"),
            # Linux
            shutil.which("google-chrome"),
            shutil.which("chromium"),
            shutil.which("brave-browser"),
        ]

        for path in browser_candidates:
            if path and os.path.exists(path):
                try:
                    subprocess.Popen([path, f"--app={url}"])
                    self.keep_alive()
                    return
                except Exception:
                    continue

        # 3. Fallback: Default Browser
        print(f"{YELLOW}Opening in default browser...{RESET}")
        webbrowser.open(url)
        self.keep_alive()

    def keep_alive(self):
        """Keep script alive until user presses Ctrl+C."""
        print(f"{GREEN}Scalper is running in the background. Press Ctrl+C to stop.{RESET}")
        try:
            while self.running:
                time.sleep(1)
        except KeyboardInterrupt:
            pass

    def shutdown(self):
        """Clean termination of spawned child processes."""
        print(f"\n{YELLOW}Stopping Scalper services...{RESET}")
        self.running = False

        for name, proc in [("Backend", self.backend_proc), ("Frontend", self.frontend_proc)]:
            if proc and proc.poll() is None:
                try:
                    proc.terminate()
                    proc.wait(timeout=3)
                except Exception:
                    proc.kill()
                print(f"{GREEN}✓ {name} terminated cleanly.{RESET}")

        print(f"{CYAN}Scalper closed. Have a great day!{RESET}")

def main():
    print(f"{CYAN}{BOLD}")
    print("====================================================================")
    print("        ⚡ SCALPER TURNKEY DESKTOP LAUNCHER                         ")
    print("        Created by Ayaan Khan (https://github.com/Ayaan-M-Khan)     ")
    print("====================================================================")
    print(f"{RESET}")

    runner = ScalperAppRunner()

    def sig_handler(sig, frame):
        runner.shutdown()
        sys.exit(0)

    signal.signal(signal.SIGINT, sig_handler)
    signal.signal(signal.SIGTERM, sig_handler)

    try:
        # Start backend if not already running
        if not is_port_in_use(BACKEND_PORT):
            runner.start_backend()
            if not wait_for_port(BACKEND_PORT, timeout=10):
                print(f"{YELLOW}Warning: Backend slow to bind on port {BACKEND_PORT}. Proceeding...{RESET}")
        else:
            print(f"{GREEN}Backend already listening on port {BACKEND_PORT}.{RESET}")

        # Start frontend if not already running
        if not is_port_in_use(FRONTEND_PORT):
            runner.start_frontend()
            if not wait_for_port(FRONTEND_PORT, timeout=12):
                print(f"{YELLOW}Warning: Frontend slow to bind on port {FRONTEND_PORT}. Proceeding...{RESET}")
        else:
            print(f"{GREEN}Frontend already listening on port {FRONTEND_PORT}.{RESET}")

        target_url = f"http://localhost:{FRONTEND_PORT}"
        runner.launch_window(target_url)

    except Exception as err:
        print(f"{RED}[ERROR] {err}{RESET}")
    finally:
        runner.shutdown()

if __name__ == "__main__":
    main()
