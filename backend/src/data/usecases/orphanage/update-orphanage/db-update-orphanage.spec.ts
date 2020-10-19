import { DbUpdateOrphanage } from './db-update-orphanage'
import { UpdateOrphanageRepositorySpy } from '@/data/test'
import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'
import { mockUpdateOrphanageParams } from '@/domain/test'

type SutTypes = {
  sut: DbUpdateOrphanage
  updateOrphanageRepositorySpy: UpdateOrphanageRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateOrphanageRepositorySpy = new UpdateOrphanageRepositorySpy()
  const sut = new DbUpdateOrphanage(updateOrphanageRepositorySpy)

  return {
    sut,
    updateOrphanageRepositorySpy
  }
}

let updateOrphanageData: UpdateOrphanageParams

describe('DbUpdateOrphanage UseCase', () => {
  beforeEach(() => {
    updateOrphanageData = mockUpdateOrphanageParams()
  })

  test('Should call UpdateOrphanageRepository with correct values', async () => {
    const { sut, updateOrphanageRepositorySpy } = makeSut()

    await sut.update(updateOrphanageData)

    expect(updateOrphanageRepositorySpy.updateOrphanageData).toBe(updateOrphanageData)
  })
})
