import { AddOrphanageController } from './add-orphanage-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { ValidationSpy, AddOrphanageSpy } from '@/presentation/test'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
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
    open_on_weekend: faker.random.boolean(),
    approved: faker.random.boolean()
  }
})

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

    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()

    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddOrphanage with correct values', async () => {
    const { sut, addOrphanageSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(addOrphanageSpy.addOrphanageParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddOrphanage throws', async () => {
    const { sut, addOrphanageSpy } = makeSut()
    jest.spyOn(addOrphanageSpy, 'add').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
