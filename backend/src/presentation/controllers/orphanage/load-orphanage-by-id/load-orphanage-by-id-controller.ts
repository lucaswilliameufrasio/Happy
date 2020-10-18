import { Controller, HttpRequest, HttpResponse } from './load-orphanage-by-id-controller-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'

export class LoadOrphanageByIdController implements Controller {
  constructor (
    private readonly loadOrphanageById: LoadOrphanageById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { orphanageId } = httpRequest.params
      const orphanage = await this.loadOrphanageById.loadById(orphanageId)
      if (!orphanage) {
        return forbidden(new InvalidParamError('orphanageId'))
      }
      return ok(orphanage)
    } catch (error) {
      return serverError(error)
    }
  }
}
