import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { DbLoadOrphanageById } from '@/data/usecases/orphanage/load-orphanage-by-id/db-load-orphanage-by-id'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import env from '@/main/config/env'

export const makeDbLoadOrphanageById = (): LoadOrphanageById => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository(env.storageUrl)
  return new DbLoadOrphanageById(orphanageTypeORMRepository)
}
