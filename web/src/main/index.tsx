import React from 'react'
import ReactDOM from 'react-dom'
import { makeCreateOrphanage, makeOrphanagesMap, makeOrphanage } from './factories/pages'
import { Routes } from '@/presentation/components'

import 'leaflet/dist/leaflet.css'
import '@/presentation/styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <Routes
      makeCreateOrphanage={makeCreateOrphanage}
      makeOrphanagesMap={makeOrphanagesMap}
      makeOrphanage={makeOrphanage}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
