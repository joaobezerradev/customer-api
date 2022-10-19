import { faker } from '@faker-js/faker'
import { Customer } from '@domain/entities'

describe('Customer | Entity', () => {
  it('should be possible create a instance.', () => {
    expect(() => new Customer({
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })).not.toThrow()
  })

  it('should be able to get state.', () => {
    const customer = new Customer({
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })
    expect(customer).toHaveProperty('id')
    expect(customer).toHaveProperty('document')
    expect(customer).toHaveProperty('name')
  })

  it('should be able to update state.', () => {
    const customer = new Customer({
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })
    const defaultState = customer.getState()
    customer.update({
      id: faker.datatype.uuid(),
      document: faker.datatype.number(),
      name: faker.name.fullName()
    })
    const updatedState = customer.getState()
    expect(defaultState).not.toMatchObject(updatedState)
  })
})
