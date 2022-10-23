import { ConflictException, NotFoundException } from '@domain/exceptions'
import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'
import { UpdateCustomer } from './contracts'

export class UpdateCustomerCase implements UpdateCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute (input: UpdateCustomer.Input): Promise<UpdateCustomer.Output> {
    const customer = await this.customerRepository.getOne(this.buildKey(input.id))
    if (customer === null) throw new NotFoundException()
    const otherCustomer = await this.customerRepository.getOne(this.buildKey(input.newId))
    if (otherCustomer !== null) throw new ConflictException()
    customer.update({
      id: input.newId,
      document: input.document,
      name: input.name
    })
    await this.customerRepository.save(customer)
    return customer.getState()
  }

  protected buildKey (id: string): string {
    return `customer:${id}`
  }
}
