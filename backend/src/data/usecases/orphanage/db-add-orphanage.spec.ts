import { AddOrphanageRepositorySpy } from '@/data/test/mock-db-orphanage'
import { mockAddOrphanageParams } from '@/domain/test/mock-orphanage'
import { DbAddOrphanage } from './db-add-orphanage'

type SutTypes = {
  sut: DbAddOrphanage
  addOrphanageRepositorySpy: AddOrphanageRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOrphanageRepositorySpy = new AddOrphanageRepositorySpy()
  const sut = new DbAddOrphanage(addOrphanageRepositorySpy)

  return {
    sut,
    addOrphanageRepositorySpy
  }
}

describe('DbAddOrphanage UseCase', () => {
  test('Should call AddOrphanageRepository with correct values', async () => {
    const { sut, addOrphanageRepositorySpy } = makeSut()

    const addOrphanageParams = mockAddOrphanageParams()
    await sut.add(addOrphanageParams)

    expect(addOrphanageRepositorySpy.addOrphanageParams).toEqual({
      name: addOrphanageParams.name,
      latitude: addOrphanageParams.latitude,
      longitude: addOrphanageParams.longitude,
      whatsapp: addOrphanageParams.whatsapp,
      about: addOrphanageParams.about,
      instructions: addOrphanageParams.instructions,
      open_on_weekend: addOrphanageParams.open_on_weekend,
      approved: addOrphanageParams.approved
    })
  })
})
