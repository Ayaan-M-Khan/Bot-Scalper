@echo off
REM ==============================================================================
REM Scalper Engine - Automated Setup & Environment Provisioner (Windows)
REM Created by Ayaan Khan (https://github.com/Ayaan-M-Khan/pokemon-bot)
REM ==============================================================================

echo ====================================================================
echo       SCALPER ENGINE - AUTOMATED ENVIRONMENT PROVISIONER
echo       Open-Source High-Throughput Engine by Ayaan Khan
echo ====================================================================
echo.

REM 1. Detect Python
echo [1/5] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your system PATH.
    echo Please download and install Python 3.10-3.12 from https://www.python.org/
    pause
    exit /b 1
)
python --version

REM 2. Setup Virtual Environment
echo.
echo [2/5] Creating isolated virtual environment (.venv)...
if not exist ".venv" (
    python -m venv .venv
    echo Virtual environment created.
) else (
    echo Existing .venv detected.
)

REM Activate virtual environment
call .venv\Scripts\activate.bat

REM 3. Upgrade Pip and Install Dependencies
echo.
echo [3/5] Upgrading packaging tools and installing bot requirements...
python -m pip install --upgrade pip setuptools wheel --quiet
if exist "bot\requirements.txt" (
    pip install -r bot\requirements.txt
    echo Python dependencies installed.
)

REM 4. Install Playwright Chromium
echo.
echo [4/5] Installing Playwright Chromium browser...
python -m playwright install chromium

REM 5. Install Frontend Dependencies
echo.
echo [5/5] Installing frontend npm packages...
where npm >nul 2>&1
if %errorlevel% equ 0 (
    call npm install
    echo Frontend packages installed.
) else (
    echo [WARNING] npm was not found. Please install Node.js 18+ to launch the GUI dashboard.
)

echo.
echo ====================================================================
echo          SETUP COMPLETE! SCALPER IS READY TO RUN
echo ====================================================================
echo.
echo To launch the turnkey desktop app:
echo   python run_app.py
echo.
pause
