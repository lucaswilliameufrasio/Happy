import { OrphanageModel } from '@/domain/models/orphanage'
import { mockOrphanageModel, mockOrphanagesModel } from '@/domain/test'
import { AddOrphanage, AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { LoadOrphanages } from '../controllers/orphanage/load-orphanages/load-orphanages-controller-protocols'

export class AddOrphanageSpy implements AddOrphanage {
  orphanageModel = mockOrphanageModel()
  addOrphanageParams: AddOrphanageParams

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    this.addOrphanageParams = data
    return this.orphanageModel
  }
}

export class LoadOrphanageByIdSpy implements LoadOrphanageById {
  orphanageModel = mockOrphanageModel()
  id: number

  async loadById (id: number): Promise<OrphanageModel> {
    this.id = id
    return this.orphanageModel
  }
}

export class LoadOrphanagesSpy implements LoadOrphanages {
  orphanageModel = mockOrphanagesModel()
  calls = 0

  async load (): Promise<OrphanageModel[]> {
    this.calls++
    return this.orphanageModel
  }
}
