import { DbAddOrphanage } from './db-add-orphanage'
import { AddOrphanageRepositorySpy, StorageServiceSpy } from '@/data/test'
import { throwError } from '@/domain/test'
import { mockAddOrphanageParams } from '@/domain/test/mock-orphanage'

type SutTypes = {
  sut: DbAddOrphanage
  addOrphanageRepositorySpy: AddOrphanageRepositorySpy
  storageServiceSpy: StorageServiceSpy
}

const makeSut = (): SutTypes => {
  const addOrphanageRepositorySpy = new AddOrphanageRepositorySpy()
  const storageServiceSpy = new StorageServiceSpy()
  const sut = new DbAddOrphanage(addOrphanageRepositorySpy, storageServiceSpy)

  return {
    sut,
    addOrphanageRepositorySpy,
    storageServiceSpy
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
      opening_hours: addOrphanageParams.opening_hours,
      open_on_weekend: addOrphanageParams.open_on_weekend,
      approved: addOrphanageParams.approved,
      images: addOrphanageParams.images
    })
  })

  test('Should throw if AddOrphanageRepository throws', async () => {
    const { sut, addOrphanageRepositorySpy } = makeSut()

    jest.spyOn(addOrphanageRepositorySpy, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddOrphanageParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should return an orphanage without images url', async () => {
    const { sut, addOrphanageRepositorySpy, storageServiceSpy } = makeSut()

    storageServiceSpy.url = null
    const addOrphanageParams = mockAddOrphanageParams()
    const orphanage = await sut.add(addOrphanageParams)

    expect(orphanage).toEqual(addOrphanageRepositorySpy.orphanageModel)
    expect(orphanage.images[0].url).toBeUndefined()
  })

  test('Should return an orphanage on success', async () => {
    const { sut, addOrphanageRepositorySpy, storageServiceSpy } = makeSut()

    const addOrphanageParams = mockAddOrphanageParams()
    const orphanage = await sut.add(addOrphanageParams)
    const orphanageImageName = orphanage.images[0].name

    expect(orphanage).toEqual(addOrphanageRepositorySpy.orphanageModel)
    expect(orphanage.images[0].url).toEqual(`${storageServiceSpy.url}/${orphanageImageName}`)
  })
})
