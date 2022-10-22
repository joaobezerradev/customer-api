import { Connection } from './connection'

import Redis from 'ioredis'
import { config } from 'dotenv'
import { BadGatewayException } from '@nestjs/common'

config()

export class RedisConnection implements Connection {
  private readonly client: Redis

  constructor (host: string) {
    this.client = new Redis({ host })
  }

  async query<T> (key: string): Promise<T | null> {
    try {
      const response = await this.client.get(key)
      if (response === null) return null
      return JSON.parse(response)
    } catch {
      throw new BadGatewayException()
    }
  }

  async save<T> (key: string, data: T): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(data))
    } catch {
      throw new BadGatewayException()
    }
  }

  async clearStorage (): Promise<void> {
    const keys = await this.client.keys('*')
    if (keys.length) await this.client.del(keys)
  }

  close (): void {
    this.client.disconnect()
  }
}
