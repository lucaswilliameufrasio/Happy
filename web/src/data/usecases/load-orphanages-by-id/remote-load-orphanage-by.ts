import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { OrphanageModel } from '@/domain/models'
import { LoadOrphanageById } from '@/domain/usecases/load-orphanage-by-id'

export class RemoteLoadOrphanageById implements LoadOrphanageById {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadOrphanageById.Model>
  ) {}

  async loadById (): Promise<OrphanageModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
