import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'

export interface UpdateOrphanageRepository {
  update: (updateOrphanageData: UpdateOrphanageParams) => Promise<void>
}
