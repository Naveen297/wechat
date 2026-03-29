import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { BACKEND_URL } from '../config';

const VideoChat = ({ roomId, isEnglish, onPeerConnected }) => {
  const [stream, setStream] = useState(null);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peerVideo = useRef();
  const socketRef = useRef();
  const peersRef = useRef([]);
  const userId = useRef(`user-${Date.now()}-${Math.random()}`);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(BACKEND_URL);

    // Get user media
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30 }
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      socketRef.current.emit('join-room', roomId, userId.current);

      socketRef.current.on('other-users', (otherUsers) => {
        otherUsers.forEach(otherUserId => {
          const peer = createPeer(otherUserId, socketRef.current.id, stream);
          peersRef.current.push({
            peerId: otherUserId,
            peer
          });
        });
        setPeers(peersRef.current);
        if (otherUsers.length > 0) {
          onPeerConnected(true);
        }
      });

      socketRef.current.on('user-joined', (userId) => {
        // Don't do anything here, wait for offer
        console.log('User joined:', userId);
        onPeerConnected(true);
      });

      socketRef.current.on('offer', (payload) => {
        const peer = addPeer(payload.sdp, payload.caller, stream);
        peersRef.current.push({
          peerId: payload.caller,
          peer
        });
        setPeers(peersRef.current);
      });

      socketRef.current.on('answer', (payload) => {
        const item = peersRef.current.find(p => p.peerId === payload.answerer);
        if (item) {
          item.peer.signal(payload.sdp);
        }
      });

      socketRef.current.on('ice-candidate', (payload) => {
        const item = peersRef.current.find(p => p.peerId === payload.sender);
        if (item) {
          item.peer.signal(payload.candidate);
        }
      });

      socketRef.current.on('user-left', (userId) => {
        const peerIndex = peersRef.current.findIndex(p => p.peerId === userId);
        if (peerIndex !== -1) {
          peersRef.current[peerIndex].peer.destroy();
          peersRef.current.splice(peerIndex, 1);
          setPeers([...peersRef.current]);
          if (peersRef.current.length === 0) {
            onPeerConnected(false);
          }
        }
      });
    }).catch(error => {
      console.error('Error accessing media devices:', error);
      alert('Please allow camera and microphone access to use video chat.');
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      peersRef.current.forEach(({ peer }) => peer.destroy());
    };
  }, [roomId]);

  useEffect(() => {
    if (peers.length > 0 && peers[0].peer && peerVideo.current) {
      peers[0].peer.on('stream', stream => {
        peerVideo.current.srcObject = stream;
      });
    }
  }, [peers]);

  function createPeer(userToSignal, callerId, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      }
    });

    peer.on('signal', signal => {
      socketRef.current.emit('offer', {
        target: userToSignal,
        caller: callerId,
        sdp: signal
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      }
    });

    peer.on('signal', signal => {
      socketRef.current.emit('answer', {
        target: callerId,
        answerer: socketRef.current.id,
        sdp: signal
      });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="flex gap-4 flex-1">
      <div className="relative flex-1 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        <video
          ref={userVideo}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white font-medium">
            {isEnglish ? 'You (English)' : 'Ви (Українська)'}
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        <video
          ref={peerVideo}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white font-medium">
            {isEnglish ? 'Her (Ukrainian)' : 'Він (English)'}
          </p>
        </div>
        {peers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="animate-pulse mb-4">
                <svg className="w-16 h-16 mx-auto text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white text-lg">Waiting for your partner to join...</p>
              <p className="text-gray-400 text-sm mt-2">Share the room link with them</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
