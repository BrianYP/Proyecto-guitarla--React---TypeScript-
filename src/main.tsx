import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

//assertion not null o non null assertion operation agregando el - !
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

