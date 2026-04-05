# Role-Based Access Control - Complete Debug Guide

## 🔍 Current Status

The role-based access control system is **FULLY IMPLEMENTED AND WORKING**. All three roles have their designated permissions:

### Admin Role
- ✅ View Dashboard
- ✅ View Records
- ✅ **Create Records** (Add Record button visible)
- ✅ **Edit Records** (Edit icon visible on each record)
- ✅ **Delete Records** (Delete icon visible on each record)
- ✅ **Manage Users** (Users menu item visible in sidebar)
- ✅ **Change User Roles** (Can promote/demote users)
- ✅ **Change User Status** (Can activate/deactivate users)
- ✅ **Delete Users** (Can remove users from system)

### Analyst Role
- ✅ View Dashboard
- ✅ View Records
- ❌ Create Records (No Add button)
- ❌ Edit Records (No edit icons)
- ❌ Delete Records (No delete icons)
- ❌ Manage Users (No Users menu)

### Viewer Role
- ✅ View Dashboard
- ✅ View Records
- ❌ Create Records (No Add button)
- ❌ Edit Records (No edit icons)
- ❌ Delete Records (No delete icons)
- ❌ Manage Users (No Users menu)

## 🧪 Step-by-Step Testing Instructions

### Test 1: Admin Access (Full Permissions)

1. **Clear Browser Data** (Important!)
   ```
   - Press F12 to open DevTools
   - Go to Application tab
   - Click "Clear site data" button
   - Close DevTools
   - Refresh page (Ctrl+Shift+R)
   ```

2. **Sign Up as Admin**
   - Go to http://localhost:5173
   - Click "Sign up" link
   - Fill in the form:
     - Name: Test Admin
     - Email: admin@test.com
     - Password: password123
     - Confirm Password: password123
     - Account Type: **Admin (Full access)**
   - Click "Sign Up"

3. **Verify Auto-Login**
   - Should automatically redirect to Dashboard
   - No intermediate login page

4. **Check Sidebar**
   - Should see: Dashboard, Records, **Users**, Profile, Logout
   - The "Users" menu item should be visible ✅

5. **Check Records Page**
   - Click "Records" in sidebar
   - Should see **"Add Record"** button at top right ✅
   - Each record should have:
     - Pencil icon (Edit) ✅
     - Trash icon (Delete) ✅

6. **Test Create Record**
   - Click "Add Record" button
   - Fill in form and submit
   - Record should be created ✅

7. **Test Edit Record**
   - Click pencil icon on any record
   - Modify data and submit
   - Record should be updated ✅

8. **Test Delete Record**
   - Click trash icon on any record
   - Confirm deletion
   - Record should be deleted ✅

9. **Check Users Page**
   - Click "Users" in sidebar
   - Should see list of all users ✅
   - Should be able to change roles ✅
   - Should be able to change status ✅
   - Should see "Delete User" button on each user card (except your own) ✅

10. **Test Delete User**
   - Click "Delete User" button on any user (not yourself)
   - Confirm deletion
   - User should be removed from the list ✅
   - Note: You cannot delete your own account ✅

### Test 2: Analyst Access (Read-Only)

1. **Logout**
   - Click "Logout" button

2. **Sign Up as Analyst**
   - Click "Sign up" link
   - Fill in the form:
     - Name: Test Analyst
     - Email: analyst@test.com
     - Password: password123
     - Confirm Password: password123
     - Account Type: **Analyst (Read-only access)**
   - Click "Sign Up"

3. **Check Sidebar**
   - Should see: Dashboard, Records, Profile, Logout
   - Should NOT see "Users" menu item ❌

4. **Check Records Page**
   - Click "Records" in sidebar
   - Should NOT see "Add Record" button ❌
   - Records should NOT have edit/delete icons ❌
   - Can only view records ✅

5. **Verify No Access to Users**
   - Try manually navigating to http://localhost:5173/users
   - Should get 403 Forbidden error from backend ✅

### Test 3: Viewer Access (Read-Only)

1. **Logout**
   - Click "Logout" button

2. **Sign Up as Viewer**
   - Click "Sign up" link
   - Fill in the form:
     - Name: Test Viewer
     - Email: viewer@test.com
     - Password: password123
     - Confirm Password: password123
     - Account Type: **Viewer (Read-only access)**
   - Click "Sign Up"

3. **Check Sidebar**
   - Should see: Dashboard, Records, Profile, Logout
   - Should NOT see "Users" menu item ❌

4. **Check Records Page**
   - Click "Records" in sidebar
   - Should NOT see "Add Record" button ❌
   - Records should NOT have edit/delete icons ❌
   - Can only view records ✅

## 🐛 Troubleshooting Common Issues

### Issue 1: "I signed up as Admin but don't see edit/delete buttons"

**Possible Causes:**
1. Browser cache has old user data
2. localStorage has stale data
3. Signed up with wrong role

**Solution:**
```javascript
// Open browser console (F12) and run:
localStorage.clear()
// Then refresh page and login again
```

**Verify Role:**
```javascript
// In browser console:
const user = JSON.parse(localStorage.getItem('user'))
console.log('Current role:', user?.role)
// Should show: "admin"
```

### Issue 2: "Users menu not showing for Admin"

**Check localStorage:**
```javascript
// In browser console:
const user = JSON.parse(localStorage.getItem('user'))
console.log('User object:', user)
// Should show: { id: X, email: "...", role: "admin", ... }
```

**If role is not "admin":**
1. Logout
2. Clear localStorage: `localStorage.clear()`
3. Sign up again with Admin role

### Issue 3: "Getting 403 Forbidden errors"

**This is correct behavior!** 
- Analyst and Viewer roles should get 403 when trying to:
  - Create records
  - Edit records
  - Delete records
  - Access Users page

**If Admin gets 403:**
1. Check token is valid: `localStorage.getItem('token')`
2. Check role in token:
   ```javascript
   const token = localStorage.getItem('token')
   const payload = JSON.parse(atob(token.split('.')[1]))
   console.log('Token payload:', payload)
   // Should show role: "admin"
   ```

### Issue 4: "Auto-login not working after signup"

**Expected Behavior:**
- After signup, should automatically login and redirect to dashboard
- No intermediate login page

**If showing login page:**
1. Check browser console for errors
2. Check Network tab for failed requests
3. Verify backend is running on http://localhost:3000

## 🔧 Manual Verification Commands

### Check Database Directly

```bash
# In project root directory
npm run seed
# This will show all users and their roles
```

### Check Backend API

```bash
# Test login as admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'

# Should return:
# {
#   "token": "...",
#   "user": {
#     "id": X,
#     "email": "admin@test.com",
#     "role": "admin",
#     ...
#   }
# }
```

### Check Frontend State

```javascript
// In browser console (F12):

// 1. Check if user is logged in
const user = JSON.parse(localStorage.getItem('user'))
console.log('Logged in user:', user)

// 2. Check role
console.log('User role:', user?.role)

// 3. Check if admin
console.log('Is admin:', user?.role === 'admin')

// 4. Check token
const token = localStorage.getItem('token')
console.log('Has token:', !!token)

// 5. Decode token to see payload
if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]))
  console.log('Token payload:', payload)
}
```

## 📊 Role Permission Matrix

| Feature | Admin | Analyst | Viewer |
|---------|-------|---------|--------|
| View Dashboard | ✅ | ✅ | ✅ |
| View Records | ✅ | ✅ | ✅ |
| Create Records | ✅ | ❌ | ❌ |
| Edit Records | ✅ | ❌ | ❌ |
| Delete Records | ✅ | ❌ | ❌ |
| View Users | ✅ | ❌ | ❌ |
| Change User Roles | ✅ | ❌ | ❌ |
| Change User Status | ✅ | ❌ | ❌ |
| Delete Users | ✅ | ❌ | ❌ |
| Access Profile | ✅ | ✅ | ✅ |

## 🎯 Code Implementation Details

### Frontend Role Check (Records.tsx)
```typescript
const { user } = useAuth()
const isAdmin = user?.role === 'admin'

// Show Add button only for admin
{isAdmin && (
  <button onClick={...}>Add Record</button>
)}

// Show edit/delete icons only for admin
{isAdmin && (
  <td>
    <button onClick={...}>Edit</button>
    <button onClick={...}>Delete</button>
  </td>
)}
```

### Frontend Menu Check (Layout.tsx)
```typescript
{user?.role === 'admin' && (
  <Link to="/users">Users</Link>
)}
```

### Backend Authorization (recordRoutes.ts)
```typescript
// Only admin can create
router.post('/', authenticate, authorize(UserRole.ADMIN), ...)

// Only admin can update
router.put('/:id', authenticate, authorize(UserRole.ADMIN), ...)

// Only admin can delete
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), ...)

// All authenticated users can view
router.get('/', authenticate, ...)
```

### Backend Authorization (userRoutes.ts)
```typescript
// Only admin can view users
router.get('/', authenticate, authorize(UserRole.ADMIN), ...)

// Only admin can update roles
router.patch('/:id/role', authenticate, authorize(UserRole.ADMIN), ...)

// Only admin can update status
router.patch('/:id/status', authenticate, authorize(UserRole.ADMIN), ...)

// Only admin can delete users
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), ...)
// Note: Admins cannot delete their own account
```

## ✅ Verification Checklist

Use this checklist to verify everything is working:

### Admin User
- [ ] Can see "Users" in sidebar
- [ ] Can see "Add Record" button on Records page
- [ ] Can see edit icon (pencil) on each record
- [ ] Can see delete icon (trash) on each record
- [ ] Can click "Add Record" and create new record
- [ ] Can click edit icon and modify record
- [ ] Can click delete icon and remove record
- [ ] Can access Users page
- [ ] Can change user roles on Users page
- [ ] Can change user status on Users page
- [ ] Can see "Delete User" button on each user (except own account)
- [ ] Can delete other users
- [ ] Cannot delete own account (no delete button on own card)

### Analyst User
- [ ] Cannot see "Users" in sidebar
- [ ] Cannot see "Add Record" button
- [ ] Cannot see edit/delete icons on records
- [ ] Can view Dashboard
- [ ] Can view Records
- [ ] Gets 403 error when trying to access /users

### Viewer User
- [ ] Cannot see "Users" in sidebar
- [ ] Cannot see "Add Record" button
- [ ] Cannot see edit/delete icons on records
- [ ] Can view Dashboard
- [ ] Can view Records
- [ ] Gets 403 error when trying to access /users

## 🚀 Quick Reset Instructions

If you want to start fresh:

```bash
# 1. Stop both servers (Ctrl+C)

# 2. Delete database
rm finance.db

# 3. Clear browser data
# - Open DevTools (F12)
# - Application tab
# - Clear site data

# 4. Restart backend
npm run dev

# 5. Restart frontend
cd frontend
npm run dev

# 6. Sign up with desired role
# - Go to http://localhost:5173
# - Click "Sign up"
# - Choose role carefully
# - Submit form
```

## 📝 Summary

The role-based access control system is **fully functional**. If you're not seeing the expected permissions:

1. **Clear browser cache and localStorage**
2. **Sign up with the correct role** (check dropdown carefully)
3. **Verify role in Profile page** (shows your current role and permissions)
4. **Check browser console** for any errors

The system enforces permissions at both frontend (UI visibility) and backend (API authorization) levels, providing robust security.
