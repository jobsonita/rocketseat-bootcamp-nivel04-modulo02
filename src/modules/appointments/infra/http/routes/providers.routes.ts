import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProvidersController from '../controllers/ProvidersController'

const router = Router()

const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providersController = new ProvidersController()

router.use(ensureAuthenticated)

router.get('/', providersController.index)

router.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
)
router.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
)

export default router
