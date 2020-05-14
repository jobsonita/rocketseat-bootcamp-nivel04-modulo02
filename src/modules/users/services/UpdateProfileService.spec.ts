import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import UpdateProfileService from './UpdateProfileService'

let fakeHashProvider: FakeHashProvider
let fakeUsersRepository: FakeUsersRepository

let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'GoBarber User',
      email: 'gobarber_user@gobarber.com',
    })

    expect(updatedUser.name).toBe('GoBarber User')
    expect(updatedUser.email).toBe('gobarber_user@gobarber.com')
  })

  it('should not be able to update the profile of inexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'inexistent-user-id',
        name: 'GoBarber User',
        email: 'gobarber_user@gobarber.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Gobarber User 1',
      email: 'user1@gobarber.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'Gobarber User 2',
      email: 'user2@gobarber.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'GoBarber User 2',
        email: 'user1@gobarber.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    await updateProfile.execute({
      user_id: user.id,
      name: 'GoBarber User',
      email: 'user@gobarber.com',
      old_password: '123456',
      password: '123123',
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(updatedUser?.password).toBe('123123')
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'GoBarber User',
        email: 'user@gobarber.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'GoBarber User',
        email: 'user@gobarber.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
