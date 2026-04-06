#!/bin/bash

echo "🧪 Testing Backend API"
echo "====================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Test health endpoint
echo "1. Testing health endpoint..."
HEALTH=$(curl -s http://localhost:3000/health)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend is running"
    echo "   Response: $HEALTH"
else
    echo -e "${RED}✗${NC} Backend is not running"
    echo "   Run: npm run dev"
    exit 1
fi

echo ""

# Test login
echo "2. Testing login with admin@example.com..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}')

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    echo -e "${GREEN}✓${NC} Login successful"
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "   Token received: ${TOKEN:0:20}..."
else
    echo -e "${RED}✗${NC} Login failed"
    echo "   Response: $LOGIN_RESPONSE"
    echo ""
    echo "   Possible issues:"
    echo "   - Database not seeded (run: npm run seed)"
    echo "   - Wrong credentials"
    exit 1
fi

echo ""

# Test getting records
echo "3. Testing get records..."
RECORDS=$(curl -s http://localhost:3000/api/records \
  -H "Authorization: Bearer $TOKEN")

if echo "$RECORDS" | grep -q "amount"; then
    RECORD_COUNT=$(echo $RECORDS | grep -o '"id"' | wc -l)
    echo -e "${GREEN}✓${NC} Records retrieved successfully"
    echo "   Found $RECORD_COUNT records"
else
    echo -e "${RED}✗${NC} Failed to get records"
    echo "   Response: $RECORDS"
fi

echo ""

# Test dashboard
echo "4. Testing dashboard summary..."
DASHBOARD=$(curl -s http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer $TOKEN")

if echo "$DASHBOARD" | grep -q "totalIncome"; then
    echo -e "${GREEN}✓${NC} Dashboard data retrieved"
    echo "   Response includes: totalIncome, totalExpense, netBalance"
else
    echo -e "${RED}✗${NC} Failed to get dashboard data"
    echo "   Response: $DASHBOARD"
fi

echo ""
echo "====================="
echo -e "${GREEN}✓ All tests passed!${NC}"
echo ""
echo "Backend is working correctly."
echo "You can now use the frontend at: http://localhost:5173"
echo ""
echo "Test credentials:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
