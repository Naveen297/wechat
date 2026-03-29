// Configuration for backend server URL

// Production backend URL (hardcoded for easy deployment)
const PRODUCTION_BACKEND_URL = 'https://loveconnect-backend-dvou.onrender.com';

// Development backend URL
const DEVELOPMENT_BACKEND_URL = 'http://localhost:3001';

// Use production URL if not in development mode
export const BACKEND_URL = import.meta.env.DEV
  ? DEVELOPMENT_BACKEND_URL
  : PRODUCTION_BACKEND_URL;

// You can also override with environment variable if needed
// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? DEVELOPMENT_BACKEND_URL : PRODUCTION_BACKEND_URL);
