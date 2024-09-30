import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Load Telegram Web App script
// Old opinionated way of loading the script
const script = document.createElement('script');
script.src = 'https://telegram.org/js/telegram-web-app.js';
script.async = true;
script.onload = () => {
  // Initialize the root after the script has loaded
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
document.head.appendChild(script);