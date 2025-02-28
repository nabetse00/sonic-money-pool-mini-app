import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './config/mockEnvs'

import { init, backButton } from '@telegram-apps/sdk-react';
try {
  // telegram init
  init()
} catch (error) {
  console.error(`error in init is ${error}`)
}
backButton.mount()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
