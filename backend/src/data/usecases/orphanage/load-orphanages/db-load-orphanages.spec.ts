import { DbLoadOrphanages } from './db-load-orphanages'
import { LoadOrphanagesRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'

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

  test('Should throw if LoadOrphanagesRepository throws', async () => {
    const { sut, loadOrphanagesRepositorySpy } = makeSut()
    jest.spyOn(loadOrphanagesRepositorySpy, 'load').mockImplementationOnce(throwError)

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
