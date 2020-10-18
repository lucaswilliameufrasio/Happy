import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanageByIdRepository {
  loadById: (orphanageId: number) => Promise<OrphanageModel>
}
