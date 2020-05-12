import Appointment from '../infra/typeorm/entities/Appointment'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import CreateAppointmentService from './CreateAppointmentService'
import IndexAppointmentsService from './IndexAppointmentsService'

describe('IndexAppointments', () => {
  it('should be able to list appointments', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    )

    const indexAppointments = new IndexAppointmentsService(
      fakeAppointmentsRepository
    )

    const appointments: Appointment[] = []

    const newAppointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    })

    appointments.push(newAppointment)

    const listedAppointments = await indexAppointments.execute()

    expect(listedAppointments).toEqual(appointments)
  })
})
