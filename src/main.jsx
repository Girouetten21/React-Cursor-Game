import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import './css/Light.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <span class='light x1'></span>
    <span class='light x2'></span>
    <span class='light x3'></span>
    <span class='light x4'></span>
    <span class='light x5'></span>
    <span class='light x6'></span>
    <span class='light x7'></span>
    <span class='light x8'></span>
    <span class='light x9'></span>
  </StrictMode>,
)
