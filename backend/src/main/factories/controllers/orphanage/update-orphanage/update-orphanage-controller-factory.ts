import { UpdateOrphanageController } from '@/presentation/controllers/orphanage/update-orphanage/update-orphanage-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbUpdateOrphanage } from '@/main/factories/usecases/orphanage/update-orphanage/db-update-orphanage-factory'
import { makeUpdateOrphanageValidation } from './update-orphanage-validation-factory'

export const makeUpdateOrphanageController = (): Controller => {
  return new UpdateOrphanageController(makeUpdateOrphanageValidation(), makeDbUpdateOrphanage())
}
