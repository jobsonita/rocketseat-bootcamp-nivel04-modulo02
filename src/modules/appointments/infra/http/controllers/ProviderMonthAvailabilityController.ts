import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const month = Number(req.query.month)
    const year = Number(req.query.year)

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    )

    const provider = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    })

    return res.json(provider)
  }
}
