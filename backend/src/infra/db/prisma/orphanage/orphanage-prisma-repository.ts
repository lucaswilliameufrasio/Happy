import { addImagesPropertyToOrphanageData, prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { AddOrphanageRepository } from '@/data/protocols/db/orphanage/add-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'
import { LoadOrphanageByIdRepository } from '@/data/protocols/db/orphanage/load-orphanage-by-id-repository'
import { LoadOrphanagesRepository } from '@/data/protocols/db/orphanage/load-orphanages-repository'
import { LoadOrphanagesByStatusRepository } from '@/data/protocols/db/orphanage/load-orphanages-by-status-repository'

export class OrphanagePrismaRepository implements AddOrphanageRepository, LoadOrphanageByIdRepository, LoadOrphanagesRepository, LoadOrphanagesByStatusRepository {
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

  async load (): Promise<OrphanageModel[]> {
    const orphanages = await prisma.orphanage.findMany({
      include: {
        OrphanageImage: true
      }
    })

    const orphanagesData = orphanages.map(orphanage => addImagesPropertyToOrphanageData(orphanage, this.appUrl))
    return orphanagesData
  }

  async loadByStatus (approvedStatus: boolean): Promise<OrphanageModel[]> {
    const orphanages = await prisma.orphanage.findMany({
      where: {
        approved: approvedStatus
      },
      include: {
        OrphanageImage: true
      }
    })

    const orphanagesData = orphanages.map(orphanage => addImagesPropertyToOrphanageData(orphanage, this.appUrl))
    return orphanagesData
  }
}
