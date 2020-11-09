import { OrphanageImage } from '@prisma/client'
import { EntitySchema } from 'typeorm'

export const OrphanageImageEntity = new EntitySchema<OrphanageImage>({
  name: 'OrphanageImage',
  tableName: 'OrphanageImage',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: String
    },
    orphanageId: {
      type: Number
    }
  },
  relations: {
    orphanageId: {
      type: 'many-to-one',
      target: 'Orphanage',
      joinColumn: {
        name: 'orphanageId',
        referencedColumnName: 'id'
      }
    }
  }
})
