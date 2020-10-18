import { LoadOrphanages,Controller, HttpRequest, HttpResponse } from './load-orphanages-controller-protocols'

export class LoadOrphanagesController implements Controller {
  constructor (
    private readonly loadOrphanages: LoadOrphanages
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadOrphanages.load()
    return null
  }
}
