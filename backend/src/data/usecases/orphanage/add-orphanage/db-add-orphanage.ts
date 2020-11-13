import { AddOrphanageRepository, OrphanageModel, AddOrphanage, AddOrphanageParams, StorageService } from './db-add-orphanage-protocols'

export class DbAddOrphanage implements AddOrphanage {
  constructor (
    private readonly addOrphanageRepository: AddOrphanageRepository,
    private readonly storageService: StorageService
  ) {}

  async add (orphanageData: AddOrphanageParams): Promise<OrphanageModel> {
    const orphanage = await this.addOrphanageRepository.add(orphanageData)
    const storageUrl = await this.storageService.getStorageUrl()
    orphanage.images = orphanage.images.map(image => ({ name: image.name, url: `${storageUrl}/${image.name}` }))
    return orphanage
  }
}
