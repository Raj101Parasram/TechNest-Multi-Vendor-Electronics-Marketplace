import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App'
import { BrowserRouter } from 'react-router-dom'

import axios from "axios"

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
