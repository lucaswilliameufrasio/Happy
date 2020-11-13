import { ConnectionOptions } from 'typeorm'
import path from 'path'
import env from './env'

export const typeORMConnectionOptions: ConnectionOptions = {
  type: env.dbDriver as any,
  url: env.dbUrl,
  entities: [
    path.join(__dirname, '..', '..', 'infra', 'db', 'typeorm', 'entities/**/!(*.map)')
  ],
  synchronize: Boolean(env.typeORMEnableLogging),
  logging: Boolean(env.typeORMEnableSynchronization)
}
