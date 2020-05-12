// import AppError from '@shared/errors/AppError'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUsersRepository = new FakeUsersRepository()

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    )

    await fakeUsersRepository.create({
      name: 'User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({ email: 'user@gobarber.com' })

    expect(sendMail).toHaveBeenCalled()
  })
})
