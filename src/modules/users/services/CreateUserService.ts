import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const userWithSameEmailExists = await this.usersRepository.findByEmail(
      email
    )

    if (userWithSameEmailExists) {
      throw new AppError("There's another user registered with that e-mail")
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
