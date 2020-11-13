import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { LoadOrphanagesRepository } from '@/data/protocols/db/orphanage/load-orphanages-repository'
import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository'
import { LoadOrphanagesByStatusRepository } from '@/data/protocols/db/orphanage/load-orphanages-by-status-repository'
import { UpdateOrphanageRepository } from '@/data/protocols/db/orphanage/update-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'

export class OrphanageTypeORMRepository implements AddOrphanageRepository, LoadOrphanagesRepository, LoadOrphanageByIdRepository, LoadOrphanagesByStatusRepository, UpdateOrphanageRepository {
  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const orphanage = await orphanageRepository.save(data)
    return orphanage
  }

  async load (): Promise<OrphanageModel[]> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    return orphanageRepository.find()
  }

  async loadById (orphanageId: number): Promise<OrphanageModel> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    return orphanageRepository.findOne(orphanageId)
  }

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    const orphanages = await orphanageRepository.find({
      where: {
        approved: approvedStatus
      }
    })
    return orphanages
  }

  async update (updateOrphanageData: UpdateOrphanageParams): Promise<void> {
    const orphanageRepository = await TypeORMHelper.getRepository<OrphanageModel>(OrphanageEntity)
    await orphanageRepository.update(updateOrphanageData.orphanageId, updateOrphanageData.updateData)
  }
}
