import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanageByIdRepository {
  loadById: (id: number) => Promise<OrphanageModel>
}
