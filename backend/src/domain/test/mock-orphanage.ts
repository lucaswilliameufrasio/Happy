import { AddOrphanageParams } from '../usecases/orphanage/add-orphanage'
import faker from 'faker'
import { OrphanageModel } from '../models/orphanage'

export const mockAddOrphanageParams = (): AddOrphanageParams => ({
  name: faker.name.findName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  whatsapp: faker.phone.phoneNumber(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  open_on_weekend: faker.random.boolean(),
  approved: faker.random.boolean()
})

export const mockOrphanageModel = (): OrphanageModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  whatsapp: faker.phone.phoneNumber(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  open_on_weekend: faker.random.boolean(),
  approved: faker.random.boolean()
})
