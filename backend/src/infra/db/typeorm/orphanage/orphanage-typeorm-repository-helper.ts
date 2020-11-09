import { OrphanageModel } from '@/domain/models/orphanage'

export const OrphanageTypeORMHelper = {
  assignImageURL (data: OrphanageModel, url: string): OrphanageModel {
    if (!data) return null
    const { images, ...rest } = data

    const imagesWithUrl = images.length > 0 && images.map(image => {
      const imageUrl = `${url}/${image.name}`
      return {
        name: image.name,
        url: imageUrl
      }
    })
    const orphanageData: OrphanageModel = Object.assign({}, rest, { images: imagesWithUrl })

    return orphanageData
  }
}
