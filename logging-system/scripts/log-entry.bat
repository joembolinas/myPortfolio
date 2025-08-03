@echo off
REM Simple Windows Batch Script for Project Logging
REM Usage: log-entry.bat "TYPE" "COMPONENT" "DESCRIPTION" "STATUS"

REM Check if parameters provided
if "%~1"=="" goto usage

REM Get simple timestamp (YYYYMMDDHHMM format)
for /f "tokens=1-4 delims=/.: " %%a in ("%date% %time%") do (
    set timestamp=%%c%%a%%b%%d
)

REM Set parameters with quotes removed
set logtype=%~1
set component=%~2
set description=%~3
set status=%~4

REM Set defaults for missing parameters
if "%component%"=="" set component=GENERAL
if "%description%"=="" set description=Batch script entry
if "%status%"=="" set status=LOGGED

REM Create log entry and append to project.log
echo [%timestamp%] ^| %logtype% ^| %component% ^| %description% ^| %status% >> project.log

REM Show confirmation
echo [SUCCESS] Logged: %logtype% entry for %component%
echo Description: %description%
echo Status: %status%
echo.
goto end

:usage
echo.
echo ===========================================
echo   PROJECT LOGGING - BATCH SCRIPT
echo ===========================================
echo.
echo Usage: log-entry.bat "TYPE" "COMPONENT" "DESCRIPTION" "STATUS"
echo.
echo Examples:
echo   log-entry.bat "LEARNING" "REACT" "Understanding useState hook" "INSIGHT"
echo   log-entry.bat "PROGRESS" "PORTFOLIO" "Completed navigation bar" "MILESTONE"
echo   log-entry.bat "CHALLENGE" "CSS" "Layout breaking on mobile" "OBSTACLE"
echo   log-entry.bat "SOLUTION" "CSS" "Fixed with media queries" "RESOLVED"
echo.
echo Entry Types: DAILY, LEARNING, CHALLENGE, SOLUTION, PROGRESS, SETUP
echo Components: REACT, CSS, JS, HTML, PORTFOLIO, LEETCODE, etc.
echo Statuses: INSIGHT, OBSTACLE, RESOLVED, MILESTONE, COMPLETED, etc.
echo.
echo Note: Use quotes around all parameters
echo All entries are saved to project.log in current directory
echo.

:end
