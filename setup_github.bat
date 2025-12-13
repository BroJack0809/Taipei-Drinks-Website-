
@echo off
set "PATH=%ProgramFiles%\Git\cmd;%PATH%"
chcp 65001 > nul
echo ========================================================
echo   Taipei Drinks - GitHub Upload Assistant (v2)
echo ========================================================
echo.

:check_git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not found. Please install Git.
    pause
    exit /b
)

echo [OK] Git found.
echo.

REM --- Check and Configure Git Identity ---
echo Checking Git Identity...
for /f "delims=" %%i in ('git config user.email') do set GIT_EMAIL=%%i
for /f "delims=" %%i in ('git config user.name') do set GIT_NAME=%%i

if "%GIT_EMAIL%"=="" (
    echo.
    echo [ACTION REQUIRED] Git needs to know who you are to commit changes.
    echo Please enter your email and name (used for commit history only).
    echo.
    set /p GIT_EMAIL="Enter your Email: "
    set /p GIT_NAME="Enter your Name: "
    
    git config --global user.email "%GIT_EMAIL%"
    git config --global user.name "%GIT_NAME%"
    echo Identity configured globally.
) else (
    echo [OK] Identity found: %GIT_NAME% ^<%GIT_EMAIL%^>
)

REM --- Repository Setup ---
echo.
set /p REPO_URL="Enter your GitHub Repository URL (or press Enter for https://github.com/BroJack0809/Taipei-Drinks-Website-.git): "
if "%REPO_URL%"=="" set REPO_URL=https://github.com/BroJack0809/Taipei-Drinks-Website-.git

echo.
echo Initializing Git...
if not exist .git (
    git init
)

echo.
echo Configuring branch...
git branch -m main

echo.
echo Adding files...
git add .

echo.
echo Committing files...
git commit -m "Initial commit - Taipei Drinks Directory 2025 (Google Antigravity)"

echo.
echo Configuring Remote...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo Pushing to GitHub...
echo (A browser window or prompt may appear to sign in to GitHub)
git push -u origin main

echo.
echo ========================================================
if %errorlevel% equ 0 (
    echo [SUCCESS] Project successfully uploaded!
) else (
    echo [ERROR] Push failed. Please check the error message above.
)
echo ========================================================
pause
