import React from 'react'
import { makeCreateOrphanageValidation } from './create-orphanage-validation-factory'
import { makeRemoteAddOrphanage } from '@/main/factories/usecases/add-orphanage/remote-add-orphanage-factory'
import { CreateOrphanage } from '@/presentation/pages'

export const makeCreateOrphanage = (): JSX.Element => {
  return (
    <CreateOrphanage
      addOrphanage={makeRemoteAddOrphanage()}
      validation={makeCreateOrphanageValidation()}
    />
  )
}
