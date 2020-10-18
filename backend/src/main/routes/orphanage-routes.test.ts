import request from 'supertest'
import faker from 'faker'
import app from '@/main/config/app'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { getAssetPathHelper } from '@/shared/test/helpers/get-asset-path-helper'
import { mockAddOrphanageParams } from '@/domain/test'

const mockOrphanagePrisma = (): void => {
  const orphanageParams = Object.assign({}, mockAddOrphanageParams(), { id: faker.random.number() })
  prisma.orphanage.create = jest.fn().mockReturnValueOnce(orphanageParams)
  prisma.orphanage.findOne = jest.fn().mockReturnValueOnce(orphanageParams)
}

describe('Orphanage Routes', () => {
  beforeAll(mockOrphanagePrisma)

  test('Should return 201 on add survey success', async () => {
    await request(app)
      .post('/api/orphanages')
      .field({
        name: 'Unidade de Acolhimento Institucional do Pará',
        latitude: -1.463868,
        longitude: -48.485970,
        about: 'Acolhimento Institucional',
        instructions: 'Usar mascará.',
        approved: false,
        opening_hours: 'Das 9 às 15h',
        open_on_weekend: true,
        whatsapp: '(93) 981999008'
      })
      .attach('images', getAssetPathHelper('unsplash-chris.jpeg'))
      .expect(201)
  })
})
