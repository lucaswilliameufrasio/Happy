import { DbLoadOrphanages } from './db-load-orphanages'
import { LoadOrphanagesRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbLoadOrphanages
  loadOrphanagesRepositorySpy: LoadOrphanagesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesRepositorySpy = new LoadOrphanagesRepositorySpy()
  const sut = new DbLoadOrphanages(loadOrphanagesRepositorySpy)

  return {
    sut,
    loadOrphanagesRepositorySpy
  }
}

describe('DbLoadOrphanages UseCase', () => {
  test('Should call LoadOrphanagesRepository', async () => {
    const { sut, loadOrphanagesRepositorySpy } = makeSut()

    await sut.load()

    expect(loadOrphanagesRepositorySpy.calls).toBe(1)
  })

  test('Should return a list of Orphanages on success', async () => {
    const { sut, loadOrphanagesRepositorySpy } = makeSut()
    const orphanage = await sut.load()

    expect(orphanage).toEqual(loadOrphanagesRepositorySpy.orphanageModel)
  })
})
