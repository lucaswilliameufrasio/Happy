import { RemoteLoadOrphanages } from '@/data/usecases/load-orphanages/remote-load-orphanages'
import { LoadOrphanages } from '@/domain/usecases/load-orphanages'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteLoadOrphanages = (): LoadOrphanages => {
  return new RemoteLoadOrphanages(makeApiUrl('/orphanages?approved=true'), makeAxiosHttpClient())
}
