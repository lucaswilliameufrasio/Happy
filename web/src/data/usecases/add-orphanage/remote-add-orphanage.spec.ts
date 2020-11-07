import { RemoteAddOrphanage } from './remote-add-orphanage'
import { HttpStatusCode } from '@/data/protocols/http/http-client'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockAddOrphanageModel, mockAddOrphanageParams } from '@/domain/test/mock-add-orphanage'
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
    expect(httpClientSpy.body.get('name')).toBe(addOrphanageParams.name)
    expect(httpClientSpy.body.get('about')).toBe(addOrphanageParams.about)
    expect(httpClientSpy.body.get('whatsapp')).toBe(addOrphanageParams.whatsapp)
    expect(httpClientSpy.body.get('latitude')).toBe(String(addOrphanageParams.latitude))
    expect(httpClientSpy.body.get('longitude')).toBe(String(addOrphanageParams.longitude))
    expect(httpClientSpy.body.get('instructions')).toBe(addOrphanageParams.instructions)
    expect(httpClientSpy.body.get('opening_hours')).toBe(addOrphanageParams.opening_hours)
    expect(httpClientSpy.body.get('open_on_weekend')).toBe(String(addOrphanageParams.open_on_weekend))
    expect(httpClientSpy.body.get('images')).toBe(addOrphanageParams.images[0])
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

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(mockAddOrphanageParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AddOrphanage.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAddOrphanageModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const orphanage = await sut.add(mockAddOrphanageParams())

    expect(orphanage).toEqual(httpResult)
  })
})
