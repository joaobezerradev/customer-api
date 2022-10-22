export interface UpdateCustomer {
  execute: (input: UpdateCustomer.Input) => Promise<UpdateCustomer.Output>
}

export namespace UpdateCustomer {
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
