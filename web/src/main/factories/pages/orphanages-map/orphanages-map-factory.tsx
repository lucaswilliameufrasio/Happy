import React from 'react'
import { makeRemoteLoadOrphanages } from '@/main/factories/usecases/load-orphanages/remote-load-orphanages-factory'
import { OrphanagesMap } from '@/presentation/pages'

export const makeOrphanagesMap = (): JSX.Element => {
  return (
    <OrphanagesMap
      loadOrphanages={makeRemoteLoadOrphanages()}
    />
  )
}
