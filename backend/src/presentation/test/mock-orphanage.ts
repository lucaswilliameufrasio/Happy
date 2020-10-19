import { OrphanageModel } from '@/domain/models/orphanage'
import { mockOrphanageModel, mockOrphanagesModel } from '@/domain/test'
import { AddOrphanage, AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { LoadOrphanagesByStatus } from '@/domain/usecases/orphanage/load-orphanages-by-status'
import { LoadOrphanages } from '@/domain/usecases/orphanage/load-orphanages'
import { UpdateOrphanage, UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'

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

export class LoadOrphanagesByStatusSpy implements LoadOrphanagesByStatus {
  orphanageModel = mockOrphanagesModel()
  approvedStatus: boolean

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    this.approvedStatus = approvedStatus
    return this.orphanageModel
  }
}

export class UpdateOrphanageSpy implements UpdateOrphanage {
  updateOrphanageData: UpdateOrphanageParams
  id: number

  async update (updateOrphanageData: UpdateOrphanageParams): Promise<void> {
    this.updateOrphanageData = updateOrphanageData
  }
}
