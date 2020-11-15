export type OrphanageImageModel = {
  name: string
  url: string
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
  images: OrphanageImageModel[]
}
