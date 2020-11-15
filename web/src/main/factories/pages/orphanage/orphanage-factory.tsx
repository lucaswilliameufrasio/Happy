import React from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteLoadOrphanageById } from '@/main/factories/usecases/load-orphanage-by-id/remote-load-orphanages-factory'
import { Orphanage } from '@/presentation/pages'

type Params = {
  id: string
}

export const makeOrphanage = (): JSX.Element => {
  const { id } = useParams<Params>()

  return (
    <Orphanage
      loadOrphanageById={makeRemoteLoadOrphanageById(id)}
    />
  )
}
