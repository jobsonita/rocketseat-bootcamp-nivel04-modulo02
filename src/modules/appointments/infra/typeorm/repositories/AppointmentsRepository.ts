import { getRepository, Repository } from 'typeorm'

import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '../entities/Appointment'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })
    await this.ormRepository.save(appointment)
    return appointment
  }

  public async list(): Promise<Appointment[]> {
    return this.ormRepository.find()
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({ where: { date } })
  }
}
