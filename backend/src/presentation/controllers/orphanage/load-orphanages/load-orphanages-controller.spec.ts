import { LoadOrphanagesController } from './load-orphanages-controller'
import { noContent, ok, serverError } from './load-orphanages-controller-protocols'
import { LoadOrphanagesSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: LoadOrphanagesController
  loadOrphanagesSpy: LoadOrphanagesSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesSpy = new LoadOrphanagesSpy()
  const sut = new LoadOrphanagesController(loadOrphanagesSpy)

  return {
    sut,
    loadOrphanagesSpy
  }
}

describe('LoadOrphanages Controller', () => {
  test('Should call LoadOrphanages', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()

    await sut.handle({})

    expect(loadOrphanagesSpy.calls).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(loadOrphanagesSpy.orphanageModel))
  })

  test('Should return 204 if LoadOrphanages return empty', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()

    loadOrphanagesSpy.orphanageModel = []
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadOrphanages throws', async () => {
    const { sut, loadOrphanagesSpy } = makeSut()
    jest.spyOn(loadOrphanagesSpy, 'load').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
