
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orphanages', (req, res) => res.status(201).send())
}
