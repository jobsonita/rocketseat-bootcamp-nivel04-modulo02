import { getDate, getMonth, getYear, isEqual } from 'date-fns'
import { uuid } from 'uuidv4'

import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), provider_id, user_id, date })

    this.appointments.push(appointment)

    return appointment
  }

  public async list(): Promise<Appointment[]> {
    return this.appointments
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const existentAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    )
    return existentAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    return this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    return this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )
  }
}
