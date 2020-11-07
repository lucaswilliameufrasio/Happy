import { RemoteLoadOrphanages } from './remote-load-orphanages'
import { HttpClientSpy } from '@/data/test/mock-http'
import faker from 'faker'

describe('RemoteLoadOrphanages', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteLoadOrphanages(url, httpClientSpy)
    await sut.load()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })
})
