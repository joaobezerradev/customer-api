import { Customer } from '@domain/entities'
import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'
import { CreateCustomer } from './contracts'

export class CreateCustomerCase implements CreateCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute (input: CreateCustomer.Input): Promise<CreateCustomer.Output> {
    const customer = new Customer(input)
    await this.customerRepository.save(customer)
    return customer.getState()
  }
}
