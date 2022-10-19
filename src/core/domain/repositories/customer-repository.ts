import { Customer } from '@domain/entities'

export interface CustomerRepository {
  save: (customer: Customer) => Promise<void>
  getOne: (key: string) => Promise<Customer | null>
}
