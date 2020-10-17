import { AddOrphanageRepository } from '@/data/protocols/db/add-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { mockOrphanageModel } from '@/domain/test/mock-orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export class AddOrphanageRepositorySpy implements AddOrphanageRepository {
  orphanageModel = mockOrphanageModel()
  addOrphanageParams: AddOrphanageParams

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    this.addOrphanageParams = data
    return this.orphanageModel
  }
}
