import { RemoteAddOrphanage } from '@/data/usecases/add-orphanage/remote-add-orphanage'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAddOrphanage = (): AddOrphanage => {
  return new RemoteAddOrphanage(makeApiUrl('/orphanages'), makeAxiosHttpClient())
}
