import { addImagesPropertyToOrphanageData, prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export class OrphanagePrismaRepository implements AddOrphanageRepository {
  constructor (private readonly appUrl: string) {}

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    const { name, latitude, longitude, about, instructions, approved, open_on_weekend: openOnWeekend, whatsapp, images } = data
    const createdOrphanage = await prisma.orphanage.create({
      data: {
        name,
        latitude,
        longitude,
        about,
        instructions,
        approved,
        open_on_weekend: openOnWeekend,
        whatsapp,
        OrphanageImage: {
          create: images
        }
      }
    })

    const orphanage = await prisma.orphanage.findOne({
      where: {
        id: createdOrphanage.id
      },
      include: {
        OrphanageImage: {
          where: {
            orphanageId: createdOrphanage.id
          }
        }
      }
    })

    const orphanageData = addImagesPropertyToOrphanageData(orphanage, this.appUrl)
    return orphanageData
  }
}
