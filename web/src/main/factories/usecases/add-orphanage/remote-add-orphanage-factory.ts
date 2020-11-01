import { RemoteAddOrphanage } from '@/data/usecases/remote-add-orphanage'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAddOrphanage = (): AddOrphanage => {
  return new RemoteAddOrphanage(makeApiUrl('/orphanages'), makeAxiosHttpClient())
}
