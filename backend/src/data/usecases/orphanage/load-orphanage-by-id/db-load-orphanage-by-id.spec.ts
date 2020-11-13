import { DbLoadOrphanageById } from './db-load-orphanage-by-id'
import { LoadOrphanageByIdRepositorySpy, StorageServiceSpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadOrphanageById
  loadOrphanageByIdRepositorySpy: LoadOrphanageByIdRepositorySpy
  storageServiceSpy: StorageServiceSpy
}

const makeSut = (): SutTypes => {
  const loadOrphanageByIdRepositorySpy = new LoadOrphanageByIdRepositorySpy()
  const storageServiceSpy = new StorageServiceSpy()
  const sut = new DbLoadOrphanageById(loadOrphanageByIdRepositorySpy, storageServiceSpy)

  return {
    sut,
    loadOrphanageByIdRepositorySpy,
    storageServiceSpy
  }
}

let orphanageId: number

describe('DbLoadOrphanageById UseCase', () => {
  beforeEach(() => {
    orphanageId = faker.random.number()
  })

  test('Should call LoadOrphanageByIdRepository with correct id', async () => {
    const { sut, loadOrphanageByIdRepositorySpy } = makeSut()

    await sut.loadById(orphanageId)

    expect(loadOrphanageByIdRepositorySpy.id).toBe(orphanageId)
  })

  test('Should throw if LoadOrphanageByIdRepository throws', async () => {
    const { sut, loadOrphanageByIdRepositorySpy } = makeSut()
    jest.spyOn(loadOrphanageByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById(orphanageId)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an Orphanage on success', async () => {
    const { sut, loadOrphanageByIdRepositorySpy, storageServiceSpy } = makeSut()
    const orphanage = await sut.loadById(orphanageId)
    const orphanageImageName = orphanage.images[0].name

    expect(orphanage).toEqual(loadOrphanageByIdRepositorySpy.orphanageModel)
    expect(orphanage.images[0].url).toEqual(`${storageServiceSpy.url}/${orphanageImageName}`)
  })
})
