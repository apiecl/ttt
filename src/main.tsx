import React from 'react'
import ReactDOM from 'react-dom/client'
import './ttt.scss'
import { TTTConnect } from './TTTConnect.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TTTConnect />
  </React.StrictMode>,
)
