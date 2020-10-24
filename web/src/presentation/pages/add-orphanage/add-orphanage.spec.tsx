import React from 'react'
import faker from 'faker'
import { RenderResult, render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AddOrphanageComponent from './add-orphanage'
import { AddOrphanageSpy, Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  addOrphanageSpy: AddOrphanageSpy

}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/orphanages/add'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addOrphanageSpy = new AddOrphanageSpy()
  const sut = render(
    <Router history={history}>
      <AddOrphanageComponent
        validation={validationStub}
      />
    </Router>
  )

  return {
    sut,
    addOrphanageSpy
  }
}

describe('AddOrphanage component', () => {
  afterEach(cleanup)

  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'name'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show about error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'about'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show whatsapp error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'whatsapp'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })
})
