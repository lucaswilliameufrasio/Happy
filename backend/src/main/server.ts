import 'module-alias/register'
import env from './config/env'
import { typeORMConnectionOptions } from './config/typeorm-config'
import { TypeORMHelper } from '@/infra/db/typeorm/helpers'
import { config } from 'dotenv'

TypeORMHelper.connect(typeORMConnectionOptions).then(async () => {
  const app = (await import('./config/app')).default
  config()
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}).catch((error) => {
  console.log(error)
})
