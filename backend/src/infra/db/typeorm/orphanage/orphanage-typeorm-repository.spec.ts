import { OrphanageTypeORMRepository } from './orphanage-typeorm-repository'
import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { mockAddOrphanageParams } from '@/domain/test'
import { createConnection, getConnection } from 'typeorm'
import faker from 'faker'
import path from 'path'

export const makeSut = (): OrphanageTypeORMRepository => {
  return new OrphanageTypeORMRepository(faker.internet.url())
}

describe('OrphanageTypeORMRepository', () => {
  beforeAll(async () => {
    TypeORMHelper.connect = jest.fn().mockImplementationOnce(async () => {
      await createConnection({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [
          path.join(__dirname, '..', 'entities/**/!(*.map)')
        ],
        synchronize: true,
        logging: false
      })

      TypeORMHelper.connection = getConnection()
    })
  })

  afterAll(async () => {
    await TypeORMHelper.disconnect()
  })

  beforeEach(async () => {
    await TypeORMHelper.connection?.dropDatabase()
    await TypeORMHelper.connection?.synchronize()
  })

  describe('add()', () => {
    test('Should return an orphanage on success', async () => {
      const sut = makeSut()

      const addOrphanageParams = mockAddOrphanageParams()

      const orphanage = await sut.add(addOrphanageParams)

      expect(orphanage).toBeTruthy()
      expect(orphanage.id).toBeTruthy()
      expect(orphanage.name).toBe(addOrphanageParams.name)
      expect(orphanage.latitude).toBe(addOrphanageParams.latitude)
      expect(orphanage.longitude).toBe(addOrphanageParams.longitude)
      expect(orphanage.whatsapp).toBe(addOrphanageParams.whatsapp)
      expect(orphanage.instructions).toBe(addOrphanageParams.instructions)
      expect(orphanage.about).toBe(addOrphanageParams.about)
      expect(orphanage.opening_hours).toBe(addOrphanageParams.opening_hours)
      expect(orphanage.opening_hours).toBe(addOrphanageParams.opening_hours)
      expect(orphanage.approved).toBe(addOrphanageParams.approved)
      expect(orphanage.images[0].name).toBe(addOrphanageParams.images[0].name)
    })
  })

  describe('load()', () => {
    test('Should load orphanages on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddOrphanageParams())
      await sut.add(mockAddOrphanageParams())
      const orphanages = await sut.load()

      expect(orphanages.length).toBe(2)
      expect(orphanages[0].id).toBeTruthy()
    })
  })
})
