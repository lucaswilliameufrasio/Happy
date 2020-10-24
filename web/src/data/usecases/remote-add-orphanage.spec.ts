import { RemoteAddOrphanage } from './remote-add-orphanage'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockAddOrphanageParams } from '@/domain/test/mock-add-orphanage'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAddOrphanage
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddOrphanage(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddOrphanage', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const addOrphanageParams = mockAddOrphanageParams()

    await sut.add(addOrphanageParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toBe(addOrphanageParams)
  })
})
