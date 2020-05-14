import AppError from '@shared/errors/AppError'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider

let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeMailProvider = new FakeMailProvider()

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider
    )
  })

  it('should be able to recover the password using the email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await sendForgotPasswordEmail.execute({ email: 'user@gobarber.com' })

    expect(generateToken).toHaveBeenCalledWith(user.id)
    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover the password of an inexistent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'user@gobarber.com' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
