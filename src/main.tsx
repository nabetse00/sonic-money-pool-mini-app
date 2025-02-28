import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { init } from './init.ts';
import '@telegram-apps/telegram-ui/dist/styles.css';

try {
  const debug = import.meta.env.DEV || import.meta.env.VITE_DEBUG
  // telegram init
  await init(debug)
} catch (error) {
  console.error(`error in init is ${error}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
