import { OrphanageModel } from '@/domain/models'

export interface LoadOrphanageById {
  loadById: () => Promise<LoadOrphanageById.Model>
}

export namespace LoadOrphanageById {
  export type Model = OrphanageModel
}
