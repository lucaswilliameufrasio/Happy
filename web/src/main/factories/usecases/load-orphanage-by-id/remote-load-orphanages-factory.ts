import { RemoteLoadOrphanageById } from '@/data/usecases/load-orphanages-by-id/remote-load-orphanage-by'
import { LoadOrphanageById } from '@/domain/usecases/load-orphanage-by-id'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteLoadOrphanageById = (id: string): LoadOrphanageById => {
  return new RemoteLoadOrphanageById(makeApiUrl(`/orphanages/${id}`), makeAxiosHttpClient())
}
