import { AddOrphanage } from '@/domain/usecases/orphanage/add-orphanage'
import { DbAddOrphanage } from '@/data/usecases/orphanage/add-orphanage/db-add-orphanage'
import { OrphanageTypeORMRepository } from '@/infra/db/typeorm/orphanage/orphanage-typeorm-repository'
import { LocalStorageService } from '@/infra/storage/local-storage/local-storage-service'

export const makeDbAddOrphanage = (): AddOrphanage => {
  const orphanageTypeORMRepository = new OrphanageTypeORMRepository()
  const localStorageService = new LocalStorageService()
  return new DbAddOrphanage(orphanageTypeORMRepository, localStorageService)
}
