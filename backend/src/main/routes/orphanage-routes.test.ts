import request from 'supertest'
import app from '@/main/config/app'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { getAssetPathHelper } from '@/shared/test/helpers/get-asset-path-helper'
import { mockAddOrphanageParams, mockOrphanageModel, mockOrphanagesModel, mockUpdateOrphanageParams } from '@/domain/test'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { OrphanageModel } from '@/domain/models/orphanage'

const mockOrphanagePrisma = (orphanageParams: AddOrphanageParams, orphanageModel: OrphanageModel): void => {
  prisma.orphanage.create = jest.fn().mockReturnValueOnce(orphanageParams)
  prisma.orphanage.findOne = jest.fn().mockReturnValueOnce(orphanageModel)
  prisma.orphanage.findMany = jest.fn().mockReturnValueOnce(mockOrphanagesModel())
  prisma.orphanage.update = jest.fn().mockReturnValueOnce(mockUpdateOrphanageParams().updateData)
}

const addOrphanageParams: AddOrphanageParams = mockAddOrphanageParams()
const orphanageData: OrphanageModel = mockOrphanageModel()
describe('Orphanage Routes', () => {
  beforeEach(() => {
    mockOrphanagePrisma(addOrphanageParams, orphanageData)
  })

  describe('GET /orphanages', () => {
    test('Should return 200 on load orphanage success', async () => {
      await request(app)
        .get('/api/orphanages')
        .expect(200)
    })

    test('Should return 200 on load orphanage by status success', async () => {
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
      const orphanageId: number = orphanageData.id

      await request(app)
        .get(`/api/orphanages/${orphanageId}`)
        .expect(200)
    })
  })

  describe('PUT /orphanages/:orphanageId', () => {
    test('Should return 204 on update orphanage success', async () => {
      const orphanageId: number = orphanageData.id

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
