import { Validation, UpdateOrphanage, Controller, HttpRequest, HttpResponse, serverError, noContent } from './update-orphanage-controller-protocols'

export class UpdateOrphanageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateOrphanage: UpdateOrphanage
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = { ...httpRequest.body, orphanageId: httpRequest.params }
      this.validation.validate(fields)

      await this.updateOrphanage.update({ orphanageId: httpRequest.params.orphanageId, updateData: httpRequest.body })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
