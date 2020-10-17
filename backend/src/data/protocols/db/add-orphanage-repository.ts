import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export interface AddOrphanageRepository {
  add: (data: AddOrphanageParams) => Promise<OrphanageModel>
}
