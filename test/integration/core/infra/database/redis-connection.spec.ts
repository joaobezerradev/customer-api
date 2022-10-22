import { Connection, RedisConnection } from '@infra/database'
import { BadGatewayException } from '@nestjs/common'

describe('RedisConnection', () => {
  let sut: Connection

  beforeAll(() => {
    sut = new RedisConnection(process.env.REDIS_HOST!)
  })

  it('should be possible to persist and consult the data.', async () => {
    const key = 'test-key'
    const data = { data: 'some-data' }
    await sut.save(key, data)
    const response = await sut.query<{ data: string }>(key)
    expect(response).toMatchObject(data)
  })

  it('should return null if data is not found.', async () => {
    const key = 'not-found-key'
    const response = await sut.query(key)
    expect(response).toBeNull()
  })

  it('should clear all data', async () => {
    const keyOne = 'key-to-clear-one'
    const keyTwo = 'key-to-clear-two'
    await sut.save(keyOne, 'any-data')
    await sut.save(keyTwo, 'any-data')
    await sut.clearStorage()
    const responseOne = await sut.query(keyOne)
    const responseTwo = await sut.query(keyTwo)
    expect(responseOne).toBeNull()
    expect(responseTwo).toBeNull()
  })

  it('should close connection.', () => {
    expect(() => sut.close()).not.toThrow()
  })

  it('should throws if query throws.', async () => {
    jest.mock('ioredis', () => ({ Redis: jest.fn().mockImplementationOnce(Promise.reject) }))
    await expect(() => sut.query('any-key')).rejects.toThrowError(BadGatewayException)
  })

  it('should throws if save throws.', async () => {
    jest.mock('ioredis', () => ({ Redis: jest.fn().mockImplementationOnce(Promise.reject) }))
    await expect(() => sut.save('any-key', 'any-data')).rejects.toThrowError(BadGatewayException)
  })
})
