import { OrphanageTypeORMHelper } from './orphanage-typeorm-repository-helper'
import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { LoadOrphanagesRepository } from '@/data/protocols/db/orphanage/load-orphanages-repository'
import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository'
import { LoadOrphanagesByStatusRepository } from '@/data/protocols/db/orphanage/load-orphanages-by-status-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export class OrphanageTypeORMRepository implements AddOrphanageRepository, LoadOrphanagesRepository, LoadOrphanageByIdRepository, LoadOrphanagesByStatusRepository {
  constructor (private readonly storageUrl: string) {}

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    const orphanageRepository = await TypeORMHelper.getRepository(OrphanageEntity)
    const orphanage = await orphanageRepository.save(data)

    return OrphanageTypeORMHelper.assignImageURL(orphanage, this.storageUrl)
  }

  async load (): Promise<OrphanageModel[]> {
    const orphanageRepository = await TypeORMHelper.getRepository(OrphanageEntity)

    return orphanageRepository.find()
  }

  async loadById (orphanageId: number): Promise<OrphanageModel> {
    const orphanageRepository = await TypeORMHelper.getRepository(OrphanageEntity)

    return orphanageRepository.findOne(orphanageId)
  }

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    const orphanageRepository = await TypeORMHelper.getRepository(OrphanageEntity)

    return orphanageRepository.find({
      where: {
        approved: approvedStatus
      }
    })
  }
}
