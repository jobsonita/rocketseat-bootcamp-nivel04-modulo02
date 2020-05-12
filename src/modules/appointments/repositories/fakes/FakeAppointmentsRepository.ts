import { isEqual } from 'date-fns'
import { uuid } from 'uuidv4'

import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), provider_id, date })

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
}
