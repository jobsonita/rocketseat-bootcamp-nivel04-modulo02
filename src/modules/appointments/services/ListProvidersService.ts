import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    })

    return users.map((user) => {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    })
  }
}
