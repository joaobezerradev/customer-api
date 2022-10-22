import { RepositoryFactory } from '@domain/factories'
import { UpdateCustomer } from '@application/use-cases'
import { Connection, RedisConnection } from '@infra/database'
import { RedisRepositoryFactory } from '@infra/factories'

import { faker } from '@faker-js/faker'
import { ConflictException, NotFoundException } from '@domain/exceptions'

describe('UpdateCustomer', () => {
  let connection: Connection
  let repositoryFactory: RepositoryFactory
  let sut: UpdateCustomer

  beforeAll(() => {
    connection = new RedisConnection(process.env.REDIS_HOST!)
    repositoryFactory = new RedisRepositoryFactory(connection)
    sut = new UpdateCustomer(repositoryFactory)
  })

  afterAll(async () => {
    await connection.clearStorage()
    connection.close()
  })

  it('should throws if customer is not found.', async () => {
    await expect(() => sut.execute({
      id: faker.datatype.uuid(),
      newId: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })).rejects.toThrowError(new NotFoundException())
  })

  it('should execute and return the data.', async () => {
    const data = {
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    }
    const key = `customer:${data.id}`
    await connection.save(key, data)
    const updateData = {
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    }
    const response = await sut.execute({
      id: data.id,
      newId: updateData.id,
      document: updateData.document,
      name: updateData.name
    })
    expect(response).toStrictEqual(updateData)
  })

  it('should throws if new id already is database.', async () => {
    const data = {
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    }
    const key = `customer:${data.id}`
    await connection.save(key, data)
    await expect(() => sut.execute({
      id: data.id,
      newId: data.id,
      document: data.document,
      name: data.name
    })).rejects.toThrowError(new ConflictException())
  })
})
