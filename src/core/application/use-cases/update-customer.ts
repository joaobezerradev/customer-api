import { ConflictException, NotFoundException } from '@domain/exceptions'
import { RepositoryFactory } from '@domain/factories'
import { CustomerRepository } from '@domain/repositories'

export class UpdateCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute (input: UpdateCustomer.Input): Promise<UpdateCustomer.Output> {
    const key = this.buildKey(input.id)
    const customer = await this.customerRepository.getOne(key)
    if (customer === null) throw new NotFoundException('cliente inexistente')
    customer.update({
      id: input.newId,
      document: input.document,
      name: input.name
    })
    const updatedKey = this.buildKey(customer.getState().id)
    const otherCustomer = await this.customerRepository.getOne(updatedKey)
    if (otherCustomer !== null) throw new ConflictException('conflito de ID')
    await this.customerRepository.save(customer)
    return customer.getState()
  }

  protected buildKey (id: string): string {
    return `customer:${id}`
  }
}

namespace UpdateCustomer {
  export type Input = {
    id: string
    newId: string
    document: number
    name: string
  }
  export type Output = {
    id: string
    document: number
    name: string
  }
}
