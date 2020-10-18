import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanageById {
  loadById: (id: number) => Promise<OrphanageModel>
}
