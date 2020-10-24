import { RemoteAddOrphanage } from './remote-add-orphanage'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockAddOrphanageParams } from '@/domain/test/mock-add-orphanage'
import faker from 'faker'

describe('RemoteAddOrphanage', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteAddOrphanage(url, httpClientSpy)
    const addOrphanageParams = mockAddOrphanageParams()

    await sut.add(addOrphanageParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toBe(addOrphanageParams)
  })
})
