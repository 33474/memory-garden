import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProcessDashboard from './ProcessDashboard.jsx'
import './styles.css'

const isProcessView = new URLSearchParams(window.location.search).get('view') === 'process'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isProcessView ? <ProcessDashboard /> : <App />}
  </React.StrictMode>,
)
