export class Customer {
  private readonly id: string
  private readonly document: number
  private readonly name: string

  constructor (input: Customer.Constructor) {
    Object.assign(this, input)
   }

  update (input: Customer.Update): void {
    Object.keys(input).forEach(key => {
      if (input[key] !== undefined) this[key] = input[key]
    })
  }

  getState (): Customer.State {
    return {
      id: this.id,
      document: this.document,
      name: this.name
    }
  }
}

export namespace Customer {
  export type Constructor = {
    id: string
    document: number
    name: string
  }
  export type Update = Partial<Constructor>
  export type State = Constructor
}
