import { OrphanagePrismaRepository } from './orphanage-prisma-repository'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { mockAddOrphanageParams, mockApprovedOrphanagesModel, mockOrphanageModel, mockOrphanagesModel, mockUpdateOrphanageParams } from '@/domain/test'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'
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

const mockLoadOrphanagesPrisma = (orphanages: OrphanageModel[]): void => {
  prisma.orphanage.findMany = jest.fn().mockReturnValueOnce(orphanages)
}

const mockUpdateOrphanagePrisma = (updateOrphanageData: UpdateOrphanageParams): void => {
  prisma.orphanage.update = jest.fn().mockReturnValueOnce(updateOrphanageData.updateData)
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

  describe('load()', () => {
    test('Should load orphanages on success', async () => {
      mockLoadOrphanagesPrisma(mockOrphanagesModel())
      const sut = makeSut()
      const orphanages = await sut.load()

      expect(orphanages.length).toBe(2)
      expect(orphanages[0].id).toBeTruthy()
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

  describe('loadByStatus()', () => {
    test('Should load orphanages by status on success', async () => {
      mockLoadOrphanagesPrisma(mockApprovedOrphanagesModel())
      const sut = makeSut()
      const orphanages = await sut.loadByStatus(true)

      expect(orphanages.length).toBe(2)
      expect(orphanages[0].id).toBeTruthy()
      expect(orphanages[0].approved).toBe(true)
      expect(orphanages[1].approved).toBe(true)
    })
  })

  describe('update()', () => {
    test('Should update orphanage on success', async () => {
      const sut = makeSut()
      const updateOrphanageData = mockUpdateOrphanageParams()
      const OrphanageModel: OrphanageModel = {
        id: updateOrphanageData.orphanageId,
        name: updateOrphanageData.updateData.name,
        latitude: updateOrphanageData.updateData.latitude,
        longitude: updateOrphanageData.updateData.longitude,
        about: updateOrphanageData.updateData.about,
        instructions: updateOrphanageData.updateData.instructions,
        whatsapp: updateOrphanageData.updateData.whatsapp,
        opening_hours: updateOrphanageData.updateData.opening_hours,
        open_on_weekend: updateOrphanageData.updateData.open_on_weekend,
        approved: updateOrphanageData.updateData.approved,
        images: [{ name: faker.random.word() }]
      }

      mockLoadOrphanageByIdPrisma(OrphanageModel)
      mockUpdateOrphanagePrisma(updateOrphanageData)

      await sut.update(updateOrphanageData)
      const orphanage = await prisma.orphanage.findOne({
        where: {
          id: updateOrphanageData.orphanageId
        },
        include: {
          OrphanageImage: true
        }
      })

      expect(orphanage).toBeTruthy()
      expect(orphanage.id).toBeTruthy()
    })
  })
})
