import { OrphanageModel } from '@/domain/models'

export type AddOrphanageParams = Omit<OrphanageModel, 'id'|'approved'>

export interface AddOrphanage {
  add: (params: AddOrphanageParams) => Promise<OrphanageModel>
}
