@echo off
title GuardianOC Platform - SIH 2026
echo ========================================================
echo   GUARDIAN OC - Continuous Cyber Risk & Optimizer
echo   SIH 2026 Problem Statement PS26105 / PS26104
echo ========================================================
echo.

echo [1/2] Starting GuardianOC FastAPI Backend (Port 8000)...
start "GuardianOC Backend" cmd /k "cd /d %~dp0\backend && python -m uvicorn main:app --reload --port 8000"

echo [2/2] Starting GuardianOC Next.js Frontend (Port 3000)...
start "GuardianOC Frontend" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo ========================================================
echo   Services Launched!
echo   - Backend API: http://127.0.0.1:8000/docs
echo   - CISO Dashboard: http://localhost:3000
echo.
echo   To simulate live VocxGuard threat telemetry:
echo   Run: python sensors\live_simulator.py
echo ========================================================
pause
