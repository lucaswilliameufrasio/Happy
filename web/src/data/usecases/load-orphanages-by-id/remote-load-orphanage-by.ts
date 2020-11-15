import { HttpClient } from '@/data/protocols/http/http-client'
import { OrphanageModel } from '@/domain/models'
import { LoadOrphanageById } from '@/domain/usecases/load-orphanage-by-id'

export class RemoteLoadOrphanageById implements LoadOrphanageById {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadOrphanageById.Model>
  ) {}

  async loadById (): Promise<OrphanageModel> {
    await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    return null
  }
}
