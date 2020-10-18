import { LoadOrphanageByIdController } from './load-orphanage-by-id-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { LoadOrphanageByIdSpy } from '@/presentation/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  params: {
    orphanageId: faker.random.uuid()
  }
})

type SutTypes = {
  sut: LoadOrphanageByIdController
  loadOrphanageByIdSpy: LoadOrphanageByIdSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanageByIdSpy = new LoadOrphanageByIdSpy()
  const sut = new LoadOrphanageByIdController(loadOrphanageByIdSpy)

  return {
    sut,
    loadOrphanageByIdSpy
  }
}

describe('LoadOrphanageById Controller', () => {
  test('Should call LoadOrphanageById with correct id', async () => {
    const { sut, loadOrphanageByIdSpy } = makeSut()

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(loadOrphanageByIdSpy.id).toEqual(httpRequest.params.orphanageId)
  })
})
