import { forbidden } from '../add-orphanage/add-orphanage-controller-protocols'
import { InvalidParamError } from '../load-orphanage-by-id/load-orphanage-by-id-controller-protocols'
import { LoadOrphanagesByStatus, Controller, HttpRequest, HttpResponse, ok, noContent, serverError } from './load-orphanages-by-status-controller-protocols'

export class LoadOrphanagesByStatusController implements Controller {
  constructor (
    private readonly loadOrphanagesByStatus: LoadOrphanagesByStatus
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { approvedStatus } = httpRequest.query

      if (approvedStatus !== 'true' && approvedStatus !== 'false') {
        return forbidden(new InvalidParamError('orphanageStatus'))
      }
      const orphanages = await this.loadOrphanagesByStatus.loadByStatus(Boolean(approvedStatus))

      return orphanages.length ? ok(orphanages) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
