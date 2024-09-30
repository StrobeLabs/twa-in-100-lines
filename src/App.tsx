// src/App.tsx
import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

declare global {
  interface Window {
    Telegram?: any;
  }
}

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [userFirstName, setUserFirstName] = useState<string>('Guest');

  useEffect(() => {
    // Wait for the Telegram Web Apps script to load
    const checkTelegram = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(checkTelegram);

        WebApp.ready();

        const user = WebApp.initDataUnsafe.user;
        if (user && user.first_name) {
          setUserFirstName(user.first_name);
          WebApp.showAlert(`Hello, ${user.first_name}!`);
        } else {
          WebApp.showAlert('Hello, Guest!');
        }
      }
    }, 100);

    // Clean up the interval on unmount
    return () => clearInterval(checkTelegram);
  }, []);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleClose = () => {
    WebApp.close();
  };

  return (
    <div style={styles.container}>
      <h1>Welcome, {userFirstName}!</h1>
      <p>You have clicked the button:</p>
      <h2 style={styles.h2}>{count} times</h2>
      <button style={styles.button} onClick={handleIncrement}>
        Click Me!
      </button>
      <br /><br />
      <button style={styles.closeButton} onClick={handleClose}>
        Close App
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    color: 'white',
  },
  closeButton: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    border: 'none',
    color: 'black', // Keep this button's text color black for contrast
  },
  h2: {
    color: 'white',
  },
};

export default App;
