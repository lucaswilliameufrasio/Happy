import { addImagesPropertyToOrphanageData, prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository'

export class OrphanagePrismaRepository implements AddOrphanageRepository, LoadOrphanageByIdRepository {
  constructor (private readonly appUrl: string) {}

  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    const { name, latitude, longitude, about, instructions, approved, opening_hours: openingHours, open_on_weekend: openOnWeekend, whatsapp, images } = data
    const createdOrphanage = await prisma.orphanage.create({
      data: {
        name,
        latitude,
        longitude,
        about,
        instructions,
        approved,
        opening_hours: openingHours,
        open_on_weekend: openOnWeekend,
        whatsapp,
        OrphanageImage: {
          create: images
        }
      }
    })

    const orphanage = await this.loadById(createdOrphanage.id)
    return orphanage
  }

  async loadById (orphanageId: number): Promise<OrphanageModel> {
    const orphanage = await prisma.orphanage.findOne({
      where: {
        id: orphanageId
      },
      include: {
        OrphanageImage: {
          where: {
            orphanageId: orphanageId
          }
        }
      }
    })

    const orphanageData = addImagesPropertyToOrphanageData(orphanage, this.appUrl)
    return orphanageData
  }
}
