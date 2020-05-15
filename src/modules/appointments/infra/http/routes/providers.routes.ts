import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProvidersController from '../controllers/ProvidersController'

const router = Router()

const providersController = new ProvidersController()

router.use(ensureAuthenticated)

router.get('/', providersController.index)

export default router
