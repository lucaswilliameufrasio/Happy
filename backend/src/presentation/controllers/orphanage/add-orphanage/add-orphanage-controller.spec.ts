import { AddOrphanageController } from './add-orphanage-controller'
import { HttpRequest, badRequest, serverError, created } from './add-orphanage-controller-protocols'
import { ValidationSpy, AddOrphanageSpy } from '@/presentation/test'
import { MissingParamError } from '@/presentation/errors'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => {
  const fileName = faker.random.word()
  return {
    body: {
      name: faker.name.findName(),
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
      whatsapp: faker.phone.phoneNumber(),
      about: faker.random.words(),
      instructions: faker.random.words(),
      opening_hours: faker.random.words(),
      open_on_weekend: faker.random.boolean(),
      approved: faker.random.boolean()
    },
    files: [{
      filename: fileName
    }]
  }
}

type SutTypes = {
  sut: AddOrphanageController
  validationSpy: ValidationSpy
  addOrphanageSpy: AddOrphanageSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addOrphanageSpy = new AddOrphanageSpy()
  const sut = new AddOrphanageController(validationSpy, addOrphanageSpy)

  return {
    sut,
    validationSpy,
    addOrphanageSpy
  }
}

describe('AddOrphanage Controller', () => {
  test('Shoud call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    const fields = { ...httpRequest.body, images: httpRequest.files }

    expect(validationSpy.input).toEqual(fields)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()

    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddOrphanage with correct values', async () => {
    const { sut, addOrphanageSpy } = makeSut()

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    const httpRequestValues = { ...httpRequest.body, images: httpRequest.files }
    delete Object.assign(httpRequestValues.images[0], { name: httpRequestValues.images[0].filename }).filename

    expect(addOrphanageSpy.addOrphanageParams).toEqual(httpRequestValues)
  })

  test('Should return 500 if AddOrphanage throws', async () => {
    const { sut, addOrphanageSpy } = makeSut()
    jest.spyOn(addOrphanageSpy, 'add').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return an orphanage on success', async () => {
    const { sut, addOrphanageSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(created(addOrphanageSpy.orphanageModel))
  })
})
