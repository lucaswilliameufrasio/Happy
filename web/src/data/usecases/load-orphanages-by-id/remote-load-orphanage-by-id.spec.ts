import { RemoteLoadOrphanageById } from './remote-load-orphanage-by'
import { HttpClientSpy } from '@/data/test/mock-http'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadOrphanageById
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadOrphanageById(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadOrphanageById', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.loadById()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })
})
