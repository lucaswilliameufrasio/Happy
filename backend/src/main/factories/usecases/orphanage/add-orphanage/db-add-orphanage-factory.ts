import { AddOrphanage } from '@/domain/usecases/orphanage/add-orphanage'
import { OrphanagePrismaRepository } from '@/infra/db/prisma/orphanage/orphanage-prisma-repository'
import { DbAddOrphanage } from '@/data/usecases/orphanage/add-orphanage/db-add-orphanage'

export const makeDbAddOrphanage = (): AddOrphanage => {
  const orphanagePrismaRepository = new OrphanagePrismaRepository()
  return new DbAddOrphanage(orphanagePrismaRepository)
}
