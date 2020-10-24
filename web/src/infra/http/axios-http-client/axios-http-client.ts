import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http/http-client'
import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers
    })
    return null
  }
}
