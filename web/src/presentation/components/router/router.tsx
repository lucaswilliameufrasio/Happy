import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Landing, Orphanage, CreateOrphanageSuccess } from '@/presentation/pages'

type Factory = {
  makeCreateOrphanage: () => JSX.Element
  makeOrphanagesMap: () => JSX.Element
}

function Routes (factory: Factory) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={factory.makeOrphanagesMap} />
        <Route path="/orphanages/add" exact component={factory.makeCreateOrphanage} />
        <Route path="/orphanages/add/success" exact component={CreateOrphanageSuccess} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
