import { AddOrphanage } from '@/domain/usecases/add-orphanage'
import faker from 'faker'

export const mockAddOrphanageParams = (): AddOrphanage.Params => ({
  name: faker.name.findName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  whatsapp: faker.phone.phoneNumber(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  open_on_weekend: faker.random.boolean(),
  opening_hours: faker.random.words(),
  images: [{
    name: faker.random.word()
  }]
})
