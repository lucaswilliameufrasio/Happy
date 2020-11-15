import { RemoteLoadOrphanageById } from './remote-load-orphanage-by'
import { HttpClientSpy } from '@/data/test/mock-http'
import { HttpStatusCode } from '@/data/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import faker from 'faker'
import { mockAddOrphanageModel } from '@/domain/test/mock-add-orphanage'

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

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadById()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadById()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an LoadOrphanageById.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAddOrphanageModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const orphanage = await sut.loadById()

    expect(orphanage).toEqual(httpResult)
  })
})
