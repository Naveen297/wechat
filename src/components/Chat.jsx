import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { translateEnglishToUkrainian, translateUkrainianToEnglish } from '../utils/translator';
import { Send, MessageCircle } from 'lucide-react';
import { BACKEND_URL } from '../config';

const Chat = ({ roomId, isEnglish, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socketRef.current = io(BACKEND_URL);

    socketRef.current.emit('join-room', roomId, `chat-user-${Date.now()}`);

    socketRef.current.on('receive-message', async (payload) => {
      const translated = isEnglish
        ? await translateUkrainianToEnglish(payload.message)
        : await translateEnglishToUkrainian(payload.message);

      setMessages(prev => [...prev, {
        text: translated,
        original: payload.message,
        sender: 'them',
        timestamp: payload.timestamp
      }]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, isEnglish]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || !isConnected) return;

    setIsTranslating(true);

    try {
      const translated = isEnglish
        ? await translateEnglishToUkrainian(inputMessage)
        : await translateUkrainianToEnglish(inputMessage);

      const messageData = {
        text: inputMessage,
        translated: translated,
        sender: 'me',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, messageData]);

      socketRef.current.emit('send-message', {
        roomId,
        message: translated,
        sender: 'me',
        timestamp: messageData.timestamp
      });

      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4">
        <div className="flex items-center gap-2 text-white">
          <MessageCircle size={24} />
          <h2 className="text-xl font-bold">
            {isEnglish ? 'Live Translation Chat' : 'Чат з перекладом наживо'}
          </h2>
        </div>
        {!isConnected && (
          <p className="text-pink-100 text-sm mt-2">
            {isEnglish ? 'Waiting for connection...' : 'Очікування з\'єднання...'}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
              <p>{isEnglish ? 'No messages yet. Say hello!' : 'Ще немає повідомлень. Привітайся!'}</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'me'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm md:text-base break-words">{msg.text}</p>
                {msg.translated && (
                  <p className={`text-xs mt-2 pt-2 border-t ${
                    msg.sender === 'me' ? 'border-white/30 text-pink-100' : 'border-gray-200 text-gray-500'
                  }`}>
                    {isEnglish ? '🇺🇦 Sent as: ' : '🇬🇧 Надіслано як: '}{msg.translated}
                  </p>
                )}
                {msg.original && (
                  <p className={`text-xs mt-2 pt-2 border-t ${
                    msg.sender === 'them' ? 'border-gray-200 text-gray-500' : ''
                  }`}>
                    {isEnglish ? '🇺🇦 Original: ' : '🇬🇧 Оригінал: '}{msg.original}
                  </p>
                )}
                <p className={`text-xs mt-1 ${
                  msg.sender === 'me' ? 'text-pink-100' : 'text-gray-400'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              isEnglish
                ? 'Type in English... (will be translated to Ukrainian)'
                : 'Введіть українською... (буде перекладено англійською)'
            }
            disabled={!isConnected || isTranslating}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || !isConnected || isTranslating}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg"
          >
            {isTranslating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <Send size={20} />
                <span className="hidden sm:inline">{isEnglish ? 'Send' : 'Надіслати'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
