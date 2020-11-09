import 'module-alias/register'
import env from './config/env'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'
import { config } from 'dotenv'

prisma.$connect().then(async () => {
  await prisma.$queryRaw('SELECT revision from "public"."_Migration"')
  const app = (await import('./config/app')).default
  config()
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}).catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
})
