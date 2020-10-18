import app from '../config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => res.send(''))

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })

  test('Should return multipart/form-data content type when forced', async () => {
    app.get('/test_content_type_formdata', (req, res) => {
      res.type('multipart/form-data')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_formdata')
      .expect('content-type', /form-data/)
  })
})
