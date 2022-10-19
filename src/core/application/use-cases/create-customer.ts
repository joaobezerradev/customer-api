import { Customer } from '@domain/entities'
import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'

export class CreateCustomer {
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

namespace CreateCustomer {
  export type Input = {
    id: string
    document: number
    name: string
  }
  export type Output = {
    id: string
    document: number
    name: string
  }
}
