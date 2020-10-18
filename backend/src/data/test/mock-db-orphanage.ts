import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository'
import { LoadOrphanagesRepository } from '@/data/protocols/db/orphanage/load-orphanages-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { mockOrphanageModel, mockOrphanagesModel } from '@/domain/test/mock-orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { LoadOrphanagesByStatusRepository } from '../protocols/db/orphanage/load-orphanages-by-status-repository'

export class AddOrphanageRepositorySpy implements AddOrphanageRepository {
  orphanageModel = mockOrphanageModel()
  addOrphanageParams: AddOrphanageParams

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    this.addOrphanageParams = data
    return this.orphanageModel
  }
}

export class LoadOrphanageByIdRepositorySpy implements LoadOrphanageByIdRepository {
  orphanageModel = mockOrphanageModel()
  id: number

  async loadById (id: number): Promise<OrphanageModel> {
    this.id = id
    return this.orphanageModel
  }
}

export class LoadOrphanagesRepositorySpy implements LoadOrphanagesRepository {
  orphanageModel = mockOrphanagesModel()
  calls: number = 0

  async load (): Promise<OrphanageModel[]> {
    this.calls++
    return this.orphanageModel
  }
}

export class LoadOrphanagesByStatusRepositorySpy implements LoadOrphanagesByStatusRepository {
  orphanageModel = mockOrphanagesModel()
  approved: boolean

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    this.approved = approvedStatus
    return this.orphanageModel
  }
}
