import { TypeORMHelper as sut } from './typeorm-helper'
import { testConnectionOptions } from '@/infra/db/typeorm/test/typeorm-test-helper'
import { OrphanageEntity } from '@/infra/db/typeorm/entities/orphanage-entity'

describe('TypeORMHelper', () => {
  beforeAll(async () => {
    await sut.connect(testConnectionOptions)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if database is down', async () => {
    let orphanageRepository = await sut.getRepository(OrphanageEntity)

    expect(orphanageRepository).toBeTruthy()
    await sut.disconnect()
    orphanageRepository = await sut.getRepository(OrphanageEntity)

    expect(orphanageRepository).toBeTruthy()
  })
})
