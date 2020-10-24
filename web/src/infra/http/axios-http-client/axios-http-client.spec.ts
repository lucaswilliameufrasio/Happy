import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import { mockHttpRequest } from '@/data/test/mock-http'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const sut = new AxiosHttpClient()
    const mockedAxios: jest.Mocked<typeof axios> = mockAxios()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })
})
