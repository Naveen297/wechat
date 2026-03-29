# LoveConnect - Deployment Guide (100% FREE)

This guide will help you deploy your video chat app for free using Render (backend) and Netlify (frontend).

## Prerequisites

- GitHub account (free)
- Render account (free) - Sign up at https://render.com
- Netlify account (free) - Sign up at https://netlify.com

---

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository (if not already done)

```bash
cd /Users/naveenmalhotra/Documents/Wechat
git init
git add .
git commit -m "Initial commit - LoveConnect video chat app"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository called `loveconnect`
3. Don't initialize with README (you already have code)
4. Copy the repository URL

### 1.3 Push to GitHub

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render (FREE)

### 2.1 Sign Up/Login to Render

1. Go to https://render.com
2. Sign up with your GitHub account (easiest)

### 2.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your `loveconnect` repository

### 2.3 Configure Web Service

Fill in these details:

- **Name**: `loveconnect-backend` (or any name you want)
- **Region**: Choose closest to you
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: **Free** (Important!)

### 2.4 Advanced Settings (Optional)

- **Auto-Deploy**: Yes (recommended)
- **Health Check Path**: `/health`

### 2.5 Deploy!

1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. Once deployed, you'll get a URL like: `https://loveconnect-backend.onrender.com`
4. **COPY THIS URL** - you'll need it for the frontend!

### 2.6 Test Backend

Visit your backend URL in browser:
```
https://loveconnect-backend.onrender.com
```

You should see:
```json
{"status":"ok","message":"LoveConnect Backend is running!"}
```

---

## Step 3: Deploy Frontend to Netlify (FREE)

### 3.1 Sign Up/Login to Netlify

1. Go to https://netlify.com
2. Sign up with your GitHub account

### 3.2 Configure Environment Variable

Before deploying, you need to set your backend URL:

1. Go to Netlify Dashboard
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. **IMPORTANT**: Before clicking deploy, add this:

**Build settings**:
- **Base directory**: Leave empty
- **Build command**: `npm run build`
- **Publish directory**: `dist`

**Environment variables** (Click "Show advanced" → "New variable"):
- **Key**: `VITE_BACKEND_URL`
- **Value**: `https://loveconnect-backend.onrender.com` (Your Render URL from Step 2.5)

### 3.3 Deploy!

1. Click **"Deploy site"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://random-name-123.netlify.app`

### 3.4 (Optional) Custom Domain

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"** if you have one
3. Or click **"Change site name"** to customize the Netlify subdomain
   - Example: `loveconnect-yourname.netlify.app`

---

## Step 4: Test Your Deployed App

### 4.1 Open Your App

Visit your Netlify URL:
```
https://your-site-name.netlify.app
```

### 4.2 Test Video Chat

1. Open the app on your computer
2. Create a new room
3. Copy the room link
4. Open the link on your phone or send to your girlfriend!
5. Both of you should see each other's video and be able to chat with translation!

---

## Important Notes

### Free Tier Limitations

**Render (Backend)**:
- ✅ Free forever
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First connection after inactivity takes ~30 seconds to wake up
- ✅ 750 hours/month free (enough for personal use)

**Netlify (Frontend)**:
- ✅ Free forever for personal projects
- ✅ 100 GB bandwidth/month
- ✅ Instant loading, no spin down
- ✅ Automatic HTTPS

### Camera/Microphone Access

- Both frontend and backend MUST use HTTPS in production
- Render automatically provides HTTPS
- Netlify automatically provides HTTPS
- Browsers only allow camera/microphone on HTTPS sites

---

## Troubleshooting

### Backend shows "Application failed"
- Check Render logs in the dashboard
- Make sure `backend/package.json` has correct start script
- Verify all dependencies are in `dependencies`, not `devDependencies`

### Frontend can't connect to backend
- Check that `VITE_BACKEND_URL` environment variable is set in Netlify
- Make sure you used the HTTPS URL from Render (not HTTP)
- Check browser console for errors

### Video/audio doesn't work
- Make sure both users are on HTTPS
- Grant camera/microphone permissions when prompted
- Check that both users have cameras/microphones working

### Translation not working
- MyMemory API is free but has rate limits
- If you send too many messages quickly, it might fail temporarily
- Wait a minute and try again

---

## Updating Your App

### To update backend:
```bash
git add backend/
git commit -m "Update backend"
git push
```
Render will automatically redeploy!

### To update frontend:
```bash
git add .
git commit -m "Update frontend"
git push
```
Netlify will automatically redeploy!

---

## Your Deployment URLs

After deployment, save these for reference:

- **Frontend URL**: `https://_____.netlify.app`
- **Backend URL**: `https://_____.onrender.com`

Share the frontend URL with your girlfriend!

---

## Cost Summary

- **Backend (Render)**: $0/month ✅
- **Frontend (Netlify)**: $0/month ✅
- **Translation API**: $0/month ✅
- **Domain (Optional)**: ~$10-15/year if you want custom domain

**Total Monthly Cost: $0** 🎉

---

## Need Help?

If you run into issues:
1. Check Render logs (Render Dashboard → Your service → Logs)
2. Check Netlify logs (Netlify Dashboard → Your site → Deploys → Deploy log)
3. Check browser console (F12 → Console tab)

---

Made with love for connecting hearts across languages! ❤️
