import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository

let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listProviders = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to list the providers', async () => {
    const { password: _, ...provider1 } = await fakeUsersRepository.create({
      name: 'Gobarber Provider1',
      email: 'provider1@gobarber.com',
      password: '123456',
    })

    const { password: __, ...provider2 } = await fakeUsersRepository.create({
      name: 'Gobarber Provider2',
      email: 'provider2@gobarber.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const providers = await listProviders.execute({ user_id: loggedUser.id })

    expect(providers).toEqual([provider1, provider2])
  })
})
