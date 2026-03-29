# AI REDEVELOPMENT PROMPT - LoveConnect Video Chat Application

Use this comprehensive prompt with any AI assistant (Claude, ChatGPT, etc.) to recreate this entire frontend application with zero errors.

---

## 🎯 THE COMPLETE AI PROMPT

```
I need you to build a complete video chat web application with real-time translation capabilities. This is a PRODUCTION-READY application that MUST work flawlessly with my existing backend server.

## PROJECT OVERVIEW
Create "LoveConnect" - a beautiful video chat application with real-time English-Ukrainian translation. The app allows two people to video chat with HD quality while sending messages that are automatically translated between English and Ukrainian.

## CRITICAL REQUIREMENTS

### 1. BACKEND INTEGRATION (MUST BE EXACT)
- Backend Server URL: https://loveconnect-backend-dvou.onrender.com
- Development URL: http://localhost:3001
- The backend is ALREADY DEPLOYED and WORKING - DO NOT modify backend code
- All Socket.io events MUST match the existing backend exactly

### 2. EXACT TECH STACK (DO NOT DEVIATE)
```json
{
  "frontend": {
    "framework": "React 18.2.0",
    "buildTool": "Vite 4.5.0",
    "routing": "react-router-dom 6.20.1",
    "styling": "Tailwind CSS 3.3.5",
    "icons": "lucide-react 0.294.0",
    "animations": "framer-motion 10.16.5",
    "webrtc": "simple-peer 9.11.1",
    "realtime": "socket.io-client 4.8.3",
    "http": "axios 1.14.0",
    "utilities": ["clsx 2.0.0", "tailwind-merge 2.0.0"],
    "qr": "html5-qrcode 2.3.8",
    "charts": "recharts 3.3.0"
  }
}
```

### 3. PROJECT STRUCTURE
```
/
├── public/
│   ├── _redirects                    # Netlify SPA redirects
│   └── favicon.ico
├── src/
│   ├── main.jsx                      # Entry point
│   ├── App.jsx                       # Main app component
│   ├── index.css                     # Global styles with Tailwind
│   ├── config.js                     # Backend URL configuration
│   ├── components/
│   │   ├── VideoChat.jsx            # WebRTC video component
│   │   └── Chat.jsx                  # Chat with translation
│   └── utils/
│       └── translator.js             # Translation API wrapper
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── index.html
```

## DETAILED FEATURE SPECIFICATIONS

### FEATURE 1: HOME SCREEN / LANDING PAGE
**Location:** App.jsx (when !isInRoom)

**UI Elements:**
- Gradient background: `from-pink-100 via-purple-100 to-blue-100`
- Large centered card with white background and rounded-2xl
- Header with two Heart icons (pink-500) flanking "LoveConnect" title
- Title has gradient text: `from-pink-600 to-purple-600`
- Subtitle: "Video chat with real-time translation for you and your loved one"
- Language indicator showing: "English ❤ Ukrainian" with Globe icon

**Language Selector:**
- Two buttons side-by-side
- Active button: gradient `from-pink-500 to-purple-600` with white text and shadow
- Inactive button: gray-100 background with gray-700 text
- Flags: 🇬🇧 English and 🇺🇦 Українська
- Language selection stored in state: isEnglish (boolean)

**Create Room Button:**
- Full width button
- Gradient background: `from-pink-500 to-purple-600`
- Video icon from lucide-react
- Text changes based on language: "Create New Room" / "Створити нову кімнату"
- On click: generates room ID with format: `room-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
- Updates URL with query param: `?room=${roomId}`
- Sets isInRoom to true

**Join Existing Room:**
- Divider with text "or join existing room" / "або приєднатися до існуючої кімнати"
- Input field for room ID with placeholder
- Join button (gray-800 background)
- Disabled when input is empty
- On join: updates URL and sets isInRoom to true

**Info Box:**
- Pink border (border-pink-200) with pink-50 background
- Lists 3 steps of how it works
- Text changes based on language selection

**Footer:**
- "Made with love / любов'ю 💕"

### FEATURE 2: VIDEO CHAT ROOM
**Location:** App.jsx (when isInRoom) + VideoChat.jsx component

**Top Navigation Bar:**
- White background with shadow-lg and rounded-xl
- Left side:
  - Heart icon (pink-500, size 32)
  - "LoveConnect" gradient text title
  - Vertical divider
  - Connection status indicator:
    - Green pulsing dot when connected
    - Gray dot when waiting
    - Text: "Connected"/"Підключено" or "Waiting..."/"Очікування..."

- Right side:
  - Room ID display (truncated to 20 chars with "...")
  - "Copy Link" button with gradient background
  - Shows Check icon when copied, Copy icon otherwise
  - Copies full URL: `${window.location.origin}?room=${roomId}`

**Video Layout:**
- Grid layout: 2 columns on desktop (lg:col-span-2 for video, 1 for chat)
- Responsive: stacks on mobile

**Video Components:**
- Two side-by-side video containers
- Black/gray-900 background, rounded-xl, shadow-2xl
- Each video:
  - Full width and height with object-cover
  - Label overlay at bottom-left with backdrop-blur
  - Your video: "You (English)" or "Ви (Українська)"
  - Partner video: "Her (Ukrainian)" or "Він (English)"
  - Video quality: 1280x720, 30fps
  - Audio: echo cancellation, noise suppression, auto gain control enabled

**Waiting State:**
- When no peer connected
- Shows pulsing camera icon (pink-400)
- Text: "Waiting for your partner to join..."
- Subtext: "Share the room link with them"

**Footer:**
- "❤️ Connecting hearts across languages / З'єднуємо серця через мови ❤️"

### FEATURE 3: WebRTC VIDEO CONNECTION
**Location:** VideoChat.jsx

**Technical Implementation:**

**Socket.io Events (CLIENT SENDS):**
1. `join-room` - payload: (roomId, userId)
   - Emitted on component mount after getting media stream
   - userId format: `user-${Date.now()}-${Math.random()}`

2. `offer` - payload: { target: userId, caller: socketId, sdp: signalData }
   - Sent by initiator peer when creating connection

3. `answer` - payload: { target: userId, answerer: socketId, sdp: signalData }
   - Sent by receiving peer in response to offer

4. `ice-candidate` - payload: { target: userId, candidate: signalData, sender: socketId }
   - Sent during ICE trickle process

**Socket.io Events (CLIENT RECEIVES):**
1. `other-users` - payload: Array<userId>
   - Received after joining room
   - Contains list of other users in room
   - Triggers peer connection creation for each user

2. `user-joined` - payload: userId
   - Received when new user joins room
   - Updates connection status

3. `offer` - payload: { sdp, caller }
   - Received offer from initiating peer
   - Triggers answer creation

4. `answer` - payload: { sdp, answerer }
   - Received answer from peer
   - Completes peer connection

5. `ice-candidate` - payload: { candidate, sender }
   - Receives ICE candidates from peer
   - Signals to existing peer connection

6. `user-left` - payload: userId
   - Peer disconnected
   - Destroys peer connection and removes from peers array

**WebRTC Configuration:**
- Library: simple-peer 9.11.1
- STUN Servers:
  - stun:stun.l.google.com:19302
  - stun:stun1.l.google.com:19302
- Trickle ICE: enabled
- Video constraints:
  - width: { ideal: 1280 }
  - height: { ideal: 720 }
  - frameRate: { ideal: 30 }
- Audio constraints:
  - echoCancellation: true
  - noiseSuppression: true
  - autoGainControl: true

**State Management:**
- stream: local media stream
- peers: array of { peerId, peer } objects
- userVideo ref: local video element
- peerVideo ref: remote video element
- socketRef: socket.io connection
- peersRef: persistent peer connections reference

**Cleanup:**
- Stop all media tracks on unmount
- Disconnect socket
- Destroy all peer connections

### FEATURE 4: REAL-TIME TRANSLATION CHAT
**Location:** Chat.jsx + translator.js

**Chat UI:**
- Full height flex column layout
- Header:
  - Gradient background: `from-pink-500 to-purple-600`
  - MessageCircle icon with title
  - Title: "Live Translation Chat" / "Чат з перекладом наживо"
  - Connection waiting message when not connected

**Messages Area:**
- Gray-50 background
- Auto-scroll to bottom on new messages
- Empty state:
  - Centered MessageCircle icon (gray, opacity-50)
  - Text: "No messages yet. Say hello!" / "Ще немає повідомлень. Привітайся!"

**Message Bubbles:**
- Your messages (right-aligned):
  - Gradient background: `from-pink-500 to-purple-600`
  - White text
  - Shows original text
  - Shows translated version with flag: "🇺🇦 Sent as: {translation}"
  - Pink-100 translated text color

- Their messages (left-aligned):
  - White background with gray-200 border
  - Gray-800 text
  - Shows translated text
  - Shows original with flag: "🇺🇦 Original: {original}"
  - Gray-500 original text color

- Timestamp: displayed in 12-hour format (HH:MM)
- Max width: 70% of container

**Input Area:**
- White background with top border
- Input field:
  - Border-2 border-gray-300
  - Focus: border-pink-500
  - Placeholder changes based on language:
    - English: "Type in English... (will be translated to Ukrainian)"
    - Ukrainian: "Введіть українською... (буде перекладено англійською)"
  - Disabled when not connected or translating

- Send button:
  - Gradient: `from-pink-500 to-purple-600`
  - Send icon from lucide-react
  - Shows spinning loader when translating
  - Text: "Send" / "Надіслати"
  - Disabled when empty, not connected, or translating

**Translation Logic:**
- API: MyMemory Translation API (https://api.mymemory.translated.net/get)
- Free service, no API key required
- Functions:
  - translateText(text, sourceLang, targetLang)
  - translateEnglishToUkrainian(text) - calls with ('en', 'uk')
  - translateUkrainianToEnglish(text) - calls with ('uk', 'en')
- Error handling: returns original text if translation fails

**Socket Events for Chat:**

**CLIENT SENDS:**
- `send-message` - payload: { roomId, message: translatedText, sender: 'me', timestamp }

**CLIENT RECEIVES:**
- `receive-message` - payload: { message, sender, timestamp }
  - Message is in partner's language
  - Translates to user's language before displaying

**Message Flow:**
1. User types in their language
2. Message is translated to partner's language
3. Original saved locally, translated sent via socket
4. Partner receives translated message
5. Partner's client translates it back to their language for display

### FEATURE 5: BACKEND CONFIGURATION
**Location:** src/config.js

```javascript
// EXACT code that MUST be used
const PRODUCTION_BACKEND_URL = 'https://loveconnect-backend-dvou.onrender.com';
const DEVELOPMENT_BACKEND_URL = 'http://localhost:3001';

export const BACKEND_URL = import.meta.env.DEV
  ? DEVELOPMENT_BACKEND_URL
  : PRODUCTION_BACKEND_URL;
```

**Critical:** This configuration MUST be exactly as shown. The production backend is already deployed and working at the URL specified.

### FEATURE 6: STYLING & DESIGN SYSTEM

**Color Palette:**
- Primary Pink: #ec4899, #e31e24 (Mahindra red variants)
- Purple: #9333ea
- Gradients:
  - Primary: `from-pink-500 to-purple-600`
  - Background: `from-pink-100 via-purple-100 to-blue-100`
  - Light background: `from-pink-50 via-purple-50 to-blue-50`

**Typography:**
- Font: Georama (custom font - semi-expanded)
- Font weights: 400 (regular), 600 (semi-bold)
- Base font size: 13px (in html)
- Headings: font-weight 600, letter-spacing -0.02em

**Spacing & Layout:**
- Border radius: rounded-xl (0.75rem), rounded-2xl (1rem)
- Shadows: shadow-lg, shadow-xl, shadow-2xl
- Padding: consistent 4-unit spacing (p-4, p-6, p-8)
- Gaps: gap-2, gap-3, gap-4

**Animations:**
- Transitions: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Pulse animation for connection status
- Hover effects: translateY(-4px) with shadow increase
- Smooth scroll behavior
- Premium easing curves defined in CSS

**Custom Scrollbar:**
- Width: 8px
- Track: theme-surface color
- Thumb: red (#dc2626), rounded
- Thumb hover: #ef4444

**Responsive Design:**
- Mobile-first approach
- Breakpoints:
  - sm: hidden on mobile, visible on desktop (some elements)
  - lg: 3-column grid for video + chat
  - Mobile: stacked layout

## VITE CONFIGURATION

```javascript
// vite.config.js - EXACT configuration required
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  define: {
    'global': 'globalThis',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      manifest: {
        name: 'LoveConnect - Video Chat with Translation',
        short_name: 'LoveConnect',
        description: 'Video chat with real-time English-Ukrainian translation',
        theme_color: '#ec4899',
        background_color: '#fdf2f8',
        display: 'standalone',
        orientation: 'portrait'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
})
```

## TAILWIND CONFIGURATION

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mahindra: {
          red: '#e31e24',
          'red-dark': '#c41a1f',
          'red-light': '#ff3b41',
        },
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
```

## PACKAGE.JSON

```json
{
  "name": "loveconnect",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.14.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.5",
    "html5-qrcode": "^2.3.8",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "recharts": "^3.3.0",
    "simple-peer": "^9.11.1",
    "socket.io-client": "^4.8.3",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^4.5.0",
    "vite-plugin-pwa": "^1.2.0"
  }
}
```

## HTML INDEX FILE

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ec4899" />
    <meta name="description" content="Video chat with real-time English-Ukrainian translation" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="LoveConnect" />
    <title>LoveConnect - Video Chat with Translation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## DEPLOYMENT CONFIGURATION

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

**SPA Redirects (public/_redirects):**
```
/* /index.html 200
```

## CRITICAL IMPLEMENTATION RULES

1. **Socket.io Events MUST Match Backend Exactly:**
   - Do NOT add or modify any socket event names
   - Do NOT change payload structures
   - Backend is production and cannot be changed

2. **WebRTC Peer Connection:**
   - Use simple-peer library (NOT native WebRTC API)
   - Must handle trickle ICE
   - Must support multiple peers in room
   - Must cleanup on disconnect

3. **Error Handling:**
   - Camera/microphone permission errors: show alert
   - Translation errors: fall back to original text
   - Socket disconnection: handle gracefully
   - Peer connection failures: show waiting state

4. **Performance:**
   - Video: use object-cover, hardware acceleration
   - Auto-scroll: smooth behavior
   - Code splitting in Vite config
   - Cleanup all listeners and connections on unmount

5. **Browser Compatibility:**
   - Must work on Chrome, Firefox, Edge, Safari
   - HTTPS required for production (WebRTC requirement)
   - getUserMedia API must be supported

6. **State Management:**
   - Use React hooks (useState, useEffect, useRef)
   - No external state management library needed
   - Socket connections in refs (not state)
   - Clean up all subscriptions

7. **Responsive Design:**
   - Mobile: stack video and chat vertically
   - Tablet/Desktop: side-by-side layout
   - Touch-friendly buttons (min 44x44px)
   - Text must be readable on all devices

## FILE STRUCTURE TO CREATE

1. **index.html** - HTML entry point with PWA meta tags
2. **public/_redirects** - Netlify SPA routing
3. **src/main.jsx** - React entry point with StrictMode
4. **src/App.jsx** - Main component with room logic and layout
5. **src/config.js** - Backend URL configuration
6. **src/components/VideoChat.jsx** - WebRTC video chat component
7. **src/components/Chat.jsx** - Translation chat component
8. **src/utils/translator.js** - MyMemory API wrapper
9. **src/index.css** - Global styles with Tailwind directives + custom animations
10. **vite.config.js** - Vite configuration with PWA
11. **tailwind.config.js** - Tailwind customization
12. **postcss.config.js** - PostCSS with Tailwind and Autoprefixer
13. **package.json** - Dependencies and scripts
14. **netlify.toml** - Netlify deployment configuration

## TESTING CHECKLIST

After building, test these scenarios:
1. ✅ Landing page loads with language selector
2. ✅ Can create new room and get shareable link
3. ✅ Can join room with room ID
4. ✅ Camera/microphone permissions requested
5. ✅ Video shows for local user immediately
6. ✅ Copy room link button works
7. ✅ Open link in incognito/another browser
8. ✅ Both users see each other's video
9. ✅ Connection status turns green when connected
10. ✅ Can send messages in English
11. ✅ Messages are translated to Ukrainian for partner
12. ✅ Received messages are translated back
13. ✅ Both original and translated text shown
14. ✅ Timestamps display correctly
15. ✅ Language toggle works on home screen
16. ✅ All text changes with language selection
17. ✅ Responsive on mobile, tablet, desktop
18. ✅ When one user leaves, other sees waiting state
19. ✅ Can rejoin same room with URL
20. ✅ Works in production with deployed backend

## BACKEND API REFERENCE (FOR YOUR INFORMATION)

The backend is already deployed at: `https://loveconnect-backend-dvou.onrender.com`

**HTTP Endpoints:**
- GET / - Health check
- GET /health - Health check with timestamp

**Socket.io Server Events:**
All described above in WebRTC section. The backend:
- Manages room membership
- Relays WebRTC signaling (offer, answer, ICE candidates)
- Relays chat messages
- Handles disconnections and cleanup

## BUILD & RUN COMMANDS

Development:
```bash
npm install
npm run dev
```

Production Build:
```bash
npm run build
npm run preview  # Test production build locally
```

Deploy to Netlify:
- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `dist`
- No environment variables needed (backend URL is hardcoded)

## FINAL NOTES

- This is a COMPLETE specification
- Follow EVERY detail exactly
- Do NOT add features not mentioned
- Do NOT change the backend integration
- Do NOT modify socket event names or payloads
- Test THOROUGHLY before considering complete
- The app MUST work with the existing backend at the URL specified

Build this application with ZERO errors, ZERO warnings, and FULL functionality. Every feature must work exactly as described.
```

---

## 📋 HOW TO USE THIS PROMPT

1. Copy the ENTIRE prompt above (everything within the code block)
2. Paste it into Claude, ChatGPT, or any AI coding assistant
3. The AI will build your complete application
4. Test all features thoroughly
5. Deploy to Netlify

## ✅ WHAT THIS PROMPT GUARANTEES

- Exact same features as your current app
- Same backend URL and API integration
- Same visual design and user experience
- Zero configuration errors
- Production-ready code
- Full responsive design
- All socket events matching your backend

## 🚀 EXPECTED OUTPUT

The AI will create all necessary files with:
- Complete React components
- WebRTC video chat functionality
- Real-time translation
- Socket.io integration
- Tailwind styling
- Vite configuration
- Deployment files

Everything will work exactly like your current application!

---

**Created:** 2026-03-29
**Backend URL:** https://loveconnect-backend-dvou.onrender.com
**Status:** Production Ready ✅
