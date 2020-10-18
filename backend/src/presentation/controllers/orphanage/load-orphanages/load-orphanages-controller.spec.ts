import { LoadOrphanagesController } from './load-orphanages-controller'
import { LoadOrphanagesSpy } from '@/presentation/test'
import { ok } from '@/presentation/helpers/http/http-helper'

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
})
