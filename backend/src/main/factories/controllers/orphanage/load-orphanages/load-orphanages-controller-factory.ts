import { makeDbLoadOrphanages } from '@/main/factories/usecases/orphanage/load-orphanages/db-load-orphanages-factory'
import { LoadOrphanagesController } from '@/presentation/controllers/orphanage/load-orphanages/load-orphanages-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadOrphanagesController = (): Controller => {
  return new LoadOrphanagesController(makeDbLoadOrphanages())
}
