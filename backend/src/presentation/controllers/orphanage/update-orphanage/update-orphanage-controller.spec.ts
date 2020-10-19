import { UpdateOrphanageController } from './update-orphanage-controller'
import { HttpRequest, serverError } from './update-orphanage-controller-protocols'
import { UpdateOrphanageSpy } from '@/presentation/test'
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
}

const makeSut = (): SutTypes => {
  const updateOrphanageSpy = new UpdateOrphanageSpy()
  const sut = new UpdateOrphanageController(updateOrphanageSpy)

  return {
    sut,
    updateOrphanageSpy
  }
}

describe('UpdateOrphanage Controller', () => {
  test('Should call UpdateOrphanage with correct values', async () => {
    const { sut, updateOrphanageSpy } = makeSut()

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(updateOrphanageSpy.updateOrphanageData).toEqual({ updateData: httpRequest.body, orphanageId: httpRequest.params.orphanageId })
  })

  test('Should return 500 if UpdateOrphanage throws', async () => {
    const { sut, updateOrphanageSpy } = makeSut()
    jest.spyOn(updateOrphanageSpy, 'update').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
