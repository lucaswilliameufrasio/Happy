import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { SerializeOrphanageData } from '@/infra/db/helpers'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { LoadOrphanagesRepository } from '@/data/protocols/db/orphanage/load-orphanages-repository'
import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository'
import { LoadOrphanagesByStatusRepository } from '@/data/protocols/db/orphanage/load-orphanages-by-status-repository'
import { UpdateOrphanageRepository } from '@/data/protocols/db/orphanage/update-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class OrphanageTypeORMRepository implements AddOrphanageRepository, LoadOrphanagesRepository, LoadOrphanageByIdRepository, LoadOrphanagesByStatusRepository, UpdateOrphanageRepository {
  constructor (private readonly storageUrl: string) {}

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const orphanage = await orphanageRepository.save(data)

    return SerializeOrphanageData.injectURL(orphanage, this.storageUrl)
  }

  async load (): Promise<OrphanageModel[]> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const orphanages = await orphanageRepository.find()
    return orphanages ? orphanages.map(orphanage => SerializeOrphanageData.injectURL(orphanage, this.storageUrl)) : null
  }

  async loadById (orphanageId: number): Promise<OrphanageModel> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const orphanage = await orphanageRepository.findOne(orphanageId)
    return SerializeOrphanageData.injectURL(orphanage, this.storageUrl)
  }

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const orphanages = await orphanageRepository.find({
      where: {
        approved: approvedStatus
      }
    })
    return orphanages ? orphanages.map(orphanage => SerializeOrphanageData.injectURL(orphanage, this.storageUrl)) : null
  }

  async update (updateOrphanageData: UpdateOrphanageParams): Promise<void> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const data: QueryPartialEntity<any> = updateOrphanageData.updateData
    await orphanageRepository.update(updateOrphanageData.orphanageId, data)
  }
}
