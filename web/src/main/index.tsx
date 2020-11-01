import React from 'react'
import ReactDOM from 'react-dom'
import { makeCreateOrphanage } from './factories/pages/create-orphanage/create-orphanage-factory'
import { Routes } from '@/presentation/components'

import 'leaflet/dist/leaflet.css'
import '@/presentation/styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <Routes
      makeCreateOrphanage={makeCreateOrphanage}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
