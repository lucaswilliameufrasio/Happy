import { OrphanagePrismaRepository } from './orphanage-prisma-repository'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { mockAddOrphanageParams, mockOrphanageModel } from '@/domain/test'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { OrphanageModel } from '@/domain/models/orphanage'
import faker from 'faker'

const mockAddOrphanagePrisma = (orphanage: AddOrphanageParams): void => {
  const orphanageParams = Object.assign({}, orphanage, { id: faker.random.number() })
  prisma.orphanage.create = jest.fn().mockReturnValueOnce(orphanage)
  prisma.orphanage.findOne = jest.fn().mockReturnValueOnce(orphanageParams)
}

const mockLoadOrphanageByIdPrisma = (orphanage: OrphanageModel): void => {
  prisma.orphanage.findOne = jest.fn().mockReturnValueOnce(orphanage)
}

const makeSut = (): OrphanagePrismaRepository => {
  return new OrphanagePrismaRepository(faker.internet.url())
}

describe('OrphanagePrismaRepository', () => {
  describe('add()', () => {
    test('Should return an orphanage on success', async () => {
      const sut = makeSut()

      const addOrphanageParams = mockAddOrphanageParams()

      mockAddOrphanagePrisma(addOrphanageParams)

      const orphanage = await sut.add(addOrphanageParams)

      expect(orphanage).toBeTruthy()
      expect(orphanage.name).toBe(addOrphanageParams.name)
      expect(orphanage.longitude).toBe(addOrphanageParams.longitude)
      expect(orphanage.latitude).toBe(addOrphanageParams.latitude)
      expect(orphanage.instructions).toBe(addOrphanageParams.instructions)
      expect(orphanage.whatsapp).toBe(addOrphanageParams.whatsapp)
      expect(orphanage.about).toBe(addOrphanageParams.about)
      expect(orphanage.open_on_weekend).toBe(addOrphanageParams.open_on_weekend)
    })
  })

  describe('loadById()', () => {
    test('Should load orphanage by id on success', async () => {
      const sut = makeSut()
      const OrphanageModel = mockOrphanageModel()

      mockLoadOrphanageByIdPrisma(OrphanageModel)

      const orphanage = await sut.loadById(OrphanageModel.id)

      expect(orphanage).toBeTruthy()
      expect(orphanage.id).toBeTruthy()
    })
  })
})
