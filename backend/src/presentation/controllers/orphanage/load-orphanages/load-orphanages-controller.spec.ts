import { LoadOrphanagesController } from './load-orphanages-controller'
import { LoadOrphanagesSpy } from '@/presentation/test'

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
})
