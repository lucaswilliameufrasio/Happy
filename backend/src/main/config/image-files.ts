import express, { Express } from 'express'
import path from 'path'

export default (app: Express): void => {
  app.use('/image', express.static(path.join(__dirname, '..', '..', 'uploads')))
}
