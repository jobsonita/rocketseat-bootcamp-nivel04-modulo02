import { inject, injectable } from 'tsyringe'

import { getHours } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

interface IHourAvailability {
  hour: number
  available: boolean
}

type IResponse = IHourAvailability[]

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      }
    )

    const hoursInDay = Array.from(
      { length: 18 - 8 },
      (value, index) => index + 8
    )

    const currentHour = getHours(new Date(Date.now()))

    const availability = hoursInDay.map((hour) => {
      const appointmentInHourExists = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      )

      return {
        hour,
        available: !appointmentInHourExists && hour > currentHour,
      }
    })

    return availability
  }
}
