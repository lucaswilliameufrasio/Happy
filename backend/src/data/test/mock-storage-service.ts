import { StorageService } from '@/data/protocols/storage/storage-service'
import faker from 'faker'

export class StorageServiceSpy implements StorageService {
  url = faker.internet.url()

  async getStorageUrl (): Promise<string> {
    return this.url
  }
}
