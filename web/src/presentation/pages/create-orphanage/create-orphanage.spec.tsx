import React from 'react'
import faker from 'faker'
import {
  RenderResult,
  render,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import CreateOrphanage from './create-orphanage'
import {
  AddOrphanageSpy,
  Helper,
  ValidationStub,
  MockFormMap
} from '@/presentation/test'
import FormMap from '@/presentation/components/form-map/form-map'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

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
      <CreateOrphanage
        validation={validationStub}
        addOrphanage={addOrphanageSpy}
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
  images = [faker.random.word()],
  instructions = faker.random.words(),
  openingHours = faker.random.words()
): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'about', about)
  Helper.populateField(sut, 'whatsapp', whatsapp)
  Helper.populateFilesField(sut, 'images', images)
  Helper.populateField(sut, 'instructions', instructions)
  Helper.populateField(sut, 'openingHours', openingHours)
  const openOnWeekend = sut.getByTestId('openOnWeekend')
  fireEvent.click(openOnWeekend.lastChild)

  const positionMap = sut.getByTestId('position')
  fireEvent.click(positionMap.firstChild)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

jest.mock('@/presentation/components/form-map/form-map', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}))

let expectedLatitude: number
let expectedLongitude: number

describe('CreateOrphanage component', () => {
  beforeEach(() => {
    expectedLatitude = Number(faker.address.latitude())
    expectedLongitude = Number(faker.address.longitude())
  })

  beforeEach(() => {
    (FormMap as jest.Mock<JSX.Element>).mockImplementation(
      MockFormMap(expectedLatitude, expectedLongitude)
    )
  })

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

  test('Should call AddOrphanage with correct values', async () => {
    const { sut, addOrphanageSpy } = makeSut()

    const name = faker.random.words()
    const about = faker.random.words()
    const whatsapp = faker.phone.phoneNumber()
    const images = [faker.random.word()]
    const instructions = faker.random.words()
    const openingHours = faker.random.words()

    const position = {
      latitude: expectedLatitude,
      longitude: expectedLongitude
    }

    await simulateValidSubmit(
      sut,
      name,
      about,
      whatsapp,
      images,
      instructions,
      openingHours
    )

    expect(addOrphanageSpy.params).toEqual({
      name,
      about,
      whatsapp,
      images,
      instructions,
      opening_hours: openingHours,
      open_on_weekend: false,
      latitude: position.latitude,
      longitude: position.longitude
    })
  })

  test('Should call AddOrphanage only once', async () => {
    const { sut, addOrphanageSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(addOrphanageSpy.callsCount).toBe(1)
  })

  test('Should not call AddOrphanage if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addOrphanageSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)

    expect(addOrphanageSpy.callsCount).toBe(0)
  })

  test('Should present error if AddOrphanage fails', async () => {
    const { sut, addOrphanageSpy } = makeSut()
    const error = new UnexpectedError()
    jest.spyOn(addOrphanageSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)

    Helper.testElementText(sut, 'main-error', error.message)
  })

  test('Should go to CreateOrphanagesSuccess on success', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)

    expect(history.location.pathname).toBe('/orphanages/add/success')
  })
})
