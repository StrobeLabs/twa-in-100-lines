## Telegram Mini App in 100 Lines (or less)
Build a simple Telegram Mini App with a clicker/counter functionality using React, TypeScript, and the Telegram Web Apps SDK (@twa-dev/sdk), all within approximately 100 lines of code.

This guide will walk you through creating the app, testing it locally using Ngrok, and deploying it.

## Overview
Technologies Used:
- React & TypeScript
- Telegram Web Apps SDK `(@twa-dev/sdk)`
- Ngrok (for local testing)
- Vercel (for deployment)
- BotFather: TG <> Web App Integration

  
Features:
- Displays a welcome message with the user's first name retrieved from Telegram
- Includes a simple clicker/counter.
- Allows the user to close the app.

## Project Structure
```
telegram-mini-app/
├── public/
│   └── ...
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.tsx
│   └── react-app-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
└── ...

```

### `index.tsx`
```
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
```

### `App.tsx`
```
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
```

## Deployment
### 1. Web App Deployment
- Treat TG Web Apps like what it is: a web app. We used React here for simplicity sake but you can also use other web frameworks like NextJS. You can also use firebase for db, etc.
- That being said, you can deploy your web app to Vercel too. Save this deployed URL link for step 2.

### 2. Deployed Web App to TG Integration
Simply follow the following steps:
1. Look up @BotFather (https://t.me/botfather)
2. Type `/newbot`
3. Enter your bot name
4. After completing the registration it should give you the telegram link for accessing the web app (`t.me/<bot_name>`). Clicking on the link should direct you to the bot page
5. Type `/mybots` then select the intended bot to edit
6. Bot Settings > Configure Mini App > Enable Mini App > DEPLOYED_URL_LINK
7. Bot Settings > Menu Button > Configure menu button > DEPLOYED_URL_LINK
8. 🔥 You're finally set! Just navigate to your bot to start interacting.


## Test the App Locally Using Ngrok
Treat TG Web Apps like what it is: a web app. Now, if you are indeed using important TG API SDK data, you can still test your web app locally inside the Telegram Messaging app using this way:


- If you haven't installed Ngrok: Sign up at ngrok.com and follow the installation instructions.
- Run two terminals: (1) run `npm start` to initiate the web app and (2) `ngrok http 3000` (3000 assumes your web locally runs on port 3000) to initiate the web forwarding process.
- ngrok should give you a URL like `https://6190-38-1.....ngrok-free.app`.
- Run inside BotFather: `/mybots` > your_bot > Bot Settings > Menu Button or Mini App (so long as you remember which to press inside the app) > Configure > Give the domain of the ngrok URL.
- After testing locally, make sure to change it back to your deployed URL link.   
NOTE: on some ngrok instances, you might run into the scenario where the WebApp variable/sdk might cause issues during local dev't especially when observing it through a desktop browser. Try to do local dev't inside the TG messaging app as much as possible.




## Resources
- https://blog.octalabs.com/a-beginners-guide-to-telegram-mini-apps-a201cd9d7510
- https://blog.octalabs.com/clicker-app-telegram-mini-apps-part-2-63bbdcf55589
- https://stackoverflow.com/questions/78887200/running-telegram-mini-app-web-app-on-localhost
- https://github.com/twa-dev/SDK

