import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Landing, OrphanagesMap } from '@/presentation/pages'

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
