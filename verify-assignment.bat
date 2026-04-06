@echo off
echo.
echo Finance Backend Assignment Verification
echo ==========================================
echo.

REM Check Node.js
echo 1. Checking Node.js...
where node >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js installed: %NODE_VERSION%
) else (
    echo [ERROR] Node.js not found
    goto :end
)

REM Check npm
echo 2. Checking npm...
where npm >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo [OK] npm installed: %NPM_VERSION%
) else (
    echo [ERROR] npm not found
    goto :end
)

REM Check backend dependencies
echo 3. Checking backend dependencies...
if exist "node_modules\" (
    echo [OK] Backend dependencies installed
) else (
    echo [WARNING] Backend dependencies not installed
    echo    Run: npm install
)

REM Check frontend dependencies
echo 4. Checking frontend dependencies...
if exist "frontend\node_modules\" (
    echo [OK] Frontend dependencies installed
) else (
    echo [WARNING] Frontend dependencies not installed
    echo    Run: cd frontend ^&^& npm install
)

REM Check .env file
echo 5. Checking environment configuration...
if exist ".env" (
    echo [OK] .env file exists
) else (
    echo [WARNING] .env file not found
    echo    Run: copy .env.example .env
)

REM Check database
echo 6. Checking database...
if exist "finance.db" (
    echo [OK] Database exists
) else (
    echo [WARNING] Database not found
    echo    Run: npm run seed
)

REM Check TypeScript configuration
echo 7. Checking TypeScript configuration...
if exist "tsconfig.json" (
    echo [OK] TypeScript configured
) else (
    echo [ERROR] tsconfig.json not found
)

REM Check source files
echo 8. Checking source files...
set MISSING_FILES=0

if not exist "src\app.ts" set /a MISSING_FILES+=1
if not exist "src\server.ts" set /a MISSING_FILES+=1
if not exist "src\config\database.ts" set /a MISSING_FILES+=1
if not exist "src\middleware\auth.ts" set /a MISSING_FILES+=1
if not exist "src\middleware\errorHandler.ts" set /a MISSING_FILES+=1
if not exist "src\routes\authRoutes.ts" set /a MISSING_FILES+=1
if not exist "src\routes\userRoutes.ts" set /a MISSING_FILES+=1
if not exist "src\routes\recordRoutes.ts" set /a MISSING_FILES+=1
if not exist "src\routes\dashboardRoutes.ts" set /a MISSING_FILES+=1
if not exist "src\services\userService.ts" set /a MISSING_FILES+=1
if not exist "src\services\recordService.ts" set /a MISSING_FILES+=1
if not exist "src\services\dashboardService.ts" set /a MISSING_FILES+=1

if %MISSING_FILES% equ 0 (
    echo [OK] All source files present
) else (
    echo [ERROR] %MISSING_FILES% source files missing
)

REM Check documentation
echo 9. Checking documentation...
set MISSING_DOCS=0

if not exist "README.md" set /a MISSING_DOCS+=1
if not exist "QUICK_START.md" set /a MISSING_DOCS+=1
if not exist "API_EXAMPLES.md" set /a MISSING_DOCS+=1
if not exist "ARCHITECTURE.md" set /a MISSING_DOCS+=1
if not exist "ASSIGNMENT_CHECKLIST.md" set /a MISSING_DOCS+=1
if not exist "SUBMISSION_CHECKLIST.md" set /a MISSING_DOCS+=1

if %MISSING_DOCS% equ 0 (
    echo [OK] All documentation files present
) else (
    echo [ERROR] %MISSING_DOCS% documentation files missing
)

REM Check frontend
echo 10. Checking frontend...
if exist "frontend\src\" (
    echo [OK] Frontend source code present
) else (
    echo [WARNING] Frontend not found ^(optional^)
)

echo.
echo ==========================================
echo Verification Complete!
echo.

REM Summary
if %MISSING_FILES% equ 0 if %MISSING_DOCS% equ 0 (
    echo [SUCCESS] Assignment is ready for submission!
    echo.
    echo Next steps:
    echo 1. Run: npm run seed ^(if database not created^)
    echo 2. Run: npm run dev ^(to start backend^)
    echo 3. Run: cd frontend ^&^& npm run dev ^(to start frontend^)
    echo 4. Test the application
    echo 5. Submit your repository
) else (
    echo [ERROR] Some files are missing. Please check above.
)

:end
echo.
pause
