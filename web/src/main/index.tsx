import React from 'react'
import ReactDOM from 'react-dom'
import { makeAddOrphanage } from './factories/pages/add-orphanage/add-orphanage-factory'
import { Routes } from '@/presentation/components'

import 'leaflet/dist/leaflet.css'
import '@/presentation/styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <Routes
      makeAddOrphanage={makeAddOrphanage}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
