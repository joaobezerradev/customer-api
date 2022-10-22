import { CreateCustomerCase } from '@application/use-cases'
import { CreateCustomer } from '@application/use-cases/contracts'
import { RepositoryFactory } from '@domain/factories'
import { faker } from '@faker-js/faker'
import { Connection, RedisConnection } from '@infra/database'
import { RedisRepositoryFactory } from '@infra/factories'

describe('CreateCustomer', () => {
  let connection: Connection
  let repositoryFactory: RepositoryFactory
  let sut: CreateCustomer

  beforeAll(() => {
    connection = new RedisConnection(process.env.REDIS_HOST!)
    repositoryFactory = new RedisRepositoryFactory(connection)
    sut = new CreateCustomerCase(repositoryFactory)
  })

  afterAll(async () => {
    await connection.clearStorage()
    connection.close()
  })

  it('should execute and return the data', async () => {
    const input = {
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    }
    const response = await sut.execute(input)
    expect(input).toStrictEqual(response)
  })
})
