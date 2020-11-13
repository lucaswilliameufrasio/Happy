import { createConnection, getConnection, Connection, EntitySchema, Repository, ConnectionOptions } from 'typeorm'

export const TypeORMHelper = {
  connection: null as Connection,
  connectionOptions: null as ConnectionOptions,

  async connect (connectionOptions: ConnectionOptions): Promise<void> {
    this.connectionOptions = connectionOptions
    await createConnection(connectionOptions)

    this.connection = getConnection()
  },

  async disconnect () {
    await this.connection.close()
    this.connection = null
  },

  async getRepository<T> (entity: EntitySchema): Promise<Repository<T>> {
    if (!this.connection?.isConnected) {
      await this.connect(this.connectionOptions)
    }

    return this.connection.getRepository(entity)
  }
}
