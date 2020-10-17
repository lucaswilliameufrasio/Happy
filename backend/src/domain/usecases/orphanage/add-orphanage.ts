import { OrphanageModel } from '@/domain/models/orphanage'

export type AddOrphanageParams = Omit<OrphanageModel, 'id'>

export interface AddOrphanage {
  add: (orphanage: AddOrphanageParams) => Promise<OrphanageModel>
}
