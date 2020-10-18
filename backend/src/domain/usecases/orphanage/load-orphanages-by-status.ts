import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanagesByStatus {
  loadByStatus: (approvedStatus: boolean) => Promise<OrphanageModel[]>
}
