# LoveConnect - Video Chat with Real-Time Translation

A beautiful video chat application with real-time English-Ukrainian translation, built with love for connecting hearts across languages.

## 🚀 Quick Deploy (100% FREE)

Want to deploy this app? Check out:
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 3-step deployment guide
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed deployment instructions

**Backend**: Render.com (Free) | **Frontend**: Netlify (Free) | **Total Cost**: $0/month

---

## Features

- **HD Video Chat**: Crystal clear video with low latency using WebRTC
- **Real-Time Translation**: Automatic message translation between English and Ukrainian
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth animations
- **Easy Room Management**: Create rooms and share links instantly
- **Connection Status**: Real-time connection indicators
- **Bilingual Interface**: Full support for both English and Ukrainian languages

## How to Run

### 1. Start the Backend Server

```bash
cd backend
npm start
```

The server will run on `http://localhost:3001`

### 2. Start the Frontend

Open a new terminal window and run:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## How to Use

1. **Choose Your Language**: Select English or Ukrainian from the home screen
2. **Create a Room**: Click "Create New Room" to start a new video chat
3. **Share the Link**: Copy the room link and send it to your partner
4. **Start Chatting**: Once your partner joins, you can:
   - See each other in HD video
   - Send messages that are automatically translated
   - See both the original and translated messages

## Technical Details

### Frontend Stack
- React 18
- Vite
- Tailwind CSS
- WebRTC (simple-peer)
- Socket.io Client
- Axios for API calls
- Lucide React for icons

### Backend Stack
- Node.js
- Express
- Socket.io for WebRTC signaling
- CORS enabled

### Translation
- Uses MyMemory Translation API (free, no API key required)
- Supports English ↔ Ukrainian translation

## Video Quality Optimization

The app is configured for optimal video quality:
- Resolution: Up to 1280x720 (HD)
- Frame Rate: 30 fps
- Audio: Echo cancellation, noise suppression, and auto gain control enabled
- Uses Google STUN servers for NAT traversal
- Peer-to-peer connection for minimal latency

## Browser Requirements

- Modern browser with WebRTC support (Chrome, Firefox, Edge, Safari)
- Camera and microphone access
- HTTPS (for production deployment)

## 🌐 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for complete deployment instructions.

**Quick Summary**:
- Backend: Deploy to Render.com (free)
- Frontend: Deploy to Netlify (free)
- Set `VITE_BACKEND_URL` environment variable in Netlify
- Both platforms provide automatic HTTPS

## Made with Love 💕

This project was created to help connect people across language barriers, bringing hearts together through technology.

---

**Note**: Make sure both users grant camera and microphone permissions for the video chat to work properly.
# wechat
