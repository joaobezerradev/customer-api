import { RepositoryFactory } from '@domain/factories'
import { Connection, RedisConnection } from '@infra/database'
import { RedisRepositoryFactory } from '@infra/factories'

describe('RedisRepositoryFactory', () => {
  let connection: Connection
  let sut: RepositoryFactory

  beforeAll(() => {
    connection = new RedisConnection(process.env.REDIS_HOST!)
    sut = new RedisRepositoryFactory(connection)
  })

  afterAll(() => connection.close())

  it('should be able to create a instance of CustomerRepository', async () => {
    expect(() => sut.createCustomerRepository()).not.toThrow()
  })
})
