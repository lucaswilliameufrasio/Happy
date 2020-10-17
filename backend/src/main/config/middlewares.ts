import { bodyParser, contentType } from '@/main/middlewares'
import { Express } from 'express'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
