
import { LoadOrphanagesByStatus } from '@/domain/usecases/orphanage/load-orphanages-by-status'
import { DbLoadOrphanagesByStatus } from '@/data/usecases/orphanage/load-orphanages-by-status/db-load-orphanages-by-status'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import { LocalStorageService } from '@/infra/storage/local-storage/local-storage-service'

export const makeDbLoadOrphanagesByStatus = (): LoadOrphanagesByStatus => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository()
  const localStorageService = new LocalStorageService()
  return new DbLoadOrphanagesByStatus(orphanageTypeORMRepository, localStorageService)
}
