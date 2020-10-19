import { LoadOrphanagesByStatusController } from './load-orphanages-by-status-controller'
import { HttpRequest } from '@/presentation/protocols'
import { LoadOrphanagesByStatusSpy } from '@/presentation/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  query: {
    approvedStatus: faker.random.boolean()
  }
})

type SutTypes = {
  sut: LoadOrphanagesByStatusController
  loadOrphanagesByStatusSpy: LoadOrphanagesByStatusSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesByStatusSpy = new LoadOrphanagesByStatusSpy()
  const sut = new LoadOrphanagesByStatusController(loadOrphanagesByStatusSpy)

  return {
    sut,
    loadOrphanagesByStatusSpy
  }
}

describe('LoadOrphanagesByStatus Controller', () => {
  test('Should call LoadOrphanagesByStatus with correct value', async () => {
    const { sut, loadOrphanagesByStatusSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(loadOrphanagesByStatusSpy.approvedStatus).toBe(httpRequest.query.approvedStatus)
  })
})
