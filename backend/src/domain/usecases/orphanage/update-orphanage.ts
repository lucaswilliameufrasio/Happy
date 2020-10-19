import { UpdateOrphanageModel } from '@/domain/models/orphanage'

export type UpdateOrphanageParams = {
  orphanageId: number
  updateData: UpdateOrphanageModel
}

export interface UpdateOrphanage {
  update: (data: UpdateOrphanageParams) => Promise<void>
}
