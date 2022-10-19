import { Customer } from '@domain/entities'
import { CustomerRepository } from '@domain/repositories'
import { faker } from '@faker-js/faker'
import { Connection, RedisConnection } from '@infra/database'
import { CustomerRedisRepository } from '@infra/repositories'
import { config } from 'dotenv'

config()

describe('CustomerRedisRepository', () => {
  let connection: Connection
  let sut: CustomerRepository

  beforeAll(() => {
    connection = new RedisConnection(process.env.REDIS_HOST!)
    sut = new CustomerRedisRepository(connection)
  })

  afterAll(async () => {
    await connection.clearStorage()
    connection.close()
  })

  it('should not throws when persist a customer', async () => {
    const customer = new Customer({
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })
    await expect(sut.save(customer)).resolves.not.toThrow()
  })

  it('should be able to get a customer by key', async () => {
    const customer = new Customer({
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })
    await sut.save(customer)
    const key = `customer:${customer.getState().id}`
    const response = await sut.getOne(key)
    expect(response).toMatchObject(customer.getState())
  })
})
