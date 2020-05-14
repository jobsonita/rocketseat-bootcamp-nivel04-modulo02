import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeStorageProvider: FakeStorageProvider
let fakeUsersRepository: FakeUsersRepository

let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider()
    fakeUsersRepository = new FakeUsersRepository()

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
  })

  it('should be able to update a user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update avatar of inexistent user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: '123123',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new-avatar.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('new-avatar.jpg')
  })
})
