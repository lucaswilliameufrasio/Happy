import { OrphanageImageModel } from '@/domain/models/orphanage'
import { EntitySchema } from 'typeorm'

export const OrphanageImageEntity = new EntitySchema<OrphanageImageModel>({
  name: 'OrphanageImage',
  tableName: 'orphanage-image',
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
