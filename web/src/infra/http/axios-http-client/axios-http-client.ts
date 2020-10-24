import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http/http-client'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    const axiosResponse: AxiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers
    })

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
