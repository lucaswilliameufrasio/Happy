import { OrphanagePrismaRepository } from '@/infra/db/prisma/orphanage/orphanage-prisma-repository'
import { DbLoadOrphanages } from '@/data/usecases/orphanage/load-orphanages/db-load-orphanages'
import { LoadOrphanages } from '@/domain/usecases/orphanage/load-orphanages'
import env from '@/main/config/env'

export const makeDbLoadOrphanages = (): LoadOrphanages => {
  const orphanagePrismaRepository = new OrphanagePrismaRepository(env.storageUrl)
  return new DbLoadOrphanages(orphanagePrismaRepository)
}
