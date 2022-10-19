import { Connection, RedisConnection } from '@infra/database'

describe('Redis Connection', () => {
  let sut: Connection

  beforeAll(() => {
    const host = 'redis'
    sut = new RedisConnection(host)
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

  it('should delete the data.', async () => {
    const key = 'key-to-clear'
    await sut.save(key, 'any-data')
    await sut.delete(key)
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
})
