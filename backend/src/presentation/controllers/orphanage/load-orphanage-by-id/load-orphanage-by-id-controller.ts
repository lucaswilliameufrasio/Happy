import { Controller, HttpRequest, HttpResponse } from './load-orphanage-by-id-controller-protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'

export class LoadOrphanageByIdController implements Controller {
  constructor (
    private readonly loadOrphanageById: LoadOrphanageById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { orphanageId } = httpRequest.params
      const orphanage = await this.loadOrphanageById.loadById(orphanageId)
      return ok(orphanage)
    } catch (error) {
      return serverError(error)
    }
  }
}
