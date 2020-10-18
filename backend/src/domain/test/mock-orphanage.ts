import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { OrphanageModel } from '@/domain/models/orphanage'
import faker from 'faker'

export const mockAddOrphanageParams = (): AddOrphanageParams => ({
  name: faker.name.findName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  whatsapp: faker.phone.phoneNumber(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  open_on_weekend: faker.random.boolean(),
  opening_hours: faker.random.words(),
  approved: faker.random.boolean(),
  images: [{
    name: faker.random.word()
  }]
})

export const mockOrphanageModel = (): OrphanageModel => ({
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
  images: [{
    name: faker.random.word()
  }]
})

export const mockOrphanagesModel = (): OrphanageModel[] => [
  mockOrphanageModel(),
  mockOrphanageModel()
]
