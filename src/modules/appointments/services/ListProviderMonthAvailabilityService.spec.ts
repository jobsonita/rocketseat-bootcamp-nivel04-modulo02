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
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 4, 20, hour, 0, 0),
      })
    )

    await Promise.all(appointmentCreationPromises)

    await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider-id',
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

  it('should list days in the past as not available', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 3, 8).getTime())

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider-id',
      month: 5,
      year: 2020,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: false },
        { day: 3, available: true },
        { day: 4, available: true },
        { day: 5, available: true },
      ])
    )
  })
})
