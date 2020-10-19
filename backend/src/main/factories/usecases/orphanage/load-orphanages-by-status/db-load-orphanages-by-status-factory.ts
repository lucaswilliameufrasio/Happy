
import { OrphanagePrismaRepository } from '@/infra/db/prisma/orphanage/orphanage-prisma-repository'
import { DbLoadOrphanagesByStatus } from '@/data/usecases/orphanage/load-orphanages-by-status/db-load-orphanages-by-status'
import { LoadOrphanagesByStatus } from '@/domain/usecases/orphanage/load-orphanages-by-status'
import env from '@/main/config/env'

export const makeDbLoadOrphanagesByStatus = (): LoadOrphanagesByStatus => {
  const orphanagePrismaRepository = new OrphanagePrismaRepository(env.appUrl)
  return new DbLoadOrphanagesByStatus(orphanagePrismaRepository)
}
