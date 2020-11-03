import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { OrphanagePrismaRepository } from '@/infra/db/prisma/orphanage/orphanage-prisma-repository'
import { DbLoadOrphanageById } from '@/data/usecases/orphanage/load-orphanage-by-id/db-load-orphanage-by-id'
import env from '@/main/config/env'

export const makeDbLoadOrphanageById = (): LoadOrphanageById => {
  const orphanagePrismaRepository = new OrphanagePrismaRepository(env.storageUrl)
  return new DbLoadOrphanageById(orphanagePrismaRepository)
}
