import { LoadOrphanagesByStatusRepository, LoadOrphanagesByStatus, OrphanageModel, StorageService } from './db-load-orphanages-by-status-protocols'

export class DbLoadOrphanagesByStatus implements LoadOrphanagesByStatus {
  constructor (
    private readonly loadOrphanagesByStatusRepository: LoadOrphanagesByStatusRepository,
    private readonly storageService: StorageService
  ) {}

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    let orphanages = await this.loadOrphanagesByStatusRepository.loadByStatus(approvedStatus)
    const storageUrl = await this.storageService.getStorageUrl()
    orphanages = orphanages.map(orphanage => {
      orphanage.images = orphanage.images.map(image => ({ name: image.name, url: `${storageUrl}/${image.name}` }))

      return orphanage
    })
    return orphanages
  }
}
