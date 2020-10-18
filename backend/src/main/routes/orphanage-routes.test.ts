import { getAssetPathHelper } from '@/shared/test/helpers/get-asset-path-helper'
import request from 'supertest'
import app from '../config/app'

describe('Orphanage Routes', () => {
  test('Should return 201 on add survey success', async () => {
    await request(app)
      .post('/api/orphanages')
      .attach('images', getAssetPathHelper('unsplash-chris.jpeg'))
      .field({
        name: 'Unidade de Acolhimento Institucional do Pará',
        latitude: -1.463868,
        longitude: -48.485970,
        whatsapp: '(93) 981999008',
        about: 'Acolhimento Institucional',
        instructions: 'Usar mascará.',
        open_on_weekend: true,
        approved: false
      })
      .expect(201)
  })
})
