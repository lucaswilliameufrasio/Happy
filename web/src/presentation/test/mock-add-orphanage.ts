import { mockOrphanageModel } from '@/domain/test/mock-orphanage'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'

export class AddOrphanageSpy implements AddOrphanage {
  orphanage = mockOrphanageModel()
  params: AddOrphanage.Params

  async add (params: AddOrphanage.Params): Promise<AddOrphanage.Model> {
    this.params = params
    return this.orphanage
  }
}
