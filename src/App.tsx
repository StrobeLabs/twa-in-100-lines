import React, { useEffect, useState } from 'react';
import WebApp from "@twa-dev/sdk"

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [userFirstName, setUserFirstName] = useState<string>('Guest');

  useEffect(() => {
    WebApp.ready();
    WebApp.showAlert('Hello world!');

    const user = WebApp.initDataUnsafe.user;
    if (user && user.first_name) {
      setUserFirstName(user.first_name);
    }
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
      <h2>{count} times</h2>
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
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  closeButton: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    border: 'none',
  },
};

export default App;
