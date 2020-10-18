import { OrphanageModel } from '@/domain/models/orphanage'
import { OrphanageImage, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const addImageUrl = (data: any, url: string): any[] => {
  const images: OrphanageImage[] = data.OrphanageImage
  const imagesUrl = images?.map(image => {
    const imageName: string = image.name
    const imageUrl = `${url}/image/${imageName}`
    return { name: imageUrl }
  })

  return imagesUrl
}

export const addImagesPropertyToOrphanageData = (data: any, url: string): OrphanageModel => {
  const { OrphanageImage, ...rest } = data

  const imagesUrl = addImageUrl(data, url)
  const orphanageData: OrphanageModel = Object.assign({}, rest, { images: imagesUrl })

  return orphanageData
}
