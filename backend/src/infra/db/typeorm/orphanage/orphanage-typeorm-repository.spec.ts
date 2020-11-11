import { OrphanageTypeORMRepository } from './orphanage-typeorm-repository'
import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'
import { testConnectionOptions } from '@/infra/db/typeorm/test/typeorm-test-helper'
import { mockAddOrphanageParams, mockApprovedOrphanageModel, mockUpdateOrphanageParams } from '@/domain/test'
import { Repository } from 'typeorm'
import faker from 'faker'

let orphanageRepository: Repository<any>

export const makeSut = (): OrphanageTypeORMRepository => {
  return new OrphanageTypeORMRepository(faker.internet.url())
}

describe('OrphanageTypeORMRepository', () => {
  beforeAll(async () => {
    await TypeORMHelper.connect(testConnectionOptions)
  })

  afterAll(async () => {
    await TypeORMHelper.disconnect()
  })

  beforeEach(async () => {
    await TypeORMHelper.connection?.dropDatabase()
    await TypeORMHelper.connection?.synchronize()
    orphanageRepository = await TypeORMHelper.getRepository(OrphanageEntity)
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
      await orphanageRepository.save(mockAddOrphanageParams())
      await orphanageRepository.save(mockAddOrphanageParams())
      const orphanages = await sut.load()

      expect(orphanages.length).toBe(2)
      expect(orphanages[0].id).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should load orphanage by id on success', async () => {
      const sut = makeSut()
      const addOrphanageParams = mockAddOrphanageParams()
      const orphanageModel = await orphanageRepository.save(addOrphanageParams)

      const orphanage = await sut.loadById(orphanageModel.id)

      expect(orphanage).toBeTruthy()
      expect(orphanage.id).toEqual(orphanageModel.id)
    })
  })

  describe('loadByStatus()', () => {
    test('Should load orphanages by status on success', async () => {
      const sut = makeSut()
      const { id, ...params } = mockApprovedOrphanageModel()
      const orphanageModel = await orphanageRepository.save(params)

      const orphanage = await sut.loadByStatus(true)

      expect(orphanage).toBeTruthy()
      expect(orphanage[0].id).toEqual(orphanageModel.id)
    })
  })

  describe('update()', () => {
    test('Should update orphanage on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddOrphanageParams())

      const updateOrphanageParams = mockUpdateOrphanageParams()

      await sut.update({ orphanageId: 1, updateData: updateOrphanageParams.updateData })
      const orphanage = await orphanageRepository.findOne(1)

      expect(orphanage).toBeTruthy()
      expect(orphanage.name).toEqual(updateOrphanageParams.updateData.name)
    })
  })
})
