import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanageById {
  loadById: (orphanageId: number) => Promise<OrphanageModel>
}
