import { AddOrphanage } from '@/domain/usecases/add-orphanage'
import { mockOrphanageModel } from './mock-orphanage'
import faker from 'faker'

export const mockAddOrphanageModel = (): AddOrphanage.Model => mockOrphanageModel()

export const mockAddOrphanageParams = (): AddOrphanage.Params => {
  const file = new File([''], faker.random.word(), { type: faker.system.mimeType() })

  return {
    name: faker.name.findName(),
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    whatsapp: faker.phone.phoneNumber(),
    about: faker.random.words(),
    instructions: faker.random.words(),
    open_on_weekend: faker.random.boolean(),
    opening_hours: faker.random.words(),
    images: [file]
  }
}
