import { UpdateOrphanage } from '@/domain/usecases/orphanage/update-orphanage'
import { DbUpdateOrphanage } from '@/data/usecases/orphanage/update-orphanage/db-update-orphanage'
import { OrphanagePrismaRepository } from '@/infra/db/prisma/orphanage/orphanage-prisma-repository'
import env from '@/main/config/env'

export const makeDbUpdateOrphanage = (): UpdateOrphanage => {
  const orphanagePrismaRepository = new OrphanagePrismaRepository(env.appUrl)
  return new DbUpdateOrphanage(orphanagePrismaRepository)
}
