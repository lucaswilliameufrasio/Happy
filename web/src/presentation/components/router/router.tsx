import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Landing, OrphanagesMap, Orphanage } from '@/presentation/pages'

type Factory = {
  makeAddOrphanage: () => JSX.Element
}

function Routes (factory: Factory) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanagesMap} />
        <Route path="/orphanages/add" exact component={factory.makeAddOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
