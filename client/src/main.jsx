import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if(window.self != window.top){
  alert("Iframe involved")
  throw new Error("Iframe detected!! There was an error in loading application")
}else{
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)}
