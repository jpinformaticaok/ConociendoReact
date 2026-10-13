import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Titulo from './Components/Titulo/Titulo.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Titulo texto="Conociendo a React" />
    <App />
    <Titulo texto="Instituto Superior N° 20" />
  </StrictMode>,
)
