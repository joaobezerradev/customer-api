import { GetCustomer } from '@application/use-cases'
import { NotFoundException } from '@domain/exceptions'
import { RepositoryFactory } from '@domain/factories'
import { faker } from '@faker-js/faker'
import { Connection, RedisConnection } from '@infra/database'
import { RedisRepositoryFactory } from '@infra/factories'

describe('GetCustomer', () => {
  let connection: Connection
  let repositoryFactory: RepositoryFactory
  let sut: GetCustomer

  beforeAll(() => {
    connection = new RedisConnection(process.env.REDIS_HOST!)
    repositoryFactory = new RedisRepositoryFactory(connection)
    sut = new GetCustomer(repositoryFactory)
  })

  afterAll(async () => {
    await connection.clearStorage()
    connection.close()
  })

  it('should throws if customer is not found.', async () => {
    const input = { id: faker.datatype.uuid() }
    await expect(async () => sut.execute(input)).rejects.toThrowError(NotFoundException)
  })

  it('should return a customer by id.', async () => {
    const data = {
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    }
    const key = `customer:${data.id}`
    await connection.save(key, data)
    const response = await sut.execute({ id: data.id })
    expect(response).toStrictEqual(data)
  })
})
