import { AddOrphanage } from '@/domain/usecases/orphanage/add-orphanage'
import { badRequest, serverError, created } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-orphanage-controller-protocols'

export class AddOrphanageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrphanage: AddOrphanage
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, latitude, longitude, whatsapp, about, instructions, open_on_weekend: OpenOnWeekend, approved } = httpRequest.body
      const orphanage = await this.addOrphanage.add({
        name,
        latitude,
        longitude,
        whatsapp,
        about,
        instructions,
        open_on_weekend: OpenOnWeekend,
        approved
      })

      return created(orphanage)
    } catch (error) {
      return serverError(error)
    }
  }
}
