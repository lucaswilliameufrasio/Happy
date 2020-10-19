import { makeDbLoadOrphanagesByStatus } from '@/main/factories/usecases/orphanage/load-orphanages-by-status/db-load-orphanages-by-status-factory'
import { LoadOrphanagesByStatusController } from '@/presentation/controllers/orphanage/load-orphanages-by-status/load-orphanages-by-status-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadOrphanagesByStatusController = (): Controller => {
  return new LoadOrphanagesByStatusController(makeDbLoadOrphanagesByStatus())
}
