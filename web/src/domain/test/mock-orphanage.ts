import { OrphanageModel } from '@/domain/models'
import faker from 'faker'

export const mockOrphanageModel = (): OrphanageModel => ({
  id: faker.random.number(),
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

export const mockMultipleOrphanageModel = (): OrphanageModel[] => [
  mockOrphanageModel(),
  mockOrphanageModel()
]
