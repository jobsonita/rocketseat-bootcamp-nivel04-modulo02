import { inject, injectable } from 'tsyringe'

import { getDate, getDaysInMonth } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  month: number
  year: number
}

interface IDayAvailability {
  day: number
  available: boolean
}

type IResponse = IDayAvailability[]

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      }
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const daysInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1
    )

    const availability = daysInMonth.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day
      )

      return {
        day,
        available: appointmentsInDay.length < 10,
      }
    })

    return availability
  }
}
