import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import CreateUserService from './CreateUserService'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeHashProvider = new FakeHashProvider()
    const fakeUsersRepository = new FakeUsersRepository()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    const fakeHashProvider = new FakeHashProvider()
    const fakeUsersRepository = new FakeUsersRepository()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const email = 'user@gobarber.com'

    await createUser.execute({
      name: 'Gobarber User',
      email,
      password: '123456',
    })

    expect(
      createUser.execute({
        name: 'Gobarber User',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
