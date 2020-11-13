import { UpdateOrphanage } from '@/domain/usecases/orphanage/update-orphanage'
import { DbUpdateOrphanage } from '@/data/usecases/orphanage/update-orphanage/db-update-orphanage'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'

export const makeDbUpdateOrphanage = (): UpdateOrphanage => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository()
  return new DbUpdateOrphanage(orphanageTypeORMRepository)
}
