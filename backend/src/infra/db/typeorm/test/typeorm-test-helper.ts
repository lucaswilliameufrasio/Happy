import { ConnectionOptions } from 'typeorm'
import path from 'path'

export const testConnectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [
    path.join(__dirname, '..', 'entities/**/!(*.map)')
  ],
  synchronize: true,
  logging: false
}
