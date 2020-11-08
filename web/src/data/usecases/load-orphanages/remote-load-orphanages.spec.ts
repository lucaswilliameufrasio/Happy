import { RemoteLoadOrphanages } from './remote-load-orphanages'
import { HttpClientSpy } from '@/data/test/mock-http'
import { HttpStatusCode } from '@/data/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadOrphanages
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadOrphanages(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadOrphanages', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.load()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
