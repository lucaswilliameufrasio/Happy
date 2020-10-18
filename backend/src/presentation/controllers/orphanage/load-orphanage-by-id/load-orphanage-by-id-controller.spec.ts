import { LoadOrphanageByIdController } from './load-orphanage-by-id-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { LoadOrphanageByIdSpy } from '@/presentation/test'
import { ok, serverError, forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/domain/test'
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

  test('Should return 403 if LoadOrphanageById returns null', async () => {
    const { sut, loadOrphanageByIdSpy } = makeSut()

    loadOrphanageByIdSpy.orphanageModel = null
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('orphanageId')))
  })

  test('Should return 500 if LoadOrphanageById throws', async () => {
    const { sut, loadOrphanageByIdSpy } = makeSut()
    jest.spyOn(loadOrphanageByIdSpy, 'loadById').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return an orphanage on success', async () => {
    const { sut, loadOrphanageByIdSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok(loadOrphanageByIdSpy.orphanageModel))
  })
})
