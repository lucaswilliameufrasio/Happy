import { createConnection, getConnection, Connection, EntitySchema, Repository } from 'typeorm'
import path from 'path'

export const TypeORMHelper = {
  connection: null as Connection,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    await createConnection({
      type: 'postgres',
      url: url,
      entities: [
        path.join(__dirname, '..', 'entities/**/!(*.map)')
      ],
      synchronize: true
    })

    this.connection = getConnection()
  },

  async disconnect () {
    await this.connection.close()
  },

  async getRepository (entity: EntitySchema): Promise<Repository<any>> {
    if (!this.connection?.isConnected) {
      await this.connect(this.url)
    }

    return this.connection.getRepository(entity)
  }
}
