import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { OrphanageModel } from '@/domain/models'
import { LoadOrphanages } from '@/domain/usecases/load-orphanages'

export class RemoteLoadOrphanages implements LoadOrphanages {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async load (): Promise<OrphanageModel[]> {
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
