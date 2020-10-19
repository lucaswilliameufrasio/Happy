import { makeUpdateOrphanageValidation } from './update-orphanage-validation-factory'
import { makeDbUpdateOrphanage } from '@/main/factories/usecases/orphanage/update-orphanage/db-update-orphanage-factory'
import { makeDbLoadOrphanageById } from '@/main/factories/usecases/orphanage/load-orphanage-by-id/db-load-orphanage-by-id-factory'
import { UpdateOrphanageController } from '@/presentation/controllers/orphanage/update-orphanage/update-orphanage-controller'
import { Controller } from '@/presentation/protocols'

export const makeUpdateOrphanageController = (): Controller => {
  return new UpdateOrphanageController(makeUpdateOrphanageValidation(), makeDbUpdateOrphanage(), makeDbLoadOrphanageById())
}
