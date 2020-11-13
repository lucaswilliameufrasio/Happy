import { DbLoadOrphanages } from './db-load-orphanages'
import { LoadOrphanagesRepositorySpy, StorageServiceSpy } from '@/data/test'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadOrphanages
  loadOrphanagesRepositorySpy: LoadOrphanagesRepositorySpy
  storageServiceSpy: StorageServiceSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesRepositorySpy = new LoadOrphanagesRepositorySpy()
  const storageServiceSpy = new StorageServiceSpy()
  const sut = new DbLoadOrphanages(loadOrphanagesRepositorySpy, storageServiceSpy)

  return {
    sut,
    loadOrphanagesRepositorySpy,
    storageServiceSpy
  }
}

describe('DbLoadOrphanages UseCase', () => {
  test('Should call LoadOrphanagesRepository', async () => {
    const { sut, loadOrphanagesRepositorySpy } = makeSut()

    await sut.load()

    expect(loadOrphanagesRepositorySpy.calls).toBe(1)
  })

  test('Should throw if LoadOrphanagesRepository throws', async () => {
    const { sut, loadOrphanagesRepositorySpy } = makeSut()
    jest.spyOn(loadOrphanagesRepositorySpy, 'load').mockImplementationOnce(throwError)

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })

  test('Should return a list of Orphanages on success', async () => {
    const { sut, loadOrphanagesRepositorySpy, storageServiceSpy } = makeSut()
    const orphanages = await sut.load()
    const orphanageImageName = orphanages[0].images[0].name

    expect(orphanages).toEqual(loadOrphanagesRepositorySpy.orphanageModel)
    expect(orphanages[0].images[0].url).toEqual(`${storageServiceSpy.url}/${orphanageImageName}`)
  })
})
