import { UpdateOrphanage } from '@/domain/usecases/orphanage/update-orphanage'
import { DbUpdateOrphanage } from '@/data/usecases/orphanage/update-orphanage/db-update-orphanage'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import env from '@/main/config/env'

export const makeDbUpdateOrphanage = (): UpdateOrphanage => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository(env.storageUrl)
  return new DbUpdateOrphanage(orphanageTypeORMRepository)
}
