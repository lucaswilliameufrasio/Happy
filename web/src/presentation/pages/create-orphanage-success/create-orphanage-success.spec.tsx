import React from 'react'
import { screen ,render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import CreateOrphanageSuccess from './create-orphanage-success'

const history = createMemoryHistory({ initialEntries: ['/orphanages/add/success'] })

const makeSut = (): void => {
  render(
    <Router history={history}>
      <CreateOrphanageSuccess />
    </Router>
  )
}

describe('CreateOrphanageSuccess component', () => {
  test('Should go to Orphanages Map', () => {
    makeSut()
    const button = screen.getByRole('link', { name: /Voltar para o mapa/i })
    fireEvent.click(button)

    expect(history.location.pathname).toBe('/app')
  })
})
