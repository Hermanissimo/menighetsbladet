@echo off
echo Stopping Menighetsbladet server...
taskkill /f /fi "WINDOWTITLE eq Menighetsbladet Dashboard" >nul 2>&1
echo Done.
timeout /t 2 >nul
