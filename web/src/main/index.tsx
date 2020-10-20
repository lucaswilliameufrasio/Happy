import React from 'react'
import ReactDOM from 'react-dom'
import { Routes } from '@/presentation/components'

import 'leaflet/dist/leaflet.css'
import '@/presentation/styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
)
