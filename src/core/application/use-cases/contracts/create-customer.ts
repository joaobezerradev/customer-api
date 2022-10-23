export interface CreateCustomer {
  execute: (input: CreateCustomer.Input) => Promise<CreateCustomer.Output>
}

export namespace CreateCustomer {
  export type Input = {
    document: number
    name: string
  }
  export type Output = {
    id: string
    document: number
    name: string
  }
}
