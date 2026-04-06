@echo off
echo Starting Finance App Development Servers...
echo.

REM Check if backend dependencies are installed
if not exist "node_modules\" (
    echo Installing backend dependencies...
    call npm install
)

REM Check if frontend dependencies are installed
if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Starting backend server on http://localhost:3000
echo Starting frontend server on http://localhost:5173
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start backend
start "Backend Server" cmd /k "npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
