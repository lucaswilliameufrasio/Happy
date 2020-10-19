import { LoadOrphanagesByStatusController } from './load-orphanages-by-status-controller'
import { HttpRequest, ok, noContent, serverError } from './load-orphanages-by-status-controller-protocols'
import { LoadOrphanagesByStatusSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
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

  test('Should return 200 on success', async () => {
    const { sut, loadOrphanagesByStatusSpy } = makeSut()

    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(loadOrphanagesByStatusSpy.orphanageModel))
  })

  test('Should return 204 if LoadOrphanagesByStatus return empty', async () => {
    const { sut, loadOrphanagesByStatusSpy } = makeSut()

    loadOrphanagesByStatusSpy.orphanageModel = []
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadOrphanagesByStatus throws', async () => {
    const { sut, loadOrphanagesByStatusSpy } = makeSut()
    jest.spyOn(loadOrphanagesByStatusSpy, 'loadByStatus').mockImplementationOnce(throwError)

    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
