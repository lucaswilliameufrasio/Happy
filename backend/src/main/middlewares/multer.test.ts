import app from '@/main/config/app'
import request from 'supertest'
import { multerMiddleware } from './multer'
import { getAssetPathHelper } from '@/shared/test/helpers/get-asset-path-helper'

describe('Multer Middleware', () => {
  test('Should add files object to the request object', async () => {
    const filePath = getAssetPathHelper('unsplash-chris.jpeg')

    app.post('/test_multer', multerMiddleware.array('images'), (req, res) => {
      return res.status(201).send({ files: req.files[0].filename })
    })

    const response = await request(app)
      .post('/test_multer')
      .attach('images', filePath)

    expect(response.body.files).toBeTruthy()
  })
})
