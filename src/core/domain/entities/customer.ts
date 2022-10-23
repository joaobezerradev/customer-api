import { ID } from './id'

export class Customer {
  private id: ID
  private document: number
  private name: string

  constructor ({ id, ...rest }: Customer.Constructor) {
    Object.assign(this, rest, { id: new ID(id) })
  }

  update (input: Customer.Update): void {
    Object.keys(input).forEach(key => {
      if (input[key] !== undefined) {
        if (key === 'id') this.id = new ID(input[key])
        else this[key] = input[key]
      }
    })
  }

  getState (): Customer.State {
    return {
      id: this.id.value,
      document: this.document,
      name: this.name
    }
  }
}

export namespace Customer {
  export type Constructor = {
    id?: string
    document: number
    name: string
  }
  export type Update = Partial<{
    id: string
    document: number
    name: string
  }>
  export type State = {
    id: string
    document: number
    name: string
  }
}
