import { LoadOrphanageByIdRepository, LoadOrphanageById, OrphanageModel, StorageService } from './db-load-orphanage-by-id-protocols'

export class DbLoadOrphanageById implements LoadOrphanageById {
  constructor (
    private readonly loadOrphanageByIdRepository: LoadOrphanageByIdRepository,
    private readonly storageService: StorageService
  ) {}

  async loadById (orphanageId: number): Promise<OrphanageModel> {
    const orphanage = await this.loadOrphanageByIdRepository.loadById(orphanageId)
    const storageUrl = await this.storageService.getStorageUrl()
    if (storageUrl) {
      orphanage.images = orphanage.images.map(image => ({ name: image.name, url: `${storageUrl}/${image.name}` }))
    }

    return orphanage
  }
}
