import { OrphanageModel } from '@/domain/models/orphanage'

export interface LoadOrphanages {
  load: () => Promise<OrphanageModel[]>
}
