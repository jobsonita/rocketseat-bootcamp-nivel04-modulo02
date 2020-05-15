import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const day = Number(req.query.day)
    const month = Number(req.query.month)
    const year = Number(req.query.year)

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    )

    const provider = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    })

    return res.json(provider)
  }
}
