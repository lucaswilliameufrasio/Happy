import { OrphanageModel } from '@/domain/models/orphanage'
import { EntitySchema } from 'typeorm'

export const OrphanageEntity = new EntitySchema<OrphanageModel>({
  name: 'Orphanage',
  tableName: 'Orphanage',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: String
    },
    latitude: {
      type: 'decimal',
      precision: 65,
      scale: 30
    },
    longitude: {
      type: 'decimal',
      precision: 65,
      scale: 30
    },
    whatsapp: {
      type: String
    },
    about: {
      type: String
    },
    instructions: {
      type: String
    },
    opening_hours: {
      type: String
    },
    open_on_weekend: {
      type: Boolean
    },
    approved: {
      type: Boolean
    }
  }
})
