import { UpdateOrphanageParams } from '@/domain/usecases/orphanage/update-orphanage'
import { UpdateOrphanageRepository, UpdateOrphanage } from './db-update-orphanage-protocols'

export class DbUpdateOrphanage implements UpdateOrphanage {
  constructor (private readonly updateOrphanageRepository: UpdateOrphanageRepository) {}

  async update (updateOrphanageData: UpdateOrphanageParams): Promise<void> {
    await this.updateOrphanageRepository.update(updateOrphanageData)
  }
}
