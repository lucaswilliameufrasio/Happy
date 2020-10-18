import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadOrphanages,Controller, HttpRequest, HttpResponse } from './load-orphanages-controller-protocols'

export class LoadOrphanagesController implements Controller {
  constructor (
    private readonly loadOrphanages: LoadOrphanages
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const orphanages = await this.loadOrphanages.load()
      return orphanages.length ? ok(orphanages) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
