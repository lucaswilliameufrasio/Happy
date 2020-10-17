import { Controller, HttpRequest, HttpResponse, Validation } from './add-orphanage-controller-protocols'

export class AddOrphanageController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}
