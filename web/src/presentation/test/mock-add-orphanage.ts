import { mockOrphanageModel } from '@/domain/test/mock-orphanage'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'

export class AddOrphanageSpy implements AddOrphanage {
  orphanage = mockOrphanageModel()
  params: AddOrphanage.Params
  callsCount = 0

  async add (params: AddOrphanage.Params): Promise<AddOrphanage.Model> {
    this.params = params
    this.callsCount++
    return this.orphanage
  }
}
