import { OrphanageModel } from '@/domain/models/orphanage'

export type AddOrphanageParams = Omit<OrphanageModel, 'id'|'image'>

export interface AddOrphanage {
  add: (orphanage: AddOrphanageParams) => Promise<OrphanageModel>
}
