# Quick Deployment Checklist ✅

## 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## 2. Deploy Backend (Render.com)

1. Go to https://render.com
2. New + → Web Service
3. Connect GitHub repo
4. Settings:
   - Name: `loveconnect-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - **Instance Type: FREE** ⭐
5. Deploy!
6. **Copy your backend URL** (like: `https://loveconnect-backend.onrender.com`)

## 3. Deploy Frontend (Netlify.com)

1. Go to https://netlify.com
2. Add new site → Import from Git
3. Connect GitHub repo
4. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Add Environment Variable**:
   - Key: `VITE_BACKEND_URL`
   - Value: `https://loveconnect-backend.onrender.com` (from step 2.6)
6. Deploy!
7. **Share your frontend URL** with your girlfriend! 💕

## Done! 🎉

Your app is live and completely FREE!

**Note**: Backend might take 30 seconds to wake up on first use after inactivity (Render free tier limitation).
