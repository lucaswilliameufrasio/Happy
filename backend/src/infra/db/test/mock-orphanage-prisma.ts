import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'
import { OrphanageModel } from '@/domain/models/orphanage'
import faker from 'faker'

export interface OrphanagePrismaModel extends Omit<OrphanageModel, 'images'> {
  OrphanageImage: Array<{name: string}>
}

export const mockAddOrphanagePrisma = (orphanage: AddOrphanageParams): void => {
  const orphanageParams = Object.assign({}, orphanage, { id: faker.random.number() })
  const { images, ...rest } = orphanageParams
  const orphanageFound = Object.assign({}, rest, { OrphanageImage: images })
  prisma.orphanage.create = jest.fn().mockReturnValueOnce(orphanage)
  prisma.orphanage.findOne = jest.fn().mockReturnValueOnce(orphanageFound)
}

export const mockLoadOrphanageByIdPrisma = (orphanage: OrphanagePrismaModel): void => {
  prisma.orphanage.findOne = jest.fn().mockReturnValueOnce(orphanage)
}

export const mockLoadOrphanagesPrisma = (orphanages: OrphanagePrismaModel[]): void => {
  prisma.orphanage.findMany = jest.fn().mockReturnValueOnce(orphanages)
}

export const mockUpdateOrphanagePrisma = (updateOrphanageData: UpdateOrphanageParams): void => {
  prisma.orphanage.update = jest.fn().mockReturnValueOnce(updateOrphanageData.updateData)
}

export const mockOrphanagePrismaModel = (): OrphanagePrismaModel => ({
  id: faker.random.number(),
  name: faker.name.findName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  whatsapp: faker.phone.phoneNumber(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  opening_hours: faker.random.words(),
  open_on_weekend: faker.random.boolean(),
  approved: faker.random.boolean(),
  OrphanageImage: [{
    name: faker.random.word()
  }]
})

export const mockOrphanagesPrismaModel = (): OrphanagePrismaModel[] => [
  mockOrphanagePrismaModel(),
  mockOrphanagePrismaModel()
]

export const mockApprovedOrphanagePrismaModel = (): OrphanagePrismaModel => ({
  id: faker.random.number(),
  name: faker.name.findName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  whatsapp: faker.phone.phoneNumber(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  opening_hours: faker.random.words(),
  open_on_weekend: faker.random.boolean(),
  approved: true,
  OrphanageImage: [{
    name: faker.random.word()
  }]
})

export const mockApprovedOrphanagesPrismaModel = (): OrphanagePrismaModel[] => [
  mockApprovedOrphanagePrismaModel(),
  mockApprovedOrphanagePrismaModel()
]
