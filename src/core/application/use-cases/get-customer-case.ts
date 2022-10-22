import { NotFoundException } from '@domain/exceptions'
import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'
import { GetCustomer } from './contracts'

export class GetCustomerCase implements GetCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute (input: GetCustomer.Input): Promise<GetCustomer.Output> {
    const key = `customer:${input.id}`
    const response = await this.customerRepository.getOne(key)
    if (response === null) throw new NotFoundException()
    return response.getState()
  }
}
