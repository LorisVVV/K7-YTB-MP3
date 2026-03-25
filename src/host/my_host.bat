@echo off

set LOG=C:\Users\loris\Desktop\Documents\projets\K7-YTB-MP3\log.txt

time /t >> %LOG%

"%~dp0node.exe" "%~dp0my_host.js" %* 2>> %LOG%

echo %errorlevel% >> %LOG%