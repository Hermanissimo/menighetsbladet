@echo off
chcp 65001 >nul 2>&1
title Menighetsbladet Dashboard

echo.
echo   ======================================
echo    Menighetsbladet Dashboard
echo   ======================================
echo.
echo   Starting server...
echo.

:: Open browser after a short delay (start /b runs async)
start "" "http://localhost:8080/web/"

:: Start the PowerShell server (blocks until Ctrl+C)
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"

echo.
echo   Server stopped.
echo.
pause
