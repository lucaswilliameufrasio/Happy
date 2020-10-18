import { LoadOrphanageByIdController } from '@/presentation/controllers/orphanage/load-orphanage-by-id/load-orphanage-by-id-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadOrphanageById } from '@/main/factories/usecases/orphanage/load-orphanage-by-id/db-load-orphanage-by-id-factory'

export const makeLoadOrphanageByIdController = (): Controller => {
  return new LoadOrphanageByIdController(makeDbLoadOrphanageById())
}
