import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { DbLoadOrphanageById } from '@/data/usecases/orphanage/load-orphanage-by-id/db-load-orphanage-by-id'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import { LocalStorageService } from '@/infra/storage/local-storage/local-storage-service'

export const makeDbLoadOrphanageById = (): LoadOrphanageById => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository()
  const localStorageService = new LocalStorageService()
  return new DbLoadOrphanageById(orphanageTypeORMRepository, localStorageService)
}
