import { UpdateOrphanageController } from './update-orphanage-controller'
import { HttpRequest, serverError, noContent, badRequest, forbidden } from './update-orphanage-controller-protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { LoadOrphanageByIdSpy, UpdateOrphanageSpy, ValidationSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName(),
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    whatsapp: faker.phone.phoneNumber(),
    about: faker.random.words(),
    instructions: faker.random.words(),
    opening_hours: faker.random.words(),
    open_on_weekend: String(faker.random.boolean()),
    approved: false
  },
  params: {
    orphanageId: faker.random.number()
  }
})

type SutTypes = {
  sut: UpdateOrphanageController
  updateOrphanageSpy: UpdateOrphanageSpy
  loadOrphanageByIdSpy: LoadOrphanageByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const updateOrphanageSpy = new UpdateOrphanageSpy()
  const loadOrphanageByIdSpy = new LoadOrphanageByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new UpdateOrphanageController(validationSpy, updateOrphanageSpy, loadOrphanageByIdSpy)

  return {
    sut,
    updateOrphanageSpy,
    loadOrphanageByIdSpy,
    validationSpy
  }
}

describe('UpdateOrphanage Controller', () => {
  test('Shoud call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    const fields = { ...httpRequest.body, orphanageId: httpRequest.params.orphanageId }

    expect(validationSpy.input).toEqual(fields)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()

    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call UpdateOrphanage with correct values', async () => {
    const { sut, updateOrphanageSpy } = makeSut()

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(updateOrphanageSpy.updateOrphanageData).toEqual({ updateData: httpRequest.body, orphanageId: httpRequest.params.orphanageId })
  })

  test('Should return 403 if LoadOrphanageById returns null', async () => {
    const { sut, loadOrphanageByIdSpy } = makeSut()

    loadOrphanageByIdSpy.orphanageModel = null
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('orphanageId')))
  })

  test('Should return 500 if UpdateOrphanage throws', async () => {
    const { sut, updateOrphanageSpy } = makeSut()
    jest.spyOn(updateOrphanageSpy, 'update').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(noContent())
  })
})
