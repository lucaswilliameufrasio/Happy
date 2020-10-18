import { LoadOrphanagesRepository, LoadOrphanages, OrphanageModel } from './db-load-orphanages-protocols'

export class DbLoadOrphanages implements LoadOrphanages {
  constructor (private readonly loadOrphanagesRepository: LoadOrphanagesRepository) {}

  async load (): Promise<OrphanageModel[]> {
    const orphanage = await this.loadOrphanagesRepository.load()
    return orphanage
  }
}
