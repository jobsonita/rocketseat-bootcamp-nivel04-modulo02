import { inject, injectable } from 'tsyringe'

import { getHours, isBefore, startOfHour } from 'date-fns'

import AppError from '@shared/errors/AppError'

import Appointment from '../infra/typeorm/entities/Appointment'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (user_id === provider_id) {
      throw new AppError('Cannot create an appointment with yourself')
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Cannot create an appointment on a past date')
    }

    const appointmentHour = getHours(appointmentDate)
    if (appointmentHour < 8 || appointmentHour > 17) {
      throw new AppError('Cannot create appointments before 8am or after 5pm')
    }

    const bookedAppointmentInSameDateExists = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (bookedAppointmentInSameDateExists) {
      throw new AppError("There's another appointment booked at that time")
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })

    return appointment
  }
}
