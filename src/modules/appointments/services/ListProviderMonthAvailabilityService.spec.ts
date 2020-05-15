import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository

let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the month availability of a provider', async () => {
    const hours = Array.from({ length: 18 - 8 }, (value, index) => index + 8)

    const appointmentCreationPromises = hours.map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: 'id',
        date: new Date(2020, 4, 20, hour, 0, 0),
      })
    )

    await Promise.all(appointmentCreationPromises)

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'id',
      month: 5,
      year: 2020,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    )
  })
})
