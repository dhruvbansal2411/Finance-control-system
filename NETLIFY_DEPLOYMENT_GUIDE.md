# Netlify Deployment Guide - WORKING SOLUTION

## 🔍 Issue Identified

Your project is a **monorepo** with:
- Backend in root directory (`src/`)
- Frontend in `frontend/` subdirectory

Netlify was trying to build from the root, but the React app is in `frontend/`.

## ✅ Solution Applied

Created `netlify.toml` configuration file with correct settings.

---

## 📋 Deployment Configuration

### Build Command
```bash
cd frontend && npm install && npm run build
```

### Publish Directory
```
frontend/dist
```

### Base Directory
```
/
```

---

## 🚀 Step-by-Step Deployment Instructions

### Option 1: Deploy via Netlify UI (Recommended)

1. **Login to Netlify**
   - Go to https://app.netlify.com
   - Login with your GitHub account

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository: `dhruvbansal2411/finance-access-control-system`

3. **Configure Build Settings**
   
   Netlify should automatically detect the `netlify.toml` file. Verify these settings:
   
   - **Base directory**: Leave empty or set to `/`
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Node version**: 18

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (2-3 minutes)

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Build command: cd frontend && npm install && npm run build
# - Publish directory: frontend/dist

# Deploy
netlify deploy --prod
```

---

## ⚙️ Configuration Files

### netlify.toml (Already Created)
```toml
[build]
  command = "cd frontend && npm install && npm run build"
  publish = "frontend/dist"
  base = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"
```

### What This Does:
- **command**: Navigates to frontend folder, installs dependencies, and builds
- **publish**: Tells Netlify where the built files are located
- **redirects**: Enables React Router (SPA routing)
- **NODE_VERSION**: Ensures Node 18 is used
- **NPM_FLAGS**: Handles any peer dependency warnings

---

## 🔧 Important Notes

### 1. Frontend-Only Deployment

**Netlify deploys ONLY the frontend** (static React app). The backend needs separate deployment.

### 2. Backend Deployment Options

Your backend (Node.js + Express) needs to be deployed separately:

**Option A: Render.com** (Recommended for backend)
- Free tier available
- Supports Node.js + SQLite
- Easy GitHub integration

**Option B: Railway.app**
- Free tier available
- Automatic deployments

**Option C: Heroku**
- Paid plans only now

**Option D: DigitalOcean App Platform**
- $5/month minimum

### 3. Environment Variables

After deploying the backend, you need to update the frontend to point to it:

**In Netlify Dashboard:**
1. Go to Site settings → Environment variables
2. Add: `VITE_API_URL` = `https://your-backend-url.com`

**Then update** `frontend/src/api/axios.ts`:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
})
```

### 4. CORS Configuration

Update your backend (`src/app.ts`) to allow requests from Netlify:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-netlify-site.netlify.app'
  ]
}))
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site builds successfully (check Netlify build logs)
- [ ] Site is accessible at the Netlify URL
- [ ] React Router works (navigate between pages)
- [ ] No 404 errors on page refresh
- [ ] Static assets load correctly (CSS, images)

---

## 🐛 Troubleshooting

### Build Fails: "Command not found"

**Solution**: Netlify.toml is configured correctly. Make sure it's committed to GitHub.

```bash
git add netlify.toml
git commit -m "Add Netlify configuration"
git push
```

### Build Fails: "npm install failed"

**Solution**: Check `frontend/package.json` for any issues. The configuration includes `--legacy-peer-deps` flag.

### 404 on Page Refresh

**Solution**: The redirect rule in `netlify.toml` handles this. Make sure it's deployed.

### API Calls Fail (CORS errors)

**Solution**: 
1. Deploy backend separately
2. Update CORS settings in backend
3. Set `VITE_API_URL` environment variable in Netlify

### Build Takes Too Long

**Solution**: Normal for first build. Subsequent builds use cache and are faster.

---

## 📊 Expected Build Output

```
Build command: cd frontend && npm install && npm run build
Build directory: frontend/dist

✓ Dependencies installed
✓ TypeScript compiled
✓ Vite build completed
✓ Assets optimized
✓ Build artifacts: frontend/dist/

Deploy successful!
```

---

## 🔄 Continuous Deployment

Once configured, Netlify automatically:
- Rebuilds on every push to `main` branch
- Creates preview deployments for pull requests
- Provides unique URLs for each deployment

---

## 📝 Summary

### What Was Fixed:
1. ✅ Created `netlify.toml` with correct build configuration
2. ✅ Set build command to navigate to frontend directory
3. ✅ Set publish directory to `frontend/dist`
4. ✅ Added SPA redirect rules for React Router
5. ✅ Configured Node.js version

### Final Configuration:
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Node Version**: 18
- **Redirects**: Enabled for SPA routing

### Next Steps:
1. Commit and push `netlify.toml` to GitHub
2. Deploy on Netlify (will work automatically)
3. Deploy backend separately (Render/Railway)
4. Connect frontend to backend via environment variables

---

## 🎯 Quick Deploy Commands

```bash
# 1. Commit the configuration
git add netlify.toml frontend/.env.example NETLIFY_DEPLOYMENT_GUIDE.md
git commit -m "Add Netlify deployment configuration"
git push

# 2. Deploy on Netlify
# Go to https://app.netlify.com and import your GitHub repo
# Netlify will automatically use the netlify.toml configuration

# 3. Done! Your frontend will be live in 2-3 minutes
```

---

## 🆘 Need Help?

If deployment still fails:
1. Check Netlify build logs for specific errors
2. Verify `netlify.toml` is in the root directory
3. Ensure `frontend/package.json` has correct dependencies
4. Check Node version compatibility

Your frontend deployment should now work perfectly! 🚀
