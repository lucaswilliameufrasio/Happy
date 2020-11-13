import { LoadOrphanages } from '@/domain/usecases/orphanage/load-orphanages'
import { DbLoadOrphanages } from '@/data/usecases/orphanage/load-orphanages/db-load-orphanages'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import { LocalStorageService } from '@/infra/storage/local-storage/local-storage-service'

export const makeDbLoadOrphanages = (): LoadOrphanages => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository()
  const localStorageService = new LocalStorageService()
  return new DbLoadOrphanages(orphanageTypeORMRepository, localStorageService)
}
