import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'
import { Connection } from '@infra/database'
import { CustomerRedisRepository } from '@infra/repositories'

export class RedisRepositoryFactory implements RepositoryFactory {
  constructor (private readonly connection: Connection) { }

  createCustomerRepository (): CustomerRepository {
    return new CustomerRedisRepository(this.connection)
  }
}
