import { Controller, HttpRequest, HttpResponse, forbidden, ok, serverError, InvalidParamError, LoadOrphanageById } from './load-orphanage-by-id-controller-protocols'

export class LoadOrphanageByIdController implements Controller {
  constructor (
    private readonly loadOrphanageById: LoadOrphanageById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { orphanageId } = httpRequest.params
      const orphanage = await this.loadOrphanageById.loadById(Number(orphanageId))
      if (!orphanage) {
        return forbidden(new InvalidParamError('orphanageId'))
      }
      return ok(orphanage)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
