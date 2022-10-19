import { Customer } from '@domain/entities'
import { CustomerRepository } from '@domain/repositories'
import { Connection } from '@infra/database'

export class CustomerRedisRepository implements CustomerRepository {
  constructor (private readonly connection: Connection) { }

  async save (customer: Customer): Promise<void> {
    const key = this.getKey(customer)
    await this.connection.save(key, customer)
  }

  async getOne (key: string): Promise<Customer | null> {
    return this.connection.query<Customer>(key)
  }

  protected getKey (customer: Customer): string {
    return `customer:${customer.getState().id}`
  }
}
