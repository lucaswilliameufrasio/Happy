import { createConnection, getConnection, Connection, EntitySchema, Repository } from 'typeorm'
import path from 'path'

export const TypeORMHelper = {
  connection: null as Connection,
  url: null as string,
  synchronize: null as boolean,

  async connect (
    url: string,
    synchronize: boolean = true
  ): Promise<void> {
    this.url = url
    this.synchronize = synchronize
    await createConnection({
      type: 'postgres',
      url: url,
      entities: [
        path.join(__dirname, '..', 'entities/**/!(*.map)')
      ],
      synchronize: synchronize
    })

    this.connection = getConnection()
  },

  async disconnect () {
    await this.connection.close()
  },

  async getRepository (entity: EntitySchema): Promise<Repository<any>> {
    if (!this.connection?.isConnected) {
      await this.connect(this.url, this.synchronize)
    }

    return this.connection.getRepository(entity)
  }
}
