import { OrphanageModel } from '@/domain/models'

export interface AddOrphanage {
  add: (params: AddOrphanage.Params) => Promise<AddOrphanage.Model>
}

export namespace AddOrphanage {
  export type Params = {
    name: string
    latitude: number
    longitude: number
    whatsapp: string
    about: string
    instructions: string
    opening_hours: string
    open_on_weekend: boolean
    images: File[]
  }

  export type Model = OrphanageModel
}
