import { getAssetPathHelper } from '@/shared/test/helpers/get-asset-path-helper'
import app from '@/main/config/app'
import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'
import { testConnectionOptions } from '@/infra/db/typeorm/test/typeorm-test-helper'
import { OrphanageModel } from '@/domain/models/orphanage'
import { mockAddOrphanageParams } from '@/domain/test'

import request from 'supertest'
import { Repository } from 'typeorm'

let orphanageRepository: Repository<OrphanageModel>

const makeOrphanage = async (): Promise<OrphanageModel> => {
  const orphanage = await orphanageRepository.save(mockAddOrphanageParams())
  await orphanageRepository.update(orphanage.id, {
    approved: true
  })

  return orphanage
}

describe('Orphanage Routes', () => {
  beforeAll(async () => {
    await TypeORMHelper.connect(testConnectionOptions)
  })

  afterAll(async () => {
    await TypeORMHelper.disconnect()
  })

  beforeEach(async () => {
    await TypeORMHelper.connection?.dropDatabase()
    await TypeORMHelper.connection?.synchronize()
    orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
  })

  describe('GET /orphanages', () => {
    test('Should return 200 on load orphanage success', async () => {
      await makeOrphanage()
      await request(app)
        .get('/api/orphanages')
        .expect(200)
    })

    test('Should return 200 on load orphanage by status success', async () => {
      await makeOrphanage()
      await request(app)
        .get('/api/orphanages?approved=true')
        .expect(200)
    })
  })

  describe('POST /orphanages', () => {
    test('Should return 201 on add orphanage success', async () => {
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

  describe('GET /orphanages/:orphanageId', () => {
    test('Should return 200 on load orphanage by id success', async () => {
      const result = await makeOrphanage()
      const orphanageId: number = result.id

      await request(app)
        .get(`/api/orphanages/${orphanageId}`)
        .expect(200)
    })
  })

  describe('PUT /orphanages/:orphanageId', () => {
    test('Should return 204 on update orphanage success', async () => {
      const result = await makeOrphanage()
      const orphanageId: number = result.id

      await request(app)
        .put(`/api/orphanages/${orphanageId}`)
        .send({
          name: 'Unidade de Acolhimento Institucional do Paraná',
          latitude: -23.404877,
          longitude: -51.9372662,
          about: 'Acolhimento Institucional',
          instructions: 'Usar mascará. Passar álcool nas mãos.',
          approved: true,
          opening_hours: 'Das 14 às 18:30h',
          open_on_weekend: true,
          whatsapp: '(43) 981999008'
        })
        .expect(204)
    })
  })
})
