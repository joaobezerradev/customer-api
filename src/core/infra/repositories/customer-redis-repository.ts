import { Customer } from '@domain/entities'
import { CustomerRepository } from '@domain/repositories'
import { Connection } from '@infra/database'

export class CustomerRedisRepository implements CustomerRepository {
  constructor (private readonly connection: Connection) { }

  async save (customer: Customer): Promise<void> {
    const key = this.getKey(customer)
    await this.connection.save(key, customer.getState())
  }

  async getOne (key: string): Promise<Customer | null> {
    const customer = await this.connection.query<Customer.State>(key)
    if (customer === null) return null
    return new Customer(customer)
  }

  async remove (key: string): Promise<void> {
    await this.connection.delete(key)
  }

  protected getKey (customer: Customer): string {
    return `customer:${customer.getState().id}`
  }
}
