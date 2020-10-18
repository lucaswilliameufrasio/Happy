import { AddOrphanageRepository, OrphanageModel, AddOrphanage, AddOrphanageParams } from './db-add-orphanage-protocols'

export class DbAddOrphanage implements AddOrphanage {
  constructor (private readonly addOrphanageRepository: AddOrphanageRepository) {}

  async add (orphanageData: AddOrphanageParams): Promise<OrphanageModel> {
    const orphanage = await this.addOrphanageRepository.add(orphanageData)
    return orphanage
  }
}
