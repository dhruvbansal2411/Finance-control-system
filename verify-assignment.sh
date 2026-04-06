#!/bin/bash

echo "🔍 Finance Backend Assignment Verification"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    exit 1
fi

# Check npm
echo "2. Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check dependencies
echo "3. Checking backend dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Backend dependencies not installed"
    echo "   Run: npm install"
fi

# Check frontend dependencies
echo "4. Checking frontend dependencies..."
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Frontend dependencies not installed"
    echo "   Run: cd frontend && npm install"
fi

# Check .env file
echo "5. Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}⚠${NC} .env file not found"
    echo "   Run: cp .env.example .env"
fi

# Check database
echo "6. Checking database..."
if [ -f "finance.db" ]; then
    DB_SIZE=$(du -h finance.db | cut -f1)
    echo -e "${GREEN}✓${NC} Database exists (Size: $DB_SIZE)"
else
    echo -e "${YELLOW}⚠${NC} Database not found"
    echo "   Run: npm run seed"
fi

# Check TypeScript compilation
echo "7. Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✓${NC} TypeScript configured"
else
    echo -e "${RED}✗${NC} tsconfig.json not found"
fi

# Check source files
echo "8. Checking source files..."
REQUIRED_FILES=(
    "src/app.ts"
    "src/server.ts"
    "src/config/database.ts"
    "src/middleware/auth.ts"
    "src/middleware/errorHandler.ts"
    "src/routes/authRoutes.ts"
    "src/routes/userRoutes.ts"
    "src/routes/recordRoutes.ts"
    "src/routes/dashboardRoutes.ts"
    "src/services/userService.ts"
    "src/services/recordService.ts"
    "src/services/dashboardService.ts"
)

MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗${NC} Missing: $file"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✓${NC} All source files present"
else
    echo -e "${RED}✗${NC} $MISSING_FILES source files missing"
fi

# Check documentation
echo "9. Checking documentation..."
DOC_FILES=(
    "README.md"
    "QUICK_START.md"
    "API_EXAMPLES.md"
    "ARCHITECTURE.md"
    "ASSIGNMENT_CHECKLIST.md"
    "SUBMISSION_CHECKLIST.md"
)

MISSING_DOCS=0
for file in "${DOC_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗${NC} Missing: $file"
        MISSING_DOCS=$((MISSING_DOCS + 1))
    fi
done

if [ $MISSING_DOCS -eq 0 ]; then
    echo -e "${GREEN}✓${NC} All documentation files present"
else
    echo -e "${RED}✗${NC} $MISSING_DOCS documentation files missing"
fi

# Check frontend
echo "10. Checking frontend..."
if [ -d "frontend/src" ]; then
    echo -e "${GREEN}✓${NC} Frontend source code present"
else
    echo -e "${YELLOW}⚠${NC} Frontend not found (optional)"
fi

echo ""
echo "=========================================="
echo "Verification Complete!"
echo ""

# Summary
if [ $MISSING_FILES -eq 0 ] && [ $MISSING_DOCS -eq 0 ]; then
    echo -e "${GREEN}✓ Assignment is ready for submission!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run seed (if database not created)"
    echo "2. Run: npm run dev (to start backend)"
    echo "3. Run: cd frontend && npm run dev (to start frontend)"
    echo "4. Test the application"
    echo "5. Submit your repository"
else
    echo -e "${RED}✗ Some files are missing. Please check above.${NC}"
fi

echo ""
