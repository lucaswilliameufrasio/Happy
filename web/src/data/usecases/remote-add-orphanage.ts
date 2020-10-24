import { HttpClient } from '@/data/protocols/http/http-client'
import { AddOrphanage, AddOrphanageParams } from '@/domain/usecases/add-orphanage'
import { OrphanageModel } from '@/domain/models'

export class RemoteAddOrphanage implements AddOrphanage {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add (params: AddOrphanageParams): Promise<OrphanageModel> {
    await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    return null
  }
}
