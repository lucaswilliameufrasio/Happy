import { AddOrphanage } from '@/domain/usecases/orphanage/add-orphanage'
import { DbAddOrphanage } from '@/data/usecases/orphanage/add-orphanage/db-add-orphanage'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import env from '@/main/config/env'

export const makeDbAddOrphanage = (): AddOrphanage => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository(env.storageUrl)
  return new DbAddOrphanage(orphanageTypeORMRepository)
}
