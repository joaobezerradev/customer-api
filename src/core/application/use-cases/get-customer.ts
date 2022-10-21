import { NotFoundException } from '@domain/exceptions'
import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'

export class GetCustomer {
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

namespace GetCustomer {
  export type Input = { id: string }
  export type Output = {
    id: string
    document: number
    name: string
  }
}
