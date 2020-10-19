import { LoadOrphanagesByStatus, Controller, HttpRequest, HttpResponse, ok, noContent } from './load-orphanages-by-status-controller-protocols'

export class LoadOrphanagesByStatusController implements Controller {
  constructor (
    private readonly loadOrphanagesByStatus: LoadOrphanagesByStatus
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { approvedStatus } = httpRequest.query
    const orphanages = await this.loadOrphanagesByStatus.loadByStatus(Boolean(approvedStatus))

    return orphanages.length ? ok(orphanages) : noContent()
  }
}
