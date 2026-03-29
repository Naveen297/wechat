# Network Access Setup - Testing on Other Devices

## Your Network Configuration

**Your Computer's Local IP:** `192.168.1.5`

## How to Access from Other Devices

### Step 1: Start Both Servers

Make sure both backend and frontend are running:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
You should see:
```
Server running on port 3001
Local: http://localhost:3001
Network: http://192.168.1.5:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
You should see network URLs like:
```
  ➜  Local:   http://localhost:3002
  ➜  Network: http://192.168.1.5:3002
```

### Step 2: Access from Other Devices

**On your computer:**
- Open: `http://localhost:3002` OR `http://192.168.1.5:3002`

**On other devices (phone, tablet, another computer on same WiFi):**
- Open: `http://192.168.1.5:3002`

**To test with your room:**
- On your computer: Create a room at `http://192.168.1.5:3002`
- On other device: Open `http://192.168.1.5:3002/?room=room-1774759108860-z5s8uoo94`

### Step 3: Share Room Link

When you create a room, the link will look like:
```
http://192.168.1.5:3002/?room=room-XXXXXXXXX
```

Share this exact link with your girlfriend. She can open it on:
- Her phone
- Her computer
- Her tablet
- Any device on the same WiFi network

## Important Notes

✅ **Both devices must be on the same WiFi network**
✅ **Allow camera and microphone permissions when prompted**
✅ **Make sure no firewall is blocking ports 3001 and 3002**

## If Your IP Changes

If your computer's IP address changes, you'll need to:

1. Find new IP:
   ```bash
   ipconfig getifaddr en0
   ```

2. Update `.env.local` file:
   ```
   VITE_BACKEND_URL=http://YOUR_NEW_IP:3001
   ```

3. Restart both servers

## Testing with Phone on Same WiFi

1. Start both servers on your computer
2. On your phone, connect to the same WiFi network
3. Open browser and go to `http://192.168.1.5:3002`
4. Create or join a room
5. You should see yourself in the video!

## For Production Deployment

When you want to deploy this for real use across the internet:
- Deploy backend to a service like Heroku, Railway, or DigitalOcean
- Deploy frontend to Vercel, Netlify, or similar
- Update VITE_BACKEND_URL to your production backend URL
- Both services will need HTTPS for camera/microphone access
