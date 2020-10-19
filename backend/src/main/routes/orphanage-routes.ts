
import { adaptRoute } from '@/main/adapters/express-routes-adapters'
import { makeAddOrphanageController } from '@/main/factories/controllers/orphanage/add-orphanage/add-orphanage-controller-factory'
import { makeLoadOrphanageByIdController } from '@/main/factories/controllers/orphanage/load-orphanage-by-id/load-orphanage-by-id-controller-factory'
import { makeLoadOrphanagesController } from '@/main/factories/controllers/orphanage/load-orphanages/load-orphanages-controller-factory'
import { makeLoadOrphanagesByStatusController } from '../factories/controllers/orphanage/load-orphanages-by-status/load-orphanages-by-status-controller-factory'
import { multerMiddleware } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/orphanages', adaptRoute(makeLoadOrphanagesController()))
  router.post('/orphanages', multerMiddleware.array('images'),adaptRoute(makeAddOrphanageController()))
  router.get('/orphanages/status', adaptRoute(makeLoadOrphanagesByStatusController()))
  router.get('/orphanages/:orphanageId', adaptRoute(makeLoadOrphanageByIdController()))
}
