import React from 'react'
import faker from 'faker'
import { RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
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

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.random.words(),
  about = faker.random.words(),
  whatsapp = faker.phone.phoneNumber(),
  images = [
    faker.internet.avatar()
  ],
  instructions = faker.random.words(),
  openingHours = faker.random.words()
): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'about', about)
  Helper.populateField(sut, 'whatsapp', whatsapp)
  Helper.populateFilesField(sut, 'images', images)
  Helper.populateField(sut, 'instructions', instructions)
  Helper.populateField(sut, 'openingHours', openingHours)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('AddOrphanage component', () => {
  afterEach(cleanup)

  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'name'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show about error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'about'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show whatsapp error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'whatsapp'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show images error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'images'
    const { sut } = makeSut({ validationError })

    Helper.populateFilesField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show instructions error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'instructions'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should show openingHours error if Validation fails', async () => {
    const validationError = faker.random.words()
    const fieldName = 'openingHours'
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testErrorForField(sut, fieldName, validationError)
    Helper.testElementExists(sut, `${fieldName}-error`)
  })

  test('Should not show name error if Validation succeeds', async () => {
    const fieldName = 'name'
    const { sut } = makeSut()

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testElementDoesNotExists(sut, `${fieldName}-error`)
  })

  test('Should not show about error if Validation succeeds', async () => {
    const fieldName = 'about'
    const { sut } = makeSut()

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testElementDoesNotExists(sut, `${fieldName}-error`)
  })

  test('Should not show whatsapp error if Validation succeeds', async () => {
    const fieldName = 'whatsapp'
    const { sut } = makeSut()

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testElementDoesNotExists(sut, `${fieldName}-error`)
  })

  test('Should not show images error if Validation succeeds', async () => {
    const fieldName = 'images'
    const { sut } = makeSut()

    Helper.populateFilesField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testElementDoesNotExists(sut, `${fieldName}-error`)
  })

  test('Should not show instructions error if Validation succeeds', async () => {
    const fieldName = 'instructions'
    const { sut } = makeSut()

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testElementDoesNotExists(sut, `${fieldName}-error`)
  })

  test('Should not show openingHours error if Validation succeeds', async () => {
    const fieldName = 'openingHours'
    const { sut } = makeSut()

    Helper.populateField(sut, fieldName)
    await Helper.simulateSubmit(sut)

    Helper.testElementDoesNotExists(sut, `${fieldName}-error`)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
  })
})
