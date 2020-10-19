import { UpdateOrphanageRepository, Controller, HttpRequest, HttpResponse } from './update-orphanage-controller-protocols'

export class UpdateOrphanageController implements Controller {
  constructor (
    private readonly updateOrphanageRepository: UpdateOrphanageRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.updateOrphanageRepository.update({ orphanageId: httpRequest.params.orphanageId, updateData: httpRequest.body })
    return null
  }
}
