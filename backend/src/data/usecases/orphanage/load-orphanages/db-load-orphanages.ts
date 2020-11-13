import { LoadOrphanagesRepository, LoadOrphanages, OrphanageModel, StorageService } from './db-load-orphanages-protocols'

export class DbLoadOrphanages implements LoadOrphanages {
  constructor (
    private readonly loadOrphanagesRepository: LoadOrphanagesRepository,
    private readonly storageService: StorageService
  ) {}

  async load (): Promise<OrphanageModel[]> {
    let orphanages = await this.loadOrphanagesRepository.load()
    const storageUrl = await this.storageService.getStorageUrl()
    if (orphanages) {
      orphanages = orphanages.map(orphanage => {
        orphanage.images = orphanage.images.map(image => ({ name: image.name, url: `${storageUrl}/${image.name}` }))

        return orphanage
      })
    }
    return orphanages
  }
}
