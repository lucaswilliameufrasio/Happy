import { OrphanageModel } from '@/domain/models'

export interface LoadOrphanages {
  load: () => Promise<LoadOrphanages.Model[]>
}

export namespace LoadOrphanages {
  export type Model = OrphanageModel
}
