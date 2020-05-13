import { uuid } from 'uuidv4'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

import UserToken from '@modules/users/infra/typeorm/entities/UserToken'

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, { id: uuid(), token: uuid(), user_id })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findById(id: string): Promise<UserToken | undefined> {
    return this.userTokens.find((user) => user.id === id)
  }
}