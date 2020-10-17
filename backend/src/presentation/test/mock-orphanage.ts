import { OrphanageModel } from '@/domain/models/orphanage'
import { mockOrphanageModel } from '@/domain/test'
import { AddOrphanage, AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export class AddOrphanageSpy implements AddOrphanage {
  orphanageModel = mockOrphanageModel()
  addOrphanageParams: AddOrphanageParams

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    this.addOrphanageParams = data
    return this.orphanageModel
  }
}
