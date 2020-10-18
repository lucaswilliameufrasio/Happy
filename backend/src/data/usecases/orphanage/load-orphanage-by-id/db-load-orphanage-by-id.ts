import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository copy'
import { LoadOrphanageById } from '@/domain/usecases/orphanage/load-orphanage-by-id'
import { OrphanageModel } from '../add-orphanage/db-add-orphanage-protocols'

export class DbLoadOrphanageById implements LoadOrphanageById {
  constructor (private readonly loadOrphanageByIdRepository: LoadOrphanageByIdRepository) {}

  async loadById (id: number): Promise<OrphanageModel> {
    const orphanage = await this.loadOrphanageByIdRepository.loadById(id)
    return orphanage
  }
}
