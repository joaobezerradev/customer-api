import { CustomerRepository } from '@domain/repositories'

export interface RepositoryFactory {
  createCustomerRepository: () => CustomerRepository
}
