import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '@/presentation/pages/landing/landing'
import OrphanagesMap from '@/presentation/pages/orphanages-map/orphanages-map'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
