import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'

export class RemoteAddOrphanage implements AddOrphanage {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add (params: AddOrphanage.Params): Promise<AddOrphanage.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok : return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
