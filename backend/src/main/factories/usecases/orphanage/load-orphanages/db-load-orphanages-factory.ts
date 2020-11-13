import { LoadOrphanages } from '@/domain/usecases/orphanage/load-orphanages'
import { DbLoadOrphanages } from '@/data/usecases/orphanage/load-orphanages/db-load-orphanages'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import env from '@/main/config/env'

export const makeDbLoadOrphanages = (): LoadOrphanages => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository(env.storageUrl)
  return new DbLoadOrphanages(orphanageTypeORMRepository)
}
