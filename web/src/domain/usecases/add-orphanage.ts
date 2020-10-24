import { OrphanageModel } from '@/domain/models'

export interface AddOrphanage {
  add: (params: AddOrphanage.Params) => Promise<AddOrphanage.Model>
}

export namespace AddOrphanage {
  export type Params = Omit<OrphanageModel, 'id'|'approved'>

  export type Model = OrphanageModel
}
