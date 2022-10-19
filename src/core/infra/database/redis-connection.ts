import { Connection } from './connection'

import Redis from 'ioredis'
import { config } from 'dotenv'

config()

export class RedisConnection implements Connection {
  private readonly client: Redis

  constructor (host: string) {
    this.client = new Redis({ host })
  }

  async query<T> (key: string): Promise<T | null> {
    const response = await this.client.get(key)
    if (response === null) return null
    return JSON.parse(response)
  }

  async save<T> (key: string, data: T): Promise<void> {
    await this.client.set(key, JSON.stringify(data))
  }

  async clearStorage (): Promise<void> {
    const keys = await this.client.keys('*')
    if (keys.length) {
      await this.client.del(keys)
    }
  }

  async delete (key: string): Promise<void> {
    await this.client.del(key)
  }

  close (): void {
    this.client.disconnect()
  }
}
