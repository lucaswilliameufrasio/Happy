import { LoadOrphanagesByStatus, Controller, HttpRequest, HttpResponse, ok, noContent, serverError } from './load-orphanages-by-status-controller-protocols'

export class LoadOrphanagesByStatusController implements Controller {
  constructor (
    private readonly loadOrphanagesByStatus: LoadOrphanagesByStatus
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { approvedStatus } = httpRequest.query
      const orphanages = await this.loadOrphanagesByStatus.loadByStatus(Boolean(approvedStatus))

      return orphanages.length ? ok(orphanages) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
