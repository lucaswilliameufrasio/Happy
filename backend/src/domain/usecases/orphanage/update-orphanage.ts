import { OrphanageModel } from '@/domain/models/orphanage'

export type UpdateOrphanageParams = {
  orphanageId: number
  updateData: Omit<OrphanageModel, 'id'|'images'>
}

export interface UpdateOrphanage {
  update: (data: UpdateOrphanageParams) => Promise<void>
}
