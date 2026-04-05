# Finance Dashboard Frontend

A modern, responsive React + TypeScript frontend for the Finance Data Processing and Access Control system.

## Features

- **Authentication**: Secure login with JWT tokens
- **Role-Based UI**: Different views for Viewer, Analyst, and Admin roles
- **Dashboard**: Interactive charts and analytics
  - Total income, expense, and net balance
  - Monthly trends (line chart)
  - Category distribution (pie chart)
  - Category breakdown (bar chart)
  - Recent activity feed
- **Records Management**: Full CRUD operations (Admin only)
  - Create, edit, delete financial records
  - Filter by type, category, and date range
  - Responsive table view
- **User Management**: Admin panel for managing users (Admin only)
  - Update user roles
  - Activate/deactivate users
  - View user details

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **CSS3** - Styling (no framework, custom CSS)

## Prerequisites

- Node.js v16 or higher
- Backend server running on http://localhost:3000

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

The app will start on http://localhost:5173

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.ts          # Axios instance with interceptors
│   ├── components/
│   │   ├── Layout.tsx        # Main layout with sidebar
│   │   └── Layout.css
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication context
│   ├── pages/
│   │   ├── Login.tsx         # Login page
│   │   ├── Dashboard.tsx     # Dashboard with charts
│   │   ├── Records.tsx       # Records management
│   │   └── Users.tsx         # User management (Admin)
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features by Role

### Viewer
- ✅ View dashboard
- ✅ View all records
- ✅ Filter records
- ❌ Create/edit/delete records
- ❌ Manage users

### Analyst
- ✅ View dashboard
- ✅ View all records
- ✅ Filter records
- ❌ Create/edit/delete records
- ❌ Manage users

### Admin
- ✅ View dashboard
- ✅ View all records
- ✅ Filter records
- ✅ Create/edit/delete records
- ✅ Manage users

## Quick Login (Demo)

The login page includes quick login buttons for testing:

- **Admin**: admin@test.com / admin123
- **Analyst**: analyst@test.com / analyst123
- **Viewer**: viewer@test.com / viewer123

## API Integration

The frontend communicates with the backend API through Axios. The base URL is configured in `vite.config.ts` as a proxy:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

All API requests automatically include the JWT token from localStorage.

## Authentication Flow

1. User enters credentials on login page
2. Frontend sends POST request to `/api/auth/login`
3. Backend returns JWT token and user data
4. Token and user data stored in localStorage
5. Token included in all subsequent API requests
6. On 401 response, user is redirected to login

## State Management

- **Authentication**: React Context API (`AuthContext`)
- **Component State**: React useState hooks
- **No Redux**: Kept simple for this project size

## Styling Approach

- Custom CSS (no framework like Tailwind or Material-UI)
- CSS Modules pattern (component-specific CSS files)
- Responsive design with CSS Grid and Flexbox
- Modern gradient backgrounds
- Smooth transitions and hover effects

## Charts and Visualizations

Using Recharts library for:
- Line charts (monthly trends)
- Pie charts (category distribution)
- Bar charts (category breakdown)

## Error Handling

- API errors displayed as alerts
- 401 errors trigger automatic logout
- Form validation on all inputs
- Loading states for async operations

## Responsive Design

- Mobile-friendly layout
- Responsive tables
- Adaptive grid layouts
- Touch-friendly buttons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

No environment variables needed. API URL is proxied through Vite.

## Deployment

### Option 1: Static Hosting (Netlify, Vercel)

```bash
npm run build
# Deploy the dist/ folder
```

Update `vite.config.ts` to use production API URL:

```typescript
export default defineConfig({
  // ... other config
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://your-api.com')
  }
})
```

### Option 2: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]
```

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Export data to CSV/PDF
- [ ] Advanced filtering options
- [ ] Pagination for large datasets
- [ ] Real-time updates with WebSocket
- [ ] Offline support with Service Workers
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright

## License

MIT
