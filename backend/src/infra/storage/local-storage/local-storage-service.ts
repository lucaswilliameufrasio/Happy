import { StorageService } from '@/data/protocols/storage/storage-service'
import env from '@/main/config/env'

export class LocalStorageService implements StorageService {
  async getStorageUrl (): Promise<string> {
    return env.storageUrl
  }
}
