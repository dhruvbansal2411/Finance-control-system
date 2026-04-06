# Testing Guide - Admin Features

## What's New

1. ✅ **More Sample Data** - 100 financial records (was 50)
2. ✅ **Better Data Distribution** - More categories and realistic amounts
3. ✅ **Admin Signup** - Sign up as admin and immediately see admin features
4. ✅ **User Deletion** - Admins can delete users
5. ✅ **Edit/Delete Records** - Admins can edit and delete financial records

---

## Step 1: Reset Database with New Data

**Important:** Delete old database and reseed to get 100 records

```bash
# Windows
del finance.db
npm run seed

# Mac/Linux
rm finance.db
npm run seed
```

You should see:
```
✓ Created 100 financial records
```

---

## Step 2: Start Servers

**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## Step 3: Test Admin Signup

### Create New Admin Account

1. Go to http://localhost:5173/signup
2. Fill in the form:
   - Name: `Test Admin`
   - Email: `testadmin@example.com`
   - Password: `admin123`
   - Confirm Password: `admin123`
   - Account Type: **Admin (Full access)**
3. Click "Sign Up"

### Expected Behavior

✅ Should automatically login
✅ Should redirect to dashboard
✅ Should see "Users" menu in sidebar
✅ Dashboard should show charts with data

### Check Browser Console

Press F12 and check console logs:
```
Attempting signup with: testadmin@example.com Role: admin
Registration successful: {...}
Auto-logging in...
AuthContext: User role: admin
Login successful, navigating to dashboard
```

---

## Step 4: Test Admin Features

### A. Dashboard (All Users)

1. Should see 4 summary cards:
   - Total Income
   - Total Expense
   - Net Balance
   - Transaction Count

2. Should see 3 charts:
   - Monthly Trends (line chart)
   - Category Distribution (pie chart)
   - Category Breakdown (bar chart)

3. Should see Recent Activity list

### B. Records Page (Admin Features)

1. Click "Records" in sidebar
2. Should see:
   - ✅ "Add Record" button (top right)
   - ✅ Edit button (pencil icon) on each row
   - ✅ Delete button (trash icon) on each row
   - ✅ 100 records in the table

#### Test: Add New Record

1. Click "Add Record"
2. Fill in:
   - Amount: `5000`
   - Type: `Income`
   - Category: `Freelance`
   - Date: Today's date
   - Description: `Test income`
3. Click "Create"
4. Should see new record in table

#### Test: Edit Record

1. Click edit button (pencil) on any record
2. Change amount to `6000`
3. Click "Update"
4. Should see updated amount

#### Test: Delete Record

1. Click delete button (trash) on any record
2. Confirm deletion
3. Record should disappear from table

#### Test: Filters

1. Select "Income" from Type dropdown
2. Should see only income records
3. Clear filter to see all records

### C. Users Page (Admin Only)

1. Click "Users" in sidebar
2. Should see all users in cards
3. Each card should have:
   - User name and email
   - Role dropdown
   - Status dropdown
   - Delete button (except for your own account)

#### Test: Change User Role

1. Find any user (not yourself)
2. Change role from dropdown
3. Should update immediately

#### Test: Change User Status

1. Find any user
2. Change status to "Inactive"
3. Should update immediately
4. That user won't be able to login

#### Test: Delete User

1. Find any user (not yourself)
2. Click "Delete User" button
3. Confirm deletion
4. User should disappear from list

---

## Step 5: Test Non-Admin User

### Login as Viewer

1. Logout (button at bottom of sidebar)
2. Login with:
   - Email: `viewer@example.com`
   - Password: `viewer123`

### Expected Behavior

❌ Should NOT see "Users" menu
❌ Should NOT see "Add Record" button
❌ Should NOT see edit/delete buttons on records
✅ Should see dashboard with all data
✅ Should see all records (read-only)

---

## Step 6: Test Signup as Non-Admin

### Create Viewer Account

1. Logout
2. Go to signup page
3. Create account with role: **Viewer**
4. Should login and redirect to dashboard
5. Should NOT see admin features

---

## Verification Checklist

### Admin User Should See:
- [x] Dashboard with charts and data
- [x] Records page with Add/Edit/Delete buttons
- [x] Users menu in sidebar
- [x] Users page with user management
- [x] Delete user button (except own account)

### Viewer/Analyst Should See:
- [x] Dashboard with charts and data
- [x] Records page (read-only, no buttons)
- [ ] NO Users menu
- [ ] NO Add/Edit/Delete buttons

### Data Verification:
- [x] 100+ financial records
- [x] Charts showing data
- [x] Multiple categories
- [x] Data from last 6 months
- [x] Both income and expense records

---

## Troubleshooting

### Issue: No "Users" menu after admin signup

**Check:**
1. Open browser console (F12)
2. Look for: `User role: admin`
3. Check localStorage: `localStorage.getItem('user')`

**Solution:**
1. Logout and login again
2. Or refresh the page (F5)

### Issue: No edit/delete buttons on records

**Check:**
1. Verify you're logged in as admin
2. Check console for user role
3. Check if `isAdmin` is true in console

**Solution:**
1. Logout and login as admin
2. Clear browser cache and localStorage
3. Try signing up as admin again

### Issue: Charts not showing data

**Check:**
1. Backend is running
2. Database has records (should be 100)
3. Browser console for API errors

**Solution:**
```bash
# Reseed database
rm finance.db  # or del finance.db on Windows
npm run seed
# Restart backend
npm run dev
```

### Issue: Can't delete users

**Check:**
1. You're logged in as admin
2. You're not trying to delete yourself
3. Backend console for errors

**Solution:**
1. Try with a different user
2. Check backend logs
3. Verify admin role in database

---

## Sample Test Data

After seeding, you should have:

**Users (4):**
- admin@example.com (Admin)
- analyst@example.com (Analyst)
- viewer@example.com (Viewer)
- testadmin@example.com (if you created one)

**Records (100+):**
- Income categories: Salary, Freelance, Investment, Bonus, Business, Rental Income
- Expense categories: Rent, Groceries, Utilities, Transportation, Entertainment, Healthcare, Education, Shopping, Dining, Insurance
- Date range: Last 6 months
- Amounts: Income (₹2,000-₹12,000), Expense (₹100-₹2,100)

---

## Expected Console Logs

### During Signup:
```
Attempting signup with: testadmin@example.com Role: admin
Registration successful: {message: "User created successfully", user: {...}}
Auto-logging in...
AuthContext: Logging in user: testadmin@example.com
AuthContext: User role: admin
Login successful, navigating to dashboard
```

### On Dashboard Load:
```
Current user: {id: 4, email: "testadmin@example.com", name: "Test Admin", role: "admin", status: "active"}
User role: admin
Is admin?: true
```

---

## Success Indicators

✅ Signup as admin works
✅ Auto-login after signup works
✅ Dashboard shows 100+ records
✅ Charts display data
✅ Admin sees Users menu
✅ Admin can add/edit/delete records
✅ Admin can manage users
✅ Admin can delete users
✅ Non-admin users don't see admin features

**If all above are ✅, everything is working perfectly!** 🎉
