export type OrphanageImageModel = {
  id: number
  name: string
  url?: string
  orphanageId: number
}

export type OrphanageModel = {
  id: number
  name: string
  latitude: number
  longitude: number
  whatsapp: string
  about: string
  instructions: string
  opening_hours: string
  open_on_weekend: boolean
  approved: boolean
  images: Array<Omit<OrphanageImageModel, 'id'|'orphanageId'>>
}
