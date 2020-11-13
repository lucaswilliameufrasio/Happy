import { LocalStorageService } from './local-storage-service'

describe('LocalStorageService', () => {
  test('Should return the storage url', async () => {
    const sut = new LocalStorageService()
    const url = await sut.getStorageUrl()
    expect(url).toBeTruthy()
  })
})
