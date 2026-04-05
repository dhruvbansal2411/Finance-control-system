# Getting Started - Finance Dashboard

## 🎯 You're All Set!

Both backend and frontend servers are running. You can start using the application right now!

## 🌐 Access the Application

### Open Your Browser
Go to: **http://localhost:5173**

You'll see a beautiful login page with a purple gradient background.

## 🔑 Login Options

### Option 1: Quick Login Buttons (Recommended for Demo)
Click one of the three colored buttons at the bottom:
- **Red Button** - Login as Admin (full access)
- **Blue Button** - Login as Analyst (read-only)
- **Green Button** - Login as Viewer (read-only)

### Option 2: Manual Login
Enter credentials manually:

**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`

**Analyst Account:**
- Email: `analyst@test.com`
- Password: `analyst123`

**Viewer Account:**
- Email: `viewer@test.com`
- Password: `viewer123`

## 📱 What You'll See After Login

### Sidebar Navigation (Left)
- **Dashboard** - Analytics and charts
- **Records** - Financial transactions
- **Users** - User management (Admin only)
- **Logout** - Sign out button at bottom

### Main Content Area (Right)
Displays the current page content

## 🎨 Exploring the Dashboard

### After logging in, you'll see:

1. **Four Summary Cards** at the top:
   - Total Income (green)
   - Total Expense (red)
   - Net Balance (purple)
   - Transaction Count (blue)

2. **Two Charts** in the middle:
   - Monthly Trends (line chart)
   - Category Distribution (pie chart)

3. **Category Breakdown** (bar chart)

4. **Recent Activity** list at the bottom

## 📊 Exploring Records

Click "Records" in the sidebar to see:

1. **Filters Section** at the top:
   - Filter by Type (Income/Expense)
   - Filter by Category
   - Filter by Date Range

2. **Records Table**:
   - Date, Category, Type, Amount, Description
   - Color-coded badges (green for income, red for expense)

3. **Admin Actions** (if logged in as Admin):
   - "Add Record" button (top right)
   - Edit button (pencil icon) on each row
   - Delete button (trash icon) on each row

### Try Creating a Record (Admin Only)

1. Click "Add Record" button
2. Fill in the form:
   - Amount: 1000
   - Type: Income
   - Category: Freelance
   - Date: Today's date
   - Description: Test transaction
3. Click "Create"
4. See your new record in the table!

### Try Filtering Records

1. Select "Income" from Type dropdown
2. See only income records
3. Clear filter to see all records again

## 👥 Exploring Users (Admin Only)

Click "Users" in the sidebar to see:

1. **User Cards** showing:
   - User avatar (first letter of name)
   - Name and email
   - Current role (dropdown to change)
   - Current status (dropdown to change)
   - Join date

2. **Try Changing a Role**:
   - Find the Analyst user
   - Change role from "Analyst" to "Viewer"
   - See the change reflected immediately

3. **Try Changing Status**:
   - Find any user
   - Change status from "Active" to "Inactive"
   - That user won't be able to login anymore

## 🔄 Testing Different Roles

### Test as Admin
1. Login as admin@test.com
2. Notice you can:
   - See all three menu items (Dashboard, Records, Users)
   - Create/edit/delete records
   - Manage users

### Test as Analyst
1. Logout (button at bottom of sidebar)
2. Login as analyst@test.com
3. Notice you can:
   - See only Dashboard and Records
   - View but not modify records
   - No Users menu item

### Test as Viewer
1. Logout
2. Login as viewer@test.com
3. Notice same restrictions as Analyst

## 🎯 Key Features to Try

### 1. Dashboard Analytics
- Check the summary cards
- Hover over chart elements to see tooltips
- Notice the color coding (green = income, red = expense)

### 2. Record Management (Admin)
- Create a new income record
- Create a new expense record
- Edit an existing record
- Delete a record
- Use filters to find specific records

### 3. User Management (Admin)
- Change a user's role
- Deactivate a user
- Reactivate a user

### 4. Responsive Design
- Resize your browser window
- Notice how the layout adapts
- Try on mobile device (if available)

## 🎨 UI Elements to Notice

### Colors
- **Purple Gradient**: Primary actions and branding
- **Green**: Income, positive actions
- **Red**: Expense, delete actions
- **Blue**: Information, neutral actions

### Animations
- Hover over cards to see lift effect
- Hover over buttons to see color changes
- Notice smooth transitions

### Icons
- Lucide React icons throughout
- Consistent icon style
- Clear visual indicators

## 🔧 If Something Goes Wrong

### Can't Access Frontend?
- Check URL: http://localhost:5173
- Verify frontend server is running
- Check browser console for errors

### Can't Login?
- Verify backend server is running
- Check credentials are correct
- Try using quick login buttons

### No Data Showing?
- Backend might not be running
- Database might not be seeded
- Check browser console for API errors

### Backend Not Responding?
```bash
# Restart backend
npm run dev
```

### Frontend Not Loading?
```bash
# Restart frontend
cd frontend
npm run dev
```

## 📚 Learn More

- **Full Stack Guide**: See [FULLSTACK_GUIDE.md](FULLSTACK_GUIDE.md)
- **API Documentation**: See [README.md](README.md)
- **API Examples**: See [API_EXAMPLES.md](API_EXAMPLES.md)
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)

## 🎉 Enjoy!

You now have a fully functional finance management system. Explore all the features and see how role-based access control works in action!

### Quick Tips:
1. Start with Admin account to see all features
2. Try creating some records
3. Use filters to find specific transactions
4. Switch to Viewer account to see restricted access
5. Check out the charts and analytics

---

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:3000  
**Status**: ✅ Both servers running

**Happy exploring! 🚀**
