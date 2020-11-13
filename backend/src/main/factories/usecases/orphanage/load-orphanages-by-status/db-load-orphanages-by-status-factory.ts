
import { LoadOrphanagesByStatus } from '@/domain/usecases/orphanage/load-orphanages-by-status'
import { DbLoadOrphanagesByStatus } from '@/data/usecases/orphanage/load-orphanages-by-status/db-load-orphanages-by-status'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import env from '@/main/config/env'

export const makeDbLoadOrphanagesByStatus = (): LoadOrphanagesByStatus => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository(env.storageUrl)
  return new DbLoadOrphanagesByStatus(orphanageTypeORMRepository)
}
