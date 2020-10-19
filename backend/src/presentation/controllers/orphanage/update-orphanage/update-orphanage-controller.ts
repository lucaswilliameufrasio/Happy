import { Validation, UpdateOrphanage, LoadOrphanageById, Controller, HttpRequest, HttpResponse, serverError, noContent, badRequest, forbidden, InvalidParamError } from './update-orphanage-controller-protocols'

export class UpdateOrphanageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateOrphanage: UpdateOrphanage,
    private readonly loadOrphanageById: LoadOrphanageById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = { ...httpRequest.body, orphanageId: httpRequest.params.orphanageId }
      const error = this.validation.validate(fields)

      if (error) {
        return badRequest(error)
      }

      const orphanage = await this.loadOrphanageById.loadById(Number(httpRequest.params.orphanageId))
      if (!orphanage) {
        return forbidden(new InvalidParamError('orphanageId'))
      }
      await this.updateOrphanage.update({ orphanageId: Number(httpRequest.params.orphanageId), updateData: httpRequest.body })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
