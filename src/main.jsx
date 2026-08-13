import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Titulo from './Titulo.jsx'


createRoot(document.getElementById('juanpy')).render(
  <StrictMode>
    <Titulo />
    <App />
    <Titulo />
  </StrictMode>,
)
