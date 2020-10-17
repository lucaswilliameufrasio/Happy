import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { AddOrphanageRepository } from '@/data/protocols/db/add-orphanage-repository'
import { OrphanageModel } from '@/domain/models/orphanage'
import { AddOrphanageParams } from '@/domain/usecases/orphanage/add-orphanage'

export class OrphanagePrismaRepository implements AddOrphanageRepository {
  async add (data: AddOrphanageParams): Promise<OrphanageModel> {
    const orphanage = await prisma.orphanage.create({
      data
    })

    return orphanage
  }
}
