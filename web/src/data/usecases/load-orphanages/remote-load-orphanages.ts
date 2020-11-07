import { HttpClient } from '@/data/protocols/http/http-client'
import { OrphanageModel } from '@/domain/models'
import { LoadOrphanages } from '@/domain/usecases/load-orphanages'

export class RemoteLoadOrphanages implements LoadOrphanages {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async load (): Promise<OrphanageModel[]> {
    await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    return null
  }
}
