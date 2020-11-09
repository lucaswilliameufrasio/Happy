import { OrphanageTypeORMHelper } from './orphanage-typeorm-repository-helper'
import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { LoadOrphanagesRepository } from '@/data/protocols/db/orphanage/load-orphanages-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export class OrphanageTypeORMRepository implements AddOrphanageRepository, LoadOrphanagesRepository {
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
}
