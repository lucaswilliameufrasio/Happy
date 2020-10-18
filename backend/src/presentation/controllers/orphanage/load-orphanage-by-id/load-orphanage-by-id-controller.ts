import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from './load-orphanage-by-id-controller-protocols'

export class LoadOrphanageByIdController implements Controller {
  constructor (
    private readonly loadOrphanageById: LoadOrphanageById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { orphanageId } = httpRequest.params
      await this.loadOrphanageById.loadById(orphanageId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
