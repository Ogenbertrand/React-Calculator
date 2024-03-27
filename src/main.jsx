import { registerSW } from 'virtual:pwa-register'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
const intervalMS = 60 * 60 * 1000

const updateSW = registerSW({
  onRegisteredSW(swUrl, r) {
    r && setInterval(async () => {
      if (!(!r.installing && navigator))
        return

      if (('connection' in navigator) && !navigator.onLine)
        return

      const resp = await fetch(swUrl, {
        cache: 'no-store',
        headers: {
          'cache': 'no-store',
          'cache-control': 'no-cache',
        },
      })

      if (resp?.status === 200)
        await r.update()
    }, intervalMS)
  }
})
