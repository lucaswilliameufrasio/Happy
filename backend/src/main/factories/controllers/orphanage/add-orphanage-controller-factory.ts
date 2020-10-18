import { AddOrphanageController } from '@/presentation/controllers/orphanage/add-orphanage/add-orphanage-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddOrphanage } from '../../usecases/orphanage/add-orphanage/db-add-orphanage-factory'
import { makeAddOrphanageValidation } from './add-orphanage-validation-factory'

export const makeAddOrphanageController = (): Controller => {
  return new AddOrphanageController(makeAddOrphanageValidation(), makeDbAddOrphanage())
}
