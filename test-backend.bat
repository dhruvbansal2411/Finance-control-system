@echo off
echo.
echo Testing Backend API
echo =====================
echo.

REM Test health endpoint
echo 1. Testing health endpoint...
curl -s http://localhost:3000/health > temp_health.txt 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend is running
    type temp_health.txt
    del temp_health.txt
) else (
    echo [ERROR] Backend is not running
    echo    Run: npm run dev
    del temp_health.txt
    goto :end
)

echo.

REM Test login
echo 2. Testing login with admin@example.com...
curl -s -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}" > temp_login.txt 2>&1

findstr /C:"token" temp_login.txt >nul
if %errorlevel% equ 0 (
    echo [OK] Login successful
    echo    Token received
) else (
    echo [ERROR] Login failed
    type temp_login.txt
    echo.
    echo    Possible issues:
    echo    - Database not seeded ^(run: npm run seed^)
    echo    - Wrong credentials
    del temp_login.txt
    goto :end
)

REM Extract token (simplified - just check if login worked)
echo.
echo [SUCCESS] Backend is working correctly!
echo.
echo You can now use the frontend at: http://localhost:5173
echo.
echo Test credentials:
echo   Email: admin@example.com
echo   Password: admin123
echo.

del temp_login.txt

:end
pause
