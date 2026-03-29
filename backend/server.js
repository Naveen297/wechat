import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// Health check endpoint for deployment platforms
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'LoveConnect Backend is running!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
  }
});

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(userId);

    const otherUsers = Array.from(rooms.get(roomId)).filter(id => id !== userId);

    socket.emit('other-users', otherUsers);
    socket.to(roomId).emit('user-joined', userId);

    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on('offer', (payload) => {
    io.to(payload.target).emit('offer', {
      sdp: payload.sdp,
      caller: payload.caller
    });
  });

  socket.on('answer', (payload) => {
    io.to(payload.target).emit('answer', {
      sdp: payload.sdp,
      answerer: payload.answerer
    });
  });

  socket.on('ice-candidate', (payload) => {
    io.to(payload.target).emit('ice-candidate', {
      candidate: payload.candidate,
      sender: payload.sender
    });
  });

  socket.on('send-message', (payload) => {
    socket.to(payload.roomId).emit('receive-message', {
      message: payload.message,
      sender: payload.sender,
      timestamp: payload.timestamp
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    rooms.forEach((users, roomId) => {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        socket.to(roomId).emit('user-left', socket.id);

        if (users.size === 0) {
          rooms.delete(roomId);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://192.168.1.5:${PORT}`);
});
