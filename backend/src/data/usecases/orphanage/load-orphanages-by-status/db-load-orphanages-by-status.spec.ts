import { DbLoadOrphanagesByStatus } from './db-load-orphanages-by-status'
import { LoadOrphanagesByStatusRepositorySpy, StorageServiceSpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadOrphanagesByStatus
  loadOrphanagesByStatusRepositorySpy: LoadOrphanagesByStatusRepositorySpy
  storageServiceSpy: StorageServiceSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesByStatusRepositorySpy = new LoadOrphanagesByStatusRepositorySpy()
  const storageServiceSpy = new StorageServiceSpy()
  const sut = new DbLoadOrphanagesByStatus(loadOrphanagesByStatusRepositorySpy, storageServiceSpy)

  return {
    sut,
    loadOrphanagesByStatusRepositorySpy,
    storageServiceSpy
  }
}

describe('DbLoadOrphanagesByStatus UseCase', () => {
  test('Should call LoadOrphanagesByStatusRepository with correct value', async () => {
    const { sut, loadOrphanagesByStatusRepositorySpy } = makeSut()

    const approved = faker.random.boolean()
    await sut.loadByStatus(approved)

    expect(loadOrphanagesByStatusRepositorySpy.approved).toBe(approved)
  })

  test('Should throw if LoadOrphanagesByStatusRepository throws', async () => {
    const { sut, loadOrphanagesByStatusRepositorySpy } = makeSut()
    jest.spyOn(loadOrphanagesByStatusRepositorySpy, 'loadByStatus').mockImplementationOnce(throwError)

    const promise = sut.loadByStatus(faker.random.boolean())

    await expect(promise).rejects.toThrow()
  })

  test('Should return a list of approved Orphanages on success', async () => {
    const { sut, loadOrphanagesByStatusRepositorySpy, storageServiceSpy } = makeSut()

    const orphanages = await sut.loadByStatus(true)
    const orphanageImageName = orphanages[0].images[0].name

    expect(orphanages).toEqual(loadOrphanagesByStatusRepositorySpy.orphanageModel)
    expect(orphanages[0].images[0].url).toEqual(`${storageServiceSpy.url}/${orphanageImageName}`)
  })
})
