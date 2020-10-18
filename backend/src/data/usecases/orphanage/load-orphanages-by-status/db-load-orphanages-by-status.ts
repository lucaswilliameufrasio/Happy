import { LoadOrphanagesByStatusRepository, LoadOrphanagesByStatus, OrphanageModel } from './db-load-orphanages-by-status-protocols'

export class DbLoadOrphanagesByStatus implements LoadOrphanagesByStatus {
  constructor (private readonly loadOrphanagesByStatusRepository: LoadOrphanagesByStatusRepository) {}

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    const orphanage = await this.loadOrphanagesByStatusRepository.loadByStatus(approvedStatus)
    return orphanage
  }
}
