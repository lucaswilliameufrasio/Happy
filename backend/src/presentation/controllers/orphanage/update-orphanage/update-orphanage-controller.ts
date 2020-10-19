import { UpdateOrphanage, Controller, HttpRequest, HttpResponse, serverError, noContent } from './update-orphanage-controller-protocols'

export class UpdateOrphanageController implements Controller {
  constructor (
    private readonly updateOrphanage: UpdateOrphanage
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.updateOrphanage.update({ orphanageId: httpRequest.params.orphanageId, updateData: httpRequest.body })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
