// Configuration for backend server URL
// Change this to your computer's local IP when testing on other devices
// Find your IP: Run "ipconfig getifaddr en0" on Mac or "ipconfig" on Windows

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// For network testing, you can set VITE_BACKEND_URL in .env file or use:
// export const BACKEND_URL = 'http://192.168.1.5:3001';
