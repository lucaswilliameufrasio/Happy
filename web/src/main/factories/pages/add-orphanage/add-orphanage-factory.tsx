import React from 'react'
import { makeAddOrphanageValidation } from './add-orphanage-validation-factory'
import { makeRemoteAddOrphanage } from '@/main/factories/usecases/add-orphanage/remote-add-orphanage-factory'
import { AddOrphanage } from '@/presentation/pages'

export const makeAddOrphanage = (): JSX.Element => {
  return (
    <AddOrphanage
      addOrphanage={makeRemoteAddOrphanage()}
      validation={makeAddOrphanageValidation()}
    />
  )
}
