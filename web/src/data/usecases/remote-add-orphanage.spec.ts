import { RemoteAddOrphanage } from './remote-add-orphanage'
import { HttpStatusCode } from '@/data/protocols/http/http-client'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockAddOrphanageParams } from '@/domain/test/mock-add-orphanage'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
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

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(mockAddOrphanageParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(mockAddOrphanageParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
