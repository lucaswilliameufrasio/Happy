import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-orphanage-controller-protocols'

export class AddOrphanageController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    return null
  }
}
