import { Validation, UpdateOrphanage, Controller, HttpRequest, HttpResponse, serverError, noContent, badRequest } from './update-orphanage-controller-protocols'

export class UpdateOrphanageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateOrphanage: UpdateOrphanage
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = { ...httpRequest.body, orphanageId: httpRequest.params.orphanageId }
      const error = this.validation.validate(fields)

      if (error) {
        return badRequest(error)
      }

      await this.updateOrphanage.update({ orphanageId: Number(httpRequest.params.orphanageId), updateData: httpRequest.body })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
