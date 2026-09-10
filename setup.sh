#!/usr/bin/env bash
# ==============================================================================
# Scalper Engine - Automated Setup & Environment Provisioner (macOS & Linux)
# Created by Ayaan Khan (https://github.com/Ayaan-M-Khan/pokemon-bot)
# ==============================================================================

set -e

# ANSI Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

echo -e "${CYAN}${BOLD}"
echo "===================================================================="
echo "      ⚡ SCALPER ENGINE - AUTOMATED ENVIRONMENT PROVISIONER         "
echo "      Open-Source High-Throughput Engine by Ayaan Khan             "
echo "===================================================================="
echo -e "${NC}"

# 1. Detect Python 3.10+
echo -e "${CYAN}[1/5] Checking Python installation...${NC}"
PYTHON_BIN=""

if command -v python3 &>/dev/null; then
    PYTHON_BIN="python3"
elif command -v python &>/dev/null; then
    PYTHON_BIN="python"
else
    echo -e "${RED}[ERROR] Python 3 is not installed or not found in PATH.${NC}"
    echo "Please install Python 3.10, 3.11, or 3.12 from https://www.python.org/"
    exit 1
fi

PY_VERSION=$($PYTHON_BIN -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo -e "${GREEN}✓ Found Python $PY_VERSION ($($PYTHON_BIN --version))${NC}"

# 2. Virtual Environment Setup
echo -e "\n${CYAN}[2/5] Setting up isolated Python virtual environment (.venv)...${NC}"
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment at .venv..."
    $PYTHON_BIN -m venv .venv
    echo -e "${GREEN}✓ Virtual environment created successfully.${NC}"
else
    echo -e "${GREEN}✓ Existing .venv detected.${NC}"
fi

# Source virtual environment
source .venv/bin/activate
VENV_PIP=".venv/bin/pip"
VENV_PY=".venv/bin/python"

# 3. Upgrade Core Packaging Utilities & Install Requirements
echo -e "\n${CYAN}[3/5] Upgrading packaging tools and installing bot requirements...${NC}"
$VENV_PIP install --upgrade pip setuptools wheel --quiet

if [ -f "bot/requirements.txt" ]; then
    echo "Installing pinned dependencies from bot/requirements.txt..."
    $VENV_PIP install -r bot/requirements.txt
    echo -e "${GREEN}✓ Python dependencies successfully installed.${NC}"
else
    echo -e "${YELLOW}[WARNING] bot/requirements.txt not found. Skipping pip install.${NC}"
fi

# 4. Playwright Browser Binaries Installation
echo -e "\n${CYAN}[4/5] Installing Playwright Chromium browser binaries...${NC}"
if $VENV_PY -c "import playwright" &>/dev/null; then
    echo "Installing Chromium browser and system dependencies..."
    # Attempt with-deps, fallback cleanly if sudo not available
    if $VENV_PY -m playwright install --with-deps chromium 2>/dev/null; then
        echo -e "${GREEN}✓ Playwright Chromium and system dependencies installed.${NC}"
    else
        echo -e "${YELLOW}Notice: Attempting user-space Chromium driver installation...${NC}"
        $VENV_PY -m playwright install chromium
        echo -e "${GREEN}✓ Playwright Chromium installed successfully.${NC}"
    fi
else
    echo -e "${YELLOW}Playwright not in venv. Skipping browser install.${NC}"
fi

# 5. Frontend NPM Packages
echo -e "\n${CYAN}[5/5] Checking Node.js and installing frontend dependencies...${NC}"
if command -v npm &>/dev/null; then
    echo "Running npm install..."
    npm install --silent
    echo -e "${GREEN}✓ Frontend packages ready.${NC}"
else
    echo -e "${YELLOW}[WARNING] npm is not installed or not in PATH. Please install Node.js 18+ to run the React dashboard.${NC}"
fi

echo -e "\n${GREEN}${BOLD}"
echo "===================================================================="
echo "           ✓ SETUP COMPLETE! SCALPER IS READY TO RUN               "
echo "===================================================================="
echo -e "${NC}"
echo -e "To launch the unified desktop app:"
echo -e "  ${BOLD}${CYAN}python run_app.py${NC}"
echo -e "\nOr run backend and frontend separately:"
echo -e "  Backend:  ${CYAN}source .venv/bin/activate && uvicorn bot.main:app --port 8000${NC}"
echo -e "  Frontend: ${CYAN}npm run dev${NC}"
echo ""

# Optional immediate launch
if [[ "$1" == "--start" || "$1" == "-s" ]]; then
    echo -e "${CYAN}Launching Scalper Desktop...${NC}"
    $VENV_PY run_app.py
fi
