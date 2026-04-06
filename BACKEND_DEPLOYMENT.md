# Backend Deployment Guide

Your frontend is deployed on Vercel, but the backend needs to be deployed separately because it uses SQLite (which requires persistent storage).

## Option 1: Deploy Backend on Render (Recommended - Free)

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `Finance-control-system`
4. Configure the service:
   - **Name**: finance-backend
   - **Root Directory**: Leave empty (uses root)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build && npm run seed`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add environment variables:
   - `JWT_SECRET`: any random string (e.g., `your-super-secret-jwt-key-12345`)
   - `PORT`: 3000
   - `NODE_ENV`: production

6. Click "Create Web Service"

7. Once deployed, copy your backend URL (e.g., `https://finance-backend-xxxx.onrender.com`)

8. Go to your Vercel project settings → Environment Variables
9. Add: `VITE_API_URL` = `https://finance-backend-xxxx.onrender.com/api`

10. Redeploy your Vercel frontend

## Option 2: Deploy Backend on Railway

1. Go to https://railway.app and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Build Command**: `npm install && npm run build && npm run seed`
   - **Start Command**: `npm start`
   
5. Add environment variables (same as above)
6. Copy the generated URL and add to Vercel as `VITE_API_URL`

## Option 3: Run Backend Locally (For Testing)

1. Keep your backend running locally: `npm run dev`
2. Use ngrok to expose it: `ngrok http 3000`
3. Copy the ngrok URL and add to Vercel as `VITE_API_URL`

## Test Credentials

After backend is deployed and seeded:
- Admin: `admin@example.com` / `admin123`
- Analyst: `analyst@example.com` / `analyst123`
- Viewer: `viewer@example.com` / `viewer123`
