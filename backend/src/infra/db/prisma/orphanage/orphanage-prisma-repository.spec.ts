import { OrphanagePrismaRepository } from './orphanage-prisma-repository'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { mockAddOrphanagePrisma, mockApprovedOrphanagesPrismaModel, mockLoadOrphanageByIdPrisma, mockLoadOrphanagesPrisma, mockOrphanagePrismaModel, mockOrphanagesPrismaModel, mockUpdateOrphanagePrisma, OrphanagePrismaModel } from '@/infra/db/test'
import { mockAddOrphanageParams, mockUpdateOrphanageParams } from '@/domain/test'
import faker from 'faker'

export const makeSut = (): OrphanagePrismaRepository => {
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
      expect(prisma.orphanage.create).toHaveBeenCalledWith({
        data: {
          name: addOrphanageParams.name,
          latitude: addOrphanageParams.latitude,
          longitude: addOrphanageParams.longitude,
          about: addOrphanageParams.about,
          instructions: addOrphanageParams.instructions,
          approved: addOrphanageParams.approved,
          opening_hours: addOrphanageParams.opening_hours,
          open_on_weekend: addOrphanageParams.open_on_weekend,
          whatsapp: addOrphanageParams.whatsapp,
          OrphanageImage: {
            create: addOrphanageParams.images
          }
        }
      })
    })
  })

  describe('load()', () => {
    test('Should load orphanages on success', async () => {
      mockLoadOrphanagesPrisma(mockOrphanagesPrismaModel())
      const sut = makeSut()
      const orphanages = await sut.load()

      expect(orphanages.length).toBe(2)
      expect(orphanages[0].id).toBeTruthy()
      expect(prisma.orphanage.findMany).toHaveBeenCalledWith({ include: { OrphanageImage: true } })
    })
  })

  describe('loadById()', () => {
    test('Should load orphanage by id on success', async () => {
      const sut = makeSut()
      const orphanageModel = mockOrphanagePrismaModel()

      mockLoadOrphanageByIdPrisma(orphanageModel)

      const orphanage = await sut.loadById(orphanageModel.id)

      expect(orphanage).toBeTruthy()
      expect(orphanage.id).toBeTruthy()
      expect(orphanage.latitude).toEqual(orphanageModel.latitude)
      expect(orphanage.longitude).toEqual(orphanageModel.longitude)
      expect(prisma.orphanage.findOne).toHaveBeenCalledWith({
        where: {
          id: orphanageModel.id
        },
        include: {
          OrphanageImage: {
            where: {
              orphanageId: orphanageModel.id
            }
          }
        }
      })
    })
  })

  describe('loadByStatus()', () => {
    test('Should load orphanages by status on success', async () => {
      mockLoadOrphanagesPrisma(mockApprovedOrphanagesPrismaModel())
      const sut = makeSut()
      const orphanages = await sut.loadByStatus(true)

      expect(orphanages.length).toBe(2)
      expect(orphanages[0].id).toBeTruthy()
      expect(orphanages[0].approved).toBe(true)
      expect(orphanages[1].approved).toBe(true)
      expect(prisma.orphanage.findMany).toHaveBeenCalledWith({
        where: {
          approved: true
        },
        include: {
          OrphanageImage: true
        }
      })
    })
  })

  describe('update()', () => {
    test('Should update orphanage on success', async () => {
      const sut = makeSut()
      const updateOrphanageData = mockUpdateOrphanageParams()
      const OrphanageModel: OrphanagePrismaModel = {
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
        OrphanageImage: [{ name: faker.random.word() }]
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
      expect(prisma.orphanage.update).toHaveBeenCalledWith({
        data: updateOrphanageData.updateData,
        where: {
          id: updateOrphanageData.orphanageId
        }
      })
    })
  })
})
