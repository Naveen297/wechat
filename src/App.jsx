import { useState, useEffect } from 'react';
import VideoChat from './components/VideoChat';
import Chat from './components/Chat';
import { Video, Copy, Check, Heart, Globe } from 'lucide-react';

function App() {
  const [roomId, setRoomId] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    if (room) {
      setRoomId(room);
    }
  }, []);

  const createRoom = () => {
    const newRoomId = `room-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    setRoomId(newRoomId);
    window.history.pushState({}, '', `?room=${newRoomId}`);
    setIsInRoom(true);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      window.history.pushState({}, '', `?room=${roomId}`);
      setIsInRoom(true);
    }
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isInRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="text-pink-500" size={48} fill="currentColor" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                LoveConnect
              </h1>
              <Heart className="text-pink-500" size={48} fill="currentColor" />
            </div>
            <p className="text-gray-600 text-lg">
              Video chat with real-time translation for you and your loved one
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Globe size={16} />
              <span>English</span>
              <Heart size={12} fill="currentColor" className="text-pink-400" />
              <span>Ukrainian</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose your language
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEnglish(true)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    isEnglish
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setIsEnglish(false)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    !isEnglish
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇺🇦 Українська
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={createRoom}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Video size={24} />
                {isEnglish ? 'Create New Room' : 'Створити нову кімнату'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  {isEnglish ? 'or join existing room' : 'або приєднатися до існуючої кімнати'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isEnglish ? 'Room ID' : 'ID кімнати'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder={isEnglish ? 'Enter room ID...' : 'Введіть ID кімнати...'}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                />
                <button
                  onClick={joinRoom}
                  disabled={!roomId.trim()}
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isEnglish ? 'Join' : 'Приєднатися'}
                </button>
              </div>
            </div>

            <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-pink-600">💝 {isEnglish ? 'How it works:' : 'Як це працює:'}</strong>
                <br />
                {isEnglish
                  ? '1. Create a room and share the link with your partner\n2. Start video chatting with clear, low-latency video\n3. Send messages - they\'ll be automatically translated!'
                  : '1. Створіть кімнату та поділіться посиланням з партнером\n2. Починайте відеочат з чітким відео та низькою затримкою\n3. Надсилайте повідомлення - вони будуть автоматично перекладені!'}
              </p>
            </div>
          </div>

          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>Made with {isEnglish ? 'love' : 'любов\'ю'} 💕</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="text-pink-500" size={32} fill="currentColor" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                LoveConnect
              </h1>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected
                  ? (isEnglish ? 'Connected' : 'Підключено')
                  : (isEnglish ? 'Waiting...' : 'Очікування...')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-500">{isEnglish ? 'Room ID' : 'ID кімнати'}</p>
              <p className="font-mono text-sm font-medium text-gray-900">{roomId.substring(0, 20)}...</p>
            </div>
            <button
              onClick={copyRoomLink}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center gap-2 font-medium shadow-md"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span className="hidden sm:inline">{isEnglish ? 'Copy Link' : 'Копіювати'}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <VideoChat roomId={roomId} isEnglish={isEnglish} onPeerConnected={setIsConnected} />
          </div>

          <div className="flex flex-col min-h-0">
            <Chat roomId={roomId} isEnglish={isEnglish} isConnected={isConnected} />
          </div>
        </div>

        <div className="text-center mt-4 text-gray-500 text-sm">
          <p>❤️ {isEnglish ? 'Connecting hearts across languages' : 'З\'єднуємо серця через мови'} ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default App;
