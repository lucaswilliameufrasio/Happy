import { LoadOrphanagesController } from './load-orphanages-controller'
import { HttpRequest, noContent, ok, serverError, InvalidParamError, forbidden } from './load-orphanages-controller-protocols'
import { LoadOrphanagesSpy, LoadOrphanagesByStatusSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequestWithoutQueryParams = (): HttpRequest => ({
  query: { }
})

const mockRequest = (): HttpRequest => ({
  query: {
    approved: String(faker.random.boolean())
  }
})

type SutTypes = {
  sut: LoadOrphanagesController
  loadOrphanagesSpy: LoadOrphanagesSpy
  loadOrphanagesByStatusSpy: LoadOrphanagesByStatusSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesSpy = new LoadOrphanagesSpy()
  const loadOrphanagesByStatusSpy = new LoadOrphanagesByStatusSpy()
  const sut = new LoadOrphanagesController(loadOrphanagesSpy, loadOrphanagesByStatusSpy)

  return {
    sut,
    loadOrphanagesSpy,
    loadOrphanagesByStatusSpy
  }
}

describe('LoadOrphanages Controller', () => {
  test('Should call LoadOrphanages', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()

    await sut.handle(mockRequestWithoutQueryParams())

    expect(loadOrphanagesSpy.calls).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequestWithoutQueryParams())

    expect(httpResponse).toEqual(ok(loadOrphanagesSpy.orphanageModel))
  })

  test('Should return 204 if LoadOrphanages return empty', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()

    loadOrphanagesSpy.orphanageModel = []
    const httpResponse = await sut.handle(mockRequestWithoutQueryParams())

    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadOrphanages throws', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()
    jest.spyOn(loadOrphanagesSpy, 'load').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequestWithoutQueryParams())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadOrphanagesByStatus with correct value', async () => {
    const { sut, loadOrphanagesByStatusSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    httpRequest.query.approved = httpRequest.query.approved === 'true'

    expect(loadOrphanagesByStatusSpy.approvedStatus).toBe(httpRequest.query.approved)
  })

  test('Should return 403 if approved is not true or false', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      query: {
        approved: 'a'
      }
    })

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('approved')))
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
