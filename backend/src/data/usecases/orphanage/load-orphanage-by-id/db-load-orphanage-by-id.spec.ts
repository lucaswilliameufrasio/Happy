import { DbLoadOrphanageById } from './db-load-orphanage-by-id'
import { LoadOrphanageByIdRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadOrphanageById
  loadOrphanageByIdRepositorySpy: LoadOrphanageByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadOrphanageByIdRepositorySpy = new LoadOrphanageByIdRepositorySpy()
  const sut = new DbLoadOrphanageById(loadOrphanageByIdRepositorySpy)

  return {
    sut,
    loadOrphanageByIdRepositorySpy
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

  test('Should return an Orphanage on success', async () => {
    const { sut, loadOrphanageByIdRepositorySpy } = makeSut()
    const orphanage = await sut.loadById(orphanageId)

    expect(orphanage).toEqual(loadOrphanageByIdRepositorySpy.orphanageModel)
  })

  test('Should throw if LoadOrphanageByIdRepository throws', async () => {
    const { sut, loadOrphanageByIdRepositorySpy } = makeSut()
    jest.spyOn(loadOrphanageByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById(orphanageId)

    await expect(promise).rejects.toThrow()
  })
})
