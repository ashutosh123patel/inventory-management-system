# 🚀 Render Deployment Guide

## Step 1: Prepare Your Repository
- Commit all changes: `git add . && git commit -m "Prepare for Render deployment"`
- Push to GitHub: `git push origin main`

## Step 2: Set Up Services on Render

### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Blueprint**
3. Connect your GitHub repository
4. Select the repo and branch
5. Render will auto-detect and deploy both services

### Option B: Manual Setup

#### Backend Service
1. Create **New Web Service**
   - **Name**: `inventory-backend`
   - **GitHub repo**: Your repository
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

2. Add Environment Variables (from your `.env`):
   ```
   MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/inventory_db?retryWrites=true&w=majority
   JWT_SECRET = your-secret-key
   FRONTEND_URL = https://your-frontend-url.onrender.com
   NODE_ENV = production
   ```

3. Deploy

#### Frontend Service
1. Create **New Web Service**
   - **Name**: `inventory-frontend`
   - **GitHub repo**: Your repository
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

2. Add Environment Variables:
   ```
   REACT_APP_API_URL = https://inventory-backend.onrender.com/api/v1
   ```

3. Deploy

## Step 3: Verify Deployment

After deployment, test:

```bash
# Test Backend
curl https://your-backend-url.onrender.com

# Test Frontend
# Open https://your-frontend-url.onrender.com in browser
```

## Step 4: Database Connection

Ensure your MongoDB Atlas IP Whitelist includes:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → Add Render's IP or use `0.0.0.0/0` for all IPs

## Important Notes

✅ **What was fixed:**
- `.env` files added to `.gitignore`
- `.env.example` files created for reference
- Backend CORS now accepts production URLs via `FRONTEND_URL` env var
- Frontend API URL uses `REACT_APP_API_URL` env var
- Environment variables properly validated

⚠️ **Before Deploying:**
- Change `JWT_SECRET` to a strong, random string
- Never commit `.env` files to Git
- Test locally first: `npm start` in both backend and frontend

🔧 **Common Issues:**
1. **Connection refused**: Check `MONGO_URI` and IP whitelist
2. **CORS errors**: Verify `FRONTEND_URL` matches frontend domain
3. **API not found**: Check `REACT_APP_API_URL` matches backend URL
4. **Cold starts**: Free Render services may take 30s to wake up