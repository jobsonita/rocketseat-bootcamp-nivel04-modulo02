import { injectable, inject } from 'tsyringe'

import { sign } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: Omit<User, 'password'>
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect credentials')
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect credentials')
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.tokenDuration,
    })

    const { password: _, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }
}
