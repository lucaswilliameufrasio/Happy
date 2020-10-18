import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanagesRepository {
  load: () => Promise<OrphanageModel[]>
}
