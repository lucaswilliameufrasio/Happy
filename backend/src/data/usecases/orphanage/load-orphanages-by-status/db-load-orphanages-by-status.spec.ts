import { DbLoadOrphanagesByStatus } from './db-load-orphanages-by-status'
import { LoadOrphanagesByStatusRepositorySpy } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadOrphanagesByStatus
  loadOrphanagesByStatusRepositorySpy: LoadOrphanagesByStatusRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadOrphanagesByStatusRepositorySpy = new LoadOrphanagesByStatusRepositorySpy()
  const sut = new DbLoadOrphanagesByStatus(loadOrphanagesByStatusRepositorySpy)

  return {
    sut,
    loadOrphanagesByStatusRepositorySpy
  }
}

describe('DbLoadOrphanagesByStatus UseCase', () => {
  test('Should call LoadOrphanagesByStatusRepository with correct value', async () => {
    const { sut, loadOrphanagesByStatusRepositorySpy } = makeSut()

    const approved = faker.random.boolean()
    await sut.loadByStatus(approved)

    expect(loadOrphanagesByStatusRepositorySpy.approved).toBe(approved)
  })
})
