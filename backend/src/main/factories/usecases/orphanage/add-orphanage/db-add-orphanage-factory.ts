import { AddOrphanage } from '@/domain/usecases/orphanage/add-orphanage'
import { OrphanagePrismaRepository } from '@/infra/db/prisma/orphanage/orphanage-prisma-repository'
import { DbAddOrphanage } from '@/data/usecases/orphanage/add-orphanage/db-add-orphanage'
import env from '@/main/config/env'

export const makeDbAddOrphanage = (): AddOrphanage => {
  const orphanagePrismaRepository = new OrphanagePrismaRepository(env.storageUrl)
  return new DbAddOrphanage(orphanagePrismaRepository)
}
