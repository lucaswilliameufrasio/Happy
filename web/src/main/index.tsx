import React from 'react'
import ReactDOM from 'react-dom'
import { makeCreateOrphanage, makeOrphanagesMap } from './factories/pages'
import { Routes } from '@/presentation/components'

import 'leaflet/dist/leaflet.css'
import '@/presentation/styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <Routes
      makeCreateOrphanage={makeCreateOrphanage}
      makeOrphanagesMap={makeOrphanagesMap}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
