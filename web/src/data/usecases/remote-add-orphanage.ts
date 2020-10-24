import { HttpClient } from '@/data/protocols/http/http-client'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'

export class RemoteAddOrphanage implements AddOrphanage {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add (params: AddOrphanage.Params): Promise<AddOrphanage.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    return null
  }
}
