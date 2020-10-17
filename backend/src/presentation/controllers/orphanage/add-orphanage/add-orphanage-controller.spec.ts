import { AddOrphanageController } from './add-orphanage-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { ValidationSpy } from '@/presentation/test'
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
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddOrphanageController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('AddOrphanage Controller', () => {
  test('Shoud call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(validationSpy.input).toEqual(httpRequest.body)
  })
})
