
import { adaptRoute } from '@/main/adapters/express-routes-adapters'
import { makeAddOrphanageController } from '@/main/factories/controllers/orphanage/add-orphanage-controller-factory'
import { multerMiddleware } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orphanages', multerMiddleware.array('images'),adaptRoute(makeAddOrphanageController()))
}
