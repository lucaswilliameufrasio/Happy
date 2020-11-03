import { OrphanageModel, LoadOrphanages, LoadOrphanagesByStatus, Controller, HttpRequest, HttpResponse, noContent, ok, serverError, forbidden, InvalidParamError } from './load-orphanages-controller-protocols'

export class LoadOrphanagesController implements Controller {
  constructor (
    private readonly loadOrphanages: LoadOrphanages,
    private readonly loadOrphanagesByStatus: LoadOrphanagesByStatus
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      let orphanages: OrphanageModel[]
      const { approved } = httpRequest.query

      if (approved !== undefined) {
        if (typeof approved !== 'boolean' && approved !== 'true' && approved !== 'false') {
          return forbidden(new InvalidParamError('approved'))
        }

        const status = approved === 'true'
        orphanages = await this.loadOrphanagesByStatus.loadByStatus(status)
      } else {
        orphanages = await this.loadOrphanages.load()
      }

      return orphanages.length ? ok(orphanages) : noContent()
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
