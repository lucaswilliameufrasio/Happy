import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanagesByStatusRepository {
  loadByStatus: (approvedStatus: boolean) => Promise<OrphanageModel[]>
}
