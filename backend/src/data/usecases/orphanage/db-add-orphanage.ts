import { AddOrphanageRepository, OrphanageModel, AddOrphanage, AddOrphanageParams } from './db-add-orphanage-protocols'

export class DbAddOrphanage implements AddOrphanage {
  constructor (private readonly addOrphanageRepository: AddOrphanageRepository) {}

  async add (orphanage: AddOrphanageParams): Promise<OrphanageModel> {
    await this.addOrphanageRepository.add(orphanage)
    return null
  }
}
