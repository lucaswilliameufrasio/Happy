export default {
  port: process.env.PORT || 7777,
  appUrl: process.env.APP_URL || 'http://localhost:7777',
  storageUrl: process.env.STORAGE_URL || 'http://localhost:7777/image',
  dbDriver: process.env.DATABASE_DRIVER || 'postgres',
  dbUrl: process.env.DATABASE_URL || 'postgresql://postgres:happy@postgres:5432/happy?schema=public',
  typeORMEnableLogging: process.env.TYPEORM_LOGGING || false,
  typeORMEnableSynchronization: process.env.TYPEORM_SYNCHRONIZE || false
}
