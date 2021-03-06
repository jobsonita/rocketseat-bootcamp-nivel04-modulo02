import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO'

import User from '../infra/typeorm/entities/User'

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>

  save(user: User): Promise<User>

  findById(id: string): Promise<User | undefined>

  findByEmail(email: string): Promise<User | undefined>

  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
}
