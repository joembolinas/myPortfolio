@echo off
setlocal ENABLEDELAYEDEXPANSION

echo ---------------------------------
echo  GitHub MCP Setup (Batch)
echo ---------------------------------

:: 1. Check existing env var
if not "%GITHUB_TOKEN%"=="" (
  echo Detected existing GITHUB_TOKEN. Reusing it.
  set TOKEN=%GITHUB_TOKEN%
) else (
  set /p TOKEN=Enter GitHub Personal Access Token (classic): 
)

if "%TOKEN%"=="" (
  echo No token entered. Aborting.
  exit /b 1
)

:: 2. Validate via curl (requires curl on PATH / Win10+)
echo Validating token...
for /f "usebackq tokens=*" %%i in (`curl -s -H "Authorization: Bearer %TOKEN%" https://api.github.com/user ^| findstr /C:"\"login\":"`) do set GITHUB_USER=%%i
if "!GITHUB_USER!"=="" (
  echo Token validation FAILED (no login field). Check scopes or token value.
  exit /b 1
) else (
  echo Token OK: !GITHUB_USER!
)

:: 3. Persist user env var
setx GITHUB_TOKEN "%TOKEN%" >nul
set GITHUB_TOKEN=%TOKEN%

echo Persisted GITHUB_TOKEN to user environment.

:: 4. Ensure .vscode\mcp.json
if not exist .vscode mkdir .vscode
> .vscode\mcp.json echo {
>> .vscode\mcp.json echo   "servers": {
>> .vscode\mcp.json echo     "github": {
>> .vscode\mcp.json echo       "command": "npx",
>> .vscode\mcp.json echo       "args": ["-y", "@modelcontextprotocol/server-github"],
>> .vscode\mcp.json echo       "env": {"GITHUB_TOKEN": "${env:GITHUB_TOKEN}"}
>> .vscode\mcp.json echo     }
>> .vscode\mcp.json echo   }
>> .vscode\mcp.json echo }

echo Wrote .vscode\mcp.json

echo Done. Restart VS Code, then run Command Palette: Check MCP Setup.
endlocal
